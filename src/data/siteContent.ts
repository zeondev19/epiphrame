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
  orientation?: 'portrait' | 'landscape';
  src: string;
  videoTextureSrc?: string; // Hardware-accelerated MP4/WebM loop in WebGL
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
  previewSrc?: string;
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
  tagline: 'Human illustration collective crafting original character art and motion ads for modern worlds.',
  heroHint: 'SPIN RING TO EXPLORE · SELECT CARD TO INSPECT',
  manifestoHeadline: 'Distinct silhouettes, deliberate acting, and hand-crafted character lore.',
  manifestoBody:
    'Template prompts blur together on feeds. We design characters from thumbnail sketches to final 60fps animations, giving AI storytelling platforms and game studios an unmistakable visual signature.',
  manifestoPills: [
    'Hand-Drawn Illustration',
    'Roleplay Bot Turnarounds',
    'Vertical UA Hooks (TikTok/Reels)',
  ],
};

export const RING_SHOWCASE_ITEMS: RingShowcaseItem[] = [
  {
    id: 'cycle-ramen-01',
    indexLabel: '01',
    title: 'Neon Ramen Date: Character Story Ad',
    client: 'Cycle AI',
    clientUrl: 'https://www.cycleai.ai/',
    category: 'Vertical UA Hooks (TikTok/Reels)',
    artistId: 'iris',
    artistName: 'Iris',
    orientation: 'portrait',
    mediaFormat: 'video',
    src: '/assets/hero_card/card_1.webm',
    videoTextureSrc: '/assets/hero_card/card_1.webm',
    posterSrc: '/assets/cards/card-01.webp',
    accentColor: '#FF425E',
    metricsBadge: 'Vertical Reel · 60 FPS',
    description: 'Animated character hook and expressive date scenario designed for mobile acquisition feeds.',
  },
  {
    id: 'studio-isometric-02',
    indexLabel: '02',
    title: 'Creative Lab: Inside The Workshop',
    client: 'Epiphrame Studio',
    clientUrl: 'https://www.cycleai.ai/',
    category: 'APP STORE KEY ART',
    artistId: 'bima',
    artistName: 'Bima',
    orientation: 'landscape',
    mediaFormat: 'image',
    src: '/assets/showcase/studio-isometric.webp',
    posterSrc: '/assets/showcase/studio-isometric.webp',
    accentColor: '#204A36',
    metricsBadge: 'Isometric Art · 4K Master',
    description: 'Studio isometric perspective highlighting the human illustration and rig pipeline.',
  },
  {
    id: 'hangjam-alchemist-03',
    indexLabel: '03',
    title: 'Mischievous Alchemist: Bot Sheet',
    client: 'Hangjam',
    clientUrl: 'https://hangjam.ai/',
    category: 'Roleplay Bot Turnarounds',
    artistId: 'raka',
    artistName: 'Raka',
    orientation: 'portrait',
    mediaFormat: 'video',
    src: '/assets/hero_card/card_2.webm',
    videoTextureSrc: '/assets/hero_card/card_2.webm',
    posterSrc: '/assets/cards/card-02.webp',
    accentColor: '#204A36',
    metricsBadge: 'Turnaround · Expression Pack',
    description: 'Character model sheet with potion VFX sprites built for interactive narrative bots.',
  },
  {
    id: 'hangjam-painter-04',
    indexLabel: '04',
    title: 'Starlight Painter: World Promo Banner',
    client: 'Hangjam',
    clientUrl: 'https://hangjam.ai/',
    category: 'APP STORE KEY ART',
    artistId: 'bima',
    artistName: 'Bima',
    orientation: 'landscape',
    mediaFormat: 'video',
    src: '/assets/hero_card/card_5.webm',
    videoTextureSrc: '/assets/hero_card/card_5.webm',
    posterSrc: '/assets/cards/card-05.webp',
    accentColor: '#F3A72E',
    metricsBadge: 'Panoramic Key Art · Featured',
    description: 'Vibrant promotional illustration showcasing character customization environments.',
  },
  {
    id: 'epiphrame-dj-gif-05',
    indexLabel: '05',
    title: 'Botanical Spirit DJ: Sticker Loop',
    client: 'Epiphrame Originals',
    clientUrl: 'https://hangjam.ai/',
    category: 'Community & Discord Reactions',
    artistId: 'iris',
    artistName: 'Iris',
    orientation: 'portrait',
    mediaFormat: 'video',
    src: '/assets/hero_card/card_3.webm',
    videoTextureSrc: '/assets/hero_card/card_3.webm',
    posterSrc: '/assets/cards/card-03.webp',
    accentColor: '#F3A72E',
    metricsBadge: 'Looping Sticker · 60 FPS',
    description: 'Playful turntable mascot loop designed for Discord servers and community reactions.',
  },
  {
    id: 'epiphrame-tablet-06',
    indexLabel: '06',
    title: 'Sound & Sketch: Origin Studio Lore',
    client: 'Epiphrame Collective',
    clientUrl: 'https://www.cycleai.ai/',
    category: 'Roleplay Bot Turnarounds',
    artistId: 'bima',
    artistName: 'Bima',
    orientation: 'landscape',
    mediaFormat: 'video',
    src: '/assets/hero_card/card_8.webm',
    videoTextureSrc: '/assets/hero_card/card_8.webm',
    posterSrc: '/assets/cards/card-08.webp',
    accentColor: '#141316',
    metricsBadge: 'Concept Lore Sheet · Full Color',
    description: 'Studio key visual highlighting the human drawing process behind character campaigns.',
  },
  {
    id: 'cycle-skater-07',
    indexLabel: '07',
    title: 'Streetwear Skater: Vertical Hook',
    client: 'Cycle AI',
    clientUrl: 'https://www.cycleai.ai/',
    category: 'Vertical UA Hooks (TikTok/Reels)',
    artistId: 'nadia',
    artistName: 'Nadia',
    orientation: 'portrait',
    mediaFormat: 'video',
    src: '/assets/hero_card/card_4.webm',
    videoTextureSrc: '/assets/hero_card/card_4.webm',
    posterSrc: '/assets/cards/card-04.webp',
    accentColor: '#FF425E',
    metricsBadge: 'Feed Motion Hook · Paid Social',
    description: 'Dynamic pop-color character artwork formatted to capture thumb-scroll in the first second.',
  },
  {
    id: 'sketch-process-08',
    indexLabel: '08',
    title: 'Pencil Roughs to Dynamic Silhouette',
    client: 'Cycle AI & Hangjam',
    clientUrl: 'https://www.cycleai.ai/',
    category: 'Roleplay Bot Turnarounds',
    artistId: 'iris',
    artistName: 'Iris',
    orientation: 'landscape',
    mediaFormat: 'image',
    src: '/assets/artists/sketch-01.webp',
    posterSrc: '/assets/artists/sketch-01.webp',
    accentColor: '#FF66B2',
    metricsBadge: 'Hand-Drawn Lineart · Concept',
    description: 'Structural pencil sketches and anatomy studies that establish strong reading silhouettes.',
  },
  {
    id: 'hangjam-monster-gif-09',
    indexLabel: '09',
    title: 'Botanical Monster: Reaction Mascot',
    client: 'Hangjam',
    clientUrl: 'https://hangjam.ai/',
    category: 'Community & Discord Reactions',
    artistId: 'nadia',
    artistName: 'Nadia',
    orientation: 'portrait',
    mediaFormat: 'video',
    src: '/assets/hero_card/card_6.webm',
    videoTextureSrc: '/assets/hero_card/card_6.webm',
    posterSrc: '/assets/cards/card-06.webp',
    accentColor: '#204A36',
    metricsBadge: 'Reaction Sticker · Animated',
    description: 'Three-eyed botanical mascot with continuous loop animation for in-app greetings.',
  },
  {
    id: 'final-production-10',
    indexLabel: '10',
    title: 'Starlight Companion: Master Key Art',
    client: 'Cycle AI',
    clientUrl: 'https://www.cycleai.ai/',
    category: 'APP STORE KEY ART',
    artistId: 'raka',
    artistName: 'Raka',
    orientation: 'landscape',
    mediaFormat: 'image',
    src: '/assets/artists/final-01.webp',
    posterSrc: '/assets/artists/final-01.webp',
    accentColor: '#FFD400',
    metricsBadge: 'Final Production · Cel-Shaded',
    description: 'Full-color polished character ad with dramatic lighting and expressive facial acting.',
  },
  {
    id: 'cycle-midnight-11',
    indexLabel: '11',
    title: 'Midnight Store: Anime POV Sequence',
    client: 'Cycle AI',
    clientUrl: 'https://www.cycleai.ai/',
    category: 'Vertical UA Hooks (TikTok/Reels)',
    artistId: 'raka',
    artistName: 'Raka',
    orientation: 'portrait',
    mediaFormat: 'video',
    src: '/assets/hero_card/card_7.webm',
    videoTextureSrc: '/assets/hero_card/card_7.webm',
    posterSrc: '/assets/cards/card-07.webp',
    accentColor: '#FF425E',
    metricsBadge: 'Anime POV Cut · 9:16',
    description: 'Dramatic convenience store night lighting and character interaction designed for video ads.',
  },
  {
    id: 'cycle-ad-trailer-12',
    indexLabel: '12',
    title: 'Vertical Acquisition Video Reel Cut',
    client: 'Cycle AI',
    clientUrl: 'https://www.cycleai.ai/',
    category: 'Vertical UA Hooks (TikTok/Reels)',
    artistId: 'nadia',
    artistName: 'Nadia',
    orientation: 'landscape',
    mediaFormat: 'video',
    src: '/assets/media/cycle-ad-reel.mp4',
    videoTextureSrc: '/assets/media/cycle-ad-reel.mp4',
    posterSrc: '/assets/cards/card-04.webp',
    accentColor: '#FF66B2',
    metricsBadge: 'Commercial Reel · 60 FPS',
    description: 'High-converting vertical video hook compilation edited for TikTok and Instagram Reels.',
  },
];

