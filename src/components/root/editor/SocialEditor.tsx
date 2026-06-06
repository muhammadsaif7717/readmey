import { ReadmeBlock } from '@/types';
import { Plus, X } from 'lucide-react';

export default function SocialEditor({
  block,
  onUpdate,
}: {
  block: ReadmeBlock;
  onUpdate: (id: string, value: string) => void;
}) {
  // Parse links from the block content. Expecting format: [![Name](shieldUrl)](targetUrl)
  const links =
    (block.content as string)
      ?.split('\n')
      .filter((line) => line.trim().length > 0)
      .map((line) => {
        // Look for the inner image url `![...](imgUrl)` and outer target `[![...](...)](targetUrl)`
        const imgMatch = line.match(/!\[.*?\]\((.*?)\)/);
        const targetMatch = line.match(/^\[!\[.*?\]\(.*?\)\]\((.*?)\)$/);

        const imgUrl = imgMatch ? imgMatch[1] : line;
        const targetUrl = targetMatch ? targetMatch[1] : '';

        return { imgUrl, targetUrl, raw: line };
      }) || [];

  const addLink = (name: string, url: string) => {
    const lowerName = name.toLowerCase();
    const ALIASES: Record<string, string> = {
      js: 'javascript',
      ts: 'typescript',
      golang: 'go',
      postgres: 'postgresql',
      k8s: 'kubernetes',
      aws: 'amazonaws',
      gcp: 'googlecloud',
    };
    const slug = ALIASES[lowerName] || lowerName.replace(/[^a-z0-9]/g, '');
    const shieldUrl = `https://img.shields.io/badge/${encodeURIComponent(name)}-black?style=for-the-badge&logo=${slug}&logoColor=white`;

    const raw = `[![${name}](${shieldUrl})](${url})`;

    const currentLines =
      (block.content as string)
        ?.split('\n')
        .filter((l) => l.trim().length > 0) || [];
    if (!currentLines.includes(raw)) {
      onUpdate(block.id, [...currentLines, raw].join('\n'));
    }
  };

  const removeLink = (index: number) => {
    const currentLines =
      (block.content as string)
        ?.split('\n')
        .filter((l) => l.trim().length > 0) || [];
    currentLines.splice(index, 1);
    onUpdate(block.id, currentLines.join('\n'));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {links.length > 0 ? (
          links.map((link, i) => (
            <div key={i} className="group relative inline-block">
              <img
                src={link.imgUrl}
                alt="social-badge"
                className="h-7 rounded opacity-100 transition-opacity"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <button
                onClick={() => removeLink(i)}
                className="absolute -top-2 -right-2 rounded-full bg-red-500 p-0.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X size={12} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-xs text-zinc-500 italic">
            No social links added yet.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
          Add Social Link:
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const nameInput = form.elements.namedItem(
              'platformName'
            ) as HTMLInputElement;
            const linkInput = form.elements.namedItem(
              'platformLink'
            ) as HTMLInputElement;

            const name = nameInput.value.trim();
            const url = linkInput.value.trim();

            if (!name || !url) return;

            addLink(name, url);

            nameInput.value = '';
            linkInput.value = '';
          }}
          className="flex flex-col gap-2"
        >
          <div className="flex gap-2">
            <input
              name="platformName"
              type="text"
              placeholder="e.g. Facebook"
              className="flex-1 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-zinc-800 transition-colors outline-none focus:border-amber-500/30 focus:ring-1 focus:ring-amber-500/20 dark:border-[#2a2a2c] dark:bg-[#0d0d0e] dark:text-[#c8c8c4]"
            />
            <input
              name="platformLink"
              type="url"
              placeholder="Link (e.g. https://...)"
              className="flex-1 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-zinc-800 transition-colors outline-none focus:border-amber-500/30 focus:ring-1 focus:ring-amber-500/20 dark:border-[#2a2a2c] dark:bg-[#0d0d0e] dark:text-[#c8c8c4]"
            />
            <button
              type="submit"
              className="rounded-md bg-amber-400 px-3 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-amber-500 dark:bg-[#c8a84b] dark:text-[#0a0a0b] dark:hover:bg-[#d4b55a]"
            >
              Add
            </button>
          </div>
        </form>
      </div>

      <details className="group">
        <summary className="cursor-pointer text-xs font-semibold text-zinc-500 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300">
          Advanced: Edit Raw Links
        </summary>
        <div className="mt-2">
          <textarea
            className="w-full resize-none rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-zinc-800 transition-colors outline-none focus:border-amber-500/30 focus:ring-1 focus:ring-amber-500/20 dark:border-[#2a2a2c] dark:bg-[#0d0d0e] dark:text-[#c8c8c4]"
            rows={3}
            value={(block.content as string) ?? ''}
            onChange={(e) => onUpdate(block.id, e.target.value)}
            placeholder="Paste markdown links here..."
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
