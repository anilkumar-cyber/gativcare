import {
  Calendar, FileText, MessageCircle, Video, Settings, Users,
  ClipboardList, Home, TrendingUp,
} from "lucide-react";
import { requireRole } from "@/lib/auth";
import { DashboardShell, type DashboardNavSection } from "@/components/dashboard/DashboardShell";
import { Role } from "@prisma/client";

const sections: DashboardNavSection[] = [
  {
    items: [
      { icon: Home, label: "Dashboard", id: "overview" },
      { icon: Calendar, label: "Appointments", id: "appointments" },
      { icon: Users, label: "My Patients", id: "patients" },
      { icon: FileText, label: "Medical Reports", id: "reports" },
      { icon: Video, label: "Video Consults", id: "video" },
      { icon: ClipboardList, label: "Prescriptions", id: "prescriptions" },
      { icon: MessageCircle, label: "Messages", id: "messages" },
      { icon: TrendingUp, label: "Analytics", id: "analytics" },
      { icon: Settings, label: "Settings", id: "settings" },
    ],
  },
];

export default async function DoctorDashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole(Role.DOCTOR);
  const initials = user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <DashboardShell
      brandLabel="GativCare"
      headerTitle="Doctor Dashboard"
      user={{ initials, name: user.name, subtitle: user.doctor?.specialization ?? "Doctor", gradient: "from-green-500 to-emerald-600" }}
      sections={sections}
    >
      {children}
    </DashboardShell>
  );
}
