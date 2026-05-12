"use client";

import React from "react";

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
                <li><a href="#" className="hover:text-white transition-colors">Timeline</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Ask AI</a></li>
                <li><a href="#" className="hover:text-white transition-colors">People</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Insights</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <span className="font-headline text-[11px] tracking-[2px] uppercase text-white">Company</span>
              <ul className="space-y-2 text-secondary text-[14px]">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <span className="font-headline text-[11px] tracking-[2px] uppercase text-white">Social</span>
              <ul className="space-y-2 text-secondary text-[14px]">
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
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
                  <button className="bg-white text-black font-headline text-[11px] px-4 py-2">JOIN</button>
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
