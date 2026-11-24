/**
 * Content access for the site. Every page reads content through these
 * functions, never from Sanity or the local data files directly.
 *
 * - With Sanity configured: content comes from Sanity (cached, see client.ts).
 * - Without it: the bundled local data is used, so the site still builds.
 *
 * Both sources are normalised into the same shapes below.
 */
import type { PortableTextBlock } from "next-sanity";
import { blogPosts as localBlogPosts, parsePostDate } from "@/app/blogs/blogs-data";
import { services as localServices } from "@/app/services/services-data";
import { localProjects, type ProjectStatus } from "@/app/works/projects-data";
import { localFaqs, type FaqPage } from "@/app/faq-data";
import { isSanityConfigured } from "../env";
import { sanityFetch } from "./client";
import { imageUrl } from "./image";
import {
  BLOG_POST_QUERY,
  BLOG_POSTS_QUERY,
  FAQS_QUERY,
  PROJECTS_QUERY,
  SERVICE_QUERY,
  SERVICES_QUERY,
} from "./queries";

export type { ProjectStatus, FaqPage };

type Seo = { metaTitle?: string; metaDescription?: string };

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date, YYYY-MM-DD */
  publishedAt: string;
  /** Display date, e.g. "14 Jan, 2026" */
  date: string;
  image: string;
  imageAlt: string;
  seo?: Seo;
};

export type BlogPostWithBody = BlogPost & { body: PortableTextBlock[] };

export type Service = {
  id: string;
  /** Display number, e.g. "01." */
  number: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  seo?: Seo;
};

export type Project = {
  id: string;
  title: string;
  status: ProjectStatus;
  details?: string;
  images: string[];
  featured: boolean;
};

export type Faq = { id: string; question: string; answer: string };

// ---------- helpers ----------

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-01-14" -> "14 Jan, 2026" (UTC, so it never shifts by a day). */
export function formatPostDate(isoDate: string): string {
  const d = new Date(`${isoDate.slice(0, 10)}T00:00:00Z`);
  return `${String(d.getUTCDate()).padStart(2, "0")} ${MONTHS[d.getUTCMonth()]}, ${d.getUTCFullYear()}`;
}

function serviceNumber(order: number): string {
  return `${String(order).padStart(2, "0")}.`;
}

/** Turns plain paragraphs into Portable Text blocks. */
export function paragraphsToBlocks(paragraphs: string[], keyPrefix = "p"): PortableTextBlock[] {
  return paragraphs.map((text, i) => ({
    _type: "block",
    _key: `${keyPrefix}${i}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `${keyPrefix}${i}s`, text, marks: [] }],
  }));
}

/* eslint-disable @typescript-eslint/no-explicit-any -- raw Sanity query results */
type SanityImage = { asset?: { _ref: string }; alt?: string } | null | undefined;

function mapSanityBlog(doc: any): BlogPost {
  const image = doc.mainImage as SanityImage;
  return {
    id: doc._id,
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt ?? "",
    publishedAt: doc.publishedAt,
    date: formatPostDate(doc.publishedAt),
    image: imageUrl(image),
    imageAlt: image?.alt || doc.title,
    seo: doc.seo ?? undefined,
  };
}

function mapSanityService(doc: any): Service {
  const image = doc.image as SanityImage;
  return {
    id: doc._id,
    number: serviceNumber(doc.order ?? 0),
    slug: doc.slug,
    title: doc.title,
    description: doc.description ?? "",
    image: imageUrl(image),
    imageAlt: image?.alt || doc.title,
    seo: doc.seo ?? undefined,
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

function mapLocalBlog(post: (typeof localBlogPosts)[number]): BlogPost {
  return {
    id: String(post.id),
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    publishedAt: parsePostDate(post.date).toISOString().slice(0, 10),
    date: post.date,
    image: post.image,
    imageAlt: post.title,
  };
}

function mapLocalService(service: (typeof localServices)[number]): Service {
  return {
    id: service.slug,
    number: service.id,
    slug: service.slug,
    title: service.title,
    description: service.description,
    image: service.image,
    imageAlt: service.title,
  };
}

// ---------- blogs ----------

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!isSanityConfigured) {
    return localBlogPosts
      .map(mapLocalBlog)
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }
  const docs = await sanityFetch<unknown[]>(BLOG_POSTS_QUERY, {}, ["blogPost"]);
  return docs.map(mapSanityBlog);
}

export async function getBlogPost(slug: string): Promise<BlogPostWithBody | null> {
  if (!isSanityConfigured) {
    const post = localBlogPosts.find((p) => p.slug === slug);
    return post ? { ...mapLocalBlog(post), body: paragraphsToBlocks(post.content) } : null;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doc = await sanityFetch<any>(BLOG_POST_QUERY, { slug }, ["blogPost"]);
  return doc ? { ...mapSanityBlog(doc), body: doc.body ?? [] } : null;
}

// ---------- services ----------

export async function getServices(): Promise<Service[]> {
  if (!isSanityConfigured) return localServices.map(mapLocalService);
  const docs = await sanityFetch<unknown[]>(SERVICES_QUERY, {}, ["service"]);
  return docs.map(mapSanityService);
}

export async function getService(slug: string): Promise<Service | null> {
  if (!isSanityConfigured) {
    const service = localServices.find((s) => s.slug === slug);
    return service ? mapLocalService(service) : null;
  }
  const doc = await sanityFetch<unknown>(SERVICE_QUERY, { slug }, ["service"]);
  return doc ? mapSanityService(doc) : null;
}

// ---------- projects ----------

export async function getProjects(): Promise<Project[]> {
  if (!isSanityConfigured) {
    return localProjects.map((p) => ({
      id: String(p.id),
      title: p.title,
      status: p.status,
      details: p.details,
      images: p.images,
      featured: Boolean(p.featured),
    }));
  }
  const docs = await sanityFetch<
    { _id: string; title: string; status: ProjectStatus; details?: string; images?: SanityImage[]; featured?: boolean }[]
  >(PROJECTS_QUERY, {}, ["project"]);
  return docs
    .map((doc) => ({
      id: doc._id,
      title: doc.title,
      status: doc.status,
      details: doc.details ?? undefined,
      images: (doc.images ?? []).map((img) => imageUrl(img)).filter(Boolean),
      featured: Boolean(doc.featured),
    }))
    // The gallery needs a cover image; skip anything saved without one.
    .filter((p) => p.images.length > 0);
}

export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter((p) => p.featured).slice(0, limit);
}

// ---------- FAQs ----------

export async function getFaqs(page: FaqPage): Promise<Faq[]> {
  if (!isSanityConfigured) {
    return localFaqs[page].map((f, i) => ({ id: `${page}-${i}`, ...f }));
  }
  const docs = await sanityFetch<{ _id: string; question: string; answer: string }[]>(
    FAQS_QUERY,
    { page },
    ["faq"]
  );
  return docs.map((d) => ({ id: d._id, question: d.question, answer: d.answer }));
}
