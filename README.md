# EPIPHRAME — Illustration Collective & Character AI Ad Studio

> **"Quirky, fun, engaging, BUT elegant and professional"**  
> 75% Open Editorial Cream Whitespace (`#F6EDE4`) + Multi-Media Three.js 3D Circular Ring Hero + Interactive Scroll Scrubber + Dedicated `/artists` Showcase Page.

Epiphrame is an artist collective crafting 100% hand-drawn character illustrations, animated GIFs, and high-converting video ad campaigns for AI character & storytelling platforms (such as [Cycle AI](https://www.cycleai.ai/) and [Hangjam](https://hangjam.ai/)).

---

## 🎨 Features

- **Multi-Media 3D Circular Ring Hero (`image` \| `gif` \| `video`)**: A floating Three.js 3D circular carousel supporting static `.webp` illustrations (`useTexture`), looping `.mp4` video ads (`useVideoTexture`), and animated `.gif` emotes.
- **Scroll Physics & Focus**: Scroll-down = turn left, scroll-up = turn right, click-to-zoom (`1.45x` front-center focus), plus floating yellow flower mascot accent (`flower-yellow.png`).
- **Interactive Right-Edge Scroll Scrubber**: 40-tick ruler along the right edge with `#1388E5` active highlights and click-and-drag timeline scrubbing.
- **Section 01 / Why Human Art Wins**: Manifesto on why AI platforms need human craft, 0.4s vs 3.8s hook retention benchmark, and isometric studio showcase.
- **Section 02 / Selected Campaigns**: Interactive campaign grid filtering by Cycle AI, Hangjam, and Collective originals with video playback and gif previews.
- **Section 03 / Artist Roster Teaser**: Squad cards for Iris, Raka, Nadia, and Bima with custom mascot avatars and sombong achievement badges.
- **Dedicated `/artists` Flex Page**: Full showcase route with horizontal interactive roster bar, `<SketchToFinalSlider />` (rough pencil sketch vs. final viral ad), speedpaint video reel player, and 3-card multi-media vault.
- **Zod-Validated Inquiry Drawer**: Slide-over drawer with strict schema validation for client briefs, budget selection, and artist lead preferences.
- **Light / Dark Mode**: Theme toggle with persistent storage and custom CSS design tokens.

---

## 🔒 Locked LTS Tech Stack

- **Runtime**: Node.js `22.x` LTS
- **Framework**: Next.js `14.2.25` (App Router)
- **React**: React `18.3.1` + React DOM `18.3.1`
- **3D & WebGL**: Three.js `~0.169.0` + `@react-three/fiber@^8.17.10` + `@react-three/drei@^9.114.0`
- **Styling**: Tailwind CSS `3.4.19` + PostCSS + Autoprefixer
- **Scroll & Motion**: Lenis `^1.1.16` + GSAP `^3.12.5` + Framer Motion `^11.15.0`
- **Validation**: Zod `^3.23.8`
- **Icons**: Lucide React `^0.460.0`

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 🚢 Deploying to Vercel

### Option 1: Automatic GitHub Import (Recommended)
1. Push this repository to GitHub.
2. In the [Vercel Dashboard](https://vercel.com/new), click **Import Project** and select this repository.
3. Keep default settings (`Framework: Next.js`, root directory `./`).
4. Click **Deploy**. Vercel will automatically read `vercel.json` for asset caching and build the project.

### Option 2: Vercel CLI
```bash
npx vercel
npx vercel --prod
```

---

## 📄 License
© 2026 Epiphrame Collective. All rights reserved.
