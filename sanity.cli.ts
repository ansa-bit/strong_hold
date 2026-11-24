/**
 * Config for the Sanity CLI (`npx sanity ...`), e.g. deploying GraphQL,
 * managing datasets or CORS origins. Reads the same env vars as the site.
 */
import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  },
});
