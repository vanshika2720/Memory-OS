"use client";

import React from "react";
import PromiseRow from "./PromiseRow";

const PROMISES = [
  { id: "1", title: "Send Mark's contact details", to: "Sarah Jenkins", dueDate: "Due Tomorrow", daysLeft: 1, source: "WHATSAPP", status: "OPEN" },
  { id: "2", title: "Review architectural vision document", to: "Design Team", dueDate: "May 15", daysLeft: 3, source: "GMAIL", status: "OPEN" },
  { id: "3", title: "Call Rahul about the startup introduction", to: "Rahul Sharma", dueDate: "Completed", daysLeft: 0, source: "CALENDAR", status: "FULFILLED" },
  { id: "4", title: "Book flight for the conference", to: "Self", dueDate: "Overdue", daysLeft: -2, source: "NOTION", status: "BROKEN" },
];

export default function PromiseList({ filter }: { filter: string }) {
  const filtered = PROMISES.filter(p => {
    if (filter === "All") return true;
    if (filter === "Open") return p.status === "OPEN";
    if (filter === "Fulfilled") return p.status === "FULFILLED";
    if (filter === "Broken") return p.status === "BROKEN";
    if (filter === "Overdue") return p.daysLeft < 0;
    return true;
  });

  return (
    <div className="border-t border-[#111]">
      {filtered.map((promise) => (
        <PromiseRow key={promise.id} {...promise} />
      ))}
    </div>
  );
}
