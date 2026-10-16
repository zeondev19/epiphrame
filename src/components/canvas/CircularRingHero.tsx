'use client';

import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, ContactShadows, useTexture } from '@react-three/drei';
import { useVideoTexture } from '@react-three/drei/core/VideoTexture';
import * as THREE from 'three';
import { RING_SHOWCASE_ITEMS, RingShowcaseItem, SITE_COPY } from '@/data/siteContent';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { WebGLErrorBoundary } from '@/components/canvas/WebGLErrorBoundary';
import { motion } from 'framer-motion';

function CardFallback() {
  return (
    <mesh>
      <planeGeometry args={[0.98, 1.74, 24, 24]} />
      <meshBasicMaterial color="#1f1627" transparent opacity={0.6} />
    </mesh>
  );
}

function GlassCardMeshInner({
  texture,
  cardIndex,
  isActive,
  hovered,
  glitterEnabled = false,
  onClick,
  onPointerOver,
  onPointerOut,
}: {
  texture: THREE.Texture;
  cardIndex: number;
  isActive: boolean;
  hovered: boolean;
  glitterEnabled?: boolean;
  onClick: (e: any) => void;
  onPointerOver: (e: any) => void;
  onPointerOut: (e: any) => void;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const cardWidth = 0.98;
  const cardHeight = 1.74;
  const cardAspect = cardWidth / cardHeight; // ~0.5632
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
        uGlitter: { value: glitterEnabled ? 1.0 : 0.0 },
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
        uniform float uGlitter;

        varying vec2 vUv;
        varying vec3 vWorldPos;
        varying vec3 vNormal;
        varying vec3 vViewPosition;

        float sdRoundedBox(vec2 p, vec2 b, float r) {
          vec2 q = abs(p) - b + vec2(r);
          return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
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
          vec3 artCol = texColor.rgb;

          // 3. Prismatic Holographic Diffraction Rainbow Spectrum & Light Sweep
          float foilAngle = (vUv.x * 0.70 + vUv.y * 1.05) + dot(N.xy, uMouse * 0.35) + (1.0 - ndv) * 0.55 + uCardIndex * 0.42;
          vec3 rainbowFoil = 0.5 + 0.5 * cos(6.28318 * (foilAngle * 2.6 + uTime * 0.18 + vec3(0.0, 0.33, 0.67)));

          // Diagonal light beam flash across the card
          float sweepPhase = (vUv.x * 0.85 + vUv.y * 1.15) * 3.14159 - uTime * 2.2 + uMouse.x * 1.3 + uCardIndex * 0.9;
          float sweepBeam = pow(max(0.0, sin(sweepPhase)), 16.0) * 1.4;

          // Four-point anime / comic starburst glints
          float d1 = length((vUv - vec2(0.24, 0.78)) * vec2(uAspect, 1.0));
          vec2 dP1 = abs(vUv - vec2(0.24, 0.78));
          float star1 = (max(0.0, 1.0 - dP1.x * 35.0) * max(0.0, 1.0 - dP1.y * 5.0)
                       + max(0.0, 1.0 - dP1.y * 35.0) * max(0.0, 1.0 - dP1.x * 5.0)
                       + max(0.0, 1.0 - d1 * 22.0) * 1.5) * pow(max(0.0, sin(uTime * 3.2 + uCardIndex * 1.7)), 12.0);

          float d2 = length((vUv - vec2(0.76, 0.24)) * vec2(uAspect, 1.0));
          vec2 dP2 = abs(vUv - vec2(0.76, 0.24));
          float star2 = (max(0.0, 1.0 - dP2.x * 35.0) * max(0.0, 1.0 - dP2.y * 5.0)
                       + max(0.0, 1.0 - dP2.y * 35.0) * max(0.0, 1.0 - dP2.x * 5.0)
                       + max(0.0, 1.0 - d2 * 22.0) * 1.5) * pow(max(0.0, sin(uTime * 3.0 + 1.8 + uCardIndex * 2.3)), 12.0);

          float d3 = length((vUv - vec2(0.72, 0.68)) * vec2(uAspect, 1.0));
          vec2 dP3 = abs(vUv - vec2(0.72, 0.68));
          float star3 = (max(0.0, 1.0 - dP3.x * 38.0) * max(0.0, 1.0 - dP3.y * 5.2)
                       + max(0.0, 1.0 - dP3.y * 38.0) * max(0.0, 1.0 - dP3.x * 5.2)
                       + max(0.0, 1.0 - d3 * 24.0) * 1.5) * pow(max(0.0, sin(uTime * 2.8 + 3.4 + uCardIndex * 0.9)), 12.0);

          float allStars = (star1 + star2 + star3);
          vec3 starColor = vec3(1.0, 0.98, 0.72) + rainbowFoil * 0.35;

          // Holographic foil applied to the artwork
          vec3 holoArt = artCol + (rainbowFoil * 0.38 + vec3(sweepBeam * 0.40)) * (0.40 + 0.35 * uActive) + starColor * allStars * 0.95;
          vec3 finalArt = mix(artCol, holoArt, uGlitter);

          // 4. Card Frame Bezel (Solid Comic Paper vs. Gleaming Rainbow Chrome Foil)
          float outerStroke = smoothstep(-0.016, -0.002, dist);
          float frameBezel = smoothstep(-0.048, -0.036, dist);
          float innerHairline = smoothstep(-0.052, -0.046, dist) - smoothstep(-0.046, -0.040, dist);

          vec3 darkInk = vec3(0.129, 0.082, 0.161); // #211529 Comic ink
          vec3 paperWhite = vec3(1.0, 1.0, 1.0);
          vec3 activeAccent = vec3(1.0, 0.83, 0.0); // #FFD400 Sunny Yellow

          // Matte Paper Frame for Clean Comic mode
          vec3 matteFrame = mix(paperWhite, activeAccent, uActive * 0.90);

          // Gleaming Iridescent Rainbow Chrome Foil Frame for Holo Foil mode
          vec3 chromeBase = mix(vec3(0.96, 0.97, 1.0), vec3(1.0, 0.88, 0.28), uActive * 0.88);
          vec3 holoFrame = mix(chromeBase, rainbowFoil * 1.25, 0.52) + vec3(sweepBeam * 0.70) + starColor * allStars * 0.60;

          // Seamless transition between matte comic frame and holographic chrome foil
          vec3 finalFrame = mix(matteFrame, holoFrame, uGlitter);

          // 5. Composite Final Pixel Color
          vec3 col = finalArt;
          col = mix(col, finalFrame, frameBezel);

          // Inner hairline groove between art and frame (shifts to subtle iridescent ink in holo mode)
          vec3 hairlineColor = mix(darkInk, rainbowFoil * 0.7, uGlitter * 0.45);
          col = mix(col, hairlineColor, innerHairline * 0.70);

          // Outer dark comic contour
          col = mix(col, darkInk, outerStroke * 0.98);

          gl_FragColor = vec4(col, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: true,
      depthTest: true,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    materialRef.current.uniforms.uGlitter.value = THREE.MathUtils.damp(
      materialRef.current.uniforms.uGlitter.value,
      glitterEnabled ? 1.0 : 0.0,
      12,
      delta
    );
  });

  return (
    <mesh
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      renderOrder={5}
    >
      <planeGeometry args={[cardWidth, cardHeight, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        attach="material"
        {...shaderArgs}
        depthWrite={true}
        depthTest={true}
      />
    </mesh>
  );
}

function ImageCardMesh({
  url,
  cardIndex,
  isActive,
  hovered,
  glitterEnabled = false,
  onClick,
  onPointerOver,
  onPointerOut,
}: {
  url: string;
  cardIndex: number;
  isActive: boolean;
  hovered: boolean;
  glitterEnabled?: boolean;
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
      glitterEnabled={glitterEnabled}
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
  glitterEnabled = false,
  onClick,
  onPointerOver,
  onPointerOut,
}: {
  url: string;
  cardIndex: number;
  isActive: boolean;
  hovered: boolean;
  glitterEnabled?: boolean;
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
      glitterEnabled={glitterEnabled}
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
  glitterEnabled = false,
  onClick,
  onPointerOver,
  onPointerOut,
}: {
  item: RingShowcaseItem;
  cardIndex: number;
  isActive: boolean;
  hovered: boolean;
  glitterEnabled?: boolean;
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
        glitterEnabled={glitterEnabled}
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
      glitterEnabled={glitterEnabled}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    />
  );
}

function CameraRig({ isMobile }: { isMobile: boolean }) {
  useFrame(({ camera }) => {
    camera.lookAt(0, 0.35, 0);
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
  glitterEnabled = false,
  onSelect,
}: {
  item: RingShowcaseItem;
  index: number;
  total: number;
  radius: number;
  isActive: boolean;
  anyActive: boolean;
  glitterEnabled?: boolean;
  onSelect: (index: number) => void;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const isFrontRef = useRef(index < 5);
  const [isFront, setIsFront] = useState(index < 5);
  const angle = (index / total) * Math.PI * 2;
  const baseX = Math.sin(angle) * radius;
  const baseZ = Math.cos(angle) * radius;

  useFrame(({ clock }, delta) => {
    if (!meshRef.current) return;
    const targetScale = isActive ? 1.22 : anyActive ? 0.92 : 1.0;
    const targetZOffset = isActive ? 0.48 : (hovered ? 0.14 : 0);
    // Ribbon / orbit wave motion from Gallery source
    const ribbonWave = Math.sin(angle * 2.0 + clock.getElapsedTime() * 0.9) * 0.07;
    const targetY = (hovered ? 0.14 : 0) + ribbonWave;

    // Human-crafted playful organic tilt (anti-AI mechanical symmetry)
    const organicTiltZ = isActive ? 0 : Math.sin(index * 1.618) * 0.040;
    const organicTiltX = isActive ? 0 : Math.cos(index * 2.3) * 0.030;

    meshRef.current.scale.x = THREE.MathUtils.damp(meshRef.current.scale.x, targetScale, 7.5, delta);
    meshRef.current.scale.y = THREE.MathUtils.damp(meshRef.current.scale.y, targetScale, 7.5, delta);
    meshRef.current.scale.z = THREE.MathUtils.damp(meshRef.current.scale.z, targetScale, 7.5, delta);

    meshRef.current.rotation.z = THREE.MathUtils.damp(meshRef.current.rotation.z, organicTiltZ, 6, delta);
    meshRef.current.rotation.x = THREE.MathUtils.damp(meshRef.current.rotation.x, organicTiltX, 6, delta);

    // Subtle curvature towards camera for enhanced presentation
    const targetRotY = angle + Math.sin(angle) * -0.20;
    meshRef.current.rotation.y = THREE.MathUtils.damp(meshRef.current.rotation.y, targetRotY, 6, delta);

    const forwardX = Math.sin(angle) * (radius + targetZOffset);
    const forwardZ = Math.cos(angle) * (radius + targetZOffset);
    meshRef.current.position.x = THREE.MathUtils.damp(meshRef.current.position.x, forwardX, 7, delta);
    meshRef.current.position.y = THREE.MathUtils.damp(meshRef.current.position.y, targetY, 7, delta);
    meshRef.current.position.z = THREE.MathUtils.damp(meshRef.current.position.z, forwardZ, 7, delta);

    // Track whether this card is in the front half facing the camera
    const worldPos = new THREE.Vector3();
    meshRef.current.getWorldPosition(worldPos);
    const front = worldPos.z > -0.35;
    if (front !== isFrontRef.current) {
      isFrontRef.current = front;
      setIsFront(front);
    }
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
          glitterEnabled={glitterEnabled}
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

      {/* Comic Artist Tag Pill Floating Under Front Cards (Raised safely above green field) */}
      {isFront && (
        <Html
          position={[0, -1.04, 0.12]}
          distanceFactor={4.2}
          center
          pointerEvents="none"
        >
          <div
            className={`whitespace-nowrap transition-all duration-300 font-extrabold text-[11px] px-3.5 py-1 rounded-full border-2 select-none ${
              isActive
                ? 'bg-[#FFD400] text-[#211529] border-[#211529] scale-110 shadow-[3px_3px_0px_#211529]'
                : 'bg-white text-[#211529] shadow-[2px_2px_0px_#211529]'
            }`}
            style={{
              backgroundColor: isActive
                ? '#FFD400'
                : (item.id === 'cycle-ramen-01' ? '#FFF0F5' : item.id === 'hangjam-alchemist-02' ? '#FFF9D6' : '#FFFFFF'),
              borderColor: isActive
                ? '#211529'
                : (item.id === 'cycle-ramen-01' ? '#FF66B2' : item.id === 'hangjam-alchemist-02' ? '#FFD400' : '#211529'),
            }}
          >
            Drawn by {item.id === 'hangjam-alchemist-02' ? '@ls680' : item.id === 'cycle-skater-04' ? '@hrix' : item.id === 'hangjam-painter-05' ? '@chris8' : item.id === 'epiphrame-vibe-reel-06' ? '@white' : `@${item.artistName.toLowerCase()} ✿`}
          </div>
        </Html>
      )}

      {/* Floating Yellow Flower Mascot Accent perched on the active card top-right */}
      {isActive && (
        <Html
          position={[0.42, 0.80, 0.08]}
          distanceFactor={3.4}
          pointerEvents="none"
        >
          <div className="relative -translate-x-1/2 -translate-y-1/2 filter drop-shadow-[2px_2px_0px_#141316]">
            <img
              src="/assets/mascots/flower-yellow.png"
              alt="Yellow Flower Mascot Accent"
              className="w-10 h-10 object-contain select-none pointer-events-none"
            />
          </div>
        </Html>
      )}
    </group>
  );
}

// 3D Iridescent Saturn-like Orbit Ring - tilted forward and positioned behind front cards
function OrbitHaloRing({ radius = 3.8 }: { radius?: number }) {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const bandRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (bandRef.current) {
      (bandRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.32 + Math.sin(t * 1.5) * 0.08;
    }
  });

  return (
    // Scaled elliptical (wide in X, shallow in Z) and tilted forward by ~15 deg (Math.PI * 0.43)
    // Shifted back in Z (Z = -0.42) so front of ring is at Z = +2.40, well behind front cards (Z = +3.8 to +4.3)
    <group
      position={[0, -0.34, -0.42]}
      rotation={[Math.PI * 0.43, 0, 0]}
      scale={[1.20, 1.0, 0.74]}
    >
      {/* Outer Glow Tube */}
      <mesh ref={outerRef} renderOrder={1}>
        <torusGeometry args={[radius + 0.32, 0.022, 16, 128]} />
        <meshStandardMaterial
          color="#EAF6FF"
          emissive="#D4EDFF"
          emissiveIntensity={0.55}
          roughness={0.2}
          metalness={0.5}
          transparent
          opacity={0.85}
          depthWrite={false}
          depthTest={true}
        />
      </mesh>

      {/* Inner Glow Tube */}
      <mesh ref={innerRef} renderOrder={1}>
        <torusGeometry args={[radius - 0.25, 0.016, 16, 128]} />
        <meshStandardMaterial
          color="#FFF2FA"
          emissive="#FFD6F0"
          emissiveIntensity={0.55}
          roughness={0.2}
          metalness={0.5}
          transparent
          opacity={0.85}
          depthWrite={false}
          depthTest={true}
        />
      </mesh>

      {/* Translucent Iridescent Disc Ribbon */}
      <mesh ref={bandRef} position={[0, 0, 0]} renderOrder={1}>
        <ringGeometry args={[radius - 0.25, radius + 0.32, 128]} />
        <meshStandardMaterial
          color="#F2EEFA"
          emissive="#E3D7FA"
          emissiveIntensity={0.30}
          transparent
          opacity={0.42}
          roughness={0.3}
          metalness={0.6}
          side={THREE.DoubleSide}
          depthWrite={false}
          depthTest={true}
        />
      </mesh>
    </group>
  );
}

function RingStage({
  activeIndex,
  onSelect,
  scrollRotationRef,
  isDraggingRef,
  dragVelocityRef,
  onFrontChange,
  isMobile,
  glitterEnabled = false,
}: {
  activeIndex: number | null;
  onSelect: (i: number) => void;
  scrollRotationRef: React.MutableRefObject<number>;
  isDraggingRef: React.MutableRefObject<boolean>;
  dragVelocityRef: React.MutableRefObject<number>;
  onFrontChange: (i: number) => void;
  isMobile: boolean;
  glitterEnabled?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const total = RING_SHOWCASE_ITEMS.length;
  const radius = 3.8;
  const lastFrontRef = useRef<number>(-1);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    if (!isDraggingRef.current) {
      if (Math.abs(dragVelocityRef.current) > 0.00008) {
        // Silky-smooth momentum physics glide on drag flick / release
        scrollRotationRef.current += dragVelocityRef.current;
        dragVelocityRef.current *= 0.945; // Buttery physical friction decay
      } else {
        // Continuous gentle ambient drift when idle
        scrollRotationRef.current += 0.0008;
      }
    }

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      scrollRotationRef.current,
      5.5,
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
    <group position={[0, isMobile ? 0.28 : 0.44, 0]} rotation={[0.035, 0, 0]}>
      {/* 3D Iridescent Saturn-like Orbit Ring */}
      <OrbitHaloRing radius={radius} />

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
            glitterEnabled={glitterEnabled}
            onSelect={onSelect}
          />
        ))}
      </group>
    </group>
  );
}

function PuffyCloud({
  color = '#FFFFFF',
  shadowColor = '#D8DEE9',
  className = '',
}: {
  color?: string;
  shadowColor?: string;
  className?: string;
}) {
  return (
    <svg
      width="180"
      height="110"
      viewBox="0 0 180 110"
      fill="none"
      className={`select-none pointer-events-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.06)] ${className}`}
    >
      <g>
        {/* Darker Underside Shadow Curve */}
        <ellipse cx="90" cy="74" rx="72" ry="26" fill={shadowColor} />
        <ellipse cx="48" cy="64" rx="34" ry="28" fill={shadowColor} />
        <ellipse cx="132" cy="64" rx="34" ry="28" fill={shadowColor} />

        {/* Main Puffy Upper Body */}
        <ellipse cx="90" cy="68" rx="70" ry="26" fill={color} />
        <ellipse cx="50" cy="56" rx="32" ry="28" fill={color} />
        <ellipse cx="88" cy="42" rx="38" ry="32" fill={color} />
        <ellipse cx="128" cy="56" rx="30" ry="26" fill={color} />
      </g>
    </svg>
  );
}

function Sparkle4Point({
  size = 24,
  color = '#00E5FF',
  className = '',
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M12 0 C12 6.627 6.627 12 0 12 C6.627 12 12 17.373 12 24 C12 17.373 17.373 12 24 12 C17.373 12 12 6.627 12 0 Z"
        fill={color}
        stroke="#211529"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function SkyMascot({
  mode,
  onClick,
}: {
  mode: 'day' | 'sunset' | 'night';
  onClick: () => void;
}) {
  const isNight = mode === 'night';

  return (
    <div className="absolute top-20 right-8 md:right-24 z-30 pointer-events-auto">
      <motion.div
        onClick={onClick}
        onPointerDown={(e) => e.stopPropagation()}
        className="flex flex-col items-center cursor-pointer select-none"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.85, y: 20 }}
        transition={{ type: 'spring', stiffness: 450, damping: 18 }}
      >
        <div className="relative w-28 h-28 flex items-center justify-center">
          {!isNight ? (
            /* DAY / SUNSET 3D SUN */
            <svg
              width="116"
              height="116"
              viewBox="0 0 100 100"
              className="drop-shadow-[0_4px_12px_rgba(255,212,0,0.45)]"
            >
              <defs>
                <radialGradient id="sunGrad" cx="38%" cy="38%" r="62%">
                  <stop offset="0%" stopColor="#FFF9B0" />
                  <stop offset="65%" stopColor="#FFD400" />
                  <stop offset="100%" stopColor="#FFAC00" />
                </radialGradient>
                <linearGradient id="rayGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFE033" />
                  <stop offset="100%" stopColor="#FF9B00" />
                </linearGradient>
              </defs>

              {/* 8 3D Sculpted Rays with Dark Ink Outline */}
              <g stroke="#211529" strokeWidth="2.8" strokeLinejoin="round" fill="url(#rayGrad)">
                <polygon points="50,2 43,18 57,18" />
                <polygon points="50,2 43,18 57,18" transform="rotate(45 50 50)" />
                <polygon points="50,2 43,18 57,18" transform="rotate(90 50 50)" />
                <polygon points="50,2 43,18 57,18" transform="rotate(135 50 50)" />
                <polygon points="50,2 43,18 57,18" transform="rotate(180 50 50)" />
                <polygon points="50,2 43,18 57,18" transform="rotate(225 50 50)" />
                <polygon points="50,2 43,18 57,18" transform="rotate(270 50 50)" />
                <polygon points="50,2 43,18 57,18" transform="rotate(315 50 50)" />
              </g>

              {/* Main Glowing Sphere */}
              <circle
                cx="50"
                cy="50"
                r="34"
                fill="url(#sunGrad)"
                stroke="#211529"
                strokeWidth="2.8"
              />

              {/* Rosy Pink Blush Cheeks */}
              <ellipse cx="37" cy="54" rx="4.5" ry="3.2" fill="#FF66B2" />
              <ellipse cx="63" cy="54" rx="4.5" ry="3.2" fill="#FF66B2" />

              {/* Curved Happy Smiling Eyes */}
              <path
                d="M34,46 Q38,41 42,46"
                fill="none"
                stroke="#211529"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              <path
                d="M58,46 Q62,41 66,46"
                fill="none"
                stroke="#211529"
                strokeWidth="3.2"
                strokeLinecap="round"
              />

              {/* Joyful Smile */}
              <path
                d="M44,52 Q50,60 56,52"
                fill="none"
                stroke="#211529"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            /* NIGHT CRESCENT MOON */
            <svg
              width="108"
              height="108"
              viewBox="0 0 100 100"
              className="drop-shadow-[0_4px_16px_rgba(255,212,0,0.6)]"
            >
              <defs>
                <linearGradient id="moonGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFF275" />
                  <stop offset="60%" stopColor="#FFD400" />
                  <stop offset="100%" stopColor="#E5A600" />
                </linearGradient>
              </defs>

              {/* Floating Little Twinkle Stars */}
              <polygon
                points="24,20 26,26 32,28 26,30 24,36 22,30 16,28 22,26"
                fill="#FFF475"
                stroke="#211529"
                strokeWidth="1.2"
              />
              <polygon
                points="18,52 19,56 23,57 19,58 18,62 17,58 13,57 17,56"
                fill="#FFF475"
                stroke="#211529"
                strokeWidth="1.2"
              />

              {/* Smiling Crescent Body */}
              <path
                d="M 68,12 C 42,14 26,36 30,64 C 34,84 56,92 76,82 C 54,82 46,62 48,46 C 50,30 62,18 68,12 Z"
                fill="url(#moonGrad)"
                stroke="#211529"
                strokeWidth="2.8"
                strokeLinejoin="round"
              />

              {/* Sweet Sleeping / Smiling Eye */}
              <path
                d="M 44,48 Q 48,43 52,48"
                fill="none"
                stroke="#211529"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Blush Cheek */}
              <ellipse cx="48" cy="57" rx="3.5" ry="2.5" fill="#FF66B2" />

              {/* Gentle Smile */}
              <path
                d="M 52,56 Q 56,62 60,57"
                fill="none"
                stroke="#211529"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>

        {/* Dangling Comic Tag with Connector Line */}
        <div className="relative -mt-1 flex flex-col items-center">
          <div className="w-[2px] h-3 bg-[#211529]" />
          <div className="bg-white border-2 border-[#211529] px-3 py-1 rounded-xl text-[10px] font-black shadow-[2px_2px_0px_#211529] rotate-12 text-[#211529] leading-tight text-center tracking-tight select-none">
            PULL ME TO<br />CHANGE SKY!
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function RollingGreenHills() {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
      <svg
        viewBox="0 0 1440 220"
        className="w-full h-24 sm:h-28 md:h-32 block select-none"
        preserveAspectRatio="none"
      >
        {/* Layer 1: Back Rolling Hill (Dark Emerald Green) */}
        <path
          d="M0,110 C240,40 520,130 760,80 C1000,30 1220,120 1440,65 L1440,220 L0,220 Z"
          fill="#1E7E48"
        />

        {/* Back Hill Grass Tufts */}
        <g stroke="#145A32" strokeWidth="2" strokeLinecap="round" fill="none">
          <path d="M 280,118 Q 284,108 288,118 Q 292,106 296,118 Q 300,110 304,118" />
          <path d="M 720,102 Q 724,92 728,102 Q 732,90 736,102 Q 740,94 744,102" />
          <path d="M 1120,88 Q 1124,78 1128,88 Q 1132,76 1136,88 Q 1140,80 1144,88" />
        </g>

        {/* Layer 2: Front Rolling Hill (Vibrant Fresh Green) */}
        <path
          d="M0,140 C280,85 580,165 880,115 C1100,75 1300,140 1440,95 L1440,220 L0,220 Z"
          fill="#27AE60"
        />

        {/* Front Hill Doodle Grass Tufts */}
        <g stroke="#211529" strokeWidth="2.2" strokeLinecap="round" fill="none">
          <path d="M 40,165 Q 44,152 48,165 Q 52,150 56,165 Q 60,154 64,165" />
          <path d="M 240,172 Q 244,160 248,172 Q 252,158 256,172 Q 260,162 264,172" />
          <path d="M 420,185 Q 424,174 428,185 Q 432,170 436,185 Q 440,176 444,185" />
          <path d="M 620,176 Q 624,164 628,176 Q 632,160 636,176 Q 640,166 644,176" />
          <path d="M 820,168 Q 824,156 828,168 Q 832,154 836,168 Q 840,158 844,168" />
          <path d="M 1040,165 Q 1044,152 1048,165 Q 1052,150 1056,165 Q 1060,154 1064,165" />
          <path d="M 1260,158 Q 1264,146 1268,158 Q 1272,142 1276,158 Q 1280,148 1284,158" />
          <path d="M 1380,150 Q 1384,138 1388,150 Q 1392,136 1396,150" />
        </g>

        {/* Blooming Flowers on Front Hills */}
        {/* Flower 1: Yellow Smiling Daisy (Left) */}
        <g transform="translate(62, 142)">
          <path d="M 12,24 Q 10,14 12,6" stroke="#211529" strokeWidth="2" fill="none" />
          <path d="M 10,16 Q 4,14 6,10 Q 10,12 11,15" fill="#2ECC71" stroke="#211529" strokeWidth="1.5" />
          <circle cx="12" cy="6" r="10" fill="#FFD400" stroke="#211529" strokeWidth="2" />
          <circle cx="12" cy="6" r="5" fill="#FFE247" stroke="#211529" strokeWidth="1.2" />
          <circle cx="10" cy="5" r="0.8" fill="#211529" />
          <circle cx="14" cy="5" r="0.8" fill="#211529" />
          <path d="M 10,7 Q 12,8.5 14,7" stroke="#211529" strokeWidth="1" strokeLinecap="round" fill="none" />
        </g>

        {/* Flower 2: Pink Blossom (Left-Center) */}
        <g transform="translate(112, 152)">
          <path d="M 10,22 Q 12,12 10,4" stroke="#211529" strokeWidth="2" fill="none" />
          <circle cx="10" cy="4" r="8" fill="#FF66B2" stroke="#211529" strokeWidth="2" />
          <circle cx="10" cy="4" r="3.5" fill="#FFD400" stroke="#211529" strokeWidth="1.2" />
        </g>

        {/* Flower 3: Orange Tulip (Left) */}
        <g transform="translate(168, 160)">
          <path d="M 8,20 Q 6,10 8,4" stroke="#211529" strokeWidth="2" fill="none" />
          <path d="M 3,4 Q 8,-4 13,4 Q 8,10 3,4 Z" fill="#FF7A00" stroke="#211529" strokeWidth="2" />
        </g>

        {/* Flower 4: White Daisy (Center) */}
        <g transform="translate(215, 172)">
          <path d="M 8,18 Q 8,10 8,4" stroke="#211529" strokeWidth="1.8" fill="none" />
          <circle cx="8" cy="4" r="6" fill="#FFFFFF" stroke="#211529" strokeWidth="1.8" />
          <circle cx="8" cy="4" r="2.5" fill="#FFD400" />
        </g>

        {/* Flower 5: Pink Blossom (Right-Center) */}
        <g transform="translate(1210, 150)">
          <path d="M 10,22 Q 8,12 10,4" stroke="#211529" strokeWidth="2" fill="none" />
          <circle cx="10" cy="4" r="7.5" fill="#FF66B2" stroke="#211529" strokeWidth="2" />
          <circle cx="10" cy="4" r="3" fill="#FFE247" stroke="#211529" strokeWidth="1.2" />
        </g>

        {/* Flower 6: Yellow Smiling Daisy (Far Right) */}
        <g transform="translate(1320, 134)">
          <path d="M 12,24 Q 14,14 12,6" stroke="#211529" strokeWidth="2" fill="none" />
          <circle cx="12" cy="6" r="9" fill="#FFD400" stroke="#211529" strokeWidth="2" />
          <circle cx="12" cy="6" r="4.5" fill="#FFF275" stroke="#211529" strokeWidth="1.2" />
          <circle cx="10.5" cy="5" r="0.8" fill="#211529" />
          <circle cx="13.5" cy="5" r="0.8" fill="#211529" />
          <path d="M 10.5,7 Q 12,8.2 13.5,7" stroke="#211529" strokeWidth="1" strokeLinecap="round" fill="none" />
        </g>
      </svg>
    </div>
  );
}

const NIGHT_STARS = [
  { top: '8%', left: '12%', delay: 0.2, duration: 2.1 },
  { top: '15%', left: '28%', delay: 0.8, duration: 1.8 },
  { top: '6%', left: '45%', delay: 0.1, duration: 2.4 },
  { top: '12%', left: '62%', delay: 1.2, duration: 1.9 },
  { top: '9%', left: '78%', delay: 0.5, duration: 2.2 },
  { top: '18%', left: '88%', delay: 1.5, duration: 1.7 },
  { top: '24%', left: '16%', delay: 0.3, duration: 2.5 },
  { top: '28%', left: '35%', delay: 1.1, duration: 2.0 },
  { top: '22%', left: '52%', delay: 0.7, duration: 1.6 },
  { top: '30%', left: '70%', delay: 1.4, duration: 2.3 },
  { top: '25%', left: '84%', delay: 0.4, duration: 1.9 },
  { top: '38%', left: '8%', delay: 0.9, duration: 2.1 },
  { top: '35%', left: '22%', delay: 1.6, duration: 1.8 },
  { top: '42%', left: '40%', delay: 0.2, duration: 2.6 },
  { top: '36%', left: '58%', delay: 1.0, duration: 2.2 },
  { top: '40%', left: '80%', delay: 0.6, duration: 1.7 },
  { top: '48%', left: '18%', delay: 1.3, duration: 2.0 },
  { top: '52%', left: '32%', delay: 0.4, duration: 2.4 },
  { top: '46%', left: '72%', delay: 1.7, duration: 1.9 },
  { top: '55%', left: '86%', delay: 0.8, duration: 2.2 },
  { top: '14%', left: '6%', delay: 0.5, duration: 2.3 },
  { top: '4%', left: '33%', delay: 1.2, duration: 1.6 },
  { top: '11%', left: '50%', delay: 0.3, duration: 2.1 },
  { top: '5%', left: '67%', delay: 1.4, duration: 2.5 },
  { top: '16%', left: '94%', delay: 0.7, duration: 1.8 },
  { top: '32%', left: '4%', delay: 1.1, duration: 2.0 },
  { top: '44%', left: '26%', delay: 0.1, duration: 2.7 },
  { top: '50%', left: '64%', delay: 1.5, duration: 1.9 },
  { top: '27%', left: '92%', delay: 0.6, duration: 2.2 },
  { top: '39%', left: '90%', delay: 1.0, duration: 2.4 },
];

export default function CircularRingHero() {
  const [skyMode, setSkyMode] = useState<'day' | 'sunset' | 'night'>('day');
  const [glitterEnabled, setGlitterEnabled] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRotationRef = useRef<number>(0);
  const dragVelocityRef = useRef<number>(0);
  const lastXRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
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
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    dragVelocityRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const now = performance.now();
    const dt = Math.max(1, now - lastTimeRef.current);
    const deltaX = e.clientX - lastXRef.current;
    const totalDeltaX = e.clientX - dragStartRef.current.x;
    const totalDeltaY = e.clientY - dragStartRef.current.y;

    if (Math.hypot(totalDeltaX, totalDeltaY) > 5) {
      hasMovedRef.current = true;
    }
    if (hasMovedRef.current) {
      scrollRotationRef.current += deltaX * 0.0030;
      // Instantaneous flick momentum velocity
      const instantVelocity = (deltaX / dt) * 0.034;
      dragVelocityRef.current = THREE.MathUtils.clamp(
        instantVelocity,
        -0.065,
        0.065
      );
    }
    lastXRef.current = e.clientX;
    lastTimeRef.current = now;
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

  const cycleSkyMode = () => {
    setSkyMode((prev) => {
      if (prev === 'day') return 'sunset';
      if (prev === 'sunset') return 'night';
      return 'day';
    });
  };

  const activeItem = activeIndex !== null ? RING_SHOWCASE_ITEMS[activeIndex] : null;

  const skyGradientClass =
    skyMode === 'day'
      ? 'bg-gradient-to-b from-[#1388E5] via-[#80B0E8] to-[#F6EDE4]'
      : skyMode === 'sunset'
      ? 'bg-gradient-to-b from-[#5542BB] via-[#FF66B2] to-[#FFD400]'
      : 'bg-gradient-to-b from-[#150E26] via-[#2A174E] to-[#452470]';

  // Cloud palette colors based on skyMode
  const cloudPink = skyMode === 'night' ? '#7E4FA0' : '#FF66B2';
  const cloudPinkShadow = skyMode === 'night' ? '#532E70' : '#D9408E';
  const cloudWhite = skyMode === 'night' ? '#A27AC2' : '#FFFFFF';
  const cloudWhiteShadow = skyMode === 'night' ? '#684285' : '#D5DCE8';
  const cloudPastelPink = skyMode === 'night' ? '#8E5EB0' : '#FFC0D0';
  const cloudPastelPinkShadow = skyMode === 'night' ? '#5D357A' : '#EAA4B8';

  return (
    <section
      className={`relative w-full h-screen ${skyGradientClass} transition-colors duration-700 overflow-hidden select-none cursor-grab active:cursor-grabbing`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Night mode stars */}
      {skyMode === 'night' && (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {NIGHT_STARS.map((star, idx) => (
            <motion.div
              key={idx}
              className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#FFFFFF]"
              style={{ top: star.top, left: star.left }}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8] }}
              transition={{
                duration: star.duration,
                delay: star.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      {/* 4-Point Floating Sparkle Stars Around Center Ring */}
      <motion.div
        animate={{ rotate: [0, 15, -15, 0], scale: [0.9, 1.15, 0.9] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[42%] left-[22%] z-20 pointer-events-none"
      >
        <Sparkle4Point size={26} color="#00E5FF" />
      </motion.div>
      <motion.div
        animate={{ rotate: [0, -20, 20, 0], scale: [1, 1.25, 1] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute top-[38%] right-[22%] z-20 pointer-events-none"
      >
        <Sparkle4Point size={28} color="#FFD400" />
      </motion.div>
      <motion.div
        animate={{ rotate: [0, 15, -15, 0], scale: [0.85, 1.2, 0.85] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-[58%] left-[26%] z-20 pointer-events-none"
      >
        <Sparkle4Point size={22} color="#FF66B2" />
      </motion.div>
      <motion.div
        animate={{ rotate: [0, -15, 15, 0], scale: [0.9, 1.2, 0.9] }}
        transition={{ duration: 3.0, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        className="absolute top-[62%] right-[26%] z-20 pointer-events-none"
      >
        <Sparkle4Point size={24} color="#FFFFFF" />
      </motion.div>

      {/* Interactive Draggable & Squishy Puffy Clouds */}
      <motion.div
        drag
        dragConstraints={{ top: -100, bottom: 100, left: -200, right: 200 }}
        initial={{ rotate: -4, scale: 1.1 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scaleX: 1.18, scaleY: 0.85 }}
        onPointerDown={(e) => e.stopPropagation()}
        className="absolute top-28 left-6 md:left-12 z-10 cursor-grab active:cursor-grabbing"
      >
        <PuffyCloud color={cloudPink} shadowColor={cloudPinkShadow} />
      </motion.div>

      <motion.div
        drag
        dragConstraints={{ top: -100, bottom: 100, left: -200, right: 200 }}
        initial={{ rotate: 3, scale: 0.9 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scaleX: 1.18, scaleY: 0.85 }}
        onPointerDown={(e) => e.stopPropagation()}
        className="absolute top-16 left-[22%] z-10 cursor-grab active:cursor-grabbing"
      >
        <PuffyCloud color={cloudWhite} shadowColor={cloudWhiteShadow} />
      </motion.div>

      <motion.div
        drag
        dragConstraints={{ top: -100, bottom: 100, left: -200, right: 200 }}
        initial={{ rotate: -2, scale: 1.15 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scaleX: 1.18, scaleY: 0.85 }}
        onPointerDown={(e) => e.stopPropagation()}
        className="absolute top-24 right-[25%] z-10 cursor-grab active:cursor-grabbing"
      >
        <PuffyCloud color={cloudPastelPink} shadowColor={cloudPastelPinkShadow} />
      </motion.div>

      <motion.div
        drag
        dragConstraints={{ top: -100, bottom: 100, left: -200, right: 200 }}
        initial={{ rotate: 5, scale: 0.8 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scaleX: 1.18, scaleY: 0.85 }}
        onPointerDown={(e) => e.stopPropagation()}
        className="absolute bottom-44 left-10 z-10 cursor-grab active:cursor-grabbing"
      >
        <PuffyCloud color={cloudPink} shadowColor={cloudPinkShadow} />
      </motion.div>

      <motion.div
        drag
        dragConstraints={{ top: -100, bottom: 100, left: -200, right: 200 }}
        initial={{ rotate: -3, scale: 1.1 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scaleX: 1.18, scaleY: 0.85 }}
        onPointerDown={(e) => e.stopPropagation()}
        className="absolute bottom-36 right-8 md:right-16 z-10 cursor-grab active:cursor-grabbing"
      >
        <PuffyCloud color={cloudPink} shadowColor={cloudPinkShadow} />
      </motion.div>

      {/* Interactive Sun & Moon Mascot */}
      <SkyMascot mode={skyMode} onClick={cycleSkyMode} />

      {/* 3D Ring Canvas */}
      <WebGLErrorBoundary>
        <Canvas
          camera={{
            position: [0, isMobile ? 0.7 : 0.45, isMobile ? 11.2 : 9.4],
            fov: isMobile ? 38 : 31,
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
            isDraggingRef={isDraggingRef}
            dragVelocityRef={dragVelocityRef}
            onFrontChange={(idx) => setActiveIndex(idx)}
            isMobile={isMobile}
            glitterEnabled={glitterEnabled}
          />
          <ContactShadows
            position={[0, -0.75, 0]}
            opacity={0.16}
            scale={14}
            blur={2.8}
            far={4.5}
            color="#8C7A6B"
          />
        </Canvas>
      </WebGLErrorBoundary>

      {/* Layered Wavy Rolling Green Hills with Flowers */}
      <RollingGreenHills />

      {/* Bottom Left Card Style Configuration Toggle (Clean Comic vs Holo Foil) */}
      <div
        onPointerDown={(e) => e.stopPropagation()}
        className="absolute bottom-8 left-4 md:left-12 z-30 flex items-center gap-1.5 bg-white border-2 border-[#211529] shadow-[3px_3px_0px_#211529] px-2.5 py-1.5 rounded-full text-xs font-bold text-[#211529] pointer-events-auto select-none"
      >
        <span className="hidden sm:inline text-[10px] tracking-wider uppercase font-black text-[#211529]/60 px-1">
          Card Style:
        </span>
        <button
          type="button"
          onClick={() => setGlitterEnabled(false)}
          className={`px-3 py-1 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
            !glitterEnabled
              ? 'bg-[#FFD400] text-[#211529] border border-[#211529] shadow-[1px_1px_0px_#211529]'
              : 'text-[#211529]/70 hover:text-[#211529]'
          }`}
          title="Switch to Clean Comic presentation (Original Hand-drawn Art)"
        >
          ✿ Clean Comic
        </button>
        <button
          type="button"
          onClick={() => setGlitterEnabled(true)}
          className={`px-3 py-1 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
            glitterEnabled
              ? 'bg-[#FF66B2] text-white border border-[#211529] shadow-[1px_1px_0px_#211529]'
              : 'text-[#211529]/70 hover:text-[#211529]'
          }`}
          title="Switch to Holographic Glitter Foil card effect"
        >
          ✨ Holo Foil
        </button>
      </div>

      {/* Bottom Right Interactive Card Navigator */}
      <div
        onPointerDown={(e) => e.stopPropagation()}
        className="absolute bottom-8 right-4 md:right-12 z-30 flex items-center gap-2 bg-white border-2 border-[#211529] shadow-[3px_3px_0px_#211529] px-4 py-2 rounded-full font-mono text-xs text-[#211529] pointer-events-auto select-none"
      >
        <button
          type="button"
          onClick={() => handleNavigate('prev')}
          className="p-1.5 rounded-full hover:bg-[#FFD400] text-[#211529] transition-colors active:scale-90 cursor-pointer"
          title="Previous Card"
          aria-label="Previous card in 3D ring"
        >
          <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
        </button>
        <span className="font-black text-[#FF425E] px-1 text-sm">
          {activeItem ? activeItem.indexLabel : '01'}
        </span>
        <span className="font-bold text-[#211529]">/ 08</span>
        <button
          type="button"
          onClick={() => handleNavigate('next')}
          className="p-1.5 rounded-full hover:bg-[#FFD400] text-[#211529] transition-colors active:scale-90 cursor-pointer"
          title="Next Card"
          aria-label="Next card in 3D ring"
        >
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </section>
  );
}
