import { requireRole } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { getEffectiveTabs } from "@/lib/queries/permissions";
import { Role } from "@prisma/client";

export default async function DoctorDashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole(Role.DOCTOR);
  const initials = user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const enabledTabs = await getEffectiveTabs("DOCTOR");

  return (
    <DashboardShell
      role="DOCTOR"
      brandLabel="GativCare"
      headerTitle="Doctor Dashboard"
      user={{ initials, name: user.name, subtitle: user.doctor?.specialization ?? "Doctor", gradient: "from-green-500 to-emerald-600" }}
      enabledTabs={enabledTabs}
    >
      {children}
    </DashboardShell>
  );
}
