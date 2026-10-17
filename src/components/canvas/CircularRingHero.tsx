'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface MediaCardProps {
  title: string;
  artistName: string;
  badge: string;
  src: string;
  fallbackMp4?: string;
  posterSrc: string;
  isVideo: boolean;
  isLandscape?: boolean;
  tiltClass: string;
  scale?: number;
  parallaxY: any;
  floatDuration: number;
  floatDelay: number;
  positionClass: string;
  cardSizeClass?: string;
}

function MediaCard({
  title,
  artistName,
  badge,
  src,
  fallbackMp4,
  posterSrc,
  isVideo,
  isLandscape = false,
  tiltClass,
  scale = 1,
  parallaxY,
  floatDuration,
  floatDelay,
  positionClass,
  cardSizeClass,
}: MediaCardProps) {
  return (
    <div className={`absolute ${positionClass} z-20 pointer-events-auto`}>
      <motion.div style={{ y: parallaxY }}>
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: floatDuration,
            ease: 'easeInOut',
            repeat: Infinity,
            delay: floatDelay,
          }}
          whileHover={{ scale: scale * 1.06, y: -6 }}
          className={`group relative rounded-2xl bg-white/70 backdrop-blur-md border border-white shadow-xl shadow-sky-900/10 p-2 sm:p-2.5 transition-all duration-300 hover:shadow-2xl hover:shadow-sky-900/20 ${tiltClass}`}
          style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
        >
          <div
            className={`relative overflow-hidden rounded-xl bg-slate-100 ${
              cardSizeClass
                ? cardSizeClass
                : isLandscape
                ? 'aspect-video w-36 sm:w-44 md:w-52 lg:w-60'
                : 'aspect-[9/16] w-24 sm:w-28 md:w-36 lg:w-40'
            }`}
          >
            {isVideo ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                poster={posterSrc}
                className="w-full h-full object-cover select-none pointer-events-none"
              >
                <source src={src} type="video/webm" />
                {fallbackMp4 && <source src={fallbackMp4} type="video/mp4" />}
              </video>
            ) : (
              <img
                src={src}
                alt={title}
                className="w-full h-full object-cover select-none pointer-events-none"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/35 pointer-events-none" />
          </div>

          <div className="mt-2 flex items-center justify-between px-1 gap-2">
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-800 tracking-tight truncate">
              @{artistName.toLowerCase()}
            </span>
            <span className="text-[9px] font-semibold text-sky-700 bg-sky-100/70 border border-sky-200/60 px-2 py-0.5 rounded-full select-none whitespace-nowrap">
              {badge}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function FluffyCloud({
  className = '',
  color = '#FFFFFF',
  shadowColor = '#D0E4F7',
}: {
  className?: string;
  color?: string;
  shadowColor?: string;
}) {
  return (
    <svg
      viewBox="0 0 180 110"
      fill="none"
      className={`select-none pointer-events-none drop-shadow-[0_8px_16px_rgba(186,215,245,0.35)] ${className}`}
    >
      <g>
        <ellipse cx="90" cy="74" rx="72" ry="26" fill={shadowColor} />
        <ellipse cx="48" cy="64" rx="34" ry="28" fill={shadowColor} />
        <ellipse cx="132" cy="64" rx="34" ry="28" fill={shadowColor} />

        <ellipse cx="90" cy="68" rx="70" ry="26" fill={color} />
        <ellipse cx="50" cy="56" rx="32" ry="28" fill={color} />
        <ellipse cx="88" cy="42" rx="38" ry="32" fill={color} />
        <ellipse cx="128" cy="56" rx="30" ry="26" fill={color} />
      </g>
    </svg>
  );
}

function RollingGreenHills() {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
      <svg
        viewBox="0 0 1440 180"
        className="w-full h-20 sm:h-24 md:h-28 block select-none"
        preserveAspectRatio="none"
      >
        <path
          d="M0,80 C240,30 520,100 760,60 C1000,20 1220,90 1440,50 L1440,180 L0,180 Z"
          fill="#1E7E48"
        />
        <path
          d="M0,110 C280,65 580,135 880,95 C1100,60 1300,115 1440,75 L1440,180 L0,180 Z"
          fill="#27AE60"
        />

        <g transform="translate(80, 105)">
          <path d="M 10,20 Q 8,10 10,4" stroke="#211529" strokeWidth="1.8" fill="none" />
          <circle cx="10" cy="4" r="8" fill="#FFD400" stroke="#211529" strokeWidth="1.8" />
          <circle cx="10" cy="4" r="4" fill="#FFE866" />
        </g>
        <g transform="translate(180, 120)">
          <path d="M 8,18 Q 10,8 8,2" stroke="#211529" strokeWidth="1.8" fill="none" />
          <circle cx="8" cy="2" r="7" fill="#FF66B2" stroke="#211529" strokeWidth="1.8" />
          <circle cx="8" cy="2" r="3" fill="#FFD400" />
        </g>
        <g transform="translate(1260, 100)">
          <path d="M 10,20 Q 8,10 10,4" stroke="#211529" strokeWidth="1.8" fill="none" />
          <circle cx="10" cy="4" r="8" fill="#FFD400" stroke="#211529" strokeWidth="1.8" />
          <circle cx="10" cy="4" r="4" fill="#FFE866" />
        </g>
        <g transform="translate(1360, 85)">
          <path d="M 8,18 Q 6,8 8,2" stroke="#211529" strokeWidth="1.8" fill="none" />
          <circle cx="8" cy="2" r="7" fill="#FF66B2" stroke="#211529" strokeWidth="1.8" />
          <circle cx="8" cy="2" r="3" fill="#FFD400" />
        </g>
      </svg>
    </div>
  );
}

