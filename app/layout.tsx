'use client';

import './globals.css';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import SidebarNav from '../components/SidebarNav';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState(pathname);

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    router.push(path);
  };

  return (
    <html lang="en">
      <body className="bg-slate-900 text-white">
        <div className="flex h-screen">
          <SidebarNav onNavigate={handleNavigate} />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
} 