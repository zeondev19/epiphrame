# Product Requirements Document (PRD): Epiphrame Interactive Company Profile & Artist Showcase

| Document Metadata | Details |
| :--- | :--- |
| **Product / Project Name** | **Epiphrame** — Illustration Collective & Character AI Ad Studio Website |
| **Document Version** | **v3.2 (Master Antigravity Blueprint + Step-by-Step Build & Vercel Runbook)** |
| **Date** | October 14, 2026 |
| **Company Identity** | **Epiphrame** — An artist collective (*kumpulan artist gambar*) crafting 100% hand-drawn character illustrations, animated GIFs, and high-converting video ad campaigns for AI character & storytelling platforms (such as [Cycle AI](https://www.google.com/search?q=https%3A%2F%2Fwww.cycleai.ai%2F) and [Hangjam](https://www.google.com/search?q=https%3A%2F%2Fhangjam.ai%2F)). |
| **Design Direction** | *"Quirky, fun, engaging, BUT elegant and professional"* — 75% Open Editorial Cream Whitespace (`#F6EDE4`) + Multi-Media Three.js 3D Circular Ring Hero + Interactive Right Scroll Ruler + Dedicated `/artists` Flex Page. |
| **Reference Benchmark** | [ArtCraft](https://www.google.com/search?q=https%3A%2F%2Fgetartcraft.com%2F) & [ArtCraft Apps](https://www.google.com/search?q=https%3A%2F%2Fgetartcraft.com%2Fapps) |
| **Locked LTS Stack & Hosting** | Node.js `22.22.0+ LTS` + Next.js `14.2.25+` + React `18.3.1` + Tailwind CSS `3.4.19` + Three.js `~0.169.0` + `@react-three/fiber@^8.17.10` + `@react-three/drei@^9.114.0` — Deployed on [Vercel](https://www.google.com/search?q=https%3A%2F%2Fvercel.com%2Fdocs%2Fframeworks%2Ffull-stack%2Fnextjs) |

## 1. Executive Summary & Core Vision

**Epiphrame** is a collective of human illustrators, character designers, and motion artists (*kumpulan artist gambar*) who create original character art and scroll-stopping ad campaigns for AI character and roleplay apps like [Cycle AI](https://www.google.com/search?q=https%3A%2F%2Fwww.cycleai.ai%2F) and [Hangjam](https://www.google.com/search?q=https%3A%2F%2Fhangjam.ai%2F).

While [ArtCraft](https://www.google.com/search?q=https%3A%2F%2Fgetartcraft.com%2F) builds creative software, **Epiphrame is the human artist studio behind the drawings, animated GIFs, and viral character ads**. This PRD provides a zero-ambiguity blueprint for **Antigravity** to build the complete web application and deploy it cleanly to [Vercel](https://www.google.com/search?q=https%3A%2F%2Fvercel.com%2Fdocs%2Fdeployments) so the entire Epiphrame team can preview and share it online.

### The 4 Non-Negotiable Experience Rules
1. **Calm Gallery Whitespace (75% Open Canvas):** Keep the background in warm editorial cream (`#F6EDE4`) with minimal UI chrome so the viewer's eye locks immediately onto the artwork.
2. **Multi-Media 3D Circular Ring Hero (`image` | `gif` | `video`):** A floating Three.js 3D circular carousel in the center of the hero that supports **static illustrations (`.webp`/`.png`), animated GIFs (`.gif`), and looping video ads (`.mp4`/`.webm`)**. Scrolling **down** turns the ring **left**; scrolling **up** turns the ring **right**; **clicking** any card scales it up (`1.45x`) in front-center focus.
3. **Interactive Right-Edge Scroll Scrubber:** A fixed vertical 40-tick ruler along the right edge (`right: 24px`) that highlights on scroll and lets visitors click-and-drag to spin the 3D ring or scrub down the page.
4. **Dedicated `/artists` ("Sombongin Our Artists") Page:** A full showcase route built to flex (*sombongin*) Epiphrame's illustrators with custom character avatars, achievement badges (`50M+ Campaign Views`), interactive **Rough Sketch vs. Final Ad** sliders, and speedpaint video/GIF reels.

## 2. Locked LTS Tech Stack & Anti-Breach Security Baseline

Never use `canary`, `rc`, `beta`, React 19, or Tailwind v4. Lock these exact versions in `package.json` and `package-lock.json`:

| Layer | Locked Package & Version | Purpose & Security Rationale |
| :--- | :--- | :--- |
| **Runtime** | `node@22.x` (`>=22.22.0` LTS "Jod") | Patched against `CVE-2025-59465` and `CVE-2025-55132` ([Node 22 LTS](https://www.google.com/search?q=https%3A%2F%2Fnodejs.org%2Fen%2Fblog%2Frelease%2Fv22.22.0), [Node 20 LTS](https://www.google.com/search?q=https%3A%2F%2Fnodejs.org%2Fen%2Fblog%2Frelease%2Fv20.20.0)). Pinned in `package.json` `"engines"` for [Vercel](https://www.google.com/search?q=https%3A%2F%2Fvercel.com%2Fdocs%2Fframeworks%2Ffull-stack%2Fnextjs). |
| **Framework** | `next@14.2.25` (or latest `14.2.x` patch) | Patched against the Middleware Authorization Bypass vulnerability ([CVE-2025-29927](https://www.google.com/search?q=https%3A%2F%2Fnvd.nist.gov%2Fvuln%2Fdetail%2FCVE-2025-29927), [Datadog Security Advisory](https://www.google.com/search?q=https%3A%2F%2Fsecuritylabs.datadoghq.com%2Farticles%2Fnextjs-middleware-auth-bypass%2F)). |
| **React Core** | `react@18.3.1` + `react-dom@18.3.1` | Required for 100% peer-dependency stability with `@react-three/fiber@8` ([R3F Installation Docs](https://www.google.com/search?q=https%3A%2F%2Fr3f.docs.pmnd.rs%2Fgetting-started%2Finstallation)). |
| **3D & WebGL** | `three@~0.169.0` + `@types/three@~0.169.0` + `@react-three/fiber@^8.17.10` + `@react-three/drei@^9.114.0` | Stable React 18 3D rendering pipeline supporting `useTexture` (images) and `useVideoTexture` (videos). |
| **Styling** | `tailwindcss@3.4.19` + `postcss@^8.4.49` + `autoprefixer@^10.4.20` | Mature v3.4 release ([VersionLog Tailwind CSS](https://www.google.com/search?q=https%3A%2F%2Fversionlog.com%2Ftailwind-css%2F)) with zero parser regressions. |
| **Scroll & UI Motion** | `lenis@^1.1.16` + `gsap@^3.12.5` + `framer-motion@^11.15.0` + `lucide-react@^0.460.0` | Smooth inertial scroll velocity for the 3D ring and UI transitions. |
| **Validation** | `zod@^3.23.8` | Strict server-side input sanitization and length caps for the contact inquiry form. |

## 3. Complete Visual & Media Asset Manifest (`/public/assets/`)

Place the generated demo images, custom `.mp4`, and custom `.gif` files into `/public/assets/` using the exact paths below:

| Asset Category | Source File | Target Path in Next.js Project | Usage in Application |
| :--- | :--- | :--- | :--- |
| **Custom Sample Video (`.mp4`)** | `cycle-ad-reel.mp4` (H.264 30fps loop; or fallback CC0 [flower.mp4](https://www.google.com/search?q=https%3A%2F%2Finteractive-examples.mdn.mozilla.net%2Fmedia%2Fcc0-videos%2Fflower.mp4)) | `/public/assets/media/cycle-ad-reel.mp4` | Mapped onto `mediaFormat: 'video'` cards in the 3D Circular Ring and the `/artists` speedpaint reel player. |
| **Custom Sample Sticker (`.gif`)** | `hangjam-sticker.gif` (Looping 24-frame animated character & flower sticker GIF) | `/public/assets/media/hangjam-sticker.gif` | Mapped onto `mediaFormat: 'gif'` cards in the 3D Circular Ring and the `/artists` animated sticker vault. |
| **3D Ring Card Textures (x4)** | `watermarked_img_14601288546943583792.jpg` (Slice into 4 vertical cards) | `/public/assets/cards/card-01.webp` to `card-04.webp` | Mapped onto `mediaFormat: 'image'` cards and `posterSrc` thumbnails in `<CircularRingHero />`. |
| **3D Mascot & Sticker Sprites** | `watermarked_img_16459024901153292627.jpg` (Slice 6 icons) | `/public/assets/mascots/flower-yellow.png`, `flower-pink.png`, `frame-blue.png`, `star-green.png` | Floating 3D/2D mascot accents perched on active cards and artist badges. |
| **Sketch vs. Final Ad Pair** | `watermarked_img_2634435353273313479.jpg` (Crop left & right halves) | `/public/assets/artists/sketch-01.webp` & `/public/assets/artists/final-01.webp` | Powers the interactive `<SketchToFinalSlider />` on `/artists`. |
| **Geometric & Squiggle Pattern** | `watermarked_img_15521347805319796112.jpg` | `/public/assets/patterns/vibe-tile-pattern.webp` | Used as the background texture on the CTA banner and artist header cards. |
| **3D Studio Isometric Key Art** | `watermarked_img_2508871853108222787.jpg` | `/public/assets/showcase/studio-isometric.webp` | Featured visual in Section `01 / WHY HUMAN ART WINS` and fallback card texture. |
| **UI Reference Mockups (x3)** | `watermarked_img_12009351697719634255.jpg`, `4797898249835888852.jpg`, `7129143143191923610.jpg` | `/docs/ui-ref-hero-ring.jpg`, `/docs/ui-ref-hero-focused.jpg`, `/docs/ui-ref-artists-page.jpg` | Visual layout references for Antigravity (`Hero Ring`, `Clicked Focus`, and `/artists` page). |

## 4. Design System & Color Tokens (`src/app/globals.css`)

```css
:root {
  --bg-surface: #F6EDE4;       /* Warm Editorial Cream (75% of screen) */
  --bg-card: #FFFFFF;          /* Crisp Gallery White */
  --text-primary: #211529;     /* Deep Charcoal Ink */
  --text-muted: #5E5466;       /* Muted Editorial Slate */
  --border-hairline: rgba(33, 21, 41, 0.14);
  --accent-blue: #1388E5;      /* Vibe Cobalt Blue */
  --accent-yellow: #FFD400;    /* Pure Sun Yellow (Flower Mascot) */
  --accent-pink: #FF66B2;      /* Bubblegum Pink */
  --accent-green: #1E7E48;     /* Vibe Forest Green */
  --accent-lavender: #D1CAEA;  /* Autumn Lavender */
  --accent-coral: #C45F3F;     /* Tomato Jam */
}

[data-theme="dark"] {
  --bg-surface: #211529;       /* Dark Disco */
  --bg-card: #2D1E38;
  --text-primary: #F6EDE4;
  --text-muted: #D1CAEA;
  --border-hairline: rgba(246, 237, 228, 0.15);
}
```

## 5. Complete Production Content & Dataset (`src/data/siteContent.ts`)

Create `src/data/siteContent.ts` with this exact dataset so zero placeholder text (`Lorem ipsum`) appears anywhere on the site:

```typescript
export type MediaFormat = 'image' | 'gif' | 'video';

export interface RingShowcaseItem {
  id: string;
  indexLabel: string;
  title: string;
  client: string;
  clientUrl: string;
  category: string;
  artistId: string;
  artistName: string;
  mediaFormat: MediaFormat;
  src: string;
  posterSrc: string;
  accentColor: string;
  metricsBadge: string;
  description: string;
}

export interface ArtistProfile {
  id: string;
  name: string;
  role: string;
  specialty: string;
  avatarSrc: string;
  emblemColor: string;
  sombongBadges: string[];
  bio: string;
  sketchComparison: {
    title: string;
    client: string;
    sketchSrc: string;
    finalSrc: string;
  };
  vaultItems: {
    title: string;
    mediaFormat: MediaFormat;
    src: string;
    posterSrc: string;
  }[];
}

export const SITE_COPY = {
  brandName: 'EPIPHRAME',
  tagline: 'Quirky human-drawn character art & scroll-stopping ads for AI worlds.',
  heroHint: 'SCROLL UP/DOWN TO SPIN RING · CLICK ANY CARD TO FOCUS',
  manifestoHeadline: 'AI apps need real human soul to stand out.',
  manifestoBody:
    'Generic AI-generated ads get scrolled past in 0.4 seconds. Epiphrame is a collective of illustrators and motion artists who hand-craft expressive characters, animated stickers, and high-converting video ads for leading character platforms like Cycle AI and Hangjam.',
  manifestoPills: [
    '100% Hand-Crafted by Human Artists',
    '50M+ Combined Campaign Views',
    'Image · Animated GIF · Video Ad Reels',
  ],
};

export const RING_SHOWCASE_ITEMS: RingShowcaseItem[] = [
  {
    id: 'cycle-hero-01',
    indexLabel: '01',
    title: 'Neon Ramen Date — Character Story Ad',
    client: 'Cycle AI',
    clientUrl: 'https://www.cycleai.ai/',
    category: 'VIDEO AD CAMPAIGN',
    artistId: 'iris',
    artistName: 'Iris',
    mediaFormat: 'video',
    src: '/assets/media/cycle-ad-reel.mp4',
    posterSrc: '/assets/cards/card-01.webp',
    accentColor: '#1388E5',
    metricsBadge: '14.2M Views · 3.8x CTR',
    description: 'Hand-drawn animated POV hook and character expression sheet for Cycle AI mobile user acquisition.',
  },
  {
    id: 'hangjam-hero-02',
    indexLabel: '02',
    title: 'Mischievous Alchemist — Roleplay Key Art',
    client: 'Hangjam',
    clientUrl: 'https://hangjam.ai/',
    category: 'CHARACTER ILLUSTRATION',
    artistId: 'raka',
    artistName: 'Raka',
    mediaFormat: 'image',
    src: '/assets/cards/card-02.webp',
    posterSrc: '/assets/cards/card-02.webp',
    accentColor: '#1E7E48',
    metricsBadge: 'Top #1 Trending Bot Art',
    description: 'Original character design and multi-emotion sprite pack for Hangjam interactive storytelling.',
  },
  {
    id: 'epiphrame-gif-03',
    indexLabel: '03',
    title: 'Vibe Flower & Mascot Reaction Pack',
    client: 'Epiphrame Originals',
    clientUrl: 'https://hangjam.ai/',
    category: 'ANIMATED GIF STICKERS',
    artistId: 'iris',
    artistName: 'Iris',
    mediaFormat: 'gif',
    src: '/assets/media/hangjam-sticker.gif',
    posterSrc: '/assets/cards/card-01.webp',
    accentColor: '#FFD400',
    metricsBadge: 'Looping 60fps Sticker Set',
    description: 'Playful looping GIF emote and sticker collection built for Discord and in-app chat reactions.',
  },
  {
    id: 'cycle-skater-04',
    indexLabel: '04',
    title: 'Streetwear Rival — Split-Screen Hook Ad',
    client: 'Cycle AI',
    clientUrl: 'https://www.cycleai.ai/',
    category: 'SOCIAL AD CREATIVE',
    artistId: 'nadia',
    artistName: 'Nadia',
    mediaFormat: 'image',
    src: '/assets/cards/card-03.webp',
    posterSrc: '/assets/cards/card-03.webp',
    accentColor: '#FF66B2',
    metricsBadge: '9.6M TikTok & Reels Views',
    description: 'High-contrast pop-color character illustration engineered to stop thumb-scroll on vertical feeds.',
  },
  {
    id: 'hangjam-world-05',
    indexLabel: '05',
    title: 'Starlight Painter — Interactive World Promo',
    client: 'Hangjam',
    clientUrl: 'https://hangjam.ai/',
    category: 'KEY ART & MOTION',
    artistId: 'bima',
    artistName: 'Bima',
    mediaFormat: 'image',
    src: '/assets/cards/card-04.webp',
    posterSrc: '/assets/cards/card-04.webp',
    accentColor: '#D1CAEA',
    metricsBadge: 'Featured App Store Banner',
    description: 'Vibrant cobalt-and-sunshine promotional illustration showcasing custom character creation.',
  },
  {
    id: 'studio-showcase-06',
    indexLabel: '06',
    title: 'Inside the Epiphrame Creative Lab',
    client: 'Epiphrame Collective',
    clientUrl: 'https://www.cycleai.ai/',
    category: '3D & ILLUSTRATION MIX',
    artistId: 'bima',
    artistName: 'Bima',
    mediaFormat: 'image',
    src: '/assets/showcase/studio-isometric.webp',
    posterSrc: '/assets/showcase/studio-isometric.webp',
    accentColor: '#C45F3F',
    metricsBadge: 'Collective Showcase',
    description: 'Where quirky hand-drawn storytelling meets disciplined ad performance.',
  },
  {
    id: 'cycle-hero-07',
    indexLabel: '07',
    title: 'Midnight Convenience Store — Anime Ad',
    client: 'Cycle AI',
    clientUrl: 'https://www.cycleai.ai/',
    category: 'VIDEO AD CAMPAIGN',
    artistId: 'raka',
    artistName: 'Raka',
    mediaFormat: 'video',
    src: '/assets/media/cycle-ad-reel.mp4',
    posterSrc: '/assets/cards/card-01.webp',
    accentColor: '#1388E5',
    metricsBadge: '11.4M Views · 42% Hook Rate',
    description: 'Dramatic lighting and expressive eye-contact animation crafted for paid social acquisition.',
  },
  {
    id: 'hangjam-hero-08',
    indexLabel: '08',
    title: 'Botanical Spirit Guide — Character Sheet',
    client: 'Hangjam',
    clientUrl: 'https://hangjam.ai/',
    category: 'CHARACTER DESIGN',
    artistId: 'nadia',
    artistName: 'Nadia',
    mediaFormat: 'image',
    src: '/assets/cards/card-02.webp',
    posterSrc: '/assets/cards/card-02.webp',
    accentColor: '#1E7E48',
    metricsBadge: '850K+ In-App Chats',
    description: 'Quirky multi-eyed monster and botanical mascot sheet with full expression variants.',
  },
];

export const ARTISTS_ROSTER: ArtistProfile[] = [
  {
    id: 'iris',
    name: 'Iris',
    role: 'Art Director & Lead Pop Illustrator',
    specialty: 'Quirky Character Pop, Color Systems & Viral Hook Art',
    avatarSrc: '/assets/mascots/flower-yellow.png',
    emblemColor: '#FFD400',
    sombongBadges: [
      '25M+ Ad Views Drawn',
      'Lead Palette & Vibe Architect',
      '100% Hand-Drawn (0% AI Slop)',
    ],
    bio: 'Architect of Epiphrame’s signature "quirky yet elegant" visual language—turning bold color blocks and expressive faces into scroll-stopping character campaigns.',
    sketchComparison: {
      title: 'Cycle AI — Starlight Companion Ad',
      client: 'Cycle AI',
      sketchSrc: '/assets/artists/sketch-01.webp',
      finalSrc: '/assets/artists/final-01.webp',
    },
    vaultItems: [
      {
        title: 'Procreate Speedpaint Timelapse (0:15)',
        mediaFormat: 'video',
        src: '/assets/media/cycle-ad-reel.mp4',
        posterSrc: '/assets/cards/card-01.webp',
      },
      {
        title: 'Bouncy Flower & Character Emote Loop',
        mediaFormat: 'gif',
        src: '/assets/media/hangjam-sticker.gif',
        posterSrc: '/assets/cards/card-01.webp',
      },
      {
        title: 'Final Campaign Key Art (4K)',
        mediaFormat: 'image',
        src: '/assets/cards/card-04.webp',
        posterSrc: '/assets/cards/card-04.webp',
      },
    ],
  },
  {
    id: 'raka',
    name: 'Raka',
    role: 'Lead Motion & Character Ad Animator',
    specialty: '2D Frame-by-Frame Animation, Live2D & High-Retention Video Ads',
    avatarSrc: '/assets/mascots/frame-blue.png',
    emblemColor: '#1388E5',
    sombongBadges: [
      '18M+ Video Ad Plays',
      'Cycle AI & Hangjam Motion Lead',
      '60fps Frame-by-Frame Craft',
    ],
    bio: 'Brings static character illustrations to life with fluid hair physics, micro-expressions, and kinetic typography tailored for TikTok, Reels, and YouTube Shorts.',
    sketchComparison: {
      title: 'Hangjam — Portal Fantasy Hook',
      client: 'Hangjam',
      sketchSrc: '/assets/artists/sketch-01.webp',
      finalSrc: '/assets/artists/final-01.webp',
    },
    vaultItems: [
      {
        title: 'Keyframe-to-Final Motion Breakdown',
        mediaFormat: 'video',
        src: '/assets/media/cycle-ad-reel.mp4',
        posterSrc: '/assets/cards/card-02.webp',
      },
      {
        title: 'Animated Character Blink & Wave GIF',
        mediaFormat: 'gif',
        src: '/assets/media/hangjam-sticker.gif',
        posterSrc: '/assets/cards/card-02.webp',
      },
      {
        title: 'Character Turnaround Sheet',
        mediaFormat: 'image',
        src: '/assets/cards/card-02.webp',
        posterSrc: '/assets/cards/card-02.webp',
      },
    ],
  },
  {
    id: 'nadia',
    name: 'Nadia',
    role: 'Senior Webtoon & Expression Specialist',
    specialty: 'Emotional Storytelling, Webtoon Panels & Romantic/Drama Ad Hooks',
    avatarSrc: '/assets/mascots/flower-pink.png',
    emblemColor: '#FF66B2',
    sombongBadges: [
      '3.9x Average Ad CTR',
      '120+ Original AI Personas Drawn',
      'Master of Micro-Expressions',
    ],
    bio: 'Specializes in first-frame emotional hooks—drawing the exact blush, smirk, or cliffhanger panel that makes viewers tap "Download" immediately.',
    sketchComparison: {
      title: 'Cycle AI — Rival to Lover Story Ad',
      client: 'Cycle AI',
      sketchSrc: '/assets/artists/sketch-01.webp',
      finalSrc: '/assets/artists/final-01.webp',
    },
    vaultItems: [
      {
        title: 'Lineart & Cel-Shading Process Reel',
        mediaFormat: 'video',
        src: '/assets/media/cycle-ad-reel.mp4',
        posterSrc: '/assets/cards/card-03.webp',
      },
      {
        title: 'Sticker Reaction Loop (GIF)',
        mediaFormat: 'gif',
        src: '/assets/media/hangjam-sticker.gif',
        posterSrc: '/assets/cards/card-03.webp',
      },
      {
        title: 'Vertical Story Ad Composite',
        mediaFormat: 'image',
        src: '/assets/cards/card-03.webp',
        posterSrc: '/assets/cards/card-03.webp',
      },
    ],
  },
  {
    id: 'bima',
    name: 'Bima',
    role: 'Worldbuilding & Key Art Illustrator',
    specialty: 'Isometric Environments, Props & App Store Feature Banners',
    avatarSrc: '/assets/mascots/star-green.png',
    emblemColor: '#1E7E48',
    sombongBadges: [
      'Featured on Play Store & App Store',
      'Environment & Prop Virtuoso',
      'Zero-Template Custom Worlds',
    ],
    bio: 'Builds lush, tactile worlds and perspective scenes that make digital character platforms feel like living, breathing universes.',
    sketchComparison: {
      title: 'Hangjam — Creator Playground Key Art',
      client: 'Hangjam',
      sketchSrc: '/assets/artists/sketch-01.webp',
      finalSrc: '/assets/artists/final-01.webp',
    },
    vaultItems: [
      {
        title: 'World Blocking to Final Render Reel',
        mediaFormat: 'video',
        src: '/assets/media/cycle-ad-reel.mp4',
        posterSrc: '/assets/showcase/studio-isometric.webp',
      },
      {
        title: 'Animated Prop & Mascot Loop (GIF)',
        mediaFormat: 'gif',
        src: '/assets/media/hangjam-sticker.gif',
        posterSrc: '/assets/cards/card-04.webp',
      },
      {
        title: 'App Store Hero Panorama',
        mediaFormat: 'image',
        src: '/assets/cards/card-04.webp',
        posterSrc: '/assets/cards/card-04.webp',
      },
    ],
  },
];
```

## 6. Reference Component Code for Antigravity

### 6.1 Hardened `next.config.mjs` (LTS + Three.js Transpilation + CSP for Image/GIF/Video)

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  eslint: {
    ignoreDuringBuilds: false,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://interactive-examples.mdn.mozilla.net",
              "media-src 'self' data: blob: https://interactive-examples.mdn.mozilla.net",
              "connect-src 'self' blob: data: https://interactive-examples.mdn.mozilla.net",
              "font-src 'self' data:",
              "object-src 'none'",
              "base-uri 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests",
            ].join('; '),
          },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

### 6.2 Multi-Media 3D Circular Ring (`src/components/canvas/CircularRingHero.tsx`)

Supports `image`, `gif`, and `video` on the 3D cards, rotates left/right on scroll down/up, and zooms the clicked card (`1.45x`) into center focus:

```tsx
'use client';

import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, RoundedBox, useTexture, useVideoTexture } from '@react-three/drei';
import * as THREE from 'three';
import { RING_SHOWCASE_ITEMS, RingShowcaseItem } from '@/data/siteContent';

function VideoCardMaterial({ src }: { src: string }) {
  const texture = useVideoTexture(src, {
    unsuspended: 'canplay',
    muted: true,
    loop: true,
    start: true,
    playsInline: true,
  });
  return <meshBasicMaterial map={texture} toneMapped={false} />;
}

function ImageCardMaterial({ src }: { src: string }) {
  const texture = useTexture(src);
  texture.colorSpace = THREE.SRGBColorSpace;
  return <meshBasicMaterial map={texture} toneMapped={false} />;
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
    const targetScale = isActive ? 1.45 : anyActive ? 0.88 : 1.0;
    const targetZOffset = isActive ? 0.85 : 0;

    meshRef.current.scale.x = THREE.MathUtils.damp(meshRef.current.scale.x, targetScale, 7, delta);
    meshRef.current.scale.y = THREE.MathUtils.damp(meshRef.current.scale.y, targetScale, 7, delta);
    meshRef.current.scale.z = THREE.MathUtils.damp(meshRef.current.scale.z, targetScale, 7, delta);

    const forwardX = Math.sin(angle) * (radius + targetZOffset);
    const forwardZ = Math.cos(angle) * (radius + targetZOffset);
    meshRef.current.position.x = THREE.MathUtils.damp(meshRef.current.position.x, forwardX, 7, delta);
    meshRef.current.position.z = THREE.MathUtils.damp(meshRef.current.position.z, forwardZ, 7, delta);
  });

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
      <RoundedBox args={[1.65, 2.25, 0.06]} radius={0.08} smoothness={4}>
        <Suspense fallback={<meshBasicMaterial color={item.accentColor} />}>
          {item.mediaFormat === 'video' ? (
            <VideoCardMaterial src={item.src} />
          ) : (
            <ImageCardMaterial src={item.posterSrc} />
          )}
        </Suspense>
      </RoundedBox>

      {/* Native looping GIF overlay when mediaFormat === 'gif' */}
      {item.mediaFormat === 'gif' && (
        <Html transform distanceFactor={3.2} position={[0, 0, 0.04]} pointerEvents="none">
          <img
            src={item.src}
            alt={item.title}
            className="w-40 h-56 object-cover rounded-xl shadow-md"
          />
        </Html>
      )}
    </group>
  );
}

function RingStage({
  activeIndex,
  setActiveIndex,
  scrollRotationRef,
}: {
  activeIndex: number | null;
  setActiveIndex: (i: number | null) => void;
  scrollRotationRef: React.MutableRefObject<number>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const total = RING_SHOWCASE_ITEMS.length;
  const radius = 4.2;

  const handleSelect = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
      const targetAngle = -(index / total) * Math.PI * 2;
      scrollRotationRef.current = targetAngle;
    }
  };

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      scrollRotationRef.current,
      6,
      delta
    );
  });

  return (
    <group ref={groupRef}>
      {RING_SHOWCASE_ITEMS.map((item, i) => (
        <RingCard
          key={item.id}
          item={item}
          index={i}
          total={total}
          radius={radius}
          isActive={activeIndex === i}
          anyActive={activeIndex !== null}
          onSelect={handleSelect}
        />
      ))}
    </group>
  );
}

export default function CircularRingHero() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const scrollRotationRef = useRef<number>(0);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      // Scrolling down turns ring left; scrolling up turns ring right
      scrollRotationRef.current += e.deltaY * 0.0022;
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    return () => window.removeEventListener('wheel', onWheel);
  }, []);

  const activeItem = activeIndex !== null ? RING_SHOWCASE_ITEMS[activeIndex] : null;

  return (
    <section className="relative w-full h-screen bg-[var(--bg-surface)] overflow-hidden select-none">
      <Canvas
        camera={{ position: [0, 0.35, 8.2], fov: 38 }}
        dpr={[1, 1.5]}
        onPointerMissed={() => setActiveIndex(null)}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 6, 5]} intensity={0.8} />
        <RingStage
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          scrollRotationRef={scrollRotationRef}
        />
      </Canvas>

      {/* Spacious Bottom-Left Focused Campaign Overlay */}
      {activeItem && (
        <div className="absolute bottom-10 left-10 z-20 max-w-md pointer-events-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-xs uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#211529] text-[#F6EDE4]">
              {activeItem.indexLabel} / {activeItem.category}
            </span>
            <span
              className="font-mono text-xs font-semibold px-2.5 py-1 rounded-full text-[#211529]"
              style={{ backgroundColor: activeItem.accentColor }}
            >
              {activeItem.metricsBadge}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
            {activeItem.title}
          </h2>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Client: <a href={activeItem.clientUrl} target="_blank" rel="noreferrer" className="underline font-semibold">{activeItem.client}</a> · Illustrated by{' '}
            <a href={`/artists#${activeItem.artistId}`} className="underline font-semibold">
              {activeItem.artistName} (Epiphrame Collective)
            </a>
          </p>
        </div>
      )}
    </section>
  );
}
```

### 6.3 Interactive Sketch-vs-Final Ad Slider (`src/components/artists/SketchToFinalSlider.tsx`)

```tsx
'use client';

import React, { useState } from 'react';

export function SketchToFinalSlider({
  sketchSrc,
  finalSrc,
  title,
}: {
  sketchSrc: string;
  finalSrc: string;
  title: string;
}) {
  const [splitPercent, setSplitPercent] = useState(50);

  return (
    <div
      className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-[var(--border-hairline)] select-none cursor-ew-resize bg-white"
      onPointerMove={(e) => {
        if (e.buttons !== 1) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const pct = Math.min(95, Math.max(5, ((e.clientX - rect.left) / rect.width) * 100));
        setSplitPercent(pct);
      }}
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const pct = Math.min(95, Math.max(5, ((e.clientX - rect.left) / rect.width) * 100));
        setSplitPercent(pct);
      }}
    >
      <img src={finalSrc} alt={`${title} Final`} className="absolute inset-0 w-full h-full object-cover" />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - splitPercent}% 0 0)` }}
      >
        <img src={sketchSrc} alt={`${title} Sketch`} className="w-full h-full object-cover" />
      </div>
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-[#211529]"
        style={{ left: `${splitPercent}%` }}
      >
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#FFD400] border-2 border-[#211529] flex items-center justify-center font-mono text-xs font-bold shadow">
          ||
        </div>
      </div>
      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 text-[#211529] font-mono text-[11px] font-semibold">
        RAW HUMAN SKETCH
      </span>
      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#1388E5] text-white font-mono text-[11px] font-semibold">
        FINAL VIRAL AD
      </span>
    </div>
  );
}
```

## 7. Zero-Error Vercel Deployment Specification

### 7.1 Mandatory `next/dynamic` Client-Only Import for Three.js (`src/app/page.tsx`)
Always import `<CircularRingHero />` dynamically with `ssr: false` so [Vercel](https://www.google.com/search?q=https%3A%2F%2Fvercel.com%2Fdocs%2Fframeworks%2Ffull-stack%2Fnextjs) server prerendering never hits `window is not defined`:

```tsx
import dynamic from 'next/dynamic';

const CircularRingHero = dynamic(
  () => import('@/components/canvas/CircularRingHero'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-screen bg-[#F6EDE4] flex items-center justify-center font-mono text-xs tracking-widest text-[#211529]">
        LOADING EPIPHRAME 3D RING...
      </div>
    ),
  }
);
```

### 7.2 `package.json` Node 22 LTS Engine Pinning & `vercel.json` Edge Caching

Add `"engines": { "node": "22.x" }` in `package.json`, and create `vercel.json` in the project root:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "nextjs",
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## 8. End-to-End Execution Runbook: From PRD to Live Vercel Link

Follow these 5 steps in order once you download this PRD and the generated media files:

### Step 1: Create Your Project Folder & Place the PRD + Assets
1. Create a new folder on your computer named `epiphrame-web` and open it in **Antigravity**.
2. Save this document as `epiphrame_company_profile_prd.md` in the root of `epiphrame-web`.
3. Download the generated assets from the chat and place them into a `raw-assets/` folder inside `epiphrame-web`:
   * `cycle-ad-reel.mp4` (Sample H.264 video loop)
   * `hangjam-sticker.gif` (Sample animated character & flower sticker GIF)
   * The 4-card character illustration sheet (`watermarked_img_14601288546943583792.jpg`)
   * The 6-icon 3D mascot sheet (`watermarked_img_16459024901153292627.jpg`)
   * The side-by-side Sketch-vs-Final sheet (`watermarked_img_2634435353273313479.jpg`)
   * The geometric tile pattern (`watermarked_img_15521347805319796112.jpg`) & 3D isometric studio (`watermarked_img_2508871853108222787.jpg`)
   * The 3 UI reference mockups (`Hero Ring`, `Clicked Focus`, and `/artists` page)

### Step 2: Prompt 1 in Antigravity — Scaffold Locked LTS Stack & Slice Assets
Paste **Prompt 1** into Antigravity's agent chat:

> **Prompt 1 (Foundation & Asset Slicing):**
> "Read `epiphrame_company_profile_prd.md` (v3.2). First, initialize a Next.js project in this directory using the exact locked LTS versions from Section 2 (`next@14.2.25`, `react@18.3.1`, `react-dom@18.3.1`, `tailwindcss@3.4.19`, `three@~0.169.0`, `@types/three@~0.169.0`, `@react-three/fiber@^8.17.10`, `@react-three/drei@^9.114.0`, `lenis@^1.1.16`, `gsap@^3.12.5`, `framer-motion@^11.15.0`, `lucide-react@^0.460.0`, `zod@^3.23.8`). Second, write a quick Node/Python helper script to crop and copy the images in `raw-assets/` into `/public/assets/` matching the exact filenames in Section 3 (`card-01.webp` to `card-04.webp`, `flower-yellow.png`, `flower-pink.png`, `frame-blue.png`, `star-green.png`, `sketch-01.webp`, `final-01.webp`, `vibe-tile-pattern.webp`, `studio-isometric.webp`, `cycle-ad-reel.mp4`, and `hangjam-sticker.gif`). Third, create `next.config.mjs`, `vercel.json`, `src/app/globals.css`, and `src/data/siteContent.ts` verbatim from Sections 4, 5, 6.1, and 7.2."

### Step 3: Prompt 2 in Antigravity — Build the Home Page & 3D Circular Ring
Once Step 2 finishes, paste **Prompt 2**:

> **Prompt 2 (Home Page & Multi-Media 3D Ring):**
> "Using `epiphrame_company_profile_prd.md` and the UI references (`ui-ref-hero-ring.jpg` and `ui-ref-hero-focused.jpg`), build:
> 1. The minimal top Navbar (`EPIPHRAME`, `WORKS`, `ARTISTS`, `CAMPAIGNS`, `LET'S TALK`, plus light/dark theme toggle).
> 2. `<CircularRingHero />` (`src/components/canvas/CircularRingHero.tsx`) from Section 6.2 supporting `image`, `gif`, and `video` cards, scroll-down = turn-left, scroll-up = turn-right, click-to-zoom (`1.45x` in front-center), and floating yellow flower mascot accent.
> 3. `<InteractiveScrollRuler />` (`src/components/ui/InteractiveScrollRuler.tsx`) fixed on the right edge (`right-6`) with 40 tick marks that highlight in `#1388E5` on scroll and support click-and-drag scrubbing.
> 4. The spacious Home page (`src/app/page.tsx`) importing `<CircularRingHero />` via `next/dynamic` (`ssr: false`), followed by Section `01 / WHY HUMAN ART WINS`, Section `02 / SELECTED CAMPAIGNS` (Cycle AI & Hangjam), Section `03 / ARTIST ROSTER TEASER`, and the Zod-validated Inquiry Drawer."

### Step 4: Prompt 3 in Antigravity — Build the `/artists` ("Sombongin Our Artists") Page & Verify Build
Once Step 3 finishes, paste **Prompt 3**:

> **Prompt 3 (`/artists` Flex Page & Production Build Check):**
> "Using `epiphrame_company_profile_prd.md` and `ui-ref-artists-page.jpg`, build the dedicated `/artists` page (`src/app/artists/page.tsx`) featuring:
> 1. The interactive horizontal Artist Roster Bar (`ARTISTS_ROSTER` from `src/data/siteContent.ts`) with custom avatars and flower emblems.
> 2. The Artist Spotlight stage showing the selected artist's 'Sombong' achievement badges (`25M+ Ad Views Drawn`, etc.), `<SketchToFinalSlider />` (`src/components/artists/SketchToFinalSlider.tsx` from Section 6.3), and the 3-card Multi-Media Vault (`video` speedpaint reel, `gif` sticker loop, and `image` key art), plus a `'BOOK THIS STYLE ↗'` button.
> 3. Finally, run `npm run build` and `npm audit --production` in the terminal and fix any TypeScript or ESLint issues until `next build` exits with code 0."

### Step 5: Deploy to Vercel & Share with Your Team
1. **Option A (Fastest — Direct CLI from Antigravity Terminal):**
   * Run `npx vercel` in Antigravity's terminal, log in to your Vercel account, and press Enter on the default settings.
   * Run `npx vercel --prod` to publish the production URL (e.g., `https://epiphrame-web.vercel.app`) and drop the link in Discord for Iris and the team!
2. **Option B (GitHub Auto-Deploy — Best for Team Collaboration):**
   * Run `git init && git add . && git commit -m "feat: initial Epiphrame interactive company profile"` and push to a GitHub repository.
   * Open [Vercel New Project](https://www.google.com/search?q=https%3A%2F%2Fvercel.com%2Fdocs%2Fdeployments), import the GitHub repo, and click **Deploy**—every future `git push` will automatically update your live team link.