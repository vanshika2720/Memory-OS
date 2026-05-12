"use client";

import React, { useState } from "react";
import { CircleIcon } from "@/components/ui/CircleIcon";

const plans = [
  {
    name: "FREE",
    monthlyPrice: 0,
    annualPrice: 0,
    description: "For trying out MemoryOS",
    features: [
      "100 memories",
      "Basic AI search",
      "WhatsApp integration",
      "7-day memory access",
    ],
    cta: "Current Plan",
    ctaVariant: "ghost" as const,
  },
  {
    name: "PERSONAL",
    monthlyPrice: 19,
    annualPrice: 190,
    description: "For individual use",
    features: [
      "1,000 memories",
      "Advanced AI search",
      "WhatsApp + Voice",
      "Priority processing",
      "Email summaries",
      "Full memory archive",
    ],
    cta: "Upgrade",
    ctaVariant: "filled" as const,
  },
  {
    name: "PRO",
    monthlyPrice: 49,
    annualPrice: 490,
    description: "For power users",
    features: [
      "10,000 memories",
      "Everything in Personal",
      "Gmail integration",
      "Team sharing",
      "API access",
      "Custom reminders",
      "Priority support",
    ],
    cta: "Upgrade",
    ctaVariant: "filled" as const,
  },
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="text-center mb-24">
          <h1 className="font-headline text-[80px] leading-[0.8] tracking-[-4px] uppercase">
            pRICING.
          </h1>
          <p className="text-[#444] uppercase tracking-[2px] text-[11px] mt-4 font-headline">
            Choose your memory vault.
          </p>
        </div>

        <div className="flex justify-center mb-16">
          <div className="inline-flex items-center gap-4 p-1 border border-[#111]">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 font-headline text-[11px] tracking-[2px] uppercase transition-all ${
                !isAnnual ? "bg-white text-black" : "text-[#444] hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 font-headline text-[11px] tracking-[2px] uppercase transition-all flex items-center gap-2 ${
                isAnnual ? "bg-white text-black" : "text-[#444] hover:text-white"
              }`}
            >
              Annual
              {isAnnual && (
                <span className="text-[10px] bg-[#333] text-white px-2 py-0.5">
                  SAVE 2 MONTHS
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-0 border-l border-[#111]">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`p-12 border-r border-[#111] ${
                index === 1 ? "bg-[#050505]" : ""
              }`}
            >
              <div className="space-y-12">
                <div>
                  <span className="font-headline text-[10px] text-[#444] tracking-[2px] uppercase">
                    {plan.name}
                  </span>
                </div>

                <div>
                  <div className="font-headline text-[80px] leading-[0.8] tracking-[-4px] text-white">
                    ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </div>
                  <div className="font-headline text-[11px] text-[#444] uppercase tracking-[1px] mt-2">
                    {isAnnual ? "10 months" : "per month"}
                  </div>
                </div>

                <div className="text-[12px] text-[#444] font-body leading-relaxed">
                  {plan.description}
                </div>

                <div className="pt-8 space-y-4">
                  {plan.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 py-3 border-t border-[#111]"
                    >
                      <div className="w-1 h-1 bg-white" />
                      <span className="text-[12px] text-[#444] font-body">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-4 font-headline text-[11px] tracking-[2px] uppercase transition-all flex items-center justify-center gap-2 ${
                    plan.ctaVariant === "filled"
                      ? "bg-white text-black hover:bg-[#e0e0e0]"
                      : "border border-[#111] text-[#444] hover:border-white hover:text-white"
                  }`}
                >
                  {plan.cta} {plan.ctaVariant === "filled" && <CircleIcon className="w-3 h-3" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
