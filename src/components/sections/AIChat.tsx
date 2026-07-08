"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Sparkles, Upload, Minimize2 } from "lucide-react";

interface Message {
  role: "bot" | "user";
  text: string;
}

const quickActions = [
  "Get treatment cost estimate",
  "Find best hospital",
  "Book free consultation",
  "Visa assistance",
  "Upload medical reports",
];

const botResponses: Record<string, string> = {
  default: "Thank you for reaching out! I'm your AI healthcare assistant. I can help you with treatment costs, hospital recommendations, doctor profiles, visa assistance, and more. How can I assist you today?",
  cost: "Treatment costs in India are 60-90% lower than Western countries. For example, heart bypass surgery starts at $5,500, knee replacement at $5,000, and IVF at $3,000. Would you like a detailed cost estimate for a specific treatment?",
  hospital: "India has 250+ JCI and NABH accredited hospitals. Top choices include Apollo Hospitals (Delhi), Medanta (Gurugram), Fortis Healthcare (Mumbai), and Narayana Health (Bangalore). Would you like me to recommend hospitals for your specific treatment?",
  consultation: "I'd be happy to help you book a free consultation! Our medical coordinators are available 24/7. You can share your medical reports, and our specialist doctors will review them within 24 hours. Shall I connect you with a coordinator?",
  visa: "We provide complete medical visa assistance. The process typically takes 3-5 business days. You'll need a valid passport, medical documents, and a treatment plan from our partner hospital. We handle the entire application process for you.",
  upload: "You can upload your medical reports securely through our platform. We accept MRI scans, CT scans, blood reports, X-rays, and other medical documents. Our AI will analyze them and recommend suitable treatments, doctors, and hospitals.",
};

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("cost") || lower.includes("price") || lower.includes("estimate")) return botResponses.cost;
  if (lower.includes("hospital") || lower.includes("best")) return botResponses.hospital;
  if (lower.includes("consult") || lower.includes("book") || lower.includes("appointment")) return botResponses.consultation;
  if (lower.includes("visa") || lower.includes("travel")) return botResponses.visa;
  if (lower.includes("upload") || lower.includes("report") || lower.includes("document")) return botResponses.upload;
  return botResponses.default;
}

export default function AIChat() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hello! 👋 I'm your AI Healthcare Assistant. I can help you find the right treatment, hospital, and doctor in India. How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: getBotResponse(text) }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[360px] sm:w-[400px] max-h-[600px] glass-strong rounded-2xl shadow-2xl shadow-black/20 flex flex-col overflow-hidden"
          >
            <div className="bg-gradient-to-r from-primary to-accent p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">AI Health Assistant</h3>
                  <p className="text-xs text-white/80 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Online • Replies instantly
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg hover:bg-white/20 transition-colors">
                <Minimize2 size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[350px] bg-white/50 dark:bg-slate-900/50">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    msg.role === "bot"
                      ? "bg-gradient-to-br from-primary to-accent text-white"
                      : "bg-surface text-foreground"
                  }`}>
                    {msg.role === "bot" ? <Bot size={14} /> : <User size={14} />}
                  </div>
                  <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "bot"
                      ? "bg-surface text-foreground rounded-tl-md"
                      : "bg-gradient-to-r from-primary to-accent text-white rounded-tr-md"
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center">
                    <Bot size={14} />
                  </div>
                  <div className="bg-surface px-4 py-3 rounded-2xl rounded-tl-md">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-primary"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {messages.length <= 2 && (
              <div className="px-4 py-2 flex flex-wrap gap-1.5 border-t border-border bg-white/30 dark:bg-slate-900/30">
                {quickActions.map((action) => (
                  <button
                    key={action}
                    onClick={() => sendMessage(action)}
                    className="text-[11px] px-2.5 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all font-medium"
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}

            <div className="p-3 border-t border-border bg-white/50 dark:bg-slate-900/50">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => router.push("/contact#reports")}
                  className="p-2 rounded-xl hover:bg-surface transition-colors text-muted"
                  title="Upload reports"
                >
                  <Upload size={18} />
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                  placeholder="Ask about treatments, costs..."
                  className="flex-1 bg-surface rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-muted/60"
                />
                <motion.button
                  onClick={() => sendMessage(input)}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-4 sm:right-6 z-50 p-4 rounded-full shadow-2xl transition-colors ${
          isOpen
            ? "bg-red-500 hover:bg-red-600"
            : "bg-gradient-to-r from-primary to-accent hover:shadow-primary/40"
        } text-white`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={!isOpen ? { y: [0, -5, 0] } : {}}
        transition={!isOpen ? { duration: 2, repeat: Infinity } : {}}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[9px] font-bold">
            1
          </span>
        )}
      </motion.button>
    </>
  );
}
