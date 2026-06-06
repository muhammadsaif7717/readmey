'use client';

import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import {
  Trash2,
  GripVertical,
  Plus,
  Minus,
  LayoutTemplate,
  Table as TableIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useReadme } from '@/providers/ReadmeProvider';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { ReadmeBlock } from '@/types';
import BlockRow from './editor/BlockRow';
import EmptyState from './editor/EmptyState';

// ─── Editor ──────────────────────────────────────────────────────────────────

/**
 * Main Editor component.
 * Responsible for rendering the sortable list of content blocks.
 * Provides a drop zone for sidebar elements and utilizes dnd-kit for sorting logic.
 */
export default function Editor() {
  const { blocks, updateBlock, removeBlock } = useReadme() as {
    blocks: ReadmeBlock[];
    updateBlock: (id: string, value: string) => void;
    removeBlock: (id: string) => void;
  };

  const { setNodeRef, isOver } = useDroppable({
    id: 'editor-dropzone',
  });

  return (
    <div className="flex h-full flex-col overflow-hidden bg-slate-50 dark:bg-[#0a0a0b]">
      {/* Scroll area */}
      <div
        ref={setNodeRef}
        className={`scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-800 flex-1 space-y-2 overflow-y-auto px-4 py-4 ${isOver ? 'bg-amber-500/[0.03] ring-1 ring-amber-500/30 ring-inset' : ''}`}
      >
        {blocks.length === 0 ? (
          <EmptyState />
        ) : (
          <SortableContext
            items={blocks.map((b) => b.id)}
            strategy={verticalListSortingStrategy}
          >
            {blocks.map((block, index) => (
              <BlockRow
                key={block.id}
                block={block}
                index={index}
                onUpdate={updateBlock}
                onRemove={removeBlock}
              />
            ))}
          </SortableContext>
        )}
      </div>

      {/* Footer info */}
      {blocks.length > 0 && (
        <div className="flex shrink-0 items-center justify-between border-t border-slate-200 bg-white px-4 py-2 dark:border-[#1f1f20] dark:bg-[#0d0d0e]">
          <span
            className="text-xs text-zinc-500 dark:text-[#555558]"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {blocks.length} section{blocks.length !== 1 ? 's' : ''}
          </span>
          <span
            className="text-xs text-zinc-400 dark:text-[#2a2a2c]"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            drag to reorder
          </span>
        </div>
      )}
    </div>
  );
}
