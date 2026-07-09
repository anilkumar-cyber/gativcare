import "server-only";
import { prisma } from "@/lib/db";
import { allTabIds, type ConfigurableRole } from "@/lib/dashboardTabs";
import { Role } from "@prisma/client";

/** Tabs this role can see. Falls back to "everything" when no permission row has been set yet. */
export async function getEffectiveTabs(role: ConfigurableRole): Promise<string[]> {
  const row = await prisma.rolePermission.findUnique({ where: { role: role as Role } });
  if (!row) return allTabIds(role);
  return Array.from(new Set(["overview", ...row.tabs]));
}

export async function getAllRolePermissions() {
  const rows = await prisma.rolePermission.findMany();
  const byRole = new Map(rows.map((r) => [r.role, r.tabs]));
  const roles: ConfigurableRole[] = ["DOCTOR", "HOSPITAL", "PATIENT", "COORDINATOR"];
  return roles.map((role) => ({
    role,
    allTabs: allTabIds(role),
    enabledTabs: byRole.get(role as Role) ?? allTabIds(role),
    isConfigured: byRole.has(role as Role),
  }));
}
