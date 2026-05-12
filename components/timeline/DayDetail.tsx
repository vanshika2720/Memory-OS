"use client";

import React from "react";
import MemoryCard from "./MemoryCard";

export default function DayDetail() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <h2 className="font-headline text-[32px] uppercase">May 12, 2024</h2>
        <div className="h-[1px] flex-1 bg-subtle" />
        <span className="font-headline text-[11px] text-tertiary uppercase tracking-[1px]">18 Memories</span>
      </div>

      <div className="space-y-6">
        <MemoryCard 
          time="09:42 AM"
          source="GMAIL"
          title="Project Vision Update"
          content="Sent an email to the team about the new design direction. Emphasized the importance of 'silent capture' and 'natural recall' as our core pillars."
          tags={["WORK", "STRATEGY"]}
          sentiment="POSITIVE"
        />
        <MemoryCard 
          time="01:15 PM"
          source="WHATSAPP"
          title="Lunch with Sarah"
          content="Sarah mentioned she's looking for an architectural photographer for her new studio. Promised to send her Mark's contact details by tomorrow."
          tags={["PROMISE", "RELATIONSHIP"]}
          sentiment="NEUTRAL"
          isPromise
        />
        <MemoryCard 
          time="04:30 PM"
          source="VOICE"
          title="Voice Memo: Product Idea"
          content="Thinking about a 'Memory Wrapped' feature where users get a monthly visual summary of their life patterns and emotional arc."
          tags={["IDEA", "PRODUCT"]}
          sentiment="EXCITED"
        />
      </div>
    </div>
  );
}
