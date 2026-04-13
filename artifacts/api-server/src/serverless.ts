import * as dotenv from "dotenv";
import { resolve } from "path";
dotenv.config({ path: resolve(process.cwd(), "../../.env") });

import serverless from "serverless-http";
import app from "./app";

const handler = serverless(app, {
  request: (req: any) => {
    // Strip /api prefix so Express routes match correctly
    const url = req.url || "/";
    req.url = url.startsWith("/api/") ? url.slice(4) : url;
  },
});

export default handler;