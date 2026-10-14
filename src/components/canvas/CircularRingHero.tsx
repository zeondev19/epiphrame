'use client';

import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, RoundedBox, ContactShadows, useTexture, useVideoTexture } from '@react-three/drei';
import * as THREE from 'three';
import { RING_SHOWCASE_ITEMS, RingShowcaseItem, SITE_COPY } from '@/data/siteContent';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function VideoPlaneMaterial({ src }: { src: string }) {
  const texture = useVideoTexture(src, {
    unsuspend: 'canplay',
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

function CameraRig({ isMobile }: { isMobile: boolean }) {
  useFrame(({ camera }) => {
    camera.lookAt(0, -0.05, 0);
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

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    // Elegant, restrained scaling matching ui-ref-hero-focused.jpg (~50-55% screen height)
    const targetScale = isActive ? 1.20 : anyActive ? (hovered ? 0.96 : 0.88) : (hovered ? 1.05 : 1.0);
    const targetZOffset = isActive ? 0.42 : (hovered ? 0.12 : 0);

    meshRef.current.scale.x = THREE.MathUtils.damp(meshRef.current.scale.x, targetScale, 7, delta);
    meshRef.current.scale.y = THREE.MathUtils.damp(meshRef.current.scale.y, targetScale, 7, delta);
    meshRef.current.scale.z = THREE.MathUtils.damp(meshRef.current.scale.z, targetScale, 7, delta);

    const forwardX = Math.sin(angle) * (radius + targetZOffset);
    const forwardZ = Math.cos(angle) * (radius + targetZOffset);
    meshRef.current.position.x = THREE.MathUtils.damp(meshRef.current.position.x, forwardX, 7, delta);
    meshRef.current.position.z = THREE.MathUtils.damp(meshRef.current.position.z, forwardZ, 7, delta);
  });

  const animatedSrc = item.videoTextureSrc;

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
      {/* Invisible Raycast Hit Box for 100% reliable click & hover targeting */}
      <mesh
        position={[0, 0, 0]}
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
      >
        <boxGeometry args={[1.48, 1.94, 0.2]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Thin Charcoal Backing Frame (1.34 x 1.80) */}
      <RoundedBox args={[1.34, 1.80, 0.03]} radius={0.06} smoothness={4} onClick={handleClick}>
        <meshBasicMaterial color="#211529" />
      </RoundedBox>

      {/* Full-Bleed Front Artwork Plane (1.28 x 1.74) */}
      <mesh position={[0, 0, 0.018]} onClick={handleClick}>
        <planeGeometry args={[1.28, 1.74]} />
        <Suspense fallback={<meshBasicMaterial color={item.accentColor} />}>
          {animatedSrc ? (
            <VideoPlaneMaterial src={animatedSrc} />
          ) : (
            <ImagePlaneMaterial src={item.posterSrc} />
          )}
        </Suspense>
      </mesh>

      {/* Full-Bleed Back Artwork Plane so cards are visible from behind */}
      <mesh position={[0, 0, -0.018]} rotation={[0, Math.PI, 0]} onClick={handleClick}>
        <planeGeometry args={[1.28, 1.74]} />
        <Suspense fallback={<meshBasicMaterial color={item.accentColor} />}>
          {item.posterSrc ? (
            <ImagePlaneMaterial src={item.posterSrc} />
          ) : (
            <meshBasicMaterial color={item.accentColor} />
          )}
        </Suspense>
      </mesh>

      {/* Floating Yellow Flower Mascot Accent perched on the active card top-right */}
      {isActive && (
        <Html
          position={[0.52, 0.82, 0.06]}
          distanceFactor={3.2}
          pointerEvents="none"
        >
          <div className="relative animate-bounce -translate-x-1/2 -translate-y-1/2 filter drop-shadow-lg">
            <img
              src="/assets/mascots/flower-yellow.png"
              alt="Yellow Flower Mascot Accent"
              className="w-14 h-14 object-contain select-none pointer-events-none"
            />
          </div>
        </Html>
      )}
    </group>
  );
}

function RingStage({
  activeIndex,
  onSelect,
  scrollRotationRef,
}: {
  activeIndex: number | null;
  onSelect: (i: number) => void;
  scrollRotationRef: React.MutableRefObject<number>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const total = RING_SHOWCASE_ITEMS.length;
  const radius = 3.4;

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
          onSelect={onSelect}
        />
      ))}
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
    const onWheel = (e: WheelEvent) => {
      // Only spin ring when user is in the hero section
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

    // Shortest angular rotation to bring selected card to front
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
      {/* Top Hero Instruction Pill */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center px-4 w-full max-w-lg">
        <span className="inline-block font-mono text-[10px] md:text-xs tracking-wider uppercase px-4 py-1.5 rounded-full bg-[var(--bg-card)]/80 backdrop-blur-md border border-[var(--border-hairline)] text-[var(--text-muted)] shadow-sm">
          {SITE_COPY.heroHint}
        </span>
      </div>

      <Canvas
        camera={{
          position: [0, isMobile ? 2.3 : 1.95, isMobile ? 11.2 : 8.8],
          fov: isMobile ? 40 : 34,
        }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={1.25} />
        <directionalLight position={[4, 7, 5]} intensity={0.9} />
        <CameraRig isMobile={isMobile} />
        <RingStage
          activeIndex={activeIndex}
          onSelect={handleSelect}
          scrollRotationRef={scrollRotationRef}
        />
        {/* Soft floor shadow under cards */}
        <ContactShadows
          position={[0, -1.02, 0]}
          opacity={0.32}
          scale={11}
          blur={2.0}
          far={4}
          color="#211529"
        />
      </Canvas>

      {/* Spacious Bottom-Left Focused Campaign Overlay matching ui-ref-hero-focused.jpg */}
      {activeItem && (
        <div className="absolute bottom-8 md:bottom-12 left-6 md:left-12 z-20 max-w-lg pointer-events-auto bg-[var(--bg-card)]/90 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-5 md:p-0 rounded-2xl border border-[var(--border-hairline)] md:border-none shadow-xl md:shadow-none transition-all">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-[#211529] text-[#F6EDE4] font-bold">
              {activeItem.indexLabel} / {activeItem.category}
            </span>
            <span
              className="font-mono text-xs font-semibold px-3 py-1 rounded-full text-[#211529]"
              style={{ backgroundColor: activeItem.accentColor }}
            >
              {activeItem.metricsBadge}
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight leading-tight">
            {activeItem.title}
          </h2>

          <p className="text-sm text-[var(--text-muted)] mt-1.5 mb-3 leading-relaxed">
            Client:{' '}
            <a
              href={activeItem.clientUrl}
              target="_blank"
              rel="noreferrer"
              className="underline font-semibold hover:text-[#1388E5] transition-colors"
            >
              {activeItem.client}
            </a>{' '}
            · Illustrated by{' '}
            <a
              href={`/artists#${activeItem.artistId}`}
              className="underline font-semibold hover:text-[#1388E5] transition-colors"
            >
              {activeItem.artistName} (Epiphrame Collective)
            </a>
          </p>

          <a
            href={`#campaign-${activeItem.id}`}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#211529] text-[#F6EDE4] text-xs font-mono font-bold tracking-wider hover:bg-[#1388E5] transition-colors shadow-md"
          >
            VIEW CAMPAIGN ↗
          </a>
        </div>
      )}

      {/* Bottom Right Interactive Card Navigator */}
      <div className="absolute bottom-8 sm:bottom-10 right-6 sm:right-10 md:right-24 z-20 flex items-center gap-2 bg-[var(--bg-card)]/90 backdrop-blur-md px-3.5 py-2 rounded-full border border-[var(--border-hairline)] shadow-lg font-mono text-xs text-[var(--text-muted)] pointer-events-auto">
        <button
          type="button"
          onClick={() => handleNavigate('prev')}
          className="p-1 rounded-full hover:bg-[var(--border-hairline)] text-[var(--text-primary)] transition-colors active:scale-95"
          title="Previous Card"
          aria-label="Previous card in 3D ring"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="font-bold text-[var(--text-primary)] px-1">
          {activeItem ? activeItem.indexLabel : '01'}
        </span>
        <span>/ 08</span>
        <button
          type="button"
          onClick={() => handleNavigate('next')}
          className="p-1 rounded-full hover:bg-[var(--border-hairline)] text-[var(--text-primary)] transition-colors active:scale-95"
          title="Next Card"
          aria-label="Next card in 3D ring"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
