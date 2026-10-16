'use client';

import React from 'react';
import Link from 'next/link';
import { ARTISTS_ROSTER, ArtistProfile } from '@/data/siteContent';

export function ArtistCollectiveStrip() {
  return (
    <section
      id="playground"
      className="relative w-full py-20 md:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#211529] tracking-tight">
              Meet the Artists
            </h2>
            <p className="text-base text-[#5A5560] mt-2 max-w-lg">
              Four resident illustrators, each with their own style and flower mascot.
            </p>
          </div>

          <Link
            href="/artists"
            className="bg-[#FF66B2] text-white border-2 border-[#211529] shadow-[3px_3px_0px_#211529] rounded-full px-6 py-3 font-bold text-xs uppercase tracking-wider hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#211529] transition-all flex-shrink-0"
          >
            FULL ARTIST VAULT
          </Link>
        </div>

        {/* Artist Trading Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ARTISTS_ROSTER.map((artist: ArtistProfile) => {
            const previewSrc =
              artist.sketchComparison?.finalSrc ||
              artist.vaultItems?.[0]?.posterSrc ||
              '/assets/cards/card-01.webp';

            return (
              <Link
                key={artist.id}
                href={`/artists#${artist.id}`}
                className="group flex flex-col rounded-3xl bg-[#F6EDE4] border-2 border-[#211529] p-5 shadow-[4px_4px_0px_#211529] hover:shadow-[6px_6px_0px_#FF66B2] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
              >
                {/* Mascot + Name */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center p-2 border-2 group-hover:scale-110 transition-transform"
                    style={{
                      backgroundColor: `${artist.emblemColor}22`,
                      borderColor: artist.emblemColor,
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
                    <h3 className="text-2xl font-extrabold text-[#211529] tracking-tight">
                      {artist.name}
                    </h3>
                    <p
                      className="text-xs font-bold uppercase tracking-wider"
                      style={{ color: artist.emblemColor }}
                    >
                      {artist.role}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-[#5A5560] leading-relaxed mb-4">
                  {artist.specialty}
                </p>

                {/* Artwork Preview */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border-2 border-[#211529] bg-[#211529]">
                  <img
                    src={previewSrc}
                    alt={`${artist.name} artwork`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {artist.sombongBadges.slice(0, 2).map((badge) => (
                    <span
                      key={badge}
                      className="text-[10px] font-bold px-2 py-1 rounded-full bg-white border border-[#211529]/20 text-[#211529]"
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
