export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-10-01";

// Until a Sanity project is connected, the site keeps serving the bundled
// local content (app/**/*-data.ts) so builds and deploys never break.
export const isSanityConfigured = projectId.length > 0;
