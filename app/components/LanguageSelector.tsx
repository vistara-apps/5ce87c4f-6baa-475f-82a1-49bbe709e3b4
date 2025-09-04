'use client';

import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  currentLanguage: 'en' | 'es';
  onLanguageChange: (language: 'en' | 'es') => void;
  variant?: 'default';
}

export const LanguageSelector = ({ 
  currentLanguage, 
  onLanguageChange, 
  variant = 'default' 
}: LanguageSelectorProps) => {
  const languages = [
    { code: 'en' as const, label: 'English', flag: '🇺🇸' },
    { code: 'es' as const, label: 'Español', flag: '🇪🇸' },
  ];

  return (
    <div className="card">
      <div className="flex items-center space-x-2 mb-3">
        <Globe className="w-5 h-5 text-accent" />
        <span className="font-medium">Language / Idioma</span>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onLanguageChange(lang.code)}
            className={`
              flex items-center space-x-2 px-4 py-3 rounded-md border transition-all
              ${currentLanguage === lang.code
                ? 'bg-accent/20 border-accent text-accent'
                : 'bg-surface border-white/10 hover:border-white/20'
              }
            `}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="font-medium">{lang.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
