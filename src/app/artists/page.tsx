'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ARTISTS_ROSTER, ArtistProfile } from '@/data/siteContent';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { InquiryDrawer } from '@/components/ui/InquiryDrawer';
import { SketchToFinalSlider } from '@/components/artists/SketchToFinalSlider';
import {
  Play,
  Pause,
  Award,
  Sparkles,
  ArrowUpRight,
  Eye,
  Flame,
  CheckCircle2,
  Film,
  Image as ImageIcon,
} from 'lucide-react';

export default function ArtistsPage() {
  const [selectedArtistId, setSelectedArtistId] = useState<string>(ARTISTS_ROSTER[0].id);
  const [activeVaultIndex, setActiveVaultIndex] = useState<number>(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [inquiryOpen, setInquiryOpen] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sync with URL hash (e.g. /artists#raka)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && ARTISTS_ROSTER.some((a) => a.id === hash)) {
        setSelectedArtistId(hash);
        setActiveVaultIndex(0);
        setIsVideoPlaying(false);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const selectedArtist: ArtistProfile =
    ARTISTS_ROSTER.find((a) => a.id === selectedArtistId) || ARTISTS_ROSTER[0];

  const handleSelectArtist = (id: string) => {
    setSelectedArtistId(id);
    setActiveVaultIndex(0);
    setIsVideoPlaying(false);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsVideoPlaying(true);
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  const currentVaultItem = selectedArtist.vaultItems[activeVaultIndex] || selectedArtist.vaultItems[0];

  return (
    <main className="min-h-screen bg-[var(--bg-surface)] text-[var(--text-primary)] relative select-none">
      {/* Top Navbar */}
      <Navbar onOpenInquiry={() => setInquiryOpen(true)} />

      {/* Main Content Container */}
      <div className="pt-24 md:pt-32 pb-20 max-w-7xl mx-auto px-6">
        {/* Section Tagline matching ui-ref-artists-page.jpg */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-[#211529] text-[#F6EDE4] font-bold">
            02 / THE ARTIST COLLECTIVE — REAL HUMAN CRAFT
          </span>
          <span className="font-mono text-xs text-[var(--text-muted)] tracking-wider hidden sm:inline">
            ZERO GENERATIVE AI SLOP · 100% HAND DRAWN
          </span>
        </div>

        {/* 1. Interactive Horizontal Artist Roster Bar */}
        <div className="relative mb-12">
          <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-4 scrollbar-none">
            {ARTISTS_ROSTER.map((artist) => {
              const isSelected = artist.id === selectedArtist.id;
              return (
                <button
                  key={artist.id}
                  type="button"
                  onClick={() => handleSelectArtist(artist.id)}
                  className={`group relative flex-shrink-0 flex flex-col items-center p-3 sm:p-4 rounded-2xl sm:rounded-3xl border-2 transition-all duration-300 ${
                    isSelected
                      ? 'bg-[var(--bg-card)] shadow-xl scale-105 border-[var(--text-primary)] ring-4 ring-[#1388E5]/20'
                      : 'bg-[var(--bg-card)]/70 hover:bg-[var(--bg-card)] border-[var(--border-hairline)] hover:scale-102 opacity-80 hover:opacity-100'
                  }`}
                  style={{
                    minWidth: '110px',
                  }}
                >
                  {/* Floating Flower / Mascot Accent on top-right */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white shadow-md border border-[var(--border-hairline)] flex items-center justify-center">
                    <span
                      className="w-3.5 h-3.5 rounded-full"
                      style={{ backgroundColor: artist.emblemColor }}
                    />
                  </div>

                  {/* Avatar Icon */}
                  <div
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center p-2 mb-2 transition-transform group-hover:rotate-3"
                    style={{
                      backgroundColor: `${artist.emblemColor}22`,
                    }}
                  >
                    <img
                      src={artist.avatarSrc}
                      alt={artist.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Name and Role */}
                  <span className="font-extrabold text-sm sm:text-base text-[var(--text-primary)]">
                    {artist.name}
                  </span>
                  <span
                    className="font-mono text-[10px] uppercase font-bold tracking-wider mt-0.5"
                    style={{ color: artist.emblemColor }}
                  >
                    {artist.role.split('&')[0].trim()}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Main Artist Spotlight Stage (Side-by-Side) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 items-stretch">
          {/* Left: Rough Sketch vs. Final Ad */}
          <div className="flex flex-col justify-between bg-[var(--bg-card)] rounded-3xl p-6 sm:p-8 border border-[var(--border-hairline)] shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
                ROUGH SKETCH vs. FINAL AD
              </h3>
              <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-[var(--bg-surface)] text-[var(--text-muted)] font-bold">
                {selectedArtist.sketchComparison.client}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[var(--text-muted)] mb-4">
              Drag the golden handle to reveal how {selectedArtist.name} evolves raw human pencil lines into high-converting ad artwork.
            </p>

            {/* Interactive Slider Component */}
            <div className="flex-1 flex items-center">
              <SketchToFinalSlider
                sketchSrc={selectedArtist.sketchComparison.sketchSrc}
                finalSrc={selectedArtist.sketchComparison.finalSrc}
                title={selectedArtist.sketchComparison.title}
              />
            </div>

            <div className="mt-4 pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
              <span>{selectedArtist.sketchComparison.title}</span>
              <span className="font-bold text-[var(--text-primary)]">Interactive Dual-View</span>
            </div>
          </div>

          {/* Right: Speedpaint Video / GIF Reel Multi-Media Stage */}
          <div className="flex flex-col justify-between bg-[var(--bg-card)] rounded-3xl p-6 sm:p-8 border border-[var(--border-hairline)] shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
                SPEEDPAINT VIDEO / GIF REEL
              </h3>
              <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-[#1388E5] text-white font-bold">
                {currentVaultItem.mediaFormat.toUpperCase()}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[var(--text-muted)] mb-4">
              Watch {selectedArtist.name}&apos;s real hand-drawn execution timelapse and viral character assets.
            </p>

            {/* Reel Player Screen */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-950 border border-[var(--border-hairline)] shadow-inner flex items-center justify-center group">
              {currentVaultItem.mediaFormat === 'video' ? (
                <>
                  <video
                    ref={videoRef}
                    src={currentVaultItem.src}
                    poster={currentVaultItem.posterSrc}
                    playsInline
                    loop
                    className="w-full h-full object-cover"
                    onClick={toggleVideo}
                  />

                  {/* Center Play Button Overlay */}
                  {!isVideoPlaying && (
                    <button
                      type="button"
                      onClick={toggleVideo}
                      className="absolute inset-0 m-auto w-24 h-12 rounded-full bg-white/90 hover:bg-white text-[#211529] font-black text-sm tracking-wider uppercase backdrop-blur-md shadow-2xl flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95"
                      aria-label="Play speedpaint timelapse"
                    >
                      <Play className="w-5 h-5 fill-current" />
                      PLAY
                    </button>
                  )}

                  {isVideoPlaying && (
                    <button
                      type="button"
                      onClick={toggleVideo}
                      className="absolute bottom-4 right-4 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-colors"
                      aria-label="Pause speedpaint"
                    >
                      <Pause className="w-4 h-4 fill-current" />
                    </button>
                  )}
                </>
              ) : currentVaultItem.mediaFormat === 'gif' ? (
                <div className="w-full h-full flex items-center justify-center p-6 bg-gradient-to-br from-neutral-900 to-neutral-800">
                  <img
                    src={currentVaultItem.src}
                    alt={currentVaultItem.title}
                    className="max-h-full max-w-full object-contain filter drop-shadow-2xl"
                  />
                </div>
              ) : (
                <img
                  src={currentVaultItem.src}
                  alt={currentVaultItem.title}
                  className="w-full h-full object-cover"
                />
              )}

              {/* Tag pill */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/75 backdrop-blur-sm text-white font-mono text-[11px] font-bold">
                {currentVaultItem.title}
              </div>
            </div>

            {/* Reel Vault Tabs */}
            <div className="mt-4 pt-4 border-t border-[var(--border-hairline)] flex items-center gap-2">
              {selectedArtist.vaultItems.map((item, idx) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => {
                    setActiveVaultIndex(idx);
                    setIsVideoPlaying(false);
                  }}
                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 ${
                    activeVaultIndex === idx
                      ? 'bg-[#211529] text-[#F6EDE4] border-[#211529] shadow-sm'
                      : 'bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-hairline)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {item.mediaFormat === 'video' && <Film className="w-3.5 h-3.5" />}
                  {item.mediaFormat === 'gif' && <Flame className="w-3.5 h-3.5 text-[#FFD400]" />}
                  {item.mediaFormat === 'image' && <ImageIcon className="w-3.5 h-3.5" />}
                  <span className="truncate">Vault 0{idx + 1}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Sombong Flex Badges & 'BOOK THIS STYLE ↗' Banner */}
        <div className="bg-[var(--bg-card)] rounded-3xl p-6 sm:p-10 border border-[var(--border-hairline)] shadow-xl mb-16">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-[var(--border-hairline)]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: selectedArtist.emblemColor }}
                />
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] font-bold">
                  ARTIST SPOTLIGHT PROFILE
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">
                {selectedArtist.name} — {selectedArtist.role}
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-muted)] mt-2 max-w-3xl leading-relaxed">
                {selectedArtist.bio}
              </p>
            </div>

            {/* Prominent Sombong Action Buttons matching ui-ref-artists-page.jpg */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="py-3 px-5 rounded-full bg-[#1388E5] text-white font-mono text-xs sm:text-sm font-extrabold tracking-wider shadow-sm flex items-center gap-2">
                <Award className="w-4 h-4" />
                {selectedArtist.sombongBadges[0]}
              </span>

              <span className="py-3 px-5 rounded-full bg-[#FFD400] text-[#211529] font-mono text-xs sm:text-sm font-extrabold tracking-wider shadow-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#211529]" />
                {selectedArtist.role.split('&')[0].toUpperCase()}
              </span>

              <button
                type="button"
                onClick={() => setInquiryOpen(true)}
                className="py-3 px-6 rounded-full bg-[#FF66B2] hover:bg-[#e04f98] text-white font-mono text-xs sm:text-sm font-black tracking-wider uppercase transition-all shadow-md active:scale-95 flex items-center gap-2"
              >
                <span>BOOK THIS STYLE ↗</span>
              </button>
            </div>
          </div>

          {/* Full Sombong Badges Grid */}
          <div className="pt-8">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-4">
              PROVEN PERFORMANCE & HONORS ({selectedArtist.name.toUpperCase()})
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {selectedArtist.sombongBadges.map((badge, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] flex items-center gap-3"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${selectedArtist.emblemColor}25` }}
                  >
                    <CheckCircle2
                      className="w-5 h-5"
                      style={{ color: selectedArtist.emblemColor }}
                    />
                  </div>
                  <div>
                    <span className="font-extrabold text-sm text-[var(--text-primary)] block">
                      {badge}
                    </span>
                    <span className="font-mono text-[10px] text-[var(--text-muted)]">
                      Verified Client Milestone
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Complete Multi-Media Vault Carousel */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-[#1E7E48] text-white font-bold">
                03 / THE MULTI-MEDIA VAULT
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight mt-2">
                Speedpaints, Looping Stickers & 4K Key Art
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setInquiryOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#1388E5] hover:underline"
            >
              Commission Custom Deliverable <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {selectedArtist.vaultItems.map((item, idx) => (
              <div
                key={item.title}
                onClick={() => {
                  setActiveVaultIndex(idx);
                  window.scrollTo({ top: 350, behavior: 'smooth' });
                }}
                className={`group rounded-3xl bg-[var(--bg-card)] border overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer p-4 ${
                  activeVaultIndex === idx
                    ? 'border-[#1388E5] ring-2 ring-[#1388E5]/20'
                    : 'border-[var(--border-hairline)]'
                }`}
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 mb-4">
                  {item.mediaFormat === 'video' ? (
                    <video
                      src={item.src}
                      poster={item.posterSrc}
                      muted
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/75 text-white font-mono text-[10px] font-bold uppercase">
                    {item.mediaFormat}
                  </span>
                </div>

                <h4 className="font-extrabold text-sm text-[var(--text-primary)] mb-1 group-hover:text-[#1388E5] transition-colors">
                  {item.title}
                </h4>
                <p className="font-mono text-xs text-[var(--text-muted)] flex items-center justify-between">
                  <span>Vault Asset 0{idx + 1}</span>
                  <span className="text-[#1388E5] font-bold group-hover:underline">Play in Stage ↑</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="text-center pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[var(--text-muted)] hover:text-[#1388E5] transition-colors"
          >
            ← BACK TO 3D SHOWCASE RING & CAMPAIGNS
          </Link>
        </div>
      </div>

      {/* Footer */}
      <Footer onOpenInquiry={() => setInquiryOpen(true)} />

      {/* Inquiry Drawer */}
      <InquiryDrawer
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        defaultProjectType="character-design"
        defaultArtist={selectedArtist.id}
      />
    </main>
  );
}
