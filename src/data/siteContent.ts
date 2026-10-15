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
  videoTextureSrc?: string; // Hardware-accelerated MP4 loop for both video & GIF cards in WebGL
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
  manifestoHeadline: 'Feeds are flooded with identical AI art. Hand-drawn work stops the scroll.',
  manifestoBody:
    'Prompt-generated ads drop off in 0.4 seconds because viewers recognize the template. We illustrate original characters, looping stickers, and ad sequences for platforms like Cycle AI and Hangjam, drawn frame by frame by actual artists.',
  manifestoPills: [
    '100% Hand-Crafted by Human Artists',
    '50M+ Combined Campaign Views',
    'Image · Animated GIF · Video Ad Reels',
  ],
};

export const RING_SHOWCASE_ITEMS: RingShowcaseItem[] = [
  {
    id: 'cycle-ramen-01',
    indexLabel: '01',
    title: 'Neon Ramen Date: Character Story Ad',
    client: 'Cycle AI',
    clientUrl: 'https://www.cycleai.ai/',
    category: '9:16 VIDEO ADS',
    artistId: 'iris',
    artistName: 'Iris',
    mediaFormat: 'video',
    src: '/assets/hero_card/card_1.webm',
    videoTextureSrc: '/assets/hero_card/card_1.webm',
    posterSrc: '/assets/cards/card-01.webp',
    accentColor: '#FF425E',
    metricsBadge: '14.2M Views · 3.8x CTR',
    description: 'Hand-drawn animated POV hook and character expression sheet for Cycle AI mobile user acquisition.',
  },
  {
    id: 'hangjam-alchemist-02',
    indexLabel: '02',
    title: 'Mischievous Alchemist: Roleplay Key Art',
    client: 'Hangjam',
    clientUrl: 'https://hangjam.ai/',
    category: 'CHARACTER SHEETS',
    artistId: 'raka',
    artistName: 'Raka',
    mediaFormat: 'video',
    src: '/assets/hero_card/card_2.webm',
    videoTextureSrc: '/assets/hero_card/card_2.webm',
    posterSrc: '/assets/cards/card-02.webp',
    accentColor: '#204A36',
    metricsBadge: 'Top #1 Trending Bot Art',
    description: 'Original character design and potion-cloud sprite pack for Hangjam interactive storytelling.',
  },
  {
    id: 'epiphrame-dj-gif-03',
    indexLabel: '03',
    title: 'Botanical Spirit DJ: Animated Sticker Loop',
    client: 'Epiphrame Originals',
    clientUrl: 'https://hangjam.ai/',
    category: 'ANIMATED GIF STICKERS',
    artistId: 'iris',
    artistName: 'Iris',
    mediaFormat: 'video',
    src: '/assets/hero_card/card_3.webm',
    videoTextureSrc: '/assets/hero_card/card_3.webm',
    posterSrc: '/assets/cards/card-03.webp',
    accentColor: '#F3A72E',
    metricsBadge: 'Looping 60fps Sticker Set',
    description: 'Playful looping turntable and flower mascot collection built for Discord and in-app reactions.',
  },
  {
    id: 'cycle-skater-04',
    indexLabel: '04',
    title: 'Streetwear Skater: Vertical Feed Hook',
    client: 'Cycle AI',
    clientUrl: 'https://www.cycleai.ai/',
    category: '9:16 VIDEO ADS',
    artistId: 'nadia',
    artistName: 'Nadia',
    mediaFormat: 'video',
    src: '/assets/hero_card/card_4.webm',
    videoTextureSrc: '/assets/hero_card/card_4.webm',
    posterSrc: '/assets/cards/card-04.webp',
    accentColor: '#FF425E',
    metricsBadge: '9.6M TikTok & Reels Views',
    description: 'High-contrast pop-color character illustration engineered to stop thumb-scroll on vertical feeds.',
  },
  {
    id: 'hangjam-painter-05',
    indexLabel: '05',
    title: 'Starlight Painter: Interactive World Promo',
    client: 'Hangjam',
    clientUrl: 'https://hangjam.ai/',
    category: 'APP STORE KEY ART',
    artistId: 'bima',
    artistName: 'Bima',
    mediaFormat: 'video',
    src: '/assets/hero_card/card_5.webm',
    videoTextureSrc: '/assets/hero_card/card_5.webm',
    posterSrc: '/assets/cards/card-05.webp',
    accentColor: '#F3A72E',
    metricsBadge: 'Featured App Store Banner',
    description: 'Vibrant cobalt-and-sunshine promotional illustration showcasing custom character creation.',
  },
  {
    id: 'hangjam-monster-gif-06',
    indexLabel: '06',
    title: 'Botanical Monster Guide: Reaction Sticker',
    client: 'Hangjam',
    clientUrl: 'https://hangjam.ai/',
    category: 'ANIMATED GIF STICKERS',
    artistId: 'nadia',
    artistName: 'Nadia',
    mediaFormat: 'video',
    src: '/assets/hero_card/card_6.webm',
    videoTextureSrc: '/assets/hero_card/card_6.webm',
    posterSrc: '/assets/cards/card-06.webp',
    accentColor: '#204A36',
    metricsBadge: '850K+ In-App Chats',
    description: 'Quirky three-eyed botanical spirit mascot with looping flower animation.',
  },
  {
    id: 'cycle-midnight-07',
    indexLabel: '07',
    title: 'Midnight Convenience Store: Anime POV Ad',
    client: 'Cycle AI',
    clientUrl: 'https://www.cycleai.ai/',
    category: '9:16 VIDEO ADS',
    artistId: 'raka',
    artistName: 'Raka',
    mediaFormat: 'video',
    src: '/assets/hero_card/card_7.webm',
    videoTextureSrc: '/assets/hero_card/card_7.webm',
    posterSrc: '/assets/cards/card-07.webp',
    accentColor: '#FF425E',
    metricsBadge: '11.4M Views · 42% Hook Rate',
    description: 'Dramatic convenience store lighting and strawberry-milk POV animation crafted for paid social.',
  },
  {
    id: 'epiphrame-tablet-08',
    indexLabel: '08',
    title: 'Sound & Sketch: Collective Origin Art',
    client: 'Epiphrame Collective',
    clientUrl: 'https://www.cycleai.ai/',
    category: 'CHARACTER SHEETS',
    artistId: 'bima',
    artistName: 'Bima',
    mediaFormat: 'video',
    src: '/assets/hero_card/card_8.webm',
    videoTextureSrc: '/assets/hero_card/card_8.webm',
    posterSrc: '/assets/cards/card-08.webp',
    accentColor: '#141316',
    metricsBadge: '100% Human Hand-Drawn',
    description: 'Celebrates the human illustrators behind every Epiphrame character campaign.',
  },
];

