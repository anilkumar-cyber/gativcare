import "server-only";
import { prisma } from "@/lib/db";

export async function getPublishedBlogPosts() {
  return prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });
}

export async function getPublishedBlogPostBySlug(slug: string) {
  return prisma.blogPost.findFirst({ where: { slug, published: true } });
}

export async function getAllBlogPostsAdmin() {
  return prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getBlogPostById(id: string) {
  return prisma.blogPost.findUnique({ where: { id } });
}
