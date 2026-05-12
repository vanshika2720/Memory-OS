"use client";

import React from "react";
import EmotionArcChart from "@/components/insights/EmotionArcChart";
import PatternCards from "@/components/insights/PatternCards";
import WeeklyReviewCard from "@/components/insights/WeeklyReviewCard";

export default function InsightsPage() {
  return (
    <div className="p-8 md:p-12 ml-[220px] space-y-16 pb-24">
      <div>
        <h1 className="font-headline text-[80px] leading-[0.8] tracking-[-4px] uppercase text-white">
          iNSIGHTS.
        </h1>
        <p className="text-[#333] uppercase tracking-[2px] text-[11px] mt-4 font-headline">
          Weekly pattern reports and emotional arcs.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-24">
          {/* Emotion arc chart */}
          <section className="space-y-8">
            <h2 className="font-headline text-[14px] text-[#333] tracking-[4px] uppercase border-b border-[#111] pb-2">
              Emotion Arc (7 Days)
            </h2>
            <div className="h-[240px] w-full">
              <EmotionArcChart />
            </div>
          </section>
          
          {/* Detected patterns */}
          <section className="space-y-12">
            <h2 className="font-headline text-[14px] text-[#333] tracking-[4px] uppercase border-b border-[#111] pb-2">
              Detected Patterns
            </h2>
            <PatternCards />
          </section>
        </div>

        <div className="space-y-16">
          {/* Memory Wrapped Promo */}
          <div className="p-12 border border-white bg-white text-black space-y-8 animate-in zoom-in duration-500">
            <h2 className="font-headline text-[50px] leading-[0.8] tracking-[-2px] uppercase">
              Memory <br />Wrapped
            </h2>
            <p className="font-body text-[14px] leading-relaxed opacity-70">
              Your month in review is ready. See how your relationships evolved and what you achieved.
            </p>
            <button className="w-full py-4 bg-black text-white font-headline text-[11px] uppercase tracking-[2px] hover:tracking-[3px] transition-all">
              View Share Card —
            </button>
          </div>

          {/* Weekly review summary */}
          <WeeklyReviewCard />
        </div>
      </div>
    </div>
  );
}
