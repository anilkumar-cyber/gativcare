import {
  Users, Calendar, Building2, Settings, Activity, Stethoscope,
  TrendingUp, Star, Home, BarChart3, CreditCard, Globe, Shield,
  Megaphone, BookOpen, HelpCircle, UserCog, Lock, Eye, Mail, Smartphone,
} from "lucide-react";
import { requireRole } from "@/lib/auth";
import { DashboardShell, type DashboardNavSection } from "@/components/dashboard/DashboardShell";
import { Role } from "@prisma/client";

const sections: DashboardNavSection[] = [
  {
    title: "Overview",
    items: [
      { icon: Home, label: "Dashboard", id: "overview" },
      { icon: BarChart3, label: "Analytics", id: "analytics" },
      { icon: TrendingUp, label: "Reports", id: "reports" },
    ],
  },
  {
    title: "Management",
    items: [
      { icon: Building2, label: "Hospitals", id: "hospitals" },
      { icon: Stethoscope, label: "Doctors", id: "doctors" },
      { icon: Users, label: "Patients", id: "patients" },
      { icon: UserCog, label: "Coordinators", id: "coordinators" },
      { icon: Calendar, label: "Appointments", id: "appointments" },
    ],
  },
  {
    title: "Content",
    items: [
      { icon: BookOpen, label: "Blog / CMS", id: "cms" },
      { icon: HelpCircle, label: "FAQ", id: "faq" },
      { icon: Star, label: "Testimonials", id: "testimonials" },
      { icon: Globe, label: "Countries", id: "countries" },
    ],
  },
  {
    title: "Marketing",
    items: [
      { icon: Megaphone, label: "Campaigns", id: "campaigns" },
      { icon: Mail, label: "Email", id: "email" },
      { icon: Smartphone, label: "WhatsApp", id: "whatsapp" },
      { icon: Activity, label: "Leads / CRM", id: "leads" },
    ],
  },
  {
    title: "System",
    items: [
      { icon: CreditCard, label: "Payments", id: "payments" },
      { icon: Shield, label: "Security", id: "security" },
      { icon: Lock, label: "Roles", id: "roles" },
      { icon: Eye, label: "Audit Logs", id: "audit" },
      { icon: Settings, label: "Settings", id: "settings" },
    ],
  },
];

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole(Role.ADMIN);

  return (
    <DashboardShell
      brandLabel="Admin"
      headerTitle="Admin Panel"
      user={{ initials: "SA", name: user.name, subtitle: user.email, gradient: "from-red-500 to-orange-600" }}
      sections={sections}
      showMessagesIcon
    >
      {children}
    </DashboardShell>
  );
}
