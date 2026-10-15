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
          <span className="font-mono text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-[#141316] text-[#F9F6F0] font-extrabold border border-[#141316] shadow-[2px_2px_0px_0px_#FF425E]">
            01 / WHY HUMAN ART WINS
          </span>
          <span className="font-mono text-xs text-[var(--text-muted)] font-bold tracking-wider">
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
                const accents = ['#FF425E', '#F3A72E', '#204A36'];
                const accent = accents[idx % accents.length];
                return (
                  <span
                    key={pill}
                    className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-bold px-4 py-2 rounded-full border border-[#141316]/20 bg-[var(--bg-card)] text-[var(--text-primary)] shadow-[2px_2px_0px_0px_#141316]"
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

          <div className="lg:col-span-4 bg-[var(--bg-card)] rounded-3xl p-6 sm:p-8 border border-[#141316]/20 shadow-[5px_5px_0px_0px_#141316] relative overflow-hidden">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[#F3A72E]" />
              <span className="font-mono text-xs font-black uppercase tracking-wider text-[var(--text-primary)]">
                HUMAN RETENTION BENCHMARK
              </span>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-[var(--text-muted)] font-semibold">Generic AI Ad</span>
                  <span className="font-bold text-[#8C4351]">0.4s Drop-off</span>
                </div>
                <div className="w-full bg-[var(--bg-surface)] h-2.5 rounded-full overflow-hidden border border-[#141316]/15">
                  <div className="bg-[#8C4351] h-full w-[12%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-[var(--text-primary)] font-bold">Epiphrame Hand-Crafted</span>
                  <span className="font-bold text-[#204A36]">3.8s Hook Hold (9.5x)</span>
                </div>
                <div className="w-full bg-[var(--bg-surface)] h-2.5 rounded-full overflow-hidden border border-[#141316]/15">
                  <div className="bg-[#204A36] h-full w-[95%]" />
                </div>
              </div>
            </div>
            <p className="font-mono text-[11px] text-[var(--text-muted)] mt-5 leading-normal">
              *Verified across Cycle AI & Hangjam TikTok & Reels campaign cohorts.
            </p>
          </div>
        </div>

        {/* Featured Visual: Studio Isometric Key Art */}
        <div className="relative rounded-3xl overflow-hidden border border-[#141316]/20 bg-[var(--bg-card)] shadow-[6px_6px_0px_0px_#141316] mb-16">
          <div className="aspect-[16/9] md:aspect-[21/9] w-full relative">
            <img
              src="/assets/showcase/studio-isometric.webp"
              alt="Inside the Epiphrame Creative Lab"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141316]/90 via-transparent to-transparent flex items-end p-6 sm:p-10">
              <div className="max-w-2xl text-white">
                <span className="font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-[#FF425E] text-white font-extrabold border border-white/30 mb-3 inline-block shadow-sm">
                  INSIDE THE LAB · 100% HAND-DRAWN
                </span>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
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
          <div className="p-8 rounded-2xl bg-[var(--bg-card)] border border-[#141316]/18 shadow-[3px_3px_0px_0px_#141316] hover:shadow-[5px_5px_0px_0px_#FF425E] hover:-translate-y-0.5 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#141316] border border-[#141316] text-[#F3A72E] flex items-center justify-center mb-6 shadow-sm">
              <Eye className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h4 className="text-xl font-black text-[var(--text-primary)] mb-3">
              Uncanny Valley Free
            </h4>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              No six-fingered hands, melted pupils, or plastic sheen. Every silhouette, fabric fold, and smirk is placed with human intent.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[var(--bg-card)] border border-[#141316]/18 shadow-[3px_3px_0px_0px_#141316] hover:shadow-[5px_5px_0px_0px_#FF425E] hover:-translate-y-0.5 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#141316] border border-[#141316] text-[#FF425E] flex items-center justify-center mb-6 shadow-sm">
              <Palette className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h4 className="text-xl font-black text-[var(--text-primary)] mb-3">
              Universe & Lore Cohesion
            </h4>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              We design full expression turnaround sheets (blush, angry, flirty, cryptic) that keep AI character bots consistent across endless chats.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[var(--bg-card)] border border-[#141316]/18 shadow-[3px_3px_0px_0px_#141316] hover:shadow-[5px_5px_0px_0px_#FF425E] hover:-translate-y-0.5 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#141316] border border-[#141316] text-[#204A36] dark:text-[#52B788] flex items-center justify-center mb-6 shadow-sm">
              <Film className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h4 className="text-xl font-black text-[var(--text-primary)] mb-3">
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
