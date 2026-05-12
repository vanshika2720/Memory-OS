"use client";

import React from "react";
import PeopleGrid from "@/components/people/PeopleGrid";

export default function PeoplePage() {
  return (
    <div className="p-8 ml-[220px] space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-headline text-[50px] md:text-[80px] leading-[0.9] tracking-[-2px] uppercase">
            People
          </h1>
          <p className="text-secondary uppercase tracking-[2px] text-[11px] mt-2">
            The humans in your orbit.
          </p>
        </div>
      </div>

      <PeopleGrid />
    </div>
  );
}
