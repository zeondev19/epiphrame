'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { RING_SHOWCASE_ITEMS, RingShowcaseItem } from '@/data/siteContent';
import { Play, ArrowUpRight, Sparkles, ExternalLink } from 'lucide-react';

type FilterType =
  | 'ALL'
  | '9:16 VIDEO ADS'
  | 'CHARACTER SHEETS'
  | 'ANIMATED GIF STICKERS'
  | 'APP STORE KEY ART';

const FILTER_TABS: { label: string; value: FilterType }[] = [
  { label: 'ALL FORMATS (8)', value: 'ALL' },
  { label: '9:16 VIDEO ADS', value: '9:16 VIDEO ADS' },
  { label: 'CHARACTER SHEETS', value: 'CHARACTER SHEETS' },
  { label: 'ANIMATED GIF STICKERS', value: 'ANIMATED GIF STICKERS' },
  { label: 'APP STORE KEY ART', value: 'APP STORE KEY ART' },
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
      className="group flex flex-col justify-between rounded-3xl bg-[var(--bg-card)] border border-[#141316]/20 dark:border-[#F9F6F0]/20 overflow-hidden shadow-[3px_3px_0px_0px_#141316] dark:shadow-[3px_3px_0px_0px_#FF425E] hover:shadow-[6px_6px_0px_0px_#FF425E] hover:-translate-y-1.5 transition-all duration-300"
    >
      {/* Top Media Stage (Aspect 9:16 vertical / phone ratio) */}
      <div className="relative aspect-[9/14] bg-neutral-900 overflow-hidden">
        {/* Poster Image */}
        <img
          src={item.posterSrc}
          alt={item.title}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            isHovered && item.videoTextureSrc ? 'opacity-0' : 'opacity-100'
          }`}
          loading="lazy"
        />

        {/* Hover Loop Video */}
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

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <span className="font-mono text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-[#141316]/90 text-[#F9F6F0] border border-white/20 backdrop-blur-md uppercase tracking-wider">
            {item.indexLabel} / {item.category}
          </span>
          {item.videoTextureSrc && (
            <span
              className={`p-1.5 rounded-full bg-[#141316]/80 text-[#FFD400] backdrop-blur-md border border-white/20 transition-transform ${
                isHovered ? 'scale-110 bg-[#FF425E] text-white' : ''
              }`}
            >
              <Play className="w-3 h-3 fill-current" />
            </span>
          )}
        </div>

        {/* Bottom Performance Metric Badge */}
        <div className="absolute bottom-3 left-3 right-3 z-10 pointer-events-none">
          <span
            className="inline-block font-mono text-[10px] font-black px-2.5 py-1 rounded-full text-[#141316] border border-[#141316]/25 shadow-sm"
            style={{ backgroundColor: item.accentColor || '#FFD400' }}
          >
            {item.metricsBadge}
          </span>
        </div>
      </div>

      {/* Card Info Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] mb-1.5">
            <span className="font-bold text-[var(--text-primary)]">Client:</span>
            <a
              href={item.clientUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-0.5 underline font-bold hover:text-[#FF425E] transition-colors"
            >
              <span>{item.client}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <h3 className="font-black text-base text-[var(--text-primary)] leading-snug tracking-tight mb-2">
            {item.title}
          </h3>

          <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Artist Link */}
        <div className="pt-4 mt-4 border-t border-[var(--border-hairline)] flex items-center justify-between">
          <Link
            href={`/artists#${item.artistId}`}
            className="inline-flex items-center gap-1.5 font-mono text-xs font-extrabold text-[#FF425E] hover:text-[#211529] dark:hover:text-[#FFD400] transition-colors group/link"
          >
            <span>Illustrated by {item.artistName}</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </Link>
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
      className="relative w-full py-24 md:py-36 bg-[var(--bg-surface)] border-t border-[var(--border-hairline)]"
    >
      <div id="campaigns" className="absolute -top-16" />
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-[#FF425E] text-white font-black border border-[#141316] shadow-[2px_2px_0px_0px_#141316]">
                03 / DELIVERABLES &amp; CAMPAIGN SHOWCASE
              </span>
              <span className="font-mono text-xs text-[var(--text-muted)] font-bold tracking-wider hidden sm:inline-block">
                WHAT WE DELIVER
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight">
              Campaign Deliverables &amp; Formats
            </h2>
            <p className="text-base sm:text-lg text-[var(--text-muted)] mt-2 max-w-2xl">
              Production assets tailored for mobile game and character worlds: 9:16 video ads, turnaround sheets, animated reaction stickers, and store key art.
            </p>
          </div>

          {/* Filter Pill Tabs */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            {FILTER_TABS.map((tab) => {
              const isActive = activeFilter === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setActiveFilter(tab.value)}
                  className={`px-4 py-2 rounded-full border border-[#141316] dark:border-[#F9F6F0]/30 transition-all font-bold ${
                    isActive
                      ? 'bg-[#141316] text-[#F9F6F0] dark:bg-[#FFD400] dark:text-[#141316] font-black shadow-[2px_2px_0px_0px_#FF425E]'
                      : 'bg-[var(--bg-card)] text-[var(--text-primary)] hover:bg-[#FFD400]/20'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4-Column Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <ShowcaseCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
