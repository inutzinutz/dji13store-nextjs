'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    setIsTransitioning(true);
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    document.documentElement.style.setProperty('--theme-transition', '0.5s');
    document.body.classList.add('theme-transitioning');

    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }

    setTimeout(() => {
      document.body.classList.remove('theme-transitioning');
      document.documentElement.style.removeProperty('--theme-transition');
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-lg bg-secondary hover:bg-accent border border-border flex items-center justify-center overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 3, opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`absolute w-10 h-10 rounded-full ${isDark ? 'bg-blue-500' : 'bg-amber'}`}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isTransitioning &&
          [...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
              animate={{
                scale: [0, 1, 0],
                opacity: [1, 1, 0],
                x: Math.cos((i * 60 * Math.PI) / 180) * 25,
                y: Math.sin((i * 60 * Math.PI) / 180) * 25,
              }}
              transition={{ duration: 0.5, delay: i * 0.03 }}
              className="absolute"
            >
              <Sparkles className={`w-2 h-2 ${isDark ? 'text-blue-400' : 'text-amber'}`} />
            </motion.div>
          ))}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0, scale: isDark ? 0 : 1, opacity: isDark ? 0 : 1 }}
        transition={{ duration: 0.4, type: 'spring', stiffness: 200, damping: 15 }}
        className="absolute"
      >
        <Sun className="w-5 h-5 text-primary" />
      </motion.div>

      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : -180, scale: isDark ? 1 : 0, opacity: isDark ? 1 : 0 }}
        transition={{ duration: 0.4, type: 'spring', stiffness: 200, damping: 15 }}
        className="absolute"
      >
        <Moon className="w-5 h-5 text-primary" />
      </motion.div>
    </motion.button>
  );
}
