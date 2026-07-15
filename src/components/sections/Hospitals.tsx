"use client";

import { ArrowRight, Building2 } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/ui/motion";

export default function Hospitals() {
  return (
    <section className="section-padding bg-surface relative overflow-hidden" id="hospitals">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Building2 size={14} /> Hospital Networks
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Top Accredited Hospital Networks <span className="text-gradient">We Facilitate</span> in India
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto mb-10">
            GativCare is an independent medical travel facilitator. We help patients coordinate and
            compare world-class treatment options across India&apos;s leading healthcare networks,
            including Apollo and Yashoda.
          </p>
          <Link href="/hospitals" className="btn-primary inline-flex items-center gap-2">
            Explore Hospital Networks <ArrowRight size={18} />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
