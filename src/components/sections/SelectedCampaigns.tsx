'use client';

import React, { useState } from 'react';
import { RING_SHOWCASE_ITEMS, RingShowcaseItem } from '@/data/siteContent';
import { Play, Pause, ExternalLink, ArrowUpRight } from 'lucide-react';

interface SelectedCampaignsProps {
  onOpenInquiry?: (projectType?: string, artistId?: string) => void;
}

export function SelectedCampaigns({ onOpenInquiry }: SelectedCampaignsProps) {
  const [filter, setFilter] = useState<'all' | 'cycle' | 'hangjam' | 'studio'>('all');
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  const filteredItems = RING_SHOWCASE_ITEMS.filter((item) => {
    if (filter === 'cycle') return item.client.toLowerCase().includes('cycle');
    if (filter === 'hangjam') return item.client.toLowerCase().includes('hangjam');
    if (filter === 'studio') return item.client.toLowerCase().includes('epiphrame');
    return true;
  });

  return (
    <section
      id="campaigns"
      className="relative w-full py-24 md:py-36 bg-[var(--bg-surface)] border-t border-[var(--border-hairline)]"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-[#1388E5] text-white font-bold">
                02 / SELECTED CAMPAIGNS
              </span>
              <span className="font-mono text-xs text-[var(--text-muted)] tracking-wider">
                CYCLE AI & HANGJAM CREATIVES
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight">
              Hand-Crafted Character Campaigns
            </h2>
            <p className="text-base sm:text-lg text-[var(--text-muted)] mt-2 max-w-2xl">
              High-converting video ad reels, Discord sticker drops, and key visual assets built for leading AI platforms.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full border transition-all ${
                filter === 'all'
                  ? 'bg-[#211529] text-[#F6EDE4] border-[#211529] font-bold shadow-sm'
                  : 'bg-[var(--bg-card)] text-[var(--text-primary)] border-[var(--border-hairline)] hover:border-gray-400'
              }`}
            >
              ALL ({RING_SHOWCASE_ITEMS.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('cycle')}
              className={`px-4 py-2 rounded-full border transition-all ${
                filter === 'cycle'
                  ? 'bg-[#1388E5] text-white border-[#1388E5] font-bold shadow-sm'
                  : 'bg-[var(--bg-card)] text-[var(--text-primary)] border-[var(--border-hairline)] hover:border-gray-400'
              }`}
            >
              CYCLE AI (3)
            </button>
            <button
              type="button"
              onClick={() => setFilter('hangjam')}
              className={`px-4 py-2 rounded-full border transition-all ${
                filter === 'hangjam'
                  ? 'bg-[#1E7E48] text-white border-[#1E7E48] font-bold shadow-sm'
                  : 'bg-[var(--bg-card)] text-[var(--text-primary)] border-[var(--border-hairline)] hover:border-gray-400'
              }`}
            >
              HANGJAM (4)
            </button>
            <button
              type="button"
              onClick={() => setFilter('studio')}
              className={`px-4 py-2 rounded-full border transition-all ${
                filter === 'studio'
                  ? 'bg-[#C45F3F] text-white border-[#C45F3F] font-bold shadow-sm'
                  : 'bg-[var(--bg-card)] text-[var(--text-primary)] border-[var(--border-hairline)] hover:border-gray-400'
              }`}
            >
              COLLECTIVE (1)
            </button>
          </div>
        </div>

        {/* Campaign Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item: RingShowcaseItem) => {
            const isVideo = item.mediaFormat === 'video';
            const isGif = item.mediaFormat === 'gif';
            const isPlaying = playingVideoId === item.id;

            return (
              <div
                id={`campaign-${item.id}`}
                key={item.id}
                className="group flex flex-col rounded-3xl bg-[var(--bg-card)] border border-[var(--border-hairline)] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Media Preview Stage */}
                <div className="relative aspect-[4/3] bg-neutral-900 overflow-hidden flex items-center justify-center">
                  {isVideo ? (
                    <>
                      <video
                        src={item.src}
                        poster={item.posterSrc}
                        playsInline
                        muted
                        loop
                        autoPlay
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          const vid = e.currentTarget.previousElementSibling as HTMLVideoElement;
                          if (vid) {
                            if (vid.paused) {
                              vid.play();
                              setPlayingVideoId(item.id);
                            } else {
                              vid.pause();
                              setPlayingVideoId(null);
                            }
                          }
                        }}
                        className="absolute bottom-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-[#1388E5] transition-colors backdrop-blur-sm"
                        aria-label="Toggle playback"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-sm text-white font-mono text-[10px] uppercase font-bold tracking-wider">
                        VIDEO REEL · 30FPS
                      </span>
                    </>
                  ) : isGif ? (
                    <>
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#FFD400] text-[#211529] font-mono text-[10px] uppercase font-bold tracking-wider">
                        LOOPING GIF · 60FPS
                      </span>
                    </>
                  ) : (
                    <>
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white font-mono text-[10px] uppercase font-bold tracking-wider">
                        ILLUSTRATION
                      </span>
                    </>
                  )}

                  {/* Accent Corner Flash */}
                  <div
                    className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-20"
                    style={{
                      background: `radial-gradient(circle at top right, ${item.accentColor}, transparent 70%)`,
                    }}
                  />
                </div>

                {/* Card Content Body */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    {/* Index & Category & Metric */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                        {item.indexLabel} / {item.category}
                      </span>
                      <span
                        className="font-mono text-[11px] font-semibold px-2.5 py-0.5 rounded-full text-[#211529]"
                        style={{ backgroundColor: item.accentColor }}
                      >
                        {item.metricsBadge}
                      </span>
                    </div>

                    <h3 className="text-xl font-extrabold text-[var(--text-primary)] tracking-tight leading-snug mb-2 group-hover:text-[#1388E5] transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  {/* Footer / Meta */}
                  <div className="pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[var(--text-muted)] block text-[11px]">Client</span>
                      <a
                        href={item.clientUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-bold text-[var(--text-primary)] hover:text-[#1388E5] inline-flex items-center gap-1"
                      >
                        {item.client}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <div className="text-right">
                      <span className="text-[var(--text-muted)] block text-[11px]">Artist Lead</span>
                      <a
                        href={`/artists#${item.artistId}`}
                        className="font-bold text-[var(--text-primary)] hover:text-[#1388E5] underline"
                      >
                        {item.artistName}
                      </a>
                    </div>
                  </div>

                  {/* Inquire Action Button */}
                  <button
                    type="button"
                    onClick={() => onOpenInquiry?.(item.category, item.artistId)}
                    className="mt-4 w-full py-2.5 px-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:bg-[#211529] hover:text-[#F6EDE4] text-[var(--text-primary)] font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>COMMISSION THIS STYLE</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
