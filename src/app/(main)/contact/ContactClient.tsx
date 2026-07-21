"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, Send, Upload, Clock, Globe, CheckCircle2 } from "lucide-react";
import { FadeIn } from "@/components/ui/motion";

const WHATSAPP_LINK = "https://wa.me/918886963612";

export default function ContactClient({
  prefillDoctor,
  prefillType,
}: {
  prefillDoctor?: string;
  prefillType?: string;
} = {}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    treatment: "",
    message: prefillDoctor
      ? prefillType === "video"
        ? `I'd like to schedule a video consultation with ${prefillDoctor}.`
        : `I'd like to book an appointment with ${prefillDoctor}.`
      : "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    files.forEach((file) => data.append("reports", file));

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
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-accent/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Phone size={14} /> 24/7 Available
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Get In <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Our medical coordinators are available round the clock to assist you with your healthcare needs
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2 space-y-6">
              <FadeIn>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              </FadeIn>

              {[
                { icon: Phone, label: "Phone / WhatsApp", value: "+91 88869 63612", href: "tel:+918886963612", color: "text-primary" },
                { icon: Mail, label: "Email", value: "care@gativcare.com", href: "mailto:care@gativcare.com", color: "text-primary" },
                { icon: MessageCircle, label: "WhatsApp", value: "+91 88869 63612", href: WHATSAPP_LINK, color: "text-green-500" },
                { icon: MapPin, label: "Office", value: "Hyderabad, Telangana, India", href: "https://maps.google.com/?q=Hyderabad+India", color: "text-primary" },
              ].map((contact, i) => (
                <FadeIn key={contact.label} delay={i * 0.1}>
                  <a href={contact.href} target={contact.href.startsWith("http") ? "_blank" : undefined} rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined} className="flex items-start gap-4 p-4 glass-card rounded-xl hover:bg-surface-hover transition-colors group">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <contact.icon size={20} className={contact.color} />
                    </div>
                    <div>
                      <p className="text-sm text-muted">{contact.label}</p>
                      <p className="font-medium">{contact.value}</p>
                    </div>
                  </a>
                </FadeIn>
              ))}

              <FadeIn delay={0.4}>
                <div className="glass-card rounded-xl p-5">
                  <h3 className="font-semibold mb-3 flex items-center gap-2"><Clock size={16} className="text-primary" /> Working Hours</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted">Medical Support</span><span className="font-medium text-green-600">24/7 Available</span></div>
                    <div className="flex justify-between"><span className="text-muted">Office Hours</span><span className="font-medium">Mon-Sat 9AM-8PM IST</span></div>
                    <div className="flex justify-between"><span className="text-muted">Emergency</span><span className="font-medium text-red-500">Always Available</span></div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.5}>
                <div className="glass-card rounded-xl p-5">
                  <h3 className="font-semibold mb-3 flex items-center gap-2"><Globe size={16} className="text-primary" /> Global Offices</h3>
                  <div className="space-y-2 text-sm text-muted">
                    <p>🇮🇳 Hyderabad, India (HQ)</p>
                    <p>🇦🇪 Dubai, UAE</p>
                    <p>🇬🇧 London, UK</p>
                    <p>🇺🇸 New York, USA</p>
                    <p>🇧🇩 Dhaka, Bangladesh</p>
                  </div>
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-3">
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
                      Your inquiry has been received. Our medical coordinator will contact you within 2 hours.
                    </p>
                    <button onClick={() => setSubmitted(false)} className="btn-primary">
                      Submit Another Inquiry
                    </button>
                  </motion.div>
                ) : (
                  <div className="glass-card rounded-2xl p-8">
                    <h2 className="text-2xl font-bold mb-2">Free Medical Consultation</h2>
                    <p className="text-sm text-muted mb-8">Fill in your details and our specialist will get back to you within 2 hours</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Full Name *</label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-surface rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 border border-border"
                            placeholder="John Smith"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Email *</label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-surface rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 border border-border"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Phone / WhatsApp *</label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-surface rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 border border-border"
                            placeholder="+1 234 567 890"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Country *</label>
                          <select
                            required
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            className="w-full bg-surface rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 border border-border"
                          >
                            <option value="">Select Country</option>
                            <option>United States</option>
                            <option>United Kingdom</option>
                            <option>UAE</option>
                            <option>Australia</option>
                            <option>Canada</option>
                            <option>Germany</option>
                            <option>Bangladesh</option>
                            <option>Nigeria</option>
                            <option>Kenya</option>
                            <option>Other</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Treatment Required</label>
                        <select
                          value={formData.treatment}
                          onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                          className="w-full bg-surface rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 border border-border"
                        >
                          <option value="">Select Treatment</option>
                          <option>Cardiology / Heart Surgery</option>
                          <option>Orthopedics / Joint Replacement</option>
                          <option>Oncology / Cancer Treatment</option>
                          <option>Neurology / Brain Surgery</option>
                          <option>IVF / Fertility</option>
                          <option>Dental Care</option>
                          <option>Cosmetic Surgery</option>
                          <option>Organ Transplant</option>
                          <option>Spine Surgery</option>
                          <option>Eye Care</option>
                          <option>Health Checkup</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Your Message</label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          rows={4}
                          className="w-full bg-surface rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 border border-border resize-none"
                          placeholder="Describe your medical condition or query..."
                        />
                      </div>
                      <div id="reports">
                        <label className="text-sm font-medium mb-1.5 block">Upload Medical Reports (optional)</label>
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          accept="application/pdf,image/jpeg,image/png"
                          className="hidden"
                          onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
                        />
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                        >
                          <Upload size={24} className="mx-auto text-muted mb-2" />
                          <p className="text-sm text-muted">
                            {files.length > 0 ? `${files.length} file(s) selected` : "Drag & drop or click to upload"}
                          </p>
                          <p className="text-xs text-muted mt-1">
                            {files.length > 0 ? files.map((f) => f.name).join(", ") : "PDF, JPG, PNG up to 10MB"}
                          </p>
                        </div>
                      </div>
                      {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                      <motion.button
                        type="submit"
                        disabled={submitting}
                        className="w-full btn-primary flex items-center justify-center gap-2 py-4 text-base disabled:opacity-60"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <Send size={18} /> {submitting ? "Submitting..." : "Submit Free Consultation Request"}
                      </motion.button>
                      <p className="text-xs text-muted text-center">
                        By submitting, you agree to our Privacy Policy. Your data is encrypted and secure.
                      </p>
                    </form>
                  </div>
                )}
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
