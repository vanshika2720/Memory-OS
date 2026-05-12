"use client";

import React from "react";

export default function VoiceSection() {
  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center bg-black px-6 py-24 overflow-hidden">
      <div className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center">
        <div className="absolute inset-0 bg-white/5 rounded-full blur-[100px] animate-pulse" />
        
        <div className="absolute inset-0 rounded-full border border-white/5 animate-[ping_3s_ease-out_infinite]" />
        <div className="absolute inset-4 rounded-full border border-white/10 animate-[ping_3s_ease-out_infinite_0.5s]" />
        <div className="absolute inset-8 rounded-full border border-white/15 animate-[ping_3s_ease-out_infinite_1s]" />
        
        <div className="w-full h-full rounded-full border border-white/10 flex items-center justify-center p-4">
          <div className="w-full h-full rounded-full border border-white/20 flex items-center justify-center p-4 animate-[spin_8s_linear_infinite]">
            <div className="w-full h-full rounded-full border border-white/30 flex items-center justify-center p-4 animate-[spin_6s_linear_infinite_reverse]">
              <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_30px_rgba(255,255,255,0.8)]" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative z-10 text-center mt-12 space-y-4">
        <h2 className="font-headline text-[50px] md:text-[90px] leading-[0.9] tracking-[-2px] uppercase">
          Ask your past.<br />Out loud.
        </h2>
        <p className="max-w-md mx-auto text-secondary text-[16px]">
          Talk to your memory vault like a lifelong friend. No keywords, no folders. Just natural language.
        </p>
      </div>
    </section>
  );
}
