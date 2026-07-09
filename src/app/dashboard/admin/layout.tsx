import { requireAnyRole } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { getEffectiveTabs } from "@/lib/queries/permissions";
import { allTabIds } from "@/lib/dashboardTabs";
import { Role } from "@prisma/client";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAnyRole([Role.ADMIN, Role.COORDINATOR]);
  const initials = user.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  const enabledTabs = user.role === Role.COORDINATOR ? await getEffectiveTabs("COORDINATOR") : allTabIds("COORDINATOR");

  return (
    <DashboardShell
      role="ADMIN"
      brandLabel={user.role === Role.COORDINATOR ? "Coordinator" : "Admin"}
      headerTitle={user.role === Role.COORDINATOR ? "Coordinator Panel" : "Admin Panel"}
      user={{ initials, name: user.name, subtitle: user.email, gradient: "from-red-500 to-orange-600" }}
      showMessagesIcon
      enabledTabs={enabledTabs}
    >
      {children}
    </DashboardShell>
  );
}
