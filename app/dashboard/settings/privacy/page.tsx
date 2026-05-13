"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type PrivacyResponse = {
  privacyAccepted: boolean;
  privacyAnswers: {
    allowFullAccess?: boolean;
    allowConnectedSources?: boolean;
    allowAiInsights?: boolean;
    [k: string]: unknown;
  } | null;
};

export default function PrivacySettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [allowFullAccess, setAllowFullAccess] = useState(false);
  const [allowConnectedSources, setAllowConnectedSources] = useState(false);
  const [allowAiInsights, setAllowAiInsights] = useState(false);

  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/user/privacy");
        if (!res.ok) return;
        const data = (await res.json()) as PrivacyResponse;

        const answers = data.privacyAnswers || {};
        setAllowFullAccess(Boolean(answers.allowFullAccess ?? data.privacyAccepted));
        setAllowConnectedSources(Boolean(answers.allowConnectedSources ?? false));
        setAllowAiInsights(Boolean(answers.allowAiInsights ?? false));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const privacyAccepted = Boolean(allowFullAccess && allowConnectedSources && allowAiInsights);

    try {
      const res = await fetch("/api/user/privacy", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          privacyAccepted,
          privacyAnswers: {
            allowFullAccess,
            allowConnectedSources,
            allowAiInsights,
          },
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({} as any));
        setMessage(err?.error || "Failed to save privacy settings.");
        return;
      }

      setMessage("Privacy settings saved.");
    } catch {
      setMessage("Failed to save privacy settings.");
    }
  };

  if (loading) {
    return (
      <div className="p-8 md:p-12 ml-[220px] text-white">
        <div className="font-headline text-[14px] text-[#aaa] tracking-[2px] uppercase">Loading…</div>
      </div>
    );
  }

  return (
    <div className="p-8 md:p-12 ml-[220px] space-y-16 pb-24">
      <div>
        <h1 className="font-headline text-[80px] leading-[0.8] tracking-[-4px] uppercase text-white">
          PRIVACY.
        </h1>
        <p className="text-[#333] uppercase tracking-[2px] text-[11px] mt-4 font-headline">
          Confirm consent before enabling access.
        </p>
      </div>

      <form onSubmit={onSave} className="space-y-6 max-w-2xl">
        <div className="p-8 border border-[#111] bg-[#050505] space-y-6">
          <div className="space-y-2">
            <div className="font-headline text-[14px] text-[#444] tracking-[4px] uppercase">Questions</div>
            <div className="text-[13px] text-[#ccc] font-body leading-relaxed">
              MemoryOS uses your consent to access connected sources inside the app and generate insights from your memories.
              Your selections are stored for your account.
            </div>
          </div>

          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={allowFullAccess}
              onChange={(e) => setAllowFullAccess(e.target.checked)}
              className="mt-1"
            />
            <div className="space-y-1">
              <div className="font-headline text-[12px] tracking-[2px] uppercase text-white">
                Grant whole access to my data inside the app
              </div>
              <div className="text-[12px] text-[#aaa] font-body leading-relaxed">
                I agree to allow MemoryOS to read my stored memories and connected-source data to provide the app experience.
              </div>
            </div>
          </label>

          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={allowConnectedSources}
              onChange={(e) => setAllowConnectedSources(e.target.checked)}
              className="mt-1"
            />
            <div className="space-y-1">
              <div className="font-headline text-[12px] tracking-[2px] uppercase text-white">
                Allow access to connected sources (Gmail, WhatsApp, etc.)
              </div>
              <div className="text-[12px] text-[#aaa] font-body leading-relaxed">
                I agree to allow MemoryOS to connect and sync with sources I enable in Settings.
              </div>
            </div>
          </label>

          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={allowAiInsights}
              onChange={(e) => setAllowAiInsights(e.target.checked)}
              className="mt-1"
            />
            <div className="space-y-1">
              <div className="font-headline text-[12px] tracking-[2px] uppercase text-white">
                Allow AI processing for summaries and insights
              </div>
              <div className="text-[12px] text-[#aaa] font-body leading-relaxed">
                I agree that MemoryOS may analyze my memories to generate summaries, patterns, and insights.
              </div>
            </div>
          </label>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 py-4 border border-white text-white font-headline text-[11px] tracking-[2px] uppercase hover:bg-white hover:text-black transition-all"
          >
            Save consent
          </button>
          <button
            type="button"
            onClick={() => router.push("/dashboard/settings/connections")}
            className="px-6 py-4 border border-[#333] text-[#444] font-headline text-[11px] tracking-[2px] uppercase hover:border-[#333] hover:text-white transition-all"
          >
            Back
          </button>
        </div>

        {message && <div className="text-[12px] text-[#aaa]">{message}</div>}
      </form>
    </div>
  );
}

