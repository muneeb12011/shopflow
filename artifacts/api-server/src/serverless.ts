import * as dotenv from "dotenv";
import { resolve } from "path";
dotenv.config({ path: resolve(process.cwd(), "../../.env") });

import serverless from "serverless-http";
import app from "./app";

const handler = serverless(app, {
  request: (req: any) => {
    req.url = req.url.replace(/^\/api\//, "/") || "/";
  },
});

export default handler;