'use client';

import React from 'react';
import { SITE_COPY } from '@/data/siteContent';
import { Sparkles, Eye, Palette, Film } from 'lucide-react';

export function WhyHumanArt() {
  return (
    <section
      id="manifesto"
      className="relative w-full py-24 md:py-36 bg-[var(--bg-surface)] border-t border-[var(--border-hairline)]"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-[#211529] text-[#F6EDE4] font-bold">
            01 / WHY HUMAN ART WINS
          </span>
          <span className="font-mono text-xs text-[var(--text-muted)] tracking-wider">
            THE MANIFESTO FOR CHARACTER AI
          </span>
        </div>

        {/* Big Editorial Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          <div className="lg:col-span-8">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[var(--text-primary)] tracking-tight leading-[1.08] mb-8">
              {SITE_COPY.manifestoHeadline}
            </h2>
            <p className="text-lg sm:text-xl text-[var(--text-muted)] leading-relaxed font-normal max-w-3xl">
              {SITE_COPY.manifestoBody}
            </p>

            {/* Manifesto Pills */}
            <div className="flex flex-wrap gap-3 mt-8">
              {SITE_COPY.manifestoPills.map((pill, idx) => {
                const colors = ['#FFD400', '#1388E5', '#FF66B2'];
                const accent = colors[idx % colors.length];
                return (
                  <span
                    key={pill}
                    className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-semibold px-4 py-2 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: accent }}
                    />
                    {pill}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-4 bg-[var(--bg-card)] rounded-3xl p-6 sm:p-8 border border-[var(--border-hairline)] shadow-lg relative overflow-hidden">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[#FFD400]" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                HUMAN RETENTION BENCHMARK
              </span>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-[var(--text-muted)]">Generic AI Ad</span>
                  <span className="font-bold text-[#C45F3F]">0.4s Drop-off</span>
                </div>
                <div className="w-full bg-[var(--bg-surface)] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#C45F3F] h-full w-[12%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-[var(--text-primary)] font-bold">Epiphrame Hand-Crafted</span>
                  <span className="font-bold text-[#1E7E48]">3.8s Hook Hold (9.5x)</span>
                </div>
                <div className="w-full bg-[var(--bg-surface)] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#1E7E48] h-full w-[95%]" />
                </div>
              </div>
            </div>
            <p className="font-mono text-[11px] text-[var(--text-muted)] mt-5 leading-normal">
              *Verified across Cycle AI & Hangjam TikTok & Reels campaign cohorts.
            </p>
          </div>
        </div>

        {/* Featured Visual: Studio Isometric Key Art */}
        <div className="relative rounded-3xl overflow-hidden border border-[var(--border-hairline)] bg-[var(--bg-card)] shadow-2xl mb-16">
          <div className="aspect-[16/9] md:aspect-[21/9] w-full relative">
            <img
              src="/assets/showcase/studio-isometric.webp"
              alt="Inside the Epiphrame Creative Lab"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#211529]/80 via-transparent to-transparent flex items-end p-6 sm:p-10">
              <div className="max-w-2xl text-white">
                <span className="font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-[#1388E5] text-white font-bold mb-3 inline-block">
                  INSIDE THE LAB · 100% HAND-DRAWN
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
                  Where quirky storytelling meets viral ad performance.
                </h3>
                <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-light">
                  From first thumbnail sketch on Procreate to frame-by-frame 2D animation, our artists build believable characters that gamers and roleplayers fall in love with.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-hairline)] shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#FFD400]/20 text-[#211529] flex items-center justify-center mb-6">
              <Eye className="w-6 h-6 text-[#211529]" />
            </div>
            <h4 className="text-xl font-extrabold text-[var(--text-primary)] mb-3">
              Uncanny Valley Free
            </h4>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              No six-fingered hands, melted pupils, or plastic sheen. Every silhouette, fabric fold, and smirk is placed with human intent.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-hairline)] shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#1388E5]/20 text-[#1388E5] flex items-center justify-center mb-6">
              <Palette className="w-6 h-6 text-[#1388E5]" />
            </div>
            <h4 className="text-xl font-extrabold text-[var(--text-primary)] mb-3">
              Universe & Lore Cohesion
            </h4>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              We design full expression turnaround sheets (blush, angry, flirty, cryptic) that keep AI character bots consistent across endless chats.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-hairline)] shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#FF66B2]/20 text-[#FF66B2] flex items-center justify-center mb-6">
              <Film className="w-6 h-6 text-[#FF66B2]" />
            </div>
            <h4 className="text-xl font-extrabold text-[var(--text-primary)] mb-3">
              Conversion-Ready Formats
            </h4>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Delivered in 9:16 TikTok ad reels with burned-in captions, Discord reaction GIF stickers, and 4K App Store promotional panoramas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
