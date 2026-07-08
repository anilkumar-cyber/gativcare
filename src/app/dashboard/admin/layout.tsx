import { requireRole } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Role } from "@prisma/client";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole(Role.ADMIN);

  return (
    <DashboardShell
      role="ADMIN"
      brandLabel="Admin"
      headerTitle="Admin Panel"
      user={{ initials: "SA", name: user.name, subtitle: user.email, gradient: "from-red-500 to-orange-600" }}
      showMessagesIcon
    >
      {children}
    </DashboardShell>
  );
}
