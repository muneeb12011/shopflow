import serverless from "serverless-http";
import app from "../artifacts/api-server/dist/app.mjs";

const handler = serverless(app, {
  request: (req) => {
    req.url = req.url.replace(/^\/api/, '') || '/';
  }
});

export default handler;