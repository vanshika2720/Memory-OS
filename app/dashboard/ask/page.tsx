"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mic, Send, Sparkles, MessageSquare, ExternalLink, X } from "lucide-react";
import { useChat } from "ai/react";
import { useStore } from "@/store";
import { cn } from "@/lib/utils";

const SUGGESTIONS = [
  "What did I promise last week?",
  "How have things been with Rahul?",
  "What was I stressed about in March?",
  "What decisions did I make in Q1?"
];

export default function AskPage() {
  const { messages, input, handleInputChange, handleSubmit, setInput } = useChat({
    api: "/api/chat",
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isRecording, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleVoiceInput = () => {
    // Web Speech API Implementation
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.onstart = () => setIsFilterOpen(true);
      recognition.onend = () => setIsFilterOpen(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        // Auto-submit could be triggered here
      };
      recognition.start();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-70px)] ml-[220px] bg-black">
      {/* Chat Feed */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-12"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center space-y-12 max-w-3xl mx-auto text-center">
            <h1 className="font-headline text-[70px] leading-[0.8] tracking-[-4px] text-[#111] uppercase">
              wHAT DO YOU <br />want to know?
            </h1>
            
            <div className="flex flex-wrap justify-center gap-3">
              {SUGGESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => setInput(q)}
                  className="px-4 py-2 border border-[#111] text-[11px] font-body text-[#444] hover:text-white hover:border-[#333] transition-all rounded-full"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-16 pb-24">
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={cn(
                  "flex flex-col gap-4",
                  msg.role === "user" ? "items-end" : "items-start"
                )}
              >
                {msg.role === "user" ? (
                  <div className="bg-[#111] px-6 py-4 max-w-[60%] animate-slide-in-right">
                    <p className="font-body text-[13px] text-white leading-relaxed">{msg.content}</p>
                  </div>
                ) : (
                  <div className="w-full border-l-2 border-[#1a1a1a] pl-8 space-y-8 animate-in fade-in duration-700">
                    <div className="space-y-6">
                      <div className="font-body text-[14px] text-[#ccc] leading-[1.8]">
                        {msg.content}
                      </div>
                      
                      {/* Memory References (Pills) */}
                      <div className="flex flex-wrap gap-3">
                        {[1, 2].map(n => (
                          <div key={n} className="flex items-center gap-3 px-3 py-1.5 border border-[#111] bg-[#050505] cursor-pointer hover:border-[#333] transition-all group">
                            <span className="text-[12px] opacity-50">✉</span>
                            <span className="font-headline text-[10px] text-[#333] uppercase tracking-[1px]">May 12, 2024</span>
                            <ExternalLink size={10} className="text-[#111] group-hover:text-white transition-colors" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Follow-up question chips */}
                    <div className="flex gap-3">
                      <button className="px-4 py-2 border border-[#111] text-[10px] font-headline tracking-[1px] text-[#333] hover:text-white hover:border-[#333] transition-all uppercase">
                        Tell me more about the studio
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="p-8 border-t border-[#0a0a0a] bg-black">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }} 
          className="max-w-4xl mx-auto flex items-center gap-6"
        >
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask anything about your past…"
            className="flex-1 bg-transparent border-none text-[14px] font-body text-white placeholder:text-[#222] focus:ring-0"
          />
          
          <div className="flex items-center gap-3">
            <button 
              type="button"
              onClick={handleVoiceInput}
              className={cn(
                "w-10 h-10 rounded-full border border-[#111] flex items-center justify-center transition-all",
                isRecording ? "bg-white text-black scale-110" : "text-[#333] hover:text-white hover:border-[#333]"
              )}
            >
              <Mic size={18} className={isRecording ? "animate-pulse" : ""} />
            </button>
            <button 
              type="submit"
              className="px-6 py-2 bg-white text-black font-headline text-[11px] tracking-[2px] uppercase hover:bg-opacity-90 transition-all"
            >
              ASK —
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
