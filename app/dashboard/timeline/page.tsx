"use client";

import React from "react";
import TimelineChart from "@/components/timeline/TimelineChart";
import DayDetail from "@/components/timeline/DayDetail";

export default function TimelinePage() {
  return (
    <div className="p-8 ml-[220px] space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-headline text-[50px] md:text-[80px] leading-[0.9] tracking-[-2px] uppercase">
            Timeline
          </h1>
          <p className="text-secondary uppercase tracking-[2px] text-[11px] mt-2">
            Your life, mapped across time.
          </p>
        </div>
        
        <div className="flex gap-4">
          <div className="px-4 py-2 border border-subtle font-headline text-[11px] uppercase tracking-[1px]">
            May 2024
          </div>
        </div>
      </div>

      <div className="h-[300px] border border-subtle bg-[#050505] p-8">
        <TimelineChart />
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <DayDetail />
        </div>
        
        <div className="space-y-8">
          <div className="p-6 border border-subtle bg-[#050505] space-y-4">
            <span className="font-headline text-[11px] tracking-[2px] uppercase text-white">Quick Stats</span>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[10px] text-tertiary uppercase tracking-[1px]">Memories</span>
                <div className="font-headline text-2xl">1,284</div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-tertiary uppercase tracking-[1px]">Promises</span>
                <div className="font-headline text-2xl">12</div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-tertiary uppercase tracking-[1px]">People</span>
                <div className="font-headline text-2xl">45</div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-tertiary uppercase tracking-[1px]">Sentiment</span>
                <div className="font-headline text-2xl text-white">82%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
