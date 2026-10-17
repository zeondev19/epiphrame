'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Lenis from 'lenis';
import { Navbar } from '@/components/layout/Navbar';
import { WhyHumanArt } from '@/components/sections/WhyHumanArt';
import { DeliverablesShowcase } from '@/components/sections/DeliverablesShowcase';
import { ArtistCollectiveStrip } from '@/components/sections/ArtistCollectiveStrip';
import { CommissionArcade } from '@/components/sections/CommissionArcade';
import { InquiryDrawer } from '@/components/ui/InquiryDrawer';
import { Footer } from '@/components/layout/Footer';

const CircularRingHero = dynamic(
  () => import('@/components/canvas/CircularRingHero'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full min-h-screen bg-gradient-to-b from-sky-200 via-blue-50 to-white flex items-center justify-center font-bold text-xl text-slate-800">
        epiphrame
      </div>
    ),
  }
);

export default function Home() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryProjectType, setInquiryProjectType] = useState<string>('video-ad-campaign');
  const [inquiryArtistId, setInquiryArtistId] = useState<string>('any');

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const handleOpenInquiry = (projectType?: string, artistId?: string) => {
    if (projectType) setInquiryProjectType(projectType);
    if (artistId) setInquiryArtistId(artistId);
    setInquiryOpen(true);
  };

  return (
    <main className="min-h-screen bg-[var(--bg-surface)] text-[var(--text-primary)] relative studio-canvas-grain">
      {/* Top Navbar */}
      <Navbar onOpenInquiry={() => handleOpenInquiry()} />

      {/* Hero Section: Sky World + 3D Ring with Anti-AI Direct Proposition */}
      <CircularRingHero />

      {/* Section 01: Character Lab & Human Craft (anchor #character-lab) */}
      <WhyHumanArt />

      {/* Section 02: Deliverables Showcase (anchor #showcase) */}
      <DeliverablesShowcase />

      {/* Section 03: Resident Artists Roster (anchor #playground) */}
      <ArtistCollectiveStrip />

      {/* Section 04: Commission Brief Arcade (anchor #contact) */}
      <CommissionArcade />

      {/* Footer */}
      <Footer onOpenInquiry={() => handleOpenInquiry()} />

      <InquiryDrawer
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        defaultProjectType={inquiryProjectType}
        defaultArtist={inquiryArtistId}
      />
    </main>
  );
}
