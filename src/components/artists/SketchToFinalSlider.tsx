'use client';

import React, { useState, useRef, useCallback } from 'react';

export function SketchToFinalSlider({
  sketchSrc,
  finalSrc,
  title,
}: {
  sketchSrc: string;
  finalSrc: string;
  title: string;
}) {
  const [splitPercent, setSplitPercent] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(95, Math.max(5, ((clientX - rect.left) / rect.width) * 100));
    setSplitPercent(pct);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-[var(--border-hairline)] select-none cursor-ew-resize bg-white shadow-md group touch-none"
      onPointerMove={(e) => {
        if (e.pointerType !== 'touch' && e.buttons !== 1) return;
        handleMove(e.clientX);
      }}
      onClick={(e) => {
        handleMove(e.clientX);
      }}
      onTouchMove={(e) => {
        if (e.touches[0]) {
          handleMove(e.touches[0].clientX);
        }
      }}
    >
      <img
        src={finalSrc}
        alt={`${title} Final`}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - splitPercent}% 0 0)` }}
      >
        <img
          src={sketchSrc}
          alt={`${title} Sketch`}
          className="w-full h-full object-cover pointer-events-none"
        />
      </div>
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-[#211529] pointer-events-none"
        style={{ left: `${splitPercent}%` }}
      >
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#FFD400] border-2 border-[#211529] flex items-center justify-center font-mono text-xs font-bold shadow-lg">
          ||
        </div>
      </div>
      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 text-[#211529] font-mono text-[11px] font-bold shadow-sm pointer-events-none">
        RAW HUMAN SKETCH
      </span>
      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#1388E5] text-white font-mono text-[11px] font-bold shadow-sm pointer-events-none">
        FINAL VIRAL AD
      </span>
    </div>
  );
}
