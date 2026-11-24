import { defineField, defineType } from "sanity";
import { WrenchIcon } from "@sanity/icons/Wrench";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: WrenchIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      description: "The URL of the service: /services/<slug>. Avoid changing it after publishing.",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Position on the services page (1 = first). Shown as “01.”, “02.” …",
      validation: (rule) => rule.required().integer().min(1),
    }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alternative text", type: "string" })],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 6,
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  orderings: [
    { title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", order: "order", media: "image" },
    prepare: ({ title, order, media }) => ({
      title,
      subtitle: order ? `${String(order).padStart(2, "0")}.` : undefined,
      media,
    }),
  },
});
