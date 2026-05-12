"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";

export default function MemorySearch() {
  const [query, setQuery] = useState("");

  return (
    <div className="relative group">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#222] group-focus-within:text-white transition-colors" size={20} />
      <input 
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="SEARCH YOUR PAST…"
        className="w-full bg-transparent border border-[#111] rounded-none py-6 pl-14 pr-8 text-[18px] font-headline uppercase tracking-[2px] focus:outline-none focus:border-[#333] transition-all placeholder:text-[#111]"
      />
      {query && (
        <div className="absolute top-full left-0 right-0 mt-2 z-40 bg-black border border-[#111] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-8 text-center space-y-4">
            <span className="font-headline text-[11px] text-[#333] tracking-[2px] uppercase">
              Searching for "{query}"
            </span>
            <div className="flex justify-center gap-1">
              <div className="w-1 h-1 bg-white rounded-full animate-bounce" />
              <div className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
