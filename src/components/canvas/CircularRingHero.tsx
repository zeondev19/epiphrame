'use client';

import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, ContactShadows, useTexture } from '@react-three/drei';
import { useVideoTexture } from '@react-three/drei/core/VideoTexture';
import * as THREE from 'three';
import { RING_SHOWCASE_ITEMS, RingShowcaseItem, SITE_COPY } from '@/data/siteContent';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { WebGLErrorBoundary } from '@/components/canvas/WebGLErrorBoundary';

function CardFallback() {
  return (
    <mesh>
      <planeGeometry args={[1.22, 2.16, 24, 24]} />
      <meshBasicMaterial color="#1f1627" transparent opacity={0.6} />
    </mesh>
  );
}

function GlassCardMeshInner({
  texture,
  cardIndex,
  isActive,
  hovered,
  onClick,
  onPointerOver,
  onPointerOut,
}: {
  texture: THREE.Texture;
  cardIndex: number;
  isActive: boolean;
  hovered: boolean;
  onClick: (e: any) => void;
  onPointerOver: (e: any) => void;
  onPointerOut: (e: any) => void;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const cardWidth = 1.22;
  const cardHeight = 2.16;
  const cardAspect = cardWidth / cardHeight; // ~0.5648
  const videoAspect = 576.0 / 1024.0; // exact 9:16 = 0.5625

  const shaderArgs = useMemo(() => {
    return {
      uniforms: {
        map: { value: texture },
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uActive: { value: 0.45 },
        uAspect: { value: cardAspect },
        uTexAspect: { value: videoAspect },
        uCardIndex: { value: Number(cardIndex) },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vWorldPos;
        varying vec3 vNormal;
        varying vec3 vViewPosition;

        void main() {
          vUv = uv;
          vec3 pos = position;
          // Smooth cylindrical bend along cylinder arc (radius 3.8)
          pos.z += -pow(pos.x, 2.0) * 0.12;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          vViewPosition = -mvPosition.xyz;
          vNormal = normalize(normalMatrix * normal);

          vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
          vWorldPos = worldPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D map;
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uActive;
        uniform float uAspect;
        uniform float uTexAspect;
        uniform float uCardIndex;

        varying vec2 vUv;
        varying vec3 vWorldPos;
        varying vec3 vNormal;
        varying vec3 vViewPosition;

        float sdRoundedBox(vec2 p, vec2 b, float r) {
          vec2 q = abs(p) - b + vec2(r);
          return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
        }

        vec2 getSDFNormal(vec2 p, vec2 b, float r) {
          float eps = 0.001;
          float d = sdRoundedBox(p, b, r);
          float dx = sdRoundedBox(p + vec2(eps, 0.0), b, r) - d;
          float dy = sdRoundedBox(p + vec2(0.0, eps), b, r) - d;
          return normalize(vec2(dx, dy));
        }

        void main() {
          // 1. Aspect-corrected geometry space
          vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0);
          vec2 b = vec2(uAspect * 0.5 - 0.005, 0.5 - 0.005);
          float r = 0.055;

          float dist = sdRoundedBox(p, b, r);
          if (dist > 0.005) discard;
          float alpha = 1.0 - smoothstep(-0.004, 0.004, dist);

          // View and normal vectors for optical calculations
          vec3 V = normalize(vViewPosition);
          vec3 N = normalize(vNormal);
          float ndv = clamp(dot(N, V), 0.0, 1.0);
          float grazing = pow(max(0.0, 1.0 - ndv), 2.5);

          // 2. Crisp 100% video sampling (object-fit: cover, 0% distortion, 100% clean center)
          vec2 texUv = vUv;
          if (uAspect > uTexAspect) {
            float scale = uAspect / uTexAspect;
            texUv.y = (vUv.y - 0.5) * scale + 0.5;
          } else if (uAspect < uTexAspect) {
            float scale = uTexAspect / uAspect;
            texUv.x = (vUv.x - 0.5) * scale + 0.5;
          }

          vec4 texColor = texture2D(map, texUv);
          vec3 col = texColor.rgb;

          // 3. Layer A - Iridescent Prismatic Foil Sweep (Subtle & clean)
          float diagAngle = (vUv.x * 0.65 + vUv.y * 0.85) + dot(N.xy, uMouse * 0.35) + (1.0 - ndv) * 0.5 + uCardIndex * 0.4;
          vec3 rainbow = 0.5 + 0.5 * cos(6.28318 * (diagAngle * 2.2 + uTime * 0.15 + vec3(0.0, 0.33, 0.67)));
          float holoWave = sin(diagAngle * 9.0 + uTime * 0.9) * 0.5 + 0.5;
          float holoMask = (0.35 + 0.65 * holoWave) * (0.30 + 0.70 * pow(1.0 - ndv, 1.8));
          col += rainbow * holoMask * (0.16 + 0.10 * uActive);

          // 4. Layer B - 4-Point Star Glints & Moving Light Sweep (STRICTLY CORNERS ONLY)
          // Top-left and bottom-right corners only - Center is 100% UNTOUCHED
          float distTL = length(vUv - vec2(0.12, 0.88));
          float distBR = length(vUv - vec2(0.88, 0.12));
          float cornerMask = smoothstep(0.44, 0.04, distTL) * 1.25 + smoothstep(0.44, 0.04, distBR) * 1.05;

          // Dynamic light sweep / flash across the diagonal corners ("kilatan")
          float sweepPhase = (vUv.x + vUv.y * 1.1) * 3.14159 - uTime * 2.2 + uMouse.x * 1.4 + uCardIndex * 1.1;
          float sweepFlash = pow(max(0.0, sin(sweepPhase)), 22.0) * 2.2;
          float cornerFlash = sweepFlash * cornerMask;

          // Procedural 4-point star glints in corners
          vec2 starGrid = floor(vUv * vec2(14.0, 19.0));
          vec2 starUv = fract(vUv * vec2(14.0, 19.0)) - 0.5;
          float starRnd1 = fract(sin(dot(starGrid + uCardIndex * 7.0, vec2(127.1, 311.7))) * 43758.5453);
          float starRnd2 = fract(sin(dot(starGrid + uCardIndex * 13.0, vec2(269.5, 183.3))) * 43758.5453);

          vec2 starCenter = (vec2(starRnd1, starRnd2) - 0.5) * 0.42;
          vec2 starDelta = starUv - starCenter;
          vec2 starAbs = abs(starDelta);

          // Sharp 4-point star cross-rays
          float rayH = max(0.0, 1.0 - starAbs.x * 24.0) * max(0.0, 1.0 - starAbs.y * 3.2);
          float rayV = max(0.0, 1.0 - starAbs.y * 24.0) * max(0.0, 1.0 - starAbs.x * 3.2);
          float starCore = max(0.0, 1.0 - length(starDelta) * 12.0);
          float starShape = starCore * 1.4 + pow(rayH + rayV, 2.0) * 2.8;

          float starTwinkle = pow(max(0.0, sin(starRnd1 * 6.28318 + uTime * 2.8 + diagAngle * 5.0)), 16.0);
          float gridStars = starShape * starTwinkle * cornerMask;

          // Hero moving star glints at Top-Left & Bottom-Right tips
          vec2 heroTLPos = vec2(0.13, 0.87) + vec2(sin(uTime * 1.2 + uCardIndex), cos(uTime * 1.5 + uCardIndex)) * 0.025;
          vec2 dHeroTL = abs(vUv - heroTLPos);
          float heroRayTL = max(0.0, 1.0 - dHeroTL.x * 28.0) * max(0.0, 1.0 - dHeroTL.y * 3.5)
                          + max(0.0, 1.0 - dHeroTL.y * 28.0) * max(0.0, 1.0 - dHeroTL.x * 3.5);
          float heroCoreTL = max(0.0, 1.0 - length(dHeroTL) * 14.0);
          float heroStarTL = (heroCoreTL * 1.6 + pow(heroRayTL, 2.0) * 3.2) * pow(max(0.0, sin(uTime * 2.4 + uCardIndex)), 10.0);

          vec2 heroBRPos = vec2(0.87, 0.13) + vec2(cos(uTime * 1.1 + uCardIndex), sin(uTime * 1.4 + uCardIndex)) * 0.025;
          vec2 dHeroBR = abs(vUv - heroBRPos);
          float heroRayBR = max(0.0, 1.0 - dHeroBR.x * 28.0) * max(0.0, 1.0 - dHeroBR.y * 3.5)
                          + max(0.0, 1.0 - dHeroBR.y * 28.0) * max(0.0, 1.0 - dHeroBR.x * 3.5);
          float heroCoreBR = max(0.0, 1.0 - length(dHeroBR) * 14.0);
          float heroStarBR = (heroCoreBR * 1.6 + pow(heroRayBR, 2.0) * 3.2) * pow(max(0.0, sin(uTime * 2.4 + 1.8 + uCardIndex)), 10.0);

          vec3 starColor = mix(vec3(1.0, 0.95, 0.4), vec3(1.0, 0.20, 0.60), 0.35);
          float starTotal = gridStars * 2.0 + (heroStarTL + heroStarBR) * 1.8 + cornerFlash * 0.8;
          col += starColor * starTotal * (0.65 + 0.45 * uActive);

          // 5. GlassAiButton LUMINOUS NEON BORDER (Tokyo Risograph: Riso Coral #FF425E, Warm Marigold #F3A72E & Matcha Forest)
          float outerStroke = smoothstep(-0.018, -0.002, dist);
          float innerGlow = exp(-pow(max(0.0, -dist - 0.015) / 0.040, 2.0));

          // Angle of border point and tracking of cursor
          float borderAngle = atan(p.y, p.x);
          float mouseAngle = atan(uMouse.y, uMouse.x);
          float cursorTracking = 0.5 + 0.5 * cos(borderAngle - mouseAngle);

          vec3 risoCoral = vec3(1.0, 0.26, 0.37);      // #FF425E (Riso Acid Coral)
          vec3 warmMarigold = vec3(0.95, 0.65, 0.18);  // #F3A72E (Warm Marigold)
          vec3 matchaForest = vec3(0.13, 0.29, 0.21);  // #204A36 (Matcha Forest)

          vec3 strokeGradient = mix(risoCoral, warmMarigold, sin(borderAngle * 2.2 + uTime * 1.0) * 0.5 + 0.5);
          strokeGradient = mix(strokeGradient, matchaForest, cursorTracking * 0.40);

          float luminousRim = (outerStroke * 1.4 + innerGlow * 0.5) * (0.85 + 0.6 * cursorTracking + 0.4 * uActive);

          // Translucent glass bezel frame tint (Manga Archival Paper / Riso Coral)
          float frameMask = smoothstep(-0.040, -0.032, dist);
          vec3 glassTint = mix(vec3(0.976, 0.965, 0.941), strokeGradient, 0.22);
          col = mix(col, mix(col, glassTint, 0.20), frameMask);

          // Apply calibrated rim stroke & grazing Fresnel sheen
          col += strokeGradient * luminousRim;
          col += vec3(1.0) * grazing * 0.30 * (0.8 + 0.4 * uActive);

          // Subtle diagonal glass reflection
          float diagonalSheen = 0.04 * pow(max(0.0, 1.0 - abs((vUv.x + vUv.y) - 1.05) * 4.0), 3.0);
          col += vec3(diagonalSheen);

          gl_FragColor = vec4(col, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: true,
    };
  }, [texture, cardAspect, videoAspect, cardIndex]);

  useFrame(({ clock, pointer }, delta) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    materialRef.current.uniforms.uMouse.value.set(pointer.x, pointer.y);
    const targetActive = (isActive || hovered) ? 1.0 : 0.45;
    materialRef.current.uniforms.uActive.value = THREE.MathUtils.damp(
      materialRef.current.uniforms.uActive.value,
      targetActive,
      8,
      delta
    );
  });

  return (
    <mesh
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      <planeGeometry args={[cardWidth, cardHeight, 32, 32]} />
      <shaderMaterial ref={materialRef} attach="material" {...shaderArgs} />
    </mesh>
  );
}

function ImageCardMesh({
  url,
  cardIndex,
  isActive,
  hovered,
  onClick,
  onPointerOver,
  onPointerOut,
}: {
  url: string;
  cardIndex: number;
  isActive: boolean;
  hovered: boolean;
  onClick: (e: any) => void;
  onPointerOver: (e: any) => void;
  onPointerOut: (e: any) => void;
}) {
  const texture = useTexture(url);
  texture.colorSpace = THREE.SRGBColorSpace;

  return (
    <GlassCardMeshInner
      texture={texture}
      cardIndex={cardIndex}
      isActive={isActive}
      hovered={hovered}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    />
  );
}

function VideoCardMesh({
  url,
  cardIndex,
  isActive,
  hovered,
  onClick,
  onPointerOver,
  onPointerOut,
}: {
  url: string;
  cardIndex: number;
  isActive: boolean;
  hovered: boolean;
  onClick: (e: any) => void;
  onPointerOver: (e: any) => void;
  onPointerOut: (e: any) => void;
}) {
  const texture = useVideoTexture(url, {
    muted: true,
    loop: true,
    start: true,
    playsInline: true,
    crossOrigin: 'anonymous',
    unsuspend: 'loadedmetadata',
  });
  texture.colorSpace = THREE.SRGBColorSpace;

  return (
    <GlassCardMeshInner
      texture={texture}
      cardIndex={cardIndex}
      isActive={isActive}
      hovered={hovered}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    />
  );
}

function GlassCardMesh({
  item,
  cardIndex,
  isActive,
  hovered,
  onClick,
  onPointerOver,
  onPointerOut,
}: {
  item: RingShowcaseItem;
  cardIndex: number;
  isActive: boolean;
  hovered: boolean;
  onClick: (e: any) => void;
  onPointerOver: (e: any) => void;
  onPointerOut: (e: any) => void;
}) {
  const isVideo = item.src.endsWith('.webm') || item.src.endsWith('.mp4');
  if (isVideo) {
    return (
      <VideoCardMesh
        url={item.src}
        cardIndex={cardIndex}
        isActive={isActive}
        hovered={hovered}
        onClick={onClick}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
      />
    );
  }
  return (
    <ImageCardMesh
      url={item.src}
      cardIndex={cardIndex}
      isActive={isActive}
      hovered={hovered}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    />
  );
}

function CameraRig({ isMobile }: { isMobile: boolean }) {
  useFrame(({ camera }) => {
    camera.lookAt(0, 0, 0);
  });
  return null;
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
  const [hovered, setHovered] = useState(false);
  const angle = (index / total) * Math.PI * 2;
  const baseX = Math.sin(angle) * radius;
  const baseZ = Math.cos(angle) * radius;

  useFrame(({ clock }, delta) => {
    if (!meshRef.current) return;
    const targetScale = isActive ? 1.22 : anyActive ? 0.92 : 1.0;
    const targetZOffset = isActive ? 0.50 : (hovered ? 0.14 : 0);
    // Ribbon / orbit wave motion from Gallery source
    const ribbonWave = Math.sin(angle * 2.0 + clock.getElapsedTime() * 0.7) * 0.12;
    const targetY = (hovered ? 0.16 : 0) + ribbonWave;

    // Human-crafted playful organic tilt (anti-AI mechanical symmetry)
    const organicTiltZ = isActive ? 0 : Math.sin(index * 1.618) * 0.045;
    const organicTiltX = isActive ? 0 : Math.cos(index * 2.3) * 0.035;

    meshRef.current.scale.x = THREE.MathUtils.damp(meshRef.current.scale.x, targetScale, 7, delta);
    meshRef.current.scale.y = THREE.MathUtils.damp(meshRef.current.scale.y, targetScale, 7, delta);
    meshRef.current.scale.z = THREE.MathUtils.damp(meshRef.current.scale.z, targetScale, 7, delta);

    meshRef.current.rotation.z = THREE.MathUtils.damp(meshRef.current.rotation.z, organicTiltZ, 6, delta);
    meshRef.current.rotation.x = THREE.MathUtils.damp(meshRef.current.rotation.x, organicTiltX, 6, delta);

    const forwardX = Math.sin(angle) * (radius + targetZOffset);
    const forwardZ = Math.cos(angle) * (radius + targetZOffset);
    meshRef.current.position.x = THREE.MathUtils.damp(meshRef.current.position.x, forwardX, 7, delta);
    meshRef.current.position.y = THREE.MathUtils.damp(meshRef.current.position.y, targetY, 7, delta);
    meshRef.current.position.z = THREE.MathUtils.damp(meshRef.current.position.z, forwardZ, 7, delta);
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    onSelect(index);
  };

  return (
    <group
      ref={meshRef}
      position={[baseX, 0, baseZ]}
      rotation={[0, angle, 0]}
    >
      <Suspense fallback={<CardFallback />}>
        <GlassCardMesh
          item={item}
          cardIndex={index}
          isActive={isActive}
          hovered={hovered}
          onClick={handleClick}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            setHovered(false);
            document.body.style.cursor = 'default';
          }}
        />
      </Suspense>

      {/* Floating Yellow Flower Mascot Accent perched on the active card top-right */}
      {isActive && (
        <Html
          position={[0.54, 1.02, 0.08]}
          distanceFactor={3.4}
          pointerEvents="none"
        >
          <div className="relative -translate-x-1/2 -translate-y-1/2 filter drop-shadow-[2px_2px_0px_#141316]">
            <img
              src="/assets/mascots/flower-yellow.png"
              alt="Yellow Flower Mascot Accent"
              className="w-12 h-12 object-contain select-none pointer-events-none"
            />
          </div>
        </Html>
      )}
    </group>
  );
}

function CenterpieceHeading3D({ isMobile }: { isMobile: boolean }) {
  const meshRef = useRef<THREE.Group>(null);
  const textureRef = useRef<THREE.CanvasTexture | null>(null);

  const headingTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 768;
    const ctx = canvas.getContext('2d')!;

    const renderText = () => {
      ctx.clearRect(0, 0, 2048, 768);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // 1. Playful Tagline Badge Pill (Manga Archival Paper with Deep Sumi Comic Outline & Coral Star)
      ctx.save();
      ctx.fillStyle = '#F9F6F0';
      ctx.beginPath();
      if ((ctx as any).roundRect) {
        (ctx as any).roundRect(1024 - 280, 75, 560, 68, 34);
      } else {
        ctx.rect(1024 - 280, 75, 560, 68);
      }
      ctx.fill();
      ctx.lineWidth = 5;
      ctx.strokeStyle = '#141316';
      ctx.stroke();

      ctx.fillStyle = '#FF425E';
      ctx.font = '800 25px Fredoka, ui-monospace, sans-serif';
      ctx.fillText('✦ 100% HUMAN DRAWN ✦', 1024, 110);
      ctx.restore();

      // 2. Playful, Energetic Pop Headline "EPIPHRAME" (Riso Acid Coral with Deep Sumi Ink Stroke)
      ctx.save();
      // Calibrated Acid Coral Drop Shadow
      ctx.shadowColor = 'rgba(255, 66, 94, 0.45)';
      ctx.shadowBlur = 36;
      ctx.shadowOffsetY = 14;

      const grad = ctx.createLinearGradient(1024, 140, 1024, 460);
      grad.addColorStop(0, '#FFFFFF');
      grad.addColorStop(0.35, '#FFF2F5');
      grad.addColorStop(0.75, '#FF425E'); // Riso Acid Coral
      grad.addColorStop(1, '#D92543');

      ctx.font = '800 230px Fredoka, Syne, system-ui, sans-serif';

      // Chunky Deep Sumi Ink Outline
      ctx.lineWidth = 14;
      ctx.strokeStyle = '#141316';
      ctx.lineJoin = 'round';
      ctx.strokeText('EPIPHRAME', 1024, 320);

      // Gradient Fill
      ctx.fillStyle = grad;
      ctx.fillText('EPIPHRAME', 1024, 320);
      ctx.restore();

      // 3. Subtitle Pill (Deep Sumi Ink with Archival Paper Text & Coral Rim)
      ctx.save();
      ctx.fillStyle = '#141316';
      ctx.beginPath();
      if ((ctx as any).roundRect) {
        (ctx as any).roundRect(1024 - 360, 460, 720, 58, 29);
      } else {
        ctx.rect(1024 - 360, 460, 720, 58);
      }
      ctx.fill();
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = '#FF425E';
      ctx.stroke();

      ctx.fillStyle = '#F9F6F0';
      ctx.font = '800 23px Fredoka, Syne, sans-serif';
      ctx.fillText('CHARACTER ART · VIRAL WORLD ADS · 60 FPS', 1024, 490);
      ctx.restore();
    };

    renderText();

    if (document.fonts) {
      document.fonts.ready.then(() => {
        renderText();
        if (textureRef.current) textureRef.current.needsUpdate = true;
      });
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    textureRef.current = tex;
    return tex;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    // Elegant floating bobbing motion
    const t = clock.getElapsedTime();
    meshRef.current.position.y = 0.12 + Math.sin(t * 1.4) * 0.06;
  });

  if (!headingTexture) return null;

  const scale = isMobile ? 0.65 : 1.0;

  return (
    <group ref={meshRef} position={[0, 0.12, 0]} scale={[scale, scale, scale]}>
      <mesh>
        <planeGeometry args={[5.2, 1.95]} />
        <meshBasicMaterial
          map={headingTexture}
          transparent
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function RingStage({
  activeIndex,
  onSelect,
  scrollRotationRef,
  onFrontChange,
  isMobile,
}: {
  activeIndex: number | null;
  onSelect: (i: number) => void;
  scrollRotationRef: React.MutableRefObject<number>;
  onFrontChange: (i: number) => void;
  isMobile: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const total = RING_SHOWCASE_ITEMS.length;
  const radius = 3.8;
  const lastFrontRef = useRef<number>(-1);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // Subtle autonomous orbit drift from Gallery source
    scrollRotationRef.current += 0.0010;
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      scrollRotationRef.current,
      6,
      delta
    );

    // Accurately determine front-center card during dragging / spinning
    const currentRot = groupRef.current.rotation.y;
    const rawIndex = ((-currentRot / (Math.PI * 2)) % total + total) % total;
    const currentFront = Math.round(rawIndex) % total;
    if (currentFront !== lastFrontRef.current) {
      lastFrontRef.current = currentFront;
      onFrontChange(currentFront);
    }
  });

  return (
    <group rotation={[0.06, 0, 0]}>
      {/* 3D Centerpiece Typography at z = 0 (GalleryHeading depth layout) */}
      <CenterpieceHeading3D isMobile={isMobile} />

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
            onSelect={onSelect}
          />
        ))}
      </group>
    </group>
  );
}

