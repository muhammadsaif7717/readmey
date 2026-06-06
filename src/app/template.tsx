'use client';

import { motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ ease: 'easeInOut', duration: 0.3 }}
      className="flex h-full w-full flex-1 flex-col"
    >
      {children}
    </motion.div>
  );
}
