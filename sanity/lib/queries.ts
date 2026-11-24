import { defineQuery } from "next-sanity";

const blogFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  mainImage,
  seo
`;

export const BLOG_POSTS_QUERY = defineQuery(`
  *[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc) { ${blogFields} }
`);

export const BLOG_POST_QUERY = defineQuery(`
  *[_type == "blogPost" && slug.current == $slug][0] { ${blogFields}, body }
`);

const serviceFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  order,
  description,
  image,
  seo
`;

export const SERVICES_QUERY = defineQuery(`
  *[_type == "service" && defined(slug.current)] | order(order asc) { ${serviceFields} }
`);

export const SERVICE_QUERY = defineQuery(`
  *[_type == "service" && slug.current == $slug][0] { ${serviceFields} }
`);

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project"] | order(order asc, _createdAt asc) {
    _id, title, status, details, images, featured
  }
`);

export const FAQS_QUERY = defineQuery(`
  *[_type == "faq" && page == $page] | order(order asc, _createdAt asc) {
    _id, question, answer
  }
`);
