import { Template } from '@/types';

export const TEMPLATES: Template[] = [
  {
    id: 'developer-profile',
    title: 'Developer Profile',
    description:
      'Personal GitHub profile README with advanced stats and graphs.',
    icon: '👨‍💻',
    blocks: [
      { type: 'heading', content: 'Hi there 👋, I am [Your Name]' },
      {
        type: 'text',
        content:
          'A passionate developer from [Your Country] crafting beautiful experiences.',
      },
      { type: 'views', content: 'yourusername' },
      {
        type: 'social',
        content: '',
      },
      { type: 'heading2', content: '🚀 About Me' },
      {
        type: 'list',
        content:
          '🔭 I’m currently working on an awesome open-source project\n🌱 I’m currently learning full-stack development\n👨‍💻 All of my projects are available at [my portfolio](https://your-portfolio-link.com)\n📝 I regularly write articles on [my blog](https://your-blog-link.com)\n💬 Ask me about frontend technologies\n📫 How to reach me: **your.email@example.com**\n📄 Know about my experiences [Resume / CV](https://your-resume-link.com)\n⚡ Fun fact: I love coffee and coding',
      },
      { type: 'heading2', content: '🛠️ Tech Stack' },
      {
        type: 'badges',
        content: '',
      },
      { type: 'heading2', content: '📈 GitHub Stats' },
      { type: 'stats', content: 'yourusername' },
      { type: 'langs', content: 'yourusername' },
      { type: 'streak', content: 'yourusername' },
      { type: 'heading2', content: '🏆 Trophies' },
      { type: 'trophy', content: 'yourusername' },
      { type: 'heading2', content: '📊 Activity Graph' },
      { type: 'activity', content: 'yourusername' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend Project',
    description: 'Perfect for React, Vue, Angular, or any web UI project.',
    icon: '🎨',
    blocks: [
      {
        type: 'banner',
        content:
          'https://via.placeholder.com/800x400.png?text=Awesome+Frontend+App',
      },
      { type: 'heading', content: 'Awesome Frontend App' },
      {
        type: 'badges',
        content:
          'https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB\nhttps://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white\nhttps://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white',
      },
      {
        type: 'text',
        content:
          'A visually stunning and highly responsive frontend application built with modern web technologies.',
      },
      {
        type: 'sandbox',
        content: 'https://codesandbox.io/p/sandbox/github/your-repo',
      },
      {
        type: 'features',
        content:
          'Responsive Design\nDark Mode Support\nAccessible UI Components\nServer-Side Rendering',
      },
      { type: 'prerequisites', content: 'Node.js >= 18.x\nnpm >= 9.x' },
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
      { type: 'heading', content: 'Scalable Microservice API' },
      {
        type: 'badges',
        content:
          'https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white\nhttps://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB\nhttps://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white',
      },
      {
        type: 'text',
        content:
          'A high-performance, robust, and scalable backend service powering mission-critical applications.',
      },
      {
        type: 'architecture',
        content:
          'https://via.placeholder.com/800x400.png?text=System+Architecture',
      },
      {
        type: 'env-vars',
        content:
          'PORT=8080\nDATABASE_URL=postgres://user:pass@localhost:5432/db\nJWT_SECRET=supersecret',
      },
      {
        type: 'api-docs',
        content:
          'Detailed OpenAPI/Swagger documentation can be found at `/api/docs`.',
      },
      { type: 'deployment', content: 'docker-compose up -d' },
    ],
  },
  {
    id: 'fullstack',
    title: 'Fullstack App',
    description:
      'Comprehensive setup for Next.js, MERN, or fullstack frameworks.',
    icon: '🔥',
    blocks: [
      { type: 'heading', content: 'Ultimate Fullstack Application' },
      {
        type: 'badges',
        content:
          'https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white\nhttps://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white',
      },
      {
        type: 'text',
        content:
          'End-to-end fullstack application featuring server actions, edge computing, and seamless database integration.',
      },
      {
        type: 'toc',
        content:
          'Features\nPrerequisites\nEnvironment Variables\nInstallation\nDeployment',
      },
      {
        type: 'features',
        content: 'End-to-end type safety\nAuthentication\nReal-time events',
      },
      {
        type: 'env-vars',
        content:
          'NEXT_PUBLIC_API_URL=http://localhost:3000\nDATABASE_URL=postgres://user:pass@localhost:5432/db',
      },
      {
        type: 'installation',
        content: 'npm install\nnpm run build\nnpm start',
      },
      { type: 'deployment', content: 'vercel deploy --prod' },
    ],
  },
  {
    id: 'design-system',
    title: 'Design System',
    description: 'Perfect for UI libraries, Storybook, and component packages.',
    icon: '💅',
    blocks: [
      { type: 'heading', content: 'Corporate Design System' },
      {
        type: 'badges',
        content:
          'https://img.shields.io/badge/-Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white',
      },
      {
        type: 'text',
        content:
          'A comprehensive suite of accessible, reusable, and composable React components.',
      },
      {
        type: 'sandbox',
        content: 'https://codesandbox.io/p/sandbox/react-ui-components',
      },
      { type: 'installation', content: 'npm install @my-org/design-system' },
      {
        type: 'usage',
        content:
          'import { Button } from "@my-org/design-system";\n\n<Button variant="primary">Click Me</Button>',
      },
    ],
  },
  {
    id: 'data-science',
    title: 'Data Science / ML',
    description: 'Tailored for Python, Jupyter notebooks, and AI/ML projects.',
    icon: '🧠',
    blocks: [
      { type: 'heading', content: 'Predictive ML Model' },
      {
        type: 'badges',
        content:
          'https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white\nhttps://img.shields.io/badge/PyTorch-%23EE4C2C.svg?style=for-the-badge&logo=PyTorch&logoColor=white',
      },
      {
        type: 'text',
        content:
          'A state-of-the-art deep learning model for computer vision tasks.',
      },
      { type: 'prerequisites', content: 'Python 3.10+\nCUDA Toolkit 11.8' },
      { type: 'installation', content: 'pip install -r requirements.txt' },
      { type: 'usage', content: 'python train.py --epochs 50 --batch_size 32' },
      { type: 'metrics', content: 'Accuracy: 98.5%\nF1 Score: 0.97' },
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
      {
        type: 'text',
        content:
          'A beautiful, native-feeling mobile application with smooth animations.',
      },
      {
        type: 'screenshot',
        content: 'https://via.placeholder.com/300x600.png?text=App+Screenshot',
      },
      { type: 'prerequisites', content: 'Flutter SDK\nAndroid Studio / Xcode' },
      {
        type: 'features',
        content:
          'Cross-platform native performance\nOffline-first architecture\nPush notifications',
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
          'https://img.shields.io/badge/license-MIT-blue.svg\nhttps://img.shields.io/badge/PRs-welcome-brightgreen.svg\nhttps://img.shields.io/github/stars/user/repo?style=social',
      },
      {
        type: 'text',
        content:
          'A blazing fast command line tool written in Rust that supercharges your workflow.',
      },
      { type: 'installation', content: 'cargo install amazing-cli' },
      { type: 'usage', content: 'amazing-cli start --port 8080' },
      {
        type: 'contributing',
        content:
          'We love contributions! Please read our `CONTRIBUTING.md` guidelines before submitting PRs.',
      },
      {
        type: 'conduct',
        content:
          'Please adhere to our Code of Conduct to ensure a welcoming environment for everyone.',
      },
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
      {
        type: 'text',
        content: 'A short and concise description of the project.',
      },
      { type: 'installation', content: 'npm install' },
    ],
  },
];
