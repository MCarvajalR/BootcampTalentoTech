import type { Metadata } from 'next'
import { Nunito, Quicksand } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const nunito = Nunito({ 
  subsets: ["latin"],
  variable: '--font-nunito',
  display: 'swap',
});

const quicksand = Quicksand({ 
  subsets: ["latin"],
  variable: '--font-quicksand',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'EduCampo IA - Tu profesor virtual siempre contigo',
  description: 'Asistente educativo con inteligencia artificial para estudiantes de primaria en zonas rurales de Colombia. Aprende matematicas, lectura y ciencias con ejemplos del campo.',
  generator: 'v0.app',
  keywords: ['educacion', 'rural', 'colombia', 'ia', 'primaria', 'aprendizaje'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${nunito.variable} ${quicksand.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
