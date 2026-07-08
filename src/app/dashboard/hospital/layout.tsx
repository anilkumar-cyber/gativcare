import { requireRole } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Role } from "@prisma/client";

export default async function HospitalDashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole(Role.HOSPITAL);
  const initials = user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <DashboardShell
      role="HOSPITAL"
      brandLabel="GativCare"
      headerTitle="Hospital Dashboard"
      user={{ initials, name: user.name, subtitle: user.hospitalOwned?.city ?? "Hospital", gradient: "from-blue-500 to-indigo-600" }}
    >
      {children}
    </DashboardShell>
  );
}
