'use client';

import { useEffect, useRef, ReactNode } from 'react';

type Direction = 'up' | 'left' | 'right' | 'scale';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;  // ms
  className?: string;
  threshold?: number; // 0-1
  once?: boolean;
}

const directionClass: Record<Direction, string> = {
  up:    'reveal',
  left:  'reveal-left',
  right: 'reveal-right',
  scale: 'reveal-scale',
};

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  threshold = 0.15,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const cls = directionClass[direction];
    el.classList.add(cls);
    if (delay) el.style.transitionDelay = `${delay}ms`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('revealed');
            if (once) observer.unobserve(el);
          } else if (!once) {
            el.classList.remove('revealed');
          }
        });
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [direction, delay, threshold, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
