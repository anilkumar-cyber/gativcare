import {
  type LucideIcon,
  Users, Calendar, Building2, Settings, Activity, FileText, Stethoscope,
  TrendingUp, Star, Home, BarChart3, CreditCard, Globe, Shield,
  Megaphone, BookOpen, HelpCircle, UserCog, Lock, Eye, Mail, Smartphone,
  Video, ClipboardList, Bed, Plane, Pill, HeartPulse, MessageCircle, Bell,
} from "lucide-react";

export type DashboardRole = "ADMIN" | "DOCTOR" | "HOSPITAL" | "PATIENT";
export type DashboardNavItem = { icon: LucideIcon; label: string; id: string };
export type DashboardNavSection = { title?: string; items: DashboardNavItem[] };

export const sectionsByRole: Record<DashboardRole, DashboardNavSection[]> = {
  ADMIN: [
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
  ],
  DOCTOR: [
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
  ],
  HOSPITAL: [
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
  ],
  PATIENT: [
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
  ],
};

// Roles whose dashboard tab access an admin can restrict. ADMIN itself is
// always full-access (avoids an admin locking every admin out at once);
// COORDINATOR shares the ADMIN panel's tab set since it's the same shell.
export type ConfigurableRole = "DOCTOR" | "HOSPITAL" | "PATIENT" | "COORDINATOR";

export const CONFIGURABLE_ROLE_TABS: Record<ConfigurableRole, DashboardNavItem[]> = {
  DOCTOR: sectionsByRole.DOCTOR.flatMap((s) => s.items),
  HOSPITAL: sectionsByRole.HOSPITAL.flatMap((s) => s.items),
  PATIENT: sectionsByRole.PATIENT.flatMap((s) => s.items),
  COORDINATOR: sectionsByRole.ADMIN.flatMap((s) => s.items),
};

export function allTabIds(role: ConfigurableRole): string[] {
  return CONFIGURABLE_ROLE_TABS[role].map((t) => t.id);
}

// Sensible default for coordinators before an admin configures permissions —
// mirrors what a coordinator could already do (leads/appointments/patients focus).
export const DEFAULT_COORDINATOR_TABS = ["overview", "leads", "appointments", "patients", "countries", "analytics", "settings"];
