import { requireRole } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Role } from "@prisma/client";

export default async function PatientDashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole(Role.PATIENT);
  const initials = user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <DashboardShell
      role="PATIENT"
      brandLabel="GativCare"
      headerTitle="Patient Dashboard"
      user={{ initials, name: user.name, subtitle: `Patient ID: ${user.patient?.gcNumber ?? ""}`, gradient: "from-primary to-accent" }}
      showMessagesIcon
    >
      {children}
    </DashboardShell>
  );
}
