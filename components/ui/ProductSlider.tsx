'use client';

import { useRef, useState, useCallback, ReactNode } from 'react';

interface ProductSliderProps {
  children: ReactNode;
  title?: string;
  viewAllHref?: string;
  className?: string;
}

export default function ProductSlider({
  children,
  title,
  viewAllHref,
  className = '',
}: ProductSliderProps) {
  const trackRef  = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX    = useRef(0);
  const scrollLeft = useRef(0);
  const [dragged, setDragged] = useState(false);

  /* Mouse drag */
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (!trackRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = 'grabbing';
    trackRef.current.style.userSelect = 'none';
    setDragged(false);
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x    = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    trackRef.current.scrollLeft = scrollLeft.current - walk;
    if (Math.abs(walk) > 5) setDragged(true);
  }, []);

  const onMouseUp = useCallback(() => {
    if (!trackRef.current) return;
    isDragging.current = false;
    trackRef.current.style.cursor = 'grab';
    trackRef.current.style.userSelect = '';
  }, []);

  /* Touch drag */
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (!trackRef.current) return;
    startX.current = e.touches[0].pageX;
    scrollLeft.current = trackRef.current.scrollLeft;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!trackRef.current) return;
    const walk = (startX.current - e.touches[0].pageX) * 1.2;
    trackRef.current.scrollLeft = scrollLeft.current + walk;
  }, []);

  /* Arrow buttons */
  const scroll = useCallback((dir: 'left' | 'right') => {
    if (!trackRef.current) return;
    const amount = trackRef.current.clientWidth * 0.75;
    trackRef.current.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Header */}
      {(title || viewAllHref) && (
        <div className="flex items-end justify-between mb-4 px-4 sm:px-6 max-w-7xl mx-auto">
          {title && (
            <h2 className="text-xl md:text-2xl font-black text-foreground">{title}</h2>
          )}
          {viewAllHref && (
            <a
              href={viewAllHref}
              className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
            >
              ดูทั้งหมด
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          )}
        </div>
      )}

      {/* Arrow: left */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-card/90 backdrop-blur border border-border shadow-md rounded-full hover:bg-card transition-all opacity-80 hover:opacity-100 mt-4"
        aria-label="Scroll left"
      >
        <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Track */}
      <div
        ref={trackRef}
        className="flex gap-3 overflow-x-auto pb-4 scroll-smooth"
        style={{
          cursor: 'grab',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          paddingLeft: 'max(1rem, calc((100vw - 80rem) / 2 + 1rem))',
          paddingRight: 'max(1rem, calc((100vw - 80rem) / 2 + 1rem))',
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
      >
        {/* Wrap each child with snap alignment */}
        {Array.isArray(children)
          ? (children as ReactNode[]).map((child, i) => (
              <div
                key={i}
                className="flex-shrink-0"
                style={{
                  scrollSnapAlign: 'start',
                  width: 'clamp(220px, 28vw, 300px)',
                  pointerEvents: dragged ? 'none' : 'auto',
                }}
              >
                {child}
              </div>
            ))
          : <div style={{ scrollSnapAlign: 'start' }}>{children}</div>
        }
      </div>

      {/* Arrow: right */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-card/90 backdrop-blur border border-border shadow-md rounded-full hover:bg-card transition-all opacity-80 hover:opacity-100 mt-4"
        aria-label="Scroll right"
      >
        <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
