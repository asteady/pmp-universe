'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarNavProps {
  onNavigate: (path: string) => void;
}

export default function SidebarNav({ onNavigate }: SidebarNavProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    {
      name: 'Dashboard',
      path: '/',
      icon: '📊',
      description: 'Overview & Analytics'
    },
    {
      name: 'PMP Universe',
      path: '/pmp-universe',
      icon: '🪐',
      description: 'Premium Marketplace Deals'
    },
    {
      name: 'RFP Generator',
      path: '/rfp-generator',
      icon: '📋',
      description: 'Create Custom RFPs'
    },
    {
      name: 'Custom Deals',
      path: '/custom-deals',
      icon: '🔧',
      description: 'Build Custom PMPs'
    }
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
  };

  return (
    <div className={`bg-gradient-to-b from-slate-900 to-slate-800 text-white h-screen transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} border-r border-slate-700`}>
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">I</span>
              </div>
              <div>
                <h2 className="font-bold text-lg">Infillion</h2>
                <p className="text-xs text-slate-400">PMP Universe</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors duration-200"
          >
            {isCollapsed ? '→' : '←'}
          </button>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => handleNavClick(item.path)}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                  : 'hover:bg-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {!isCollapsed && (
                <div className="flex-1 text-left">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs opacity-75">{item.description}</div>
                </div>
              )}
              {isActive && !isCollapsed && (
                <div className="w-2 h-2 bg-white rounded-full"></div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">👤</span>
              </div>
              <div>
                <div className="font-medium text-sm">Alex Steady</div>
                <div className="text-xs text-slate-400">Product Manager</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 