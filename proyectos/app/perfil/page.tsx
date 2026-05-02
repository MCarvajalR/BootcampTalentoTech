'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BottomNavigation } from '@/components/bottom-navigation';
import { AnimalAvatar } from '@/components/animal-avatar';
import { AchievementBadge } from '@/components/achievement-badge';
import { achievements, avatars, grades, studentProfile } from '@/lib/mock-data';
import { 
  ArrowLeft, 
  Flame,
  Clock,
  Target,
  CheckCircle2,
  GraduationCap,
  Settings,
  Edit3,
  Save,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

export default function PerfilPage() {
  const [profile, setProfile] = useState(studentProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(profile.name);
  const [editGrade, setEditGrade] = useState(profile.grade);
  const [editAvatar, setEditAvatar] = useState(profile.avatar);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedProfile = localStorage.getItem('educampo_profile');
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setProfile(parsed);
      setEditName(parsed.name);
      setEditGrade(parsed.grade);
      setEditAvatar(parsed.avatar);
    }
  }, []);

  const saveProfile = () => {
    const newProfile = {
      ...profile,
      name: editName,
      grade: editGrade,
      avatar: editAvatar,
    };
    setProfile(newProfile);
    localStorage.setItem('educampo_profile', JSON.stringify(newProfile));
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditName(profile.name);
    setEditGrade(profile.grade);
    setEditAvatar(profile.avatar);
    setIsEditing(false);
  };

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const accuracy = Math.round((profile.correctAnswers / profile.totalExercises) * 100);

  const stats = [
    {
      icon: Target,
      label: 'Ejercicios completados',
      value: profile.totalExercises,
      color: 'text-sky-500',
    },
    {
      icon: CheckCircle2,
      label: 'Respuestas correctas',
      value: `${accuracy}%`,
      color: 'text-green-500',
    },
    {
      icon: Flame,
      label: 'Racha actual',
      value: `${profile.streak} dias`,
      color: 'text-amber-500',
    },
    {
      icon: Clock,
      label: 'Tiempo de estudio',
      value: `${Math.round(profile.studyTime / 60)}h ${profile.studyTime % 60}m`,
      color: 'text-purple-500',
    },
  ];

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
      <header className="bg-primary text-primary-foreground p-4 pb-20 rounded-b-3xl relative">
        <div className="flex items-center justify-between mb-4">
          <Link href="/estudiante">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="font-bold text-lg">Mi Perfil</h1>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-white/20"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? <X className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
          </Button>
        </div>
      </header>

      <main className="px-4 -mt-16 space-y-6">
        {/* Profile Card */}
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              {isEditing ? (
                <>
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-2">Elige tu avatar</p>
                    <div className="flex flex-wrap gap-3 justify-center">
                      {avatars.map((avatar) => (
                        <AnimalAvatar
                          key={avatar.id}
                          animal={avatar.id}
                          size="md"
                          onClick={() => setEditAvatar(avatar.id)}
                          selected={editAvatar === avatar.id}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="w-full max-w-xs space-y-4">
                    <div>
                      <label className="text-sm text-muted-foreground block mb-1 text-left">
                        Tu nombre
                      </label>
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="Escribe tu nombre"
                        className="text-center"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-muted-foreground block mb-1 text-left">
                        Tu grado
                      </label>
                      <div className="grid grid-cols-5 gap-2">
                        {grades.map((grade) => (
                          <Button
                            key={grade.value}
                            variant="outline"
                            size="sm"
                            className={cn(
                              editGrade === grade.value && 'bg-primary text-primary-foreground'
                            )}
                            onClick={() => setEditGrade(grade.value)}
                          >
                            {grade.value}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" className="flex-1" onClick={cancelEdit}>
                        Cancelar
                      </Button>
                      <Button className="flex-1" onClick={saveProfile}>
                        <Save className="w-4 h-4 mr-2" />
                        Guardar
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <AnimalAvatar animal={profile.avatar} size="xl" className="mb-4" />
                  <h2 className="text-2xl font-bold text-foreground">{profile.name}</h2>
                  <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                    <GraduationCap className="w-4 h-4" />
                    <span>{grades.find((g) => g.value === profile.grade)?.label}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1 bg-amber-100 text-amber-700 rounded-full px-3 py-1">
                      <Flame className="w-4 h-4" />
                      <span className="text-sm font-medium">{profile.streak} dias de racha</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        {!isEditing && (
          <section>
            <h3 className="font-bold text-lg text-foreground mb-3">Tus estadisticas</h3>
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className={cn('w-10 h-10 rounded-xl bg-muted flex items-center justify-center', stat.color)}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Achievements */}
        {!isEditing && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-lg text-foreground">
                Logros ({unlockedCount}/{achievements.length})
              </h3>
            </div>
            <Card>
              <CardContent className="p-4">
                <Progress 
                  value={(unlockedCount / achievements.length) * 100} 
                  className="h-2 mb-4" 
                />
                <div className="space-y-3">
                  {achievements.map((achievement) => (
                    <AchievementBadge key={achievement.id} {...achievement} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Settings Link */}
        {!isEditing && (
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <Settings className="w-5 h-5 text-muted-foreground" />
                </div>
                <span className="font-medium text-foreground">Configuracion</span>
              </div>
              <ArrowLeft className="w-5 h-5 text-muted-foreground rotate-180" />
            </CardContent>
          </Card>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
}
