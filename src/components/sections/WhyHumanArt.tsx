'use client';

import React from 'react';
import { SITE_COPY } from '@/data/siteContent';
import { Layers, Sparkles, Wand2, Film } from 'lucide-react';

export function WhyHumanArt() {
  return (
    <section
      id="process"
      className="relative w-full py-24 md:py-36 bg-[var(--bg-surface)] border-t border-[var(--border-hairline)]"
    >
      <div id="manifesto" className="absolute -top-16" />
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex items-center gap-2.5 mb-6">
          <span className="font-mono text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-[#141316] text-[#F9F6F0] dark:bg-[#F9F6F0] dark:text-[#141316] font-bold border border-[#141316] shadow-[2px_2px_0px_0px_#FF425E]">
            01 / STUDIO CRAFT
          </span>
          <span className="font-mono text-xs text-[var(--text-muted)] font-bold tracking-wider">
            FROM FIRST THUMBNAIL TO 60FPS DELIVERY
          </span>
        </div>

        {/* Editorial Headline & Studio Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          <div className="lg:col-span-8">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[var(--text-primary)] tracking-tight leading-[1.08] mb-6">
              Original characters built to survive the feed.
            </h2>
            <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl">
              Template prompts blur together on social feeds. We develop characters from thumbnail silhouettes to full turnaround model sheets and 2D keyframe animation, giving AI platforms and game worlds an unmistakable visual signature.
            </p>

            <div className="flex flex-wrap gap-2.5 mt-6 font-mono text-xs">
              <span className="px-3.5 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-hairline)] text-[var(--text-primary)] font-bold">
                Cintiq &amp; Procreate Roughs
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-hairline)] text-[var(--text-primary)] font-bold">
                Full Turnarounds &amp; Expression Packs
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-hairline)] text-[var(--text-primary)] font-bold">
                60fps Live2D &amp; 9:16 Video Reels
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 rounded-3xl p-6 sm:p-7 bg-[var(--bg-card)] border border-[#141316]/18 shadow-[4px_4px_0px_0px_#141316] dark:shadow-[4px_4px_0px_0px_#FF425E]">
            <h3 className="font-mono text-xs font-black uppercase tracking-wider text-[var(--text-primary)] mb-3">
              Production Standards
            </h3>
            <ul className="space-y-3 font-mono text-xs text-[var(--text-muted)]">
              <li className="flex items-start gap-2">
                <span className="text-[#FF425E] font-bold">01.</span>
                <span>Anatomy &amp; silhouette verified at 100px mobile icon scale before cleanup.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#F3A72E] font-bold">02.</span>
                <span>Complete color schemes formatted with hex tokens for marketing teams.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#204A36] dark:text-[#52B788] font-bold">03.</span>
                <span>Layered PSDs &amp; Live2D rigs prepared for in-engine or paid video exports.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Featured Visual: Studio Isometric Key Art */}
        <div id="character-lab" className="relative rounded-3xl overflow-hidden border border-[#141316]/20 bg-[var(--bg-card)] shadow-[5px_5px_0px_0px_#141316] mb-14 scroll-mt-24">
          <div className="aspect-[16/9] md:aspect-[21/9] w-full relative">
            <img
              src="/assets/showcase/studio-isometric.webp"
              alt="Inside the Epiphrame Creative Lab"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141316]/90 via-[#141316]/30 to-transparent flex items-end p-6 sm:p-10">
              <div className="max-w-xl text-white">
                <span className="font-mono text-[11px] uppercase tracking-widest px-3 py-1 rounded-full bg-[#FF425E] text-white font-extrabold border border-white/30 mb-2.5 inline-block">
                  INSIDE THE WORKSHOP
                </span>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-1.5">
                  Hand-crafted character IP for interactive worlds.
                </h3>
                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-normal">
                  Our collective handles every phase in-house: concept thumbnails, model sheets, Discord sticker reactions, and animated paid social hooks.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pipeline Stages (Concrete, Not Cliché Feature Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 rounded-2xl bg-[var(--bg-card)] border border-[#141316]/18 shadow-[3px_3px_0px_0px_#141316] dark:shadow-[3px_3px_0px_0px_#F9F6F0]/20">
            <span className="font-mono text-xs font-black text-[#FF425E] mb-2 block">
              PHASE 01
            </span>
            <h4 className="text-lg font-black text-[var(--text-primary)] mb-2">
              Thumbnails &amp; Silhouette
            </h4>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              We sketch contrasting silhouette shapes first to guarantee the character is readable in a fraction of a second while scrolling vertical feeds.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[var(--bg-card)] border border-[#141316]/18 shadow-[3px_3px_0px_0px_#141316] dark:shadow-[3px_3px_0px_0px_#F9F6F0]/20">
            <span className="font-mono text-xs font-black text-[#F3A72E] mb-2 block">
              PHASE 02
            </span>
            <h4 className="text-lg font-black text-[var(--text-primary)] mb-2">
              Turnarounds &amp; Expressions
            </h4>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Rigid model turnaround sheets with multi-angle perspectives and emotional expression suites so roleplay bots maintain visual consistency.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[var(--bg-card)] border border-[#141316]/18 shadow-[3px_3px_0px_0px_#141316] dark:shadow-[3px_3px_0px_0px_#F9F6F0]/20">
            <span className="font-mono text-xs font-black text-[#204A36] dark:text-[#52B788] mb-2 block">
              PHASE 03
            </span>
            <h4 className="text-lg font-black text-[var(--text-primary)] mb-2">
              Keyframe Motion &amp; Hooks
            </h4>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Frame-by-frame 2D animation, Live2D rigging, and sound-synced video cuts formatted directly for 9:16 TikTok, Reels, and Discord sticker drops.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
