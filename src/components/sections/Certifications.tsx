"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Award, BadgeCheck, ClipboardCheck, Lock, ShieldCheck, Landmark, type LucideIcon } from "lucide-react";
import { FadeIn } from "@/components/ui/motion";

const certifications: { name: string; full: string; icon: LucideIcon; desc: string }[] = [
  { name: "NABH", full: "National Accreditation Board for Hospitals", icon: Award, desc: "250+ accredited partner hospitals" },
  { name: "JCI", full: "Joint Commission International", icon: BadgeCheck, desc: "Gold standard in global healthcare" },
  { name: "ISO 9001", full: "Quality Management System", icon: ClipboardCheck, desc: "Certified quality processes" },
  { name: "ISO 27001", full: "Information Security Management", icon: Lock, desc: "Data protection certified" },
  { name: "HIPAA", full: "Health Insurance Portability Act", icon: ShieldCheck, desc: "US healthcare data compliance" },
  { name: "Govt. Approved", full: "Government of India", icon: Landmark, desc: "Official medical tourism facilitator" },
];

export default function Certifications() {
  return (
    <section className="section-padding relative overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Internationally Certified
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
              <div className="w-11 h-11 mx-auto mb-3 rounded-xl bg-primary/10 flex items-center justify-center">
                <cert.icon size={22} className="text-primary" />
              </div>
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
