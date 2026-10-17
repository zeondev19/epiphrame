'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { RING_SHOWCASE_ITEMS, RingShowcaseItem } from '@/data/siteContent';
import { Play } from 'lucide-react';

type FilterType =
  | 'ALL'
  | 'Vertical UA Hooks (TikTok/Reels)'
  | 'Roleplay Bot Turnarounds'
  | 'Community & Discord Reactions'
  | 'APP STORE KEY ART';

const FILTER_TABS: { label: string; value: FilterType }[] = [
  { label: 'ALL', value: 'ALL' },
  { label: 'VERTICAL UA HOOKS', value: 'Vertical UA Hooks (TikTok/Reels)' },
  { label: 'BOT TURNAROUNDS', value: 'Roleplay Bot Turnarounds' },
  { label: 'DISCORD REACTIONS', value: 'Community & Discord Reactions' },
  { label: 'KEY ART', value: 'APP STORE KEY ART' },
];

function ShowcaseCard({
  item,
  isFeatured = false,
  className = '',
}: {
  item: RingShowcaseItem;
  isFeatured?: boolean;
  className?: string;
}) {
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

  const webmSrc = item.videoTextureSrc?.replace(/\.mp4$/, '.webm');
  const mp4Src = item.videoTextureSrc?.replace(/\.webm$/, '.mp4');

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative flex flex-col rounded-3xl bg-white/90 backdrop-blur-md border border-white/40 overflow-hidden shadow-soft-2 hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 ${className}`}
    >
      {/* Media Viewport */}
      <div className={`relative ${isFeatured ? 'aspect-[16/11] lg:aspect-[9/12]' : 'aspect-[9/13]'} bg-[#F6EDE4]/60 overflow-hidden`}>
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
            loop
            muted
            playsInline
            poster={item.posterSrc}
            preload="none"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <source src={webmSrc} type="video/webm" />
            <source src={mp4Src} type="video/mp4" />
          </video>
        )}

        {/* Floating Category Pill in Top-Left */}
        <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
          <span className="tracking-[0.2em] uppercase text-[10px] font-semibold px-3 py-1 rounded-full bg-[#211529]/80 backdrop-blur-md text-white border border-white/10 shadow-soft-1 inline-block">
            {item.category}
          </span>
        </div>

        {item.videoTextureSrc && (
          <span
            className={`absolute top-3.5 right-3.5 p-2 rounded-full bg-white/90 backdrop-blur-sm text-[#211529] border border-white/30 shadow-soft-1 transition-transform z-10 ${
              isHovered ? 'scale-110' : ''
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
          </span>
        )}
      </div>

      {/* Card Content & Artist Badge with Asymmetrical Negative Margin Overlap */}
      <div className="p-5 flex flex-col justify-between flex-1 relative bg-white/60 backdrop-blur-sm">
        {/* Negative Margin Artist Badge Breaking out of container */}
        <div className="-mt-8 -ml-2 mb-3 self-start z-20">
          <Link
            href={`/artists#${item.artistId}`}
            className="inline-flex items-center gap-1.5 bg-[#FFD400] border border-black/10 shadow-soft-1 rounded-full px-3.5 py-1 text-xs font-bold text-[#211529] hover:bg-[#FF425E] hover:text-white transition-all transform hover:scale-105"
          >
            <span>Drawn by @{item.artistName}</span>
            <span className="text-[10px]">✿</span>
          </Link>
        </div>

        <div>
          <h3 className="font-syne font-bold text-base sm:text-lg text-[#211529] tracking-tighter leading-snug group-hover:text-[#FF425E] transition-colors mb-1.5">
            {item.title}
          </h3>
          <p className="font-sans text-xs text-[#5A5560] leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between text-[11px] font-mono text-[#5A5560]">
          <span className="font-semibold text-[#211529]">{item.client}</span>
          <span className="tracking-wider uppercase text-[10px] px-2 py-0.5 rounded-full bg-black/5">
            {item.metricsBadge}
          </span>
        </div>
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
      className="relative w-full py-20 md:py-32 bg-[#F6EDE4] border-t border-white/20"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            {/* Section Eyebrow */}
            <div className="tracking-[0.2em] uppercase text-xs font-semibold text-[#FF425E] mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF425E]" />
              BESPOKE ASSET DELIVERABLES
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-syne text-[#211529] tracking-tighter">
              Our Deliverables ✿
            </h2>
            <p className="font-sans text-base text-[#5A5560] mt-2 max-w-xl leading-relaxed">
              Vertical UA video hooks, roleplay bot turnarounds, and animated community reactions engineered for Character AI acquisition feeds.
            </p>
          </div>

          {/* Filter Pills with Subtle Glassmorphic Borders */}
          <div className="flex flex-wrap items-center gap-2">
            {FILTER_TABS.map((tab) => {
              const isActive = activeFilter === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setActiveFilter(tab.value)}
                  className={`px-4 py-2 rounded-full border transition-all tracking-[0.2em] uppercase text-xs font-semibold ${
                    isActive
                      ? 'bg-[#211529] text-[#FFD400] border-white/10 shadow-soft-2'
                      : 'bg-white/80 backdrop-blur-md text-[#211529] border-white/30 hover:bg-[#FFD400]/40 shadow-soft-1'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetrical Bento Box Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
          {filteredItems.map((item, index) => {
            // Asymmetrical Bento spans:
            // 0: Large Flagship Hero (col-span-12 / lg:col-span-6 / lg:row-span-2)
            // 1: Medium Hero (col-span-12 / lg:col-span-6)
            // 2: Compact (col-span-6 / lg:col-span-3)
            // 3: Compact (col-span-6 / lg:col-span-3)
            // 4: Balanced (col-span-12 / lg:col-span-4)
            // 5: Balanced (col-span-12 / lg:col-span-4)
            // 6: Balanced (col-span-12 / lg:col-span-4)
            // 7: Wide Bottom (col-span-12 / lg:col-span-12)
            let bentoSpan = 'lg:col-span-4';
            let isFeatured = false;

            if (index === 0) {
              bentoSpan = 'md:col-span-2 lg:col-span-7 lg:row-span-2';
              isFeatured = true;
            } else if (index === 1) {
              bentoSpan = 'md:col-span-2 lg:col-span-5';
            } else if (index === 2) {
              bentoSpan = 'md:col-span-1 lg:col-span-5';
            } else if (index === 3) {
              bentoSpan = 'md:col-span-1 lg:col-span-4';
            } else if (index === 4) {
              bentoSpan = 'md:col-span-2 lg:col-span-4';
            } else if (index === 5) {
              bentoSpan = 'md:col-span-1 lg:col-span-4';
            } else if (index === 6) {
              bentoSpan = 'md:col-span-1 lg:col-span-6';
            } else if (index === 7) {
              bentoSpan = 'md:col-span-2 lg:col-span-6';
            }

            return (
              <ShowcaseCard
                key={item.id}
                item={item}
                isFeatured={isFeatured}
                className={bentoSpan}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
