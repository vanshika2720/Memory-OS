"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

const STEPS = 3;

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [isBuilding, setIsBuilding] = useState(false);
  const [memoryCount, setMemoryCount] = useState(0);
  const [statusText, setStatusText] = useState("Analyzing emails...");
  const router = useRouter();

  const nextStep = () => {
    if (step < STEPS) setStep(step + 1);
    else startBuilding();
  };

  const startBuilding = () => {
    setIsBuilding(true);
    // Simulate building vault
    const statuses = ["Analyzing emails...", "Extracting memories...", "Mapping your people...", "Syncing connections..."];
    let idx = 0;
    
    const statusInterval = setInterval(() => {
      if (idx < statuses.length - 1) {
        idx++;
        setStatusText(statuses[idx]);
      }
    }, 2000);

    const memoryInterval = setInterval(() => {
      setMemoryCount(prev => prev + Math.floor(Math.random() * 50) + 10);
    }, 100);

    setTimeout(() => {
      clearInterval(statusInterval);
      clearInterval(memoryInterval);
      router.push("/dashboard/timeline");
    }, 8000);
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      {/* Progress Indicator */}
      {!isBuilding && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 flex gap-2 w-full max-w-xs">
          {[...Array(STEPS)].map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "h-1 flex-1 border",
                step > i ? "border-white" : "border-[#111]"
              )}
            />
          ))}
        </div>
      )}

      <div className="w-full max-w-2xl space-y-12 text-center">
        {step === 1 && !isBuilding && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h1 className="font-headline text-[60px] md:text-[80px] leading-[0.9] tracking-[-2px] uppercase">
              What's your name?
            </h1>
            <Input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="YOUR NAME"
              className="text-center text-[24px] md:text-[32px] font-headline uppercase border-none focus:ring-0 placeholder:text-tertiary"
              autoFocus
            />
            <Button onClick={nextStep} disabled={!name} className="px-12">
              Continue —
            </Button>
          </div>
        )}

        {step === 2 && !isBuilding && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h1 className="font-headline text-[60px] md:text-[80px] leading-[0.9] tracking-[-2px] uppercase">
              Connect your life.
            </h1>
            
            <div className="space-y-2 border-y border-subtle divide-y divide-subtle">
              {["Gmail", "WhatsApp", "Calendar", "LinkedIn", "Twitter"].map((source) => (
                <div key={source} className="flex justify-between items-center py-6">
                  <span className="font-headline text-[18px] uppercase tracking-[1px]">{source}</span>
                  <div className="w-12 h-6 bg-[#1a1a1a] rounded-full relative cursor-pointer group">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-[#333] rounded-full group-hover:bg-[#444] transition-all" />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center gap-8">
              <button onClick={nextStep} className="font-headline text-[11px] uppercase tracking-[2px] text-tertiary hover:text-white transition-colors">
                Skip for now —
              </button>
              <Button onClick={nextStep}>
                Continue —
              </Button>
            </div>
          </div>
        )}

        {isBuilding && (
          <div className="space-y-12 animate-in fade-in zoom-in duration-1000">
            <h1 className="font-headline text-[60px] md:text-[80px] leading-[0.9] tracking-[-2px] uppercase">
              Building your vault.
            </h1>
            
            <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle 
                  cx="128" cy="128" r="120" 
                  fill="none" stroke="#111" strokeWidth="2" 
                />
                <circle 
                  cx="128" cy="128" r="120" 
                  fill="none" stroke="white" strokeWidth="2"
                  strokeDasharray="754"
                  className="animate-[progress_8s_ease-in-out_forwards]"
                />
              </svg>
              <div className="font-headline text-[60px] tabular-nums">
                {memoryCount}
              </div>
            </div>

            <p className="font-headline text-[14px] tracking-[2px] uppercase text-secondary animate-pulse">
              {statusText}
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes progress {
          from { stroke-dashoffset: 754; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </main>
  );
}
