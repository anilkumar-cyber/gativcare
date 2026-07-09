"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Role } from "@prisma/client";
import { allTabIds, type ConfigurableRole } from "@/lib/dashboardTabs";

const CONFIGURABLE_ROLES: ConfigurableRole[] = ["DOCTOR", "HOSPITAL", "PATIENT", "COORDINATOR"];

export async function setRolePermissionsAction(formData: FormData) {
  await requireRole(Role.ADMIN);

  const role = formData.get("role");
  if (typeof role !== "string" || !CONFIGURABLE_ROLES.includes(role as ConfigurableRole)) return;

  const valid = new Set(allTabIds(role as ConfigurableRole));
  const tabs = Array.from(new Set(["overview", ...formData.getAll("tabs").filter((t): t is string => typeof t === "string" && valid.has(t))]));

  await prisma.rolePermission.upsert({
    where: { role: role as Role },
    update: { tabs },
    create: { role: role as Role, tabs },
  });
  revalidatePath("/dashboard/admin");
}
