"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, TrendingDown, Users2, ArrowRight } from "lucide-react";
import { HeroQuoteCard } from "./HeroQuoteCard";
import { TrustLogoStrip } from "./TrustLogoStrip";

export default function Hero() {
  return (
    <>
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Warm, photo-like background — no real photograph asset available, so this
          is built from layered gradients/blur rather than a literal image. Drop a
          real photo at public/images/hero-bg.jpg and swap this div for an <Image>
          to upgrade it later. */}
      {/* Light-mode layer. Chained dark: gradient-stop utilities (from/via/to all
          overridden at once) didn't win against the light values in this project's
          Tailwind v4 setup, so light and dark are split into separately-visible
          layers instead of relying on dark: on every gradient stop. */}
      <div className="absolute inset-0 dark:hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-rose-50 to-teal-50" />
        <div className="absolute -top-24 -right-10 w-[36rem] h-[36rem] bg-gradient-to-br from-amber-200/60 to-orange-300/30 rounded-full blur-[110px]" />
        <div className="absolute -bottom-32 left-[8%] w-[32rem] h-[32rem] bg-gradient-to-br from-primary/25 to-accent/20 rounded-full blur-[120px]" />
        <div className="absolute top-[18%] left-[38%] w-80 h-80 bg-rose-200/40 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/60 to-white/5" />
      </div>

      {/* Dark-mode layer */}
      <div className="hidden absolute inset-0 dark:block" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute -top-24 -right-10 w-[36rem] h-[36rem] bg-gradient-to-br from-amber-500/10 to-orange-500/5 rounded-full blur-[110px]" />
        <div className="absolute -bottom-32 left-[8%] w-[32rem] h-[32rem] bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-[120px]" />
        <div className="absolute top-[18%] left-[38%] w-80 h-80 bg-rose-500/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/60 to-slate-950/5" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6">
              <span className="text-foreground">World-Class</span>
              <br />
              <span className="text-gradient">Healthcare</span>
              <br />
              <span className="text-foreground">in India</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted max-w-xl mb-8 leading-relaxed">
              Affordable, trusted, internationally accredited healthcare with complete
              end-to-end medical travel assistance. Save up to 90% on treatments.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <a
                href="#quote"
                className="btn-primary text-base py-3.5 px-7 flex items-center gap-2"
              >
                Get Your Free Consultation <ArrowRight size={18} />
              </a>
              <Link href="/treatments" className="btn-secondary text-base py-3.5 px-7 flex items-center gap-2">
                Explore Treatments
              </Link>
            </div>

          </motion.div>

          <motion.div
            id="quote"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative scroll-mt-28"
          >
            <HeroQuoteCard className="mx-auto" />

            <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto mt-6">
              <div className="glass-card rounded-2xl p-3 text-center">
                <ShieldCheck size={18} className="text-green-600 mx-auto mb-1" />
                <p className="text-xs font-semibold">JCI Accredited</p>
                <p className="text-[10px] text-muted">Partner Hospitals</p>
              </div>
              <div className="glass-card rounded-2xl p-3 text-center">
                <TrendingDown size={18} className="text-amber-600 mx-auto mb-1" />
                <p className="text-xs font-semibold">Save up to 90%</p>
                <p className="text-[10px] text-muted">vs Western countries</p>
              </div>
              <div className="glass-card rounded-2xl p-3 text-center">
                <Users2 size={18} className="text-blue-600 mx-auto mb-1" />
                <p className="text-xs font-semibold">Expert Doctors</p>
                <p className="text-[10px] text-muted">World-class experts</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
    <TrustLogoStrip />
    </>
  );
}
