"use client";

import React from "react";

const APPS = [
  "Gmail", "WhatsApp", "LinkedIn", "Twitter", "Calendar", 
  "Slack", "Notion", "iMessage", "Voice", "Photos", "Docs",
  "Zoom", "Discord", "Telegram", "Spotify", "Apple Health"
];

export default function Marquee() {
  return (
    <div className="w-full overflow-hidden border-y border-subtle bg-black py-8">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-20 px-10 items-center">
            {APPS.map((app) => (
              <span 
                key={app} 
                className="font-headline text-[32px] md:text-[60px] text-tertiary hover:text-white transition-colors cursor-default uppercase"
              >
                {app}
              </span>
            ))}
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
