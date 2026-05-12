"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MemoryCardProps {
  source: string;
  time: string;
  summary: string;
  people: string[];
  sentiment: string;
  importance: number;
  isPromise?: boolean;
}

export default function MemoryCard({ 
  source, 
  time, 
  summary, 
  people, 
  sentiment, 
  importance,
  isPromise 
}: MemoryCardProps) {
  const getSourceIcon = (s: string) => {
    switch (s) {
      case "GMAIL": return "✉";
      case "WHATSAPP": return "💬";
      case "CALENDAR": return "📅";
      default: return "●";
    }
  };

  return (
    <div className="group bg-black p-6 flex items-start gap-8 transition-all hover:bg-[#050505] cursor-pointer">
      {/* Left: Source icon + time */}
      <div className="w-24 flex flex-col gap-1 shrink-0">
        <div className="flex items-center gap-2 font-body text-[13px] text-white">
          <span className="opacity-50">{getSourceIcon(source)}</span>
          <span className="font-headline text-[11px] tracking-[1px]">{source}</span>
        </div>
        <span className="text-[10px] text-[#333] font-headline tracking-[1px]">{time}</span>
      </div>

      {/* Center: Summary + people pills */}
      <div className="flex-1 space-y-4 min-w-0">
        <p className="font-body text-[14px] text-white leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">
          {summary}
        </p>
        <div className="flex flex-wrap gap-2">
          {people.map(person => (
            <span key={person} className="px-2 py-0.5 border border-[#1a1a1a] text-[10px] text-[#333] font-headline uppercase tracking-[0.5px]">
              {person}
            </span>
          ))}
          {isPromise && (
            <span className="px-2 py-0.5 bg-white text-black text-[10px] font-headline uppercase tracking-[0.5px]">
              PROMISE
            </span>
          )}
        </div>
      </div>

      {/* Right: Emotion label + Importance bar */}
      <div className="w-32 flex flex-col items-end gap-3 shrink-0">
        <span className="text-[10px] text-[#222] font-headline uppercase tracking-[2px]">
          {sentiment}
        </span>
        <div className="w-full h-[1px] bg-[#111] overflow-hidden">
          <div 
            className="h-full bg-white opacity-20" 
            style={{ width: `${importance * 10}%` }}
          />
        </div>
      </div>
    </div>
  );
}
