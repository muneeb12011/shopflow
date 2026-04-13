import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build as esbuild } from "esbuild";
import { rm } from "node:fs/promises";

globalThis.require = createRequire(import.meta.url);

const artifactDir = path.dirname(fileURLToPath(import.meta.url));

async function buildServerless() {
  const distDir = path.resolve(artifactDir, "dist");
  const outfile = path.resolve(distDir, "app.cjs");

  // Clean dist
  await rm(distDir, { recursive: true, force: true });

  await esbuild({
    entryPoints: [path.resolve(artifactDir, "src/serverless.ts")],
    platform: "node",
    target: "node18",
    bundle: true,

    // ✅ Use CommonJS (stable for Vercel)
    format: "cjs",
    outfile,

    logLevel: "info",
    external: ["*.node", "pg-native"],
    sourcemap: false,

    banner: {
      js: `const { createRequire } = require('module');
global.require = createRequire(__filename);`,
    },

    // 🔥 CRITICAL FIX — FORCE EXPORT
    footer: {
      js: `
if (!module.exports) {
  module.exports = global.__HANDLER__;
}
`,
    },
  });

  console.log("✅ Serverless app bundle built: dist/app.cjs");
}

buildServerless().catch((err) => {
  console.error(err);
  process.exit(1);
});