"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Handshake, Send, CheckCircle2 } from "lucide-react";
import { FadeIn } from "@/components/ui/motion";

export default function PartnerWithUsClient() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/partner-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
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
    <div className="min-h-screen">
      <section className="relative py-20 overflow-hidden hero-gradient">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-accent/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Handshake size={14} /> For Hospitals & Healthcare Networks
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Partner <span className="text-gradient">With Us</span>
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              GativCare is an independent medical travel facilitator connecting international
              patients with hospitals across India. If your hospital or network is interested in
              working with us, tell us a bit about yourselves below.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn delay={0.2}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-2xl p-12 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} className="text-green-500" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Thank You!</h3>
                <p className="text-muted mb-6">
                  Your partnership inquiry has been received. Our team will reach out to you shortly.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-primary">
                  Submit Another Inquiry
                </button>
              </motion.div>
            ) : (
              <div className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-2">Tell Us About Your Hospital</h2>
                <p className="text-sm text-muted mb-8">We&apos;ll get back to you within 2 business days.</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Hospital / Company Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full bg-surface rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 border border-border"
                      placeholder="Apollo Hospitals"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Contact Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        className="w-full bg-surface rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 border border-border"
                        placeholder="Dr. Jane Doe"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Phone *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-surface rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 border border-border"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-surface rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 border border-border"
                      placeholder="partnerships@hospital.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full bg-surface rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 border border-border resize-none"
                      placeholder="Tell us about your hospital and what you're looking for in a partnership..."
                    />
                  </div>
                  {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                  <motion.button
                    type="submit"
                    disabled={submitting}
                    className="w-full btn-primary flex items-center justify-center gap-2 py-4 text-base disabled:opacity-60"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Send size={18} /> {submitting ? "Submitting..." : "Submit Inquiry"}
                  </motion.button>
                </form>
              </div>
            )}
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
