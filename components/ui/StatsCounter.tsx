'use client';

import { useEffect, useRef, useState } from 'react';

export interface StatItem {
  value: number;
  suffix?: string;
  label: string;
}

interface StatsCounterProps {
  stats: StatItem[];
  className?: string;
}

function useCountUp(target: number, duration = 1800, started: boolean) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    function step(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    }
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, started]);

  return count;
}

function StatCard({ stat, started }: { stat: StatItem; started: boolean }) {
  const count = useCountUp(stat.value, 1800, started);
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <span className="text-4xl md:text-5xl font-black text-white tabular-nums">
        {count.toLocaleString('th-TH')}{stat.suffix ?? ''}
      </span>
      <span className="text-white/50 text-sm font-medium tracking-wide uppercase">
        {stat.label}
      </span>
    </div>
  );
}

export default function StatsCounter({ stats, className = '' }: StatsCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 ${className}`}
    >
      {stats.map((stat, i) => (
        <StatCard key={i} stat={stat} started={started} />
      ))}
    </div>
  );
}
