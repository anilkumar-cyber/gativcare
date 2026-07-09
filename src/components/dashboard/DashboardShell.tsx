"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Bell, MessageCircle, Menu, X, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { logoutAction } from "@/lib/actions/auth";
import { sectionsByRole, type DashboardRole } from "@/lib/dashboardTabs";

export type { DashboardRole };

export function DashboardShell({
  role,
  brandLabel,
  headerTitle,
  user,
  showMessagesIcon = false,
  enabledTabs,
  children,
}: {
  role: DashboardRole;
  brandLabel: string;
  headerTitle: string;
  user: { initials: string; name: string; subtitle: string; gradient: string };
  showMessagesIcon?: boolean;
  /** Tab ids to show in the nav. Omit to show everything (no restriction). */
  enabledTabs?: string[];
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") ?? "overview";
  const sections = enabledTabs
    ? sectionsByRole[role]
        .map((section) => ({ ...section, items: section.items.filter((item) => enabledTabs.includes(item.id)) }))
        .filter((section) => section.items.length > 0)
    : sectionsByRole[role];

  const setActiveTab = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", id);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-surface flex">
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-white dark:bg-slate-900 border-r border-border flex flex-col transition-transform lg:translate-x-0 overflow-y-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 border-b border-border flex items-center justify-between sticky top-0 bg-white dark:bg-slate-900 z-10">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo-icon.png" alt="GativCare" width={32} height={32} className="w-8 h-8" />
            <span className="font-bold text-gradient">{brandLabel}</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden"><X size={20} /></button>
        </div>

        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${user.gradient} text-white flex items-center justify-center font-bold text-sm`}>
              {user.initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">{user.name}</p>
              <p className="text-xs text-muted truncate">{user.subtitle}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-4">
          {sections.map((section) => (
            <div key={section.title ?? "main"}>
              {section.title && (
                <p className="text-[10px] font-bold text-muted uppercase tracking-widest px-3 mb-2">{section.title}</p>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeTab === item.id ? "bg-primary/10 text-primary" : "text-muted hover:bg-surface"
                    }`}
                  >
                    <item.icon size={16} />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-border sticky bottom-0 bg-white dark:bg-slate-900 space-y-1">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted hover:text-foreground">
            <LogOut size={16} /> Back to Website
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="flex items-center gap-2 text-sm text-muted hover:text-foreground w-full">
              <LogOut size={16} /> Log Out
            </button>
          </form>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-border px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-surface"><Menu size={20} /></button>
            <h1 className="text-lg font-semibold capitalize">{headerTitle}</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-surface">
              <Bell size={18} /><span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            {showMessagesIcon && (
              <button className="relative p-2 rounded-lg hover:bg-surface"><MessageCircle size={18} /></button>
            )}
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

export function ComingSoon({ label, backHref }: { label: string; backHref: string }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-12 text-center">
      <div className="text-6xl mb-4">🏗️</div>
      <h3 className="text-xl font-bold mb-2 capitalize">{label}</h3>
      <p className="text-muted mb-6">This section is under development.</p>
      <Link href={backHref} className="btn-primary">Back to Dashboard</Link>
    </div>
  );
}
