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
  tagline: 'Human illustration collective crafting original character art and motion ads for modern worlds.',
  heroHint: 'SPIN RING TO EXPLORE · SELECT CARD TO INSPECT',
  manifestoHeadline: 'Distinct silhouettes, deliberate acting, and hand-crafted character lore.',
  manifestoBody:
    'Template prompts blur together on feeds. We design characters from thumbnail sketches to final 60fps animations, giving AI storytelling platforms and game studios an unmistakable visual signature.',
  manifestoPills: [
    'Hand-Drawn Illustration',
    'Full Turnaround & Expression Sheets',
    '9:16 Vertical Motion & Reaction Stickers',
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
    metricsBadge: '9:16 Vertical Reel · 60 FPS',
    description: 'Animated character hook and expressive date scenario designed for mobile acquisition feeds.',
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
    metricsBadge: 'Turnaround Sheet · Expression Pack',
    description: 'Character model sheet with potion VFX sprites built for interactive narrative bots.',
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
    metricsBadge: 'Looping Sticker · 60 FPS',
    description: 'Playful turntable mascot loop designed for Discord servers and community reactions.',
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
    metricsBadge: 'Feed Motion Hook · Paid Social',
    description: 'Dynamic pop-color character artwork formatted to capture thumb-scroll in the first second.',
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
    metricsBadge: 'Panoramic Key Visual · App Store',
    description: 'Vibrant promotional illustration showcasing character customization environments.',
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
    metricsBadge: 'Reaction Sticker · Animated Mascot',
    description: 'Three-eyed botanical mascot with continuous loop animation for user greetings.',
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
    metricsBadge: 'Anime POV Sequence · 9:16',
    description: 'Dramatic convenience store night lighting and character interaction designed for video ads.',
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
    metricsBadge: 'Concept Lore Sheet · Full Color',
    description: 'Studio key visual highlighting the human drawing process behind every character campaign.',
  },
];

export const ARTISTS_ROSTER: ArtistProfile[] = [
  {
    id: 'iris',
    name: 'Iris',
    role: 'Art Director & Lead Pop Illustrator',
    specialty: 'Bold color palettes, stylized proportions, and viral character hooks.',
    avatarSrc: '/assets/mascots/flower-yellow.png',
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
      finalSrc: '/assets/artists/final-01.webp',
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
      finalSrc: '/assets/artists/final-01.webp',
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
      finalSrc: '/assets/artists/final-01.webp',
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
