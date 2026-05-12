"use client";

import React from "react";

export default function EmotionArcChart() {
  return (
    <div className="w-full h-full flex items-end gap-2 px-2">
      {[...Array(30)].map((_, i) => {
        const height = 30 + Math.sin(i / 5) * 40 + Math.random() * 20;
        return (
          <div 
            key={i}
            className="flex-1 bg-white/20 transition-all hover:bg-white cursor-pointer group relative"
            style={{ 
              height: `${height}%`,
            }}
          >
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-black px-2 py-1 text-[10px] font-headline opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
              DAY {i + 1} • {Math.round(height)}% POSITIVE
            </div>
          </div>
        );
      })}
    </div>
  );
}
