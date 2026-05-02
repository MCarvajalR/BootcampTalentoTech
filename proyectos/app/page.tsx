import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  MessageCircle, 
  Wifi, 
  Smartphone, 
  Brain,
  Calculator,
  BookOpen,
  Leaf,
  ChevronRight,
  Sparkles,
  Users,
  GraduationCap
} from 'lucide-react';

const features = [
  {
    icon: MessageCircle,
    title: 'Chat Educativo',
    description: 'Pregunta lo que quieras y recibe explicaciones claras con ejemplos del campo.',
  },
  {
    icon: Brain,
    title: 'Ejercicios Personalizados',
    description: 'Practica con problemas adaptados a tu nivel y avanza a tu propio ritmo.',
  },
  {
    icon: Wifi,
    title: 'Funciona Sin Internet',
    description: 'Estudia en cualquier lugar, incluso donde no hay conexion a internet.',
  },
  {
    icon: Smartphone,
    title: 'Bajo Consumo de Datos',
    description: 'Disenado para funcionar con poca conexion y ahorrar tus datos moviles.',
  },
];

const subjects = [
  {
    icon: Calculator,
    name: 'Matematicas',
    description: 'Suma, resta, multiplicacion y division con ejemplos de la finca.',
    color: 'bg-sky-500',
  },
  {
    icon: BookOpen,
    name: 'Lectura',
    description: 'Comprension lectora, escritura y cuentos de la region.',
    color: 'bg-amber-500',
  },
  {
    icon: Leaf,
    name: 'Ciencias Naturales',
    description: 'Aprende sobre plantas, animales y el medio ambiente.',
    color: 'bg-green-500',
  },
];

const testimonials = [
  {
    quote: 'Ahora puedo practicar matematicas aunque no haya internet en mi vereda.',
    author: 'Camila, 9 anos',
    location: 'Boyaca',
  },
  {
    quote: 'Mis estudiantes estan mas motivados. Los ejercicios con ejemplos del campo les encantan.',
    author: 'Profesora Maria',
    location: 'Cundinamarca',
  },
  {
    quote: 'Aprendi a leer mejor gracias al profesor virtual. Es muy paciente conmigo.',
    author: 'Santiago, 8 anos',
    location: 'Santander',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">EduCampo IA</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="hidden sm:inline-flex">
                Iniciar Sesion
              </Button>
            </Link>
            <Link href="/estudiante">
              <Button>Empezar</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Educacion con Inteligencia Artificial</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
            Tu profesor virtual{' '}
            <span className="text-primary">siempre contigo</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Aprende matematicas, lectura y ciencias con ejemplos del campo colombiano. 
            Disenado para estudiantes de primaria en zonas rurales.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/estudiante">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6">
                Empezar a aprender
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6">
                <Users className="w-5 h-5 mr-2" />
                Soy docente
              </Button>
            </Link>
          </div>

          {/* Hero Illustration */}
          <div className="mt-12 relative">
            <div className="bg-gradient-to-br from-primary/20 via-accent/20 to-secondary rounded-3xl p-8 md:p-12">
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                <div className="bg-card rounded-2xl p-4 shadow-lg transform hover:scale-105 transition-transform">
                  <span className="text-4xl">🐄</span>
                  <p className="text-xs text-muted-foreground mt-2">Vaquita</p>
                </div>
                <div className="bg-card rounded-2xl p-4 shadow-lg transform hover:scale-105 transition-transform">
                  <span className="text-4xl">📚</span>
                  <p className="text-xs text-muted-foreground mt-2">Aprender</p>
                </div>
                <div className="bg-card rounded-2xl p-4 shadow-lg transform hover:scale-105 transition-transform">
                  <span className="text-4xl">🌱</span>
                  <p className="text-xs text-muted-foreground mt-2">Crecer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Disenado para el campo colombiano
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Entendemos los retos de la educacion rural. Por eso creamos una herramienta que se adapta a tu realidad.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Aprende las materias que necesitas
            </h2>
            <p className="text-muted-foreground text-lg">
              Contenido alineado con el curriculo nacional, con ejemplos de la vida rural.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {subjects.map((subject, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all group cursor-pointer">
                <CardContent className="p-0">
                  <div className={`${subject.color} p-6 text-white`}>
                    <subject.icon className="w-12 h-12 mb-4" />
                    <h3 className="font-bold text-xl mb-2">{subject.name}</h3>
                    <p className="text-white/90 text-sm">{subject.description}</p>
                  </div>
                  <div className="p-4 bg-card flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Ver lecciones</span>
                    <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Lo que dicen nuestros estudiantes
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-none shadow-sm">
                <CardContent className="p-6">
                  <p className="text-foreground mb-4 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg">
                        {index === 1 ? '👩‍🏫' : '👧'}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{testimonial.author}</p>
                      <p className="text-muted-foreground text-xs">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-primary text-primary-foreground overflow-hidden">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Comienza tu aprendizaje hoy
              </h2>
              <p className="text-primary-foreground/90 mb-8 text-lg max-w-2xl mx-auto">
                Miles de estudiantes rurales ya estan aprendiendo con EduCampo IA. Unete y descubre una nueva forma de estudiar.
              </p>
              <Link href="/estudiante">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                  Empezar gratis
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">EduCampo IA</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Proyecto de educacion rural con inteligencia artificial para Colombia.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>2024</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
