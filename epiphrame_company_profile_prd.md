# Product Requirements Document (PRD): Epiphrame Interactive Company Profile & Artist Showcase

| Document Metadata | Details | 
| ----- | ----- | 
| **Product / Project Name** | **Epiphrame** — Illustration Collective & Character AI Ad Studio Website | 
| **Document Version** |  | **v3.4 (Crystal-Clear Unlit Artwork + Glass Rim Frame Fix)** |  | **Date** | October 15, 2026 |  | **Company Identity** | **Epiphrame** — An artist collective (*kumpulan artist gambar*) crafting 100% hand-drawn character illustrations, animated GIFs, and high-converting video ad campaigns for AI character & storytelling platforms (such as [Cycle AI](https://www.google.com/search?q=https%3A%2F%2Fwww.cycleai.ai%2F) and [Hangjam](https://www.google.com/search?q=https%3A%2F%2Fhangjam.ai%2F)). |  | **Design Direction** | *"Quirky, fun, engaging, BUT elegant and professional"* — 75% Open Editorial Cream Whitespace (`#F6EDE4`) + Multi-Media Three.js 3D Circular Ring Hero + Interactive Right Scroll Ruler + Dedicated `/artists` Flex Page. |  | **Reference Benchmark** | [ArtCraft](https://www.google.com/search?q=https%3A%2F%2Fgetartcraft.com%2F) & [ArtCraft Apps](https://www.google.com/search?q=https%3A%2F%2Fgetartcraft.com%2Fapps) |  | **Locked LTS Stack & Hosting** | Node.js `22.22.0+ LTS` + Next.js `14.2.25+` + React `18.3.1` + Tailwind CSS `3.4.19` + Three.js `~0.169.0` + `@react-three/fiber@^8.17.10` + `@react-three/drei@^9.114.0` — Deployed on [Vercel](https://www.google.com/search?q=https%3A%2F%2Fvercel.com%2Fdocs%2Fframeworks%2Ffull-stack%2Fnextjs) |   ## 1. Executive Summary & Core Vision  **Epiphrame** is a collective of human illustrators, character designers, and motion artists (*kumpulan artist gambar*) who create original character art and scroll-stopping ad campaigns for AI character and roleplay apps like [Cycle AI](https://www.google.com/search?q=https%3A%2F%2Fwww.cycleai.ai%2F) and [Hangjam](https://www.google.com/search?q=https%3A%2F%2Fhangjam.ai%2F).  While [ArtCraft](https://www.google.com/search?q=https%3A%2F%2Fgetartcraft.com%2F) builds creative software, **Epiphrame is the human artist studio behind the drawings, animated GIFs, and viral character ads**. This PRD provides a zero-ambiguity blueprint for **Antigravity** to build the complete web application and deploy it cleanly to [Vercel](https://www.google.com/search?q=https%3A%2F%2Fvercel.com%2Fdocs%2Fdeployments).  ## 2. Locked LTS Tech Stack & Anti-Breach Security Baseline  | Layer | Locked Package & Version | Purpose & Security Rationale |  | ----- | ----- | ----- |  | **Runtime** | `node@22.x` (`>=22.22.0` LTS "Jod") | Patched against `CVE-2025-59465` and `CVE-2025-55132` ([Node 22 LTS](https://www.google.com/search?q=https%3A%2F%2Fnodejs.org%2Fen%2Fblog%2Frelease%2Fv22.22.0), [Node 20 LTS](https://www.google.com/search?q=https%3A%2F%2Fnodejs.org%2Fen%2Fblog%2Frelease%2Fv20.20.0)). |  | **Framework** | `next@14.2.25` (or latest `14.2.x` patch) | Patched against the Middleware Authorization Bypass vulnerability ([CVE-2025-29927](https://www.google.com/search?q=https%3A%2F%2Fnvd.nist.gov%2Fvuln%2Fdetail%2FCVE-2025-29927), [Datadog Security Advisory](https://www.google.com/search?q=https%3A%2F%2Fsecuritylabs.datadoghq.com%2Farticles%2Fnextjs-middleware-auth-bypass%2F)). |  | **React Core** | `react@18.3.1` + `react-dom@18.3.1` | Required for 100% peer-dependency stability with `@react-three/fiber@8` ([R3F Installation Docs](https://www.google.com/search?q=https%3A%2F%2Fr3f.docs.pmnd.rs%2Fgetting-started%2Finstallation)). |  | **3D & WebGL** | `three@~0.169.0` + `@types/three@~0.169.0` + `@react-three/fiber@^8.17.10` + `@react-three/drei@^9.114.0` | Stable React 18 3D rendering pipeline supporting `useTexture` and `useVideoTexture`. |  | **Styling** | `tailwindcss@3.4.19` + `postcss@^8.4.49` + `autoprefixer@^10.4.20` | Mature v3.4 release ([VersionLog Tailwind CSS](https://www.google.com/search?q=https%3A%2F%2Fversionlog.com%2Ftailwind-css%2F)). |   ## 3. Complete Visual & Media Asset Manifest (`/public/assets/` — Strictly 8 Full-Bleed Cards)  > **CRITICAL RULE FOR ANTIGRAVITY:** Never put `ui-ref-*.jpg`, `asset-2-3d-mascots-sheet.jpg`, or `asset-3-sketch-vs-final-sheet.jpg` inside the 3D Hero Ring! Only use `/assets/cards/card-01.webp` through `/assets/cards/card-08.webp` and their 4 matching `.mp4` loops.  | Card # | Unique 3:4 Image (`720x960`) | Unique Animated Video / GIF | Artwork Theme |  | ----- | ----- | ----- | ----- |  | **Card 01** | `/assets/cards/card-01.webp` | `/assets/media/cycle-ad-reel.mp4` (`neon-ramen-loop.gif`) | **Neon Ramen Date** (Cyberpunk noodle stall + glowing yellow flower spirits) |  | **Card 02** | `/assets/cards/card-02.webp` | Static 3:4 Full-Bleed Image | **Mischievous Alchemist** (Potion cauldron + pink/yellow flower clouds) |  | **Card 03** | `/assets/cards/card-03.webp` | `/assets/media/vibe-dj-sticker.mp4` (`vibe-dj-sticker.gif`) | **Botanical Spirit DJ** (Turntable vinyls + colorful soundwaves & flowers) |  | **Card 04** | `/assets/cards/card-04.webp` | Static 3:4 Full-Bleed Image | **Streetwear Skater** (Skateboarder + floating pink/blue flowers) |  | **Card 05** | `/assets/cards/card-05.webp` | Static 3:4 Full-Bleed Image | **Starlight Painter** (Cobalt blue canvas + giant smiling yellow flower) |  | **Card 06** | `/assets/cards/card-06.webp` | `/assets/media/hangjam-sticker.mp4` (`hangjam-sticker.gif`) | **Botanical Spirit Monster** (Three-eyed monster + potted smiling plants) |  | **Card 07** | `/assets/cards/card-07.webp` | `/assets/media/midnight-store-ad.mp4` (`midnight-store-loop.gif`) | **Midnight Convenience Store** (Blue jacket + strawberry milk cartons POV) |  | **Card 08** | `/assets/cards/card-08.webp` | Static 3:4 Full-Bleed Image | **Digital Tablet Creator** (Headphones + glowing digital sketch tablet) |   ## 4. Visual Polish Rules: Why "Glass Over Artwork" Fails & How to Fix It  1. **NEVER Put a Translucent/Frosted Glass Mesh IN FRONT of the Artwork (`z > artwork.z`):**     * Putting a glass or physical material cover in front of the illustration creates milky glare, double-vision refraction, and washes out the artist's vibrant colors by 40%–50%.     * **The Fix ("Glass Rim Behind, 100% Pure Unlit Art in Front"):** Place the glossy/glass `<RoundedBox>` *behind* the artwork (`z = 0`, thickness `0.035`), and place the artwork plane in front of it (`z = +0.022`) using `<meshBasicMaterial toneMapped={false} />`. That way you get a sleek glassy border/edge around the card while the illustration itself stays **100% crystal-clear, razor-sharp, and vibrant**.  2. **Soften Floor Shadows & Tilt the Ring like a True Halo:**     * Never put dark black shadow blobs under each individual card. Use a single, subtle warm-tinted `<ContactShadows color="#8C7A6B" opacity={0.18} blur={2.8} />` underneath the entire ring.     * Position the camera slightly higher (`position: [0, 0.9, 8.8]`, `fov: 34`) looking slightly down at the ring (`rotation={[0.08, 0, 0]}`) so the cards form an elegant, readable 3D halo like our UI Mockup 1.  ## 5. Fixed Crystal-Clear + Glass-Rim `<CircularRingHero />` Compoand potion-cloud sprite pack for Hangjam interactive storytelling.',   },   {     id: 'epiphrame-dj-gif-03',     indexLabel: '03',     title: 'Botani ContactShadows,cal Spirit DJ — Animated Sticker Loop',     client: 'Epiphrame Originals',     clientUrl: 'https://hangjam.ai/',     category: 'ANIMATED GIF STICKER',     artistId: 'iris',     artistName: 'Iris',     mediaFormat: 'gif',     src: '/assets/media/vibe-dj-sticker.gif',     videoTextureSrc: '/assets/media/vibe-dj-sticker.mp4',     posterSrc: '/assets/cards/card-03.webp',     accentColor: '#FFD400',     metricsBadge: 'Looping 60fps Sticker Set',     description: 'Playf and flower mascot collection built for Discord and in-app reactions.',   },   {     id: 'cycle-skater-04',     indexLabel: '04',     title: 'Streetwear Skater — Vertical Feed Hook',     client: 'Cycle AI://www.cycleai.ai/',     category: 'SOCIAL AD CREATIVE',     artistId: 'nadia',     artistName: 'Nadia',     mediaFormat: 'image',     src: '/assets/cards/card-04.webp',     posterSrc: '/assets/cards/card-04.webp',     accentColor: '#FF66B2',     metricsBadge: '9.6M TikTok & Reels Views',     description: 'High-contrast pop-color character illustration engineered to stop thumb-scroll on vertical feeds.',   },   {     id: 'hangjam-painter-05',     indexLabel: '05',     title: 'Starlight Painter — Interactive World Promo',     client: 'Hangjam',     client 1.28 : anyActive ? 0.92 : 1.0;     const targetZOffset = isActive ? 0.65Id: 'b    const targetY = isActive ? 0.12 : 0;i ma',     artistName: 'Bima',     mediaFormat: 'image',     src: '/assets/cards/card-05.webp',     posterSrc: '/assets/cards/card-05.webp',     accentColor: '#D1CAEA',     metricsBadge: 'Featured App Store Banner',     description: 'Vibrant cobalt-and-sunshine promotional illustration showcasing custom character creation.',   },   {     id: 'hangjam-monster-gif-06',     indexLabel: '06',     title: 'Botanical Monster Guide — Reaction GIF',     client: 'Hangjam',     clientUrl: 'https://hangjam.ai/',     category: 'ANIMATED GIF STICK meshRef.current.position.y = THREE.MathUtils.damp(meshRef.current.position.y, targetY, 7, delta);    ER',     artistId: 'nadia',     artistName: 'Nadia',     mediaFormat: 'gif',     src: '/assets/media/hangjam-sticker.gif',     videoTextureSrc: '/assets/media/hangjam-sticker.mp4',     posterSrc: '/assets/cards/card-06.webp',     accentColor: '#1E7E48',     metricsBadge: '850K+ In-App Chats',     description: 'Quirky three-eyed botanical spirit mascot with looping  Warm-White / Glass Rim',   } BEHIND the Artwork (Never covering the front!),   {     id: 'cycle-m args={\[1.64, 2.18, 0.035\]} radius={0.07} smoothness={4}>         <meshPhysicalMaterial           color="#FFFFFF"           roughness={0.15}           metalness={0.05}           clearcoat={1}           clearcoatRoughness={0.1}        t: 'Cycle AI',     clientUrl: 'httcleai.   category: ' — 100% Unlit, Razor-Sharp, Zero Milky Glare \*/}       <mesh position={\[0, 0, 0.02\]}>         <planeGeometry args={\[1.52, 2.04\]}ore-ad.mp4',     videoTextureSrc: '/assets/media/midnight-store-ad.mp4',     posterSrc: '/assets/cards/card-07.webp',     accentColor: '#1388E5',     metricsBadge: '11.4M Views · 42% Hook Rate',     description: 'Dramatic convenience store lighting and strawberry-milk POV animati on    {/\* Back Artwork Plane so back-of-ring cards also look clean \*/}       <mesh position={\[0, 0, -0.02\]} rotation={\[0, Math.PI, 0\]}>         <planeGeometry args={\[1.52, 2.04\]} />         <Suspense fallback={<meshBasicMaterial color={item.accentColor} />}>           <ImagePlaneMaterial src={item.posterSrc} />         </Suspense>       </mesh>    crafted for paid social.',   },   {     id: 'epiphrame-tablet-08',     indexLabel: '08',     title: 'Sound & Sketch — Collective Origin Art',     client: 'Epiphrame Collective',     clientUrl: 'https://www.cycleai.ai/',     category: 'COLLECTIVE ILLUSTRATION',     artistId: 'bima',     artistName: 'Bima',     mediaFormat: 'image',     src: '/assets/cards/card-08.webp',     posterSrc: '/assets/cards/card-08.webp',     accentColor: '#C45F3F',     metricsBadge: '100% Human Hand-Drawn',     description: 'Celebrates the human illustrators behind every Epiphrame character campaign.',   }, \];  | 

## 5. Fixed Full-Bleed `<CircularRingHero />` Code (Eliminates Giant White Box Borders)

> **Why `epiphrame.vercel.app` showed small images inside giant white boxes:** `@react-three/drei`'s `<RoundedBox>` uses 6-sided box-extrusion UV coordinates that shrink a texture into the bottom-left corner of the box. In addition, `<Html transform>` overlays do not depth-sort behind 3D meshes. **The Fix:** Render a thin dark `<RoundedBox>` as the backing frame, and mount the artwork/video/GIF texture on a standard `<planeGeometry args={[1.62, 2.16]} />` flush on the front face (`z = 0.032`) and back face (`z = -0.032`). This makes every single card **100% full-bleed edge-to-edge** with zero white margins!

```
'use client';

import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, useTexture, useVideoTexture } from '@react-three/drei';
import * as THREE from 'three';
import { RING_SHOWCASE_ITEMS, RingShowcaseItem } from '@/data/siteContent';

function VideoPlaneMaterial({ src }: { src: string }) {
  const texture = useVideoTexture(src, {
    unsuspended: 'canplay',
    muted: true,
    loop: true,
    start: true,
    playsInline: true,
  });
  texture.colorSpace = THREE.SRGBColorSpace;
  return <meshBasicMaterial map={texture} side={THREE.DoubleSide} toneMapped={false} />;
}

function ImagePlaneMaterial({ src }: { src: string }) {
  const texture = useTexture(src);
  texture.colorSpace = THREE.SRGBColorSpace;
  return <meshBasicMaterial map={texture} side={THREE.DoubleSide} toneMapped={false} />;
}

function RingCard({
  item,
  index,
  total,
  radius,
  isActive,
  anyActive,
  onSelect,
}: {
  item: RingShowcaseItem;
  index: number;
  total: number;
  radius: number;
  isActive: boolean;
  anyActive: boolean;
  onSelect: (index: number) => void;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const angle = (index / total) * Math.PI * 2;
  const baseX = Math.sin(angle) * radius;
  const baseZ = Math.cos(angle) * radius;

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const targetScale = isActive ? 1.42 : anyActive ? 0.88 : 1.0;
    const targetZOffset = isActive ? 0.9 : 0;

    meshRef.current.scale.x = THREE.MathUtils.damp(meshRef.current.scale.x, targetScale, 7, delta);
    meshRef.current.scale.y = THREE.MathUtils.damp(meshRef.current.scale.y, targetScale, 7, delta);
    meshRef.current.scale.z = THREE.MathUtils.damp(meshRef.current.scale.z, targetScale, 7, delta);

    const forwardX = Math.sin(angle) * (radius + targetZOffset);
    const forwardZ = Math.cos(angle) * (radius + targetZOffset);
    meshRef.current.position.x = THREE.MathUtils.damp(meshRef.current.position.x, forwardX, 7, delta);
    meshRef.current.position.z = THREE.MathUtils.damp(meshRef.current.position.z, forwardZ, 7, delta);
  });

  const animatedSrc = item.videoTextureSrc;

  return (
    <group
      ref={meshRef}
      position={[baseX, 0, baseZ]}
      rotation={[0, angle, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(index);
      }}
    >
      {/* Thin Charcoal Backing Frame */}
      <RoundedBox args={[1.68, 2.24, 0.04]} radius={0.06} smoothness={4}>
        <meshBasicMaterial color="#211529" />
      </RoundedBox>

      {/* Full-Bleed Front & Back Artwork Plane (Standard 0..1 UVs = Zero White Margin!) */}
      <mesh position={[0, 0, 0.025]}>
        <planeGeometry args={[1.6, 2.14]} />
        <Suspense fallback={<meshBasicMaterial color={item.accentColor} />}>
          {animatedSrc ? (
            <VideoPlaneMaterial src={animatedSrc} />
          ) : (
            <ImagePlaneMaterial src={item.posterSrc} />
          )}
        </Suspense>
      </mesh>
    </group>
  );
}

```