import type { MetadataRoute } from "next";
import { getPublishedBlogPosts } from "@/lib/queries/blog";

const BASE_URL = "https://gativcare.com";

export const dynamic = "force-dynamic";

const routes = [
  "",
  "/about",
  "/contact",
  "/hospitals",
  "/packages",
  "/partner-with-us",
  "/treatments",
  "/cost-estimator",
  "/blog",
  "/faq",
  "/privacy",
  "/terms",
  "/refund",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/blog" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }));

  const posts = await getPublishedBlogPosts();
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...postEntries];
}
