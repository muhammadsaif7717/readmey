'use client';

import { useReadme } from '@/providers/ReadmeProvider';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';
import {
  Copy,
  Download,
  Eye,
  Code,
  RefreshCw,
  Github,
  ChevronDown,
  Check,
} from 'lucide-react';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { ViewMode } from '@/types';

// ─── Download helper ─────────────────────────────────────────────────────────

function downloadFile(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Markdown renderer styles ─────────────────────────────────────────────────

const mdClass = [
  '[&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:pb-2',
  '[&_h1]:border-b [&_h1]:border-slate-200 dark:[&_h1]:border-[#2a2a2c] [&_h1]:text-zinc-900 dark:[&_h1]:text-[#e8e8e6]',
  '[&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mb-3 [&_h2]:mt-6 [&_h2]:text-zinc-800 dark:[&_h2]:text-[#e0e0dc]',
  '[&_h3]:text-base [&_h3]:font-semibold [&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:text-zinc-800 dark:[&_h3]:text-[#d4d4d0]',
  '[&_p]:text-zinc-600 dark:[&_p]:text-[#aaaaaa] [&_p]:leading-relaxed [&_p]:mb-3',
  '[&_a]:text-amber-600 dark:[&_a]:text-[#c8a84b] [&_a]:underline [&_a]:underline-offset-2',
  '[&_code]:bg-slate-100 dark:[&_code]:bg-[#1a1a1b] [&_code]:text-amber-600 dark:[&_code]:text-[#c8a84b] [&_code]:px-1.5 [&_code]:py-0.5',
  '[&_code]:rounded [&_code]:text-xs [&_code]:font-mono',
  '[&_pre]:bg-slate-50 dark:[&_pre]:bg-[#111110] [&_pre]:border [&_pre]:border-slate-200 dark:[&_pre]:border-[#2a2a2c] [&_pre]:rounded-lg',
  '[&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:mb-4',
  '[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-zinc-700 dark:[&_pre_code]:text-[#c8c8c4]',
  '[&_blockquote]:border-l-2 [&_blockquote]:border-amber-500 dark:[&_blockquote]:border-[#c8a84b] [&_blockquote]:pl-4',
  '[&_blockquote]:text-zinc-500 dark:[&_blockquote]:text-[#777774] [&_blockquote]:italic [&_blockquote]:my-3',
  '[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_ul]:text-zinc-600 dark:[&_ul]:text-[#aaaaaa]',
  '[&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3 [&_ol]:text-zinc-600 dark:[&_ol]:text-[#aaaaaa]',
  '[&_li]:mb-1',
  '[&_hr]:border-slate-200 dark:[&_hr]:border-[#2a2a2c] [&_hr]:my-6',
  '[&_table]:w-full [&_table]:border-collapse [&_table]:mb-4',
  '[&_th]:border [&_th]:border-slate-200 dark:[&_th]:border-[#2a2a2c] [&_th]:px-3 [&_th]:py-2',
  '[&_th]:bg-slate-50 dark:[&_th]:bg-[#111110] [&_th]:text-left [&_th]:text-xs [&_th]:uppercase',
  '[&_th]:tracking-wider [&_th]:text-amber-600 dark:[&_th]:text-[#c8a84b]',
  '[&_td]:border [&_td]:border-slate-200 dark:[&_td]:border-[#1f1f20] [&_td]:px-3 [&_td]:py-2 [&_td]:text-zinc-600 dark:[&_td]:text-[#aaaaaa]',
  '[&_img]:rounded-lg [&_img]:max-w-full',
].join(' ');

// ─── Preview ──────────────────────────────────────────────────────────────────

/**
 * Preview component that dynamically renders the Markdown content based on the
 * current blocks in the ReadmeProvider. Supports "preview" (rendered HTML)
 * and "raw" (Markdown code) modes, along with clipboard copy and file download.
 */
export default function Preview() {
  const { markdown } = useReadme() as { markdown: string };
  const [viewMode, setViewMode] = useState<ViewMode>('preview');
  const [copied, setCopied] = useState(false);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const downloadRef = useRef<HTMLDivElement>(null);

  const isEmpty = !markdown || markdown.trim() === '';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (filename: string) => {
    downloadFile(markdown, filename);
    setShowDownloadMenu(false);
  };

  return (
    <div className="flex h-full flex-col overflow-hidden bg-white dark:bg-[#0a0a0b]">
      {/* ── Toolbar ──────────────────────────────────────────────── */}
      <div className="flex h-11 shrink-0 items-center gap-2 border-b border-slate-200 bg-slate-50 px-3 py-0 dark:border-[#1f1f20] dark:bg-[#0d0d0e]">
        {/* View mode toggle */}
        <div className="flex items-center gap-0.5 rounded-md border border-slate-200 bg-white p-0.5 dark:border-[#2a2a2c] dark:bg-[#111110]">
          {(['preview', 'raw'] as ViewMode[]).map((mode) => {
            const active = viewMode === mode;
            return (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs transition-all duration-150 ${
                  active
                    ? 'bg-slate-100 text-amber-600 dark:bg-[#1f1f20] dark:text-[#c8a84b]'
                    : 'bg-transparent text-zinc-500 dark:text-[#555558]'
                }`}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {mode === 'preview' ? <Eye size={11} /> : <Code size={11} />}
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            );
          })}
        </div>

        <div className="flex-1" />

        {/* Copy */}
        <button
          onClick={handleCopy}
          disabled={isEmpty}
          className={`group flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs transition-all duration-150 hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-30 dark:border-[#2a2a2c] dark:bg-[#111110] dark:hover:border-[#3a3a3c] ${
            copied
              ? 'text-amber-600 dark:text-[#c8a84b]'
              : 'text-zinc-500 dark:text-[#555558]'
          }`}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {copied ? <Check size={11} /> : <Copy size={11} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>

        {/* Download menu */}
        <div className="relative" ref={downloadRef}>
          <button
            onClick={() => setShowDownloadMenu((v) => !v)}
            disabled={isEmpty}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-30 ${
              isEmpty
                ? 'bg-slate-100 text-zinc-400 dark:bg-[#1a1a1b] dark:text-[#555558]'
                : 'bg-amber-400 text-zinc-900 hover:bg-amber-500 dark:bg-[#c8a84b] dark:text-[#0a0a0b] dark:hover:bg-[#d4b55a]'
            }`}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            <Download size={11} />
            Download
            <ChevronDown
              size={10}
              style={{
                transform: showDownloadMenu ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.15s',
              }}
            />
          </button>

          <AnimatePresence>
            {showDownloadMenu && (
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.97 }}
                transition={{ duration: 0.12 }}
                className="absolute top-full right-0 z-30 mt-1 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-md dark:border-[#2a2a2c] dark:bg-[#111110] dark:shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
                style={{
                  minWidth: '160px',
                }}
              >
                {[
                  {
                    label: 'README.md',
                    filename: 'README.md',
                    icon: <Github size={12} />,
                  },
                  {
                    label: 'readme.md',
                    filename: 'readme.md',
                    icon: <Download size={12} />,
                  },
                  {
                    label: 'CONTRIBUTING.md',
                    filename: 'CONTRIBUTING.md',
                    icon: <Download size={12} />,
                  },
                ].map((item) => (
                  <button
                    key={item.filename}
                    onClick={() => handleDownload(item.filename)}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-zinc-600 transition-colors hover:bg-slate-50 hover:text-amber-600 dark:text-[#aaaaaa] dark:hover:bg-[#1a1a1b] dark:hover:text-[#c8a84b]"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Click-outside to close download menu */}
      {showDownloadMenu && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => setShowDownloadMenu(false)}
        />
      )}

      {/* ── Content ──────────────────────────────────────────────── */}
      <div className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-800 flex-1 overflow-y-auto px-6 py-6">
        {isEmpty ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-center select-none">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 dark:border-[#2a2a2c] dark:bg-[#111110]">
              <Eye size={18} className="text-zinc-400 dark:text-[#2a2a2c]" />
            </div>
            <p
              className="text-sm text-zinc-400 dark:text-[#555558]"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              // nothing to preview yet
            </p>
          </div>
        ) : viewMode === 'preview' ? (
          <div
            className={`prose-sm max-w-none ${mdClass}`}
            style={{ fontFamily: "'Geist', sans-serif" }}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {markdown}
            </ReactMarkdown>
          </div>
        ) : (
          <pre
            className="text-xs leading-relaxed break-words whitespace-pre-wrap text-zinc-700 dark:text-[#c8c8c4]"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {markdown}
          </pre>
        )}
      </div>

      {/* ── Footer ───────────────────────────────────────────────── */}
      {!isEmpty && (
        <div className="flex shrink-0 items-center justify-between border-t border-slate-200 bg-slate-50 px-4 py-2 dark:border-[#1f1f20] dark:bg-[#0d0d0e]">
          <span
            className="text-xs text-zinc-400 dark:text-[#2a2a2c]"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {markdown.split('\n').length} lines · {markdown.length} chars
          </span>
          <div className="flex items-center gap-1">
            <div className="h-1.5 w-1.5 rounded-full bg-amber-500 dark:bg-[#c8a84b]" />
            <span
              className="text-xs text-zinc-500 dark:text-[#555558]"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              live
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
