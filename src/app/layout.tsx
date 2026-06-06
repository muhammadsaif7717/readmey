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
  title: 'Easy README - Professional GitHub README Generator',
  description:
    'Create beautiful, professional GitHub README files in minutes with our intuitive drag-and-drop builder. 70+ customizable elements, live preview, and instant markdown export.',
  keywords: [
    'README generator',
    'GitHub README',
    'markdown editor',
    'documentation builder',
    'GitHub profile',
  ],
  authors: [{ name: 'Easy README Team' }],
  openGraph: {
    title: 'Easy README - Professional GitHub README Generator',
    description: 'Create stunning GitHub READMEs with ease',
    type: 'website',
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
