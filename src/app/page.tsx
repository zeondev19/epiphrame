'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Lenis from 'lenis';
import { Navbar } from '@/components/layout/Navbar';
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
      <div className="w-full h-screen bg-gradient-to-b from-[#1388E5] via-[#80B0E8] to-[#F6EDE4] flex items-center justify-center font-bold text-xl text-[#FFD400] drop-shadow-[0_3px_0_#211529]">
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
    <main className="min-h-screen bg-[var(--bg-surface)] text-[var(--text-primary)] relative">
      {/* Playful transparent navbar overlaying the sky */}
      <Navbar onOpenInquiry={() => handleOpenInquiry()} />

      {/* Hero Section: Sky World + 3D Ring */}
      <CircularRingHero />

      {/* Our Drawings Showcase */}
      <DeliverablesShowcase />

      {/* Meet The Artists */}
      <ArtistCollectiveStrip />

      {/* Say Hi - Commission Form */}
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
