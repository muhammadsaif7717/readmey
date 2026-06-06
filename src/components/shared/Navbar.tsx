'use client';

import { Menu, X, PanelLeftOpen, PanelLeftClose } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useSidebar } from '../ui/sidebar';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { toggleSidebar, state } = useSidebar();

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Editor', href: '/editor' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'border-b border-amber-900/10 bg-white/95 shadow-sm backdrop-blur-xl dark:border-amber-900/20 dark:bg-zinc-950/95 dark:shadow-[0_1px_40px_rgba(0,0,0,0.4)]'
            : 'border-b border-black/[0.04] bg-slate-50 dark:border-white/[0.04] dark:bg-zinc-950'
        }`}
      >
        {/* Amber top accent bar */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-amber-700/60 via-amber-400 to-amber-700/60" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[60px] items-center justify-between">
            {/* Left — Sidebar trigger + Logo */}
            <div className="flex items-center gap-4">
              {pathname === '/editor' && (
                <button
                  onClick={toggleSidebar}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-black/5 text-zinc-500 transition-all hover:border-black/10 hover:bg-black/5 hover:text-zinc-800 dark:border-amber-500/20 dark:hover:border-amber-500/50 dark:hover:bg-amber-500/8 dark:hover:text-amber-400"
                  aria-label="Toggle Sidebar"
                >
                  {state === 'expanded' ? (
                    <PanelLeftClose size={16} />
                  ) : (
                    <PanelLeftOpen size={16} />
                  )}
                </button>
              )}

              <Link href="/" className="group flex items-center gap-2.5">
                {/* Logo text */}
                <div className="hidden flex-col sm:flex" style={{ gap: '1px' }}>
                  <span className="font-syne text-[17px] leading-none font-extrabold tracking-tight text-zinc-900 dark:text-amber-50">
                    EasyReadme
                  </span>
                  <span className="font-mono text-[9px] font-medium tracking-[0.14em] text-amber-500 uppercase">
                    Pro Builder
                  </span>
                </div>

                {/* Mobile logo text */}
                <span className="font-syne text-[16px] font-extrabold tracking-tight text-zinc-900 sm:hidden dark:text-amber-50">
                  EasyReadme
                </span>
              </Link>
            </div>

            {/* Right — Nav links + theme toggle + CTA */}
            <div className="hidden items-center gap-1 md:flex">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative rounded-md px-3.5 py-1.5 text-[13px] font-semibold tracking-wide transition-colors duration-150 ${
                    pathname === item.href
                      ? 'text-amber-500 dark:text-amber-400'
                      : 'text-zinc-600 hover:bg-black/[0.04] hover:text-zinc-900 dark:text-zinc-500 dark:hover:bg-white/[0.04] dark:hover:text-zinc-100'
                  }`}
                >
                  {item.label}
                  {pathname === item.href && (
                    <span className="absolute inset-x-3.5 -bottom-[1px] h-[2px] rounded-full bg-amber-400" />
                  )}
                </Link>
              ))}

              {/* Divider */}
              <div className="mx-2 h-5 w-px bg-black/[0.08] dark:bg-white/[0.08]" />

              <ThemeToggle />
            </div>

            {/* Mobile hamburger */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-black/[0.07] text-zinc-500 transition-colors hover:border-black/20 hover:text-zinc-800 dark:border-white/[0.07] dark:text-zinc-400 dark:hover:border-amber-500/30 dark:hover:text-amber-400"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={mobileMenuOpen ? 'close' : 'open'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-[60px] z-30 bg-white/60 backdrop-blur-sm md:hidden dark:bg-black/60"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="fixed inset-x-0 top-[60px] z-40 border-b border-black/[0.06] bg-slate-50 px-5 py-4 md:hidden dark:border-white/[0.06] dark:bg-zinc-950"
            >
              <div className="flex flex-col gap-1">
                {menuItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center rounded-lg px-3 py-2.5 text-base font-semibold transition-colors ${
                        pathname === item.href
                          ? 'bg-amber-500/10 text-amber-500 dark:text-amber-400'
                          : 'text-zinc-600 hover:bg-black/[0.04] hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/[0.04] dark:hover:text-zinc-100'
                      }`}
                    >
                      {pathname === item.href && (
                        <span className="mr-2.5 h-1.5 w-1.5 rounded-full bg-amber-400" />
                      )}
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: menuItems.length * 0.04, duration: 0.2 }}
                  className="mt-2 flex items-center justify-between border-t border-black/[0.06] px-3 pt-3 dark:border-white/[0.06]"
                >
                  <span className="text-sm font-semibold text-zinc-500">
                    Theme
                  </span>
                  <ThemeToggle />
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-[60px]" />
    </>
  );
};

export default Navbar;
