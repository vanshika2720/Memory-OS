"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface PersonCardProps {
  id: string;
  name: string;
  role: string;
  health: number;
  interactions: number;
  lastTalked: string;
  color: string;
}

export default function PersonCard({ id, name, role, health, interactions, lastTalked, color }: PersonCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <Link 
      href={`/dashboard/people/${id}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(700px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: 'transform 0.1s ease-out'
      }}
      className="group block p-8 border-r border-b border-[#111] bg-black hover:bg-[#050505] transition-all relative overflow-hidden"
    >
      <div className="flex justify-between items-start mb-12">
        <div className="w-10 h-10 rounded-full border border-[#111] flex items-center justify-center font-headline text-[14px] text-[#333] bg-[#050505]">
          {initials}
        </div>
        <div className="text-right">
          <span className="font-headline text-[10px] text-[#222] uppercase tracking-[2px]">Health</span>
          <div className="w-20 h-[1px] bg-[#0f0f0f] mt-1">
            <div className="h-full bg-white opacity-20" style={{ width: `${health * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-headline text-2xl uppercase text-white group-hover:tracking-[1px] transition-all">
          {name}
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-headline uppercase tracking-[2px] text-[#222]">
            {role}
          </span>
          <div className="w-1 h-1 bg-[#111] rounded-full" />
          <span className="text-[10px] font-headline uppercase tracking-[2px] text-[#222]">
            {interactions} Interactions
          </span>
        </div>
      </div>

      <div className="mt-8 flex justify-between items-end">
        <span className="text-[11px] text-[#333] italic font-body">
          Last talked {lastTalked}
        </span>
        <ArrowUpRight 
          size={18} 
          className="text-[#1a1a1a] group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" 
        />
      </div>
    </Link>
  );
}
