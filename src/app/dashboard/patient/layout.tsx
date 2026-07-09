import { requireRole } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { getEffectiveTabs } from "@/lib/queries/permissions";
import { Role } from "@prisma/client";

export default async function PatientDashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole(Role.PATIENT);
  const initials = user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const enabledTabs = await getEffectiveTabs("PATIENT");

  return (
    <DashboardShell
      role="PATIENT"
      brandLabel="GativCare"
      headerTitle="Patient Dashboard"
      user={{ initials, name: user.name, subtitle: `Patient ID: ${user.patient?.gcNumber ?? ""}`, gradient: "from-primary to-accent" }}
      showMessagesIcon
      enabledTabs={enabledTabs}
    >
      {children}
    </DashboardShell>
  );
}
