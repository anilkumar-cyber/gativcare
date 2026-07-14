"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShieldCheck, HeartHandshake, BadgeDollarSign, Search,
  Building2, Stethoscope, Globe, Headphones,
} from "lucide-react";
import { TrustLogoStrip } from "./TrustLogoStrip";

const features = [
  { icon: ShieldCheck, label: "JCI & NABH Accredited Hospitals" },
  { icon: HeartHandshake, label: "Personalized Care" },
  { icon: BadgeDollarSign, label: "Transparent Pricing" },
];

const tabs = [
  { id: "treatment", label: "Find Treatment", href: "/treatments", placeholder: "Search for a treatment...", searches: ["Heart Surgery", "Cancer Treatment", "Liver Transplant", "IVF Treatment"] },
  { id: "hospital", label: "Find Hospital", href: "/hospitals", placeholder: "Search for a hospital...", searches: ["Apollo Hospitals", "Fortis Healthcare", "Medanta", "Narayana Health"] },
  { id: "package", label: "Find Package", href: "/packages", placeholder: "Search for a package...", searches: ["Heart Surgery Package", "IVF Package", "Dental Makeover", "Health Check"] },
];

const bottomBar = [
  { icon: Building2, label: "Top Hospitals", color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30" },
  { icon: Stethoscope, label: "Expert Doctors", color: "text-green-600 bg-green-100 dark:bg-green-900/30" },
  { icon: Globe, label: "Global Reach", color: "text-rose-600 bg-rose-100 dark:bg-rose-900/30" },
  { icon: Headphones, label: "Round-the-Clock Support", color: "text-purple-600 bg-purple-100 dark:bg-purple-900/30" },
  { icon: ShieldCheck, label: "Patient Safety First", color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30" },
];

export default function Hero() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const tab = tabs.find((t) => t.id === activeTab) ?? tabs[0];

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 dark:hidden" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-rose-50 to-teal-50" />
          <div className="absolute -top-24 -right-10 w-[36rem] h-[36rem] bg-gradient-to-br from-amber-200/60 to-orange-300/30 rounded-full blur-[110px]" />
          <div className="absolute -bottom-32 left-[8%] w-[32rem] h-[32rem] bg-gradient-to-br from-primary/25 to-accent/20 rounded-full blur-[120px]" />
        </div>
        <div className="hidden absolute inset-0 dark:block" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
          <div className="absolute -top-24 -right-10 w-[36rem] h-[36rem] bg-gradient-to-br from-amber-500/10 to-orange-500/5 rounded-full blur-[110px]" />
          <div className="absolute -bottom-32 left-[8%] w-[32rem] h-[32rem] bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-medium mb-6">
                <ShieldCheck size={14} /> Trusted by Patients Worldwide
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
                <span className="text-foreground">India&apos;s Most Trusted</span>
                <br />
                <span className="text-gradient">Medical Tourism</span>
                <br />
                <span className="text-foreground">Platform</span>
              </h1>

              <p className="text-lg text-muted max-w-xl mb-8 leading-relaxed">
                We connect you with JCI-accredited hospitals, world-class doctors, and seamless
                care — from consultation to recovery.
              </p>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8">
                {features.map((f) => (
                  <div key={f.label} className="flex items-center gap-2.5 max-w-[9rem]">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <f.icon size={16} className="text-primary" />
                    </div>
                    <span className="text-xs font-medium leading-snug">{f.label}</span>
                  </div>
                ))}
              </div>

              <div className="glass-card rounded-2xl p-5">
                <div className="flex items-center gap-5 border-b border-border mb-4">
                  {tabs.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setActiveTab(t.id)}
                      className={`pb-3 text-sm font-semibold transition-colors relative ${
                        activeTab === t.id ? "text-primary" : "text-muted hover:text-foreground"
                      }`}
                    >
                      {t.label}
                      {activeTab === t.id && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                      )}
                    </button>
                  ))}
                </div>

                <form action={tab.href} className="flex gap-2 mb-4">
                  <div className="relative flex-1">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                    <input
                      type="text"
                      name="q"
                      placeholder={tab.placeholder}
                      className="w-full bg-white dark:bg-slate-900 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 border border-border"
                    />
                  </div>
                  <button type="submit" className="btn-primary text-sm px-6">
                    Search
                  </button>
                </form>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-muted shrink-0">Popular Searches:</span>
                  {tab.searches.map((s) => (
                    <Link
                      key={s}
                      href={tab.href}
                      className="px-3 py-1.5 rounded-full bg-surface hover:bg-primary/10 hover:text-primary transition-colors border border-border"
                    >
                      {s}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 aspect-[4/3]">
                <Image
                  src="/images/hero-doctor-patient.png"
                  alt="Patient family with GativCare doctor"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="absolute -bottom-6 left-6 right-6 sm:left-8 sm:right-auto glass-card rounded-2xl p-4 flex items-center gap-3 shadow-xl"
              >
                <div className="flex -space-x-3 shrink-0">
                  {["J", "S", "M"].map((letter, i) => (
                    <div
                      key={letter}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-white dark:border-slate-900 flex items-center justify-center text-white text-sm font-bold"
                      style={{ zIndex: 3 - i }}
                    >
                      {letter}
                    </div>
                  ))}
                </div>
                <p className="text-sm font-semibold leading-snug">
                  Patients Welcomed <br className="sm:hidden" /> From Around the World
                </p>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass-card rounded-2xl p-6 mt-20 lg:mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            {bottomBar.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${item.color}`}>
                  <item.icon size={20} />
                </div>
                <span className="text-sm font-semibold leading-snug">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      <TrustLogoStrip />
    </>
  );
}
