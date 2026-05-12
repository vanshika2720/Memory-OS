"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PersonCardProps {
  id: string;
  name: string;
  role: string;
  health: number;
  lastMet: string;
  color: string;
}

export default function PersonCard({ id, name, role, health, lastMet, color }: PersonCardProps) {
  return (
    <Link 
      href={`/dashboard/people/${id}`}
      className="group block p-6 border border-subtle bg-[#050505] hover:border-white/20 transition-all"
    >
      <div className="flex justify-between items-start mb-6">
        <div 
          className="w-12 h-12 rounded-sm"
          style={{ backgroundColor: color }}
        />
        <div className="text-right">
          <span className="font-headline text-[10px] text-tertiary uppercase tracking-[1px]">Health</span>
          <div className="font-headline text-lg uppercase">{Math.round(health * 100)}%</div>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="font-headline text-2xl uppercase group-hover:text-white transition-colors">
          {name}
        </h3>
        <p className="text-[11px] font-headline uppercase tracking-[1px] text-tertiary">
          {role}
        </p>
      </div>

      <div className="mt-8 pt-6 border-t border-subtle flex justify-between items-center">
        <span className="text-[10px] font-headline text-tertiary uppercase tracking-[1px]">Last Interaction</span>
        <span className="text-[10px] font-headline text-white uppercase tracking-[1px]">{lastMet}</span>
      </div>
    </Link>
  );
}
