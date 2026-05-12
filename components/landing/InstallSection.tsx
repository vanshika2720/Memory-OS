"use client";

import React from "react";
import { Button } from "@/components/ui/Button";

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
            <Button variant="ghost" className="justify-start px-8 py-6 group">
              <span className="mr-4 text-xl group-hover:scale-110 transition-transform"></span>
              Download for iOS
            </Button>
            <Button variant="ghost" className="justify-start px-8 py-6 group">
              <span className="mr-4 text-xl group-hover:scale-110 transition-transform">🤖</span>
              Download for Android
            </Button>
            <Button variant="ghost" className="justify-start px-8 py-6 group">
              <span className="mr-4 text-xl group-hover:scale-110 transition-transform">💻</span>
              Desktop Companion
            </Button>
          </div>
        </div>
        
        <div className="relative">
          {/* Phone Mockup */}
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
          
          {/* Decorative Elements */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
