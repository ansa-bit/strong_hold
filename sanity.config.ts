"use client";

/**
 * Sanity Studio config. The Studio is embedded in the site at /studio
 * (see app/studio/[[...tool]]/page.tsx).
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
  name: "default",
  title: "Stronghold Structures",
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev,
      { id: "faq-home", title: "Homepage FAQ", schemaType: "faq", value: { page: "home" } },
      { id: "faq-services", title: "Services page FAQ", schemaType: "faq", value: { page: "services" } },
    ],
  },
  plugins: [
    structureTool({ structure }),
    // GROQ query playground — handy for debugging content queries.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
