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

const softShadow = "shadow-[0_20px_60px_rgba(0,0,0,0.08)]";

export default function Hero() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const tab = tabs.find((t) => t.id === activeTab) ?? tabs[0];

  return (
    <>
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 dark:hidden" aria-hidden="true">
          <Image src="/images/hero-bg.png" alt="" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-white/35" />
        </div>
        <div className="hidden absolute inset-0 dark:block" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
          <div className="absolute -top-24 -right-10 w-[36rem] h-[36rem] bg-gradient-to-br from-amber-500/10 to-orange-500/5 rounded-full blur-[110px]" />
          <div className="absolute -bottom-32 left-[8%] w-[32rem] h-[32rem] bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="relative lg:min-h-[560px]">
            {/* Photo sized to its own aspect ratio, anchored bottom-right on large
                screens. Mobile/tablet get a contained version inside the grid. */}
            <div className="hidden lg:block absolute bottom-0 right-0 w-[55%] aspect-[3/2]">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative w-full h-full"
              >
                <Image
                  src="/images/hero-img.png"
                  alt="Patient family with GativCare doctor"
                  fill
                  className="object-contain object-bottom"
                  priority
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: [0, -8, 0] }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.7 },
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.7 },
                }}
                className={`absolute bottom-16 left-1/2 -translate-x-1/2 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border border-white/40 dark:border-white/10 rounded-[24px] p-4 flex items-center gap-3 ${softShadow}`}
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
                <p className="text-sm font-semibold leading-snug whitespace-nowrap">
                  Patients Welcomed From Around the World
                </p>
              </motion.div>
            </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-medium mb-8">
                <ShieldCheck size={14} /> Trusted by Patients Worldwide
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-[72px] font-extrabold leading-[1.05] mb-8 max-w-[650px]">
                <span className="text-foreground">India&apos;s Most Trusted</span>
                <br />
                <span className="text-gradient">Medical Tourism</span>
                <br />
                <span className="text-foreground">Platform</span>
              </h1>

              <p className="text-lg text-muted max-w-[600px] mb-10 leading-relaxed">
                We connect you with JCI-accredited hospitals, world-class doctors, and seamless
                care — from consultation to recovery.
              </p>

              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mb-10">
                {features.map((f) => (
                  <div key={f.label} className="flex items-center gap-3 max-w-[9rem]">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <f.icon size={16} className="text-primary" />
                    </div>
                    <span className="text-xs font-medium leading-snug">{f.label}</span>
                  </div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-[24px] p-8 ${softShadow}`}
              >
                <div className="flex items-center gap-6 border-b border-border mb-5">
                  {tabs.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setActiveTab(t.id)}
                      className={`pb-4 text-sm font-semibold transition-colors relative ${
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

                <form action={tab.href} className="flex gap-3 mb-5">
                  <div className="relative flex-1">
                    <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                    <input
                      type="text"
                      name="q"
                      placeholder={tab.placeholder}
                      className="w-full h-16 bg-white dark:bg-slate-900 rounded-2xl pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/30 border border-border"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    type="submit"
                    className="h-16 px-8 rounded-[18px] bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
                  >
                    Search
                  </motion.button>
                </form>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-muted shrink-0">Popular Searches:</span>
                  {tab.searches.map((s) => (
                    <motion.div key={s} whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                      <Link
                        href={tab.href}
                        className="px-3 py-1.5 rounded-full bg-surface hover:bg-primary/10 hover:text-primary transition-colors border border-border inline-block"
                      >
                        {s}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative lg:hidden"
            >
              <div className="relative aspect-[3/2]">
                <Image
                  src="/images/hero-img.png"
                  alt="Patient family with GativCare doctor"
                  fill
                  className="object-contain object-bottom"
                  priority
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className={`relative -mt-8 mx-6 sm:mx-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-[24px] p-4 flex items-center gap-3 ${softShadow}`}
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
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-[30px] p-8 mt-14 lg:mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 max-w-[1300px] mx-auto ${softShadow}`}
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
