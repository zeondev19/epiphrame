'use client';

import React from 'react';
import Link from 'next/link';
import { ARTISTS_ROSTER, ArtistProfile } from '@/data/siteContent';
import { ArrowUpRight, Award, Sparkles } from 'lucide-react';

export function ArtistCollectiveStrip() {
  return (
    <section
      id="collective"
      className="relative w-full py-24 md:py-36 bg-[var(--bg-surface)] border-t border-[var(--border-hairline)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-[#141316] text-[#F9F6F0] dark:bg-[#F9F6F0] dark:text-[#141316] font-black border border-[#141316] shadow-[2px_2px_0px_0px_#FF425E]">
                04 / THE COLLECTIVE : MEET THE HANDS BEHIND THE ART
              </span>
              <span className="font-mono text-xs text-[var(--text-muted)] font-bold tracking-wider hidden sm:inline-block">
                0% AI SLOP
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight">
              Human Illustrators Behind Every Viral Feed
            </h2>
            <p className="text-base sm:text-lg text-[var(--text-muted)] mt-2 max-w-2xl">
              Real human artists flexing 50M+ combined campaign views for leading AI character and roleplay worlds.
            </p>
          </div>

          <Link
            href="/artists"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#FF425E] text-white font-mono text-xs font-black tracking-wider hover:bg-[#141316] dark:hover:bg-[#FFD400] dark:hover:text-[#141316] border border-[#141316] shadow-[3px_3px_0px_0px_#141316] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all flex-shrink-0"
          >
            <span>VIEW FULL ARTIST VAULT (/artists)</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </Link>
        </div>

        {/* 4 Interactive Artist Trading Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ARTISTS_ROSTER.map((artist: ArtistProfile) => {
            const previewSrc =
              artist.sketchComparison?.finalSrc ||
              artist.vaultItems?.[0]?.posterSrc ||
              '/assets/cards/card-01.webp';

            return (
              <div
                key={artist.id}
                className="group flex flex-col justify-between rounded-3xl bg-[var(--bg-card)] border border-[#141316]/20 dark:border-[#F9F6F0]/20 p-6 shadow-[3px_3px_0px_0px_#141316] dark:shadow-[3px_3px_0px_0px_#FF425E] hover:shadow-[6px_6px_0px_0px_#FF425E] hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden"
              >
                <div>
                  {/* Top Header: Emblem + Color Pip */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center p-2.5 border-2 transition-transform group-hover:scale-110 shadow-sm"
                      style={{
                        backgroundColor: `${artist.emblemColor}22`,
                        borderColor: artist.emblemColor,
                      }}
                    >
                      <img
                        src={artist.avatarSrc}
                        alt={`${artist.name} Emblem`}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>

                    <span
                      className="w-3.5 h-3.5 rounded-full border border-[#141316]"
                      style={{ backgroundColor: artist.emblemColor }}
                      title={`Theme: ${artist.emblemColor}`}
                    />
                  </div>

                  {/* Name & Role */}
                  <h3 className="text-2xl font-black text-[var(--text-primary)] tracking-tight mb-1">
                    {artist.name}
                  </h3>
                  <p
                    className="font-mono text-xs font-black uppercase tracking-wider mb-2"
                    style={{ color: artist.emblemColor }}
                  >
                    {artist.role}
                  </p>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-5">
                    {artist.specialty}
                  </p>

                  {/* Sombong / Flex Achievement Pills */}
                  <div className="space-y-1.5 mb-5">
                    {artist.sombongBadges.map((badge) => (
                      <div
                        key={badge}
                        className="flex items-center gap-1.5 font-mono text-[10px] text-[var(--text-primary)] font-bold bg-[var(--bg-surface)] px-2.5 py-1.5 rounded-xl border border-[var(--border-hairline)] shadow-xs"
                      >
                        <Award
                          className="w-3.5 h-3.5 flex-shrink-0"
                          style={{ color: artist.emblemColor }}
                        />
                        <span className="truncate">{badge}</span>
                      </div>
                    ))}
                  </div>

                  {/* Artwork Thumbnail Preview */}
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-[#141316]/15 dark:border-[#F9F6F0]/15 mb-5 bg-neutral-900">
                    <img
                      src={previewSrc}
                      alt={`${artist.name} Sample Artwork`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                    <span className="absolute bottom-2 left-2.5 font-mono text-[10px] text-white font-extrabold px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs">
                      VAULT PREVIEW
                    </span>
                  </div>
                </div>

                {/* Direct Link to Artist Vault */}
                <Link
                  href={`/artists#${artist.id}`}
                  className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface)] hover:bg-[#FF425E] hover:text-white border border-[#141316]/20 font-mono text-xs font-black transition-all group/cta"
                >
                  <span>EXPLORE {artist.name.toUpperCase()}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
