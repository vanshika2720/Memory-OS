"use client";

import React from "react";
import PersonCard from "./PersonCard";

const PEOPLE = [
  { id: "1", name: "Sarah Jenkins", role: "Friend", health: 0.85, interactions: 47, lastTalked: "9 days ago", color: "#1a1a1a" },
  { id: "2", name: "Rahul Sharma", role: "Colleague", health: 0.6, interactions: 124, lastTalked: "2 days ago", color: "#1a1a1a" },
  { id: "3", name: "Emily Chen", role: "Client", health: 0.9, interactions: 32, lastTalked: "Today", color: "#1a1a1a" },
  { id: "4", name: "Mark Wilson", role: "Family", health: 0.4, interactions: 8, lastTalked: "1 month ago", color: "#1a1a1a" },
  { id: "5", name: "Jessica Alba", role: "Friend", health: 0.75, interactions: 56, lastTalked: "5 days ago", color: "#1a1a1a" },
  { id: "6", name: "David Goggins", role: "Mentor", health: 1.0, interactions: 200, lastTalked: "Yesterday", color: "#1a1a1a" },
];

export default function PeopleGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#111]">
      {PEOPLE.map((person) => (
        <PersonCard key={person.id} {...person} />
      ))}
    </div>
  );
}