export const ARTISTS_ROSTER: ArtistProfile[] = [
  {
    id: 'iris',
    name: 'Iris',
    role: 'Art Director & Lead Pop Illustrator',
    specialty: 'Quirky Character Pop, Color Systems & Viral Hook Art',
    avatarSrc: '/assets/mascots/flower-yellow.png',
    emblemColor: '#F3A72E',
    sombongBadges: [
      '25M+ Ad Views Drawn',
      'Lead Palette & Vibe Architect',
      '100% Hand-Drawn (0% AI Slop)',
    ],
    bio: 'Architect of Epiphrame’s signature "quirky yet elegant" visual language, turning bold color blocks and expressive faces into scroll-stopping character campaigns.',
    sketchComparison: {
      title: 'Cycle AI: Starlight Companion Ad',
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
    role: 'Lead Motion & Live2D Animator',
    specialty: '2D Frame-by-Frame Animation, Live2D & High-Retention Video Ads',
    avatarSrc: '/assets/mascots/frame-blue.png',
    emblemColor: '#FF425E',
    sombongBadges: [
      '18M+ Video Ad Plays',
      'Cycle AI & Hangjam Motion Lead',
      '60fps Frame-by-Frame Craft',
    ],
    bio: 'Brings static character illustrations to life with fluid hair physics, micro-expressions, and kinetic typography tailored for TikTok, Reels, and YouTube Shorts.',
    sketchComparison: {
      title: 'Hangjam: Portal Fantasy Hook',
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
    bio: 'Specializes in first-frame emotional hooks: drawing the exact blush, smirk, or cliffhanger panel that makes viewers tap "Download" immediately.',
    sketchComparison: {
      title: 'Cycle AI: Rival to Lover Story Ad',
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
    emblemColor: '#204A36',
    sombongBadges: [
      'Featured on Play Store & App Store',
      'Environment & Prop Virtuoso',
      'Zero-Template Custom Worlds',
    ],
    bio: 'Builds lush, tactile worlds and perspective scenes that make digital character platforms feel like living, breathing universes.',
    sketchComparison: {
      title: 'Hangjam: Creator Playground Key Art',
      client: 'Hangjam',
      sketchSrc: '/assets/artists/sketch-01.webp',
      finalSrc: '/assets/artists/final-01.webp',
    },
    vaultItems: [
      {
        title: 'World Blocking to Final Render Reel',
        mediaFormat: 'video',
        src: '/assets/media/cycle-ad-reel.mp4',
        posterSrc: '/assets/cards/card-04.webp',
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
