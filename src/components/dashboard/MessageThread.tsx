"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { Send } from "lucide-react";
import { sendPatientMessageAction } from "@/lib/actions/journey";

type Message = { id: string; body: string; createdAt: Date; authorId: string; author: { name: string } };

export function MessageThread({ patientId, currentUserId, messages }: { patientId: string; currentUserId: string; messages: Message[] }) {
  const [text, setText] = useState("");
  const [pending, startTransition] = useTransition();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages.length]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6 flex flex-col h-[520px]">
      <h3 className="font-semibold mb-4">Messages</h3>
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {messages.map((m) => {
          const isMe = m.authorId === currentUserId;
          return (
            <div key={m.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm ${isMe ? "bg-gradient-to-r from-primary to-accent text-white rounded-tr-md" : "bg-surface rounded-tl-md"}`}>
                {!isMe && <p className="text-[11px] font-semibold opacity-70 mb-0.5">{m.author.name}</p>}
                <p className="leading-relaxed whitespace-pre-wrap">{m.body}</p>
                <p className={`text-[10px] mt-1 ${isMe ? "text-white/70" : "text-muted"}`}>{m.createdAt.toLocaleString()}</p>
              </div>
            </div>
          );
        })}
        {messages.length === 0 && <p className="text-sm text-muted text-center py-10">No messages yet. Say hello to your care team.</p>}
        <div ref={endRef} />
      </div>
      <form
        action={(formData) => {
          if (!text.trim()) return;
          startTransition(() => sendPatientMessageAction(formData));
          setText("");
        }}
        className="flex items-center gap-2 mt-4 pt-4 border-t border-border"
      >
        <input type="hidden" name="patientId" value={patientId} />
        <input
          name="body"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-surface rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 border border-border"
        />
        <button type="submit" disabled={pending || !text.trim()} className="p-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white disabled:opacity-60">
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
