"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  TrendingUp, 
  Clock, 
  Award,
  ChevronRight,
  LogOut,
  Bell,
  Settings,
  BarChart3,
  FileText,
  MessageCircle
} from 'lucide-react';

// Datos de demo para el docente
const mockStudents = [
  { id: 1, name: 'Camila Rodriguez', grade: '3ro', avatar: '🐄', progress: 78, lastActive: 'Hace 2 horas', streak: 5 },
  { id: 2, name: 'Santiago Moreno', grade: '3ro', avatar: '🐴', progress: 65, lastActive: 'Hace 1 dia', streak: 3 },
  { id: 3, name: 'Valentina Lopez', grade: '2do', avatar: '🐔', progress: 92, lastActive: 'Hace 30 min', streak: 12 },
  { id: 4, name: 'Mateo Garcia', grade: '4to', avatar: '🐕', progress: 45, lastActive: 'Hace 3 dias', streak: 0 },
  { id: 5, name: 'Sofia Martinez', grade: '3ro', avatar: '🐱', progress: 88, lastActive: 'Hace 5 horas', streak: 8 },
];

const mockStats = {
  totalStudents: 24,
  activeToday: 18,
  averageProgress: 72,
  exercisesCompleted: 156,
};

const recentActivity = [
  { student: 'Valentina Lopez', action: 'completo 5 ejercicios de matematicas', time: 'Hace 30 min', type: 'success' },
  { student: 'Camila Rodriguez', action: 'inicio leccion de lectura', time: 'Hace 2 horas', type: 'info' },
  { student: 'Sofia Martinez', action: 'obtuvo la medalla "Estrella de Lectura"', time: 'Hace 5 horas', type: 'achievement' },
  { student: 'Santiago Moreno', action: 'necesita ayuda con fracciones', time: 'Hace 1 dia', type: 'warning' },
];

export default function DocentePage() {
  const router = useRouter();
  const [teacherName, setTeacherName] = useState('Docente');

  useEffect(() => {
    const userData = localStorage.getItem('educampo_user');
    if (userData) {
      const user = JSON.parse(userData);
      if (user.role === 'docente') {
        setTeacherName(user.name);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('educampo_user');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <span className="font-bold text-lg text-foreground">EduCampo IA</span>
              <span className="text-xs text-muted-foreground block">Panel Docente</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-destructive hover:text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Salir
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Bienvenida, {teacherName.split(' ')[0]}
          </h1>
          <p className="text-muted-foreground">
            Aqui puedes ver el progreso de tus estudiantes y gestionar tu clase.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center">
                  <Users className="w-6 h-6 text-sky-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{mockStats.totalStudents}</p>
                  <p className="text-xs text-muted-foreground">Estudiantes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{mockStats.activeToday}</p>
                  <p className="text-xs text-muted-foreground">Activos hoy</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{mockStats.averageProgress}%</p>
                  <p className="text-xs text-muted-foreground">Progreso prom.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{mockStats.exercisesCompleted}</p>
                  <p className="text-xs text-muted-foreground">Ejercicios hoy</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Students List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Mis Estudiantes</CardTitle>
                    <CardDescription>Progreso y actividad reciente</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver todos
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockStudents.map((student) => (
                    <div 
                      key={student.id}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                        {student.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-foreground truncate">{student.name}</p>
                          <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
                            {student.grade}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Progress value={student.progress} className="h-2 flex-1" />
                          <span className="text-sm font-medium text-foreground w-10">{student.progress}%</span>
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {student.lastActive}
                          </span>
                          {student.streak > 0 && (
                            <span className="flex items-center gap-1 text-amber-600">
                              <span>🔥</span>
                              {student.streak} dias
                            </span>
                          )}
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MessageCircle className="w-5 h-5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Actividad Reciente</CardTitle>
                <CardDescription>Lo ultimo de tu clase</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        activity.type === 'success' ? 'bg-green-500' :
                        activity.type === 'achievement' ? 'bg-amber-500' :
                        activity.type === 'warning' ? 'bg-red-500' :
                        'bg-sky-500'
                      }`} />
                      <div>
                        <p className="text-sm text-foreground">
                          <span className="font-medium">{activity.student}</span>{' '}
                          {activity.action}
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Acciones Rapidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start h-12">
                  <FileText className="w-5 h-5 mr-3" />
                  Crear nuevo ejercicio
                </Button>
                <Button variant="outline" className="w-full justify-start h-12">
                  <Users className="w-5 h-5 mr-3" />
                  Agregar estudiante
                </Button>
                <Button variant="outline" className="w-full justify-start h-12">
                  <Award className="w-5 h-5 mr-3" />
                  Ver logros de la clase
                </Button>
                <Button variant="outline" className="w-full justify-start h-12">
                  <BookOpen className="w-5 h-5 mr-3" />
                  Biblioteca de recursos
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Help Banner */}
        <Card className="mt-8 bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-4xl">
                🦉
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-bold text-lg text-foreground mb-1">
                  Profesor Buho esta aqui para ayudarte
                </h3>
                <p className="text-muted-foreground text-sm">
                  Puedes usar el chat de IA para crear ejercicios personalizados o resolver dudas pedagogicas.
                </p>
              </div>
              <Link href="/chat">
                <Button>
                  Ir al Chat IA
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
