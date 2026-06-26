"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users, Calendar, Building2, Bell, Settings, Activity, FileText,
  Bed, Stethoscope, TrendingUp, Star, Menu, X, Home, LogOut,
  CreditCard, MessageCircle, BarChart3, ClipboardList, Globe
} from "lucide-react";
import Link from "next/link";

const sidebarItems = [
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
];

const departmentStats = [
  { name: "Cardiology", doctors: 45, patients: 120, occupancy: 85 },
  { name: "Orthopedics", doctors: 32, patients: 95, occupancy: 72 },
  { name: "Oncology", doctors: 28, patients: 88, occupancy: 90 },
  { name: "Neurology", doctors: 22, patients: 65, occupancy: 68 },
  { name: "IVF Center", doctors: 15, patients: 42, occupancy: 55 },
];

export default function HospitalDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface flex">
      <aside className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-white dark:bg-slate-900 border-r border-border flex flex-col transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-5 border-b border-border flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center text-sm font-bold">G</div>
            <span className="font-bold text-gradient">GativCare</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden"><X size={20} /></button>
        </div>
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-xs font-bold">MH</div>
            <div>
              <p className="text-sm font-semibold">Medanta Hospital</p>
              <p className="text-xs text-muted">Gurugram, India</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {sidebarItems.map((item) => (
            <button key={item.id} onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === item.id ? "bg-primary/10 text-primary" : "text-muted hover:bg-surface"}`}>
              <item.icon size={18} />{item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted hover:text-foreground"><LogOut size={16} /> Back to Website</Link>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-border px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-surface"><Menu size={20} /></button>
            <h1 className="text-lg font-semibold">Hospital Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-surface"><Bell size={18} /><span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" /></button>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          {activeTab === "overview" && (
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
          )}

          {activeTab !== "overview" && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-12 text-center">
              <div className="text-6xl mb-4">🏗️</div>
              <h3 className="text-xl font-bold mb-2 capitalize">{activeTab}</h3>
              <p className="text-muted mb-6">This section is under development.</p>
              <button onClick={() => setActiveTab("overview")} className="btn-primary">Back to Dashboard</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
