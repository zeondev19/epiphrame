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
    artistId: 'ayesha',
    artistName: 'Ayesha',
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
    artistId: 'zeon',
    artistName: 'Zeon',
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
    artistId: 'ayesha',
    artistName: 'Ayesha',
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
    artistId: 'raka',
    artistName: 'Raka',
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
    artistId: 'zeon',
    artistName: 'Zeon',
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
    artistId: 'raka',
    artistName: 'Raka',
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
    id: 'ayesha',
    name: 'Ayesha',
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
    id: 'zeon',
    name: 'Zeon',
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
    id: 'raka',
    name: 'Raka',
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
