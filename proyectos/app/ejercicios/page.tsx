'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BottomNavigation } from '@/components/bottom-navigation';
import { exercises, subjects } from '@/lib/mock-data';
import { 
  ArrowLeft, 
  Calculator, 
  BookOpen, 
  Leaf,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ChevronRight,
  RotateCcw,
  Trophy,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

type Difficulty = 'facil' | 'medio' | 'dificil';
type SubjectId = 'matematicas' | 'lectura' | 'ciencias';

const iconMap = {
  matematicas: Calculator,
  lectura: BookOpen,
  ciencias: Leaf,
};

const difficultyColors = {
  facil: 'bg-green-100 text-green-700 border-green-200',
  medio: 'bg-amber-100 text-amber-700 border-amber-200',
  dificil: 'bg-red-100 text-red-700 border-red-200',
};

function ExercisesContent() {
  const searchParams = useSearchParams();
  const initialSubject = (searchParams.get('materia') as SubjectId) || null;

  const [selectedSubject, setSelectedSubject] = useState<SubjectId | null>(initialSubject);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('facil');
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [isComplete, setIsComplete] = useState(false);

  const filteredExercises = selectedSubject
    ? exercises[selectedSubject].filter((e) => e.difficulty === selectedDifficulty)
    : [];

  const currentEx = filteredExercises[currentExercise];

  useEffect(() => {
    if (initialSubject && subjects.find((s) => s.id === initialSubject)) {
      setSelectedSubject(initialSubject);
    }
  }, [initialSubject]);

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);

    const isCorrect = index === currentEx.correct;
    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));

    if (isCorrect) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#22C55E', '#FACC15', '#38BDF8'],
      });
    }
  };

  const nextExercise = () => {
    if (currentExercise + 1 >= filteredExercises.length) {
      setIsComplete(true);
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.5 },
      });
    } else {
      setCurrentExercise((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowHint(false);
    }
  };

  const resetExercises = () => {
    setCurrentExercise(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setShowHint(false);
    setScore({ correct: 0, total: 0 });
    setIsComplete(false);
  };

  const goBack = () => {
    if (selectedSubject) {
      setSelectedSubject(null);
      resetExercises();
    }
  };

  // Subject Selection Screen
  if (!selectedSubject) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <header className="bg-card border-b border-border p-4 flex items-center gap-4 sticky top-0 z-10">
          <Link href="/estudiante">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="font-bold text-lg text-foreground">Ejercicios</h1>
        </header>

        <main className="p-4 space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Elige una materia
            </h2>
            <p className="text-muted-foreground">
              Selecciona la materia que quieres practicar
            </p>
          </div>

          <div className="grid gap-4">
            {subjects.map((subject) => {
              const Icon = iconMap[subject.id as SubjectId];
              return (
                <Card
                  key={subject.id}
                  className="cursor-pointer hover:shadow-lg transition-all"
                  onClick={() => setSelectedSubject(subject.id as SubjectId)}
                >
                  <CardContent className="p-0">
                    <div className={cn('p-5 flex items-center gap-4', subject.color)}>
                      <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1 text-white">
                        <h3 className="font-bold text-xl">{subject.name}</h3>
                        <p className="text-white/80">{subject.description}</p>
                      </div>
                      <ChevronRight className="w-6 h-6 text-white/80" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </main>

        <BottomNavigation />
      </div>
    );
  }

  // Completion Screen
  if (isComplete) {
    const percentage = Math.round((score.correct / score.total) * 100);
    const subjectInfo = subjects.find((s) => s.id === selectedSubject);

    return (
      <div className="min-h-screen bg-background pb-20 flex flex-col">
        <header className="bg-card border-b border-border p-4 flex items-center gap-4 sticky top-0 z-10">
          <Button variant="ghost" size="icon" onClick={goBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-bold text-lg text-foreground">Resultados</h1>
        </header>

        <main className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-10 h-10 text-primary" />
              </div>
              
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {percentage >= 70 ? 'Excelente trabajo!' : percentage >= 50 ? 'Buen esfuerzo!' : 'Sigue practicando!'}
              </h2>
              
              <p className="text-muted-foreground mb-6">
                Has completado los ejercicios de {subjectInfo?.name}
              </p>

              <div className="bg-muted rounded-xl p-6 mb-6">
                <div className="text-4xl font-bold text-primary mb-2">
                  {score.correct}/{score.total}
                </div>
                <p className="text-muted-foreground">respuestas correctas</p>
                <Progress value={percentage} className="h-3 mt-4" />
                <p className="text-sm text-muted-foreground mt-2">{percentage}% de acierto</p>
              </div>

              <div className="flex flex-col gap-3">
                <Button onClick={resetExercises} className="w-full">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Intentar de nuevo
                </Button>
                <Button variant="outline" onClick={goBack} className="w-full">
                  Cambiar materia
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>

        <BottomNavigation />
      </div>
    );
  }

  // Exercise Screen
  const subjectInfo = subjects.find((s) => s.id === selectedSubject);
  const Icon = iconMap[selectedSubject];

  return (
    <div className="min-h-screen bg-background pb-20 flex flex-col">
      <header className={cn('p-4 text-white', subjectInfo?.color)}>
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="icon" onClick={goBack} className="text-white hover:bg-white/20">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2 flex-1">
            <Icon className="w-5 h-5" />
            <span className="font-semibold">{subjectInfo?.name}</span>
          </div>
          <div className="text-sm font-medium">
            {currentExercise + 1}/{filteredExercises.length}
          </div>
        </div>
        <Progress 
          value={((currentExercise + 1) / filteredExercises.length) * 100} 
          className="h-2 bg-white/30"
        />
      </header>

      {/* Difficulty Selector */}
      <div className="p-4 flex gap-2 overflow-x-auto bg-card border-b border-border">
        {(['facil', 'medio', 'dificil'] as Difficulty[]).map((diff) => (
          <Button
            key={diff}
            variant="outline"
            size="sm"
            className={cn(
              'capitalize',
              selectedDifficulty === diff && difficultyColors[diff]
            )}
            onClick={() => {
              setSelectedDifficulty(diff);
              resetExercises();
            }}
          >
            {diff === 'facil' ? 'Facil' : diff === 'medio' ? 'Medio' : 'Dificil'}
          </Button>
        ))}
      </div>

      <main className="flex-1 p-4">
        {filteredExercises.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">
                No hay ejercicios disponibles para esta dificultad.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setSelectedDifficulty('facil')}
              >
                Ver ejercicios faciles
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="h-full">
            <CardContent className="p-6">
              {/* Question */}
              <div className="mb-6">
                <div className={cn(
                  'inline-flex px-3 py-1 rounded-full text-xs font-medium mb-4 border',
                  difficultyColors[currentEx.difficulty as Difficulty]
                )}>
                  {currentEx.difficulty === 'facil' ? 'Facil' : currentEx.difficulty === 'medio' ? 'Medio' : 'Dificil'}
                </div>
                <h2 className="text-lg font-semibold text-foreground leading-relaxed">
                  {currentEx.question}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {currentEx.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index === currentEx.correct;
                  const showCorrect = showResult && isCorrect;
                  const showIncorrect = showResult && isSelected && !isCorrect;

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={showResult}
                      className={cn(
                        'w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3',
                        !showResult && 'hover:border-primary hover:bg-primary/5',
                        !showResult && isSelected && 'border-primary bg-primary/5',
                        showCorrect && 'border-green-500 bg-green-50 text-green-700',
                        showIncorrect && 'border-red-500 bg-red-50 text-red-700',
                        !isSelected && !showCorrect && showResult && 'opacity-50'
                      )}
                    >
                      <span className={cn(
                        'w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold shrink-0',
                        showCorrect && 'bg-green-500 border-green-500 text-white',
                        showIncorrect && 'bg-red-500 border-red-500 text-white',
                        !showResult && 'border-border'
                      )}>
                        {showCorrect ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : showIncorrect ? (
                          <XCircle className="w-5 h-5" />
                        ) : (
                          String.fromCharCode(65 + index)
                        )}
                      </span>
                      <span className="font-medium">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Hint */}
              {!showResult && (
                <Button
                  variant="ghost"
                  className="w-full text-muted-foreground"
                  onClick={() => setShowHint(!showHint)}
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  {showHint ? 'Ocultar pista' : 'Ver pista'}
                </Button>
              )}

              {showHint && !showResult && (
                <div className="mt-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <p className="text-sm text-amber-800 flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" />
                    {currentEx.hint}
                  </p>
                </div>
              )}

              {/* Result Feedback */}
              {showResult && (
                <div className={cn(
                  'mt-4 p-4 rounded-xl flex items-center gap-3',
                  selectedAnswer === currentEx.correct
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-red-50 border border-red-200'
                )}>
                  {selectedAnswer === currentEx.correct ? (
                    <>
                      <Sparkles className="w-6 h-6 text-green-600" />
                      <div>
                        <p className="font-semibold text-green-800">Excelente!</p>
                        <p className="text-sm text-green-700">Respuesta correcta</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-6 h-6 text-red-600" />
                      <div>
                        <p className="font-semibold text-red-800">No es correcto</p>
                        <p className="text-sm text-red-700">
                          La respuesta era: {currentEx.options[currentEx.correct]}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Next Button */}
              {showResult && (
                <Button onClick={nextExercise} className="w-full mt-6">
                  {currentExercise + 1 >= filteredExercises.length ? (
                    <>
                      Ver resultados
                      <Trophy className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    <>
                      Siguiente ejercicio
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
}

export default function EjerciciosPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 rounded-full bg-muted" />
        </div>
      </div>
    }>
      <ExercisesContent />
    </Suspense>
  );
}
