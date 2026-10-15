'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Lenis from 'lenis';
import { Navbar } from '@/components/layout/Navbar';
import { InteractiveScrollRuler } from '@/components/ui/InteractiveScrollRuler';
import { WhyHumanArt } from '@/components/sections/WhyHumanArt';
import { DeliverablesShowcase } from '@/components/sections/DeliverablesShowcase';
import { ArtistCollectiveStrip } from '@/components/sections/ArtistCollectiveStrip';
import { CommissionArcade } from '@/components/sections/CommissionArcade';
import { InquiryDrawer } from '@/components/ui/InquiryDrawer';
import { Footer } from '@/components/layout/Footer';

// Mandatory dynamic client-only import for Three.js canvas (PRD §7.1)
const CircularRingHero = dynamic(
  () => import('@/components/canvas/CircularRingHero'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-screen bg-[#F9F6F0] flex items-center justify-center font-mono text-xs tracking-widest text-[#141316] font-bold">
        LOADING EPIPHRAME 3D RING...
      </div>
    ),
  }
);

export default function Home() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryProjectType, setInquiryProjectType] = useState<string>('video-ad-campaign');
  const [inquiryArtistId, setInquiryArtistId] = useState<string>('any');

  // Initialize Lenis smooth inertial scrolling (PRD §2)
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
      {/* Top Navigation */}
      <Navbar onOpenInquiry={() => handleOpenInquiry()} />

      {/* Right Edge Interactive 40-Tick Scroll Ruler */}
      <InteractiveScrollRuler />

      {/* Hero Section: 3D Multi-Media Circular Ring */}
      <CircularRingHero />

      {/* Section 01: Why Human Art Wins Manifesto (anchors #process & #character-lab) */}
      <WhyHumanArt />

      {/* Section 03: Deliverables & Campaign Showcase (anchor #showcase) */}
      <DeliverablesShowcase />

      {/* Section 04: The Artist Collective Teaser Strip */}
      <ArtistCollectiveStrip />

      {/* Section 05: Interactive Commission Brief Arcade (anchor #commission-drawer) */}
      <CommissionArcade />

      {/* Footer */}
      <Footer onOpenInquiry={() => handleOpenInquiry()} />

      {/* Slide-in Zod-validated Inquiry Drawer */}
      <InquiryDrawer
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        defaultProjectType={inquiryProjectType}
        defaultArtist={inquiryArtistId}
      />
    </main>
  );
}
