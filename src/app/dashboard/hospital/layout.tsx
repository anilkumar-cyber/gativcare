import {
  Users, Calendar, Building2, Settings, Bed, Stethoscope,
  Star, Home, CreditCard, BarChart3, ClipboardList,
} from "lucide-react";
import { requireRole } from "@/lib/auth";
import { DashboardShell, type DashboardNavSection } from "@/components/dashboard/DashboardShell";
import { Role } from "@prisma/client";

const sections: DashboardNavSection[] = [
  {
    items: [
      { icon: Home, label: "Overview", id: "overview" },
      { icon: Stethoscope, label: "Doctors", id: "doctors" },
      { icon: Users, label: "Patients", id: "patients" },
      { icon: Calendar, label: "Appointments", id: "appointments" },
      { icon: Building2, label: "Departments", id: "departments" },
      { icon: Bed, label: "Bed Management", id: "beds" },
      { icon: ClipboardList, label: "Packages", id: "packages" },
      { icon: CreditCard, label: "Billing", id: "billing" },
      { icon: BarChart3, label: "Analytics", id: "analytics" },
      { icon: Star, label: "Reviews", id: "reviews" },
      { icon: Settings, label: "Settings", id: "settings" },
    ],
  },
];

export default async function HospitalDashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole(Role.HOSPITAL);
  const initials = user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <DashboardShell
      brandLabel="GativCare"
      headerTitle="Hospital Dashboard"
      user={{ initials, name: user.name, subtitle: user.hospitalOwned?.city ?? "Hospital", gradient: "from-blue-500 to-indigo-600" }}
      sections={sections}
    >
      {children}
    </DashboardShell>
  );
}
