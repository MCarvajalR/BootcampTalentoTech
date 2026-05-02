'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MessageCircle, PenTool, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/estudiante', icon: Home, label: 'Inicio' },
  { href: '/chat', icon: MessageCircle, label: 'Chat' },
  { href: '/ejercicios', icon: PenTool, label: 'Ejercicios' },
  { href: '/perfil', icon: User, label: 'Perfil' },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-lg md:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center w-full h-full gap-1 transition-colors',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <item.icon className={cn('w-5 h-5', isActive && 'fill-primary/20')} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
