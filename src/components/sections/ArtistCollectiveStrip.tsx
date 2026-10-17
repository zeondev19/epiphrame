'use client';

import React from 'react';
import Link from 'next/link';
import { ARTISTS_ROSTER, ArtistProfile } from '@/data/siteContent';

export function ArtistCollectiveStrip() {
  return (
    <section
      id="playground"
      className="relative w-full py-20 md:py-32 bg-white/70 backdrop-blur-md border-t border-white/20"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="tracking-[0.2em] uppercase text-xs font-semibold text-[#FF425E] mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF425E]" />
              02 / RESIDENT ROSTER
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-syne text-[#211529] tracking-tighter">
              Meet the Resident Artists ✿
            </h2>
            <p className="font-sans text-base text-[#5A5560] mt-2 max-w-lg leading-relaxed">
              Four specialized 2D illustrators &amp; Live2D animators with distinct aesthetic signatures.
            </p>
          </div>

          <Link
            href="/artists"
            className="bg-[#211529] text-[#FFD400] hover:bg-[#FF425E] hover:text-white border border-white/20 shadow-soft-2 rounded-full px-6 py-3 font-bold text-xs uppercase tracking-wider hover:shadow-soft-lg hover:-translate-y-0.5 active:scale-95 transition-all flex-shrink-0 self-start lg:self-auto"
          >
            EXPLORE FULL ARTIST VAULT ↗
          </Link>
        </div>

        {/* Asymmetrical Bento Box Roster Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {ARTISTS_ROSTER.map((artist: ArtistProfile, idx: number) => {
            // Guarantee unique preview image prop per artist
            const previewSrc =
              artist.previewSrc ||
              artist.sketchComparison?.finalSrc ||
              artist.vaultItems?.[0]?.posterSrc ||
              '/assets/cards/card-01.webp';

            // Asymmetric Bento sizing: Iris (7) & Raka (5) on row 1, Nadia (5) & Bima (7) on row 2
            const bentoSpan = idx === 0 || idx === 3 ? 'md:col-span-7' : 'md:col-span-5';

            return (
              <Link
                key={artist.id}
                href={`/artists#${artist.id}`}
                className={`group relative flex flex-col rounded-3xl bg-[#F6EDE4]/70 backdrop-blur-md border border-white/40 p-6 shadow-soft-2 hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden ${bentoSpan}`}
              >
                {/* Header with Mascot & Name with Overlapping Negative Margin */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    {/* Overlapping Mascot Avatar with -mt-2 -ml-1 */}
                    <div
                      className="-mt-2 -ml-1 w-14 h-14 rounded-2xl flex items-center justify-center p-2 border border-white/40 shadow-soft-1 group-hover:scale-110 transition-transform flex-shrink-0"
                      style={{
                        backgroundColor: `${artist.emblemColor}25`,
                      }}
                    >
                      <img
                        src={artist.avatarSrc}
                        alt={`${artist.name}'s mascot`}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black font-syne text-[#211529] tracking-tighter group-hover:text-[#FF425E] transition-colors">
                        {artist.name}
                      </h3>
                      <p
                        className="tracking-[0.2em] uppercase text-[11px] font-semibold"
                        style={{ color: artist.emblemColor }}
                      >
                        {artist.role}
                      </p>
                    </div>
                  </div>

                  {/* Sombong Tag Overlap */}
                  <span className="hidden sm:inline-block font-mono text-[10px] uppercase font-bold px-2.5 py-1 rounded-full bg-white/80 border border-black/5 text-[#211529] shadow-soft-1">
                    Verified Lead
                  </span>
                </div>

                <p className="font-sans text-xs text-[#5A5560] leading-relaxed mb-4">
                  {artist.specialty}
                </p>

                {/* Unique Artwork Preview Stage */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/40 bg-[#211529]/10 shadow-inner mt-auto">
                  <img
                    src={previewSrc}
                    alt={`${artist.name} character preview`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#211529]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Badges Breaking Out with Negative Margins */}
                <div className="flex flex-wrap gap-1.5 mt-4 -mb-1">
                  {artist.sombongBadges.map((badge) => (
                    <span
                      key={badge}
                      className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-black/5 text-[#211529] shadow-soft-1 tracking-tight"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
