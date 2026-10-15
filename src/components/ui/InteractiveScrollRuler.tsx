'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';

export function InteractiveScrollRuler() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const rulerRef = useRef<HTMLDivElement>(null);

  const totalTicks = 40;

  const updateScrollProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) {
      setScrollProgress(0);
      return;
    }
    const progress = Math.min(1, Math.max(0, scrollTop / docHeight));
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, [updateScrollProgress]);

  const scrubToClientY = useCallback((clientY: number) => {
    if (!rulerRef.current) return;
    const rect = rulerRef.current.getBoundingClientRect();
    const relativeY = clientY - rect.top;
    const pct = Math.min(1, Math.max(0, relativeY / rect.height));

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      window.scrollTo({
        top: pct * docHeight,
        behavior: 'auto',
      });
    }
    setScrollProgress(pct);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsDragging(true);
    scrubToClientY(e.clientY);

    const onPointerMove = (moveEvent: PointerEvent) => {
      scrubToClientY(moveEvent.clientY);
    };

    const onPointerUp = () => {
      setIsDragging(false);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  const activeTickIndex = Math.floor(scrollProgress * (totalTicks - 1));

  return (
    <div
      ref={rulerRef}
      onPointerDown={handlePointerDown}
      className={`fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center py-4 px-2 select-none cursor-ns-resize group transition-opacity ${
        isDragging ? 'opacity-100' : 'opacity-70 hover:opacity-100'
      }`}
      style={{ height: '380px' }}
      title="Click or drag to scrub timeline"
      aria-label="Scroll scrubber ruler"
    >
      {/* Top scale number */}
      <span className="font-mono text-[9px] text-[var(--text-muted)] font-semibold mb-1">
        0
      </span>

      {/* Ticks container */}
      <div className="relative flex-1 flex flex-col justify-between items-center w-8">
        {Array.from({ length: totalTicks }).map((_, index) => {
          const isMajor = index % 10 === 0;
          const isMedium = index % 5 === 0 && !isMajor;
          const isHighlighted = index <= activeTickIndex;

          let tickWidth = 'w-2';
          if (isMajor) tickWidth = 'w-4';
          else if (isMedium) tickWidth = 'w-3';

          return (
            <div
              key={index}
              className="flex items-center justify-end w-full gap-1.5"
            >
              {isMajor && (
                <span className="font-mono text-[8px] text-[var(--text-muted)] scale-90">
                  {Math.floor((index / totalTicks) * 10)}
                </span>
              )}
              <div
                className={`h-[2px] rounded-full transition-colors duration-150 ${tickWidth} ${
                  isHighlighted
                    ? 'bg-[#FF425E]'
                    : 'bg-[var(--text-primary)]/20'
                }`}
              />
            </div>
          );
        })}

        {/* Draggable Active Thumb Indicator */}
        <div
          className="absolute -right-1 w-3.5 h-4.5 rounded-full bg-[#FF425E] border border-[#141316] shadow-[1.5px_1.5px_0px_0px_#141316] transition-transform duration-75 pointer-events-none -translate-y-1/2"
          style={{
            top: `${scrollProgress * 100}%`,
          }}
        />
      </div>

      {/* Bottom scale number */}
      <span className="font-mono text-[9px] text-[var(--text-muted)] font-semibold mt-1">
        10
      </span>
    </div>
  );
}
