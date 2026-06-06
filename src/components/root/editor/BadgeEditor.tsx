import { useState } from 'react';
import { ReadmeBlock } from '@/types';
import { Plus, X } from 'lucide-react';

const COMMON_BADGES = [
  {
    name: 'React',
    url: 'https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB',
  },
  {
    name: 'Next.js',
    url: 'https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white',
  },
  {
    name: 'Vue.js',
    url: 'https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D',
  },
  {
    name: 'Tailwind CSS',
    url: 'https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white',
  },
  {
    name: 'TypeScript',
    url: 'https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white',
  },
  {
    name: 'Node.js',
    url: 'https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white',
  },
  {
    name: 'Python',
    url: 'https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54',
  },
  {
    name: 'PostgreSQL',
    url: 'https://img.shields.io/badge/postgresql-4169E1?style=for-the-badge&logo=postgresql&logoColor=white',
  },
];

export default function BadgeEditor({
  block,
  onUpdate,
}: {
  block: ReadmeBlock;
  onUpdate: (id: string, value: string) => void;
}) {
  const urls =
    (block.content as string)?.split('\n').filter((u) => u.trim().length > 0) ||
    [];

  const addBadge = (url: string) => {
    if (!urls.includes(url)) {
      onUpdate(block.id, [...urls, url].join('\n'));
    }
  };

  const removeBadge = (index: number) => {
    const newUrls = [...urls];
    newUrls.splice(index, 1);
    onUpdate(block.id, newUrls.join('\n'));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {urls.length > 0 ? (
          urls.map((url, i) => (
            <div key={i} className="group relative inline-block">
              <img
                src={url.trim()}
                alt="badge"
                className="h-7 rounded opacity-100 transition-opacity"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <button
                onClick={() => removeBadge(i)}
                className="absolute -top-2 -right-2 rounded-full bg-red-500 p-0.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X size={12} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-xs text-zinc-500 italic">No badges selected.</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
          Quick Add:
        </p>
        <div className="flex flex-wrap gap-2">
          {COMMON_BADGES.map((badge) => (
            <button
              key={badge.name}
              onClick={() => addBadge(badge.url)}
              className="flex items-center gap-1 rounded border border-slate-200 bg-slate-100 px-2 py-1 text-xs text-zinc-700 transition-colors hover:bg-slate-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              <Plus size={12} />
              {badge.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
          Add by Name (or paste URL):
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const input = form.elements.namedItem(
              'badgeName'
            ) as HTMLInputElement;
            const name = input.value.trim();
            if (!name) return;

            if (name.startsWith('http')) {
              addBadge(name);
            } else {
              const lowerName = name.toLowerCase();
              const match = COMMON_BADGES.find((b) => {
                const bName = b.name.toLowerCase();
                return (
                  bName === lowerName ||
                  bName.replace(/[^a-z0-9]/g, '') ===
                    lowerName.replace(/[^a-z0-9]/g, '') ||
                  (lowerName.length > 2 && bName.startsWith(lowerName))
                );
              });

              if (match) {
                addBadge(match.url);
              } else {
                const ALIASES: Record<string, string> = {
                  js: 'javascript',
                  ts: 'typescript',
                  golang: 'go',
                  postgres: 'postgresql',
                  k8s: 'kubernetes',
                  aws: 'amazonaws',
                  gcp: 'googlecloud',
                };
                const slug =
                  ALIASES[lowerName] || lowerName.replace(/[^a-z0-9]/g, '');
                const url = `https://img.shields.io/badge/${encodeURIComponent(name)}-black?style=for-the-badge&logo=${slug}&logoColor=white`;
                addBadge(url);
              }
            }
            input.value = '';
          }}
          className="flex gap-2"
        >
          <input
            name="badgeName"
            type="text"
            placeholder="e.g. Node, React, or paste URL..."
            className="flex-1 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-zinc-800 transition-colors outline-none focus:border-amber-500/30 focus:ring-1 focus:ring-amber-500/20 dark:border-[#2a2a2c] dark:bg-[#0d0d0e] dark:text-[#c8c8c4]"
          />
          <button
            type="submit"
            className="rounded-md bg-amber-400 px-3 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-amber-500 dark:bg-[#c8a84b] dark:text-[#0a0a0b] dark:hover:bg-[#d4b55a]"
          >
            Add
          </button>
        </form>
      </div>

      <details className="group">
        <summary className="cursor-pointer text-xs font-semibold text-zinc-500 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300">
          Advanced: Edit Raw URLs
        </summary>
        <div className="mt-2">
          <textarea
            className="w-full resize-none rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-zinc-800 transition-colors outline-none focus:border-amber-500/30 focus:ring-1 focus:ring-amber-500/20 dark:border-[#2a2a2c] dark:bg-[#0d0d0e] dark:text-[#c8c8c4]"
            rows={3}
            value={(block.content as string) ?? ''}
            onChange={(e) => onUpdate(block.id, e.target.value)}
            placeholder="Paste badge image URLs here (one per line)..."
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
              caretColor: '#c8a84b',
            }}
          />
        </div>
      </details>
    </div>
  );
}
