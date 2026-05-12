"use client";

import React from "react";
import { X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/store";

export default function FilterSidebar({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { filters, setFilters } = useStore();

  const toggleFilter = (type: 'personIds' | 'emotions' | 'sources', value: string) => {
    const current = filters[type];
    const next = current.includes(value) 
      ? current.filter(v => v !== value)
      : [...current, value];
    setFilters({ [type]: next });
  };

  if (!isOpen) return null;

  return (
    <aside className="w-[300px] border-l border-[#111] bg-black h-screen fixed right-0 top-0 z-50 animate-in slide-in-from-right duration-300">
      <div className="flex flex-col h-full">
        <div className="p-8 border-b border-[#111] flex justify-between items-center">
          <h2 className="font-headline text-[14px] tracking-[4px] text-white uppercase">Filters</h2>
          <button onClick={onClose} className="text-[#333] hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-12 custom-scrollbar">
          {/* By Source */}
          <div className="space-y-6">
            <h3 className="font-headline text-[10px] text-[#333] tracking-[2px] uppercase">By Source</h3>
            <div className="grid gap-3">
              {["GMAIL", "WHATSAPP", "CALENDAR", "LINKEDIN", "TWITTER"].map(source => (
                <button
                  key={source}
                  onClick={() => toggleFilter('sources', source)}
                  className={cn(
                    "flex justify-between items-center px-4 py-3 border transition-all text-[11px] font-headline tracking-[1px]",
                    filters.sources.includes(source) ? "bg-white text-black border-white" : "border-[#111] text-[#555] hover:border-[#333]"
                  )}
                >
                  {source}
                  {filters.sources.includes(source) && <Check size={12} />}
                </button>
              ))}
            </div>
          </div>

          {/* By Emotion */}
          <div className="space-y-6">
            <h3 className="font-headline text-[10px] text-[#333] tracking-[2px] uppercase">By Emotion</h3>
            <div className="flex flex-wrap gap-2">
              {["POSITIVE", "NEGATIVE", "NEUTRAL", "ANXIOUS", "EXCITED"].map(emotion => (
                <button
                  key={emotion}
                  onClick={() => toggleFilter('emotions', emotion)}
                  className={cn(
                    "px-3 py-1.5 border rounded-sm transition-all text-[9px] font-headline tracking-[1px]",
                    filters.emotions.includes(emotion) ? "bg-white text-black border-white" : "border-[#111] text-[#555] hover:border-[#333]"
                  )}
                >
                  {emotion}
                </button>
              ))}
            </div>
          </div>

          {/* By Person */}
          <div className="space-y-6">
            <h3 className="font-headline text-[10px] text-[#333] tracking-[2px] uppercase">By Person</h3>
            <div className="grid gap-2">
              {["Sarah Jenkins", "Rahul Sharma", "Emily Chen", "Mark Wilson"].map(person => (
                <div key={person} className="flex items-center gap-3 p-2 group cursor-pointer">
                  <div className="w-8 h-8 rounded-full border border-[#111] bg-[#050505] flex items-center justify-center font-headline text-[10px] text-[#333] group-hover:border-[#333] transition-all">
                    {person.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="text-[13px] text-[#555] group-hover:text-white transition-colors">{person}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8 border-t border-[#111]">
          <button 
            onClick={() => setFilters({ personIds: [], emotions: [], sources: [] })}
            className="w-full py-4 border border-[#111] text-[11px] font-headline tracking-[2px] text-[#333] hover:text-white hover:border-[#333] transition-all"
          >
            RESET ALL
          </button>
        </div>
      </div>
    </aside>
  );
}
