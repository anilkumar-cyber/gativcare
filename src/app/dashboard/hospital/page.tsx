"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Bed, Stethoscope, Users, TrendingUp, Globe } from "lucide-react";
import { ComingSoon } from "@/components/dashboard/DashboardShell";

const departmentStats = [
  { name: "Cardiology", doctors: 45, patients: 120, occupancy: 85 },
  { name: "Orthopedics", doctors: 32, patients: 95, occupancy: 72 },
  { name: "Oncology", doctors: 28, patients: 88, occupancy: 90 },
  { name: "Neurology", doctors: 22, patients: 65, occupancy: 68 },
  { name: "IVF Center", doctors: 15, patients: 42, occupancy: 55 },
];

export default function HospitalDashboard() {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Bed, label: "Total Beds", value: "1,250", sub: "78% occupied", color: "text-primary bg-primary/10" },
          { icon: Stethoscope, label: "Active Doctors", value: "800", sub: "42 on duty now", color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30" },
          { icon: Users, label: "Int'l Patients", value: "156", sub: "This month", color: "text-green-600 bg-green-100 dark:bg-green-900/30" },
          { icon: TrendingUp, label: "Revenue", value: "$2.4M", sub: "↑ 12% this month", color: "text-amber-600 bg-amber-100 dark:bg-amber-900/30" },
        ].map((card) => (
          <motion.div key={card.label} className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-border card-hover" whileHover={{ scale: 1.02 }}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.color}`}><card.icon size={20} /></div>
              <span className="text-xs text-muted font-medium">{card.label}</span>
            </div>
            <p className="text-2xl font-bold">{card.value}</p>
            <p className="text-xs text-muted mt-1">{card.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
          <h3 className="font-semibold mb-5">Department Overview</h3>
          <div className="space-y-4">
            {departmentStats.map((dept) => (
              <div key={dept.name} className="p-4 rounded-xl bg-surface border border-border">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-sm">{dept.name}</h4>
                  <span className="text-xs text-muted">{dept.occupancy}% occupancy</span>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div><p className="text-lg font-bold text-primary">{dept.doctors}</p><p className="text-[10px] text-muted">Doctors</p></div>
                  <div><p className="text-lg font-bold text-blue-600">{dept.patients}</p><p className="text-[10px] text-muted">Patients</p></div>
                  <div><p className="text-lg font-bold text-green-600">{dept.occupancy}%</p><p className="text-[10px] text-muted">Occupancy</p></div>
                </div>
                <div className="w-full h-2 rounded-full bg-border overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${dept.occupancy > 80 ? "bg-red-500" : dept.occupancy > 60 ? "bg-amber-500" : "bg-green-500"}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${dept.occupancy}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
            <h3 className="font-semibold mb-4">Quick Stats</h3>
            <div className="space-y-3">
              {[
                { label: "Surgeries Today", value: "12" },
                { label: "Admissions", value: "8" },
                { label: "Discharges", value: "6" },
                { label: "Emergency", value: "3" },
                { label: "OPD Visits", value: "245" },
              ].map((stat) => (
                <div key={stat.label} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                  <span className="text-sm text-muted">{stat.label}</span>
                  <span className="text-sm font-bold">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Globe size={16} className="text-primary" /> International Patients</h3>
            <div className="space-y-2">
              {[
                { country: "🇺🇸 USA", count: 45 },
                { country: "🇬🇧 UK", count: 32 },
                { country: "🇦🇪 UAE", count: 28 },
                { country: "🇧🇩 Bangladesh", count: 24 },
                { country: "🇳🇬 Nigeria", count: 18 },
              ].map((c) => (
                <div key={c.country} className="flex justify-between items-center py-1.5">
                  <span className="text-sm">{c.country}</span>
                  <span className="text-sm font-semibold text-primary">{c.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
