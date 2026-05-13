"use client";

import React, { useEffect, useState } from "react";
import { CircleIcon } from "@/components/ui/CircleIcon";

type BillingResponse = {
  planTier: string;
  pricePerMonth: string | null;
  memoryCount: number;
  memoryLimit: number;
  usagePercent: number;
  subscription: {
    status: string;
    currentPeriodEnd: string | null;
    cancelAtPeriodEnd: boolean;
  } | null;
};

export default function BillingPage() {
  const [loading, setLoading] = useState(true);
  const [billing, setBilling] = useState<BillingResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/user/billing");
        if (!res.ok) {
          const err = await res.json().catch(() => ({} as any));
          setError(err?.error || "Failed to load billing.");
          return;
        }
        const data = (await res.json()) as BillingResponse;
        setBilling(data);
      } catch {
        setError("Failed to load billing.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const planTier = billing?.planTier ?? "FREE";
  const memoryCount = billing?.memoryCount ?? 0;
  const memoryLimit = billing?.memoryLimit ?? 1;
  const usagePercent = billing?.usagePercent ?? 0;
  const currentPeriodEnd = billing?.subscription?.currentPeriodEnd ?? null;

  const pricePerMonth = billing?.pricePerMonth;
  const nextInvoiceText = currentPeriodEnd ? new Date(currentPeriodEnd).toLocaleDateString() : "—";

  if (loading) {
    return (
      <div className="p-8 md:p-12 space-y-16">
        <div className="font-headline text-[14px] text-[#aaa] tracking-[2px] uppercase">Loading…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 md:p-12 space-y-16">
        <div className="font-headline text-[14px] text-red-400 tracking-[2px] uppercase">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-8 md:p-12 space-y-16">
      <div>
        <h1 className="font-headline text-[80px] leading-[0.8] tracking-[-4px] uppercase text-white">
          bILLING.
        </h1>
        <p className="text-[#444] uppercase tracking-[2px] text-[11px] mt-4 font-headline">
          Subscription and usage.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        <div className="space-y-12">
          <div className="p-12 border border-[#111] bg-[#050505] space-y-8">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <span className="font-headline text-[10px] text-[#444] tracking-[2px] uppercase">Current Plan</span>
                <h2 className="font-headline text-[28px] leading-none uppercase text-white">
                  {planTier}
                </h2>
              </div>
              <div className="text-right space-y-1">
                <div className="font-headline text-[24px] text-white">
                  {pricePerMonth ?? ""}
                </div>
                <div className="font-headline text-[10px] text-[#444] uppercase tracking-[1px]">Per Month</div>
              </div>
            </div>

            <div className="pt-8 border-t border-[#111] space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-headline text-[#444] uppercase tracking-[1px]">
                  {memoryCount} / {memoryLimit} Memories
                </span>
                <span className="text-[11px] font-headline text-white uppercase tracking-[1px]">
                  {usagePercent.toFixed(1)}%
                </span>
              </div>
              <div className="w-full h-[1px] bg-[#0f0f0f]">
                <div className="h-full bg-[#1a1a1a]" style={{ width: `${Math.min(100, usagePercent)}%` }} />
              </div>
            </div>

            <div className="pt-8 border-t border-[#111] space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-headline text-[#444] uppercase tracking-[1px]">Next Invoice</span>
                <span className="text-[11px] font-headline text-white uppercase tracking-[1px]">{nextInvoiceText}</span>
              </div>
              <div className="w-full h-[1px] bg-[#0f0f0f]">
                <div className="h-full bg-[#1a1a1a] w-1/3" />
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 py-3 border border-white text-white font-headline text-[11px] tracking-[2px] uppercase hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2">
                Upgrade <CircleIcon className="w-3 h-3" />
              </button>
              <button className="flex-1 py-3 border border-[#333] text-[#444] font-headline text-[11px] tracking-[2px] uppercase hover:border-white hover:text-white transition-all flex items-center justify-center gap-2">
                Downgrade <CircleIcon className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="p-8 border border-[#111] space-y-6">
            <h3 className="font-headline text-[14px] text-[#444] tracking-[4px] uppercase">Payment Method</h3>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 border border-[#111] flex items-center justify-center font-headline text-[10px] text-[#444]">
                  STRIPE
                </div>
                <span className="text-[13px] text-[#ccc] font-body">
                  {billing?.subscription?.status ? `Status: ${billing.subscription.status}` : "No active subscription"}
                </span>
              </div>
              <button className="text-[11px] font-headline text-[#444] uppercase tracking-[2px] hover:text-white transition-colors">
                Update
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <h3 className="font-headline text-[14px] text-[#444] tracking-[4px] uppercase border-b border-[#111] pb-2">History</h3>
          <div className="divide-y divide-[#111]">
            {billing?.subscription ? (
              <div className="py-6 flex justify-between items-center">
                <div className="space-y-1">
                  <div className="font-body text-[13px] text-white">Subscription history</div>
                  <div className="font-headline text-[10px] text-[#444] uppercase tracking-[1px]">
                    Not available until Stripe webhooks are persisted.
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <span className="font-headline text-[14px] text-white">—</span>
                </div>
              </div>
            ) : (
              <div className="py-6">
                <div className="font-body text-[13px] text-white">No billing history yet.</div>
                <div className="font-headline text-[10px] text-[#444] uppercase tracking-[1px] mt-1">
                  Upgrade your plan to start a subscription.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
