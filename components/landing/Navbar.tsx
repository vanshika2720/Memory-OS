"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export default function Navbar({ onAuthClick }: { onAuthClick: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-6 md:px-12",
        isScrolled ? "bg-black/80 backdrop-blur-md py-4" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="font-headline text-2xl tracking-tighter">
          MEMORYOS
        </div>
        
        <div className="flex gap-8 items-center">
          <button 
            onClick={onAuthClick}
            className="font-headline text-[11px] uppercase tracking-[2px] hover:text-secondary transition-colors"
          >
            Login
          </button>
          <Button onClick={onAuthClick} variant="filled">
            Get Access —
          </Button>
        </div>
      </div>
    </nav>
  );
}
