"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users, Calendar, Building2, Bell, Settings, Activity, FileText,
  Stethoscope, TrendingUp, Star, Menu, X, Home, LogOut, BarChart3,
  CreditCard, MessageCircle, Globe, Shield, Megaphone, BookOpen,
  HelpCircle, UserCog, Lock, Eye, Mail, Smartphone
} from "lucide-react";
import Link from "next/link";

const sidebarSections = [
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

const recentLeads = [
  { name: "Ahmad Hassan", country: "UAE", treatment: "Heart Surgery", status: "New", date: "Today" },
  { name: "Jennifer Smith", country: "USA", treatment: "Knee Replacement", status: "Contacted", date: "Today" },
  { name: "Liu Mei", country: "China", treatment: "IVF", status: "Qualified", date: "Yesterday" },
  { name: "Patrick Brown", country: "UK", treatment: "Dental", status: "New", date: "Yesterday" },
  { name: "Fatima Al-Sayed", country: "Saudi Arabia", treatment: "Oncology", status: "In Progress", date: "2 days ago" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface flex">
      <aside className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-white dark:bg-slate-900 border-r border-border flex flex-col transition-transform lg:translate-x-0 overflow-y-auto ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-5 border-b border-border flex items-center justify-between sticky top-0 bg-white dark:bg-slate-900 z-10">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center text-sm font-bold">G</div>
            <span className="font-bold text-gradient">Admin</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden"><X size={20} /></button>
        </div>

        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-600 text-white flex items-center justify-center font-bold text-sm">SA</div>
            <div>
              <p className="text-sm font-semibold">Super Admin</p>
              <p className="text-xs text-muted">admin@gativcare.com</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-4">
          {sidebarSections.map((section) => (
            <div key={section.title}>
              <p className="text-[10px] font-bold text-muted uppercase tracking-widest px-3 mb-2">{section.title}</p>
              <div className="space-y-0.5">
                {section.items.map((item) => (
                  <button key={item.id} onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === item.id ? "bg-primary/10 text-primary" : "text-muted hover:bg-surface"}`}>
                    <item.icon size={16} />{item.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-border sticky bottom-0 bg-white dark:bg-slate-900">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted hover:text-foreground"><LogOut size={16} /> Back to Website</Link>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-border px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-surface"><Menu size={20} /></button>
            <h1 className="text-lg font-semibold">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-surface"><Bell size={18} /><span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" /></button>
            <button className="relative p-2 rounded-lg hover:bg-surface"><MessageCircle size={18} /></button>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          {activeTab === "overview" && (
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
          )}

          {activeTab !== "overview" && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-12 text-center">
              <div className="text-6xl mb-4">🏗️</div>
              <h3 className="text-xl font-bold mb-2 capitalize">{activeTab}</h3>
              <p className="text-muted mb-6">This admin module is under development. Full CRUD functionality coming soon.</p>
              <button onClick={() => setActiveTab("overview")} className="btn-primary">Back to Dashboard</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
