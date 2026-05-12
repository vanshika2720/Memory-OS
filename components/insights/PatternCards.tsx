"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PATTERNS = [
  { 
    type: "RECURRING MISTAKE", 
    description: "You tend to underestimate project timelines when discussing with Sarah Jenkins on Mondays.",
    example: "Last 3 Monday meetings resulted in missed deadlines.",
    question: "What mistakes do I repeatedly make with Sarah?"
  },
  { 
    type: "NEGLECTED RELATIONSHIP", 
    description: "Interaction with Mark Wilson has dropped by 80% compared to your usual monthly average.",
    example: "No interaction since April 12th.",
    question: "Who have I been neglecting lately?"
  },
  { 
    type: "STRESS PATTERN MATCH", 
    description: "Your current emotional arc matches the 3-day period before your burnout in November 2023.",
    example: "High anxiety scores + late night Gmail activity.",
    question: "Does my current stress resemble any past periods?"
  },
  { 
    type: "HIGH PERFORMANCE", 
    description: "Your current focus on 'product architecture' matches your most productive period in Q1.",
    example: "Deep work blocks + positive sentiment in voice memos.",
    question: "When was I most productive recently?"
  },
];

export default function PatternCards() {
  return (
    <div className="grid gap-8">
      {PATTERNS.map((pattern) => (
        <div key={pattern.type} className="group p-8 border border-[#111] bg-[#050505] space-y-6 hover:border-[#333] transition-all relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="px-2 py-1 bg-[#111] text-[10px] font-headline text-[#333] tracking-[2px] uppercase">
              {pattern.type}
            </span>
          </div>
          
          <div className="space-y-2">
            <p className="font-body text-[16px] text-[#ccc] leading-relaxed">
              {pattern.description}
            </p>
            <p className="font-body text-[12px] text-[#444] italic">
              Example: {pattern.example}
            </p>
          </div>

          <Link 
            href={`/dashboard/ask?q=${encodeURIComponent(pattern.question)}`}
            className="inline-flex items-center gap-2 font-headline text-[11px] tracking-[2px] text-white hover:tracking-[3px] transition-all uppercase"
          >
            Tell me more <ArrowRight size={14} />
          </Link>

          {/* Background pattern */}
          <div className="absolute -right-4 -bottom-4 font-headline text-[60px] text-white/2 opacity-0 group-hover:opacity-100 transition-opacity select-none pointer-events-none">
            {pattern.type.split(' ')[0]}
          </div>
        </div>
      ))}
    </div>
  );
}
