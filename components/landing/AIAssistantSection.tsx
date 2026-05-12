"use client";

import React, { useState, useEffect } from "react";

const DEMO_CHATS = [
  { q: "What did I promise Sarah during lunch?", a: "You promised Sarah you'd send her the contact for the architectural photographer by Tuesday morning." },
  { q: "How was my emotional tone last week?", a: "Your tone was 85% positive, with a brief period of anxiety on Wednesday afternoon during the board meeting." },
  { q: "When did I last see Rahul?", a: "You last saw Rahul 14 days ago at the Soho House. You discussed his new startup and promised to introduce him to Mark." }
];

export default function AIAssistantSection() {
  const [chatIdx, setChatIdx] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentAnswer = DEMO_CHATS[chatIdx].a;
    setDisplayText("");
    setIsTyping(true);

    let isMounted = true;
    let charIdx = 0;

    const timer = setInterval(() => {
      if (!isMounted) return;
      if (charIdx < currentAnswer.length) {
        const char = currentAnswer[charIdx];
        if (char !== undefined) {
          setDisplayText((prev) => prev + char);
        }
        charIdx++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
        setTimeout(() => {
          if (isMounted) {
            setChatIdx((prev) => (prev + 1) % DEMO_CHATS.length);
          }
        }, 3000);
      }
    }, 30);

    return () => {
      isMounted = false;
      clearInterval(timer);
    };
  }, [chatIdx]);

  return (
    <section className="bg-black py-24 px-6 border-t border-subtle">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-headline text-[50px] md:text-[90px] leading-[0.9] tracking-[-2px] uppercase">
            Your personal oracle.
          </h2>
          <p className="text-secondary text-[18px]">Instant answers about your own life.</p>
        </div>
        
        <div className="bg-[#050505] border border-subtle p-8 md:p-12 space-y-12 min-h-[500px] flex flex-col justify-center">
          <div className="space-y-4">
            <span className="font-headline text-[11px] tracking-[2px] uppercase text-tertiary">Question</span>
            <div className="font-headline text-[24px] md:text-[36px] leading-tight text-white uppercase tracking-[-1px]">
              "{DEMO_CHATS[chatIdx].q}"
            </div>
          </div>
          
          <div className="space-y-4">
            <span className="font-headline text-[11px] tracking-[2px] uppercase text-tertiary">MemoryOS</span>
            <div className="text-[18px] md:text-[22px] leading-relaxed text-secondary min-h-[120px]">
              {displayText}
              {isTyping && <span className="inline-block w-2 h-6 bg-white ml-2 animate-pulse align-middle" />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
