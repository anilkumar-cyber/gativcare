"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/motion";

export type TestimonialItem = {
  name: string;
  country: string;
  treatment: string;
  hospital: string;
  doctorName: string | null;
  rating: number;
  text: string;
  savings: string | null;
};

export default function Testimonials({ testimonials }: { testimonials: TestimonialItem[] }) {
  const [active, setActive] = useState(0);

  if (testimonials.length === 0) return null;

  const next = () => setActive((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="section-padding bg-surface relative overflow-hidden" id="testimonials">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] -translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-600 text-sm font-medium mb-4">
            <Star size={14} className="fill-amber-500" /> Patient Stories
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Success <span className="text-gradient">Stories</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Real experiences from international patients who chose India for their healthcare
          </p>
        </FadeIn>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-card rounded-3xl p-8 sm:p-10 relative"
            >
              <Quote size={48} className="absolute top-6 right-8 text-primary/10" />

              <div className="flex flex-col sm:flex-row gap-6 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                  {testimonials[active].name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{testimonials[active].name}</h3>
                  <p className="text-sm text-muted">
                    {testimonials[active].country} • {testimonials[active].treatment}
                  </p>
                  <p className="text-xs text-primary font-medium mt-1">
                    {testimonials[active].hospital}{testimonials[active].doctorName ? ` • ${testimonials[active].doctorName}` : ""}
                  </p>
                  <div className="flex gap-0.5 mt-2">
                    {[...Array(testimonials[active].rating)].map((_, i) => (
                      <Star key={i} size={14} className="text-amber-500 fill-amber-500" />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed mb-6 italic">
                &ldquo;{testimonials[active].text}&rdquo;
              </p>

              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-600 font-semibold">
                  {testimonials[active].savings ? `Saved ${testimonials[active].savings} on treatment costs` : "Successful treatment outcome"}
                </div>
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        i === active ? "bg-primary w-8" : "bg-border hover:bg-muted"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-3 mt-6">
            <motion.button
              onClick={prev}
              className="p-3 rounded-full glass-card hover:bg-primary/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={20} />
            </motion.button>
            <motion.button
              onClick={next}
              className="p-3 rounded-full glass-card hover:bg-primary/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
