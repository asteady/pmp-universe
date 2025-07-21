'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface User {
  name: string;
  title: string;
  company: string;
  permission: 'Super Admin' | 'Client';
  email: string;
}

interface SidebarNavProps {
  onNavigate: (path: string) => void;
  isDarkMode?: boolean;
  currentUser?: User;
  isClientView?: boolean;
}

export default function SidebarNav({ 
  onNavigate, 
  isDarkMode = true, 
  currentUser,
  isClientView = false 
}: SidebarNavProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isGuruOpen, setIsGuruOpen] = useState(false);

  const navItems = [
    {
      name: 'Dashboard',
      path: '/',
      icon: '📊',
      description: 'Overview & Analytics',
      showForClient: false // Hidden for clients
    },
    {
      name: 'PMP Universe',
      path: '/pmp-universe',
      icon: '🪐',
      description: 'Premium Marketplace Deals',
      showForClient: true
    },
    {
      name: 'RFP Generator',
      path: '/rfp-generator',
      icon: '📋',
      description: 'Create Custom RFPs',
      showForClient: true
    },
    {
      name: 'Custom Deals',
      path: '/custom-deals',
      icon: '🔧',
      description: 'Build Custom PMPs',
      showForClient: false // Hidden for clients
    },
    {
      name: 'Guru',
      path: '/guru',
      icon: '🧠',
      description: 'Knowledge Hub & Resources',
      showForClient: true,
      isSpecial: true // Special handling for Guru
    }
  ];

  // Filter nav items based on user permission and client view
  const filteredNavItems = navItems.filter(item => {
    if (currentUser?.permission === 'Client' || isClientView) {
      return item.showForClient;
    }
    return true;
  });

  const handleNavClick = (path: string, isSpecial?: boolean) => {
    if (isSpecial) {
      setIsGuruOpen(!isGuruOpen);
    } else {
      onNavigate(path);
    }
  };

  const guruSections = [
    {
      title: 'FAQ',
      description: 'Frequently Asked Questions',
      icon: '❓',
      links: [
        { name: 'Dashboard FAQ', url: '#' },
        { name: 'PMP Universe FAQ', url: '#' },
        { name: 'RFP Generator FAQ', url: '#' },
        { name: 'Custom Deals FAQ', url: '#' }
      ]
    },
    {
      title: 'Documentation',
      description: 'API Documentation & Resources',
      icon: '📚',
      links: [
        { name: 'PMP Universe API Docs', url: '#' },
        { name: 'MediaMath API Docs', url: '#' },
        { name: 'Seismic Links (Internal)', url: 'https://infillion.seismic.com/Link/Content/DCbbCp27XJ4VXG9D8mjdc8Q9bjjG', internal: true },
        { name: 'Sales Training', url: 'https://infillion.seismic.com/Link/Content/DC2mq7pBXmbB789GbJJ472pfCWc8', internal: true },
        { name: 'Email Outreach Templates', url: 'https://infillion.seismic.com/Link/Content/DC86VJTB7PXBq8TJbTgpgCBH7gh8', internal: true }
      ]
    },
    {
      title: 'Resources',
      description: 'Alpha Capabilities & Materials',
      icon: '🎯',
      links: [
        { name: 'PMP Universe Alpha Slides', url: '#' },
        { name: 'Alpha One Sheet', url: '#' }
      ]
    }
  ];

  return (
    <div className={`h-screen transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} border-r transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-b from-[#121B30] to-[#69101A] text-white border-[#1B6CA8]/30' 
        : 'bg-gradient-to-b from-[#F8F8FF] to-[#C8BCD1] text-[#121B30] border-[#A239CA]/30'
    }`}>
      {/* Header */}
      <div className={`p-4 border-b transition-colors duration-500 ${
        isDarkMode ? 'border-[#1B6CA8]/30' : 'border-[#A239CA]/30'
      }`}>
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-[#FF3CAC] to-[#C77DFF]' 
                  : 'bg-gradient-to-r from-[#00FFB7] to-[#00FFF7]'
              }`}>
                <span className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-[#121B30]'}`}>I</span>
              </div>
              <div>
                <h2 className={`font-bold text-lg transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-[#121B30]'
                }`}>Infillion</h2>
                <p className={`text-xs transition-colors duration-300 ${
                  isDarkMode ? 'text-[#C8BCD1]' : 'text-[#69101A]'
                }`}>PMP Universe</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`p-2 rounded-lg transition-all duration-300 hover:scale-105 ${
              isDarkMode 
                ? 'hover:bg-[#1B6CA8]/20 text-[#C8BCD1]' 
                : 'hover:bg-[#A239CA]/20 text-[#121B30]'
            }`}
          >
            {isCollapsed ? '→' : '←'}
          </button>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="p-4 space-y-2">
        {filteredNavItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <div key={item.path}>
              <button
                onClick={() => handleNavClick(item.path, item.isSpecial)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 group hover:scale-105 ${
                  isActive
                    ? `bg-gradient-to-r from-[#00FFB7] to-[#00FFF7] text-[#121B30] shadow-lg shadow-[#00FFB7]/30`
                    : isDarkMode
                      ? 'hover:bg-[#1B6CA8]/20 text-[#C8BCD1] hover:text-white'
                      : 'hover:bg-[#A239CA]/20 text-[#121B30] hover:text-[#69101A]'
                }`}
              >
                <div className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'bg-[#121B30]/20'
                    : isDarkMode
                      ? 'group-hover:bg-[#1B6CA8]/30'
                      : 'group-hover:bg-[#A239CA]/30'
                }`}>
                  <div className="flex items-center justify-center w-full h-full">
                    <span className="text-lg leading-none flex items-center justify-center">{item.icon}</span>
                  </div>
                </div>
                {!isCollapsed && (
                  <div className="flex-1 text-left">
                    <div className="font-medium">{item.name}</div>
                    <div className={`text-xs transition-colors duration-300 ${
                      isActive 
                        ? 'opacity-90' 
                        : isDarkMode ? 'text-[#A239CA]' : 'text-[#69101A]'
                    }`}>{item.description}</div>
                  </div>
                )}
                {isActive && !isCollapsed && (
                  <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    isDarkMode ? 'bg-white' : 'bg-[#121B30]'
                  }`}></div>
                )}
              </button>

              {/* Guru Dropdown */}
              {item.isSpecial && isGuruOpen && !isCollapsed && (
                <div className="mt-2 ml-4 space-y-2">
                  {guruSections.map((section, index) => (
                    <div key={index} className="bg-[#1B6CA8]/10 rounded-lg p-3 border border-[#1B6CA8]/30">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm">{section.icon}</span>
                        <h4 className="text-sm font-semibold text-[#F8F8FF]">{section.title}</h4>
                      </div>
                      <p className="text-xs text-[#C8BCD1] mb-2">{section.description}</p>
                      <div className="space-y-1">
                        {section.links.map((link, linkIndex) => (
                          <a
                            key={linkIndex}
                            href={link.url}
                            target={link.internal ? "_blank" : "_self"}
                            rel={link.internal ? "noopener noreferrer" : ""}
                            className={`block text-xs px-2 py-1 rounded hover:bg-[#1B6CA8]/20 transition-colors ${
                              link.internal 
                                ? 'text-[#00FFB7] hover:text-[#00FFF7]' 
                                : 'text-[#C8BCD1] hover:text-[#F8F8FF]'
                            }`}
                          >
                            {link.name}
                            {link.internal && <span className="ml-1 text-[#A239CA]">🔗</span>}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer - Removed as per request */}
    </div>
  );
} 