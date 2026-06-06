'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Heading1,
  Heading2,
  Heading3,
  Type,
  Image as ImageIcon,
  Code2,
  List,
  CheckSquare,
  Table as TableIcon,
  Github,
  Link as LinkIcon,
  Quote,
  Sparkles,
  Award,
  Zap,
  Mail,
  ExternalLink,
  FileCode,
  Layers,
  Eye,
  AlertCircle,
  Lightbulb,
  Shield,
  Users,
  Star,
  GitBranch,
  Rocket,
  Package,
  Terminal,
  FolderTree,
  Wrench,
  Video,
  Trophy,
  Heart,
  MessageSquare,
  Globe,
  Cpu,
  Lock,
  BookOpen,
  GraduationCap,
  Target,
  TrendingUp,
  BarChart3,
  PieChart,
  Settings,
  HelpCircle,
  FileText,
  Hash,
  ChevronDown,
  Search,
  Database,
  Server,
  ListTree,
  Play,
  Key,
  Cloud,
} from 'lucide-react';
import { useReadme } from '@/providers/ReadmeProvider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { usePathname } from 'next/navigation';

// ─── colour tokens per group ───────────────────────────────────────────────
const GROUP_TOKENS: Record<string, { icon: string; item: string; bg: string }> =
  {
    Typography: {
      icon: 'text-blue-400',
      item: 'text-blue-300',
      bg: 'bg-blue-500/10',
    },
    'Lists & Tables': {
      icon: 'text-purple-400',
      item: 'text-purple-300',
      bg: 'bg-purple-500/10',
    },
    'Code & Technical': {
      icon: 'text-green-400',
      item: 'text-green-300',
      bg: 'bg-green-500/10',
    },
    'Media & Assets': {
      icon: 'text-orange-400',
      item: 'text-orange-300',
      bg: 'bg-orange-500/10',
    },
    'GitHub & Stats': {
      icon: 'text-pink-400',
      item: 'text-pink-300',
      bg: 'bg-pink-500/10',
    },
    'Badges & Links': {
      icon: 'text-teal-400',
      item: 'text-teal-300',
      bg: 'bg-teal-500/10',
    },
    'Project Info': {
      icon: 'text-indigo-400',
      item: 'text-indigo-300',
      bg: 'bg-indigo-500/10',
    },
    'Community & Support': {
      icon: 'text-rose-400',
      item: 'text-rose-300',
      bg: 'bg-rose-500/10',
    },
    Documentation: {
      icon: 'text-amber-400',
      item: 'text-amber-300',
      bg: 'bg-amber-500/10',
    },
    'Contact & Social': {
      icon: 'text-emerald-400',
      item: 'text-emerald-300',
      bg: 'bg-emerald-500/10',
    },
    Achievements: {
      icon: 'text-violet-400',
      item: 'text-violet-300',
      bg: 'bg-violet-500/10',
    },
    'Structure & Layout': {
      icon: 'text-zinc-400',
      item: 'text-zinc-300',
      bg: 'bg-zinc-500/10',
    },
  };

