"use client";

import { useEffect, useRef } from "react";

const interactiveSelectors = [
  "a", "button", "input", "textarea", "select",
  '[role="button"]', '[tabindex]:not([tabindex="-1"])',
  "label", "[onclick]", ".group", "[contenteditable]",
];

function isInteractive(el: HTMLElement | null): boolean {
  if (!el) return false;
  return interactiveSelectors.some((sel) => el.matches(sel));
}

function findInteractive(el: HTMLElement | null): HTMLElement | null {
  let current = el;
  while (current && current !== document.body && current !== document.documentElement) {
    if (isInteractive(current)) return current;
    current = current.parentElement;
  }
  return null;
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const hovering = useRef(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = "* { cursor: none !important; }";
    document.head.appendChild(style);

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let activeEl: HTMLElement | null = null;

    const setHover = (el: HTMLElement | null) => {
      const interactive = findInteractive(el);
      if (interactive === activeEl) return;
      if (activeEl) activeEl.classList.remove("cursor-active");
      activeEl = interactive;
      hovering.current = !!interactive;
      if (interactive) interactive.classList.add("cursor-active");
      if (ring) {
        if (interactive) {
          ring.style.width = "56px";
          ring.style.height = "56px";
          ring.style.borderColor = "rgba(255,255,255,0.9)";
          ring.style.boxShadow = "0 0 24px rgba(255,255,255,0.2)";
        } else {
          ring.style.width = "32px";
          ring.style.height = "32px";
          ring.style.borderColor = "rgba(255,255,255,0.6)";
          ring.style.boxShadow = "none";
        }
      }
    };

    const handleMouseOver = (e: MouseEvent) => setHover(e.target as HTMLElement);
    const handleMouseOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      setHover(related);
    };
    const handleMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    const handleMouseLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const handleMouseEnter = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };
    const handleMouseDown = () => {
      ring.style.width = "24px";
      ring.style.height = "24px";
    };
    const handleMouseUp = () => {
      ring.style.width = hovering.current ? "56px" : "32px";
      ring.style.height = hovering.current ? "56px" : "32px";
    };

    document.addEventListener("mouseover", handleMouseOver, true);
    document.addEventListener("mouseout", handleMouseOut, true);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    let raf = requestAnimationFrame(function tick() {
      const p = pos.current;
      const t = target.current;
      p.x += (t.x - p.x) * 0.28;
      p.y += (t.y - p.y) * 0.28;
      dot.style.transform = `translate(${p.x - 3}px, ${p.y - 3}px)`;
      ring.style.transform = `translate(${p.x - 16}px, ${p.y - 16}px)`;
      raf = requestAnimationFrame(tick);
    });

    return () => {
      style.remove();
      cancelAnimationFrame(raf);
      document.removeEventListener("mouseover", handleMouseOver, true);
      document.removeEventListener("mouseout", handleMouseOut, true);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      if (activeEl) activeEl.classList.remove("cursor-active");
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed", top: 0, left: 0,
          width: 6, height: 6, borderRadius: "50%",
          backgroundColor: "#fff", pointerEvents: "none", zIndex: 99999,
          boxShadow: "0 0 6px rgba(255,255,255,0.5)",
          transition: "opacity 0.3s ease",
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed", top: 0, left: 0,
          width: 32, height: 32, borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.6)",
          pointerEvents: "none", zIndex: 99998,
          transition:
            "width 0.2s ease, height 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, opacity 0.3s ease",
        }}
      />
    </>
  );
}
