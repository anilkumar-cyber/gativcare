"use client";

import { motion } from "framer-motion";
import { Star, ShieldCheck, TrendingDown, Users2 } from "lucide-react";
import { stats } from "@/lib/constants";
import { AnimatedCounter } from "@/components/ui/motion";
import { HeroQuoteCard } from "./HeroQuoteCard";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Warm, photo-like background — no real photograph asset available, so this
          is built from layered gradients/blur rather than a literal image. Drop a
          real photo at public/images/hero-bg.jpg and swap this div for an <Image>
          to upgrade it later. */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-rose-50 to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
        <div className="absolute -top-24 -right-10 w-[36rem] h-[36rem] bg-gradient-to-br from-amber-200/60 to-orange-300/30 dark:from-amber-500/10 dark:to-orange-500/5 rounded-full blur-[110px]" />
        <div className="absolute -bottom-32 left-[8%] w-[32rem] h-[32rem] bg-gradient-to-br from-primary/25 to-accent/20 dark:from-primary/10 dark:to-accent/10 rounded-full blur-[120px]" />
        <div className="absolute top-[18%] left-[38%] w-80 h-80 bg-rose-200/40 dark:bg-rose-500/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/60 to-white/5 dark:from-slate-950/95 dark:via-slate-950/60 dark:to-slate-950/5" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Trusted by 50,000+ International Patients
            </motion.div>

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

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted mb-2">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/60 to-accent/60 border-2 border-white dark:border-slate-900 flex items-center justify-center text-white text-xs font-bold">
                      {["J", "S", "M", "E"][i]}
                    </div>
                  ))}
                </div>
                <span className="font-medium">50,000+ Patients Assisted</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <span className="font-medium">4.9 from 2,000+ reviews</span>
              </div>
            </div>

            <a href="tel:+918886963612" className="text-sm text-primary font-medium hover:underline">
              or call us directly: +91 88869 63612
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <HeroQuoteCard className="mx-auto" />

            <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto mt-6">
              <div className="glass-card rounded-2xl p-3 text-center">
                <ShieldCheck size={18} className="text-green-600 mx-auto mb-1" />
                <p className="text-xs font-semibold">JCI Accredited</p>
                <p className="text-[10px] text-muted">250+ Hospitals</p>
              </div>
              <div className="glass-card rounded-2xl p-3 text-center">
                <TrendingDown size={18} className="text-amber-600 mx-auto mb-1" />
                <p className="text-xs font-semibold">Save up to 90%</p>
                <p className="text-[10px] text-muted">vs Western countries</p>
              </div>
              <div className="glass-card rounded-2xl p-3 text-center">
                <Users2 size={18} className="text-blue-600 mx-auto mb-1" />
                <p className="text-xs font-semibold">3,000+ Doctors</p>
                <p className="text-[10px] text-muted">World-class experts</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 lg:mt-24"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="glass-card rounded-2xl p-4 text-center card-hover"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.1 }}
              >
                <div className="text-2xl sm:text-3xl font-bold text-gradient mb-1">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-muted font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
