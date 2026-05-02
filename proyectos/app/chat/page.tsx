'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { BottomNavigation } from '@/components/bottom-navigation';
import { AnimalAvatar } from '@/components/animal-avatar';
import { chatResponses } from '@/lib/mock-data';
import { 
  ArrowLeft, 
  Send, 
  Wifi, 
  WifiOff,
  Sparkles,
  RefreshCw,
  Lightbulb,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const quickActions = [
  { icon: RefreshCw, label: 'Explicame de nuevo' },
  { icon: Lightbulb, label: 'Dame un ejemplo' },
  { icon: ChevronRight, label: 'Siguiente tema' },
];

const suggestedQuestions = [
  'Como se multiplican los numeros?',
  'Que es la fotosintesis?',
  'Ayudame con un problema de matematicas',
  'Cuentame sobre los animales de la granja',
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: 'Hola! Soy el Profesor Buho, tu asistente de aprendizaje. Estoy aqui para ayudarte con matematicas, lectura y ciencias. Que te gustaria aprender hoy?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateResponse = async (userMessage: string) => {
    setIsTyping(true);
    
    // Simulate typing delay
    await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000));

    let response = '';
    
    // Context-aware responses
    if (userMessage.toLowerCase().includes('multiplic')) {
      response = 'La multiplicacion es como sumar el mismo numero varias veces. Por ejemplo, si tienes 3 canastas con 4 naranjas cada una, puedes sumar 4+4+4=12 o simplemente multiplicar 3x4=12. Imagina que en la finca tienes 3 corrales con 4 gallinas cada uno. Cuantas gallinas hay en total?';
    } else if (userMessage.toLowerCase().includes('fotosintesis') || userMessage.toLowerCase().includes('planta')) {
      response = 'La fotosintesis es el proceso por el cual las plantas hacen su propia comida! Usan la luz del sol, el agua que absorben por las raices y el aire. Por eso las plantas de tu huerta necesitan sol y agua para crecer fuertes y darte frutas y verduras deliciosas.';
    } else if (userMessage.toLowerCase().includes('animal') || userMessage.toLowerCase().includes('granja')) {
      response = 'En la granja hay muchos animales importantes! Las vacas nos dan leche, las gallinas ponen huevos, los cerdos nos dan carne, y los caballos ayudan en el trabajo. Cada animal tiene sus propias caracteristicas. Quieres que te cuente sobre alguno en especial?';
    } else if (userMessage.toLowerCase().includes('problema') || userMessage.toLowerCase().includes('matematicas')) {
      response = 'Claro, te ayudo con un problema! Don Pedro tiene 8 vacas. Si compra 5 vacas mas y luego vende 3, cuantas vacas le quedan? Piensalo paso a paso: primero suma las que compra, luego resta las que vende.';
    } else {
      // Random response from pool
      response = chatResponses[Math.floor(Math.random() * chatResponses.length)] + ' Tienes alguna pregunta sobre matematicas, lectura o ciencias? Estoy aqui para ayudarte!';
    }

    const newMessage: Message = {
      id: Date.now(),
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsTyping(false);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    await simulateResponse(input);
  };

  const handleQuickAction = async (action: string) => {
    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: action,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    await simulateResponse(action);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pb-16 md:pb-0">
      {/* Header */}
      <header className="bg-card border-b border-border p-4 flex items-center gap-4 sticky top-0 z-10">
        <Link href="/estudiante">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        
        <div className="flex items-center gap-3 flex-1">
          <div className="relative">
            <AnimalAvatar animal="buho" size="md" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card" />
          </div>
          <div>
            <h1 className="font-bold text-foreground">Profesor Buho</h1>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              {isOnline ? (
                <>
                  <Wifi className="w-3 h-3 text-green-500" />
                  En linea
                </>
              ) : (
                <>
                  <WifiOff className="w-3 h-3 text-amber-500" />
                  Modo sin conexion
                </>
              )}
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOnline(!isOnline)}
          className="text-muted-foreground"
        >
          {isOnline ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
        </Button>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 1 && (
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-3 text-center">
              Preguntas sugeridas:
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => handleQuickAction(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'flex gap-3 max-w-[90%]',
              message.role === 'user' ? 'ml-auto flex-row-reverse' : ''
            )}
          >
            {message.role === 'assistant' && (
              <AnimalAvatar animal="buho" size="sm" className="shrink-0" />
            )}
            <div
              className={cn(
                'rounded-2xl px-4 py-3',
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-br-md'
                  : 'bg-muted text-foreground rounded-bl-md'
              )}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
              <p
                className={cn(
                  'text-xs mt-1',
                  message.role === 'user'
                    ? 'text-primary-foreground/70'
                    : 'text-muted-foreground'
                )}
              >
                {message.timestamp.toLocaleTimeString('es-CO', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 max-w-[90%]">
            <AnimalAvatar animal="buho" size="sm" className="shrink-0" />
            <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length > 1 && (
        <div className="px-4 py-2 flex gap-2 overflow-x-auto">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="shrink-0 text-xs"
              onClick={() => handleQuickAction(action.label)}
              disabled={isTyping}
            >
              <action.icon className="w-3 h-3 mr-1" />
              {action.label}
            </Button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-4 bg-card border-t border-border">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu pregunta..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button onClick={handleSend} disabled={!input.trim() || isTyping}>
            <Send className="w-5 h-5" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3" />
          Respuestas generadas con IA educativa
        </p>
      </div>

      <BottomNavigation />
    </div>
  );
}
