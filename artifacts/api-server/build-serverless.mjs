import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build as esbuild } from "esbuild";
import { rm } from "node:fs/promises";

globalThis.require = createRequire(import.meta.url);

const artifactDir = path.dirname(fileURLToPath(import.meta.url));

async function buildServerless() {
  const outfile = path.resolve(artifactDir, "dist/app.mjs");

  await esbuild({
    entryPoints: [path.resolve(artifactDir, "src/app.ts")],
    platform: "node",
    bundle: true,
    format: "esm",
    outfile,
    logLevel: "info",
    // Externalize only native addons — everything else is bundled
    // so the serverless function is fully self-contained
    external: ["*.node", "pg-native"],
    sourcemap: false,
    // Required shims for CJS interop inside an ESM bundle
    banner: {
      js: `import { createRequire as __bannerCrReq } from 'node:module';
import __bannerPath from 'node:path';
import __bannerUrl from 'node:url';
globalThis.require = __bannerCrReq(import.meta.url);
globalThis.__filename = __bannerUrl.fileURLToPath(import.meta.url);
globalThis.__dirname = __bannerPath.dirname(globalThis.__filename);`,
    },
  });

  console.log("Serverless app bundle built: dist/app.mjs");
}

buildServerless().catch((err) => {
  console.error(err);
  process.exit(1);
});
