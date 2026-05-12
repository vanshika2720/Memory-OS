"use client";

import React, { useState, useEffect, useRef } from "react";
import { useStore } from "@/store";
import { Search, X, MessageSquare, User, CheckSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen } = useStore();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (commandPaletteOpen) {
      inputRef.current?.focus();
      setQuery("");
      setActiveIndex(0);
    }
  }, [commandPaletteOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCommandPaletteOpen(false);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, MOCK_RESULTS.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }
      if (e.key === "Enter") {
        // Handle selection
        console.log("Selected:", MOCK_RESULTS[activeIndex]);
        setCommandPaletteOpen(false);
      }
    };

    if (commandPaletteOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [commandPaletteOpen, activeIndex, setCommandPaletteOpen]);

  if (!commandPaletteOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col p-8 md:p-24">
        {/* Top: Search Input */}
        <div className="relative flex items-center mb-12">
          <Search className="absolute left-0 text-white/20" size={32} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search memories, people, promises…"
            className="w-full bg-transparent border-none text-white font-headline text-[32px] md:text-[48px] uppercase tracking-[-1px] placeholder:text-[#111] focus:ring-0 pl-12"
          />
          <button 
            onClick={() => setCommandPaletteOpen(false)}
            className="p-2 text-[#333] hover:text-white transition-colors"
          >
            <X size={32} />
          </button>
        </div>

        {/* Results grouped by type */}
        <div className="flex-1 overflow-y-auto space-y-12 custom-scrollbar">
          {MOCK_GROUPS.map((group) => (
            <div key={group.type} className="space-y-6">
              <h2 className="font-headline text-[14px] text-[#333] uppercase tracking-[4px] border-b border-[#111] pb-2">
                {group.type}
              </h2>
              <div className="grid gap-2">
                {MOCK_RESULTS.filter(r => r.type === group.type).map((result, idx) => {
                  const globalIdx = MOCK_RESULTS.indexOf(result);
                  return (
                    <div
                      key={idx}
                      className={cn(
                        "flex items-center gap-6 p-4 transition-all cursor-pointer",
                        activeIndex === globalIdx ? "bg-white/5" : "hover:bg-white/2"
                      )}
                      onMouseEnter={() => setActiveIndex(globalIdx)}
                    >
                      <div className="w-10 h-10 rounded-sm bg-[#050505] border border-[#111] flex items-center justify-center text-[#333]">
                        {result.type === "MEMORIES" && <MessageSquare size={18} />}
                        {result.type === "PEOPLE" && <User size={18} />}
                        {result.type === "PROMISES" && <CheckSquare size={18} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-body text-[16px] text-white truncate">{result.title}</div>
                        <div className="font-headline text-[10px] text-[#333] uppercase tracking-[1px] mt-1">
                          {result.subtitle}
                        </div>
                      </div>
                      {activeIndex === globalIdx && (
                        <div className="font-headline text-[11px] text-white/20 uppercase">Press Enter ↵</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const MOCK_GROUPS = [
  { type: "MEMORIES" },
  { type: "PEOPLE" },
  { type: "PROMISES" },
];

const MOCK_RESULTS = [
  { type: "MEMORIES", title: "Discussion about the new studio space in Brooklyn", subtitle: "May 12, 2024 • WhatsApp" },
  { type: "MEMORIES", title: "Sent project vision update to the engineering team", subtitle: "May 10, 2024 • Gmail" },
  { type: "PEOPLE", title: "Sarah Jenkins", subtitle: "Friend • Last seen 2 days ago" },
  { type: "PEOPLE", title: "Rahul Sharma", subtitle: "Colleague • Last seen 14 days ago" },
  { type: "PROMISES", title: "Send Mark's contact details to Sarah", subtitle: "Due Tomorrow • WhatsApp" },
];
