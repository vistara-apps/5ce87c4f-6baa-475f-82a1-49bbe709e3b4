'use client';

import { Guide } from '../types';
import { BookOpen, MapPin } from 'lucide-react';

interface GuideCardProps {
  guide: Guide;
  variant?: 'compact' | 'detailed';
  onSelect?: (guide: Guide) => void;
}

export const GuideCard = ({ guide, variant = 'detailed', onSelect }: GuideCardProps) => {
  if (variant === 'compact') {
    return (
      <div 
        className="card hover:bg-white/5 cursor-pointer transition-colors"
        onClick={() => onSelect?.(guide)}
      >
        <div className="flex items-center space-x-3">
          <BookOpen className="w-5 h-5 text-accent flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h3 className="font-medium truncate">{guide.title}</h3>
            <p className="text-sm text-text-secondary flex items-center mt-1">
              <MapPin className="w-3 h-3 mr-1" />
              {guide.state === 'general' ? 'General' : guide.state}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-accent" />
          <h3 className="font-medium">{guide.title}</h3>
        </div>
        <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-sm">
          {guide.language.toUpperCase()}
        </span>
      </div>

      <div className="prose prose-invert max-w-none">
        <div className="whitespace-pre-line text-sm leading-relaxed">
          {guide.content}
        </div>
      </div>

      {onSelect && (
        <button
          onClick={() => onSelect(guide)}
          className="btn-primary w-full mt-4"
        >
          View Full Guide
        </button>
      )}
    </div>
  );
};
