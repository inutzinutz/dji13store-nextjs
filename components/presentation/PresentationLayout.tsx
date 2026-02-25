'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, ReactNode } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export interface PresentationSection {
  id: string;
  content: ReactNode;
}

interface PresentationLayoutProps {
  sections: PresentationSection[];
  showNavDots?: boolean;
  showArrows?: boolean;
}

export function PresentationLayout({
  sections,
  showNavDots = true,
  showArrows = true,
}: PresentationLayoutProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);

  const goToSection = (index: number) => {
    if (index >= 0 && index < sections.length && !isScrolling) {
      setIsScrolling(true);
      setCurrentIndex(index);
      setTimeout(() => setIsScrolling(false), 800);
    }
  };

  const goNext = () => goToSection(currentIndex + 1);
  const goPrev = () => goToSection(currentIndex - 1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); goNext(); }
      else if (e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); goPrev(); }
      else if (e.key === 'Home') { e.preventDefault(); goToSection(0); }
      else if (e.key === 'End') { e.preventDefault(); goToSection(sections.length - 1); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 50) goNext();
      else if (e.deltaY < -50) goPrev();
    };
    const container = containerRef.current;
    container?.addEventListener('wheel', handleWheel, { passive: false });
    return () => { container?.removeEventListener('wheel', handleWheel); };
  });

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
    const handleTouchEnd = (e: TouchEvent) => {
      const diff = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 50) { diff > 0 ? goNext() : goPrev(); }
    };
    const container = containerRef.current;
    container?.addEventListener('touchstart', handleTouchStart);
    container?.addEventListener('touchend', handleTouchEnd);
    return () => {
      container?.removeEventListener('touchstart', handleTouchStart);
      container?.removeEventListener('touchend', handleTouchEnd);
    };
  });

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-background -mt-16 md:-mt-20">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full"
        >
          <div className="h-full w-full overflow-y-auto">
            {sections[currentIndex].content}
          </div>
        </motion.div>
      </AnimatePresence>

      {showNavDots && (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
          {sections.map((section, index) => (
            <motion.button
              key={section.id}
              onClick={() => goToSection(index)}
              className="group relative flex items-center justify-end"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary border-primary scale-125'
                    : 'bg-transparent border-muted-foreground/50 hover:border-primary'
                }`}
                animate={index === currentIndex ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="absolute right-6 px-2 py-1 rounded bg-card text-xs text-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border shadow-lg">
                {index + 1} / {sections.length}
              </span>
            </motion.button>
          ))}
        </div>
      )}

      {showArrows && (
        <>
          <motion.button
            onClick={goPrev}
            className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 p-3 rounded-full bg-card/80 backdrop-blur-sm border border-border shadow-lg transition-all ${
              currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-primary hover:text-primary-foreground'
            }`}
            disabled={currentIndex === 0}
            whileHover={currentIndex > 0 ? { scale: 1.1 } : {}}
            whileTap={currentIndex > 0 ? { scale: 0.9 } : {}}
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
          <motion.button
            onClick={goNext}
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 p-3 rounded-full bg-card/80 backdrop-blur-sm border border-border shadow-lg transition-all ${
              currentIndex === sections.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-primary hover:text-primary-foreground'
            }`}
            disabled={currentIndex === sections.length - 1}
            whileHover={currentIndex < sections.length - 1 ? { scale: 1.1, y: 3 } : {}}
            whileTap={currentIndex < sections.length - 1 ? { scale: 0.9 } : {}}
            animate={currentIndex < sections.length - 1 ? { y: [0, 5, 0] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.button>
        </>
      )}

      <div className="fixed bottom-0 left-0 right-0 h-1 bg-border z-50">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / sections.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="fixed bottom-4 right-6 z-50 text-sm text-muted-foreground">
        <span className="font-bold text-foreground">{currentIndex + 1}</span>
        <span> / {sections.length}</span>
      </div>
    </div>
  );
}
