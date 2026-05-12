"use client";

import React, { useState } from "react";
import { useStore } from "@/store";
import { cn } from "@/lib/utils";

const SOURCES = [
  { name: "GMAIL", count: 847, lastSync: "12 min ago", connected: true },
  { name: "WHATSAPP", count: 1242, lastSync: "2 hours ago", connected: true },
  { name: "CALENDAR", count: 156, lastSync: "Yesterday", connected: true },
  { name: "LINKEDIN", count: 0, lastSync: "Never", connected: false },
  { name: "TWITTER", count: 0, lastSync: "Never", connected: false },
];

export default function ConnectionsPage() {
  const [isIngesting, setIsIngesting] = useState(false);

  return (
    <div className="p-8 md:p-12 ml-[220px] space-y-16">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-headline text-[80px] leading-[0.8] tracking-[-4px] uppercase text-white">
            cONNECT.
          </h1>
          <p className="text-[#333] uppercase tracking-[2px] text-[11px] mt-4 font-headline">
            The sources of your life.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#111] border border-[#111]">
        {SOURCES.map((source) => (
          <div key={source.name} className="p-12 bg-black space-y-12 group hover:bg-[#050505] transition-all">
            <div className="flex justify-between items-start">
              <h2 className="font-headline text-[28px] tracking-[-1px] uppercase text-white group-hover:tracking-[1px] transition-all">
                {source.name}
              </h2>
              {source.connected && (
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-blink" />
                  <span className="font-headline text-[10px] text-white tracking-[1px]">LIVE</span>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-headline uppercase tracking-[2px] text-[#222]">
                {source.connected ? `CONNECTED — ${source.count} MEMORIES` : "NOT CONNECTED"}
              </span>
              <p className="text-[10px] text-[#111] font-headline uppercase tracking-[1px]">
                LAST SYNCED {source.lastSync}
              </p>
            </div>

            <button 
              onClick={() => source.connected ? setIsIngesting(true) : null}
              className={cn(
                "w-full py-4 font-headline text-[11px] tracking-[2px] uppercase transition-all",
                source.connected 
                  ? "border border-[#111] text-[#333] hover:text-white hover:border-[#333]" 
                  : "bg-white text-black hover:bg-opacity-90"
              )}
            >
              {source.connected ? "SYNC NOW —" : "CONNECT SOURCE —"}
            </button>
          </div>
        ))}
      </div>

      {/* Ingestion Overlay */}
      {isIngesting && (
        <div className="fixed inset-0 z-[100] bg-black animate-in fade-in duration-500 overflow-hidden flex flex-col">
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
            <h2 className="font-headline text-[20vw] leading-none uppercase">INGESTING</h2>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center space-y-12 relative z-10">
            <div className="space-y-2 text-center">
              <h3 className="font-headline text-[40px] text-[#333] uppercase">ingesting</h3>
              <h2 className="font-headline text-[80px] leading-[0.8] text-white uppercase">your life.</h2>
            </div>

            <div className="relative w-80 h-80 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle cx="160" cy="160" r="150" fill="none" stroke="#0a0a0a" strokeWidth="2" />
                <circle 
                  cx="160" cy="160" r="150" 
                  fill="none" stroke="white" strokeWidth="2" 
                  strokeDasharray="942" 
                  className="animate-[progress_10s_ease-in-out_forwards]"
                />
              </svg>
              <div className="text-center">
                <div className="font-headline text-[80px] text-white tabular-nums">847</div>
                <div className="font-headline text-[11px] text-[#333] tracking-[2px] uppercase">Memories</div>
              </div>
            </div>

            <div className="max-w-md w-full h-32 overflow-hidden relative">
              <div className="absolute bottom-0 left-0 right-0 space-y-2 animate-in slide-in-from-bottom-full duration-1000">
                {["Analyzing Gmail...", "Extracted 12 promises", "Identified Sarah Jenkins", "Syncing connections..."].map((log, i) => (
                  <div key={i} className="flex items-center gap-4 text-[#333] font-headline text-[11px] tracking-[1px] uppercase">
                    <span className="opacity-50">✉</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-12 border-t border-[#0a0a0a] flex justify-between items-center relative z-10">
            <div className="flex gap-12">
              <div className="space-y-1">
                <span className="text-[10px] text-[#222] font-headline uppercase tracking-[2px]">Processed</span>
                <div className="font-headline text-white">2,412 Emails</div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-[#222] font-headline uppercase tracking-[2px]">Identified</span>
                <div className="font-headline text-white">124 People</div>
              </div>
            </div>
            <button 
              onClick={() => setIsIngesting(false)}
              className="px-8 py-3 border border-[#111] text-[#333] font-headline text-[11px] tracking-[2px] uppercase hover:text-white hover:border-[#333] transition-all"
            >
              Cancel Sync
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes progress {
          from { stroke-dashoffset: 942; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}
