"use client";

import { motion } from "framer-motion";
import { Shield, CheckCircle2 } from "lucide-react";
import { FadeIn } from "@/components/ui/motion";

const certifications = [
  { name: "NABH", full: "National Accreditation Board for Hospitals", icon: "🏆", desc: "250+ accredited partner hospitals" },
  { name: "JCI", full: "Joint Commission International", icon: "✅", desc: "Gold standard in global healthcare" },
  { name: "ISO 9001", full: "Quality Management System", icon: "📋", desc: "Certified quality processes" },
  { name: "ISO 27001", full: "Information Security Management", icon: "🔒", desc: "Data protection certified" },
  { name: "HIPAA", full: "Health Insurance Portability Act", icon: "🛡️", desc: "US healthcare data compliance" },
  { name: "Govt. Approved", full: "Government of India", icon: "🇮🇳", desc: "Official medical tourism facilitator" },
];

export default function Certifications() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-green-500/5 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-600 text-sm font-medium mb-4">
            <Shield size={14} /> Accreditations & Trust
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Internationally <span className="text-gradient">Certified</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Our partner hospitals meet the highest international quality and safety standards
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group glass-card rounded-2xl p-5 text-center card-hover"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="text-4xl mb-3"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, delay: i * 0.5, repeat: Infinity }}
              >
                {cert.icon}
              </motion.div>
              <h4 className="font-bold text-sm mb-1">{cert.name}</h4>
              <p className="text-[10px] text-muted leading-tight">{cert.full}</p>
              <div className="flex items-center justify-center gap-1 mt-2 text-green-600">
                <CheckCircle2 size={10} />
                <span className="text-[10px] font-medium">{cert.desc}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
