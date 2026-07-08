"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Role, LeadStatus } from "@prisma/client";

export async function updateLeadStatusAction(formData: FormData) {
  await requireRole(Role.ADMIN);

  const id = formData.get("id");
  const status = formData.get("status");
  if (typeof id !== "string" || typeof status !== "string") return;
  if (!Object.values(LeadStatus).includes(status as LeadStatus)) return;

  await prisma.lead.update({ where: { id }, data: { status: status as LeadStatus } });
  revalidatePath("/dashboard/admin");
}
