import type { NextConfig } from "next";
import { legacyBlogRedirects } from "./app/blogs/blogs-data";

const nextConfig: NextConfig = {
  images: {
    // Images uploaded through Sanity Studio are served from Sanity's CDN.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  async redirects() {
    return Object.entries(legacyBlogRedirects).map(([from, to]) => ({
      source: `/blogs/${from}`,
      destination: `/blogs/${to}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
