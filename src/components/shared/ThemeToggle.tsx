'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative flex h-8 w-14 items-center rounded-full border border-black/5 bg-slate-100 p-1 transition-colors hover:bg-slate-200 focus:ring-2 focus:ring-amber-500/50 focus:outline-none dark:border-white/[0.05] dark:bg-zinc-800/80 dark:hover:bg-zinc-800"
      aria-label="Toggle theme"
    >
      {/* Background icons for purely aesthetic reasons (optional, but looks nice) */}
      <div className="pointer-events-none absolute inset-x-0 flex items-center justify-between px-1.5">
        <Sun
          size={12}
          className="text-amber-400 opacity-60 transition-opacity dark:opacity-0"
        />
        <Moon
          size={12}
          className="text-zinc-400 opacity-0 transition-opacity dark:opacity-60"
        />
      </div>

      <motion.div
        className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full border border-black/5 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900"
        animate={{ x: isDark ? 24 : 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {isDark ? (
          <Moon size={13} className="text-zinc-300" />
        ) : (
          <Sun size={13} className="text-amber-500" />
        )}
      </motion.div>
    </button>
  );
}
