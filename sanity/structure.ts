import type { StructureResolver } from "sanity/structure";

// Sidebar layout for the Studio. FAQs are split by the page they appear on.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("blogPost").title("Blog posts"),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("service").title("Services"),
      S.divider(),
      S.listItem()
        .title("FAQs")
        .child(
          S.list()
            .title("FAQs")
            .items([
              S.listItem()
                .title("Homepage FAQs")
                .child(
                  S.documentTypeList("faq")
                    .title("Homepage FAQs")
                    .filter('_type == "faq" && page == "home"')
                    .defaultOrdering([{ field: "order", direction: "asc" }])
                    .initialValueTemplates([S.initialValueTemplateItem("faq-home")])
                ),
              S.listItem()
                .title("Services page FAQs")
                .child(
                  S.documentTypeList("faq")
                    .title("Services page FAQs")
                    .filter('_type == "faq" && page == "services"')
                    .defaultOrdering([{ field: "order", direction: "asc" }])
                    .initialValueTemplates([S.initialValueTemplateItem("faq-services")])
                ),
            ])
        ),
    ]);
