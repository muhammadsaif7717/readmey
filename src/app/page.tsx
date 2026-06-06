'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { TEMPLATES, Template } from '@/lib/templates';
import { useReadme } from '@/providers/ReadmeProvider';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { setBlocks } = useReadme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const handleUseTemplate = (template: Template | null) => {
    if (template === null) {
      setBlocks([]);
      router.push('/editor');
      return;
    }
    const generatedBlocks = template.blocks.map((b) => ({
      id: Math.random().toString(36).substring(2, 9),
      type: b.type,
      content: b.content,
    }));
    setBlocks(generatedBlocks);
    router.push('/editor');
  };

  const steps = [
    'Pick template',
    'Fill fields',
    'Live preview',
    'Download .md',
  ];

  return (
    <div className="min-h-[calc(100vh-60px)] bg-slate-50 px-4 pb-20 sm:px-6 lg:px-8 dark:bg-zinc-950">
      {/* Hero */}
      <div className="mx-auto max-w-3xl pt-20 pb-16 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-7 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span className="font-mono text-[10px] font-medium tracking-widest text-amber-500">
              pick a template · edit · export
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={itemVariants} className="font-syne mb-5 text-5xl leading-[1.0] font-extrabold tracking-[-2px] text-zinc-900 dark:text-amber-50 sm:text-6xl lg:text-7xl">
            Your README,{' '}
            <em className="text-amber-400 not-italic">beautifully</em> done.
          </motion.h1>

          {/* Sub */}
          <motion.p variants={itemVariants} className="mx-auto mb-10 max-w-md font-mono text-sm leading-relaxed text-zinc-500 dark:text-zinc-600">
            {'// select a template below — or start from scratch'}
            <br />
            {'// fill fields, preview live, download in one click.'}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="mb-12 flex items-center justify-center gap-3">
            <button
              onClick={() => handleUseTemplate(null)}
              className="font-syne rounded-lg bg-amber-400 px-6 py-2.5 text-sm font-bold text-zinc-950 transition-colors hover:bg-amber-300 active:scale-[0.97]"
            >
              Start from scratch
            </button>
            <button
              onClick={() => {
                document
                  .getElementById('templates')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="font-syne rounded-lg border border-black/[0.08] dark:border-white/[0.08] px-6 py-2.5 text-sm font-semibold text-zinc-600 dark:text-zinc-400 transition-colors hover:border-black/[0.15] dark:hover:border-white/[0.15] hover:text-zinc-900 dark:hover:text-zinc-200"
            >
              Browse templates
            </button>
          </motion.div>

          {/* Step trail */}
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-0">
            {steps.map((step, i) => (
              <React.Fragment key={step}>
                <div className="flex items-center gap-2 px-3 py-2">
                  <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-amber-500/25 bg-amber-500/10">
                    <span className="font-mono text-[9px] text-amber-500">
                      {i + 1}
                    </span>
                  </div>
                  <span className="font-syne text-[11px] font-semibold text-zinc-500 dark:text-zinc-600">
                    {step}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <span className="text-xs text-zinc-400 dark:text-zinc-800">→</span>
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Section label */}
      <p className="mb-7 text-center font-mono text-[10px] tracking-[0.18em] text-zinc-500 uppercase dark:text-zinc-800">
        — choose a template to begin —
      </p>

      {/* Template grid */}
      <div
        id="templates"
        className="mx-auto grid max-w-7xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {/* Blank card */}
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08, duration: 0.4 }}
          onClick={() => handleUseTemplate(null)}
          className="group flex min-h-[200px] cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-300 dark:border-white/[0.07] bg-white dark:bg-zinc-900/40 p-8 text-center transition-all hover:border-amber-400 hover:shadow-md dark:hover:border-amber-500/30 dark:hover:bg-amber-500/[0.03] outline-amber-500"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-500/20 bg-amber-500/10 text-xl text-amber-500 transition-transform duration-200 group-hover:scale-110">
            +
          </div>
          <p className="font-syne text-sm font-bold text-zinc-900 dark:text-amber-50">
            Blank canvas
          </p>
          <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-600">
            Start from scratch and build exactly what you need.
          </p>
        </motion.button>

        {/* Template cards */}
        {TEMPLATES.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + index * 0.04, duration: 0.4 }}
            onClick={() => handleUseTemplate(template)}
            className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-slate-200 dark:border-white/[0.05] bg-white dark:bg-[#111110] transition-all hover:shadow-md hover:border-amber-400 dark:hover:border-amber-500/25 outline-amber-500"
          >
            {/* Card body */}
            <div className="flex flex-1 flex-col p-5">
              {/* Icon */}
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-amber-500/10 bg-amber-500/[0.07] text-lg transition-transform duration-200 group-hover:scale-105">
                {template.icon}
              </div>

              {/* Title */}
              <h3 className="font-syne mb-2 text-sm font-bold text-zinc-800 dark:text-zinc-200">
                {template.title}
              </h3>

              {/* Description */}
              <p className="mb-4 line-clamp-3 text-xs leading-relaxed text-zinc-500 dark:text-zinc-600">
                {template.description}
              </p>

              {/* Tags — derived from block types */}
              <div className="mt-auto flex flex-wrap gap-1.5">
                {template.blocks.slice(0, 3).map((block) => (
                  <span
                    key={block.type}
                    className="rounded border border-amber-500/10 bg-amber-500/[0.05] px-1.5 py-0.5 font-mono text-[9px] tracking-wide text-zinc-600 dark:text-zinc-600"
                  >
                    {block.type}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-slate-100 dark:border-white/[0.04] bg-slate-50/50 dark:bg-transparent px-5 py-3">
              <span className="font-syne flex items-center gap-1.5 text-[11px] font-semibold text-zinc-500 dark:text-zinc-600 transition-colors group-hover:text-amber-600 dark:group-hover:text-amber-400">
                Use template
                <ArrowRight
                  size={13}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </span>
              <span className="font-mono text-[9px] text-zinc-400 dark:text-zinc-800">
                {template.blocks.length} sections
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
