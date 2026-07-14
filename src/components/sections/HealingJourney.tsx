"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn, ScaleIn } from "@/components/ui/motion";

export default function HealingJourney() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-[140px]" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn className="mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Treatment Is Medicine. <br className="hidden sm:block" />
            <span className="text-gradient">Recovery Is a Journey.</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            We pair world-class care with restorative time in India — because healing is more than a procedure.
          </p>
        </FadeIn>

        <ScaleIn delay={0.1}>
          <div className="relative max-w-2xl mx-auto h-48 sm:h-60 rounded-full overflow-hidden flex shadow-2xl shadow-primary/10 border-4 border-white/60 dark:border-slate-800/60">
            <div className="w-1/2 relative bg-gradient-to-br from-amber-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 flex flex-col items-center justify-center gap-1">
              <span className="text-5xl sm:text-6xl">🏛️</span>
              <p className="text-xs sm:text-sm font-semibold text-foreground/80">Rest &amp; Recovery</p>
            </div>

            <div className="absolute inset-y-0 left-1/2 w-3 -translate-x-1/2 bg-gradient-to-b from-black/0 via-black/10 to-black/0 z-10" />

            <div className="w-1/2 bg-gradient-to-br from-primary to-accent flex flex-col items-center justify-center gap-2 text-white">
              <Image src="/images/logo-icon.png" alt="GativCare" width={44} height={44} className="drop-shadow-lg" />
              <p className="text-xs sm:text-sm font-semibold tracking-wide">GativCare</p>
            </div>
          </div>
        </ScaleIn>

        <FadeIn delay={0.2} className="mt-10">
          <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
            Plan Your Healing Journey <ArrowRight size={18} />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
