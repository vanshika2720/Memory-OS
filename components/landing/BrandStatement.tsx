"use client";

import React from "react";
import { CircleIcon } from "@/components/ui/CircleIcon";

export default function BrandStatement() {
  return (
    <footer className="bg-black pt-48 pb-12 px-6 border-t border-subtle overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-24">
        <div className="flex flex-col items-center">
          <div className="font-headline text-[15vw] leading-[0.8] tracking-[-0.05em] text-white opacity-5 select-none pointer-events-none">
            MEMORYOS
          </div>
          
          <div className="grid md:grid-cols-4 gap-12 w-full mt-24">
            <div className="space-y-4">
              <span className="font-headline text-[11px] tracking-[2px] uppercase text-white">Product</span>
              <ul className="space-y-2 text-secondary text-[14px]">
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2 group">Timeline <CircleIcon className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2 group">Ask AI <CircleIcon className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2 group">People <CircleIcon className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2 group">Insights <CircleIcon className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <span className="font-headline text-[11px] tracking-[2px] uppercase text-white">Company</span>
              <ul className="space-y-2 text-secondary text-[14px]">
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2 group">About <CircleIcon className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2 group">Security <CircleIcon className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2 group">Privacy <CircleIcon className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2 group">Terms <CircleIcon className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <span className="font-headline text-[11px] tracking-[2px] uppercase text-white">Social</span>
              <ul className="space-y-2 text-secondary text-[14px]">
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2 group">Twitter <CircleIcon className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2 group">LinkedIn <CircleIcon className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2 group">Instagram <CircleIcon className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
              </ul>
            </div>
            
            <div className="space-y-8">
              <div className="p-6 border border-subtle space-y-4">
                <span className="font-headline text-[11px] tracking-[2px] uppercase text-white block">Newsletter</span>
                <p className="text-secondary text-[12px]">Get the monthly Memory Wrapped insights.</p>
                <div className="flex border border-subtle">
                  <input 
                    type="email" 
                    placeholder="EMAIL" 
                    className="bg-transparent px-4 py-2 text-[11px] w-full focus:outline-none" 
                  />
                  <button className="bg-white text-black font-headline text-[11px] px-4 py-2 flex items-center gap-2">
                    JOIN <CircleIcon className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-subtle text-tertiary text-[11px] tracking-[1px] uppercase">
          <span>© 2024 MEMORYOS INC.</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
          <span>DESIGNED IN SAN FRANCISCO</span>
        </div>
      </div>
    </footer>
  );
}
