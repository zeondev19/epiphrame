'use client';

import React from 'react';

export function WhyHumanArt() {
  return (
    <section
      id="character-lab"
      className="relative w-full py-24 md:py-36 bg-[#F6EDE4]/60 backdrop-blur-sm border-t border-white/30 scroll-mt-20"
    >
      <div id="manifesto" className="absolute -top-16" />
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex items-center gap-2.5 mb-6">
          <span className="tracking-[0.2em] uppercase text-xs font-semibold px-3.5 py-1.5 rounded-full bg-[#211529] text-[#FFD400] border border-white/10 shadow-soft-1">
            01 / CHARACTER LAB &amp; STUDIO CRAFT
          </span>
          <span className="tracking-[0.2em] uppercase text-xs font-semibold text-[#5A5560] hidden sm:inline">
            FROM THUMBNAIL SKETCH TO 60FPS ACQUISITION HOOK
          </span>
        </div>

        {/* Editorial Headline & Studio Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          <div className="lg:col-span-8">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-syne text-[#211529] tracking-tighter leading-[1.06] mb-6">
              Original characters engineered to stop the scroll.
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#5A5560] leading-relaxed max-w-2xl">
              Template prompts blur together on social feeds. We develop bespoke characters from thumbnail silhouettes to full turnaround model sheets and 2D keyframe animation, giving AI companion apps and roleplay bots an unmistakable visual signature.
            </p>

            <div className="flex flex-wrap gap-2.5 mt-6 tracking-[0.2em] uppercase text-xs font-semibold">
              <span className="px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-black/5 text-[#211529] shadow-soft-1">
                Hand-Drawn Pencil &amp; Cintiq Roughs
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-black/5 text-[#211529] shadow-soft-1">
                Roleplay Bot Turnaround Sheets
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-black/5 text-[#211529] shadow-soft-1">
                60fps Live2D &amp; Vertical UA Hooks
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 rounded-3xl p-6 sm:p-7 bg-white/80 backdrop-blur-md border border-white/40 shadow-soft-2">
            <h3 className="tracking-[0.2em] uppercase text-xs font-semibold text-[#211529] mb-4">
              Production Standards
            </h3>
            <ul className="space-y-3 font-sans text-xs text-[#5A5560]">
              <li className="flex items-start gap-2.5">
                <span className="text-[#FF425E] font-bold">01.</span>
                <span>Anatomy &amp; silhouette verified at 100px mobile icon scale before cleanup.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#F3A72E] font-bold">02.</span>
                <span>Complete color schemes formatted with hex tokens for marketing teams.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#204A36] font-bold">03.</span>
                <span>Layered PSDs &amp; Live2D rigs prepared for in-engine or paid video exports.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Featured Visual: Studio Isometric Key Art */}
        <div className="relative rounded-3xl overflow-hidden border border-white/40 bg-[#211529] shadow-soft-2 mb-14">
          <div className="aspect-[16/9] md:aspect-[21/9] w-full relative">
            <img
              src="/assets/showcase/studio-isometric.webp"
              alt="Inside the Epiphrame Creative Lab"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#211529]/90 via-[#211529]/30 to-transparent flex items-end p-6 sm:p-10">
              <div className="max-w-xl text-white">
                <span className="tracking-[0.2em] uppercase text-xs font-semibold px-3 py-1 rounded-full bg-[#FF425E] text-white border border-white/20 mb-3 inline-block shadow-soft-1">
                  INSIDE THE CHARACTER LAB
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-syne tracking-tighter mb-2">
                  Hand-crafted character IP for AI companion apps.
                </h3>
                <p className="font-sans text-xs sm:text-sm text-gray-200 leading-relaxed font-normal">
                  Our collective handles every phase in-house: concept thumbnails, roleplay bot turnarounds, community reactions, and animated vertical video hooks.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pipeline Stages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 rounded-3xl bg-white/80 backdrop-blur-md border border-white/40 shadow-soft-1 hover:shadow-soft-2 transition-all">
            <span className="tracking-[0.2em] uppercase text-xs font-semibold text-[#FF425E] mb-2 block">
              PHASE 01
            </span>
            <h4 className="text-lg font-black font-syne tracking-tighter text-[#211529] mb-2">
              Thumbnails &amp; Silhouette
            </h4>
            <p className="font-sans text-xs text-[#5A5560] leading-relaxed">
              We sketch contrasting silhouette shapes first to guarantee the character is readable in a fraction of a second while scrolling vertical feeds.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-white/80 backdrop-blur-md border border-white/40 shadow-soft-1 hover:shadow-soft-2 transition-all">
            <span className="tracking-[0.2em] uppercase text-xs font-semibold text-[#F3A72E] mb-2 block">
              PHASE 02
            </span>
            <h4 className="text-lg font-black font-syne tracking-tighter text-[#211529] mb-2">
              Turnarounds &amp; Expressions
            </h4>
            <p className="font-sans text-xs text-[#5A5560] leading-relaxed">
              Rigid model turnaround sheets with multi-angle perspectives and emotional expression suites so roleplay bots maintain visual consistency.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-white/80 backdrop-blur-md border border-white/40 shadow-soft-1 hover:shadow-soft-2 transition-all">
            <span className="tracking-[0.2em] uppercase text-xs font-semibold text-[#204A36] mb-2 block">
              PHASE 03
            </span>
            <h4 className="text-lg font-black font-syne tracking-tighter text-[#211529] mb-2">
              Keyframe Motion &amp; Hooks
            </h4>
            <p className="font-sans text-xs text-[#5A5560] leading-relaxed">
              Frame-by-frame 2D animation, Live2D rigging, and sound-synced video cuts formatted directly for 9:16 TikTok, Reels, and Discord reactions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
