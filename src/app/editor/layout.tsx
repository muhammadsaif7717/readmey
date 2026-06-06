import { AppSidebar } from '@/components/root/AppSidebar';

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-[calc(100vh-60px)] w-full overflow-hidden">
      {/* Sidebar */}
      <AppSidebar />

      {/* Main Content (Editor + Preview) */}
      <div className="flex w-full flex-1 flex-col overflow-hidden md:flex-row">
        {children}
      </div>
    </div>
  );
}
