'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BottomNavigation } from '@/components/bottom-navigation';
import { AnimalAvatar } from '@/components/animal-avatar';
import { SubjectCard } from '@/components/subject-card';
import { AchievementBadge } from '@/components/achievement-badge';
import { subjects, achievements, studentProfile } from '@/lib/mock-data';
import { 
  Flame, 
  BookOpen, 
  ChevronRight, 
  Trophy,
  GraduationCap 
} from 'lucide-react';

export default function EstudiantePage() {
  const [profile, setProfile] = useState(studentProfile);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load profile from localStorage if available
    const savedProfile = localStorage.getItem('educampo_profile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const totalProgress = Math.round(
    subjects.reduce((acc, s) => acc + s.progress, 0) / subjects.length
  );

  const unlockedAchievements = achievements.filter((a) => a.unlocked);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 rounded-full bg-muted" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4 pb-16 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6" />
            <span className="font-bold">EduCampo IA</span>
          </div>
          <Link href="/perfil">
            <AnimalAvatar animal={profile.avatar} size="sm" />
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <AnimalAvatar animal={profile.avatar} size="lg" />
          <div>
            <p className="text-primary-foreground/80 text-sm">Bienvenido de nuevo</p>
            <h1 className="text-2xl font-bold">{profile.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1 bg-white/20 rounded-full px-2 py-1">
                <Flame className="w-4 h-4 text-amber-300" />
                <span className="text-sm font-medium">{profile.streak} dias</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 -mt-8 space-y-6">
        {/* Overall Progress Card */}
        <Card className="shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">Tu progreso general</h3>
              <span className="text-2xl font-bold text-primary">{totalProgress}%</span>
            </div>
            <Progress value={totalProgress} className="h-3" />
            <p className="text-sm text-muted-foreground mt-2">
              Sigue asi, vas muy bien!
            </p>
          </CardContent>
        </Card>

        {/* Continue Learning */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-lg text-foreground">Continuar aprendiendo</h2>
          </div>
          <Card className="bg-gradient-to-r from-sky-500 to-sky-600 text-white overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                  <BookOpen className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <p className="text-white/80 text-sm">Ultima leccion</p>
                  <h3 className="font-bold text-lg">Multiplicacion basica</h3>
                  <p className="text-white/80 text-sm">Matematicas - Leccion 14</p>
                </div>
                <Link href="/ejercicios?materia=matematicas">
                  <Button variant="secondary" size="sm" className="shrink-0">
                    Continuar
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Subjects */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-lg text-foreground">Tus materias</h2>
            <Link href="/ejercicios" className="text-primary text-sm font-medium">
              Ver todas
            </Link>
          </div>
          <div className="space-y-4">
            {subjects.map((subject) => (
              <SubjectCard key={subject.id} {...subject} />
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-lg text-foreground flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              Tus logros
            </h2>
            <Link href="/perfil" className="text-primary text-sm font-medium">
              Ver todos
            </Link>
          </div>
          <Card>
            <CardContent className="p-4 space-y-3">
              {unlockedAchievements.slice(0, 3).map((achievement) => (
                <AchievementBadge key={achievement.id} {...achievement} />
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Quick Actions */}
        <section className="grid grid-cols-2 gap-4">
          <Link href="/chat">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🦉</span>
                </div>
                <h3 className="font-semibold text-foreground text-sm">Hablar con el Profesor</h3>
                <p className="text-xs text-muted-foreground mt-1">Pregunta lo que quieras</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/ejercicios">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 rounded-xl bg-accent/50 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📝</span>
                </div>
                <h3 className="font-semibold text-foreground text-sm">Practicar Ejercicios</h3>
                <p className="text-xs text-muted-foreground mt-1">Pon a prueba lo aprendido</p>
              </CardContent>
            </Card>
          </Link>
        </section>
      </main>

      <BottomNavigation />
    </div>
  );
}
