'use client';

import React, { createContext, useContext, useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { GripVertical, Plus } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

import { ReadmeBlock } from '@/types';

interface ReadmeContextType {
  blocks: ReadmeBlock[];
  addBlock: (type: string) => void;
  updateBlock: (id: string, content: string) => void;
  removeBlock: (id: string) => void;
  setBlocks: React.Dispatch<React.SetStateAction<ReadmeBlock[]>>;
  reorderBlocks: (startIndex: number, endIndex: number) => void;
  markdown: string;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ReadmeContext = createContext<ReadmeContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────

/**
 * Context provider that manages the state of the README blocks, drag-and-drop mechanics,
 * and markdown generation. It wraps the entire application to provide global access.
 */
export function ReadmeProvider({ children }: { children: React.ReactNode }) {
  const [blocks, setBlocks] = useState<ReadmeBlock[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<string | null>(null);

  // ── Persist ────────────────────────────────────────────────────────────────

  React.useEffect(() => {
    const saved = localStorage.getItem('readmey-blocks');
    if (saved) {
      try {
        setBlocks(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved blocks', e);
      }
    }
    setIsLoaded(true);
  }, []);

  React.useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('readmey-blocks', JSON.stringify(blocks));
    }
  }, [blocks, isLoaded]);

  // ── Block actions ──────────────────────────────────────────────────────────

  const addBlock = (type: string) => {
    setBlocks((prev) => [
      ...prev,
      { id: Math.random().toString(36).substring(2, 9), type, content: '' },
    ]);
  };

  const updateBlock = (id: string, content: string) => {
    setBlocks((prev) =>
      prev.map((block) => (block.id === id ? { ...block, content } : block))
    );
  };

  const removeBlock = (id: string) => {
    setBlocks((prev) => prev.filter((block) => block.id !== id));
  };

  const reorderBlocks = (startIndex: number, endIndex: number) => {
    setBlocks((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  // ── DnD ───────────────────────────────────────────────────────────────────

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    setActiveType(
      event.active.data.current?.isSidebarItem
        ? event.active.data.current.type
        : null
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    setActiveType(null);
    const { active, over } = event;
    if (!over) return;

    // Sidebar item dropped into editor
    if (active.data.current?.isSidebarItem && over.id === 'editor-dropzone') {
      addBlock(active.id as string);
      return;
    }

    // Reorder within editor
    if (active.id !== over.id && !active.data.current?.isSidebarItem) {
      const oldIndex = blocks.findIndex((b) => b.id === active.id);
      const newIndex = blocks.findIndex((b) => b.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        reorderBlocks(oldIndex, newIndex);
      }
    }
  };

  // ── Markdown generator ────────────────────────────────────────────────────

  const generateMarkdown = () => {
    return blocks
      .map((block) => {
        const content = block.content?.trim() || '';

        if (
          !content &&
          ![
            'stats',
            'langs',
            'streak',
            'trophy',
            'views',
            'activity',
            'divider',
          ].includes(block.type)
        ) {
          return '';
        }

        switch (block.type) {
          // Typography
          case 'heading':
            return `# ${content}`;
          case 'heading2':
            return `## ${content}`;
          case 'heading3':
            return `### ${content}`;
          case 'text':
            return content;
          case 'quote':
            return `> ${content}`;
          case 'alert':
            return `> [!WARNING]\n> ${content}`;
          case 'tip':
            return `> [!TIP]\n> ${content}`;
          case 'highlight':
            return `> [!IMPORTANT]\n> ${content}`;

          // Lists & Tables
          case 'list':
            return content
              .split('\n')
              .filter(Boolean)
              .map((l) => `- ${l}`)
              .join('\n');
          case 'numbered-list':
            return content
              .split('\n')
              .filter(Boolean)
              .map((l, i) => `${i + 1}. ${l}`)
              .join('\n');
          case 'task':
            return content
              .split('\n')
              .filter(Boolean)
              .map((l) =>
                l.startsWith('[x]') || l.startsWith('[ ]')
                  ? `- ${l}`
                  : `- [ ] ${l}`
              )
              .join('\n');
          case 'table':
          case 'comparison':
            return content;
          case 'definition':
            return content
              .split('\n')
              .filter(Boolean)
              .map((l) => {
                const [term, def] = l.split(':');
                return `**${term?.trim() || ''}**: ${def?.trim() || ''}`;
              })
              .join('\n\n');

          // Code & Technical
          case 'code':
            return `\`\`\`\n${content}\n\`\`\``;
          case 'inline-code':
            return `\`${content}\``;
          case 'env-vars':
            return `### Environment Variables\n\nTo run this project, you will need to add the following environment variables to your .env file\n\n\`\`\`bash\n${content}\n\`\`\``;
          case 'terminal':
            return `\`\`\`bash\n${content}\n\`\`\``;
          case 'file-tree':
            return `\`\`\`\n${content}\n\`\`\``;
          case 'api':
            return `### API Endpoint\n\`\`\`\n${content}\n\`\`\``;
          case 'config':
            return `\`\`\`json\n${content}\n\`\`\``;

          // Media & Assets
          case 'image':
            return `![Image](${content})`;
          case 'architecture':
            return `## 🏗 Architecture\n\n![Architecture Diagram](${content})`;
          case 'sandbox':
            return `## 💻 Live Demo\n\n[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](${content})`;
          case 'banner':
            return `![Banner](${content})`;
          case 'gif':
            return `![Demo](${content})`;
          case 'screenshot':
            return `![Screenshot](${content})`;
          case 'logo':
            return `<p align="center">\n  <img src="${content}" alt="Logo" width="200"/>\n</p>`;
          case 'video':
            return `[![Video](${content})](${content})`;

          // GitHub & Stats
          case 'stats':
            return `![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${content}&show_icons=true&theme=radical)`;
          case 'langs':
            return `![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=${content}&layout=compact&theme=radical)`;
          case 'streak':
            return `![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=${content}&theme=radical)`;
          case 'trophy':
            return `![Trophy](https://github-profile-trophy.vercel.app/?username=${content}&theme=radical&no-frame=true&no-bg=true&row=1&column=7)`;
          case 'views':
            return `![Profile Views](https://komarev.com/ghpvc/?username=${content}&color=blue&style=flat-square)`;
          case 'activity':
            return `![Activity Graph](https://github-readme-activity-graph.vercel.app/graph?username=${content}&theme=react-dark)`;

          // Badges & Links
          case 'badges':
          case 'social':
            return content.split('\n').filter(Boolean).join(' ');
          case 'tech-stack':
            return `### 🛠️ Tech Stack\n\n${content}`;
          case 'license':
            return `![License](https://img.shields.io/badge/license-${content}-blue.svg)`;
          case 'build':
            return `![Build Status](https://img.shields.io/badge/build-${content}-brightgreen.svg)`;
          case 'version':
            return `![Version](https://img.shields.io/badge/version-${content}-blue.svg)`;
          case 'coverage':
            return `![Coverage](https://img.shields.io/badge/coverage-${content}%25-brightgreen.svg)`;

          // Project Info
          case 'prerequisites':
            return `## 📋 Prerequisites\n\n${content
              .split('\n')
              .filter(Boolean)
              .map((l) => `- ${l}`)
              .join('\n')}`;
          case 'deployment':
            return `## 🚀 Deployment\n\nTo deploy this project run\n\n\`\`\`bash\n${content}\n\`\`\``;
          case 'features':
            return `## ✨ Features\n\n${content
              .split('\n')
              .filter(Boolean)
              .map((l) => `- ${l}`)
              .join('\n')}`;
          case 'installation':
            return `## 📦 Installation\n\n\`\`\`bash\n${content}\n\`\`\``;
          case 'quickstart':
            return `## 🚀 Quick Start\n\n${content}`;
          case 'usage':
            return `## 💻 Usage\n\n${content}`;
          case 'api-docs':
            return `## 📚 API Documentation\n\n${content}`;
          case 'faq':
            return `## ❓ FAQ\n\n${content}`;

          // Community & Support
          case 'contributing':
            return `## 🤝 Contributing\n\n${content}`;
          case 'conduct':
            return `## 📜 Code of Conduct\n\n${content}`;
          case 'support':
            return `## 💬 Support\n\n${content}`;
          case 'sponsors':
            return `## ❤️ Sponsors\n\n${content}`;
          case 'authors':
            return `## 👥 Authors\n\n${content}`;
          case 'acknowledgments':
            return `## 🙏 Acknowledgments\n\n${content}`;

          // Documentation
          case 'demo':
            return `## 🎯 Demo\n\n[Live Demo](${content})`;
          case 'docs':
            return `## 📖 Documentation\n\n[Full Documentation](${content})`;
          case 'roadmap':
            return `## 🗺️ Roadmap\n\n${content}`;
          case 'changelog':
            return `## 📝 Changelog\n\n${content}`;
          case 'security':
            return `## 🔒 Security\n\n${content}`;
          case 'testing':
            return `## 🧪 Testing\n\n${content}`;

          // Contact & Social
          case 'contact':
            return `## 📧 Contact\n\n${content}`;
          case 'website':
            return `🌐 **Website**: ${content}`;
          case 'chat':
            return `💬 **Join our community**: ${content}`;
          case 'newsletter':
            return `📬 **Newsletter**: ${content}`;

          // Achievements
          case 'achievements':
            return `## 🏆 Achievements\n\n${content}`;
          case 'metrics':
            return `## 📊 Metrics\n\n${content}`;
          case 'testimonials':
            return `## 💭 Testimonials\n\n${content}`;
          case 'casestudy':
            return `## 📖 Case Studies\n\n${content}`;

          // Structure & Layout
          case 'toc':
            return `## Table of Contents\n\n${content
              .split('\n')
              .filter(Boolean)
              .map((l) => `- [${l}](#${l.toLowerCase().replace(/\\s+/g, '-')})`)
              .join('\n')}`;
          case 'divider':
            return `---`;
          case 'details':
            return `<details>\n<summary>Click to expand</summary>\n\n${content}\n\n</details>`;
          case 'columns': {
            const [col1, col2] = content.split('|||');
            return `<table>\n<tr>\n<td width="50%">\n\n${col1?.trim() || ''}\n\n</td>\n<td width="50%">\n\n${col2?.trim() || ''}\n\n</td>\n</tr>\n</table>`;
          }
          case 'callout':
            return `> [!NOTE]\n> ${content}`;

          default:
            return content;
        }
      })
      .filter(Boolean)
      .join('\n\n');
  };

  const markdown = generateMarkdown();
  const dndId = React.useId();

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <ReadmeContext.Provider
      value={{
        blocks,
        addBlock,
        updateBlock,
        removeBlock,
        setBlocks,
        reorderBlocks,
        markdown,
      }}
    >
      <DndContext
        id={dndId}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {children}

        {/* ── DragOverlay — dark amber aesthetic ── */}
        <DragOverlay dropAnimation={{ duration: 180, easing: 'ease' }}>
          {activeId ? (
            activeType ? (
              // Sidebar item being dragged → "add" pill
              <div
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium select-none"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  background: '#c8a84b',
                  color: '#0a0a0b',
                  boxShadow:
                    '0 8px 24px rgba(200,168,75,0.35), 0 2px 8px rgba(0,0,0,0.6)',
                  border: '1px solid #d4b55a',
                  cursor: 'grabbing',
                  whiteSpace: 'nowrap',
                }}
              >
                <Plus size={12} strokeWidth={2.5} />
                {activeType}
              </div>
            ) : (
              // Editor block being reordered → "move" pill
              <div
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium select-none"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  background: '#151514',
                  color: '#c8a84b',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.6), 0 0 0 1px #c8a84b33',
                  border: '1px solid #2a2a2c',
                  cursor: 'grabbing',
                  whiteSpace: 'nowrap',
                }}
              >
                <GripVertical size={12} style={{ color: '#c8a84b' }} />
                moving block…
              </div>
            )
          ) : null}
        </DragOverlay>
      </DndContext>
    </ReadmeContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Custom hook to access the ReadmeContext.
 * @returns {ReadmeContextType} The context value containing blocks and actions.
 */
export const useReadme = () => {
  const context = useContext(ReadmeContext);
  if (!context)
    throw new Error('useReadme must be used within a ReadmeProvider');
  return context;
};
