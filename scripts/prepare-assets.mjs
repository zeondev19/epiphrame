#!/usr/bin/env node
/**
 * prepare-assets.mjs
 * -------------------
 * Crops and copies raw source images from `raw-assets/` into
 * `public/assets/` matching the exact filenames required by the
 * Epiphrame PRD Section 3.
 *
 * Usage:  node scripts/prepare-assets.mjs
 *
 * Dependencies: Uses the `sharp` image library (installed as a
 * one-off dev dependency). If sharp is not installed, run:
 *   npm install --save-dev sharp
 *
 * Source mapping (raw-assets/ → public/assets/):
 *
 *  asset-1-character-cards-sheet.jpg  →  cards/card-01..04.webp   (4 vertical slices)
 *  asset-2-3d-mascots-sheet.jpg      →  mascots/flower-yellow.png,
 *                                        flower-pink.png, frame-blue.png,
 *                                        star-green.png              (4 of 6 icons)
 *  asset-3-sketch-vs-final-sheet.jpg →  artists/sketch-01.webp,
 *                                        artists/final-01.webp       (left/right halves)
 *  asset-4-vibe-tile-pattern.jpg     →  patterns/vibe-tile-pattern.webp
 *  asset-5-studio-isometric.jpg      →  showcase/studio-isometric.webp
 *  cycle-ad-reel.mp4                 →  media/cycle-ad-reel.mp4      (direct copy)
 *  hangjam-sticker.gif               →  media/hangjam-sticker.gif    (direct copy)
 */

import { existsSync, mkdirSync, copyFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Resolve project root
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');
const RAW = join(ROOT, 'raw-assets');
const PUBLIC = join(ROOT, 'public', 'assets');

// Ensure output directories exist
const DIRS = ['cards', 'mascots', 'artists', 'patterns', 'showcase', 'media'];
for (const d of DIRS) {
  const p = join(PUBLIC, d);
  if (!existsSync(p)) mkdirSync(p, { recursive: true });
}

// Dynamic import of sharp (it's ESM-compatible)
let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.error(
    '❌  sharp is not installed. Run:\n' +
    '    npm install --save-dev sharp\n' +
    '  Then re-run this script.'
  );
  process.exit(1);
}

// ─── Helpers ───────────────────────────────────────────────

async function getMetadata(filePath) {
  return sharp(filePath).metadata();
}

/**
 * Crop a region from `src` and save as webp to `dest`.
 */
async function cropToWebp(src, dest, left, top, width, height) {
  await sharp(src)
    .extract({ left: Math.round(left), top: Math.round(top), width: Math.round(width), height: Math.round(height) })
    .webp({ quality: 88 })
    .toFile(dest);
  console.log(`  ✔ ${dest}`);
}

/**
 * Crop a region from `src` and save as PNG to `dest`.
 */
async function cropToPng(src, dest, left, top, width, height) {
  await sharp(src)
    .extract({ left: Math.round(left), top: Math.round(top), width: Math.round(width), height: Math.round(height) })
    .png()
    .toFile(dest);
  console.log(`  ✔ ${dest}`);
}

/**
 * Convert full image to webp.
 */
async function convertToWebp(src, dest) {
  await sharp(src)
    .webp({ quality: 88 })
    .toFile(dest);
  console.log(`  ✔ ${dest}`);
}

/**
 * Copy a file verbatim.
 */
function copyFile(src, dest) {
  copyFileSync(src, dest);
  console.log(`  ✔ ${dest}`);
}


// ─── 1) Card Textures: Slice the 4-card character sheet into 4 vertical cards ─

async function sliceCards() {
  const src = join(RAW, 'asset-1-character-cards-sheet.jpg');
  if (!existsSync(src)) {
    console.warn(`  ⚠ Skipping cards — source not found: ${src}`);
    return;
  }
  console.log('\n📐 Slicing card textures from character sheet...');
  const { width, height } = await getMetadata(src);
  const cardW = Math.floor(width / 4);
  for (let i = 0; i < 4; i++) {
    const dest = join(PUBLIC, 'cards', `card-0${i + 1}.webp`);
    await cropToWebp(src, dest, i * cardW, 0, cardW, height);
  }
}

// ─── 2) Mascot Sprites: Extract 4 icons from the 6-icon sheet ────────────────

