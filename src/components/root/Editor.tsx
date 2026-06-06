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
import { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// ─── Types ──────────────────────────────────────────────────────────────────

// Extend / replace with your real block types from ReadmeProvider
type Block = {
  id: string;
  type: string;
  content?: string;
  [key: string]: unknown;
};

// ─── Helpers ────────────────────────────────────────────────────────────────

const LABEL_MAP: Record<string, string> = {
  h1: 'Heading 1',
  h2: 'Heading 2',
  h3: 'Heading 3',
  paragraph: 'Paragraph',
  codeBlock: 'Code Block',
  table: 'Table',
  badge: 'Badge',
  image: 'Image',
  divider: 'Divider',
  bulletList: 'Bullet List',
  numberedList: 'Numbered List',
  blockquote: 'Blockquote',
  link: 'Link',
  techStack: 'Tech Stack',
  contributors: 'Contributors',
  license: 'License',
  acknowledgements: 'Acknowledgements',
};

function getLabel(type: string) {
  return LABEL_MAP[type] ?? type;
}

// ─── BlockRow ───────────────────────────────────────────────────────────────

function BlockRow({
  block,
  index,
  onUpdate,
  onRemove,
}: {
  block: Block;
  index: number;
  onUpdate: (id: string, value: string) => void;
  onRemove: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    opacity: isDragging ? 0.5 : 1,
  };

  const [open, setOpen] = useState(true);

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        zIndex: isDragging ? 50 : 0,
      }}
      className={`group rounded-lg border transition-all duration-150 ${open ? 'border-slate-300 dark:border-[#2a2a2c]' : 'border-slate-200 dark:border-[#1a1a1b]'} bg-white dark:bg-[#111110] ${isDragging ? 'shadow-lg shadow-amber-500/10 border-amber-500/50 dark:border-amber-500/50' : ''}`}
    >
      {/* Row header */}
      <div
        className="flex cursor-pointer items-center gap-3 px-3 py-3"
        onClick={() => setOpen((o) => !o)}
      >
        {/* Drag handle */}
        <div
          {...attributes}
          {...listeners}
          className="shrink-0 cursor-grab text-amber-500 opacity-30 transition-opacity group-hover:opacity-60 active:cursor-grabbing dark:text-[#c8a84b]"
        >
          <GripVertical size={14} />
        </div>

        {/* Index badge */}
        <span
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-slate-100 text-[10px] text-zinc-500 dark:bg-[#1f1f20] dark:text-[#555558]"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {index + 1}
        </span>

        {/* Label */}
        <span
          className="flex-1 truncate text-sm font-medium text-zinc-800 dark:text-[#e8e8e6]"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {getLabel(block.type)}
        </span>

        {/* Type chip */}
        <span
          className="hidden shrink-0 rounded bg-slate-100 px-2 py-0.5 text-[10px] tracking-wider text-zinc-500 uppercase sm:inline-block dark:bg-[#1a1a1b] dark:text-[#555558]"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {block.type}
        </span>

        {/* Expand/collapse */}
        <button
          className="ml-1 flex h-5 w-5 shrink-0 items-center justify-center rounded text-zinc-500 transition-colors dark:text-[#555558]"
          onClick={(e) => {
            e.stopPropagation();
            setOpen((o) => !o);
          }}
        >
          {open ? <Minus size={12} /> : <Plus size={12} />}
        </button>

        {/* Delete */}
        <button
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-red-500 opacity-0 transition-all duration-150 group-hover:opacity-100 hover:bg-red-500/10 dark:text-[#ef4444]"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(block.id);
          }}
        >
          <Trash2 size={12} />
        </button>
      </div>

      {/* Editable body */}
      {open && (
        <div className="border-t border-slate-200 px-3 pt-3 pb-3 dark:border-[#1a1a1b]">
          {block.type === 'table' ? (
            <TableEditor block={block} onUpdate={onUpdate} />
          ) : (
            <textarea
              className="w-full resize-none rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-zinc-800 transition-colors outline-none focus:border-amber-500/30 focus:ring-1 focus:ring-amber-500/20 dark:border-[#2a2a2c] dark:bg-[#0d0d0e] dark:text-[#c8c8c4] dark:focus:border-[#c8a84b44] dark:focus:ring-[#c8a84b22]"
              rows={block.type === 'codeBlock' ? 6 : 3}
              value={(block.content as string) ?? ''}
              onChange={(e) => onUpdate(block.id, e.target.value)}
              placeholder={`Enter ${getLabel(block.type).toLowerCase()} content…`}
              style={{
                fontFamily:
                  block.type === 'codeBlock'
                    ? "'JetBrains Mono', monospace"
                    : 'inherit',
                fontSize: block.type === 'codeBlock' ? '12px' : '14px',
                caretColor: '#c8a84b',
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}

// ─── TableEditor (placeholder) ───────────────────────────────────────────────

function TableEditor({
  block,
  onUpdate,
}: {
  block: Block;
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

// ─── Empty state ─────────────────────────────────────────────────────────────

function EmptyState() {
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

// ─── Editor ──────────────────────────────────────────────────────────────────

export default function Editor() {
  const { blocks, updateBlock, removeBlock } = useReadme() as {
    blocks: Block[];
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
