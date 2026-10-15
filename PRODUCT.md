# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are creative directors, marketing leaders, and founders at AI character platforms, consumer apps, and modern gaming/tech companies (e.g., Cycle AI, Hangjam). They evaluate Epiphrame to commission bespoke, high-converting illustration campaigns, motion reels, animated stickers, and distinctive mascot designs that make their AI products visually memorable and human.

## Product Purpose

Epiphrame serves as the digital front door and interactive portfolio collective for elite human illustrators and motion animators. It showcases expressive proof of work, verifiable client impact metrics, and streamlined inquiry booking—demonstrating that real human soul and quirky craft decisively outperform generic AI-generated slop.

## Positioning

"AI apps need real human soul to stand out." Generic AI imagery gets scrolled past in seconds. Epiphrame offers 100% human-crafted character art with genuine personality, tactile detail, and playful storytelling, backed by interactive 3D WebGL showcase technology and over 50M+ combined campaign impressions.

## Operating Context

- Prospective clients review the web portfolio on desktop and mobile browsers.
- Key interactions include spinning the interactive 3D hero cylinder ring, inspecting 9:16 portrait video campaign reels, comparing sketch-to-final workflows, and initiating creative inquiries via the interactive inquiry drawer.

## Capabilities and Constraints

- **Stack**: Next.js 14 (App Router), React 18, Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`), Tailwind CSS, Framer Motion, and GSAP.
- **Performance**: Strict 60 FPS budget for WebGL shaders, cylinder orbit physics, and video textures.
- **Assets**: 8 hardware-accelerated portrait video card loops (`/assets/hero_card/card_1.mp4` through `card_8.mp4`), bespoke typography (Fredoka, Syne, Plus Jakarta Sans), and responsive inquiry drawer.

## Brand Commitments

- **Name**: EPIPHRAME.
- **Voice**: Playful, confident, energik, and artistically authentic.
- **Visual Identity**: Warm tactile surfaces (`var(--bg-surface)` #FAF6F0), luminous cyber/glass accents, subtle paper textures, and expressive character art.

## Evidence on Hand

- 8 production-grade video loops in `public/assets/hero_card/` (`card_1.mp4` – `card_8.mp4`).
- Client campaign case studies with verified metrics (Cycle AI, Hangjam, etc.) in `src/data/siteContent.ts`.
- Artist roster and sketch-to-final interactive comparisons in `src/components/artists/SketchToFinalSlider.tsx`.

## Product Principles

1. **Human Soul Over Synthetic Blandness**: Every artwork and showcase element celebrates tangible human creativity, intentional imperfection, and memorable style.
2. **Tactile & Interactive Craft**: Interfaces should feel responsive, playful, and physical—combining 3D WebGL orbit navigation with smooth micro-interactions.
3. **Respect for Performance**: Rich visual effects (custom shaders, glass refractions, video textures) must never sacrifice 60 FPS responsiveness or accessibility.
4. **Actionable Commercial Proof**: Art is backed by real campaign conversions and clear client inquiries.
