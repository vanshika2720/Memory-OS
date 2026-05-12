"use client";

import React from "react";
import { useStore } from "@/store";
import { CircleIcon } from "@/components/ui/CircleIcon";

export default function BillingPage() {
  const { user } = useStore();
  const planTier = user?.planTier || "FREE";
  const memoriesUsed = 47;
  const memoriesLimit = planTier === "FREE" ? 100 : planTier === "PERSONAL" ? 1000 : 10000;
  const memoryPercent = (memoriesUsed / memoriesLimit) * 100;

  return (
    <div className="p-8 md:p-12 space-y-16">
      <div>
        <h1 className="font-headline text-[80px] leading-[0.8] tracking-[-4px] uppercase text-white">
          bILLING.
        </h1>
        <p className="text-[#444] uppercase tracking-[2px] text-[11px] mt-4 font-headline">
          Subscription and usage.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        <div className="space-y-12">
          <div className="p-12 border border-[#111] bg-[#050505] space-y-8">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <span className="font-headline text-[10px] text-[#444] tracking-[2px] uppercase">Current Plan</span>
                <h2 className="font-headline text-[28px] leading-none uppercase text-white">
                  {planTier}
                </h2>
              </div>
              <div className="text-right space-y-1">
                <div className="font-headline text-[24px] text-white">
                  {planTier === "FREE" ? "$0" : planTier === "PERSONAL" ? "$19" : "$49"}
                </div>
                <div className="font-headline text-[10px] text-[#444] uppercase tracking-[1px]">Per Month</div>
              </div>
            </div>

            <div className="pt-8 border-t border-[#111] space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-headline text-[#444] uppercase tracking-[1px]">
                  {memoriesUsed} / {memoriesLimit} Memories
                </span>
                <span className="text-[11px] font-headline text-white uppercase tracking-[1px]">
                  {memoryPercent.toFixed(1)}%
                </span>
              </div>
              <div className="w-full h-[1px] bg-[#0f0f0f]">
                <div className="h-full bg-[#1a1a1a] w-1/5" />
              </div>
            </div>

            <div className="pt-8 border-t border-[#111] space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-headline text-[#444] uppercase tracking-[1px]">Next Invoice</span>
                <span className="text-[11px] font-headline text-white uppercase tracking-[1px]">Jun 12, 2026</span>
              </div>
              <div className="w-full h-[1px] bg-[#0f0f0f]">
                <div className="h-full bg-[#1a1a1a] w-1/3" />
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 py-3 border border-white text-white font-headline text-[11px] tracking-[2px] uppercase hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2">
                Upgrade <CircleIcon className="w-3 h-3" />
              </button>
              <button className="flex-1 py-3 border border-[#333] text-[#444] font-headline text-[11px] tracking-[2px] uppercase hover:border-white hover:text-white transition-all flex items-center justify-center gap-2">
                Downgrade <CircleIcon className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="p-8 border border-[#111] space-y-6">
            <h3 className="font-headline text-[14px] text-[#444] tracking-[4px] uppercase">Payment Method</h3>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 border border-[#111] flex items-center justify-center font-headline text-[10px] text-[#444]">VISA</div>
                <span className="text-[13px] text-[#ccc] font-body">•••• 4242</span>
              </div>
              <button className="text-[11px] font-headline text-[#444] uppercase tracking-[2px] hover:text-white transition-colors">
                Update
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <h3 className="font-headline text-[14px] text-[#444] tracking-[4px] uppercase border-b border-[#111] pb-2">History</h3>
          <div className="divide-y divide-[#111]">
            {[
              { date: "May 12, 2026", desc: "Subscription Payment", amount: "$0.00" },
              { date: "Apr 12, 2026", desc: "Subscription Payment", amount: "$0.00" },
              { date: "Mar 12, 2026", desc: "Subscription Payment", amount: "$0.00" },
            ].map((item, i) => (
              <div key={i} className="py-6 flex justify-between items-center group cursor-pointer">
                <div className="space-y-1">
                  <div className="font-body text-[13px] text-white">{item.desc}</div>
                  <div className="font-headline text-[10px] text-[#444] uppercase tracking-[1px]">{item.date}</div>
                </div>
                <div className="flex items-center gap-8">
                  <span className="font-headline text-[14px] text-white">{item.amount}</span>
                  <button className="text-[#111] group-hover:text-white transition-colors uppercase font-headline text-[10px] tracking-[1px] flex items-center gap-2">
                    Receipt <CircleIcon className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
