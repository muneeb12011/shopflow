// Vercel serverless function entry point
// Imports the pre-built Express app bundle (built by `build:serverless`)
// This bundle is fully self-contained — no workspace module resolution needed at runtime

import app from "../artifacts/api-server/dist/app.mjs";

export default app;
