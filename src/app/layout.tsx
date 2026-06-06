import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/shared/Navbar';
import NextThemeProvider from '@/providers/NextThemeProvider';
import { ReadmeProvider } from '@/providers/ReadmeProvider';
import { SidebarProvider } from '@/components/ui/sidebar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Readmey - Professional GitHub README Generator',
  description:
    'Create beautiful, professional GitHub README files in minutes with our intuitive drag-and-drop builder. 70+ customizable elements, live preview, and instant markdown export.',
  keywords: [
    'readme generator',
    'github readme generator',
    'markdown editor',
    'readme editor',
    'developer tools',
    'github profile builder',
    'open source project documentation',
  ],
  authors: [{ name: 'Readmey Team' }],
  creator: 'Readmey',
  publisher: 'Readmey',
  metadataBase: new URL('https://readmey.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Readmey - Professional GitHub README Generator',
    description:
      'Create beautiful, professional GitHub README files in minutes with our intuitive drag-and-drop builder.',
    url: 'https://readmey.vercel.app',
    siteName: 'Readmey',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Readmey - GitHub README Generator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Readmey - Professional GitHub README Generator',
    description:
      'Create beautiful, professional GitHub README files in minutes with our intuitive drag-and-drop builder.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextThemeProvider>
          <ReadmeProvider>
            <SidebarProvider defaultOpen={true}>
              <div className="flex min-h-screen w-full flex-col">
                {/* Global Navbar */}
                <Navbar />

                {/* Main Content Area */}
                <main className="bg-background w-full flex-1 overflow-hidden">
                  {children}
                </main>
              </div>
            </SidebarProvider>
          </ReadmeProvider>
        </NextThemeProvider>
      </body>
    </html>
  );
}
