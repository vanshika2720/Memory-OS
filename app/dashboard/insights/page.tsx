"use client";

import React from "react";
import EmotionArcChart from "@/components/insights/EmotionArcChart";
import PatternCards from "@/components/insights/PatternCards";

export default function InsightsPage() {
  return (
    <div className="p-8 ml-[220px] space-y-12 pb-24">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-headline text-[50px] md:text-[80px] leading-[0.9] tracking-[-2px] uppercase">
            Insights
          </h1>
          <p className="text-secondary uppercase tracking-[2px] text-[11px] mt-2">
            Weekly pattern reports and emotional arcs.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <div className="p-8 border border-subtle bg-[#050505] space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="font-headline text-2xl uppercase tracking-[1px]">Emotion Arc</h2>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full" />
                  <span className="text-[10px] font-headline uppercase text-tertiary">Positive</span>
                </div>
              </div>
            </div>
            <div className="h-[300px]">
              <EmotionArcChart />
            </div>
          </div>
          
          <div className="space-y-8">
            <h2 className="font-headline text-3xl uppercase tracking-[1px]">Life Patterns</h2>
            <PatternCards />
          </div>
        </div>

        <div className="space-y-8">
          <div className="p-8 border border-white bg-white text-black space-y-6">
            <h2 className="font-headline text-[40px] leading-[0.9] tracking-[-1px] uppercase">
              Memory Wrapped
            </h2>
            <p className="font-body text-[14px] leading-relaxed">
              Your month in review is ready. See how your relationships evolved and what you achieved.
            </p>
            <button className="w-full py-4 bg-black text-white font-headline text-[11px] uppercase tracking-[2px]">
              View Share Card —
            </button>
          </div>

          <div className="p-8 border border-subtle bg-[#050505] space-y-6">
            <span className="font-headline text-[11px] tracking-[2px] uppercase text-tertiary">Weekly Review</span>
            <div className="space-y-4">
              <h3 className="font-headline text-xl uppercase">Promise Audit</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-[12px]">
                  <span className="text-secondary">Kept</span>
                  <span className="text-white">8/12</span>
                </div>
                <div className="w-full h-[2px] bg-[#111]">
                  <div className="h-full bg-white w-[66%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
