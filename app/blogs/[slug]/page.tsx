import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PortableText, type PortableTextComponents } from "next-sanity";
import { getBlogPost, getBlogPosts } from "@/sanity/lib/content";
import { imageUrl } from "@/sanity/lib/image";
import { JsonLd, absoluteUrl, siteConfig } from "@/app/site-config";

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const bodyComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-base md:text-lg leading-8 text-slate-600 mb-6 last:mb-0">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-bold text-slate-900 mt-8 mb-3">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#00D1FF] pl-5 italic text-slate-700 my-8">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-6 space-y-2 text-base md:text-lg leading-8 text-slate-600">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2 text-base md:text-lg leading-8 text-slate-600">{children}</ol>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const href: string = value?.href ?? "#";
      const external = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          className="text-blue-700 underline underline-offset-2"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const src = imageUrl(value, 1200);
      if (!src) return null;
      return (
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-slate-100 my-8">
          <Image src={src} alt={value?.alt ?? ""} fill className="object-cover" />
        </div>
      );
    },
  },
};

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Blog Not Found",
    };
  }

  const title = post.seo?.metaTitle || post.title;
  const description = post.seo?.metaDescription || post.excerpt;

  return {
    title,
    description,
    alternates: { canonical: `/blogs/${post.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      images: [post.image],
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([getBlogPost(slug), getBlogPosts()]);

  if (!post) {
    notFound();
  }

  const otherPosts = allPosts
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: absoluteUrl(post.image),
    datePublished: post.publishedAt,
    mainEntityOfPage: `${siteConfig.url}/blogs/${post.slug}`,
    author: { "@id": `${siteConfig.url}/#organization` },
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };

  return (
    <main className="w-full bg-white font-sans overflow-hidden">
      <JsonLd data={articleSchema} />
      <section className="bg-[#EBF9FE] py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <span className="inline-block px-4 py-1 rounded-sm border border-gray-300 text-xs font-medium text-gray-600 bg-white mb-6">
            Blog
          </span>
          <p className="text-[#94A3B8] text-sm font-medium mb-4">{post.date}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 max-w-4xl">
            {post.title}
          </h1>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-20">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100 mb-10">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="max-w-3xl">
          <PortableText value={post.body} components={bodyComponents} />
        </div>

        <div className="mt-12">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <ArrowLeft size={18} />
            Back to Blogs
          </Link>
        </div>

        {otherPosts.length > 0 && (
          <div className="mt-20 pt-16 border-t border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-8">More Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10">
              {otherPosts.map((item) => (
                <Link
                  key={item.id}
                  href={`/blogs/${item.slug}`}
                  className="group cursor-pointer block"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-lg mb-4 bg-slate-100">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-blue-400 text-xs font-medium mb-2">{item.date}</p>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-blue-800 transition-colors">
                    {item.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
