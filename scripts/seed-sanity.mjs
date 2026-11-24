/**
 * One-time import of the site's existing content into Sanity.
 *
 * Reads the bundled data files (blogs, services, projects, FAQs), uploads their
 * images from /public, and creates the matching Sanity documents.
 *
 * Usage:
 *   npm run sanity:seed            # create documents that don't exist yet
 *   npm run sanity:seed -- --force # overwrite existing documents with local content
 *
 * Needs NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and
 * SANITY_API_WRITE_TOKEN in .env.local.
 *
 * Safe to re-run: documents use fixed IDs, and without --force existing ones
 * (including any edits made in the Studio) are left untouched.
 */
import { createReadStream, existsSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";
import sharp from "sharp";

import { blogPosts, parsePostDate } from "../app/blogs/blogs-data.ts";
import { services } from "../app/services/services-data.ts";
import { localProjects } from "../app/works/projects-data.ts";
import { localFaqs } from "../app/faq-data.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const force = process.argv.includes("--force");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN. Add them to .env.local (see .env.example)."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2025-10-01",
  useCdn: false,
});

// ---------- images ----------

const uploaded = new Map();
const COMPRESS_OVER_BYTES = 1_000_000;

/**
 * Large images are re-encoded as *lossless* WebP (pixel-identical, verified)
 * when that is smaller. Typically ~45% smaller than the source PNGs.
 * Files in /public are never modified.
 */
async function prepareUpload(file) {
  const size = statSync(file).size;
  const filename = path.basename(file);
  if (size <= COMPRESS_OVER_BYTES || /\.(webp|svg|gif)$/i.test(file)) {
    return { body: createReadStream(file), filename, note: "" };
  }

  const webp = await sharp(file).webp({ lossless: true, effort: 6 }).toBuffer();
  if (webp.length >= size) return { body: createReadStream(file), filename, note: "" };

  const [a, b] = await Promise.all([
    sharp(file).ensureAlpha().raw().toBuffer(),
    sharp(webp).ensureAlpha().raw().toBuffer(),
  ]);
  if (!a.equals(b)) return { body: createReadStream(file), filename, note: " (kept original)" };

  const mb = (n) => `${(n / 1e6).toFixed(2)}MB`;
  return {
    body: webp,
    filename: filename.replace(/\.[^.]+$/, ".webp"),
    note: ` (${mb(size)} → ${mb(webp.length)}, lossless)`,
  };
}

/** Uploads /public/<src> once and returns a Sanity image field value. */
async function image(src, alt) {
  if (!uploaded.has(src)) {
    const file = path.join(root, "public", src);
    if (!existsSync(file)) throw new Error(`Image not found: public${src}`);
    const { body, filename, note } = await prepareUpload(file);
    const asset = await client.assets.upload("image", body, { filename });
    uploaded.set(src, asset._id);
    console.log(`  ↑ ${src}${note}`);
  }
  return {
    _type: "image",
    asset: { _type: "reference", _ref: uploaded.get(src) },
    ...(alt ? { alt } : {}),
  };
}

function block(text, key) {
  return {
    _type: "block",
    _key: key,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `${key}s`, text, marks: [] }],
  };
}

// ---------- documents ----------

async function buildDocs() {
  const docs = [];

  console.log("Blog posts");
  for (const post of blogPosts) {
    docs.push({
      _id: `blogPost-${post.slug}`.slice(0, 128),
      _type: "blogPost",
      title: post.title,
      slug: { _type: "slug", current: post.slug },
      publishedAt: parsePostDate(post.date).toISOString().slice(0, 10),
      mainImage: await image(post.image, post.title),
      excerpt: post.excerpt,
      body: post.content.map((text, i) => block(text, `p${i}`)),
    });
  }

  console.log("Services");
  for (const service of services) {
    docs.push({
      _id: `service-${service.slug}`.slice(0, 128),
      _type: "service",
      title: service.title,
      slug: { _type: "slug", current: service.slug },
      order: parseInt(service.id, 10),
      image: await image(service.image, service.title),
      description: service.description,
    });
  }

  console.log("Projects");
  for (const [index, project] of localProjects.entries()) {
    const images = [];
    for (const [i, src] of project.images.entries()) {
      images.push({ ...(await image(src, project.title)), _key: `img${i}` });
    }
    docs.push({
      _id: `project-${project.id}`,
      _type: "project",
      title: project.title,
      status: project.status,
      ...(project.details ? { details: project.details } : {}),
      images,
      featured: Boolean(project.featured),
      order: (index + 1) * 10,
    });
  }

  console.log("FAQs");
  for (const [page, faqs] of Object.entries(localFaqs)) {
    faqs.forEach((faq, i) => {
      docs.push({
        _id: `faq-${page}-${i + 1}`,
        _type: "faq",
        question: faq.question,
        answer: faq.answer,
        page,
        order: (i + 1) * 10,
      });
    });
  }

  return docs;
}

const docs = await buildDocs();

const tx = client.transaction();
for (const doc of docs) {
  if (force) tx.createOrReplace(doc);
  else tx.createIfNotExists(doc);
}
await tx.commit();

console.log(
  `\nDone: ${docs.length} documents ${force ? "created or replaced" : "created (existing ones skipped)"} in ${projectId}/${dataset}, ${uploaded.size} images uploaded.`
);
