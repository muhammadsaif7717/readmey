'use client';

import { useState, useCallback } from 'react';
import Editor from '@/components/root/Editor';
import Preview from '@/components/root/Preview';
import { FileEdit, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Page() {
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [desktopSplit, setDesktopSplit] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    setIsDragging(true);

    const handleMove = (moveEvent: PointerEvent) => {
      const newSplit = (moveEvent.clientX / window.innerWidth) * 100;
      setDesktopSplit(Math.max(25, Math.min(75, newSplit)));
    };

    const handleUp = () => {
      setIsDragging(false);
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
  }, []);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-slate-50 dark:bg-[#0a0a0b]">
      {/* ── Mobile / Tablet ─────────────────────────────────────── */}
      <div className="flex h-full flex-1 flex-col overflow-hidden lg:hidden">
        {/* Tab bar */}
        <div className="sticky top-0 z-10 flex items-center gap-0 border-b border-slate-200 bg-white px-3 py-2 dark:border-[#1f1f20] dark:bg-[#0d0d0e]">
          {(['editor', 'preview'] as const).map((tab) => {
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative flex flex-1 items-center justify-center gap-2 py-2 text-sm font-medium transition-colors ${active ? 'text-amber-600 dark:text-[#c8a84b]' : 'text-zinc-500 dark:text-[#555558]'}`}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {tab === 'editor' ? <FileEdit size={14} /> : <Eye size={14} />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {active && (
                  <motion.div
                    layoutId="mobile-tab-indicator"
                    className="absolute right-0 bottom-0 left-0 h-[2px] bg-amber-500 dark:bg-[#c8a84b]"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div className="relative flex-1 overflow-hidden">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={activeTab}
              initial={{ x: activeTab === 'editor' ? -24 : 24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: activeTab === 'editor' ? 24 : -24, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="absolute inset-0 h-full w-full"
            >
              {activeTab === 'editor' ? <Editor /> : <Preview />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Desktop split view ──────────────────────────────────── */}
      <div className="relative hidden h-full w-full flex-1 overflow-hidden lg:flex">
        {/* Editor panel */}
        <div
          className="relative flex h-full flex-col overflow-hidden border-r border-slate-200 dark:border-[#1f1f20]"
          style={{
            width: `${desktopSplit}%`,
            transition: isDragging ? 'none' : 'width 0.05s ease',
          }}
        >
          {/* Panel label */}
          <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-2 dark:border-[#1f1f20] dark:bg-[#0d0d0e]">
            <FileEdit
              size={12}
              className="text-amber-500 dark:text-[#c8a84b]"
            />
            <span
              className="text-xs tracking-widest text-amber-600 uppercase dark:text-[#c8a84b]"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: '0.12em',
              }}
            >
              Editor
            </span>
          </div>
          <Editor />
        </div>

        {/* Drag handle */}
        <div
          className="absolute top-0 bottom-0 z-20 flex w-5 cursor-col-resize items-center justify-center select-none"
          style={{ left: `calc(${desktopSplit}% - 10px)` }}
          onPointerDown={handlePointerDown}
        >
          <div
            className={`flex h-16 w-[3px] flex-col items-center justify-center gap-[3px] rounded-full bg-amber-400 transition-all duration-150 dark:bg-[#c8a84b] ${isDragging ? 'shadow-[0_0_12px_rgba(200,168,75,0.4)]' : ''}`}
          >
            {/* grip dots */}
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[3px] w-[3px] rounded-full bg-white dark:bg-[#444448]"
              />
            ))}
          </div>
        </div>

        {/* Preview panel */}
        <div
          className="relative flex h-full flex-col overflow-hidden"
          style={{
            width: `${100 - desktopSplit}%`,
            transition: isDragging ? 'none' : 'width 0.05s ease',
          }}
        >
          <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-2 dark:border-[#1f1f20] dark:bg-[#0d0d0e]">
            <Eye size={12} className="text-zinc-500 dark:text-[#555558]" />
            <span
              className="text-xs tracking-widest text-zinc-600 uppercase dark:text-[#555558]"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: '0.12em',
              }}
            >
              Preview
            </span>
          </div>
          <Preview />
        </div>
      </div>
    </div>
  );
}
