"use client";

import { motion } from "framer-motion";
import { Phone, Upload, MessageCircle, Play, ArrowRight, Shield, Star, Users, Globe } from "lucide-react";
import { stats } from "@/lib/constants";
import { AnimatedCounter } from "@/components/ui/motion";

function FloatingIcon({ icon: Icon, className, delay = 0 }: { icon: React.ElementType; className: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute hidden lg:flex items-center justify-center w-12 h-12 rounded-2xl glass shadow-xl ${className}`}
      animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
      transition={{ duration: 6, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <Icon size={20} className="text-primary" />
    </motion.div>
  );
}

function Particle({ className }: { className: string }) {
  return (
    <motion.div
      className={`absolute w-2 h-2 rounded-full bg-primary/20 ${className}`}
      animate={{
        y: [0, -100, -200],
        x: [0, 30, -20],
        opacity: [0, 1, 0],
        scale: [0, 1, 0.5],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden hero-gradient">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

        <Particle className="top-[20%] left-[15%]" />
        <Particle className="top-[40%] right-[20%]" />
        <Particle className="bottom-[30%] left-[30%]" />
        <Particle className="top-[60%] right-[35%]" />
        <Particle className="bottom-[20%] right-[15%]" />

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-primary/10 hidden lg:block"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full border border-accent/5 hidden lg:block"
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <FloatingIcon icon={Shield} className="top-[15%] left-[8%]" delay={0} />
      <FloatingIcon icon={Star} className="top-[20%] right-[12%]" delay={1} />
      <FloatingIcon icon={Users} className="bottom-[25%] left-[5%]" delay={2} />
      <FloatingIcon icon={Globe} className="bottom-[15%] right-[8%]" delay={1.5} />

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

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <motion.a
                href="/contact"
                className="btn-primary flex items-center justify-center gap-2 text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone size={18} />
                Book Free Consultation
              </motion.a>
              <motion.a
                href="/contact#reports"
                className="btn-secondary flex items-center justify-center gap-2 text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Upload size={18} />
                Upload Medical Reports
              </motion.a>
              <motion.a
                href="https://wa.me/918886963612"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors shadow-lg shadow-green-500/30"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle size={18} />
                WhatsApp
              </motion.a>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/60 to-accent/60 border-2 border-white dark:border-slate-900 flex items-center justify-center text-white text-xs font-bold">
                      {["J", "S", "M", "E"][i]}
                    </div>
                  ))}
                </div>
                <span className="font-medium">4.9★ from 2,000+ reviews</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl"
                animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 border border-white/20 dark:border-white/10 overflow-hidden flex items-center justify-center">
                <motion.div
                  className="relative w-64 h-64"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/20" />
                  {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 rounded-full bg-primary/60"
                      style={{
                        top: `${50 + 45 * Math.sin((deg * Math.PI) / 180)}%`,
                        left: `${50 + 45 * Math.cos((deg * Math.PI) / 180)}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                    />
                  ))}
                </motion.div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-3">🌏</div>
                    <p className="text-sm font-medium text-foreground">Global Healthcare Hub</p>
                    <p className="text-xs text-muted mt-1">65+ Countries Connected</p>
                  </div>
                </div>

                <motion.div
                  className="absolute top-6 right-6 glass-card rounded-2xl p-3 shadow-xl"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <Shield size={16} className="text-green-500" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold">JCI Accredited</p>
                      <p className="text-[10px] text-muted">250+ Hospitals</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute bottom-6 left-6 glass-card rounded-2xl p-3 shadow-xl"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                      <Star size={16} className="text-amber-500" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold">Save up to 90%</p>
                      <p className="text-[10px] text-muted">vs Western countries</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 -left-4 glass-card rounded-2xl p-3 shadow-xl"
                  animate={{ x: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-lg">🏥</div>
                    <div>
                      <p className="text-xs font-semibold">3000+ Doctors</p>
                      <p className="text-[10px] text-muted">World-class experts</p>
                    </div>
                  </div>
                </motion.div>
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
