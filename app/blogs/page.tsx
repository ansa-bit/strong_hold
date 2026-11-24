import { getBlogPosts } from "@/sanity/lib/content";
import BlogsList from "./BlogsList";

export default async function BlogsPage() {
  const posts = await getBlogPosts();
  return <BlogsList posts={posts} />;
}
