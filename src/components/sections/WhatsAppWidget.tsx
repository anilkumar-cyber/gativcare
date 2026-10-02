"use client";

import { motion } from "framer-motion";

const WHATSAPP_LINK = "https://wa.me/918522920252";

export default function WhatsAppWidget() {
  return (
    <motion.a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.5 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 left-4 sm:left-6 z-50 w-14 h-14 rounded-full bg-[#25D366] shadow-2xl shadow-black/20 flex items-center justify-center"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-40" />
      <svg viewBox="0 0 32 32" className="relative w-8 h-8 fill-white">
        <path d="M16.004 3.2c-7.07 0-12.8 5.73-12.8 12.8 0 2.26.6 4.45 1.73 6.38L3.2 28.8l6.6-1.73a12.74 12.74 0 0 0 6.2 1.58h.005c7.07 0 12.8-5.73 12.8-12.8s-5.73-12.65-12.8-12.65Zm0 23.3h-.004a10.55 10.55 0 0 1-5.38-1.47l-.386-.23-4 1.05 1.07-3.9-.25-.4a10.47 10.47 0 0 1-1.6-5.6c0-5.8 4.72-10.5 10.55-10.5 2.82 0 5.46 1.1 7.45 3.09a10.44 10.44 0 0 1 3.09 7.42c0 5.8-4.72 10.51-10.55 10.51Zm5.78-7.88c-.317-.159-1.876-.926-2.167-1.032-.29-.106-.502-.159-.714.16-.211.317-.82 1.031-1.005 1.243-.185.212-.37.238-.687.08-.317-.16-1.338-.494-2.548-1.575-.942-.84-1.578-1.877-1.763-2.194-.185-.317-.02-.489.14-.647.143-.143.318-.37.476-.556.159-.185.212-.318.318-.53.106-.211.053-.397-.026-.556-.08-.159-.714-1.72-.978-2.356-.257-.618-.518-.535-.714-.545l-.607-.01c-.211 0-.556.079-.847.397-.29.317-1.11 1.084-1.11 2.645 0 1.56 1.137 3.068 1.296 3.28.159.211 2.24 3.42 5.427 4.8.758.327 1.35.523 1.812.669.762.243 1.454.209 2.002.127.611-.091 1.876-.767 2.14-1.508.264-.74.264-1.375.185-1.508-.08-.132-.29-.211-.607-.37Z"/>
      </svg>
    </motion.a>
  );
}
