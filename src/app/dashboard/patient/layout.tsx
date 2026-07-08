import {
  Calendar, FileText, CreditCard, MessageCircle, Video, Plane,
  Settings, Bell, Home, ClipboardList, Pill, HeartPulse,
} from "lucide-react";
import { requireRole } from "@/lib/auth";
import { DashboardShell, type DashboardNavSection } from "@/components/dashboard/DashboardShell";
import { Role } from "@prisma/client";

const sections: DashboardNavSection[] = [
  {
    items: [
      { icon: Home, label: "Overview", id: "overview" },
      { icon: Calendar, label: "Appointments", id: "appointments" },
      { icon: FileText, label: "Medical Reports", id: "reports" },
      { icon: ClipboardList, label: "Treatment Plan", id: "treatment" },
      { icon: CreditCard, label: "Payments", id: "payments" },
      { icon: MessageCircle, label: "Messages", id: "messages" },
      { icon: Video, label: "Video Calls", id: "video" },
      { icon: Pill, label: "Prescriptions", id: "prescriptions" },
      { icon: Plane, label: "Travel", id: "travel" },
      { icon: HeartPulse, label: "Recovery", id: "recovery" },
      { icon: Bell, label: "Notifications", id: "notifications" },
      { icon: Settings, label: "Settings", id: "settings" },
    ],
  },
];

export default async function PatientDashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole(Role.PATIENT);
  const initials = user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <DashboardShell
      brandLabel="GativCare"
      headerTitle="Patient Dashboard"
      user={{ initials, name: user.name, subtitle: `Patient ID: ${user.patient?.gcNumber ?? ""}`, gradient: "from-primary to-accent" }}
      sections={sections}
      showMessagesIcon
    >
      {children}
    </DashboardShell>
  );
}
