"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { X } from "lucide-react";

export default function AuthModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [isMagicLinkSent, setIsMagicLinkSent] = useState(false);

  if (!isOpen) return null;

  const handleMagicLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsMagicLinkSent(true);
      // Actual implementation would call /api/auth/signin
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-black border border-border p-12 space-y-12">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-tertiary hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
        
        <div className="space-y-4">
          <h2 className="font-headline text-[40px] leading-[0.9] tracking-[-1px] uppercase">
            Access your vault.
          </h2>
          <p className="text-secondary text-[14px]">
            No passwords. No social logins. Just your email.
          </p>
        </div>
        
        {!isMagicLinkSent ? (
          <form onSubmit={handleMagicLink} className="space-y-8">
            <div className="space-y-4">
              <span className="font-headline text-[11px] tracking-[2px] uppercase text-tertiary">Email address</span>
              <Input 
                type="email" 
                placeholder="YOUR@EMAIL.COM" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-transparent border-subtle focus:border-white"
              />
            </div>
            
            <Button type="submit" className="w-full">
              Send Magic Link —
            </Button>
            
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-subtle"></div>
              </div>
              <span className="relative bg-black px-4 font-headline text-[11px] tracking-[2px] text-tertiary uppercase">or</span>
            </div>
            
            <div className="space-y-4">
              <span className="font-headline text-[11px] tracking-[2px] uppercase text-tertiary">Password</span>
              <Input 
                type="password" 
                placeholder="••••••••" 
                className="bg-transparent border-subtle focus:border-white"
              />
            </div>
            
            <Button type="button" variant="ghost" className="w-full">
              Sign in with password
            </Button>
          </form>
        ) : (
          <div className="space-y-8 py-12 text-center animate-in fade-in zoom-in duration-500">
            <div className="w-16 h-16 border border-white mx-auto flex items-center justify-center">
              <div className="w-8 h-[1px] bg-white rotate-45" />
              <div className="w-8 h-[1px] bg-white -rotate-45" />
            </div>
            <div className="space-y-4">
              <h3 className="font-headline text-[24px] uppercase tracking-[-1px]">Check your inbox.</h3>
              <p className="text-secondary text-[14px]">
                We've sent a magic link to <span className="text-white">{email}</span>. Click it to enter your vault.
              </p>
            </div>
            <Button onClick={() => setIsMagicLinkSent(false)} variant="ghost" className="w-full">
              Back to login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
