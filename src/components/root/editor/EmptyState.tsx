import { LayoutTemplate } from 'lucide-react';

/**
 * Empty state component displayed when there are no blocks in the editor.
 */
export default function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center select-none">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 dark:border-[#2a2a2c] dark:bg-[#1a1a1b]">
        <LayoutTemplate
          size={24}
          className="text-amber-500 dark:text-[#c8a84b]"
        />
      </div>
      <div>
        <p
          className="mb-1 text-sm font-medium text-zinc-800 dark:text-[#e8e8e6]"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Your README is empty
        </p>
        <p
          className="text-xs leading-relaxed text-zinc-500 dark:text-[#555558]"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          Add sections from the sidebar to start building your README.
        </p>
      </div>
    </div>
  );
}
