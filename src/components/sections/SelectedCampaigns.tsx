'use client';

import React, { useState, useRef } from 'react';
import { RING_SHOWCASE_ITEMS, RingShowcaseItem } from '@/data/siteContent';
import { Play, Pause, Volume2, VolumeX, ExternalLink, ArrowUpRight } from 'lucide-react';

function CampaignVideoPlayer({ src, posterSrc, title }: { src: string; posterSrc: string; title: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const next = !videoRef.current.muted;
    videoRef.current.muted = next;
    setIsMuted(next);
  };

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        poster={posterSrc}
        playsInline
        muted={isMuted}
        loop
        autoPlay
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 z-10">
        <button
          type="button"
          onClick={toggleMute}
          className="p-2 rounded-full bg-black/70 text-white hover:bg-[#FF425E] transition-colors backdrop-blur-sm"
          aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
          title={isMuted ? 'Unmute audio' : 'Mute audio'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
        <button
          type="button"
          onClick={togglePlay}
          className="p-2 rounded-full bg-black/70 text-white hover:bg-[#FF425E] transition-colors backdrop-blur-sm"
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
          title={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
      </div>
      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#141316]/90 border border-white/20 backdrop-blur-sm text-[#F3A72E] font-mono text-[10px] uppercase font-bold tracking-wider">
        VIDEO REEL · 30FPS
      </span>
    </>
  );
}

interface SelectedCampaignsProps {
  onOpenInquiry?: (projectType?: string, artistId?: string) => void;
}

export function SelectedCampaigns({ onOpenInquiry }: SelectedCampaignsProps) {
  const [filter, setFilter] = useState<'all' | 'cycle' | 'hangjam' | 'studio'>('all');

  const filteredItems = RING_SHOWCASE_ITEMS.filter((item) => {
    if (filter === 'cycle') return item.client.toLowerCase().includes('cycle');
    if (filter === 'hangjam') return item.client.toLowerCase().includes('hangjam');
    if (filter === 'studio') return item.client.toLowerCase().includes('epiphrame');
    return true;
  });

  return (
    <section
      id="showcase"
      className="relative w-full py-24 md:py-36 bg-[var(--bg-surface)] border-t border-[var(--border-hairline)]"
    >
      <div id="campaigns" className="absolute -top-16" />
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-[#FF425E] text-white font-extrabold border border-[#141316] shadow-[2px_2px_0px_0px_#141316]">
                02 / SELECTED CAMPAIGNS
              </span>
              <span className="font-mono text-xs text-[var(--text-muted)] font-bold tracking-wider">
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
          <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full border border-[#141316] transition-all ${
                filter === 'all'
                  ? 'bg-[#141316] text-[#F9F6F0] font-black shadow-[2px_2px_0px_0px_#FF425E]'
                  : 'bg-[var(--bg-card)] text-[var(--text-primary)] hover:bg-[#F3A72E]/15'
              }`}
            >
              ALL ({RING_SHOWCASE_ITEMS.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('cycle')}
              className={`px-4 py-2 rounded-full border border-[#141316] transition-all ${
                filter === 'cycle'
                  ? 'bg-[#FF425E] text-white font-black shadow-[2px_2px_0px_0px_#141316]'
                  : 'bg-[var(--bg-card)] text-[var(--text-primary)] hover:bg-[#F3A72E]/15'
              }`}
            >
              CYCLE AI (3)
            </button>
            <button
              type="button"
              onClick={() => setFilter('hangjam')}
              className={`px-4 py-2 rounded-full border border-[#141316] transition-all ${
                filter === 'hangjam'
                  ? 'bg-[#204A36] text-white font-black shadow-[2px_2px_0px_0px_#141316]'
                  : 'bg-[var(--bg-card)] text-[var(--text-primary)] hover:bg-[#F3A72E]/15'
              }`}
            >
              HANGJAM (4)
            </button>
            <button
              type="button"
              onClick={() => setFilter('studio')}
              className={`px-4 py-2 rounded-full border border-[#141316] transition-all ${
                filter === 'studio'
                  ? 'bg-[#F3A72E] text-[#141316] font-black shadow-[2px_2px_0px_0px_#141316]'
                  : 'bg-[var(--bg-card)] text-[var(--text-primary)] hover:bg-[#F3A72E]/15'
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

            return (
              <div
                id={`campaign-${item.id}`}
                key={item.id}
                className="group flex flex-col rounded-3xl bg-[var(--bg-card)] border border-[#141316]/18 overflow-hidden shadow-[3px_3px_0px_0px_#141316] hover:shadow-[6px_6px_0px_0px_#FF425E] hover:-translate-y-1 transition-all duration-300"
              >
                {/* Media Preview Stage */}
                <div className="relative aspect-[4/3] bg-neutral-900 overflow-hidden flex items-center justify-center border-b border-[#141316]/18">
                  {isVideo ? (
                    <CampaignVideoPlayer
                      src={item.src}
                      posterSrc={item.posterSrc}
                      title={item.title}
                    />
                  ) : isGif ? (
                    <>
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#F3A72E] border border-[#141316] text-[#141316] font-mono text-[10px] uppercase font-bold tracking-wider">
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
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-sm text-white font-mono text-[10px] uppercase font-bold tracking-wider">
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
                      <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-bold">
                        {item.indexLabel} / {item.category}
                      </span>
                      <span
                        className="font-mono text-[11px] font-extrabold px-3 py-0.5 rounded-full text-[#141316] border border-[#141316]/25"
                        style={{ backgroundColor: item.accentColor || '#F3A72E' }}
                      >
                        {item.metricsBadge}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-[var(--text-primary)] tracking-tight leading-snug mb-2 group-hover:text-[#FF425E] transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  {/* Footer / Meta */}
                  <div className="pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[var(--text-muted)] block text-[11px] font-bold">Client</span>
                      <a
                        href={item.clientUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-black text-[var(--text-primary)] hover:text-[#FF425E] inline-flex items-center gap-1"
                      >
                        {item.client}
                        <ExternalLink className="w-3 h-3 stroke-[2.5]" />
                      </a>
                    </div>

                    <div className="text-right">
                      <span className="text-[var(--text-muted)] block text-[11px] font-bold">Artist Lead</span>
                      <a
                        href={`/artists#${item.artistId}`}
                        className="font-black text-[var(--text-primary)] hover:text-[#FF425E] underline"
                      >
                        {item.artistName}
                      </a>
                    </div>
                  </div>

                  {/* Inquire Action Button */}
                  <button
                    type="button"
                    onClick={() => onOpenInquiry?.(item.category, item.artistId)}
                    className="mt-4 w-full py-2.5 px-4 rounded-xl border border-[#141316] bg-[var(--bg-surface)] hover:bg-[#FF425E] hover:text-white text-[var(--text-primary)] font-mono text-xs font-black shadow-[2px_2px_0px_0px_#141316] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>COMMISSION THIS STYLE</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
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
