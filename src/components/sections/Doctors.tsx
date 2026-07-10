"use client";

import { motion } from "framer-motion";
import { Star, MapPin, ArrowRight, Video, Calendar, Languages, GraduationCap } from "lucide-react";
import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { useCurrency } from "@/components/layout/CurrencyContext";

type Doctor = {
  id: string;
  name: string;
  hospital: string;
  city: string;
  specialization: string;
  experience: number;
  fee: string;
  rating: number;
  reviews: number;
  languages: string[];
  education: string;
  successRate: string;
};

export default function Doctors({ doctors }: { doctors: Doctor[] }) {
  const { display } = useCurrency();
  return (
    <section className="section-padding relative overflow-hidden" id="doctors">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Expert Medical Team
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Meet Our <span className="text-gradient">Top Doctors</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Internationally trained specialists with decades of experience and exceptional outcomes
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
          {doctors.map((doctor) => (
            <StaggerItem key={doctor.id}>
              <motion.div
                className="group glass-card rounded-2xl overflow-hidden card-hover h-full"
                whileHover={{ scale: 1.01 }}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl font-bold text-primary flex-shrink-0">
                      {doctor.name.split(" ").pop()?.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors truncate">
                        {doctor.name}
                      </h3>
                      <p className="text-sm text-primary font-medium">{doctor.specialization}</p>
                      <div className="flex items-center gap-1.5 text-xs text-muted mt-1">
                        <MapPin size={11} /> {doctor.hospital}, {doctor.city}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 rounded-md">
                      <Star size={12} className="text-amber-500 fill-amber-500" />
                      <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">{doctor.rating}</span>
                    </div>
                    <span className="text-xs text-muted">{doctor.reviews} reviews</span>
                    <span className="text-xs text-muted">•</span>
                    <span className="text-xs font-medium text-green-600">{doctor.successRate} success</span>
                  </div>

                  <div className="space-y-2.5 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-muted">
                      <GraduationCap size={14} className="text-primary flex-shrink-0" />
                      <span className="truncate">{doctor.education}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted">
                      <Calendar size={14} className="text-primary flex-shrink-0" />
                      <span>{doctor.experience} years experience</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted">
                      <Languages size={14} className="text-primary flex-shrink-0" />
                      <span className="truncate">{doctor.languages.join(", ")}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <span className="text-xs text-muted">Consultation</span>
                      <span className="block text-lg font-bold text-primary">{display(doctor.fee)}</span>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/contact?doctor=${encodeURIComponent(doctor.name)}&type=video`}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary/10 text-primary text-xs font-medium hover:bg-primary hover:text-white transition-all"
                      >
                        <Video size={13} /> Video Call
                      </Link>
                      <Link
                        href={`/contact?doctor=${encodeURIComponent(doctor.name)}&type=booking`}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary text-white text-xs font-medium hover:bg-primary-dark transition-all"
                      >
                        <Calendar size={13} /> Book
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.3} className="text-center mt-12">
          <Link href="/doctors" className="btn-primary inline-flex items-center gap-2">
            View All Doctors <ArrowRight size={18} />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
