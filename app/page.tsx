"use client";

import React, { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Marquee from "@/components/landing/Marquee";
import VoiceSection from "@/components/landing/VoiceSection";
import AppsSection from "@/components/landing/AppsSection";
import InstallSection from "@/components/landing/InstallSection";
import AIAssistantSection from "@/components/landing/AIAssistantSection";
import BrandStatement from "@/components/landing/BrandStatement";
import AuthModal from "@/components/landing/AuthModal";

export default function LandingPage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar onAuthClick={() => setIsAuthModalOpen(true)} />
      
      <Hero onAuthClick={() => setIsAuthModalOpen(true)} />
      
      <Marquee />
      
      <VoiceSection />
      
      <AppsSection />
      
      <InstallSection />
      
      <AIAssistantSection />
      
      <BrandStatement />
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </main>
  );
}
