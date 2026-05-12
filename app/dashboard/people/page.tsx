"use client";

import React from "react";
import PeopleGrid from "@/components/people/PeopleGrid";

export default function PeoplePage() {
  return (
    <div className="p-8 md:p-12 ml-[220px] space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-headline text-[80px] leading-[0.8] tracking-[-4px] uppercase text-white">
            pEOPLE.
          </h1>
          <p className="text-[#333] uppercase tracking-[2px] text-[11px] mt-4 font-headline">
            The humans in your orbit.
          </p>
        </div>
      </div>

      <PeopleGrid />
    </div>
  );
}
