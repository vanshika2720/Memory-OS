"use client";

import React from "react";
import { Bell, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useStore } from "@/store";

export default function TopBar() {
  const pathname = usePathname();
  const { setCommandPaletteOpen } = useStore();

  const getPageTitle = () => {
    const path = pathname.split("/").pop() || "dashboard";
    return path.toUpperCase();
  };

  return (
    <header className="h-[70px] border-b border-subtle bg-black/50 backdrop-blur-md sticky top-0 z-30 px-8 flex items-center justify-between ml-[220px]">
      {/* Page title left (Bebas Neue 18px) */}
      <div className="font-headline text-[18px] tracking-[2px] text-white">
        {getPageTitle()}
      </div>

      <div className="flex items-center gap-6">
        {/* Cmd+K search button (ghost, 11px, letter-spacing 2px) */}
        <button 
          onClick={() => setCommandPaletteOpen(true)}
          className="px-4 py-2 border border-[#111] text-[11px] font-headline uppercase tracking-[2px] text-[#555] hover:text-white hover:border-[#333] transition-all"
        >
          Search <span className="opacity-50 ml-2">⌘K</span>
        </button>

        {/* Notification bell (unread count badge) */}
        <button className="text-[#555] hover:text-white transition-colors relative">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full" />
        </button>
        
        {/* User menu */}
        <button className="w-8 h-8 rounded-full border border-[#111] flex items-center justify-center text-[#555] hover:text-white hover:border-[#333] transition-all">
          <User size={16} />
        </button>
      </div>
    </header>
  );
}
