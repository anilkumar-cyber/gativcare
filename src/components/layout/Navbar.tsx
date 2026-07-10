"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, X, Phone, Moon, Sun, ChevronDown, MessageCircle } from "lucide-react";
import { navLinks, treatments, hospitals } from "@/lib/constants";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { CurrencyCalculator } from "@/components/layout/CurrencyCalculator";

const moreLinks = [
  { label: "FAQ", href: "/faq" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Refund Policy", href: "/refund" },
];

function NavDropdown({ label, href, items, viewAllLabel }: { label: string; href: string; items: { label: string; href: string; icon?: string }[]; viewAllLabel: string }) {
  return (
    <div className="relative group">
      <Link
        href={href}
        className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
      >
        {label} <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
      </Link>
      <div className="absolute top-full left-0 pt-1 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 z-50">
        <div className="w-64 rounded-xl border border-border bg-white dark:bg-slate-900 shadow-xl p-2">
          {items.map((item) => (
            <Link key={item.label} href={item.href} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-surface transition-colors">
              {item.icon && <span>{item.icon}</span>} {item.label}
            </Link>
          ))}
          <Link href={href} className="block px-3 py-2 mt-1 border-t border-border rounded-lg text-sm font-semibold text-primary hover:bg-surface transition-colors">
            {viewAllLabel} →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <>
      <div className="hidden lg:block bg-gradient-to-r from-primary to-accent text-white text-sm">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><Phone size={13} /> +91 88869 63612</span>
            <span className="flex items-center gap-1.5"><MessageCircle size={13} /> WhatsApp Support</span>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher compact />
            <CurrencyCalculator compact />
            <span>|</span>
            <span>Free Consultation</span>
          </div>
        </div>
      </div>

      <motion.header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-strong shadow-lg shadow-black/5"
            : "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-18">
            <Link href="/" className="flex items-center gap-2.5 group">
              <Image src="/images/logo-icon.png" alt="GativCare" width={40} height={40} className="w-10 h-10 drop-shadow-lg" priority />
              <div>
                <span className="text-xl font-bold text-gradient">GativCare</span>
                <span className="hidden sm:block text-[10px] text-muted -mt-1 tracking-wider uppercase">Medical Tourism India</span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              <NavDropdown
                label="Treatments"
                href="/treatments"
                viewAllLabel="View All Treatments"
                items={treatments.slice(0, 8).map((t) => ({ label: t.name, href: "/treatments", icon: t.image }))}
              />
              <NavDropdown
                label="Hospitals"
                href="/hospitals"
                viewAllLabel="View All Hospitals"
                items={hospitals.map((h) => ({ label: h.name, href: "/hospitals", icon: h.image }))}
              />
              {navLinks.filter((l) => l.label !== "Treatments" && l.label !== "Hospitals").map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-lg hover:bg-primary/5 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full group-hover:w-3/4 transition-all duration-300" />
                </Link>
              ))}
              <div className="relative group">
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-lg hover:bg-primary/5">
                  More <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute top-full right-0 pt-1 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 z-50">
                  <div className="w-56 rounded-xl border border-border bg-white dark:bg-slate-900 shadow-xl p-2">
                    {moreLinks.map((item) => (
                      <Link key={item.href} href={item.href} className="block px-3 py-2 rounded-lg text-sm hover:bg-surface transition-colors">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setDark(!dark)}
                className="p-2 rounded-xl hover:bg-surface transition-colors"
                aria-label="Toggle theme"
              >
                {dark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <Link
                href="/contact"
                className="hidden sm:flex btn-primary text-sm py-2.5 px-5 items-center gap-2"
              >
                <Phone size={14} />
                Get a FREE Quote
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-xl hover:bg-surface transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-border overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1 bg-white dark:bg-slate-950 max-h-[70vh] overflow-y-auto">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-sm font-medium rounded-xl hover:bg-surface transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-2 mt-2 border-t border-border">
                  {moreLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-2.5 text-xs text-muted rounded-xl hover:bg-surface transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                <div className="pt-3 mt-2 border-t border-border flex items-center justify-between">
                  <span className="text-xs text-muted">Language</span>
                  <LanguageSwitcher />
                </div>
                <div className="pt-3 mt-2 border-t border-border flex items-center justify-between">
                  <span className="text-xs text-muted">Currency</span>
                  <CurrencyCalculator />
                </div>
                <div className="pt-3 border-t border-border">
                  <Link href="/contact" className="block btn-primary text-center text-sm py-3">
                    Get a FREE Quote
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
