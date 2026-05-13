"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type ConnectedSource = {
  sourceType: string;
  memoryCount: number;
  lastSyncAt: string | null;
  status: string;
};

type IngestStatusPayload = {
  processed: number;
  extracted: number;
  people: number;
  status: string;
  sources: Array<{
    sourceType: string;
    memoryCount: number;
    lastSyncAt: string | null;
    statusText: string;
  }>;
};

const SOURCE_DEFS: Array<{ sourceType: string; label: string }> = [
  { sourceType: "GMAIL", label: "GMAIL" },
  { sourceType: "WHATSAPP", label: "WHATSAPP" },
  { sourceType: "CALENDAR", label: "CALENDAR" },
  { sourceType: "LINKEDIN", label: "LINKEDIN" },
  { sourceType: "TWITTER", label: "TWITTER" },
];

function formatRelative(date: string | null) {
  if (!date) return "Never";
  const t = new Date(date).getTime();
  if (!Number.isFinite(t)) return "Never";
  const diffMs = Date.now() - t;
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 48) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  return `${days} days ago`;
}

export default function ConnectionsPage() {
  const router = useRouter();

  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [connectedSources, setConnectedSources] = useState<ConnectedSource[]>([]);
  const [isIngesting, setIsIngesting] = useState(false);
  const [ingestStatus, setIngestStatus] = useState<IngestStatusPayload | null>(null);

  const connectedByType = useMemo(() => {
    const map = new Map<string, ConnectedSource>();
    for (const s of connectedSources) map.set(s.sourceType, s);
    return map;
  }, [connectedSources]);

  useEffect(() => {
    const load = async () => {
      const [sourcesRes, meRes] = await Promise.allSettled([
        fetch("/api/user/connected-sources"),
        fetch("/api/user/me"),
      ]);

      if (sourcesRes.status === "fulfilled" && sourcesRes.value.ok) {
        const data = (await sourcesRes.value.json()) as { sources: ConnectedSource[] } | any;
        setConnectedSources(data?.sources ?? []);
      }

      if (meRes.status === "fulfilled" && meRes.value.ok) {
        const me = await meRes.value.json();
        setPrivacyAccepted(Boolean(me?.privacyAccepted));
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (!isIngesting) return;

    const es = new EventSource("/api/ingest/status");
    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data) as IngestStatusPayload;
        setIngestStatus(data);
        setConnectedSources(
          (data.sources || []).map((s) => ({
            sourceType: s.sourceType,
            memoryCount: s.memoryCount,
            lastSyncAt: s.lastSyncAt,
            status: s.statusText,
          })),
        );
      } catch {
        // ignore
      }
    };

    es.onerror = () => {
      es.close();
      setIsIngesting(false);
    };

    return () => {
      es.close();
    };
  }, [isIngesting]);

  const syncNow = async (sourceType: string) => {
    if (!privacyAccepted) {
      router.push("/dashboard/settings/privacy");
      return;
    }

    try {
      await fetch("/api/ingest/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sourceType }),
      });
      setIsIngesting(true);
      setIngestStatus(null);
    } catch {
      // ignore
    }
  };

  const onConnectClick = async (sourceType: string) => {
    await syncNow(sourceType);
  };

  return (
    <div className="p-8 md:p-12 ml-[220px] space-y-16">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-headline text-[80px] leading-[0.8] tracking-[-4px] uppercase text-white">
            cONNECT.
          </h1>
          <p className="text-[#333] uppercase tracking-[2px] text-[11px] mt-4 font-headline">
            The sources of your life.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#111] border border-[#111]">
        {SOURCE_DEFS.map((def) => {
          const src = connectedByType.get(def.sourceType);
          const isConnected = Boolean(src);

          return (
            <div key={def.sourceType} className="p-12 bg-black space-y-12 group hover:bg-[#050505] transition-all">
            <div className="flex justify-between items-start">
              <h2 className="font-headline text-[28px] tracking-[-1px] uppercase text-white group-hover:tracking-[1px] transition-all">
                {def.label}
              </h2>
              {isConnected && (
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-blink" />
                  <span className="font-headline text-[10px] text-white tracking-[1px]">LIVE</span>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-headline uppercase tracking-[2px] text-[#222]">
                {isConnected ? `CONNECTED — ${src!.memoryCount} MEMORIES` : "NOT CONNECTED"}
              </span>
              <p className="text-[10px] text-[#111] font-headline uppercase tracking-[1px]">
                LAST SYNCED {isConnected ? formatRelative(src!.lastSyncAt) : "Never"}
              </p>
            </div>

            <button 
              onClick={() => (isConnected ? syncNow(def.sourceType) : onConnectClick(def.sourceType))}
              className={cn(
                "w-full py-4 font-headline text-[11px] tracking-[2px] uppercase transition-all",
                isConnected 
                  ? "border border-[#111] text-[#333] hover:text-white hover:border-[#333]" 
                  : "bg-white text-black hover:bg-opacity-90"
              )}
            >
              {isConnected ? "SYNC NOW —" : "CONNECT SOURCE —"}
            </button>
          </div>
          );
        })}
      </div>

      {!privacyAccepted && (
        <div className="max-w-3xl p-4 border border-[#111] bg-[#050505]">
          <div className="font-headline text-[12px] uppercase tracking-[2px] text-white">Privacy consent required</div>
          <div className="text-[12px] text-[#aaa] mt-2 font-body leading-relaxed">
            To connect or sync sources, you must accept the privacy questions in <span className="text-white">Settings → Privacy</span>.
          </div>
          <button
            onClick={() => router.push("/dashboard/settings/privacy")}
            className="mt-4 px-4 py-3 border border-white text-white font-headline text-[11px] tracking-[2px] uppercase hover:bg-white hover:text-black transition-all"
          >
            Open Privacy
          </button>
        </div>
      )}

      {/* Ingestion Overlay */}
      {isIngesting && (
        <div className="fixed inset-0 z-[100] bg-black animate-in fade-in duration-500 overflow-hidden flex flex-col">
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
            <h2 className="font-headline text-[20vw] leading-none uppercase">INGESTING</h2>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center space-y-12 relative z-10">
            <div className="space-y-2 text-center">
              <h3 className="font-headline text-[40px] text-[#333] uppercase">ingesting</h3>
              <h2 className="font-headline text-[80px] leading-[0.8] text-white uppercase">your life.</h2>
            </div>

            <div className="relative w-80 h-80 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle cx="160" cy="160" r="150" fill="none" stroke="#0a0a0a" strokeWidth="2" />
                <circle 
                  cx="160" cy="160" r="150" 
                  fill="none" stroke="white" strokeWidth="2" 
                  strokeDasharray="942" 
                  className="animate-[progress_10s_ease-in-out_forwards]"
                />
              </svg>
              <div className="text-center">
                <div className="font-headline text-[80px] text-white tabular-nums">
                  {ingestStatus?.processed ?? 0}
                </div>
                <div className="font-headline text-[11px] text-[#333] tracking-[2px] uppercase">Memories</div>
              </div>
            </div>

            <div className="max-w-md w-full h-32 overflow-hidden relative">
              <div className="absolute bottom-0 left-0 right-0 space-y-2 animate-in slide-in-from-bottom-full duration-1000">
                {(ingestStatus?.sources ?? []).slice(0, 4).map((s) => (
                  <div
                    key={s.sourceType}
                    className="flex items-center gap-4 text-[#333] font-headline text-[11px] tracking-[1px] uppercase"
                  >
                    <span className="opacity-50">✉</span>
                    <span>
                      {s.statusText?.toUpperCase?.() ?? "ACTIVE"} — {s.sourceType}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-12 border-t border-[#0a0a0a] flex justify-between items-center relative z-10">
            <div className="flex gap-12">
              <div className="space-y-1">
                <span className="text-[10px] text-[#222] font-headline uppercase tracking-[2px]">Processed</span>
                <div className="font-headline text-white tabular-nums">
                  {ingestStatus?.processed ?? 0} Memories
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-[#222] font-headline uppercase tracking-[2px]">Identified</span>
                <div className="font-headline text-white tabular-nums">
                  {ingestStatus?.people ?? 0} People
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsIngesting(false)}
              className="px-8 py-3 border border-[#111] text-[#333] font-headline text-[11px] tracking-[2px] uppercase hover:text-white hover:border-[#333] transition-all"
            >
              Cancel Sync
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes progress {
          from { stroke-dashoffset: 942; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}
