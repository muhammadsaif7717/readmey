import { Table as TableIcon } from 'lucide-react';
import { ReadmeBlock } from '@/types';

/**
 * Placeholder component for advanced table editing functionality.
 * In a future iteration, this would render a spreadsheet-like editor.
 */
export default function TableEditor({
  block,
  onUpdate,
}: {
  block: ReadmeBlock;
  onUpdate: (id: string, value: string) => void;
}) {
  return (
    <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 dark:border-[#2a2a2c] dark:bg-[#0d0d0e]">
      <TableIcon size={14} className="text-amber-500 dark:text-[#c8a84b]" />
      <span
        className="text-xs text-zinc-500 dark:text-[#555558]"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        Table editor — configure columns & rows in the sidebar
      </span>
    </div>
  );
}
