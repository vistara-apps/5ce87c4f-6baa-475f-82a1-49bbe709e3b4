'use client';

import { ReactNode } from 'react';
import { Shield, Globe, BookOpen, Mic } from 'lucide-react';

interface AppShellProps {
  children: ReactNode;
  variant?: 'default' | 'stickyHeader';
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const AppShell = ({ 
  children, 
  variant = 'default',
  activeTab = 'guides',
  onTabChange 
}: AppShellProps) => {
  const tabs = [
    { id: 'guides', label: 'Guides', icon: BookOpen },
    { id: 'record', label: 'Record', icon: Mic },
    { id: 'incidents', label: 'History', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-bg text-text-primary">
      {/* Header */}
      <header className={`${variant === 'stickyHeader' ? 'sticky top-0 z-50' : ''} bg-surface border-b border-white/10`}>
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-accent" />
              <h1 className="text-xl font-semibold">KnowYourRights</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-text-secondary" />
              <span className="text-sm text-text-secondary">EN</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-white/10">
        <div className="container py-3">
          <div className="flex justify-around">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onTabChange?.(id)}
                className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-md transition-colors ${
                  activeTab === id
                    ? 'text-accent bg-accent/10'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};
