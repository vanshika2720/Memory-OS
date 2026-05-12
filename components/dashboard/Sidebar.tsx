"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useStore } from "@/store";

const NAV_ITEMS = [
  { name: "TIMELINE", href: "/dashboard/timeline" },
  { name: "ASK", href: "/dashboard/ask" },
  { name: "PEOPLE", href: "/dashboard/people" },
  { name: "INSIGHTS", href: "/dashboard/insights" },
  { name: "PROMISES", href: "/dashboard/promises" },
  { name: "SETTINGS", href: "/dashboard/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useStore();

  return (
    <aside className="w-[220px] h-screen fixed left-0 top-0 border-r border-subtle bg-black flex flex-col z-40">
      {/* Top: MO logo */}
      <div className="p-8">
        <Link 
          href="/dashboard" 
          className="font-headline text-[14px] tracking-[4px] text-white hover:opacity-70 transition-opacity"
        >
          MO
        </Link>
      </div>

      {/* Nav items */}
      <nav className="flex-1 flex flex-col pt-4">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-8 py-4 text-[11px] font-headline uppercase tracking-[2px] transition-all border-l-2",
                isActive 
                  ? "text-white border-white bg-white/5" 
                  : "text-[#222] border-transparent hover:text-[#555]"
              )}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: User avatar + name + plan badge */}
      <div className="p-8 border-t border-subtle space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-[#111] flex items-center justify-center font-headline text-[12px] text-white">
            {user?.name?.substring(0, 2).toUpperCase() || "JD"}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[12px] font-body text-white truncate">
              {user?.name || "User Name"}
            </span>
            <span className="text-[10px] font-headline text-[#333] uppercase tracking-[1px]">
              {user?.planTier || "FREE"} PLAN
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
