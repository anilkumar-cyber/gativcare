"use client";

import Link from "next/link";
import { Heart, Phone, Mail, MapPin, MessageCircle, ArrowUp } from "lucide-react";

const footerLinks = {
  treatments: [
    { label: "Cardiology", href: "/treatments" },
    { label: "Orthopedics", href: "/treatments" },
    { label: "Oncology", href: "/treatments" },
    { label: "IVF & Fertility", href: "/treatments" },
    { label: "Dental Care", href: "/treatments" },
    { label: "Cosmetic Surgery", href: "/treatments" },
    { label: "Liver Transplant", href: "/treatments" },
    { label: "Spine Surgery", href: "/treatments" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Hospitals", href: "/hospitals" },
    { label: "Our Doctors", href: "/doctors" },
    { label: "Packages", href: "/packages" },
    { label: "Testimonials", href: "/#testimonials" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  support: [
    { label: "Patient Guide", href: "/guide" },
    { label: "Visa Assistance", href: "/visa" },
    { label: "Insurance", href: "/insurance" },
    { label: "FAQ", href: "/faq" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Refund Policy", href: "/refund" },
    { label: "Sitemap", href: "/sitemap" },
  ],
};

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-slate-900 dark:bg-slate-950 text-slate-300 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-accent blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                G
              </div>
              <div>
                <span className="text-xl font-bold text-white">GativCare</span>
                <span className="block text-[10px] text-slate-400 -mt-1 tracking-wider uppercase">Medical Tourism India</span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 mb-6 max-w-sm leading-relaxed">
              India&apos;s premier medical tourism platform connecting international patients
              with world-class healthcare. Trusted by 50,000+ patients from 65+ countries.
            </p>
            <div className="space-y-3 text-sm">
              <a href="tel:+918886963612" className="flex items-center gap-3 hover:text-primary transition-colors">
                <Phone size={16} className="text-primary" /> +91 88869 63612
              </a>
              <a href="mailto:care@gativcare.com" className="flex items-center gap-3 hover:text-primary transition-colors">
                <Mail size={16} className="text-primary" /> care@gativcare.com
              </a>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-primary" /> New Delhi, India
              </div>
              <a href="#" className="flex items-center gap-3 text-green-400 hover:text-green-300 transition-colors">
                <MessageCircle size={16} /> WhatsApp: +91 88869 63612
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Treatments</h4>
            <ul className="space-y-2.5">
              {footerLinks.treatments.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-primary transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-primary transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-primary transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 p-6 rounded-2xl bg-white/5 border border-white/10">
          {[
            { label: "NABH Accredited", icon: "🏆" },
            { label: "JCI Certified", icon: "✅" },
            { label: "ISO 9001:2015", icon: "📋" },
            { label: "Govt. Approved", icon: "🇮🇳" },
          ].map((cert) => (
            <div key={cert.label} className="flex items-center gap-2 text-sm">
              <span className="text-lg">{cert.icon}</span>
              <span className="text-slate-300 font-medium">{cert.label}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © 2024 GativCare. All rights reserved. Made with <Heart size={14} className="inline text-red-500" /> in India
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-600">We accept:</span>
            {["Visa", "Mastercard", "PayPal", "UPI"].map((p) => (
              <span key={p} className="text-xs px-2 py-1 rounded bg-white/5 text-slate-400">{p}</span>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="fixed bottom-24 right-6 z-40 p-3 rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
}
