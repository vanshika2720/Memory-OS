"use client";

import React from "react";

export default function ThisDayLastYear() {
  return (
    <div className="p-4 border border-[#111] bg-[#050505] min-w-[240px] space-y-3">
      <div className="flex justify-between items-center border-b border-[#111] pb-2">
        <span className="font-headline text-[10px] text-white tracking-[2px] uppercase">1 YEAR AGO</span>
        <span className="font-body text-[9px] text-[#333] uppercase">May 12, 2023</span>
      </div>
      <div className="space-y-2">
        <p className="text-[12px] text-[#555] leading-relaxed line-clamp-2">
          "Finalized the seed round pitch deck. Everyone seems excited about the new direction."
        </p>
      </div>
    </div>
  );
}
