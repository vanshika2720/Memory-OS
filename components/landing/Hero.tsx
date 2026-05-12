"use client";

import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { CircleIcon } from "@/components/ui/CircleIcon";

export default function Hero({ onAuthClick }: { onAuthClick: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState("#111111");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;
      
      setRotation({
        x: y * -24, // max ±12deg
        y: x * 24,  // max ±12deg
      });
      
      // Interpolate color #111 -> #fff
      const progress = e.clientX / innerWidth;
      const r = Math.round(17 + progress * (255 - 17));
      const g = Math.round(17 + progress * (255 - 17));
      const b = Math.round(17 + progress * (255 - 17));
      setColor(`rgb(${r}, ${g}, ${b})`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-black px-6"
    >
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      
      <div className="relative z-10 text-center space-y-8">
        <h1 className="text-secondary font-headline text-[24px] tracking-[4px] uppercase">
          Your life,
        </h1>
        
        <div 
          style={{ 
            transform: `perspective(800px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            color: color,
            transition: 'transform 0.1s ease-out'
          }}
          className="font-headline text-[72px] md:text-[136px] leading-[0.9] tracking-[-4px] uppercase"
        >
          remembered.
        </div>
        
        <p className="max-w-md mx-auto text-secondary text-[16px] leading-relaxed">
          MemoryOS silently captures everything you say, promise, feel, and decide — then gives it back the moment you need it.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center pt-8">
          <Button onClick={onAuthClick} variant="filled" className="w-full md:w-auto flex items-center gap-2">
            Start your memory vault <CircleIcon className="w-3 h-3" />
          </Button>
          <Button variant="ghost" className="w-full md:w-auto">
            Watch the film
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-tertiary animate-bounce">
        <span className="font-headline text-[11px] tracking-[2px] uppercase">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-subtle" />
      </div>
    </section>
  );
}