export default function CircularRingHero() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRotationRef = useRef<number>(0);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const hasMovedRef = useRef(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const resumeVideos = () => {
      const videos = document.querySelectorAll<HTMLVideoElement>('video');
      videos.forEach((v) => {
        if (v.paused) v.play().catch(() => {});
      });
    };
    window.addEventListener('click', resumeVideos);
    window.addEventListener('touchstart', resumeVideos);
    return () => {
      window.removeEventListener('click', resumeVideos);
      window.removeEventListener('touchstart', resumeVideos);
    };
  }, []);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (typeof window !== 'undefined' && window.scrollY > window.innerHeight) return;
      scrollRotationRef.current += e.deltaY * 0.0022;
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    return () => window.removeEventListener('wheel', onWheel);
  }, []);

  useEffect(() => {
    const handleGlobalPointerUp = () => {
      isDraggingRef.current = false;
      setTimeout(() => {
        hasMovedRef.current = false;
      }, 80);
    };
    window.addEventListener('pointerup', handleGlobalPointerUp);
    return () => window.removeEventListener('pointerup', handleGlobalPointerUp);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;
    if (Math.hypot(deltaX, deltaY) > 5) {
      hasMovedRef.current = true;
    }
    if (hasMovedRef.current) {
      scrollRotationRef.current += (e.clientX - dragStartRef.current.x) * 0.003;
      dragStartRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    setTimeout(() => {
      hasMovedRef.current = false;
    }, 80);
  };

  const handleSelect = (index: number) => {
    if (hasMovedRef.current) return;
    setActiveIndex(index);

    const total = RING_SHOWCASE_ITEMS.length;
    const baseTarget = -(index / total) * Math.PI * 2;
    const currentRot = scrollRotationRef.current;
    const twoPi = Math.PI * 2;
    const diff = ((baseTarget - currentRot) % twoPi + twoPi + Math.PI) % twoPi - Math.PI;
    scrollRotationRef.current = currentRot + diff;
  };

  const handleNavigate = (direction: 'next' | 'prev') => {
    const total = RING_SHOWCASE_ITEMS.length;
    const current = activeIndex ?? 0;
    const nextIndex = direction === 'next' ? (current + 1) % total : (current - 1 + total) % total;
    handleSelect(nextIndex);
  };

  const activeItem = activeIndex !== null ? RING_SHOWCASE_ITEMS[activeIndex] : null;

  return (
    <section
      className="relative w-full h-screen bg-[var(--bg-surface)] overflow-hidden select-none cursor-grab active:cursor-grabbing"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Top Studio Positioning Header (Requirement 3) */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none w-full max-w-3xl px-4">
        <span className="inline-block font-mono text-[11px] uppercase tracking-widest px-3.5 py-1 rounded-full border border-current/15 bg-[var(--bg-surface)]/70 backdrop-blur-sm text-[var(--text-primary)]">
          SCROLL UP/DOWN TO SPIN RING · CLICK ANY CARD TO FOCUS
        </span>
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] mt-2">
          Human-Drawn Character Art &amp; Viral Ads for AI Worlds.
        </h1>
        <p className="font-mono text-xs text-[var(--text-muted)] mt-1">
          100% Human Illustrators · Character IP Sheets · 9:16 Motion Ads
        </p>
      </div>

      <WebGLErrorBoundary>
        <Canvas
          camera={{
            position: [0, isMobile ? 0.6 : 0.35, isMobile ? 11.5 : 9.6],
            fov: isMobile ? 38 : 32,
          }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={1.3} />
          <directionalLight position={[4, 8, 6]} intensity={1.1} />
          <directionalLight position={[-4, 4, -4]} intensity={0.4} color="#F9F6F0" />
          <CameraRig isMobile={isMobile} />
          <RingStage
            activeIndex={activeIndex}
            onSelect={handleSelect}
            scrollRotationRef={scrollRotationRef}
            onFrontChange={(idx) => setActiveIndex(idx)}
            isMobile={isMobile}
          />
          {/* Subtle, soft warm floor shadow */}
          <ContactShadows
            position={[0, -1.02, 0]}
            opacity={0.16}
            scale={14}
            blur={2.8}
            far={4.5}
            color="#8C7A6B"
          />
        </Canvas>
      </WebGLErrorBoundary>

      {/* Clean absolute bottom-left caption box inside Hero section */}
      {activeItem && (
        <div className="absolute bottom-8 left-8 z-20 max-w-md translate-x-0 pointer-events-auto bg-[#FFFFFF]/95 dark:bg-[#1E1C22]/95 backdrop-blur-md p-5 rounded-2xl border border-[#141316]/20 dark:border-[#F9F6F0]/20 shadow-[4px_4px_0px_0px_#141316] dark:shadow-[4px_4px_0px_0px_#FF425E] transition-all">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-[#141316] text-[#F9F6F0] dark:bg-[#F9F6F0] dark:text-[#141316] font-extrabold border border-[#141316]">
              {activeItem.indexLabel} / {activeItem.category}
            </span>
            <span
              className="font-mono text-xs font-bold px-3 py-1 rounded-full text-[#141316] border border-[#141316]/25"
              style={{ backgroundColor: activeItem.accentColor || '#F3A72E' }}
            >
              {activeItem.metricsBadge}
            </span>
          </div>

          <h2 className="text-xl md:text-2xl font-black text-[var(--text-primary)] tracking-tight leading-snug">
            {activeItem.title}
          </h2>

          <p className="text-xs text-[var(--text-muted)] mt-1.5 mb-3 leading-relaxed">
            Client:{' '}
            <a
              href={activeItem.clientUrl}
              target="_blank"
              rel="noreferrer"
              className="underline font-bold text-[#141316] dark:text-[#F9F6F0] hover:text-[#FF425E] transition-colors"
            >
              {activeItem.client}
            </a>{' '}
            · Illustrated by{' '}
            <a
              href={`/artists#${activeItem.artistId}`}
              className="underline font-bold text-[#141316] dark:text-[#F9F6F0] hover:text-[#FF425E] transition-colors"
            >
              {activeItem.artistName} (Epiphrame Collective)
            </a>
          </p>

          <a
            href={`#campaign-${activeItem.id}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF425E] text-white text-xs font-mono font-extrabold tracking-wider border border-[#141316] shadow-[2px_2px_0px_0px_#141316] hover:bg-[#E8334E] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
          >
            VIEW CAMPAIGN ↗
          </a>
        </div>
      )}

      {/* Bottom Right Interactive Card Navigator anchored absolutely inside Hero */}
      <div className="absolute bottom-8 right-16 z-20 flex items-center gap-2 bg-[#FFFFFF]/95 dark:bg-[#1E1C22]/95 backdrop-blur-md px-4 py-2 rounded-full border border-[#141316]/20 dark:border-[#F9F6F0]/25 shadow-[3px_3px_0px_0px_#141316] dark:shadow-[3px_3px_0px_0px_#FF425E] font-mono text-xs text-[var(--text-muted)] pointer-events-auto">
        <button
          type="button"
          onClick={() => handleNavigate('prev')}
          className="p-1.5 rounded-full hover:bg-[#FF425E] hover:text-white text-[var(--text-primary)] transition-colors active:scale-90"
          title="Previous Card"
          aria-label="Previous card in 3D ring"
        >
          <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
        </button>
        <span className="font-black text-[#FF425E] px-1 text-sm">
          {activeItem ? activeItem.indexLabel : '01'}
        </span>
        <span className="font-bold text-[var(--text-primary)]">/ 08</span>
        <button
          type="button"
          onClick={() => handleNavigate('next')}
          className="p-1.5 rounded-full hover:bg-[#FF425E] hover:text-white text-[var(--text-primary)] transition-colors active:scale-90"
          title="Next Card"
          aria-label="Next card in 3D ring"
        >
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </section>
  );
}
