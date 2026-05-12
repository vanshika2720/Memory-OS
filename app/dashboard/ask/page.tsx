"use client";

import React, { useState } from "react";
import { Mic, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const SUGGESTED_QUESTIONS = [
  "What did I promise Sarah during lunch?",
  "How was my emotional tone last week?",
  "When did I last see Rahul?",
  "Summarize my meeting with the architects."
];

export default function AskPage() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;

    const userMsg = { role: "user", content: query };
    setMessages((prev) => [...prev, userMsg]);
    setQuery("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMsg = { 
        role: "assistant", 
        content: "Based on your memories from May 12th, you promised Sarah you'd send her the contact for the architectural photographer by tomorrow morning. You also discussed the new studio space she's renting in Brooklyn."
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-70px)] ml-[220px]">
      <div className="flex-1 overflow-y-auto p-8 space-y-8">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center space-y-12 max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 border border-white/10 flex items-center justify-center">
              <Sparkles size={32} className="text-white" />
            </div>
            
            <div className="space-y-4">
              <h1 className="font-headline text-[50px] md:text-[80px] leading-[0.9] tracking-[-2px] uppercase">
                Ask your past.
              </h1>
              <p className="text-secondary text-[18px]">
                I have access to every email, chat, and voice memo you've ever shared. What do you want to know?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setQuery(q);
                    // handleSend will be called by useEffect or just manual click
                  }}
                  className="p-4 border border-subtle bg-[#050505] text-[13px] text-left text-tertiary hover:text-white hover:border-white/20 transition-all uppercase font-headline tracking-[1px]"
                >
                  "{q}"
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-12 pb-24">
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={cn(
                  "space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500",
                  msg.role === "assistant" ? "items-start" : "items-end"
                )}
              >
                <span className="font-headline text-[11px] tracking-[2px] uppercase text-tertiary">
                  {msg.role === "assistant" ? "MemoryOS" : "You"}
                </span>
                <div className={cn(
                  "text-[18px] md:text-[22px] leading-relaxed",
                  msg.role === "assistant" ? "text-secondary" : "text-white font-headline uppercase tracking-[-1px] text-[24px] md:text-[32px]"
                )}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-8 bg-black/50 backdrop-blur-md border-t border-subtle">
        <form onSubmit={handleSend} className="max-w-3xl mx-auto relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ASK ANYTHING..."
            className="w-full bg-[#050505] border border-subtle rounded-none py-6 pl-8 pr-32 text-[18px] font-headline uppercase tracking-[1px] focus:outline-none focus:border-white/20 transition-colors"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button type="button" className="p-3 text-tertiary hover:text-white transition-colors">
              <Mic size={20} />
            </button>
            <button type="submit" className="p-3 text-white hover:scale-110 transition-transform">
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
