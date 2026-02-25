'use client';

import { motion } from 'framer-motion';

interface DroneIconProps {
  className?: string;
  animate?: boolean;
}

export function DroneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="currentColor">
      <ellipse cx="32" cy="32" rx="8" ry="4" />
      <circle cx="32" cy="34" r="2" />
      <rect x="12" y="30" width="16" height="3" rx="1.5" />
      <rect x="36" y="30" width="16" height="3" rx="1.5" />
      <rect x="30" y="18" width="3" height="12" rx="1.5" />
      <rect x="30" y="34" width="3" height="12" rx="1.5" />
      <ellipse cx="12" cy="20" rx="6" ry="2" />
      <ellipse cx="52" cy="20" rx="6" ry="2" />
      <ellipse cx="12" cy="44" rx="6" ry="2" />
      <ellipse cx="52" cy="44" rx="6" ry="2" />
      <circle cx="12" cy="20" r="2.5" />
      <circle cx="52" cy="20" r="2.5" />
      <circle cx="12" cy="44" r="2.5" />
      <circle cx="52" cy="44" r="2.5" />
    </svg>
  );
}

export function AnimatedDroneIcon({ className, animate = true }: DroneIconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="currentColor">
      <ellipse cx="32" cy="32" rx="8" ry="4" />
      <circle cx="32" cy="34" r="2" />
      <rect x="12" y="30" width="16" height="3" rx="1.5" />
      <rect x="36" y="30" width="16" height="3" rx="1.5" />
      <rect x="30" y="18" width="3" height="12" rx="1.5" />
      <rect x="30" y="34" width="3" height="12" rx="1.5" />
      {[
        { cx: 12, cy: 20 },
        { cx: 52, cy: 20 },
        { cx: 12, cy: 44 },
        { cx: 52, cy: 44 },
      ].map((p, i) => (
        <motion.ellipse
          key={i}
          cx={p.cx} cy={p.cy} rx="6" ry="2"
          animate={animate ? { rotate: 360 } : {}}
          transition={{ duration: 0.3, repeat: Infinity, ease: 'linear' }}
          style={{ originX: `${p.cx}px`, originY: `${p.cy}px` }}
        />
      ))}
      <circle cx="12" cy="20" r="2.5" />
      <circle cx="52" cy="20" r="2.5" />
      <circle cx="12" cy="44" r="2.5" />
      <circle cx="52" cy="44" r="2.5" />
    </svg>
  );
}

interface FlyingDroneProps {
  className?: string;
  pathX?: number[];
  pathY?: number[];
  rotation?: number[];
  duration?: number;
  delay?: number;
  isAnimating?: boolean;
  color?: string;
}

export function FlyingDrone({
  className = 'w-10 h-10',
  pathX = [0, 100, 200, 100, 0],
  pathY = [0, 30, 10, 50, 0],
  rotation = [0, 5, -5, 8, 0],
  duration = 12,
  delay = 0,
  isAnimating = true,
  color = 'text-primary',
}: FlyingDroneProps) {
  return (
    <motion.div
      className={`absolute z-10 opacity-60 ${color}`}
      animate={isAnimating ? { x: pathX, y: pathY, rotate: rotation } : {}}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <DroneIcon className={`${className} drop-shadow-md`} />
    </motion.div>
  );
}
