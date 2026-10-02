"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/ui/motion";

export default function Hospitals() {
  return (
    <section className="section-padding bg-surface relative overflow-hidden" id="hospitals">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Top Accredited Hospital Networks We Facilitate in India
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
