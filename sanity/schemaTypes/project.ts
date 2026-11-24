import { defineArrayMember, defineField, defineType } from "sanity";
import { ProjectsIcon } from "@sanity/icons/Projects";

export const PROJECT_STATUSES = ["Ongoing", "Completed", "Post Tensioning"] as const;

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: ProjectsIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      description: "Project name and location, e.g. “Bizopp Mall, Vadanappally, Thrissur”.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      type: "string",
      description: "Which tab the project appears under on the Works page.",
      options: { list: [...PROJECT_STATUSES], layout: "radio" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "details",
      type: "string",
      description: "Short spec line, e.g. “G+2 · 15,010 sqft · Structural works in final stage”.",
    }),
    defineField({
      name: "images",
      type: "array",
      description: "The first image is the cover. Drag to reorder.",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Alternative text", type: "string" })],
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "featured",
      title: "Show on homepage",
      type: "boolean",
      description: "Featured projects appear in the homepage “Recent Works” section (first 3 by order).",
      initialValue: false,
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Lower numbers appear first.",
      validation: (rule) => rule.integer(),
    }),
  ],
  orderings: [
    { title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", status: "status", featured: "featured", media: "images.0" },
    prepare: ({ title, status, featured, media }) => ({
      title,
      subtitle: [status, featured ? "★ Homepage" : null].filter(Boolean).join(" · "),
      media,
    }),
  },
});
