'use client';

import React from 'react';
import Link from 'next/link';
import { ARTISTS_ROSTER, ArtistProfile } from '@/data/siteContent';
import { ArrowUpRight, Award, Sparkles } from 'lucide-react';

interface ArtistRosterTeaserProps {
  onOpenInquiry?: (projectType?: string, artistId?: string) => void;
}

export function ArtistRosterTeaser({ onOpenInquiry }: ArtistRosterTeaserProps) {
  return (
    <section
      id="artists"
      className="relative w-full py-24 md:py-36 bg-[var(--bg-surface)] border-t border-[var(--border-hairline)]"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-[#FF66B2] text-white font-bold">
                03 / ARTIST ROSTER TEASER
              </span>
              <span className="font-mono text-xs text-[var(--text-muted)] tracking-wider">
                THE SQUAD BEHIND THE PIXELS
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight">
              Meet the Human Illustrators
            </h2>
            <p className="text-base sm:text-lg text-[var(--text-muted)] mt-2 max-w-2xl">
              Zero generative prompt wrappers. Real human artists flexing 50M+ combined campaign views for leading AI character and roleplay worlds.
            </p>
          </div>

          <Link
            href="/artists"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#211529] text-[#F6EDE4] font-mono text-xs font-bold tracking-wider hover:bg-[#1388E5] transition-colors shadow-md"
          >
            <span>EXPLORE FULL /ARTISTS SHOWCASE</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Artist Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {ARTISTS_ROSTER.map((artist: ArtistProfile) => {
            return (
              <div
                key={artist.id}
                className="group flex flex-col justify-between rounded-3xl bg-[var(--bg-card)] border border-[var(--border-hairline)] p-6 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                {/* Top Avatar & Emblem */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center p-2 border-2 transition-transform group-hover:scale-110 shadow-sm"
                      style={{
                        backgroundColor: `${artist.emblemColor}18`,
                        borderColor: artist.emblemColor,
                      }}
                    >
                      <img
                        src={artist.avatarSrc}
                        alt={`${artist.name} Mascot Avatar`}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: artist.emblemColor }}
                    />
                  </div>

                  <h3 className="text-2xl font-black text-[var(--text-primary)] tracking-tight mb-1">
                    {artist.name}
                  </h3>

                  <p
                    className="font-mono text-xs font-bold uppercase tracking-wider mb-2"
                    style={{ color: artist.emblemColor }}
                  >
                    {artist.role}
                  </p>

                  <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                    {artist.specialty}
                  </p>

                  {/* Sombong Badges */}
                  <div className="space-y-1.5 mb-6">
                    {artist.sombongBadges.map((badge) => (
                      <div
                        key={badge}
                        className="flex items-center gap-1.5 font-mono text-[10px] text-[var(--text-primary)] bg-[var(--bg-surface)] px-2.5 py-1 rounded-lg border border-[var(--border-hairline)]"
                      >
                        <Award
                          className="w-3 h-3 flex-shrink-0"
                          style={{ color: artist.emblemColor }}
                        />
                        <span className="truncate">{badge}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-[var(--border-hairline)] space-y-2">
                  <Link
                    href={`/artists#${artist.id}`}
                    className="w-full py-2.5 px-3 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--text-primary)] hover:text-[#F6EDE4] text-[var(--text-primary)] font-mono text-xs font-bold transition-colors flex items-center justify-center gap-1"
                  >
                    <span>VIEW PORTFOLIO & SKETCH</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => onOpenInquiry?.('character-design', artist.id)}
                    className="w-full py-1.5 text-center font-mono text-[11px] text-[var(--text-muted)] hover:text-[#1388E5] underline transition-colors"
                  >
                    Book {artist.name} Directly
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Big Banner CTA with vibe tile pattern */}
        <div className="relative rounded-3xl overflow-hidden border border-[var(--border-hairline)] shadow-2xl bg-[#211529] text-white p-8 sm:p-14">
          {/* Subtle Background Pattern */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none bg-repeat"
            style={{
              backgroundImage: 'url(/assets/patterns/vibe-tile-pattern.webp)',
              backgroundSize: '240px auto',
            }}
          />

          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFD400] animate-ping" />
              <span className="font-mono text-xs font-bold tracking-widest uppercase text-[#FFD400]">
                ACCEPTING Q4 2026 CAMPAIGN COMMISSIONS
              </span>
            </div>

            <h3 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
              Ready to give your AI character app real human soul?
            </h3>

            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-8 max-w-2xl">
              Commission our collective to craft thumb-stopping video ad reels, custom 60fps reaction stickers, or full multi-expression character sprite sheets.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onOpenInquiry?.()}
                className="py-3.5 px-8 rounded-full bg-[#FFD400] text-[#211529] font-extrabold text-sm tracking-wide uppercase hover:bg-white transition-all shadow-lg active:scale-95 flex items-center gap-2"
              >
                <span>LET&apos;S TALK / START INQUIRY</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <Link
                href="/artists"
                className="py-3.5 px-6 rounded-full border border-white/30 hover:border-white text-white font-mono text-xs font-bold tracking-wider uppercase transition-colors flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#FFD400]" />
                SEE SKETCH VS FINAL SLIDERS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
