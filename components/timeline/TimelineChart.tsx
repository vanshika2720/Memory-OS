"use client";

import React, { useState, useEffect } from "react";
import { useStore } from "@/store";
import { cn } from "@/lib/utils";

export default function TimelineChart({ date }: { date: Date }) {
  const { setSelectedDate, selectedDate } = useStore();
  const [bars, setBars] = useState<{ height: number, importance: number, count: number }[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  useEffect(() => {
    // Generate/Fetch mock daily summaries
    const newBars = Array.from({ length: daysInMonth }, () => ({
      height: Math.floor(Math.random() * 80) + 10,
      importance: Math.floor(Math.random() * 10),
      count: Math.floor(Math.random() * 50)
    }));
    setBars(newBars);
  }, [date, daysInMonth]);

  return (
    <div className="relative h-[120px] flex items-end gap-[3px] group/chart">
      {bars.map((bar, i) => {
        const isToday = new Date().toDateString() === new Date(date.getFullYear(), date.getMonth(), i + 1).toDateString();
        const isSelected = selectedDate?.toDateString() === new Date(date.getFullYear(), date.getMonth(), i + 1).toDateString();
        
        return (
          <div
            key={i}
            onClick={() => setSelectedDate(new Date(date.getFullYear(), date.getMonth(), i + 1))}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={cn(
              "flex-1 transition-all duration-500 cursor-pointer relative",
              isToday ? "bg-white" : bar.importance > 7 ? "bg-[#2a2a2a]" : "bg-[#111]",
              isSelected && !isToday && "bg-[#444]",
              "hover:bg-[#555] active:scale-95"
            )}
            style={{ 
              height: `${bar.height}%`,
              transitionDelay: `${i * 20}ms`,
              animation: 'barGrow 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              animationDelay: `${i * 20}ms`,
              '--target-height': `${bar.height}%`
            } as any}
          >
            {/* Tooltip */}
            {hoveredIndex === i && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 z-50 p-3 bg-black border border-[#111] min-w-[120px] pointer-events-none animate-in fade-in zoom-in-95 duration-100">
                <div className="font-headline text-[10px] text-[#333] uppercase tracking-[1px] mb-1">
                  {new Date(date.getFullYear(), date.getMonth(), i + 1).toLocaleDateString('default', { month: 'short', day: 'numeric' })}
                </div>
                <div className="flex justify-between items-baseline gap-4">
                  <span className="font-headline text-[16px] text-white">{bar.count}</span>
                  <span className="font-body text-[10px] text-[#555] uppercase">Memories</span>
                </div>
                <div className="font-body text-[9px] text-[#333] uppercase tracking-[0.5px] mt-2 border-t border-[#0a0a0a] pt-2">
                  NEUTRAL TONE
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
