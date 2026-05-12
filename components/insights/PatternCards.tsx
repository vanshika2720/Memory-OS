"use client";

import React from "react";

const PATTERNS = [
  { title: "Morning Anxiety", description: "Your stress levels peak between 8:00 AM and 10:00 AM on weekdays, often linked to 'Gmail' interactions.", impact: "HIGH" },
  { title: "Social Energy", description: "Interaction with 'Sarah Jenkins' consistently improves your emotional tone for the following 4 hours.", impact: "MEDIUM" },
  { title: "Promise Delay", description: "You tend to fulfill promises made on WhatsApp 30% slower than those made via email.", impact: "LOW" },
  { title: "Creative Peaks", description: "Your most 'Excited' voice memos are recorded on Sunday evenings, typically around 11:00 PM.", impact: "MEDIUM" },
];

export default function PatternCards() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {PATTERNS.map((pattern) => (
        <div key={pattern.title} className="p-6 border border-subtle bg-[#050505] space-y-4 group hover:border-white/20 transition-all">
          <div className="flex justify-between items-center">
            <h3 className="font-headline text-xl uppercase tracking-[1px] group-hover:text-white transition-colors">
              {pattern.title}
            </h3>
            <span className="text-[10px] font-headline uppercase tracking-[2px] text-tertiary">
              {pattern.impact} IMPACT
            </span>
          </div>
          <p className="text-secondary text-[14px] leading-relaxed">
            {pattern.description}
          </p>
        </div>
      ))}
    </div>
  );
}
