"use client";

import React, { useEffect, useRef } from "react";

export default function EmotionArcChart() {
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

    const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    const data = [65, 40, 85, 70, 45, 90, 80]; // Mock emotion scores

    // Draw grid
    ctx.strokeStyle = '#0a0a0a';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = (rect.height / 4) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(rect.width, y);
      ctx.stroke();
    }

    // Draw line
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    data.forEach((val, i) => {
      const x = (rect.width / (data.length - 1)) * i;
      const y = rect.height - (rect.height * (val / 100));
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Draw points and labels
    data.forEach((val, i) => {
      const x = (rect.width / (data.length - 1)) * i;
      const y = rect.height - (rect.height * (val / 100));
      
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      ctx.fillStyle = '#333333';
      ctx.font = '10px "Bebas Neue"';
      ctx.textAlign = 'center';
      ctx.fillText(days[i], x, rect.height + 20);
    });

    // Hover effect simulation
    canvas.onmousemove = (e) => {
      const mouseX = e.clientX - rect.left;
      // Tooltip logic would go here
    };

  }, []);

  return (
    <div className="w-full h-full pb-8">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
