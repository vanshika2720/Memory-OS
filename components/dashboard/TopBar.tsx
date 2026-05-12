"use client";

import React from "react";
import { Search, Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function TopBar() {
  return (
    <header className="h-[70px] border-b border-subtle bg-black/50 backdrop-blur-md sticky top-0 z-30 px-8 flex items-center justify-between ml-[220px]">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-tertiary" size={16} />
          <input 
            type="text"
            placeholder="Search your memories (Cmd+K)"
            className="w-full bg-[#050505] border border-subtle rounded-none py-2 pl-10 pr-4 text-[13px] focus:outline-none focus:border-white/20 transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="text-tertiary hover:text-white transition-colors relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full" />
        </button>
        
        <div className="h-8 w-[1px] bg-subtle" />
        
        <Button className="h-10 px-6">
          <Plus size={16} className="mr-2" />
          Add Memory
        </Button>
      </div>
    </header>
  );
}
