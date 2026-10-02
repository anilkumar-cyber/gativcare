"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Plane, Plus, Minus, Send, Building2 } from "lucide-react";
import { FadeIn } from "@/components/ui/motion";
import { AnimatedCheck } from "@/components/ui/AnimatedCheck";
import { CostSlider } from "@/components/sections/CostSlider";
import { treatments, packages } from "@/lib/constants";
import { parseUsdAmounts } from "@/lib/currency";
import { useCurrency } from "@/components/layout/CurrencyContext";

const COMPANION_COST_USD = 800;
const TIER_MULTIPLIER = { standard: 1, premium: 1.25 } as const;
type Tier = keyof typeof TIER_MULTIPLIER;

export default function CostEstimatorClient() {
  const { display } = useCurrency();

  const [treatmentId, setTreatmentId] = useState(treatments[0].id);
  const [packageId, setPackageId] = useState<number | "">("");
  const [companions, setCompanions] = useState(0);
  const [tier, setTier] = useState<Tier>("standard");

  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", country: "" });

  const treatment = treatments.find((t) => t.id === treatmentId) ?? treatments[0];
  const pkg = packages.find((p) => p.id === packageId);

  const [minUsd, maxUsd] = parseUsdAmounts(treatment.cost);
  const pkgCost = pkg ? (parseUsdAmounts(pkg.price)[0] ?? 0) : 0;
  const companionCost = companions * COMPANION_COST_USD;
  const tierMultiplier = TIER_MULTIPLIER[tier];

  const treatmentMin = minUsd * tierMultiplier;
  const treatmentMax = maxUsd * tierMultiplier;
  const totalMin = treatmentMin + pkgCost + companionCost;
  const totalMax = treatmentMax + pkgCost + companionCost;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const breakdown = [
      `Treatment: ${treatment.name} (${display(treatmentMin)} - ${display(treatmentMax)}, ${tier} hospital tier)`,
      `Travel package: ${pkg ? `${pkg.name} (${display(pkgCost)})` : "None"}`,
      `Companions: ${companions} (${display(companionCost)})`,
      `Estimated total: ${display(totalMin)} - ${display(totalMax)}`,
    ].join("\n");

    const data = new FormData();
    data.append("name", form.name);
    data.append("email", form.email);
    data.append("phone", form.phone);
    data.append("country", form.country);
    data.append("treatment", treatment.name);
    data.append("message", `Cost estimate request:\n${breakdown}`);

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
    <div className="min-h-screen">
      <section className="relative py-20 overflow-hidden hero-gradient">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-72 h-72 bg-accent/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Treatment Cost Estimator
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Pick your treatment, add a travel package and companions — get an instant price range in your currency
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3">
              <FadeIn>
                <div className="glass-card rounded-2xl p-8 space-y-7">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Treatment</label>
                    <select
                      value={treatmentId}
                      onChange={(e) => setTreatmentId(Number(e.target.value))}
                      className="w-full bg-surface rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 border border-border"
                    >
                      {treatments.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.image} {t.name} ({t.cost})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1.5 block flex items-center gap-1.5">
                      <Building2 size={14} /> Hospital Tier
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {(["standard", "premium"] as Tier[]).map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTier(t)}
                          className={`py-3 rounded-xl text-sm font-medium border transition-colors capitalize ${
                            tier === t
                              ? "bg-primary text-white border-primary"
                              : "bg-surface border-border hover:border-primary/50"
                          }`}
                        >
                          {t} {t === "premium" && <span className="text-xs opacity-80">(+25%)</span>}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1.5 block flex items-center gap-1.5">
                      <Plane size={14} /> Travel &amp; Stay Package
                    </label>
                    <select
                      value={packageId}
                      onChange={(e) => setPackageId(e.target.value ? Number(e.target.value) : "")}
                      className="w-full bg-surface rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 border border-border"
                    >
                      <option value="">No package — treatment only</option>
                      {packages.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} · {p.duration} ({p.price})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1.5 block flex items-center gap-1.5">
                      <Users size={14} /> Accompanying Companions
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setCompanions((c) => Math.max(0, c - 1))}
                        className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center hover:border-primary/50 transition-colors"
                        aria-label="Decrease companions"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-semibold">{companions}</span>
                      <button
                        type="button"
                        onClick={() => setCompanions((c) => Math.min(4, c + 1))}
                        className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center hover:border-primary/50 transition-colors"
                        aria-label="Increase companions"
                      >
                        <Plus size={16} />
                      </button>
                      <span className="text-xs text-muted">
                        Flight, visa &amp; hotel for each companion (~{display(COMPANION_COST_USD)} each)
                      </span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <FadeIn delay={0.15}>
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="glass-card rounded-2xl p-8 text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-5">
                        <AnimatedCheck size={32} className="text-green-500" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Request Sent!</h3>
                      <p className="text-sm text-muted">
                        A medical coordinator will send your exact quote within 2 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <div className="glass-card rounded-2xl p-8">
                      <h2 className="text-lg font-bold mb-5">Your Estimate</h2>
                      <div className="space-y-3 text-sm mb-6">
                        <div className="flex justify-between">
                          <span className="text-muted">Treatment ({tier})</span>
                          <span className="font-medium">{display(treatmentMin)} - {display(treatmentMax)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted">Travel package</span>
                          <span className="font-medium">{pkg ? display(pkgCost) : "—"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted">Companions ({companions})</span>
                          <span className="font-medium">{companions > 0 ? display(companionCost) : "—"}</span>
                        </div>
                        <div className="pt-3 border-t border-border flex justify-between items-baseline">
                          <span className="font-semibold">Estimated Total</span>
                          <span className="text-xl font-bold text-gradient">
                            {display(totalMin)} - {display(totalMax)}
                          </span>
                        </div>
                      </div>

                      <AnimatePresence mode="wait">
                        {!showQuoteForm ? (
                          <motion.button
                            key="cta"
                            type="button"
                            onClick={() => setShowQuoteForm(true)}
                            className="w-full btn-primary py-3.5 text-sm"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                          >
                            Get My Exact Quote
                          </motion.button>
                        ) : (
                          <motion.form
                            key="form"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            onSubmit={handleSubmit}
                            className="space-y-3 overflow-hidden"
                          >
                            <input
                              type="text"
                              required
                              placeholder="Full Name"
                              value={form.name}
                              onChange={(e) => setForm({ ...form, name: e.target.value })}
                              className="w-full bg-surface rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 border border-border"
                            />
                            <input
                              type="email"
                              required
                              placeholder="Email"
                              value={form.email}
                              onChange={(e) => setForm({ ...form, email: e.target.value })}
                              className="w-full bg-surface rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 border border-border"
                            />
                            <input
                              type="tel"
                              required
                              placeholder="Phone / WhatsApp"
                              value={form.phone}
                              onChange={(e) => setForm({ ...form, phone: e.target.value })}
                              className="w-full bg-surface rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 border border-border"
                            />
                            <input
                              type="text"
                              placeholder="Country"
                              value={form.country}
                              onChange={(e) => setForm({ ...form, country: e.target.value })}
                              className="w-full bg-surface rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 border border-border"
                            />
                            {error && <p className="text-xs text-red-500 text-center">{error}</p>}
                            <motion.button
                              type="submit"
                              disabled={submitting}
                              className="w-full btn-primary py-3 text-sm flex items-center justify-center gap-2 disabled:opacity-60"
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                            >
                              <Send size={16} /> {submitting ? "Sending..." : "Send Estimate Request"}
                            </motion.button>
                          </motion.form>
                        )}
                      </AnimatePresence>

                      <p className="text-[11px] text-muted text-center mt-4">
                        This is an approximate estimate, not a final price. Actual cost depends on diagnosis and hospital selected.
                      </p>
                    </div>
                  )}
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <CostSlider />
        </div>
      </section>
    </div>
  );
}
