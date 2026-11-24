/**
 * Embedded Sanity Studio, served at /studio.
 * All routes under /studio are handled by the Studio's own router.
 */
import type { Metadata } from "next";
import { NextStudio } from "next-sanity/studio";
import { metadata as studioMetadata } from "next-sanity/studio";
import config from "@/sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export const dynamic = "force-static";

export { viewport } from "next-sanity/studio";

export const metadata: Metadata = {
  ...studioMetadata,
  title: "Content Studio | Stronghold Structures",
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <div style={{ padding: "4rem 1.5rem", maxWidth: 640, margin: "0 auto", fontFamily: "system-ui, sans-serif" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>
          Sanity is not connected yet
        </h1>
        <p style={{ lineHeight: 1.6, color: "#475569" }}>
          Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and{" "}
          <code>NEXT_PUBLIC_SANITY_DATASET</code> in <code>.env.local</code> (see{" "}
          <code>.env.example</code>) and restart the dev server.
        </p>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
