"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Role } from "@prisma/client";

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function readPostFields(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const coverImage = String(formData.get("coverImage") ?? "").trim() || null;
  const author = String(formData.get("author") ?? "").trim() || "GativCare Team";
  const seoTitle = String(formData.get("seoTitle") ?? "").trim() || null;
  const seoDescription = String(formData.get("seoDescription") ?? "").trim() || null;
  const tags = String(formData.get("tags") ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const published = formData.get("published") === "on";

  return { title, excerpt, content, coverImage, author, seoTitle, seoDescription, tags, published };
}

export async function createBlogPostAction(formData: FormData) {
  await requireRole(Role.ADMIN);
  const fields = readPostFields(formData);
  if (!fields.title || !fields.excerpt || !fields.content) return;

  let slug = slugify(fields.title);
  const existing = await prisma.blogPost.findUnique({ where: { slug } });
  if (existing) slug = `${slug}-${Date.now().toString(36)}`;

  await prisma.blogPost.create({
    data: { ...fields, slug, publishedAt: fields.published ? new Date() : null },
  });

  revalidatePath("/blog");
  revalidatePath("/dashboard/admin");
  redirect("/dashboard/admin?tab=cms");
}

export async function updateBlogPostAction(formData: FormData) {
  await requireRole(Role.ADMIN);
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const fields = readPostFields(formData);
  if (!fields.title || !fields.excerpt || !fields.content) return;

  const current = await prisma.blogPost.findUnique({ where: { id } });
  if (!current) return;

  await prisma.blogPost.update({
    where: { id },
    data: {
      ...fields,
      publishedAt: fields.published ? (current.publishedAt ?? new Date()) : null,
    },
  });

  revalidatePath("/blog");
  revalidatePath(`/blog/${current.slug}`);
  revalidatePath("/dashboard/admin");
  redirect("/dashboard/admin?tab=cms");
}

export async function deleteBlogPostAction(formData: FormData) {
  await requireRole(Role.ADMIN);
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/blog");
  revalidatePath("/dashboard/admin");
}

export async function togglePublishBlogPostAction(formData: FormData) {
  await requireRole(Role.ADMIN);
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) return;

  await prisma.blogPost.update({
    where: { id },
    data: {
      published: !post.published,
      publishedAt: !post.published ? (post.publishedAt ?? new Date()) : post.publishedAt,
    },
  });

  revalidatePath("/blog");
  revalidatePath("/dashboard/admin");
}
