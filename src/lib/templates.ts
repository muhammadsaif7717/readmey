export type Template = {
  id: string;
  title: string;
  description: string;
  icon: string;
  blocks: { type: string; content: string }[];
};

export const TEMPLATES: Template[] = [
  {
    id: 'frontend',
    title: 'Frontend Project',
    description: 'Perfect for React, Vue, Angular, or any web UI project.',
    icon: '🎨',
    blocks: [
      { type: 'heading', content: 'Awesome Frontend Project' },
      {
        type: 'badges',
        content:
          'https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB',
      },
      {
        type: 'text',
        content:
          "A brief description of what this project does and who it's for.",
      },
      {
        type: 'image',
        content:
          'https://via.placeholder.com/800x400.png?text=Project+Screenshot',
      },
      { type: 'features', content: 'Feature 1\nFeature 2\nFeature 3' },
      { type: 'installation', content: 'npm install\nnpm run dev' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend/API Project',
    description:
      'Ideal for Node.js, Python, Go, or any server-side application.',
    icon: '⚙️',
    blocks: [
      { type: 'heading', content: 'Powerful API Server' },
      {
        type: 'badges',
        content:
          'https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white',
      },
      {
        type: 'text',
        content: 'Scalable backend API for awesome applications.',
      },
      { type: 'api-docs', content: 'Detailed API documentation goes here.' },
      { type: 'installation', content: 'npm install\nnpm start' },
    ],
  },
  {
    id: 'minimal',
    title: 'Minimal README',
    description:
      'A clean, simple starting point for small projects or libraries.',
    icon: '📝',
    blocks: [
      { type: 'heading', content: 'Project Title' },
      { type: 'text', content: 'Project description' },
      { type: 'installation', content: 'npm install' },
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile App',
    description: 'Great for React Native, Flutter, iOS, or Android apps.',
    icon: '📱',
    blocks: [
      { type: 'heading', content: 'Super Mobile App' },
      {
        type: 'badges',
        content:
          'https://img.shields.io/badge/Flutter-%2302569B.svg?style=for-the-badge&logo=Flutter&logoColor=white',
      },
      { type: 'text', content: 'The best mobile app ever made.' },
      {
        type: 'screenshot',
        content: 'https://via.placeholder.com/300x600.png?text=App+Screenshot',
      },
      {
        type: 'features',
        content: 'Cross-platform\nOffline mode\nPush notifications',
      },
    ],
  },
  {
    id: 'opensource',
    title: 'Open Source Tool',
    description:
      'Designed to attract contributors and show off community health.',
    icon: '🌍',
    blocks: [
      { type: 'heading', content: 'Amazing Open Source CLI' },
      {
        type: 'badges',
        content:
          'https://img.shields.io/badge/license-MIT-blue.svg\nhttps://img.shields.io/badge/PRs-welcome-brightgreen.svg',
      },
      {
        type: 'text',
        content: 'A command line tool that makes your life easier.',
      },
      { type: 'installation', content: 'npm install -g amazing-cli' },
      { type: 'usage', content: 'amazing-cli start --port 8080' },
      {
        type: 'contributing',
        content:
          'We love contributions! Please read our contributing guidelines.',
      },
    ],
  },
];
