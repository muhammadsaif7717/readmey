import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, ChevronDown, Trash2 } from 'lucide-react';
import { ReadmeBlock } from '@/types';
import TableEditor from './TableEditor';

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

/**
 * Renders a single block row within the editor's drag-and-drop context.
 * Provides controls for expanding/collapsing, editing content, and deleting the block.
 */
export default function BlockRow({
  block,
  index,
  onUpdate,
  onRemove,
}: {
  block: ReadmeBlock;
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
    zIndex: isDragging ? 50 : 0,
    opacity: isDragging ? 0.5 : 1,
  };

  const [open, setOpen] = useState(true);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group rounded-lg border transition-all duration-150 ${open ? 'border-slate-300 dark:border-[#2a2a2c]' : 'border-slate-200 dark:border-[#1a1a1b]'} bg-white dark:bg-[#111110] ${isDragging ? 'border-amber-500/50 shadow-lg shadow-amber-500/10 dark:border-amber-500/50' : ''}`}
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
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
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