async function sliceMascots() {
  const src = join(RAW, 'asset-2-3d-mascots-sheet.jpg');
  if (!existsSync(src)) {
    console.warn(`  ⚠ Skipping mascots — source not found: ${src}`);
    return;
  }
  console.log('\n🌸 Extracting mascot sprites from icon sheet...');
  const { width, height } = await getMetadata(src);

  // Assume a 3×2 grid (3 columns, 2 rows) of icons
  const cols = 3;
  const rows = 2;
  const cellW = Math.floor(width / cols);
  const cellH = Math.floor(height / rows);

  // Map 4 icons: positions in the grid (col, row)
  const icons = [
    { name: 'flower-yellow.png', col: 0, row: 0 },
    { name: 'flower-pink.png',   col: 1, row: 0 },
    { name: 'frame-blue.png',    col: 2, row: 0 },
    { name: 'star-green.png',    col: 0, row: 1 },
  ];

  for (const icon of icons) {
    const dest = join(PUBLIC, 'mascots', icon.name);
    await cropToPng(
      src, dest,
      icon.col * cellW, icon.row * cellH,
      cellW, cellH
    );
  }
}

// ─── 3) Sketch vs Final: Crop left and right halves ──────────────────────────

async function sliceSketchFinal() {
  const src = join(RAW, 'asset-3-sketch-vs-final-sheet.jpg');
  if (!existsSync(src)) {
    console.warn(`  ⚠ Skipping sketch/final — source not found: ${src}`);
    return;
  }
  console.log('\n✂️  Cropping sketch vs. final halves...');
  const { width, height } = await getMetadata(src);
  const halfW = Math.floor(width / 2);

  await cropToWebp(src, join(PUBLIC, 'artists', 'sketch-01.webp'), 0, 0, halfW, height);
  await cropToWebp(src, join(PUBLIC, 'artists', 'final-01.webp'), halfW, 0, halfW, height);
}

// ─── 4) Vibe Tile Pattern: Full image conversion ────────────────────────────

async function convertPattern() {
  const src = join(RAW, 'asset-4-vibe-tile-pattern.jpg');
  if (!existsSync(src)) {
    console.warn(`  ⚠ Skipping pattern — source not found: ${src}`);
    return;
  }
  console.log('\n🎨 Converting vibe tile pattern...');
  await convertToWebp(src, join(PUBLIC, 'patterns', 'vibe-tile-pattern.webp'));
}

// ─── 5) Studio Isometric: Full image conversion ─────────────────────────────

async function convertIsometric() {
  const src = join(RAW, 'asset-5-studio-isometric.jpg');
  if (!existsSync(src)) {
    console.warn(`  ⚠ Skipping isometric — source not found: ${src}`);
    return;
  }
  console.log('\n🏗️  Converting studio isometric key art...');
  await convertToWebp(src, join(PUBLIC, 'showcase', 'studio-isometric.webp'));
}

// ─── 6) Media: Direct copy of video and GIF ─────────────────────────────────

function copyMedia() {
  console.log('\n📹 Copying media files (mp4, gif)...');

  const mp4Src = join(RAW, 'cycle-ad-reel.mp4');
  if (existsSync(mp4Src)) {
    copyFile(mp4Src, join(PUBLIC, 'media', 'cycle-ad-reel.mp4'));
  } else {
    console.warn(`  ⚠ Skipping mp4 — source not found: ${mp4Src}`);
  }

  const gifSrc = join(RAW, 'hangjam-sticker.gif');
  if (existsSync(gifSrc)) {
    copyFile(gifSrc, join(PUBLIC, 'media', 'hangjam-sticker.gif'));
  } else {
    console.warn(`  ⚠ Skipping gif — source not found: ${gifSrc}`);
  }
}

// ─── 7) UI Reference Mockups: Copy to /docs/ ────────────────────────────────

function copyUiRefs() {
  console.log('\n📋 Copying UI reference mockups to /docs/...');
  const docsDir = join(ROOT, 'docs');
  if (!existsSync(docsDir)) mkdirSync(docsDir, { recursive: true });

  const refs = [
    { src: 'ui-ref-hero-ring.jpg',     dest: 'ui-ref-hero-ring.jpg' },
    { src: 'ui-ref-hero-focused.jpg',   dest: 'ui-ref-hero-focused.jpg' },
    { src: 'ui-ref-artists-page.jpg',   dest: 'ui-ref-artists-page.jpg' },
  ];

  for (const ref of refs) {
    const srcPath = join(RAW, ref.src);
    if (existsSync(srcPath)) {
      copyFile(srcPath, join(docsDir, ref.dest));
    } else {
      console.warn(`  ⚠ Skipping UI ref — source not found: ${srcPath}`);
    }
  }
}

// ─── Run All ─────────────────────────────────────────────────────────────────

console.log('🚀 Epiphrame Asset Preparation Script');
console.log('=====================================');

try {
  await sliceCards();
  await sliceMascots();
  await sliceSketchFinal();
  await convertPattern();
  await convertIsometric();
  copyMedia();
  copyUiRefs();
  console.log('\n✅ All assets prepared successfully!\n');
} catch (err) {
  console.error('\n❌ Asset preparation failed:', err);
  process.exit(1);
}
