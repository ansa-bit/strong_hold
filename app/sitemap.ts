import type { MetadataRoute } from "next";
import { getBlogPosts, getServices } from "@/sanity/lib/content";
import { siteConfig } from "@/app/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const [services, blogPosts] = await Promise.all([getServices(), getBlogPosts()]);

  const staticPages = ["", "/about-us", "/services", "/works", "/blogs"].map(
    (path) => ({
      url: `${base}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })
  );

  return [
    ...staticPages,
    ...services.map((service) => ({
      url: `${base}/services/${service.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...blogPosts.map((post) => ({
      url: `${base}/blogs/${post.slug}`,
      lastModified: new Date(`${post.publishedAt}T00:00:00Z`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
