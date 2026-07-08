import { requireRole } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Role } from "@prisma/client";

export default async function DoctorDashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole(Role.DOCTOR);
  const initials = user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <DashboardShell
      role="DOCTOR"
      brandLabel="GativCare"
      headerTitle="Doctor Dashboard"
      user={{ initials, name: user.name, subtitle: user.doctor?.specialization ?? "Doctor", gradient: "from-green-500 to-emerald-600" }}
    >
      {children}
    </DashboardShell>
  );
}
