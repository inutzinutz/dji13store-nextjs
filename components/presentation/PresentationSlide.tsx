'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PresentationSlideProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'hero' | 'dark' | 'accent';
  centered?: boolean;
}

const variantStyles = {
  default: 'bg-background',
  hero: 'bg-gradient-to-br from-secondary via-background to-background',
  dark: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white',
  accent: 'bg-gradient-to-br from-primary/5 via-background to-primary/10',
};

export function PresentationSlide({
  children,
  className = '',
  variant = 'default',
  centered = true,
}: PresentationSlideProps) {
  return (
    <div className={`min-h-screen w-full relative overflow-hidden ${variantStyles[variant]} ${className}`}>
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />
      <div className={`relative z-10 min-h-screen w-full section-container py-20 ${centered ? 'flex flex-col items-center justify-center' : ''}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

export function SlideTitle({
  badge,
  title,
  subtitle,
  description,
}: {
  badge?: string;
  title: string;
  subtitle?: string;
  description?: string;
}) {
  return (
    <div className="text-center max-w-4xl mx-auto">
      {badge && (
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
        >
          {badge}
        </motion.span>
      )}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl text-primary font-medium mb-4"
        >
          {subtitle}
        </motion.p>
      )}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-muted-foreground"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

export function SlideGrid({ children, cols = 3 }: { children: ReactNode; cols?: 2 | 3 | 4 }) {
  const colsClass = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-2 lg:grid-cols-4' };
  return <div className={`grid grid-cols-1 ${colsClass[cols]} gap-6`}>{children}</div>;
}

export function SlideCard({
  icon: Icon,
  title,
  description,
  index = 0,
  color = 'primary',
}: {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  index?: number;
  color?: 'primary' | 'destructive' | 'blue' | 'emerald' | 'violet';
}) {
  const colorStyles = {
    primary: 'bg-primary/10 text-primary',
    destructive: 'bg-destructive/10 text-destructive',
    blue: 'bg-blue-500/10 text-blue-500',
    emerald: 'bg-emerald-500/10 text-emerald-500',
    violet: 'bg-violet-500/10 text-violet-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all"
    >
      {Icon && (
        <div className={`w-12 h-12 rounded-xl ${colorStyles[color]} flex items-center justify-center mb-4`}>
          <Icon className="w-6 h-6" />
        </div>
      )}
      <h3 className="font-bold text-foreground mb-2">{title}</h3>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </motion.div>
  );
}
