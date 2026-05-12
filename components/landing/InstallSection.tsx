"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { CircleIcon } from "@/components/ui/CircleIcon";

function AppleLogo() {
  return (
    <svg width="22" height="26" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.5 14C18.4 10.5 21 8.5 21 8.5C19.5 6.5 17 6 16 6C13.5 6 12 7 11 7C10 7 8.5 6 6.5 6C4.5 6 2 7.5 1 10C0 13 0.5 16 2 19C3 21 4.5 23 6 23C7 23 7.5 22.5 8.5 22.5C9.5 22.5 10 23 11 23C12 23 13.5 21.5 14.5 20C15.5 18.5 16 17 16 17C16 17 13.5 15.5 13.5 13C13.5 11 15 10 15 10C14 9 13 8.5 12 8.5C11 8.5 10 9 9.5 9.5C9 10 8.5 10.5 8.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 1C8 1.5 9 2.5 9 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function AndroidIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 10V17M19 10V17M3 17H21M8 10C8 7 10 5 12 5C14 5 16 7 16 10M8 17V20M16 17V20M12 10V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="9" cy="7" r="1" fill="currentColor" />
      <circle cx="15" cy="7" r="1" fill="currentColor" />
    </svg>
  );
}

function DesktopIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="3" width="20" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <line x1="12" y1="16" x2="12" y2="21" stroke="currentColor" strokeWidth="1.5" />
      <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function InstallSection() {
  return (
    <section className="bg-black py-24 px-6 border-t border-subtle">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-center">
        <div className="space-y-12">
          <h2 className="font-headline text-[50px] md:text-[90px] leading-[0.9] tracking-[-2px] uppercase">
            Always with you.
          </h2>
          <p className="text-secondary text-[18px] max-w-md">
            The MemoryOS app lives in your pocket, silently indexing your world. Access it via voice, chat, or a beautiful life timeline.
          </p>

          <div className="flex flex-col gap-4">
            <Button variant="ghost" className="justify-between px-8 py-6 group">
              <div className="flex items-center gap-4">
                <span className="text-white/60 group-hover:text-white transition-colors">
                  <AppleLogo />
                </span>
                Download for iOS
              </div>
              <CircleIcon className="w-3 h-3 text-tertiary group-hover:text-white transition-colors" />
            </Button>
            <Button variant="ghost" className="justify-between px-8 py-6 group">
              <div className="flex items-center gap-4">
                <span className="text-white/60 group-hover:text-white transition-colors">
                  <AndroidIcon />
                </span>
                Download for Android
              </div>
              <CircleIcon className="w-3 h-3 text-tertiary group-hover:text-white transition-colors" />
            </Button>
            <Button variant="ghost" className="justify-between px-8 py-6 group">
              <div className="flex items-center gap-4">
                <span className="text-white/60 group-hover:text-white transition-colors">
                  <DesktopIcon />
                </span>
                Desktop Companion
              </div>
              <CircleIcon className="w-3 h-3 text-tertiary group-hover:text-white transition-colors" />
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="relative w-full aspect-[9/16] max-w-[400px] mx-auto border-[12px] border-[#111] rounded-[40px] overflow-hidden bg-black shadow-2xl">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#111] rounded-b-2xl z-20" />

            <div className="p-8 space-y-8">
              <div className="flex justify-between items-center">
                <div className="w-10 h-10 rounded-full bg-white/10" />
                <div className="w-10 h-10 rounded-full bg-white/10" />
              </div>

              <div className="space-y-4">
                <div className="w-2/3 h-4 bg-white/20 rounded-sm" />
                <div className="w-full h-32 bg-white/5 border border-white/10 rounded-sm" />
                <div className="w-full h-32 bg-white/5 border border-white/10 rounded-sm" />
                <div className="w-full h-32 bg-white/5 border border-white/10 rounded-sm" />
              </div>
            </div>
          </div>

          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
