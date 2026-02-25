'use client';

import { useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

/* ─── Particle canvas ──────────────────────────────────────────── */
interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number; alpha: number;
  baseAlpha: number;
}

function initCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!;
  const W = canvas.offsetWidth;
  const H = canvas.offsetHeight;
  canvas.width  = W * devicePixelRatio;
  canvas.height = H * devicePixelRatio;
  ctx.scale(devicePixelRatio, devicePixelRatio);

  const count = Math.floor((W * H) / 9000);
  const particles: Particle[] = Array.from({ length: count }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    r: Math.random() * 1.8 + 0.5,
    alpha: Math.random() * 0.5 + 0.2,
    baseAlpha: Math.random() * 0.5 + 0.2,
  }));

  let raf = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H);

    // draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(234,171,0,${(1 - dist / 110) * 0.12})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // draw dots
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      p.alpha = p.baseAlpha + Math.sin(Date.now() / 2000 + p.x) * 0.15;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(234,171,0,${p.alpha})`;
      ctx.fill();
    });

    raf = requestAnimationFrame(draw);
  }
  draw();
  return () => cancelAnimationFrame(raf);
}

/* ─── Drone SVG ──────────────────────────────────────────────── */
function DroneSVG({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Propeller arms */}
      <line x1="40" y1="40" x2="10" y2="20"  stroke="#eaab00" strokeWidth="2" strokeLinecap="round" />
      <line x1="40" y1="40" x2="10" y2="60"  stroke="#eaab00" strokeWidth="2" strokeLinecap="round" />
      <line x1="160" y1="40" x2="190" y2="20" stroke="#eaab00" strokeWidth="2" strokeLinecap="round" />
      <line x1="160" y1="40" x2="190" y2="60" stroke="#eaab00" strokeWidth="2" strokeLinecap="round" />
      {/* Center body */}
      <rect x="60" y="30" width="80" height="20" rx="6" fill="#1a1a1a" />
      <rect x="88" y="26" width="24" height="8"  rx="4" fill="#eaab00" />
      {/* Camera */}
      <circle cx="100" cy="52" r="5" fill="#333" />
      <circle cx="100" cy="52" r="2.5" fill="#eaab00" opacity="0.8" />
      {/* Propellers — top-left */}
      <ellipse cx="10" cy="20" rx="14" ry="4" fill="white" opacity="0.15"
        style={{ transformOrigin: '10px 20px', animation: 'propeller .35s linear infinite' }} />
      {/* top-right */}
      <ellipse cx="190" cy="20" rx="14" ry="4" fill="white" opacity="0.15"
        style={{ transformOrigin: '190px 20px', animation: 'propeller .3s linear infinite reverse' }} />
      {/* bottom-left */}
      <ellipse cx="10" cy="60" rx="14" ry="4" fill="white" opacity="0.15"
        style={{ transformOrigin: '10px 60px', animation: 'propeller .32s linear infinite reverse' }} />
      {/* bottom-right */}
      <ellipse cx="190" cy="60" rx="14" ry="4" fill="white" opacity="0.15"
        style={{ transformOrigin: '190px 60px', animation: 'propeller .28s linear infinite' }} />
      {/* LED blink */}
      <circle cx="100" cy="38" r="2" fill="#00ff88" opacity="0.9" />
    </svg>
  );
}

/* ─── Component ────────────────────────────────────────────────── */
export interface HeroSlide {
  id: number;
  title: string;
  excerpt?: string;
  href: string;
}

interface HeroParticleProps {
  slides?: HeroSlide[];
  /** Fallback tagline when no slides available */
  tagline?: string;
}

export default function HeroParticle({ slides = [], tagline }: HeroParticleProps) {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const droneRef    = useRef<HTMLDivElement>(null);
  const droneFlying = useRef(false);
  const current     = slides[0]; // show first slide text

  /* particle canvas */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cleanup = initCanvas(canvas);
    const ro = new ResizeObserver(() => initCanvas(canvas));
    ro.observe(canvas.parentElement!);
    return () => { cleanup(); ro.disconnect(); };
  }, []);

  /* drone fly-across trigger */
  const launchDrone = useCallback(() => {
    const el = droneRef.current;
    if (!el || droneFlying.current) return;
    droneFlying.current = true;
    el.style.animation = 'none';
    el.style.opacity   = '0';
    // Reflow
    void el.offsetWidth;
    el.style.animation = 'drone-fly 7s var(--ease-out-expo) forwards';
    el.addEventListener('animationend', () => {
      droneFlying.current = false;
      el.style.opacity = '0';
    }, { once: true });
  }, []);

  useEffect(() => {
    // first launch after 1.5s
    const t1 = setTimeout(launchDrone, 1500);
    // repeat every 14s
    const t2 = setInterval(launchDrone, 14000);
    return () => { clearTimeout(t1); clearInterval(t2); };
  }, [launchDrone]);

  return (
    <section
      className="relative w-full overflow-hidden bg-[hsl(222,47%,15%)] flex items-center"
      style={{ minHeight: 'clamp(480px, 80vh, 760px)' }}
      aria-label="Hero banner"
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Radial glow center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(234,171,0,0.07) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Drone */}
      <div
        ref={droneRef}
        className="absolute pointer-events-none"
        style={{
          top: '38%',
          left: 0,
          width: 'clamp(100px, 12vw, 200px)',
          opacity: 0,
          zIndex: 10,
        }}
        aria-hidden="true"
      >
        <DroneSVG className="w-full h-auto drop-shadow-[0_0_12px_rgba(234,171,0,0.6)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 py-20 md:py-28">
        <div className="max-w-2xl">
          {/* Label */}
          <div
            className="section-label mb-5"
            style={{ animation: 'fade-up .6s var(--ease-out-expo) .1s both' }}
          >
            <span className="inline-block w-6 h-px bg-primary" />
            ตัวแทนจำหน่าย DJI อย่างเป็นทางการ
          </div>

          {/* Headline */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight mb-5"
            style={{ animation: 'fade-up .7s var(--ease-out-expo) .2s both' }}
          >
            {current ? (
              <span
                dangerouslySetInnerHTML={{ __html: current.title }}
              />
            ) : (
              <>
                DJI<span className="text-primary">13</span>Store
              </>
            )}
          </h1>

          {/* Sub */}
          {(current?.excerpt || tagline) && (
            <p
              className="text-white/60 text-base md:text-lg leading-relaxed mb-8 max-w-lg"
              style={{ animation: 'fade-up .7s var(--ease-out-expo) .35s both' }}
              dangerouslySetInnerHTML={{
                __html: current?.excerpt
                  ? current.excerpt.replace(/<[^>]*>/g, '').slice(0, 120)
                  : (tagline ?? ''),
              }}
            />
          )}

          {/* CTA row */}
          <div
            className="flex flex-wrap gap-3"
            style={{ animation: 'fade-up .7s var(--ease-out-expo) .5s both' }}
          >
            <Link
              href={current?.href ?? '/products'}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-7 py-3 text-sm tracking-wide transition-colors"
            >
              ดูสินค้าทั้งหมด
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              href="https://line.me/ti/p/~@dji13store"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/20 text-white/80 hover:border-white hover:text-white font-semibold px-7 py-3 text-sm transition-colors"
            >
              LINE: @dji13store
            </a>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, hsl(var(--background)))' }}
        aria-hidden="true"
      />
    </section>
  );
}
