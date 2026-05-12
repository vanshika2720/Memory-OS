"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  Clock, 
  MessageSquare, 
  Users, 
  Zap, 
  CheckSquare, 
  Settings, 
  Plus
} from "lucide-react";

const NAV_ITEMS = [
  { name: "Timeline", href: "/dashboard/timeline", icon: Clock },
  { name: "Ask AI", href: "/dashboard/ask", icon: MessageSquare },
  { name: "People", href: "/dashboard/people", icon: Users },
  { name: "Insights", href: "/dashboard/insights", icon: Zap },
  { name: "Promises", href: "/dashboard/promises", icon: CheckSquare },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[220px] h-screen fixed left-0 top-0 border-r border-subtle bg-black flex flex-col z-40">
      <div className="p-6">
        <Link href="/dashboard/timeline" className="font-headline text-xl tracking-tighter">
          MEMORYOS
        </Link>
      </div>

      <div className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-[13px] font-headline uppercase tracking-[1px] transition-colors",
                isActive ? "text-white bg-white/5" : "text-tertiary hover:text-secondary hover:bg-white/5"
              )}
            >
              <item.icon size={16} className={isActive ? "text-white" : "text-tertiary"} />
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="p-3 border-t border-subtle space-y-1">
        <Link
          href="/dashboard/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2 text-[13px] font-headline uppercase tracking-[1px] transition-colors",
            pathname.startsWith("/dashboard/settings") ? "text-white bg-white/5" : "text-tertiary hover:text-secondary hover:bg-white/5"
          )}
        >
          <Settings size={16} />
          Settings
        </Link>
        
        <div className="mt-4 p-3 bg-[#050505] border border-subtle">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-headline text-tertiary uppercase tracking-[1px]">Storage</span>
            <span className="text-[10px] font-headline text-white uppercase">82%</span>
          </div>
          <div className="w-full h-[2px] bg-[#111]">
            <div className="h-full bg-white w-[82%]" />
          </div>
        </div>
      </div>
    </aside>
  );
}
