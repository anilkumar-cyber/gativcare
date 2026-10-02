import type { Metadata } from "next";
import { getPublishedBlogPosts } from "@/lib/queries/blog";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog | GativCare",
  description: "Guides, patient stories, and expert insights on medical tourism in India — treatments, hospitals, costs, and travel planning.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();
  return <BlogClient posts={posts} />;
}
