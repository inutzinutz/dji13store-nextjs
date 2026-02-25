'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  href: string;
}

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, [slides.length]);

  const prev = () => {
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next, paused, slides.length]);

  if (!slides.length) return null;

  const slide = slides[current];

  return (
    <div
      className="relative w-full overflow-hidden bg-black"
      style={{ aspectRatio: '16/7' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        </div>
      ))}

      {/* Text overlay */}
      <div className="absolute inset-0 z-20 flex items-end pb-12 md:pb-16 px-8 md:px-16 max-w-2xl">
        <div>
          <h2
            className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-2 drop-shadow-lg"
            dangerouslySetInnerHTML={{ __html: slide.title }}
          />
          {slide.excerpt && (
            <p
              className="text-white/80 text-sm md:text-base max-w-md leading-relaxed hidden md:block"
              dangerouslySetInnerHTML={{ __html: slide.excerpt.replace(/<[^>]*>/g, '').slice(0, 120) }}
            />
          )}
        </div>
      </div>

      {/* Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 md:w-11 md:h-11 bg-black/30 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors"
            aria-label="ก่อนหน้า"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 md:w-11 md:h-11 bg-black/30 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors"
            aria-label="ถัดไป"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-5 h-1.5 bg-white'
                  : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`สไลด์ ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
