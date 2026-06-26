"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FadeIn } from "@/components/ui/motion";

const faqs = [
  { q: "Is medical treatment in India safe for international patients?", a: "Absolutely. India has 250+ JCI and NABH accredited hospitals with world-class infrastructure, internationally trained doctors, and success rates comparable to the best hospitals globally. Many doctors are trained at top institutions like Harvard, Johns Hopkins, and Oxford." },
  { q: "How much can I save on treatment in India?", a: "You can save 60-90% on treatment costs compared to the USA, UK, and other Western countries. For example, a heart bypass surgery costs around $5,500 in India vs $75,000 in the USA. Our cost calculator can give you precise estimates for your treatment." },
  { q: "How do I get a medical visa for India?", a: "We handle the entire medical visa process for you. Typically, you'll need a valid passport, medical documents from your home doctor, and a treatment plan from our partner hospital. The visa is usually processed within 3-5 business days." },
  { q: "What is included in your medical tourism packages?", a: "Our all-inclusive packages cover hospital treatment, accommodation, airport transfers, local transportation, translator services, personal healthcare coordinator, medicines, follow-up consultations, and even tourism activities during recovery." },
  { q: "Can I consult with a doctor before traveling to India?", a: "Yes! We offer free video consultations with our specialist doctors. You can discuss your condition, treatment options, and expected outcomes before making any travel decisions. Simply upload your medical reports and we'll arrange a consultation within 24-48 hours." },
  { q: "What happens after I return home?", a: "We provide comprehensive post-treatment support including virtual follow-up consultations with your treating doctor, prescription management, recovery monitoring, and 24/7 emergency support. Our care continues until you're fully recovered." },
  { q: "Are there language barriers at Indian hospitals?", a: "No. All our partner hospitals have English-speaking medical staff. Additionally, we provide professional medical translators in 20+ languages including Arabic, French, Russian, Chinese, Spanish, and many more." },
  { q: "How do I make payments?", a: "We accept international credit/debit cards, bank transfers, PayPal, and other digital payment methods. We also work with international insurance providers for cashless treatment. You'll receive transparent cost breakdowns with no hidden charges." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding bg-surface relative overflow-hidden" id="faq">
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <HelpCircle size={14} /> FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Everything you need to know about medical tourism in India
          </p>
        </FadeIn>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-surface-hover transition-colors"
              >
                <span className="font-medium text-sm sm:text-base pr-4">{faq.q}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown size={18} className="text-muted" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-5 pb-5 text-sm text-muted leading-relaxed border-t border-border pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