export const ARTISTS_ROSTER: ArtistProfile[] = [
  {
    id: 'iris',
    name: 'Iris',
    role: 'Art Director & Lead Pop Illustrator',
    specialty: 'Bold color palettes, stylized proportions, and viral character hooks.',
    avatarSrc: '/assets/mascots/flower-yellow.png',
    previewSrc: '/assets/cards/card-01.webp',
    emblemColor: '#F3A72E',
    sombongBadges: [
      'Procreate & Clip Studio Paint',
      'Lead Palette & Character Stylist',
      'Cycle AI & Original Mascot IP',
    ],
    bio: 'Designs Epiphrame’s graphic visual language, blending clean shapes and expressive facial acting into memorable character silhouettes.',
    sketchComparison: {
      title: 'Cycle AI: Starlight Companion Ad',
      client: 'Cycle AI',
      sketchSrc: '/assets/artists/sketch-01.webp',
      finalSrc: '/assets/artists/final-01.webp',
    },
    vaultItems: [
      {
        title: 'Procreate Process Recording',
        mediaFormat: 'video',
        src: '/assets/media/cycle-ad-reel.mp4',
        posterSrc: '/assets/cards/card-01.webp',
      },
      {
        title: 'Character Emote Animation',
        mediaFormat: 'gif',
        src: '/assets/media/hangjam-sticker.gif',
        posterSrc: '/assets/cards/card-01.webp',
      },
      {
        title: 'Final Campaign Key Art',
        mediaFormat: 'image',
        src: '/assets/cards/card-04.webp',
        posterSrc: '/assets/cards/card-04.webp',
      },
    ],
  },
  {
    id: 'raka',
    name: 'Raka',
    role: 'Lead 2D & Motion Animator',
    specialty: 'Frame-by-frame 2D animation, Live2D rigging, and vertical video pacing.',
    avatarSrc: '/assets/mascots/frame-blue.png',
    previewSrc: '/assets/cards/card-02.webp',
    emblemColor: '#FF425E',
    sombongBadges: [
      'Live2D Cubism & After Effects',
      'Frame-by-Frame Motion Director',
      'High-Retention Vertical Ad Cuts',
    ],
    bio: 'Brings static character illustrations to life with secondary hair motion, natural breathing loops, and kinetic timing for mobile screens.',
    sketchComparison: {
      title: 'Hangjam: Portal Fantasy Hook',
      client: 'Hangjam',
      sketchSrc: '/assets/artists/sketch-01.webp',
      finalSrc: '/assets/cards/card-02.webp',
    },
    vaultItems: [
      {
        title: 'Keyframe Motion Breakdown',
        mediaFormat: 'video',
        src: '/assets/media/cycle-ad-reel.mp4',
        posterSrc: '/assets/cards/card-02.webp',
      },
      {
        title: 'Character Blink & Wave Loop',
        mediaFormat: 'gif',
        src: '/assets/media/hangjam-sticker.gif',
        posterSrc: '/assets/cards/card-02.webp',
      },
      {
        title: 'Turnaround Model Sheet',
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
    specialty: 'Expressive eye work, webtoon panelling, and narrative character arcs.',
    avatarSrc: '/assets/mascots/flower-pink.png',
    previewSrc: '/assets/cards/card-04.webp',
    emblemColor: '#FF66B2',
    sombongBadges: [
      'Clip Studio Paint & Photoshop',
      'Full Expression Turnaround Sheets',
      'Interactive Lore & Romance Hooks',
    ],
    bio: 'Focuses on emotional hook frames, drawing nuanced expressions from subtle smiles to dramatic shifts that deepen player immersion.',
    sketchComparison: {
      title: 'Cycle AI: Rival to Lover Story Ad',
      client: 'Cycle AI',
      sketchSrc: '/assets/artists/sketch-01.webp',
      finalSrc: '/assets/cards/card-04.webp',
    },
    vaultItems: [
      {
        title: 'Lineart & Cel-Shade Process',
        mediaFormat: 'video',
        src: '/assets/media/cycle-ad-reel.mp4',
        posterSrc: '/assets/cards/card-03.webp',
      },
      {
        title: 'Reaction Sticker Loop',
        mediaFormat: 'gif',
        src: '/assets/media/hangjam-sticker.gif',
        posterSrc: '/assets/cards/card-03.webp',
      },
      {
        title: 'Vertical Story Composite',
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
    specialty: 'Isometric environments, detailed prop sheets, and wide panoramic banners.',
    avatarSrc: '/assets/mascots/star-green.png',
    previewSrc: '/assets/cards/card-05.webp',
    emblemColor: '#204A36',
    sombongBadges: [
      'Blender Blockout & Photoshop',
      'App Store Panorama Specialist',
      'Isometric World & Prop Architecture',
    ],
    bio: 'Crafts rich perspective scenes and tactile environments that ground characters in believable, atmospheric worlds.',
    sketchComparison: {
      title: 'Hangjam: Creator Playground Key Art',
      client: 'Hangjam',
      sketchSrc: '/assets/artists/sketch-01.webp',
      finalSrc: '/assets/cards/card-05.webp',
    },
    vaultItems: [
      {
        title: 'Environment Blockout to Render',
        mediaFormat: 'video',
        src: '/assets/media/cycle-ad-reel.mp4',
        posterSrc: '/assets/cards/card-04.webp',
      },
      {
        title: 'Animated Prop & Mascot Loop',
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
