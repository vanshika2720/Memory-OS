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
      case "GMAIL":
        return (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="3" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1" />
            <path d="M1 4L7 8.5L13 4" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
          </svg>
        );
      case "WHATSAPP":
        return (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 12L3.25 8.25C2.5 7.25 2.25 6 2.5 4.75C2.75 3.5 3.5 2.5 4.5 1.75C5.5 1 6.75 0.75 8 1C9.25 1.25 10.25 2 11 3C11.75 4 12 5.25 11.75 6.5C11.5 7.75 10.75 8.75 9.75 9.5C8.75 10.25 7.5 10.5 6.25 10.25L2 12Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
          </svg>
        );
      case "CALENDAR":
        return (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1.5" y="3" width="11" height="9" rx="1" stroke="currentColor" strokeWidth="1" />
            <line x1="1.5" y1="6" x2="12.5" y2="6" stroke="currentColor" strokeWidth="1" />
            <line x1="4.5" y1="1.5" x2="4.5" y2="4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <line x1="9.5" y1="1.5" x2="9.5" y2="4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
        );
      default:
        return <span className="text-[10px]">●</span>;
    }
  };

  return (
    <div className="group bg-black p-6 flex items-start gap-8 transition-all duration-500 hover:bg-[#050505] hover:-translate-y-0.5 hover:scale-[1.005] cursor-pointer">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border border-white/5" />
      {/* Left: Source icon + time */}
      <div className="w-24 flex flex-col gap-1 shrink-0">
        <div className="flex items-center gap-2 font-body text-[13px] text-white">
          <span className="opacity-50 group-hover:opacity-100 transition-opacity duration-500">{getSourceIcon(source)}</span>
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
