"use client";

import { useEffect, useRef, useState } from "react";
import { Globe, Search, Check } from "lucide-react";
import { LANGUAGES } from "@/lib/languages";

function readLangCookie(): string {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(/googtrans=\/en\/([a-zA-Z-]+)/);
  return match?.[1] ?? "en";
}

function setLangCookie(code: string) {
  const isReset = code === "en";
  const value = isReset ? "" : `/en/${code}`;
  const maxAge = isReset ? "max-age=0" : "";

  document.cookie = `googtrans=${value}; path=/; ${maxAge}`;
  const host = window.location.hostname;
  if (host && host !== "localhost" && host.split(".").length > 1) {
    const domain = "." + host.split(".").slice(-2).join(".");
    document.cookie = `googtrans=${value}; path=/; domain=${domain}; ${maxAge}`;
  }
}

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [current, setCurrent] = useState("en");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cookie is only readable client-side; syncing after mount avoids an SSR hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrent(readLangCookie());
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const filtered = LANGUAGES.filter((l) => l.name.toLowerCase().includes(query.toLowerCase()));
  const currentLabel = LANGUAGES.find((l) => l.code === current)?.name ?? "English";

  function selectLanguage(code: string) {
    setLangCookie(code);
    window.location.reload();
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 ${compact ? "text-sm" : "px-3 py-1.5 rounded-lg hover:bg-surface"} transition-colors`}
        aria-label="Change language"
      >
        <Globe size={compact ? 13 : 16} />
        <span>{currentLabel}</span>
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 w-64 rounded-xl border border-border bg-white dark:bg-slate-900 shadow-xl z-50 overflow-hidden text-foreground">
          <div className="p-2 border-b border-border">
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search language..."
                className="w-full bg-surface rounded-lg pl-8 pr-3 py-1.5 text-sm outline-none border border-border"
              />
            </div>
          </div>
          <div className="max-h-72 overflow-y-auto py-1">
            {filtered.map((lang) => (
              <button
                key={lang.code}
                onClick={() => selectLanguage(lang.code)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm text-left hover:bg-surface transition-colors"
              >
                {lang.name}
                {current === lang.code && <Check size={14} className="text-primary" />}
              </button>
            ))}
            {filtered.length === 0 && <p className="px-3 py-4 text-sm text-muted text-center">No matches.</p>}
          </div>
        </div>
      )}
    </div>
  );
}
