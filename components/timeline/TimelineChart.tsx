"use client";

import React from "react";

export default function TimelineChart() {
  return (
    <div className="w-full h-full flex items-end gap-1">
      {[...Array(60)].map((_, i) => {
        const height = 20 + Math.random() * 80;
        const opacity = 0.1 + Math.random() * 0.9;
        return (
          <div 
            key={i}
            className="flex-1 bg-white transition-all hover:bg-white cursor-pointer group relative"
            style={{ 
              height: `${height}%`,
              opacity: opacity
            }}
          >
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-black px-2 py-1 text-[10px] font-headline opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
              MAY {i + 1} • {Math.floor(height / 2)} MEMORIES
            </div>
          </div>
        );
      })}
    </div>
  );
}
