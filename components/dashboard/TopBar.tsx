"use client";

import React, { useEffect, useRef, useState } from "react";
import { Bell, LogOut, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useStore } from "@/store";
import { signOut, useSession } from "next-auth/react";

export default function TopBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { setCommandPaletteOpen } = useStore();
  const { data: session } = useSession();

  const [menuOpen, setMenuOpen] = useState(false);
  const [bioPreview, setBioPreview] = useState<string | null>(null);
  const [namePreview, setNamePreview] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocMouseDown = (e: MouseEvent) => {
      if (!menuOpen) return;
      const target = e.target as Node;
      if (menuRef.current && !menuRef.current.contains(target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    if (!session?.user) return;

    const load = async () => {
      try {
        const res = await fetch("/api/user/me");
        if (!res.ok) return;
        const data = await res.json();
        setNamePreview(data.name || null);
        setBioPreview(typeof data.bio === "string" ? data.bio : null);
      } catch {
        // ignore
      }
    };

    load();
  }, [menuOpen, session?.user]);

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
        <div ref={menuRef} className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="w-8 h-8 rounded-full border border-[#111] flex items-center justify-center text-[#555] hover:text-white hover:border-[#333] transition-all"
            aria-label="User menu"
          >
            <User size={16} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-[280px] border border-[#111] bg-black/95 backdrop-blur-md shadow-xl rounded-lg overflow-hidden">
              <div className="p-4 space-y-2 border-b border-subtle">
                <div className="font-headline text-[14px] text-white">
                  {namePreview || session?.user ? "Profile" : "Not signed in"}
                </div>
                <div className="text-[12px] text-[#555] leading-relaxed break-words">
                  {bioPreview ? (bioPreview.length > 120 ? `${bioPreview.slice(0, 120)}…` : bioPreview) : "No bio yet."}
                </div>
              </div>

              <div className="p-2 flex flex-col gap-1">
                <button
                  className="w-full text-left px-3 py-2 text-[12px] text-white hover:bg-white/5 transition-colors"
                  onClick={() => {
                    setMenuOpen(false);
                    router.push("/dashboard/profile");
                  }}
                >
                  Profile
                </button>

                <button
                  className="w-full text-left px-3 py-2 text-[12px] text-white hover:bg-white/5 transition-colors flex items-center gap-2"
                  onClick={() => {
                    setMenuOpen(false);
                    router.push("/dashboard/profile");
                  }}
                >
                  Set password
                </button>

                <button
                  className="w-full text-left px-3 py-2 text-[12px] text-[#aaa] hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
