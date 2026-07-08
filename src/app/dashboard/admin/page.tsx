"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Users, Calendar, Building2, Activity, FileText, Stethoscope,
  Globe, CreditCard,
} from "lucide-react";
import { ComingSoon } from "@/components/dashboard/DashboardShell";

const recentLeads = [
  { name: "Ahmad Hassan", country: "UAE", treatment: "Heart Surgery", status: "New", date: "Today" },
  { name: "Jennifer Smith", country: "USA", treatment: "Knee Replacement", status: "Contacted", date: "Today" },
  { name: "Liu Mei", country: "China", treatment: "IVF", status: "Qualified", date: "Yesterday" },
  { name: "Patrick Brown", country: "UK", treatment: "Dental", status: "New", date: "Yesterday" },
  { name: "Fatima Al-Sayed", country: "Saudi Arabia", treatment: "Oncology", status: "In Progress", date: "2 days ago" },
];

export default function AdminDashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") ?? "overview";

  const goToOverview = () => router.push(`${pathname}?tab=overview`, { scroll: false });

  if (activeTab !== "overview") {
    return <ComingSoon label={activeTab} onBack={goToOverview} />;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Building2, label: "Hospitals", value: "258", change: "+3 this month", color: "text-primary bg-primary/10" },
          { icon: Stethoscope, label: "Doctors", value: "3,142", change: "+28 this month", color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30" },
          { icon: Users, label: "Patients", value: "52,847", change: "+1,240 this month", color: "text-green-600 bg-green-100 dark:bg-green-900/30" },
          { icon: CreditCard, label: "Revenue", value: "$4.2M", change: "↑ 18% vs last month", color: "text-amber-600 bg-amber-100 dark:bg-amber-900/30" },
        ].map((card) => (
          <motion.div key={card.label} className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-border card-hover" whileHover={{ scale: 1.02 }}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.color}`}><card.icon size={20} /></div>
            </div>
            <p className="text-xs text-muted font-medium">{card.label}</p>
            <p className="text-2xl font-bold mt-1">{card.value}</p>
            <p className="text-xs text-green-600 font-medium mt-1">{card.change}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Leads", value: "342", icon: Activity },
          { label: "Appointments Today", value: "89", icon: Calendar },
          { label: "Pending Reports", value: "24", icon: FileText },
          { label: "Countries Active", value: "65", icon: Globe },
        ].map((card) => (
          <div key={card.label} className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted">{card.label}</p>
                <p className="text-xl font-bold mt-1">{card.value}</p>
              </div>
              <card.icon size={20} className="text-muted" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold">Recent Leads</h3>
            <button className="text-sm text-primary font-medium">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2.5 text-muted font-medium">Patient</th>
                  <th className="text-left py-2.5 text-muted font-medium">Country</th>
                  <th className="text-left py-2.5 text-muted font-medium">Treatment</th>
                  <th className="text-left py-2.5 text-muted font-medium">Status</th>
                  <th className="text-left py-2.5 text-muted font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => (
                  <tr key={lead.name} className="border-b border-border last:border-0 hover:bg-surface transition-colors cursor-pointer">
                    <td className="py-3 font-medium">{lead.name}</td>
                    <td className="py-3 text-muted">{lead.country}</td>
                    <td className="py-3 text-muted">{lead.treatment}</td>
                    <td className="py-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        lead.status === "New" ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30" :
                        lead.status === "Contacted" ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30" :
                        lead.status === "Qualified" ? "bg-green-100 text-green-600 dark:bg-green-900/30" :
                        "bg-purple-100 text-purple-600 dark:bg-purple-900/30"
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3 text-muted text-xs">{lead.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
            <h3 className="font-semibold mb-4">Top Countries</h3>
            <div className="space-y-3">
              {[
                { country: "🇺🇸 United States", patients: 8420, pct: 28 },
                { country: "🇬🇧 United Kingdom", patients: 5630, pct: 19 },
                { country: "🇦🇪 UAE", patients: 4210, pct: 14 },
                { country: "🇧🇩 Bangladesh", patients: 3850, pct: 13 },
                { country: "🇳🇬 Nigeria", patients: 2940, pct: 10 },
              ].map((c) => (
                <div key={c.country}>
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span>{c.country}</span>
                    <span className="text-muted">{c.patients.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-border overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${c.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
            <h3 className="font-semibold mb-4">Platform Health</h3>
            <div className="space-y-3">
              {[
                { label: "Uptime", value: "99.97%", status: "green" },
                { label: "Avg Response Time", value: "1.2s", status: "green" },
                { label: "Active Users", value: "1,847", status: "green" },
                { label: "Pending Tickets", value: "12", status: "amber" },
                { label: "Error Rate", value: "0.03%", status: "green" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center py-1.5">
                  <span className="text-sm text-muted">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{item.value}</span>
                    <div className={`w-2 h-2 rounded-full ${item.status === "green" ? "bg-green-500" : "bg-amber-500"}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
