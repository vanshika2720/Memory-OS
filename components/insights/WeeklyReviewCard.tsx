"use client";

import React from "react";

export default function WeeklyReviewCard() {
  return (
    <div className="p-8 border border-[#111] bg-[#050505] space-y-12">
      <div className="space-y-4">
        <h2 className="font-headline text-[28px] tracking-[-1px] uppercase text-white leading-[0.9]">
          WEEK OF <br />MAY 12
        </h2>
        <p className="font-body text-[13px] text-[#444] leading-relaxed">
          A high-productivity week focused on architecture, though social connections dipped slightly mid-week.
        </p>
      </div>

      <div className="space-y-8">
        {/* Emotion breakdown */}
        <div className="space-y-4">
          <span className="font-headline text-[10px] text-[#222] uppercase tracking-[2px]">Emotion Breakdown</span>
          <div className="flex justify-between items-center px-1">
            {[0.8, 0.4, 0.9, 0.7, 0.5, 0.6, 0.8].map((v, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ opacity: v, backgroundColor: 'white' }} 
                />
                <span className="text-[8px] font-headline text-[#111]">{['M','T','W','T','F','S','S'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top people */}
        <div className="space-y-4">
          <span className="font-headline text-[10px] text-[#222] uppercase tracking-[2px]">Top People</span>
          <div className="flex -space-x-2">
            {['SJ', 'RS', 'EC'].map((init, i) => (
              <div key={i} className="w-8 h-8 rounded-full border border-black bg-[#111] flex items-center justify-center font-headline text-[10px] text-white">
                {init}
              </div>
            ))}
            <div className="pl-6 flex flex-col justify-center">
              <span className="text-[10px] text-white font-headline uppercase tracking-[1px]">18 Interactions</span>
            </div>
          </div>
        </div>

        {/* Promises */}
        <div className="space-y-4">
          <span className="font-headline text-[10px] text-[#222] uppercase tracking-[2px]">Promises</span>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <span className="text-[10px] text-white font-headline">12</span>
              <span className="text-[8px] text-[#333] font-headline uppercase block">Made</span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-white font-headline">8</span>
              <span className="text-[8px] text-[#333] font-headline uppercase block">Kept</span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-white font-headline">0</span>
              <span className="text-[8px] text-[#333] font-headline uppercase block">Broken</span>
            </div>
          </div>
        </div>

        {/* Mirror insight */}
        <div className="space-y-4 border-t border-[#111] pt-8">
          <span className="font-headline text-[10px] text-[#222] uppercase tracking-[2px]">Mirror Insight</span>
          <p className="font-body text-[14px] text-[#555] italic leading-relaxed">
            "You often use technical discussions as a shield to avoid addressing emotional friction with Sarah."
          </p>
        </div>
      </div>
    </div>
  );
}
