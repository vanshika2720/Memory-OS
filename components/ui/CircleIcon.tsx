import React from "react";

export const CircleIcon = ({ className }: { className?: string }) => (
  <svg 
    width="14" 
    height="14" 
    viewBox="0 0 14 14" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1"/>
    <circle cx="7" cy="7" r="1.5" fill="currentColor"/>
  </svg>
);
