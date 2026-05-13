"use client";

import React, { useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import CommandPalette from "@/components/dashboard/CommandPalette";
import { useStore } from "@/store";
import { useSession } from "next-auth/react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { commandPaletteOpen, setCommandPaletteOpen, setUser } = useStore();
  const { data: session } = useSession();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  useEffect(() => {
    const loadUser = async () => {
      if (!session?.user) return;
      try {
        const res = await fetch("/api/user/me");
        if (!res.ok) return;
        const data = await res.json();
        setUser({
          id: data.id,
          name: data.name,
          email: data.email,
          planTier: data.planTier,
          onboardingDone: data.onboardingDone,
        });
      } catch {
        // Ignore: sidebar will just show fallback name/plan.
      }
    };
    loadUser();
  }, [session?.user, setUser]);

  return (
    <div className="flex min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
      <CommandPalette />
    </div>
  );
}
