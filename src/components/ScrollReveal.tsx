'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  scale?: number;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.8,
  scale = 1,
}: ScrollRevealProps) {
  const directions = {
    up: { y: 35, x: 0 },
    down: { y: -35, x: 0 },
    left: { y: 0, x: 35 },
    right: { y: 0, x: -35 },
    none: { y: 0, x: 0 },
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: directions[direction].y,
        x: directions[direction].x,
        scale: scale,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
      }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1], // Luxury cubic-bezier curve
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.08,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  direction = 'up',
  scale = 1,
}: {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  scale?: number;
}) {
  const directions = {
    up: { y: 25, x: 0 },
    down: { y: -25, x: 0 },
    left: { y: 0, x: 25 },
    right: { y: 0, x: -25 },
    none: { y: 0, x: 0 },
  };

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: directions[direction].y,
          x: directions[direction].x,
          scale: scale,
        },
        show: {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          transition: {
            ease: [0.16, 1, 0.3, 1],
            duration: 0.7,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
