import { defineField, defineType } from "sanity";
import { HelpCircleIcon } from "@sanity/icons/HelpCircle";

export const FAQ_PAGES = [
  { title: "Homepage", value: "home" },
  { title: "Services page", value: "services" },
] as const;

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: "question",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "page",
      title: "Show on",
      type: "string",
      options: { list: [...FAQ_PAGES], layout: "radio" },
      initialValue: "home",
      validation: (rule) => rule.required(),
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
    select: { title: "question", page: "page" },
    prepare: ({ title, page }) => ({
      title,
      subtitle: FAQ_PAGES.find((p) => p.value === page)?.title,
    }),
  },
});
