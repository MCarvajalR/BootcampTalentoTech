'use client';

import { Star, Trophy, Zap, Compass, Flame, Award, LucideIcon, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = {
  Star,
  Trophy,
  Zap,
  Compass,
  Flame,
  Award,
};

interface AchievementBadgeProps {
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export function AchievementBadge({ name, description, icon, unlocked }: AchievementBadgeProps) {
  const Icon = iconMap[icon] || Star;

  return (
    <div
      className={cn(
        'flex items-center gap-3 p-3 rounded-xl transition-all',
        unlocked
          ? 'bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200'
          : 'bg-muted/50 opacity-60'
      )}
    >
      <div
        className={cn(
          'w-12 h-12 rounded-full flex items-center justify-center',
          unlocked
            ? 'bg-gradient-to-br from-amber-400 to-yellow-500 text-white shadow-md'
            : 'bg-muted text-muted-foreground'
        )}
      >
        {unlocked ? <Icon className="w-6 h-6" /> : <Lock className="w-5 h-5" />}
      </div>
      <div className="flex-1">
        <h4 className={cn('font-semibold text-sm', !unlocked && 'text-muted-foreground')}>
          {name}
        </h4>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
