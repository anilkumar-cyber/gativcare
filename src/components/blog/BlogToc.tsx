"use client";

import { useEffect, useState } from "react";
import { ListTree } from "lucide-react";

export function BlogToc({ toc }: { toc: { id: string; text: string }[] }) {
  const [activeId, setActiveId] = useState<string | null>(toc[0]?.id ?? null);

  useEffect(() => {
    const headings = toc
      .map((t) => document.getElementById(t.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-100px 0px -70% 0px", threshold: 0 }
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [toc]);

  return (
    <div className="sticky top-24 glass-card rounded-2xl p-5">
      <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted mb-4">
        <ListTree size={15} /> On This Page
      </p>
      <nav className="space-y-0.5 max-h-[calc(100vh-10rem)] overflow-y-auto">
        {toc.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`block px-3 py-2 rounded-lg text-sm transition-colors leading-snug ${
              activeId === item.id
                ? "text-primary bg-primary/10 font-semibold"
                : "text-muted hover:text-primary hover:bg-primary/5"
            }`}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </div>
  );
}
