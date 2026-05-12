"use client";

import React, { useState, useEffect } from "react";
import { X, Clock, MessageSquare, Zap } from "lucide-react";

export default function MeetingBriefModal() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simulate detecting an upcoming meeting
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 w-[360px] bg-black border border-white z-[60] animate-slide-up shadow-[0_0_50px_rgba(255,255,255,0.1)]">
      <div className="p-6 space-y-8">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center font-headline text-[14px] text-white">
              SJ
            </div>
            <div>
              <h3 className="font-headline text-[16px] text-white uppercase tracking-[1px]">Sarah Jenkins</h3>
              <div className="flex items-center gap-2 text-[#333]">
                <Clock size={12} />
                <span className="font-headline text-[10px] uppercase tracking-[1px]">Meeting in 12 min</span>
              </div>
            </div>
          </div>
          <button onClick={() => setIsVisible(false)} className="text-[#333] hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#333]">
              <MessageSquare size={12} />
              <span className="font-headline text-[10px] uppercase tracking-[2px]">Last Interaction</span>
            </div>
            <p className="text-[13px] text-[#ccc] leading-relaxed">
              Discussed her new studio space in Brooklyn. She was looking for a photographer.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#333]">
              <Clock size={12} />
              <span className="font-headline text-[10px] uppercase tracking-[2px]">Open Promise</span>
            </div>
            <p className="text-[13px] text-[#ccc] leading-relaxed">
              You promised to send Mark's contact details.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white">
              <Zap size={12} className="fill-white" />
              <span className="font-headline text-[10px] uppercase tracking-[2px]">Talking Point</span>
            </div>
            <p className="text-[13px] text-white leading-relaxed italic">
              "Ask her if she's finalized the lease for the Brooklyn space yet."
            </p>
          </div>
        </div>

        <button className="w-full py-3 bg-white text-black font-headline text-[11px] uppercase tracking-[2px]">
          Open Full Profile —
        </button>
      </div>
    </div>
  );
}
