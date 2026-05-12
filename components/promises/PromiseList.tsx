"use client";

import React from "react";
import PromiseRow from "./PromiseRow";

const PROMISES = [
  { id: "1", title: "Send Mark's contact details", to: "Sarah Jenkins", dueDate: "Tomorrow", source: "WHATSAPP", status: "PENDING" },
  { id: "2", title: "Review architectural vision", to: "Design Team", dueDate: "Friday", source: "GMAIL", status: "PENDING" },
  { id: "3", title: "Call Rahul about startup", to: "Rahul Sharma", dueDate: "Next Week", source: "CALENDAR", status: "COMPLETED" },
  { id: "4", title: "Book flight for conference", to: "Self", dueDate: "Today", source: "NOTION", status: "PENDING" },
];

export default function PromiseList() {
  return (
    <div className="border border-subtle divide-y divide-subtle">
      {PROMISES.map((promise) => (
        <PromiseRow key={promise.id} {...promise} />
      ))}
    </div>
  );
}
