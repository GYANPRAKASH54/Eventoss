'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Spotlight Beam Mesh Component
function SpotlightBeam({ position, rotationSpeed, color }: { position: [number, number, number]; rotationSpeed: number; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle oscillation
      meshRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * rotationSpeed) * 0.4;
      meshRef.current.rotation.x = Math.cos(state.clock.getElapsedTime() * (rotationSpeed * 0.7)) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={[Math.PI / 8, 0, 0]}>
      <cylinderGeometry args={[0.05, 1.8, 8, 32, 1, true]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.15}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// Stage & Staging Rig Component
function StageSetup({ theme, isLight }: { theme: string; isLight: boolean }) {
  const stageRef = useRef<THREE.Group>(null);
  const djConsoleRef = useRef<THREE.Mesh>(null);
  const gazeboRef = useRef<THREE.Group>(null);
  const corporateScreensRef = useRef<THREE.Group>(null);
  const { size } = useThree();

  const isMobile = size.width < 768;
  const isTablet = size.width >= 768 && size.width < 1100;
  const scale = isMobile ? 0.45 : isTablet ? 0.65 : 1.0;
  const targetY = isMobile ? -1.0 : isTablet ? -1.25 : -1.5;

  useFrame((state) => {
    if (stageRef.current) {
      // Floating motion
      stageRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.15 + targetY;
      stageRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
    if (djConsoleRef.current && theme === 'concert') {
      djConsoleRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <group ref={stageRef} position={[0, targetY, 0]} scale={[scale, scale, scale]}>
      {/* Stage Base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
        <cylinderGeometry args={[4.2, 4.5, 0.4, 32]} />
        <meshStandardMaterial color={isLight ? "#e2e8f0" : "#0b0d1b"} roughness={isLight ? 0.35 : 0.6} metalness={isLight ? 0.15 : 0.8} />
      </mesh>
      
      {/* Outer Stage Ring Glow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <ringGeometry args={[4.1, 4.2, 64]} />
        <meshBasicMaterial color={theme === 'concert' ? '#B39DDB' : theme === 'wedding' ? '#CBD5E1' : '#80DEEA'} />
      </mesh>

      {/* Theme 1: Concert DJ Console and Speaker Stacks */}
      {theme === 'concert' && (
        <group>
          {/* DJ Console */}
          <mesh ref={djConsoleRef} position={[0, 0.5, 0]}>
            <boxGeometry args={[1.8, 0.9, 0.8]} />
            <meshStandardMaterial color="#0f1123" roughness={0.3} metalness={0.9} />
            {/* Glowing screen on console */}
            <mesh position={[0, 0, 0.41]}>
              <planeGeometry args={[1.6, 0.7]} />
              <meshBasicMaterial color="#F48FB1" toneMapped={false} />
            </mesh>
          </mesh>
          
          {/* Speakers Stack Left */}
          <mesh position={[-2.8, 1, -0.5]}>
            <boxGeometry args={[0.8, 2, 0.8]} />
            <meshStandardMaterial color="#080911" roughness={0.5} />
          </mesh>
          
          {/* Speakers Stack Right */}
          <mesh position={[2.8, 1, -0.5]}>
            <boxGeometry args={[0.8, 2, 0.8]} />
            <meshStandardMaterial color="#080911" roughness={0.5} />
          </mesh>

          {/* Truss Arch */}
          <mesh position={[0, 2.5, -2]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[3, 0.1, 8, 48, Math.PI]} />
            <meshStandardMaterial color="#CBD5E1" roughness={0.2} metalness={0.9} wireframe />
          </mesh>
        </group>
      )}

      {/* Theme 2: Wedding Gazebo & Luxury Flowers Setup */}
      {theme === 'wedding' && (
        <group ref={gazeboRef}>
          {/* Gazebo Columns */}
          {[-1.8, 1.8].map((x, i) =>
            [-1.8, 1.8].map((z, j) => (
              <mesh key={`${i}-${j}`} position={[x, 1.5, z]}>
                <cylinderGeometry args={[0.08, 0.1, 3, 16]} />
                <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.3} />
              </mesh>
            ))
          )}
          
          {/* Gazebo Ring Dome */}
          <mesh position={[0, 3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <torusGeometry args={[2.5, 0.08, 16, 64]} />
            <meshStandardMaterial color="#CBD5E1" roughness={0.1} metalness={0.9} />
          </mesh>
          
          {/* Dome Ribs (Luxury Wireframe Dome) */}
          <mesh position={[0, 3.5, 0]} rotation={[0, 0, 0]}>
            <sphereGeometry args={[2.5, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#CBD5E1" wireframe roughness={0.1} />
          </mesh>
          
          {/* Centered Table / Podium */}
          <mesh position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.8, 0.8, 0.8, 32]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} />
          </mesh>
        </group>
      )}

      {/* Theme 3: Corporate Panel and Presentation Stage */}
      {theme === 'corporate' && (
        <group ref={corporateScreensRef}>
          {/* Wide LED Backdrop Screen */}
          <mesh position={[0, 1.6, -1.8]}>
            <boxGeometry args={[5.5, 3.2, 0.15]} />
            <meshStandardMaterial color="#0f1123" roughness={0.5} />
            {/* LED Screen Display */}
            <mesh position={[0, 0, 0.08]}>
              <planeGeometry args={[5.3, 3]} />
              <meshBasicMaterial color="#80DEEA" />
            </mesh>
          </mesh>
          
          {/* Corporate Columns Accent */}
          <mesh position={[-3.2, 1.5, -1]}>
            <boxGeometry args={[0.4, 3, 0.4]} />
            <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.5} />
          </mesh>
          <mesh position={[3.2, 1.5, -1]}>
            <boxGeometry args={[0.4, 3, 0.4]} />
            <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.5} />
          </mesh>
        </group>
      )}
    </group>
  );
}

// Camera Motion Controller based on scroll position
function CameraController({ scrollY }: { scrollY: number }) {
  useFrame((state) => {
    // Reveal zoom-in effect from scroll position
    const targetZ = Math.max(5.5, 9.5 - scrollY * 0.007);
    const targetY = 1.0 + Math.sin(state.clock.getElapsedTime() * 0.2) * 0.15;
    
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
    state.camera.lookAt(0, -0.5, 0);
  });

  return (
    <PerspectiveCamera
      makeDefault
      fov={50}
      position={[0, 1.5, 10]}
      near={0.1}
      far={1000}
    />
  );
}

interface Hero3DCanvasProps {
  theme: string;
  scrollY: number;
}

export default function Hero3DCanvas({ theme, scrollY }: Hero3DCanvasProps) {
  // Determine color theme variables
  const primaryLightColor = theme === 'concert' ? '#F48FB1' : theme === 'wedding' ? '#CBD5E1' : '#80DEEA';
  const secondaryLightColor = theme === 'concert' ? '#B39DDB' : theme === 'wedding' ? '#FFFFFF' : '#7E57C2';

  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsLight(document.documentElement.getAttribute('data-theme') === 'light');
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return (
    <Canvas
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={isLight ? 0.85 : theme === 'wedding' ? 0.6 : 0.3} />
      
      {/* Point Lights representing stage lights */}
      <pointLight position={[-4, 5, 2]} intensity={isLight ? 4.0 : 2.5} color={primaryLightColor} />
      <pointLight position={[4, 5, 2]} intensity={isLight ? 4.0 : 2.5} color={secondaryLightColor} />
      <pointLight position={[0, 6, -2]} intensity={isLight ? 3.0 : 2.0} color={theme === 'wedding' ? '#CBD5E1' : '#FFFFFF'} />
      
      {/* Background Star field - hidden in light mode */}
      {!isLight && <Stars radius={60} depth={40} count={1200} factor={3} saturation={0.5} fade speed={1} />}
      
      {/* Stage Setup */}
      <StageSetup theme={theme} isLight={isLight} />

      {/* Spotlights (Left and Right) */}
      <SpotlightBeam position={[-3.5, 4, -1]} rotationSpeed={0.8} color={primaryLightColor} />
      <SpotlightBeam position={[3.5, 4, -1]} rotationSpeed={0.6} color={secondaryLightColor} />
      {theme === 'concert' && (
        <SpotlightBeam position={[0, 5.5, -2]} rotationSpeed={1.1} color="#ffffff" />
      )}

      {/* Rotating particles floating around the stage */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <group>
          {Array.from({ length: 15 }).map((_, i) => {
            const angle = (i / 15) * Math.PI * 2;
            const x = Math.cos(angle) * (2.8 + Math.random() * 0.8);
            const z = Math.sin(angle) * (2.8 + Math.random() * 0.8);
            const y = Math.random() * 2 - 0.5;
            const size = 0.04 + Math.random() * 0.06;
            
            return (
              <mesh key={i} position={[x, y, z]}>
                <dodecahedronGeometry args={[size]} />
                <meshStandardMaterial
                  color={i % 2 === 0 ? '#E2E8F0' : '#B39DDB'}
                  roughness={0.1}
                  metalness={0.9}
                />
              </mesh>
            );
          })}
        </group>
      </Float>

      {/* Custom Camera Controller */}
      <CameraController scrollY={scrollY} />
    </Canvas>
  );
}