const elements = [
  {
    group: 'Typography',
    icon: <Type size={13} />,
    items: [
      {
        label: 'Main Heading (H1)',
        type: 'heading',
        icon: <Heading1 size={14} />,
        desc: 'Project title',
        keywords: 'title header h1',
      },
      {
        label: 'Sub Heading (H2)',
        type: 'heading2',
        icon: <Heading2 size={14} />,
        desc: 'Section title',
        keywords: 'subtitle h2 section',
      },
      {
        label: 'Small Heading (H3)',
        type: 'heading3',
        icon: <Heading3 size={14} />,
        desc: 'Subsection',
        keywords: 'h3 subheading',
      },
      {
        label: 'Paragraph',
        type: 'text',
        icon: <Type size={14} />,
        desc: 'Body text',
        keywords: 'text content paragraph description',
      },
      {
        label: 'Blockquote',
        type: 'quote',
        icon: <Quote size={14} />,
        desc: 'Important quote',
        keywords: 'quote citation',
      },
      {
        label: 'Alert / Warning',
        type: 'alert',
        icon: <AlertCircle size={14} />,
        desc: 'Warning message',
        keywords: 'warning alert caution',
      },
      {
        label: 'Tip / Note',
        type: 'tip',
        icon: <Lightbulb size={14} />,
        desc: 'Helpful tip',
        keywords: 'tip note info hint',
      },
      {
        label: 'Highlight Box',
        type: 'highlight',
        icon: <Hash size={14} />,
        desc: 'Important info',
        keywords: 'highlight important notice',
      },
    ],
  },
  {
    group: 'Lists & Tables',
    icon: <List size={13} />,
    items: [
      {
        label: 'Bullet List',
        type: 'list',
        icon: <List size={14} />,
        desc: 'Unordered list',
        keywords: 'list bullet items',
      },
      {
        label: 'Numbered List',
        type: 'numbered-list',
        icon: <List size={14} />,
        desc: 'Ordered list',
        keywords: 'numbered ordered list steps',
      },
      {
        label: 'Task Checklist',
        type: 'task',
        icon: <CheckSquare size={14} />,
        desc: 'Todo list',
        keywords: 'checklist todo tasks checkbox',
      },
      {
        label: 'Data Table',
        type: 'table',
        icon: <TableIcon size={14} />,
        desc: 'Structured data',
        keywords: 'table data grid',
      },
      {
        label: 'Comparison Table',
        type: 'comparison',
        icon: <TableIcon size={14} />,
        desc: 'Feature compare',
        keywords: 'comparison vs versus',
      },
      {
        label: 'Definition List',
        type: 'definition',
        icon: <BookOpen size={14} />,
        desc: 'Term definitions',
        keywords: 'glossary definitions terms',
      },
    ],
  },
  {
    group: 'Code & Technical',
    icon: <Code2 size={13} />,
    items: [
      {
        label: 'Env Variables',
        type: 'env-vars',
        icon: <Key size={14} />,
        desc: '.env config',
        keywords: 'environment variables env config secret',
      },
      {
        label: 'Code Block',
        type: 'code',
        icon: <Code2 size={14} />,
        desc: 'Multi-line code',
        keywords: 'code snippet programming',
      },
      {
        label: 'Inline Code',
        type: 'inline-code',
        icon: <Terminal size={14} />,
        desc: 'Code in text',
        keywords: 'inline code command',
      },
      {
        label: 'Terminal/Shell',
        type: 'terminal',
        icon: <Terminal size={14} />,
        desc: 'CLI commands',
        keywords: 'terminal shell bash command',
      },
      {
        label: 'File Tree',
        type: 'file-tree',
        icon: <FolderTree size={14} />,
        desc: 'Project structure',
        keywords: 'structure directory folder tree',
      },
      {
        label: 'API Endpoint',
        type: 'api',
        icon: <Cpu size={14} />,
        desc: 'API reference',
        keywords: 'api endpoint rest graphql',
      },
      {
        label: 'Configuration',
        type: 'config',
        icon: <Settings size={14} />,
        desc: 'Config file',
        keywords: 'config configuration settings json yaml',
      },
    ],
  },
  {
    group: 'Media & Assets',
    icon: <ImageIcon size={13} />,
    items: [
      {
        label: 'Architecture',
        type: 'architecture',
        icon: <Database size={14} />,
        desc: 'System diagram',
        keywords: 'architecture diagram system chart',
      },
      {
        label: 'Code Sandbox',
        type: 'sandbox',
        icon: <Play size={14} />,
        desc: 'Live editor',
        keywords: 'sandbox codesandbox embed stackblitz',
      },
      {
        label: 'Image',
        type: 'image',
        icon: <ImageIcon size={14} />,
        desc: 'Add image',
        keywords: 'image photo picture',
      },
      {
        label: 'Banner/Hero',
        type: 'banner',
        icon: <ImageIcon size={14} />,
        desc: 'Full-width banner',
        keywords: 'banner hero header image cover',
      },
      {
        label: 'GIF Animation',
        type: 'gif',
        icon: <Video size={14} />,
        desc: 'Animated GIF',
        keywords: 'gif animation demo video',
      },
      {
        label: 'Screenshot',
        type: 'screenshot',
        icon: <Eye size={14} />,
        desc: 'App screenshot',
        keywords: 'screenshot preview demo',
      },
      {
        label: 'Logo',
        type: 'logo',
        icon: <Sparkles size={14} />,
        desc: 'Project logo',
        keywords: 'logo brand icon',
      },
      {
        label: 'Video Embed',
        type: 'video',
        icon: <Video size={14} />,
        desc: 'Embed video',
        keywords: 'video youtube demo tutorial',
      },
    ],
  },
  {
    group: 'GitHub & Stats',
    icon: <Github size={13} />,
    items: [
      {
        label: 'GitHub Stats',
        type: 'stats',
        icon: <Github size={14} />,
        desc: 'Your stats card',
        keywords: 'github stats profile card',
      },
      {
        label: 'Top Languages',
        type: 'langs',
        icon: <BarChart3 size={14} />,
        desc: 'Language chart',
        keywords: 'languages stats chart graph',
      },
      {
        label: 'Streak Stats',
        type: 'streak',
        icon: <TrendingUp size={14} />,
        desc: 'Contribution streak',
        keywords: 'streak contributions activity',
      },
      {
        label: 'Trophy Showcase',
        type: 'trophy',
        icon: <Trophy size={14} />,
        desc: 'GitHub trophies',
        keywords: 'trophy achievements awards',
      },
      {
        label: 'Profile Views',
        type: 'views',
        icon: <Eye size={14} />,
        desc: 'Visitor counter',
        keywords: 'views visitors counter',
      },
      {
        label: 'Activity Graph',
        type: 'activity',
        icon: <GitBranch size={14} />,
        desc: 'Contribution graph',
        keywords: 'activity contributions graph',
      },
    ],
  },
  {
    group: 'Badges & Links',
    icon: <Award size={13} />,
    items: [
      {
        label: 'Badges',
        type: 'badges',
        icon: <LinkIcon size={14} />,
        desc: 'Custom badges',
        keywords: 'badges links custom shields',
      },
      {
        label: 'Tech Stack',
        type: 'tech-stack',
        icon: <Package size={14} />,
        desc: 'Technology badges',
        keywords: 'tech stack technologies tools',
      },
      {
        label: 'License Badge',
        type: 'license',
        icon: <Shield size={14} />,
        desc: 'License info',
        keywords: 'license copyright',
      },
      {
        label: 'Build Status',
        type: 'build',
        icon: <Cpu size={14} />,
        desc: 'CI/CD status',
        keywords: 'build status ci cd pipeline',
      },
      {
        label: 'Version Badge',
        type: 'version',
        icon: <Hash size={14} />,
        desc: 'Version number',
        keywords: 'version release tag',
      },
      {
        label: 'Coverage Badge',
        type: 'coverage',
        icon: <PieChart size={14} />,
        desc: 'Test coverage',
        keywords: 'coverage tests quality',
      },
    ],
  },
  {
    group: 'Project Info',
    icon: <Rocket size={13} />,
    items: [
      {
        label: 'Prerequisites',
        type: 'prerequisites',
        icon: <ListTree size={14} />,
        desc: 'Requirements',
        keywords: 'prerequisites requirements needed',
      },
      {
        label: 'Deployment',
        type: 'deployment',
        icon: <Cloud size={14} />,
        desc: 'Deploy guide',
        keywords: 'deployment deploy server hosting',
      },
      {
        label: 'Features List',
        type: 'features',
        icon: <Zap size={14} />,
        desc: 'Key features',
        keywords: 'features highlights capabilities',
      },
      {
        label: 'Installation',
        type: 'installation',
        icon: <Wrench size={14} />,
        desc: 'Setup guide',
        keywords: 'install setup getting started',
      },
      {
        label: 'Quick Start',
        type: 'quickstart',
        icon: <Rocket size={14} />,
        desc: 'Quick guide',
        keywords: 'quickstart start guide tutorial',
      },
      {
        label: 'Usage Examples',
        type: 'usage',
        icon: <FileCode size={14} />,
        desc: 'How to use',
        keywords: 'usage examples documentation',
      },
      {
        label: 'API Docs',
        type: 'api-docs',
        icon: <BookOpen size={14} />,
        desc: 'API reference',
        keywords: 'api documentation reference',
      },
      {
        label: 'FAQ',
        type: 'faq',
        icon: <HelpCircle size={14} />,
        desc: 'Common questions',
        keywords: 'faq questions help support',
      },
    ],
  },
  {
    group: 'Community & Support',
    icon: <Users size={13} />,
    items: [
      {
        label: 'Contributing',
        type: 'contributing',
        icon: <Users size={14} />,
        desc: 'Contribution guide',
        keywords: 'contributing guidelines community',
      },
      {
        label: 'Code of Conduct',
        type: 'conduct',
        icon: <Heart size={14} />,
        desc: 'Community rules',
        keywords: 'conduct behavior rules community',
      },
      {
        label: 'Support',
        type: 'support',
        icon: <MessageSquare size={14} />,
        desc: 'Get help',
        keywords: 'support help contact assistance',
      },
      {
        label: 'Sponsors',
        type: 'sponsors',
        icon: <Heart size={14} />,
        desc: 'Project sponsors',
        keywords: 'sponsors funding donation',
      },
      {
        label: 'Authors/Credits',
        type: 'authors',
        icon: <Users size={14} />,
        desc: 'Contributors',
        keywords: 'authors credits contributors team',
      },
      {
        label: 'Acknowledgments',
        type: 'acknowledgments',
        icon: <Star size={14} />,
        desc: 'Thank you',
        keywords: 'acknowledgments thanks credits',
      },
    ],
  },
  {
    group: 'Documentation',
    icon: <BookOpen size={13} />,
    items: [
      {
        label: 'Demo Link',
        type: 'demo',
        icon: <ExternalLink size={14} />,
        desc: 'Live demo',
        keywords: 'demo live preview',
      },
      {
        label: 'Documentation',
        type: 'docs',
        icon: <FileText size={14} />,
        desc: 'Full docs link',
        keywords: 'documentation docs wiki',
      },
      {
        label: 'Roadmap',
        type: 'roadmap',
        icon: <Target size={14} />,
        desc: 'Future plans',
        keywords: 'roadmap plans future milestones',
      },
      {
        label: 'Changelog',
        type: 'changelog',
        icon: <GitBranch size={14} />,
        desc: 'Version history',
        keywords: 'changelog history updates releases',
      },
      {
        label: 'Security',
        type: 'security',
        icon: <Lock size={14} />,
        desc: 'Security info',
        keywords: 'security vulnerabilities policy',
      },
      {
        label: 'Testing',
        type: 'testing',
        icon: <CheckSquare size={14} />,
        desc: 'Testing info',
        keywords: 'testing tests qa',
      },
    ],
  },
  {
    group: 'Contact & Social',
    icon: <Mail size={13} />,
    items: [
      {
        label: 'Contact Info',
        type: 'contact',
        icon: <Mail size={14} />,
        desc: 'Email/contact',
        keywords: 'contact email reach',
      },
      {
        label: 'Social Links',
        type: 'social',
        icon: <Globe size={14} />,
        desc: 'Social profiles',
        keywords: 'social media links profiles',
      },
      {
        label: 'Website',
        type: 'website',
        icon: <Globe size={14} />,
        desc: 'Project website',
        keywords: 'website homepage url',
      },
      {
        label: 'Discord/Slack',
        type: 'chat',
        icon: <MessageSquare size={14} />,
        desc: 'Chat community',
        keywords: 'discord slack chat community',
      },
      {
        label: 'Newsletter',
        type: 'newsletter',
        icon: <Mail size={14} />,
        desc: 'Subscribe',
        keywords: 'newsletter subscribe updates',
      },
    ],
  },
  {
    group: 'Achievements',
    icon: <Trophy size={13} />,
    items: [
      {
        label: 'Achievements',
        type: 'achievements',
        icon: <Trophy size={14} />,
        desc: 'Awards/badges',
        keywords: 'achievements awards recognition',
      },
      {
        label: 'Metrics',
        type: 'metrics',
        icon: <BarChart3 size={14} />,
        desc: 'Project metrics',
        keywords: 'metrics statistics analytics',
      },
      {
        label: 'Testimonials',
        type: 'testimonials',
        icon: <Quote size={14} />,
        desc: 'User reviews',
        keywords: 'testimonials reviews feedback',
      },
      {
        label: 'Case Studies',
        type: 'casestudy',
        icon: <GraduationCap size={14} />,
        desc: 'Use cases',
        keywords: 'case study examples uses',
      },
    ],
  },
  {
    group: 'Structure & Layout',
    icon: <Layers size={13} />,
    items: [
      {
        label: 'Table of Contents',
        type: 'toc',
        icon: <ListTree size={14} />,
        desc: 'Document outline',
        keywords: 'toc table of contents outline navigation',
      },
      {
        label: 'Horizontal Rule',
        type: 'divider',
        icon: <Layers size={14} />,
        desc: 'Section break',
        keywords: 'divider separator line break',
      },
      {
        label: 'Collapsible',
        type: 'details',
        icon: <Eye size={14} />,
        desc: 'Expandable',
        keywords: 'collapsible dropdown expand details',
      },
      {
        label: 'Two Column',
        type: 'columns',
        icon: <Layers size={14} />,
        desc: 'Side by side',
        keywords: 'columns layout grid',
      },
      {
        label: 'Callout Box',
        type: 'callout',
        icon: <AlertCircle size={14} />,
        desc: 'Attention box',
        keywords: 'callout box notice',
      },
    ],
  },
];

