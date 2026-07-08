"use client";

import { motion } from "framer-motion";
import { Phone, Upload, MessageCircle, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/motion";

export default function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-accent" />
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-[100px]" />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-6 border border-white/20"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Medical Coordinators Available 24/7
          </motion.div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Start Your Healing Journey <br className="hidden sm:block" />
            <span className="text-white/90">with GativCare Today</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Get a free medical opinion from India&apos;s top specialists. Upload your reports
            and receive a personalized treatment plan within 24 hours.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/contact"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-primary font-semibold text-base shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone size={18} /> Book Free Consultation <ArrowRight size={16} />
            </motion.a>
            <motion.a
              href="/contact#reports"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 text-white font-semibold text-base border border-white/30 hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Upload size={18} /> Upload Reports
            </motion.a>
            <motion.a
              href="https://wa.me/918886963612"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-green-500 text-white font-semibold text-base shadow-xl shadow-green-500/30 hover:bg-green-600 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle size={18} /> WhatsApp Us
            </motion.a>
          </div>
        </FadeIn>

        <FadeIn delay={0.5}>
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { value: "24hrs", label: "Report Review" },
              { value: "Free", label: "Consultation" },
              { value: "100%", label: "Visa Success" },
              { value: "24/7", label: "Support" },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-2xl font-bold text-white">{item.value}</div>
                <div className="text-sm text-white/60">{item.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
