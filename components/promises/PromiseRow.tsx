"use client";

import React from "react";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface PromiseRowProps {
  id: string;
  title: string;
  to: string;
  dueDate: string;
  daysLeft: number;
  source: string;
  status: string;
}

export default function PromiseRow({ title, to, dueDate, daysLeft, source, status }: PromiseRowProps) {
  const isFulfilled = status === "FULFILLED";
  const isBroken = status === "BROKEN";
  const isOverdue = daysLeft < 0 && !isFulfilled;

  return (
    <div className="flex items-center gap-8 p-8 border-b border-[#111] group hover:bg-[#050505] transition-all">
      {/* Status dot */}
      <div className={cn(
        "w-2 h-2 rounded-full shrink-0",
        isFulfilled ? "bg-white" : isBroken ? "bg-[#333]" : "bg-[#222]",
        isOverdue && "bg-white animate-pulse"
      )} />

      <div className="flex-1 space-y-2 min-w-0">
        <h3 className={cn(
          "font-body text-[14px] leading-none transition-all",
          isFulfilled ? "text-[#333] line-through" : "text-white"
        )}>
          {title}
        </h3>
        <div className="flex items-center gap-4 text-[11px] font-headline uppercase tracking-[1px] text-[#333]">
          <span>To: {to}</span>
          <div className="w-1 h-1 bg-[#111] rounded-full" />
          <span>Source: {source}</span>
        </div>
      </div>

      <div className="flex items-center gap-12 shrink-0">
        <div className="text-right">
          <div className="font-headline text-[10px] text-[#222] uppercase tracking-[2px]">{dueDate}</div>
          {!isFulfilled && !isBroken && (
            <div className={cn(
              "font-headline text-[10px] uppercase tracking-[1px] mt-1",
              isOverdue ? "text-white" : "text-[#333]"
            )}>
              {isOverdue ? `${Math.abs(daysLeft)} days overdue` : `${daysLeft} days left`}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 border border-[#111] text-[10px] font-headline tracking-[2px] text-[#333] hover:text-white hover:border-[#333] transition-all uppercase">
            Mark Done
          </button>
          <button className="text-[#111] hover:text-white transition-colors">
            <ExternalLink size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
