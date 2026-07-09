import { requireAnyRole } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Role } from "@prisma/client";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAnyRole([Role.ADMIN, Role.COORDINATOR]);
  const initials = user.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

  return (
    <DashboardShell
      role="ADMIN"
      brandLabel={user.role === Role.COORDINATOR ? "Coordinator" : "Admin"}
      headerTitle={user.role === Role.COORDINATOR ? "Coordinator Panel" : "Admin Panel"}
      user={{ initials, name: user.name, subtitle: user.email, gradient: "from-red-500 to-orange-600" }}
      showMessagesIcon
    >
      {children}
    </DashboardShell>
  );
}