export default function CircularRingHero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  // Parallax transforms: Outer ring moves faster, inner ring moves slower
  const yCard1 = useTransform(scrollY, [0, 1000], [0, -280]); // Card 1: Top Left
  const yCard2 = useTransform(scrollY, [0, 1000], [0, -320]); // Card 2: Top Right
  const yCard3 = useTransform(scrollY, [0, 1000], [0, -220]); // Card 3: Middle Left
  const yCard4 = useTransform(scrollY, [0, 1000], [0, -260]); // Card 4: Middle Right
  const yCard5 = useTransform(scrollY, [0, 1000], [0, -120]); // Card 5: Bottom Left
  const yCard6 = useTransform(scrollY, [0, 1000], [0, -140]); // Card 6: Bottom Right

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-gradient-to-b from-sky-200 via-blue-50 to-white overflow-hidden select-none flex items-center justify-center pt-24 pb-20 sm:pt-28 sm:pb-24"
    >
      {/* Background Fluffy Clouds */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <FluffyCloud className="absolute top-16 left-6 sm:left-14 w-36 sm:w-48 opacity-85" />
        <FluffyCloud className="absolute top-12 right-8 sm:right-20 w-44 sm:w-60 opacity-80" />
        <FluffyCloud className="absolute top-[38%] left-[-2%] sm:left-[4%] w-32 sm:w-44 opacity-60" />
        <FluffyCloud className="absolute top-[40%] right-[-2%] sm:right-[5%] w-36 sm:w-52 opacity-65" />
        <FluffyCloud className="absolute bottom-32 left-[18%] w-40 sm:w-56 opacity-75" />
        <FluffyCloud className="absolute bottom-28 right-[22%] w-44 sm:w-64 opacity-75" />
      </div>

      {/* 1. Concentric Orbital Rings Centered Behind Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
        {/* Ring 1 (Inner Orbit - 520px) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border-[1px] border-dashed border-sky-300/40" />

        {/* Ring 2 (Middle Orbit - 800px) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border-[1.5px] border-dashed border-sky-300/50 shadow-[0_0_60px_rgba(255,255,255,0.7)]" />

        {/* Ring 3 (Outer Orbit - 1200px) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full border-[1px] border-dashed border-sky-300/40" />

        {/* Subtle Orbital Anchor Points */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none">
          <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-sky-400/60 shadow-[0_0_10px_#38BDF8]" />
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 rounded-full bg-sky-400/60 shadow-[0_0_10px_#38BDF8]" />
          <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-sky-400/60 shadow-[0_0_10px_#38BDF8]" />
          <span className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-sky-400/60 shadow-[0_0_10px_#38BDF8]" />
        </div>
      </div>

      {/* 2. 6 Floating Media Nodes with 360° Spatial Placement & Parallax Scroll */}

      {/* Card 1 (Top Left): top: 15%, left: 15% */}
      <MediaCard
        title="Neon Ramen Date"
        artistName="Iris"
        badge="Vertical Hook"
        src="/assets/hero_card/card_1.webm"
        fallbackMp4="/assets/hero_card/card_1.mp4"
        posterSrc="/assets/cards/card-01.webp"
        isVideo={true}
        isLandscape={false}
        positionClass="top-[15%] left-[15%]"
        tiltClass="-rotate-3"
        scale={0.96}
        parallaxY={yCard1}
        floatDuration={8.5}
        floatDelay={0.4}
      />

      {/* Card 2 (Top Right): top: 20%, right: 15% */}
      <MediaCard
        title="Studio Workshop"
        artistName="Bima"
        badge="4K Key Art"
        src="/assets/showcase/studio-isometric.webp"
        posterSrc="/assets/showcase/studio-isometric.webp"
        isVideo={false}
        isLandscape={true}
        positionClass="top-[20%] right-[15%]"
        tiltClass="rotate-4"
        scale={1.02}
        parallaxY={yCard2}
        floatDuration={11.0}
        floatDelay={1.2}
      />

      {/* Card 3 (Middle Left): top: 50%, left: 5%, -translate-y-1/2 */}
      <MediaCard
        title="Streetwear Skater"
        artistName="Nadia"
        badge="60 FPS Reel"
        src="/assets/hero_card/card_4.webm"
        fallbackMp4="/assets/hero_card/card_4.mp4"
        posterSrc="/assets/cards/card-04.webp"
        isVideo={true}
        isLandscape={false}
        positionClass="top-1/2 left-[5%] -translate-y-1/2"
        tiltClass="rotate-2"
        scale={0.92}
        parallaxY={yCard3}
        floatDuration={9.0}
        floatDelay={0.2}
      />

      {/* Card 4 (Middle Right): top: 60%, right: 5%, -translate-y-1/2 */}
      <MediaCard
        title="Starlight Painter"
        artistName="Bima"
        badge="World Promo"
        src="/assets/hero_card/card_5.webm"
        fallbackMp4="/assets/hero_card/card_5.mp4"
        posterSrc="/assets/cards/card-05.webp"
        isVideo={true}
        isLandscape={true}
        positionClass="top-[60%] right-[5%] -translate-y-1/2"
        tiltClass="-rotate-3"
        scale={0.98}
        parallaxY={yCard4}
        floatDuration={10.0}
        floatDelay={1.5}
      />

      {/* Card 5 (Bottom Left): bottom: 15%, left: 20% */}
      <MediaCard
        title="Spirit DJ"
        artistName="Iris"
        badge="Discord Sticker"
        src="/assets/hero_card/card_3.webm"
        fallbackMp4="/assets/hero_card/card_3.mp4"
        posterSrc="/assets/cards/card-03.webp"
        isVideo={true}
        isLandscape={false}
        positionClass="bottom-[15%] left-[20%]"
        tiltClass="-rotate-2"
        scale={0.88}
        parallaxY={yCard5}
        floatDuration={7.5}
        floatDelay={0.8}
      />

      {/* Card 6 (Bottom Right): bottom: 10%, right: 25% */}
      <MediaCard
        title="Sound & Sketch"
        artistName="Bima"
        badge="Lore Concept"
        src="/assets/hero_card/card_8.webm"
        fallbackMp4="/assets/hero_card/card_8.mp4"
        posterSrc="/assets/cards/card-08.webp"
        isVideo={true}
        isLandscape={true}
        positionClass="bottom-[10%] right-[25%]"
        tiltClass="rotate-3"
        scale={0.96}
        parallaxY={yCard6}
        floatDuration={11.5}
        floatDelay={2.0}
      />

      {/* Center Content: Floating Container with Protective Halo */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-30 max-w-xl lg:max-w-2xl mx-auto text-center px-4 sm:px-6 pointer-events-auto"
      >
        <div className="absolute -inset-8 -z-10 rounded-full blur-2xl bg-white/40 pointer-events-none" />

        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 tracking-[0.2em] uppercase text-[11px] sm:text-xs font-semibold px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md text-slate-800 border border-white/80 shadow-sm shadow-sky-900/5 mb-4 sm:mb-5 select-none">
          <span className="w-2 h-2 rounded-full bg-[#FF425E]" />
          HUMAN ILLUSTRATION COLLECTIVE · UA MOTION HOOKS
        </div>

        {/* H1 Display Heading in Bricolage Grotesque / Slate-900 */}
        <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-black font-bricolage tracking-tighter text-slate-900 leading-[1.05] drop-shadow-sm max-w-2xl mx-auto">
          Stop Using Generic AI Art for Your Character AI Ads.
        </h1>

        {/* H2 Subheading */}
        <h2 className="text-sm sm:text-base md:text-lg text-slate-600 font-medium tracking-tight mt-4 sm:mt-5 max-w-lg mx-auto leading-relaxed">
          We hand-draw and animate bespoke 2D characters that stop the scroll. High-converting vertical video hooks &amp; Live2D assets built exclusively for AI companions and roleplay bots.
        </h2>

        {/* Call-to-Action Buttons */}
        <div className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center gap-3.5">
          <a
            href="#showcase"
            className="px-7 py-3.5 rounded-full bg-slate-900 text-yellow-300 hover:bg-[#FF425E] hover:text-white transition-all font-bold text-xs uppercase tracking-wider shadow-lg shadow-slate-900/15 hover:shadow-xl hover:-translate-y-0.5 border border-white/20 active:scale-95 inline-flex items-center gap-2 cursor-pointer select-none"
          >
            See Campaign Results
          </a>
          <a
            href="#artists"
            className="px-6 py-3.5 rounded-full bg-white/80 backdrop-blur-md text-slate-800 hover:bg-white hover:text-slate-900 transition-all font-bold text-xs uppercase tracking-wider shadow-md shadow-sky-900/5 hover:-translate-y-0.5 border border-white active:scale-95 inline-flex items-center gap-2 cursor-pointer select-none"
          >
            Meet The Artists
          </a>
        </div>
      </motion.div>

      {/* Layered Rolling Green Hills with Blooming Daisies at Bottom */}
      <RollingGreenHills />
    </section>
  );
}
