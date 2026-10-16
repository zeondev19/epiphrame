'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { RING_SHOWCASE_ITEMS, RingShowcaseItem } from '@/data/siteContent';
import { Play } from 'lucide-react';

type FilterType =
  | 'ALL'
  | '9:16 VIDEO ADS'
  | 'CHARACTER SHEETS'
  | 'ANIMATED GIF STICKERS'
  | 'APP STORE KEY ART';

const FILTER_TABS: { label: string; value: FilterType }[] = [
  { label: 'ALL', value: 'ALL' },
  { label: 'VIDEO ADS', value: '9:16 VIDEO ADS' },
  { label: 'CHARACTERS', value: 'CHARACTER SHEETS' },
  { label: 'STICKERS', value: 'ANIMATED GIF STICKERS' },
  { label: 'KEY ART', value: 'APP STORE KEY ART' },
];

function ShowcaseCard({ item }: { item: RingShowcaseItem }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group flex flex-col rounded-3xl bg-white border-2 border-[#211529] overflow-hidden shadow-[4px_4px_0px_#211529] hover:shadow-[6px_6px_0px_#FF66B2] hover:-translate-y-1.5 transition-all duration-300"
    >
      {/* Media */}
      <div className="relative aspect-[9/14] bg-[#F6EDE4] overflow-hidden">
        <img
          src={item.posterSrc}
          alt={item.title}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            isHovered && item.videoTextureSrc ? 'opacity-0' : 'opacity-100'
          }`}
          loading="lazy"
        />

        {item.videoTextureSrc && (
          <video
            ref={videoRef}
            src={item.videoTextureSrc}
            poster={item.posterSrc}
            muted
            loop
            playsInline
            preload="none"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          />
        )}

        {item.videoTextureSrc && (
          <span
            className={`absolute top-3 right-3 p-2 rounded-full bg-white/90 text-[#211529] border-2 border-[#211529] transition-transform z-10 ${
              isHovered ? 'scale-110' : ''
            }`}
          >
            <Play className="w-3 h-3 fill-current" />
          </span>
        )}
      </div>

      {/* Artist tag only — no corporate captions */}
      <div className="p-4 flex items-center justify-between">
        <Link
          href={`/artists#${item.artistId}`}
          className="bg-white border-2 border-[#211529] shadow-[2px_2px_0_#211529] rounded-full px-3 py-1 text-xs font-bold text-[#211529] hover:bg-[#FFD400] transition-colors"
        >
          Drawn by @{item.artistName} ✿
        </Link>
      </div>
    </div>
  );
}

export function DeliverablesShowcase() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('ALL');

  const filteredItems = RING_SHOWCASE_ITEMS.filter((item) => {
    if (activeFilter === 'ALL') return true;
    return item.category === activeFilter;
  });

  return (
    <section
      id="showcase"
      className="relative w-full py-20 md:py-32 bg-[#F6EDE4]"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
          <div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#211529] tracking-tight">
              Our Drawings ✿
            </h2>
            <p className="text-base text-[#5A5560] mt-2 max-w-lg">
              Character art, animated stickers, and video ads — all hand-drawn by our collective.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {FILTER_TABS.map((tab) => {
              const isActive = activeFilter === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setActiveFilter(tab.value)}
                  className={`px-4 py-2 rounded-full border-2 border-[#211529] transition-all font-bold text-xs ${
                    isActive
                      ? 'bg-[#FFD400] text-[#211529] shadow-[2px_2px_0px_#211529]'
                      : 'bg-white text-[#211529] hover:bg-[#FFD400]/30'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <ShowcaseCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
