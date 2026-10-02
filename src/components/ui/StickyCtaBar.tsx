"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";

export function StickyCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-40 lg:hidden p-3 pr-20 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-border"
        >
          <Link href="/contact" className="btn-primary w-full flex items-center justify-center gap-2 py-3 text-sm">
            <Phone size={16} /> Get a free consultation
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