const totalElements = elements.reduce((a, s) => a + s.items.length, 0);

// ─── Draggable item ──────────────────────────────────────────────────────────
function SidebarItem({
  item,
  tokens,
  onAdd,
}: {
  item: (typeof elements)[0]['items'][0];
  tokens: { icon: string; item: string; bg: string };
  onAdd: (type: string) => void;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: item.type,
    data: { isSidebarItem: true, type: item.type },
  });

  return (
    <button
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClick={() => onAdd(item.type)}
      className={`group flex w-full cursor-pointer items-center gap-2.5 rounded-lg border border-transparent px-2 py-[7px] text-left transition-all duration-150 hover:border-black/[0.04] hover:bg-black/[0.02] dark:hover:border-white/[0.06] dark:hover:bg-white/[0.03] ${isDragging ? 'opacity-40 ring-1 ring-amber-500/40' : ''}`}
    >
      {/* Icon box */}
      <span
        className={`flex h-[26px] w-[26px] flex-shrink-0 items-center justify-center rounded-[5px] ${tokens.bg} ${tokens.icon} transition-transform duration-150 group-hover:scale-110`}
      >
        {item.icon}
      </span>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-[11px] font-semibold text-zinc-600 transition-colors group-hover:text-zinc-900 dark:text-zinc-500 dark:group-hover:text-zinc-200">
          {item.label}
        </p>
        <p className="truncate font-mono text-[9px] text-zinc-500 dark:text-zinc-700">
          {item.desc}
        </p>
      </div>

      {/* Add indicator */}
      <span
        className={`\${tokens.icon} flex-shrink-0 text-[13px] font-bold opacity-0 transition-opacity group-hover:opacity-100`}
      >
        +
      </span>
    </button>
  );
}

