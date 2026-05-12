"use client";

import React, { useState, useEffect } from "react";
import PromiseList from "@/components/promises/PromiseList";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PromisesPage() {
  const [filter, setFilter] = useState("All");
  const [stats, setStats] = useState({ total: 0, fulfilled: 0, broken: 0, weekly: 0 });

  useEffect(() => {
    // Count up animation
    const target = { total: 124, fulfilled: 98, broken: 4, weekly: 12 };
    let current = { total: 0, fulfilled: 0, broken: 0, weekly: 0 };
    const interval = setInterval(() => {
      let done = true;
      Object.keys(target).forEach(key => {
        const k = key as keyof typeof target;
        if (current[k] < target[k]) {
          current[k] += Math.ceil((target[k] - current[k]) / 5);
          done = false;
        }
      });
      setStats({ ...current });
      if (done) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 md:p-12 ml-[220px] space-y-16 pb-24">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-headline text-[80px] leading-[0.8] tracking-[-4px] uppercase text-white">
            pROMISES.
          </h1>
          <p className="text-[#333] uppercase tracking-[2px] text-[11px] mt-4 font-headline">
            Everything you said you'd do.
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 border border-white text-white font-headline text-[11px] tracking-[2px] uppercase hover:bg-white hover:text-black transition-all">
          <Plus size={14} /> NEW PROMISE
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-y border-[#111]">
        {[
          { label: "Total Made", value: stats.total },
          { label: "Fulfilled", value: stats.fulfilled },
          { label: "Broken", value: stats.broken },
          { label: "This Week", value: stats.weekly }
        ].map((s, i) => (
          <div key={s.label} className={cn("p-8 space-y-4", i > 0 && "md:border-l border-[#111]")}>
            <span className="font-headline text-[10px] text-[#333] tracking-[2px] uppercase">{s.label}</span>
            <div className="font-headline text-[56px] text-white leading-none">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-4">
        {["All", "Open", "Fulfilled", "Broken", "Overdue"].map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={cn(
              "px-6 py-2 border font-headline text-[11px] tracking-[2px] uppercase transition-all",
              filter === t ? "bg-white text-black border-white" : "border-[#111] text-[#333] hover:text-[#555]"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <PromiseList filter={filter} />
    </div>
  );
}
