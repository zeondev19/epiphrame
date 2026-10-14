'use client';

import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, RoundedBox, useTexture, useVideoTexture } from '@react-three/drei';
import * as THREE from 'three';
import { RING_SHOWCASE_ITEMS, RingShowcaseItem, SITE_COPY } from '@/data/siteContent';

function VideoCardMaterial({ src }: { src: string }) {
  const texture = useVideoTexture(src, {
    unsuspend: 'canplay',
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
        <Html transform distanceFactor={3.2} position={[0, 0, 0.04]} pointerEvents="none" occlude>
          <img
            src={item.src}
            alt={item.title}
            className="w-40 h-56 object-cover rounded-xl shadow-md select-none"
          />
        </Html>
      )}

      {/* Floating Yellow Flower Mascot Accent perched on the active card */}
      {isActive && (
        <Html
          position={[0.7, 1.05, 0.08]}
          distanceFactor={3.2}
          pointerEvents="none"
        >
          <div className="relative animate-bounce -translate-x-1/2 -translate-y-1/2 filter drop-shadow-lg">
            <img
              src="/assets/mascots/flower-yellow.png"
              alt="Yellow Flower Mascot Accent"
              className="w-16 h-16 object-contain select-none pointer-events-none"
            />
          </div>
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
  const [isMobile, setIsMobile] = useState(false);
  const scrollRotationRef = useRef<number>(0);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);

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

  const handlePointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - startXRef.current;
    startXRef.current = e.clientX;
    scrollRotationRef.current += deltaX * 0.004;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDraggingRef.current) {
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
      } catch {}
      isDraggingRef.current = false;
    }
  };

  const activeItem = activeIndex !== null ? RING_SHOWCASE_ITEMS[activeIndex] : null;

  return (
    <section
      className="relative w-full h-screen bg-[var(--bg-surface)] overflow-hidden select-none cursor-grab active:cursor-grabbing"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Top Hero Instruction Pill */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center px-4 w-full max-w-lg">
        <span className="inline-block font-mono text-[10px] md:text-xs tracking-wider uppercase px-4 py-1.5 rounded-full bg-[var(--bg-card)]/80 backdrop-blur-md border border-[var(--border-hairline)] text-[var(--text-muted)] shadow-sm">
          {SITE_COPY.heroHint}
        </span>
      </div>

      <Canvas
        camera={{
          position: [0, 0.35, isMobile ? 10.8 : 8.2],
          fov: isMobile ? 44 : 38,
        }}
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

      {/* Bottom Right Card Navigator Indicator */}
      <div className="absolute bottom-10 right-10 md:right-24 z-20 hidden sm:flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)]">
        <span>CARD</span>
        <span className="font-bold text-[var(--text-primary)]">
          {activeItem ? activeItem.indexLabel : '--'}
        </span>
        <span>/ 08</span>
      </div>
    </section>
  );
}
