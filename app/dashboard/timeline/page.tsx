"use client";

import React, { useState, useEffect } from "react";
import { useStore } from "@/store";
import TimelineChart from "@/components/timeline/TimelineChart";
import DayDetail from "@/components/timeline/DayDetail";
import FilterSidebar from "@/components/timeline/FilterSidebar";
import MemorySearch from "@/components/timeline/MemorySearch";
import ThisDayLastYear from "@/components/timeline/ThisDayLastYear";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TimelinePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { selectedDate, setSelectedDate } = useStore();

  const monthLabel = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  return (
    <div className="flex h-[calc(100vh-70px)] ml-[220px] relative overflow-hidden">
      <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-12 space-y-16">
        {/* Global search bar top */}
        <MemorySearch />

        <div className="flex justify-between items-start">
          <div className="space-y-4">
            <h1 className="font-headline text-[70px] leading-[0.8] tracking-[-4px] uppercase mix-blend-difference">
              lIFE tIMELINE
            </h1>
            
            {/* Month selector */}
            <div className="flex items-center gap-6">
              <div className="flex gap-2">
                <button onClick={handlePrevMonth} className="p-2 border border-[#111] hover:text-white transition-colors">
                  <ChevronLeft size={16} />
                </button>
                <button onClick={handleNextMonth} className="p-2 border border-[#111] hover:text-white transition-colors">
                  <ChevronRight size={16} />
                </button>
              </div>
              <span className="font-headline text-[18px] tracking-[2px] uppercase">{monthLabel}</span>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <ThisDayLastYear />
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={cn(
                "flex items-center gap-3 px-4 py-2 border font-headline text-[11px] tracking-[2px] transition-all",
                isFilterOpen ? "bg-white text-black border-white" : "border-[#111] text-[#555] hover:text-white"
              )}
            >
              FILTER <Filter size={12} className={isFilterOpen ? "fill-black" : ""} />
            </button>
          </div>
        </div>

        {/* Memory density chart */}
        <div className="space-y-4">
          <TimelineChart date={currentDate} />
        </div>

        {/* Day detail panel (expands on bar click) */}
        {selectedDate && (
          <div className="animate-slide-up border-t border-[#111] pt-12">
            <DayDetail date={selectedDate} />
          </div>
        )}
      </div>

      {/* Filter sidebar (collapsible) */}
      <FilterSidebar isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
    </div>
  );
}
