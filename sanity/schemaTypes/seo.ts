import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta title",
      type: "string",
      description: "Overrides the page title in search results. Aim for under 60 characters.",
      validation: (rule) => rule.max(70).warning("Long titles get cut off in Google results."),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      description: "Shown under the title in search results. Aim for 120–160 characters.",
      validation: (rule) => rule.max(180).warning("Long descriptions get cut off in Google results."),
    }),
  ],
});
