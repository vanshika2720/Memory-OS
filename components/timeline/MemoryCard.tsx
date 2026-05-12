"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Clock, ExternalLink } from "lucide-react";

interface MemoryCardProps {
  time: string;
  source: string;
  title: string;
  content: string;
  tags: string[];
  sentiment: string;
  isPromise?: boolean;
}

export default function MemoryCard({ 
  time, 
  source, 
  title, 
  content, 
  tags, 
  sentiment,
  isPromise 
}: MemoryCardProps) {
  return (
    <div className={cn(
      "group relative p-6 border transition-all hover:bg-[#050505]",
      isPromise ? "border-white/20" : "border-subtle"
    )}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-tertiary">
            <Clock size={12} />
            <span className="font-headline text-[10px] uppercase tracking-[1px]">{time}</span>
          </div>
          <div className="h-3 w-[1px] bg-subtle" />
          <span className="font-headline text-[10px] uppercase tracking-[1px] text-white">
            {source}
          </span>
        </div>
        
        <div className="flex gap-2">
          {tags.map(tag => (
            <span key={tag} className="px-2 py-0.5 border border-subtle text-[9px] font-headline uppercase tracking-[1px] text-tertiary">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <h3 className="font-headline text-xl uppercase mb-2 group-hover:text-white transition-colors">
        {title}
      </h3>
      
      <p className="text-secondary text-[14px] leading-relaxed mb-6">
        {content}
      </p>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-1.5 h-1.5 rounded-full",
            sentiment === "POSITIVE" ? "bg-white" : 
            sentiment === "EXCITED" ? "bg-white animate-pulse" : "bg-tertiary"
          )} />
          <span className="text-[10px] font-headline uppercase tracking-[1px] text-tertiary">{sentiment}</span>
        </div>

        <button className="text-tertiary hover:text-white transition-colors">
          <ExternalLink size={14} />
        </button>
      </div>

      {isPromise && (
        <div className="absolute -left-[1px] top-1/2 -translate-y-1/2 w-[2px] h-12 bg-white" />
      )}
    </div>
  );
}
