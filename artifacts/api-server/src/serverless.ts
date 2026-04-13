import serverless from "serverless-http";
import app from "./app";

const handler = serverless(app);

// 👇 FORCE attach to global so esbuild cannot remove it
(globalThis as any).__HANDLER__ = handler;

// 👇 export both ways
export default handler;
module.exports = handler;