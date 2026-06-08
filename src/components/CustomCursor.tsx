'use client';

import { useEffect, useRef, useState } from 'react';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(true);
  const [linkHovered, setLinkHovered] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  // Coordinate references for lerp (linear interpolation) smoothing
  const mouseCoords = useRef({ x: 0, y: 0 });
  const ringCoords = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseCoords.current = { x: clientX, y: clientY };
      
      // Position central dot immediately
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`;
      }
      setHidden(false);
    };

    // Smooth trailing ring loop using requestAnimationFrame
    let animationFrameId: number;
    const updateRing = () => {
      const lerpAmount = 0.12; // Controls trailing lag
      
      // Calculate current interpolation step
      ringCoords.current.x += (mouseCoords.current.x - ringCoords.current.x) * lerpAmount;
      ringCoords.current.y += (mouseCoords.current.y - ringCoords.current.y) * lerpAmount;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringCoords.current.x}px, ${ringCoords.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(updateRing);
    };
    animationFrameId = requestAnimationFrame(updateRing);

    // Click Ripple Trigger
    const onMouseDown = (e: MouseEvent) => {
      const newRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev, newRipple]);
    };

    const handleMouseEnter = () => setLinkHovered(true);
    const handleMouseLeave = () => setLinkHovered(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);

    // Track all interactive elements for cursor scale effect
    const updateClickables = () => {
      const targets = document.querySelectorAll('a, button, select, input, textarea, [role="button"], .clickable');
      targets.forEach((element) => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    updateClickables();
    const clickableTimer = setInterval(updateClickables, 1000);

    // Cleanup old ripples every 500ms
    const rippleTimer = setInterval(() => {
      setRipples((prev) => prev.filter((r) => Date.now() - r.id < 550));
    }, 100);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      cancelAnimationFrame(animationFrameId);
      clearInterval(clickableTimer);
      clearInterval(rippleTimer);
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      {/* Inner Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          backgroundColor: linkHovered ? '#ffffff' : 'var(--purple)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          transform: 'translate(-50%, -50%)',
          transition: 'background-color 0.2s',
        }}
      />
      {/* Outer Morphing Fluid Ring */}
      <div
        ref={ringRef}
        className="morphing-blob"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: linkHovered ? '50px' : '32px',
          height: linkHovered ? '50px' : '32px',
          border: `1.5px dashed ${linkHovered ? 'var(--magenta)' : 'var(--purple)'}`,
          backgroundColor: linkHovered ? 'rgba(244, 143, 177, 0.12)' : 'rgba(179, 157, 219, 0.04)',
          boxShadow: linkHovered ? '0 0 15px var(--magenta-glow)' : 'none',
          pointerEvents: 'none',
          zIndex: 99998,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.3s, height 0.3s, border-color 0.3s, background-color 0.3s, box-shadow 0.3s',
        }}
      />
      {/* Concentric click ripples */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="click-ripple"
          style={{
            position: 'fixed',
            left: ripple.x,
            top: ripple.y,
            border: '2px solid var(--purple)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 99997,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </>
  );
}
