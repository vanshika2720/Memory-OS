"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle } from "lucide-react";
import MemoryCard from "@/components/timeline/MemoryCard";
import RelationshipGraph from "@/components/people/RelationshipGraph";
import MeetingBriefModal from "@/components/people/MeetingBriefModal";

export default function PersonDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  return (
    <div className="p-8 md:p-12 ml-[220px] space-y-16 pb-24 relative">
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[#333] hover:text-white transition-colors group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-headline text-[11px] tracking-[2px] uppercase">Back</span>
      </button>

      <header className="flex items-center gap-12">
        <div className="w-20 h-20 rounded-full border border-[#111] flex items-center justify-center font-headline text-[24px] text-[#333] bg-[#050505]">
          SJ
        </div>
        <div className="space-y-2">
          <h1 className="font-headline text-[60px] leading-[0.8] tracking-[-2px] uppercase text-white">
            Sarah Jenkins
          </h1>
          <span className="text-[11px] font-headline uppercase tracking-[2px] text-[#333]">
            FRIEND
          </span>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-16">
          {/* Relationship health graph */}
          <section className="space-y-6">
            <h2 className="font-headline text-[14px] text-[#333] tracking-[4px] uppercase border-b border-[#111] pb-2">
              Relationship Health
            </h2>
            <div className="h-[200px] w-full">
              <RelationshipGraph />
            </div>
          </section>

          {/* Interaction timeline */}
          <section className="space-y-8">
            <h2 className="font-headline text-[14px] text-[#333] tracking-[4px] uppercase border-b border-[#111] pb-2">
              Interaction Timeline
            </h2>
            <div className="grid gap-px bg-[#111] border border-[#111]">
              {MOCK_INTERACTIONS.map((memory, i) => (
                <MemoryCard key={i} {...memory} />
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-16">
          {/* What they care about */}
          <section className="space-y-6">
            <h2 className="font-headline text-[14px] text-[#333] tracking-[4px] uppercase border-b border-[#111] pb-2">
              What they care about
            </h2>
            <div className="flex flex-wrap gap-x-3 gap-y-2 font-body text-[12px] text-[#555]">
              {["Architectural photography", "New York real estate", "Sustainable design", "Indie films"].map((tag, i, arr) => (
                <React.Fragment key={tag}>
                  <span className="text-white/80">{tag}</span>
                  {i < arr.length - 1 && <span className="text-[#333]">·</span>}
                </React.Fragment>
              ))}
            </div>
          </section>

          {/* Open Promises */}
          <section className="space-y-6">
            <h2 className="font-headline text-[28px] tracking-[-1px] uppercase text-white">
              Open Promises
            </h2>
            <div className="space-y-4">
              {MOCK_PROMISES.map((promise, i) => (
                <div key={i} className="p-4 border border-[#111] bg-[#050505] flex justify-between items-center group hover:border-[#333] transition-all">
                  <div className="space-y-1">
                    <p className="font-body text-[13px] text-white">{promise.text}</p>
                    <span className="text-[10px] font-headline text-[#222] uppercase tracking-[1px]">{promise.due}</span>
                  </div>
                  <button className="text-[#111] hover:text-white transition-colors">
                    <CheckCircle size={18} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <MeetingBriefModal />
    </div>
  );
}

const MOCK_INTERACTIONS = [
  {
    source: "WHATSAPP",
    time: "2 days ago",
    summary: "Discussed the new studio space she's renting in Brooklyn. She's looking for a photographer.",
    people: ["Sarah Jenkins"],
    sentiment: "POSITIVE",
    importance: 8,
  },
  {
    source: "GMAIL",
    time: "5 days ago",
    summary: "Sarah shared the link to the portfolio she liked. We agreed to catch up next week.",
    people: ["Sarah Jenkins"],
    sentiment: "NEUTRAL",
    importance: 5,
  }
];

const MOCK_PROMISES = [
  { text: "Send Mark's contact details", due: "Due Tomorrow" },
  { text: "Review her new portfolio", due: "Due in 3 days" }
];
