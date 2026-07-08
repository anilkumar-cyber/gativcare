"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, User } from "lucide-react";

const countries = ["United States", "United Kingdom", "UAE", "Australia", "Canada", "Germany", "Bangladesh", "Nigeria", "Kenya", "Other"];

// This card is intentionally hardcoded to a light theme (not theme-aware
// bg-surface/text-foreground) — hospital lead-capture forms stay light and
// high-contrast regardless of the site's dark mode, same as real reference sites.
const inputClass = "w-full bg-slate-50 text-slate-900 placeholder-slate-400 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 border border-slate-200";

export function HeroQuoteCard({ className = "" }: { className?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", country: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));

    try {
      const res = await fetch("/api/leads", { method: "POST", body: data });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className={`w-full max-w-sm bg-white rounded-2xl shadow-2xl shadow-black/10 border border-slate-200 p-6 ${className}`}
    >
      {submitted ? (
        <div className="text-center py-6">
          <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={28} className="text-green-500" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">Thank You!</h3>
          <p className="text-sm text-slate-500">Our coordinator will call you within 2 hours.</p>
        </div>
      ) : (
        <>
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <User size={18} className="text-primary" /> Let Us Help You
          </h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              required
              placeholder="Patient Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={inputClass}
            />
            <input
              type="email"
              required
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={inputClass}
            />
            <select
              required
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className={inputClass}
            >
              <option value="">Select Country</option>
              {countries.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <input
              type="tel"
              required
              placeholder="Phone / WhatsApp Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={inputClass}
            />
            <textarea
              rows={2}
              placeholder="Describe the current medical problem"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={`${inputClass} resize-none`}
            />

            {error && <p className="text-xs text-red-500">{error}</p>}

            <motion.button
              type="submit"
              disabled={submitting}
              className="w-full btn-primary flex items-center justify-center gap-2 py-3 text-sm disabled:opacity-60"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Send size={15} /> {submitting ? "Sending..." : "Get FREE Quote"}
            </motion.button>
            <p className="text-[11px] text-slate-500 text-center">
              By submitting, you agree to our <a href="/privacy" className="underline">Privacy Policy</a>.
            </p>
          </form>
        </>
      )}
    </motion.div>
  );
}