// ─── Main sidebar ────────────────────────────────────────────────────────────

/**
 * The main sidebar of the editor.
 * Provides a searchable, categorized list of markdown elements that can be dragged
 * into the Editor dropzone. Integrated with dnd-kit's useDraggable.
 */
export function AppSidebar() {
  const { addBlock } = useReadme();
  const { setOpen, isMobile } = useSidebar();
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  if (pathname !== '/editor') return null;

  const handleBlockAdd = (type: string) => {
    addBlock(type);
    if (isMobile) setTimeout(() => setOpen(false), 150);
  };

  const filtered = elements
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => {
        const q = searchQuery.toLowerCase();
        return (
          item.label.toLowerCase().includes(q) ||
          item.desc.toLowerCase().includes(q) ||
          item.keywords.toLowerCase().includes(q)
        );
      }),
    }))
    .filter((s) => s.items.length > 0);

  return (
    <Sidebar className="mt-[60px] flex h-[calc(100vh-60px)] flex-col border-r border-black/[0.05] bg-slate-50 dark:border-white/[0.05] dark:bg-[#0d0d0c]">
      {/* Search bar */}
      <div className="flex-shrink-0 border-b border-black/[0.05] p-3 dark:border-white/[0.05]">
        <div className="relative">
          <Search className="absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-zinc-700" />
          <input
            type="search"
            placeholder="Search elements…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 w-full rounded-lg border border-black/[0.07] bg-black/[0.02] pr-3 pl-8 font-mono text-[11px] text-zinc-600 transition-colors outline-none placeholder:text-zinc-400 focus:border-amber-500/30 focus:text-amber-700 dark:border-white/[0.07] dark:bg-white/[0.03] dark:text-zinc-400 dark:placeholder:text-zinc-700 dark:focus:text-amber-300"
          />
        </div>

        {/* Counter */}
        <div className="mt-2 flex items-center justify-between px-0.5">
          <span className="font-mono text-[9px] tracking-[0.14em] text-zinc-600 uppercase dark:text-zinc-800">
            Elements
          </span>
          <span className="font-mono text-[9px] text-zinc-500 dark:text-zinc-700">
            {searchQuery
              ? `${filtered.reduce((a, s) => a + s.items.length, 0)} of ${totalElements}`
              : `${totalElements} available`}
          </span>
        </div>
      </div>

      {/* Scrollable list */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <SidebarContent className="px-2 py-3">
            {filtered.length === 0 ? (
              <div className="px-4 py-10 text-center">
                <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-700">
                  No results
                </p>
                <p className="mt-1 font-mono text-[10px] text-zinc-500 dark:text-zinc-800">
                  Try a different search
                </p>
              </div>
            ) : (
              filtered.map((section) => {
                const tokens =
                  GROUP_TOKENS[section.group] ??
                  GROUP_TOKENS['Structure & Layout'];
                return (
                  <Collapsible
                    key={section.group}
                    defaultOpen={
                      section.group === 'Typography' ||
                      section.group === 'Code & Technical'
                    }
                    className="group/collapsible mb-1"
                  >
                    <SidebarGroup className="p-0">
                      {/* Group header */}
                      <CollapsibleTrigger asChild>
                        <SidebarGroupLabel className="mb-0.5 flex h-auto cursor-pointer items-center gap-2 rounded-lg px-2 py-[7px] hover:bg-black/[0.02] dark:hover:bg-white/[0.03]">
                          {/* Icon */}
                          <span
                            className={`\${tokens.bg} \${tokens.icon} flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-[5px]`}
                          >
                            {section.icon}
                          </span>

                          {/* Name */}
                          <span className="flex-1 font-mono text-[9px] font-medium tracking-[0.1em] text-zinc-700 uppercase dark:text-zinc-600">
                            {section.group}
                          </span>

                          {/* Count */}
                          <span className="rounded bg-black/[0.04] px-1.5 py-0.5 font-mono text-[9px] text-zinc-600 dark:bg-white/[0.04] dark:text-zinc-700">
                            {section.items.length}
                          </span>

                          {/* Chevron */}
                          <ChevronDown className="h-3 w-3 text-zinc-500 transition-transform group-data-[state=open]/collapsible:rotate-180 dark:text-zinc-700" />
                        </SidebarGroupLabel>
                      </CollapsibleTrigger>

                      {/* Items */}
                      <CollapsibleContent>
                        <SidebarGroupContent className="flex flex-col gap-0 pl-1">
                          {section.items.map((item) => (
                            <SidebarItem
                              key={item.type}
                              item={item}
                              tokens={tokens}
                              onAdd={handleBlockAdd}
                            />
                          ))}
                        </SidebarGroupContent>
                      </CollapsibleContent>
                    </SidebarGroup>
                  </Collapsible>
                );
              })
            )}
          </SidebarContent>
        </ScrollArea>
      </div>
    </Sidebar>
  );
}
