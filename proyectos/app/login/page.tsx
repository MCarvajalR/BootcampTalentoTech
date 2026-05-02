"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap, Eye, EyeOff, ArrowLeft, User, BookOpen } from 'lucide-react';

// Credenciales de demo
const DEMO_CREDENTIALS = {
  estudiante: {
    email: 'estudiante@educampo.co',
    password: 'campo123',
    name: 'Camila Rodriguez',
    role: 'estudiante'
  },
  docente: {
    email: 'docente@educampo.co',
    password: 'profe123',
    name: 'Maria Gonzalez',
    role: 'docente'
  }
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 800));

    // Verificar credenciales de estudiante
    if (email === DEMO_CREDENTIALS.estudiante.email && password === DEMO_CREDENTIALS.estudiante.password) {
      localStorage.setItem('educampo_user', JSON.stringify({
        ...DEMO_CREDENTIALS.estudiante,
        loggedIn: true
      }));
      router.push('/estudiante');
      return;
    }

    // Verificar credenciales de docente
    if (email === DEMO_CREDENTIALS.docente.email && password === DEMO_CREDENTIALS.docente.password) {
      localStorage.setItem('educampo_user', JSON.stringify({
        ...DEMO_CREDENTIALS.docente,
        loggedIn: true
      }));
      router.push('/docente');
      return;
    }

    setError('Correo o contrasena incorrectos. Usa las credenciales de demo.');
    setIsLoading(false);
  };

  const fillDemoCredentials = (type: 'estudiante' | 'docente') => {
    setEmail(DEMO_CREDENTIALS[type].email);
    setPassword(DEMO_CREDENTIALS[type].password);
    setError('');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">EduCampo IA</span>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </Link>
        </div>
      </header>

      {/* Login Form */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">Iniciar Sesion</h1>
            <p className="text-muted-foreground">Ingresa tus credenciales para continuar</p>
          </div>

          <Card className="shadow-lg">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-xl">Bienvenido de vuelta</CardTitle>
              <CardDescription>
                Ingresa tu correo y contrasena para acceder
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electronico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contrasena</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Tu contrasena"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">
                    {error}
                  </div>
                )}

                <Button type="submit" className="w-full h-12 text-lg" disabled={isLoading}>
                  {isLoading ? 'Ingresando...' : 'Iniciar Sesion'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Demo Credentials */}
          <Card className="bg-muted/50 border-dashed">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <span className="text-lg">🔑</span>
                Credenciales de Demo
              </CardTitle>
              <CardDescription className="text-sm">
                Usa estas credenciales para probar la aplicacion
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <button
                type="button"
                onClick={() => fillDemoCredentials('estudiante')}
                className="w-full p-3 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors text-left flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-sky-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">Estudiante</p>
                  <p className="text-xs text-muted-foreground">estudiante@educampo.co / campo123</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => fillDemoCredentials('docente')}
                className="w-full p-3 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors text-left flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">Docente</p>
                  <p className="text-xs text-muted-foreground">docente@educampo.co / profe123</p>
                </div>
              </button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
