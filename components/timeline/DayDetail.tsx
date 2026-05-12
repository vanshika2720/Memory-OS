"use client";

import React from "react";
import MemoryCard from "./MemoryCard";
import { cn } from "@/lib/utils";

export default function DayDetail({ date }: { date: Date }) {
  const formattedDate = date.toLocaleDateString('default', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h2 className="font-headline text-[32px] md:text-[40px] uppercase tracking-[-1px] text-white">
            {formattedDate}
          </h2>
          <div className="flex gap-4 items-center">
            <span className="font-headline text-[10px] text-[#333] uppercase tracking-[2px]">
              12 MEMORIES
            </span>
            <div className="w-1 h-1 bg-[#111] rounded-full" />
            <span className="font-headline text-[10px] text-[#333] uppercase tracking-[2px]">
              2 PROMISES
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-px bg-[#111] border border-[#111]">
        {MOCK_MEMORIES.map((memory, i) => (
          <MemoryCard 
            key={i}
            {...memory}
          />
        ))}
      </div>
    </div>
  );
}

const MOCK_MEMORIES = [
  {
    source: "GMAIL",
    time: "09:42 AM",
    summary: "Discussion with the engineering team about the upcoming sprint architecture and silents capture requirements.",
    people: ["Sarah Jenkins", "Mark Wilson"],
    sentiment: "POSITIVE",
    importance: 8,
  },
  {
    source: "WHATSAPP",
    time: "01:15 PM",
    summary: "Sarah asked about the photographer contact details. Promised to send them by tomorrow morning.",
    people: ["Sarah Jenkins"],
    sentiment: "NEUTRAL",
    importance: 9,
    isPromise: true,
  },
  {
    source: "CALENDAR",
    time: "03:00 PM",
    summary: "Weekly sync with the product design team. Reviewed the new life timeline visualizations.",
    people: ["Emily Chen"],
    sentiment: "POSITIVE",
    importance: 6,
  }
];
