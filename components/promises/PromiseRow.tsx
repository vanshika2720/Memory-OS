"use client";

import React from "react";
import { CheckCircle, Circle, Clock, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface PromiseRowProps {
  id: string;
  title: string;
  to: string;
  dueDate: string;
  source: string;
  status: string;
}

export default function PromiseRow({ title, to, dueDate, source, status }: PromiseRowProps) {
  const isCompleted = status === "COMPLETED";

  return (
    <div className="flex items-center gap-6 p-6 group hover:bg-[#050505] transition-colors">
      <button className={cn(
        "text-tertiary hover:text-white transition-colors",
        isCompleted && "text-white"
      )}>
        {isCompleted ? <CheckCircle size={20} /> : <Circle size={20} />}
      </button>

      <div className="flex-1 space-y-1">
        <h3 className={cn(
          "font-headline text-xl uppercase tracking-[1px] transition-colors",
          isCompleted ? "text-tertiary line-through" : "text-white"
        )}>
          {title}
        </h3>
        <div className="flex items-center gap-4 text-[11px] font-headline uppercase tracking-[1px] text-tertiary">
          <span>To: {to}</span>
          <div className="w-1 h-1 bg-subtle rounded-full" />
          <span>Source: {source}</span>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 text-tertiary">
          <Clock size={14} />
          <span className="font-headline text-[11px] uppercase tracking-[1px]">{dueDate}</span>
        </div>
        
        <button className="text-tertiary hover:text-white transition-colors">
          <ExternalLink size={16} />
        </button>
      </div>
    </div>
  );
}
