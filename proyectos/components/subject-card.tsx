'use client';

import Link from 'next/link';
import { Calculator, BookOpen, Leaf, LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = {
  Calculator,
  BookOpen,
  Leaf,
};

interface SubjectCardProps {
  id: string;
  name: string;
  icon: string;
  color: string;
  progress: number;
  description: string;
  completedLessons: number;
  totalLessons: number;
}

export function SubjectCard({
  id,
  name,
  icon,
  color,
  progress,
  description,
  completedLessons,
  totalLessons,
}: SubjectCardProps) {
  const Icon = iconMap[icon] || Calculator;

  return (
    <Link href={`/ejercicios?materia=${id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
        <CardContent className="p-0">
          <div className={cn('p-4 flex items-center gap-4', color)}>
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-white">
              <h3 className="font-bold text-lg">{name}</h3>
              <p className="text-sm text-white/80">{description}</p>
            </div>
          </div>
          <div className="p-4 bg-card">
            <div className="flex items-center justify-between mb-2 text-sm">
              <span className="text-muted-foreground">Progreso</span>
              <span className="font-semibold text-foreground">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {completedLessons} de {totalLessons} lecciones completadas
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
