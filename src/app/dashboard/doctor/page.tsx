"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, Users, Star, TrendingUp } from "lucide-react";
import { ComingSoon } from "@/components/dashboard/DashboardShell";

const todayAppointments = [
  { patient: "James Wilson", age: 45, type: "Follow-up", time: "9:00 AM", mode: "In-Person", status: "Confirmed" },
  { patient: "Sarah Ahmed", age: 38, type: "Consultation", time: "10:30 AM", mode: "Video", status: "Confirmed" },
  { patient: "Mohammed Al-Rashid", age: 52, type: "Pre-Surgery", time: "11:30 AM", mode: "In-Person", status: "Waiting" },
  { patient: "Emily Chen", age: 41, type: "Post-Op Review", time: "2:00 PM", mode: "Video", status: "Confirmed" },
  { patient: "David Brown", age: 60, type: "Consultation", time: "3:30 PM", mode: "In-Person", status: "Pending" },
];

const recentPatients = [
  { name: "James Wilson", country: "USA", treatment: "Cardiac Bypass", status: "Recovery", progress: 75 },
  { name: "Sarah Ahmed", country: "UK", treatment: "Knee Replacement", status: "Post-Op", progress: 90 },
  { name: "Li Wei", country: "China", treatment: "Liver Transplant", status: "Pre-Op", progress: 30 },
  { name: "Maria Garcia", country: "Spain", treatment: "Spine Surgery", status: "Treatment", progress: 50 },
];

export default function DoctorDashboard() {
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
          { icon: Calendar, label: "Today's Appointments", value: "5", sub: "2 Video, 3 In-Person", color: "text-primary bg-primary/10" },
          { icon: Users, label: "Active Patients", value: "28", sub: "6 international", color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30" },
          { icon: Star, label: "Rating", value: "4.9", sub: "750 reviews", color: "text-amber-600 bg-amber-100 dark:bg-amber-900/30" },
          { icon: TrendingUp, label: "Success Rate", value: "99.1%", sub: "Last 12 months", color: "text-green-600 bg-green-100 dark:bg-green-900/30" },
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
          <h3 className="font-semibold mb-5">Today&apos;s Schedule</h3>
          <div className="space-y-3">
            {todayAppointments.map((apt) => (
              <div key={apt.patient} className="flex items-center justify-between p-3 rounded-xl bg-surface border border-border hover:bg-surface-hover transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-sm font-bold text-primary">
                    {apt.patient.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{apt.patient}</p>
                    <p className="text-xs text-muted">{apt.type} • Age {apt.age}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{apt.time}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${apt.mode === "Video" ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30" : "bg-green-100 text-green-600 dark:bg-green-900/30"}`}>
                      {apt.mode}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      apt.status === "Confirmed" ? "bg-green-100 text-green-600" :
                      apt.status === "Waiting" ? "bg-amber-100 text-amber-600" :
                      "bg-gray-100 text-gray-600"
                    }`}>
                      {apt.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
          <h3 className="font-semibold mb-5">Patient Progress</h3>
          <div className="space-y-4">
            {recentPatients.map((patient) => (
              <div key={patient.name} className="p-3 rounded-xl bg-surface border border-border">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold">{patient.name}</p>
                  <span className="text-[10px] text-muted">{patient.country}</span>
                </div>
                <p className="text-xs text-muted mb-2">{patient.treatment} • {patient.status}</p>
                <div className="w-full h-2 rounded-full bg-border overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                    initial={{ width: 0 }}
                    animate={{ width: `${patient.progress}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
                <p className="text-[10px] text-muted mt-1 text-right">{patient.progress}% complete</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
