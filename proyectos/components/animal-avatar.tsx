'use client';

import { cn } from '@/lib/utils';

const animalEmojis: Record<string, string> = {
  vaca: '🐄',
  gallina: '🐔',
  caballo: '🐴',
  cerdo: '🐷',
  oveja: '🐑',
  perro: '🐕',
  buho: '🦉',
};

interface AnimalAvatarProps {
  animal: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
  selected?: boolean;
}

export function AnimalAvatar({ animal, size = 'md', className, onClick, selected }: AnimalAvatarProps) {
  const sizeClasses = {
    sm: 'w-10 h-10 text-xl',
    md: 'w-14 h-14 text-2xl',
    lg: 'w-20 h-20 text-4xl',
    xl: 'w-28 h-28 text-5xl',
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-full bg-secondary flex items-center justify-center transition-all',
        sizeClasses[size],
        onClick && 'cursor-pointer hover:scale-110',
        selected && 'ring-4 ring-primary ring-offset-2',
        className
      )}
    >
      <span role="img" aria-label={animal}>
        {animalEmojis[animal] || '🐄'}
      </span>
    </div>
  );
}
