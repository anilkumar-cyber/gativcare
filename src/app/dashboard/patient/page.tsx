"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, Activity, CreditCard, FileText, Download, Plane, Hotel, Car, Globe } from "lucide-react";
import { ComingSoon } from "@/components/dashboard/DashboardShell";

const upcomingAppointments = [
  { doctor: "Dr. Naresh Trehan", specialty: "Cardiac Surgery", date: "Jul 15, 2024", time: "10:00 AM", type: "In-Person", hospital: "Medanta" },
  { doctor: "Dr. Randeep Guleria", specialty: "Pulmonology", date: "Jul 18, 2024", time: "2:30 PM", type: "Video", hospital: "Apollo" },
];

const recentReports = [
  { name: "Blood Test Report", date: "Jul 10, 2024", status: "Ready", type: "Lab" },
  { name: "ECG Report", date: "Jul 8, 2024", status: "Ready", type: "Diagnostic" },
  { name: "MRI Scan", date: "Jul 5, 2024", status: "Under Review", type: "Imaging" },
  { name: "Chest X-Ray", date: "Jul 3, 2024", status: "Ready", type: "Imaging" },
];

const treatmentTimeline = [
  { step: "Initial Consultation", status: "completed", date: "Jun 25" },
  { step: "Diagnostic Tests", status: "completed", date: "Jul 3" },
  { step: "Treatment Plan Approved", status: "completed", date: "Jul 10" },
  { step: "Surgery Scheduled", status: "active", date: "Jul 20" },
  { step: "Surgery", status: "upcoming", date: "Jul 20" },
  { step: "Recovery & Rehab", status: "upcoming", date: "Jul 21-28" },
  { step: "Follow-up", status: "upcoming", date: "Aug 15" },
];

export default function PatientDashboard() {
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
          { icon: Calendar, label: "Next Appointment", value: "Jul 15, 2024", sub: "Dr. Naresh Trehan", color: "text-primary bg-primary/10" },
          { icon: Activity, label: "Treatment Status", value: "In Progress", sub: "Phase 3 of 5", color: "text-amber-600 bg-amber-100 dark:bg-amber-900/30" },
          { icon: CreditCard, label: "Outstanding", value: "$1,200", sub: "Next payment: Jul 20", color: "text-green-600 bg-green-100 dark:bg-green-900/30" },
          { icon: FileText, label: "Reports Ready", value: "3 New", sub: "2 pending review", color: "text-purple-600 bg-purple-100 dark:bg-purple-900/30" },
        ].map((card) => (
          <motion.div
            key={card.label}
            className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-border card-hover"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.color}`}>
                <card.icon size={20} />
              </div>
              <span className="text-xs text-muted font-medium">{card.label}</span>
            </div>
            <p className="text-xl font-bold">{card.value}</p>
            <p className="text-xs text-muted mt-1">{card.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold">Treatment Timeline</h3>
            <button className="text-sm text-primary font-medium">View Full</button>
          </div>
          <div className="space-y-4">
            {treatmentTimeline.map((step, i) => (
              <div key={step.step} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                  step.status === "completed" ? "bg-green-100 text-green-600 dark:bg-green-900/30" :
                  step.status === "active" ? "bg-primary/10 text-primary ring-2 ring-primary" :
                  "bg-surface text-muted"
                }`}>
                  {step.status === "completed" ? "✓" : i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${step.status === "upcoming" ? "text-muted" : ""}`}>{step.step}</p>
                  <p className="text-xs text-muted">{step.date}</p>
                </div>
                {step.status === "active" && (
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">Current</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
          <h3 className="font-semibold mb-5">Upcoming Appointments</h3>
          <div className="space-y-4">
            {upcomingAppointments.map((apt) => (
              <div key={apt.doctor} className="p-3 rounded-xl bg-surface border border-border">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold">{apt.doctor}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    apt.type === "Video" ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30" : "bg-green-100 text-green-600 dark:bg-green-900/30"
                  }`}>
                    {apt.type}
                  </span>
                </div>
                <p className="text-xs text-muted">{apt.specialty} • {apt.hospital}</p>
                <p className="text-xs text-primary font-medium mt-1.5">{apt.date} at {apt.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold">Recent Medical Reports</h3>
          <button className="text-sm text-primary font-medium">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 text-muted font-medium">Report</th>
                <th className="text-left py-3 text-muted font-medium">Type</th>
                <th className="text-left py-3 text-muted font-medium">Date</th>
                <th className="text-left py-3 text-muted font-medium">Status</th>
                <th className="text-right py-3 text-muted font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentReports.map((report) => (
                <tr key={report.name} className="border-b border-border last:border-0">
                  <td className="py-3 font-medium">{report.name}</td>
                  <td className="py-3 text-muted">{report.type}</td>
                  <td className="py-3 text-muted">{report.date}</td>
                  <td className="py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      report.status === "Ready" ? "bg-green-100 text-green-600 dark:bg-green-900/30" : "bg-amber-100 text-amber-600 dark:bg-amber-900/30"
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button className="text-primary hover:text-primary-dark"><Download size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Plane, label: "Travel Details", desc: "Flight & visa info", color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20" },
          { icon: Hotel, label: "Accommodation", desc: "Hotel booking", color: "text-purple-600 bg-purple-50 dark:bg-purple-900/20" },
          { icon: Car, label: "Transport", desc: "Airport pickup", color: "text-amber-600 bg-amber-50 dark:bg-amber-900/20" },
          { icon: Globe, label: "Coordinator", desc: "24/7 support", color: "text-green-600 bg-green-50 dark:bg-green-900/20" },
        ].map((service) => (
          <motion.div
            key={service.label}
            className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-border cursor-pointer card-hover"
            whileHover={{ scale: 1.02 }}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${service.color}`}>
              <service.icon size={20} />
            </div>
            <p className="font-semibold text-sm">{service.label}</p>
            <p className="text-xs text-muted mt-1">{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
