"use client";

import React from "react";
import PersonCard from "./PersonCard";

const PEOPLE = [
  { id: "1", name: "Sarah Jenkins", role: "Friend", health: 0.85, lastMet: "2 days ago", color: "#FF5733" },
  { id: "2", name: "Rahul Sharma", role: "Colleague", health: 0.6, lastMet: "14 days ago", color: "#33FF57" },
  { id: "3", name: "Emily Chen", role: "Client", health: 0.9, lastMet: "Today", color: "#3357FF" },
  { id: "4", name: "Mark Wilson", role: "Family", health: 0.4, lastMet: "1 month ago", color: "#F333FF" },
  { id: "5", name: "Jessica Alba", role: "Friend", health: 0.75, lastMet: "5 days ago", color: "#33FFF3" },
  { id: "6", name: "David Goggins", role: "Mentor", health: 1.0, lastMet: "Yesterday", color: "#FFB833" },
];

export default function PeopleGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {PEOPLE.map((person) => (
        <PersonCard key={person.id} {...person} />
      ))}
    </div>
  );
}
