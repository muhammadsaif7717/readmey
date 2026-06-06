import React from 'react';
import { Github, Twitter, Mail, Heart, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-white px-6 py-12 dark:border-[#1f1f20] dark:bg-[#0a0a0b]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
        {/* About Section */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <div className="mb-3 flex items-center gap-2">
            <span
              className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Readmey
            </span>
            <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-600 dark:bg-[#c8a84b22] dark:text-[#c8a84b]">
              by MD. SAIF ISLAM
            </span>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-zinc-500 dark:text-[#a1a1aa]">
            The ultimate visual editor to build outstanding, professional GitHub
            README files in minutes. Crafted with passion to help developers
            showcase their work beautifully.
          </p>
        </div>

        {/* Links Section */}
        <div className="flex flex-col items-center gap-4 md:items-end">
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/muhammadsaif7717/readmey"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-amber-500 dark:text-[#a1a1aa] dark:hover:text-[#c8a84b]"
            >
              <Github size={18} />
              Star on GitHub
            </a>
            <a
              href="https://developer-saif.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-amber-500 dark:text-[#a1a1aa] dark:hover:text-[#c8a84b]"
            >
              <ExternalLink size={18} />
              Portfolio
            </a>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-[#71717a]">
            Made with <Heart size={12} className="animate-pulse text-red-500" />{' '}
            by
            <a
              href="https://github.com/muhammadsaif7717"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-zinc-600 transition-colors hover:text-amber-500 dark:text-[#a1a1aa] dark:hover:text-[#c8a84b]"
            >
              Muhammad Saif
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
