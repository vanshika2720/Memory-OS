"use client";

import React from "react";
import { useStore } from "@/store";
import { cn } from "@/lib/utils";

export default function BillingPage() {
  const { user } = useStore();

  return (
    <div className="p-8 md:p-12 ml-[220px] space-y-16">
      <div>
        <h1 className="font-headline text-[80px] leading-[0.8] tracking-[-4px] uppercase text-white">
          bILLING.
        </h1>
        <p className="text-[#333] uppercase tracking-[2px] text-[11px] mt-4 font-headline">
          Subscription and usage.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        <div className="space-y-12">
          {/* Current plan badge */}
          <div className="p-12 border border-[#111] bg-[#050505] space-y-8">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <span className="font-headline text-[10px] text-[#333] tracking-[2px] uppercase">Current Plan</span>
                <h2 className="font-headline text-[40px] leading-none uppercase text-white">
                  {user?.planTier || "FREE"}
                </h2>
              </div>
              <div className="text-right space-y-1">
                <div className="font-headline text-[24px] text-white">$0</div>
                <div className="font-headline text-[10px] text-[#333] uppercase tracking-[1px]">Per Month</div>
              </div>
            </div>

            <div className="pt-8 border-t border-[#111] space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-headline text-[#333] uppercase tracking-[1px]">Usage: 124 / 500 Memories</span>
                <span className="text-[11px] font-headline text-white uppercase tracking-[1px]">24.8%</span>
              </div>
              <div className="w-full h-[2px] bg-[#0f0f0f]">
                <div className="h-full bg-white opacity-20 w-[24.8%]" />
              </div>
            </div>

            <button className="w-full py-4 bg-white text-black font-headline text-[11px] tracking-[2px] uppercase hover:bg-opacity-90 transition-all">
              Upgrade to Personal —
            </button>
          </div>

          {/* Payment Method */}
          <div className="p-8 border border-[#111] space-y-6">
            <h3 className="font-headline text-[14px] text-[#333] tracking-[4px] uppercase">Payment Method</h3>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 border border-[#111] rounded-sm flex items-center justify-center font-headline text-[10px] text-[#333]">VISA</div>
                <span className="text-[13px] text-[#ccc] font-body">•••• 4242</span>
              </div>
              <button className="text-[11px] font-headline text-[#333] uppercase tracking-[2px] hover:text-white transition-colors">
                Update
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <h3 className="font-headline text-[14px] text-[#333] tracking-[4px] uppercase border-b border-[#111] pb-2">History</h3>
          <div className="divide-y divide-[#111]">
            {[1, 2, 3].map(i => (
              <div key={i} className="py-6 flex justify-between items-center group cursor-pointer">
                <div className="space-y-1">
                  <div className="font-body text-[13px] text-white">Subscription Payment</div>
                  <div className="font-headline text-[10px] text-[#333] uppercase tracking-[1px]">May 12, 2024</div>
                </div>
                <div className="flex items-center gap-8">
                  <span className="font-headline text-[14px] text-white">$0.00</span>
                  <button className="text-[#111] group-hover:text-white transition-colors uppercase font-headline text-[10px] tracking-[1px]">Receipt ↗</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
