"use client";

import React from "react";
import { cn } from "@/lib/utils";

const APPS = [
  { name: "Gmail", icon: "✉️" },
  { name: "WhatsApp", icon: "💬" },
  { name: "LinkedIn", icon: "🔗" },
  { name: "Twitter", icon: "🐦" },
  { name: "Calendar", icon: "📅" },
  { name: "Slack", icon: "🚀" },
  { name: "Notion", icon: "📝" },
  { name: "iMessage", icon: "📱" },
  { name: "Voice", icon: "🎙️" },
  { name: "Photos", icon: "🖼️" },
  { name: "Docs", icon: "📄" },
  { name: "Coming soon", icon: "✨" },
];

export default function AppsSection() {
  return (
    <section className="bg-black border-t border-subtle">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-l border-subtle">
        {APPS.map((app, i) => (
          <div 
            key={app.name}
            className="group relative h-48 border-r border-b border-subtle flex flex-col items-center justify-center gap-4 transition-colors hover:bg-[#050505] overflow-hidden"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,255,255,0.05)_0%,transparent_70%)]" />
            
            <span className="text-3xl grayscale group-hover:grayscale-0 transition-all duration-500">
              {app.icon}
            </span>
            <span className="font-headline text-[11px] tracking-[2px] uppercase text-tertiary group-hover:text-white transition-colors">
              {app.name}
            </span>
          </div>
        ))}
      </div>
      
      <div className="px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-subtle rounded-sm mb-8">
          <div className="w-2 h-2 bg-white rounded-full" />
          <span className="font-headline text-[10px] tracking-[1px] uppercase">Enterprise grade security</span>
        </div>
        <h3 className="font-headline text-[40px] md:text-[60px] leading-[0.9] tracking-[-1px] uppercase mb-6">
          Every source. One vault.
        </h3>
        <p className="max-w-xl mx-auto text-secondary text-[16px]">
          We don't just import data. We extract meaning, emotion, and connection from every interaction you've ever had.
        </p>
      </div>
    </section>
  );
}
