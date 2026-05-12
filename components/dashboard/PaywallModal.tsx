"use client";

import React from "react";
import { CircleIcon } from "@/components/ui/CircleIcon";

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  memoryPreview?: string;
}

export default function PaywallModal({ isOpen, onClose, onUpgrade, memoryPreview }: PaywallModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative z-10 max-w-lg w-full mx-4">
        <div className="text-center space-y-8">
          <h1 className="font-headline text-[80px] leading-[0.8] tracking-[-4px] text-white">
            That memory almost disappeared.
          </h1>
          
          {memoryPreview && (
            <div className="p-6 border border-[#111] bg-[#050505]">
              <p className="text-[#444] text-[14px] font-body leading-relaxed filter blur-[8px] select-none">
                {memoryPreview}
              </p>
            </div>
          )}
          
          <p className="text-[#444] text-[14px] font-body">
            You&apos;ve captured 100 memories. Upgrade to save this one.
          </p>
          
          <div className="flex flex-col gap-4">
            <button
              onClick={onUpgrade}
              className="w-full py-4 bg-white text-black font-headline text-[11px] tracking-[2px] uppercase hover:bg-[#e0e0e0] transition-all flex items-center justify-center gap-2"
            >
              Upgrade <CircleIcon className="w-3 h-3" /> $19/month
            </button>
            <button
              onClick={onClose}
              className="w-full py-4 border border-[#333] text-[#444] font-headline text-[11px] tracking-[2px] uppercase hover:border-white hover:text-white transition-all"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
