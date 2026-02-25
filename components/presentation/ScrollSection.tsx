'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollSectionProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'hero' | 'dark' | 'accent';
  id?: string;
}

const variantStyles = {
  default: 'bg-background',
  hero: 'bg-gradient-to-br from-secondary via-background to-background',
  dark: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white',
  accent: 'bg-gradient-to-br from-primary/5 via-background to-primary/10',
};

export function ScrollSection({
  children,
  className = '',
  variant = 'default',
  id,
}: ScrollSectionProps) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden py-16 md:py-24 ${variantStyles[variant]} ${className}`}
    >
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />
      <div className="relative z-10 section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
