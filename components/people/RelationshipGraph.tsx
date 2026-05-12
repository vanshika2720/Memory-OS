"use client";

import React, { useEffect, useRef } from "react";

export default function RelationshipGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const points = Array.from({ length: 20 }, (_, i) => ({
      x: (rect.width / 19) * i,
      y: (rect.height / 2) + Math.sin(i / 2) * 40 + (Math.random() - 0.5) * 20
    }));

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();

    // Hover effect simulation
    canvas.onmousemove = (e) => {
      const mouseX = e.clientX - rect.left;
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      // Redraw line
      ctx.strokeStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
      ctx.stroke();

      // Draw cursor line
      ctx.strokeStyle = '#111111';
      ctx.beginPath();
      ctx.moveTo(mouseX, 0);
      ctx.lineTo(mouseX, rect.height);
      ctx.stroke();

      // Find nearest point
      const nearest = points.reduce((prev, curr) => 
        Math.abs(curr.x - mouseX) < Math.abs(prev.x - mouseX) ? curr : prev
      );

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(nearest.x, nearest.y, 3, 0, Math.PI * 2);
      ctx.fill();
    };

  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full cursor-crosshair"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
