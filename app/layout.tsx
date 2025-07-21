'use client';

import './globals.css';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import SidebarNav from '../components/SidebarNav';
import UserProfile from '../components/UserProfile';

interface User {
  name: string;
  title: string;
  company: string;
  permission: 'Super Admin' | 'Client';
  email: string;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState(pathname);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentUser, setCurrentUser] = useState<User>({
    name: 'Alex Steady',
    title: 'Director of Product Management',
    company: 'Infillion',
    permission: 'Super Admin',
    email: 'alex.steady@infillion.com'
  });
  const [isClientView, setIsClientView] = useState(false);

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    router.push(path);
  };

  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLoginAsUser = (user: User) => {
    setCurrentUser(user);
    setIsClientView(true);
  };

  const handleToggleClientView = () => {
    if (isClientView) {
      setCurrentUser({
        name: 'Alex Steady',
        title: 'Director of Product Management',
        company: 'Infillion',
        permission: 'Super Admin',
        email: 'alex.steady@infillion.com'
      });
      setIsClientView(false);
    }
  };

  // Apply theme to body and document
  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    
    if (isDarkMode) {
      body.className = 'bg-background text-foreground transition-all duration-500';
      html.className = 'dark';
    } else {
      body.className = 'bg-background text-foreground transition-all duration-500';
      html.className = 'light';
    }
  }, [isDarkMode]);

  return (
    <html lang="en" className={isDarkMode ? 'dark' : 'light'}>
      <body className="bg-background text-foreground transition-all duration-500">
        <div className="flex h-screen">
          <SidebarNav 
            onNavigate={handleNavigate} 
            isDarkMode={isDarkMode}
            currentUser={currentUser}
            isClientView={isClientView}
          />
          <main className="flex-1 overflow-auto relative transition-all duration-500 bg-background text-foreground">
            {/* Header with User Profile */}
            <div className="absolute top-4 right-4 z-40">
              <UserProfile
                isDarkMode={isDarkMode}
                onToggleTheme={handleToggleTheme}
                currentUser={currentUser}
                onLoginAsUser={handleLoginAsUser}
                isClientView={isClientView}
                onToggleClientView={handleToggleClientView}
              />
            </div>
            
            {/* Main Content */}
            <div className="pt-20">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
} 