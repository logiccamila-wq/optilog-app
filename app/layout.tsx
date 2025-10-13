import './globals.css';
import { ReactNode } from 'react';
import Header from './Header';
import ToastProvider from '@/components/ui/ToastProvider';

export const metadata = {
  metadataBase: new URL('https://optilog.local'),
  title: {
    default: 'OptiLog • Plataforma de Insights',
    template: '%s • OptiLog',
  },
  description: 'OptiLog: conteúdo e ferramentas com IA em tema escuro.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'OptiLog • Plataforma de Insights',
    description: 'UI escura inspirada no Copilot, com destaque azul.',
    url: '/',
    siteName: 'OptiLog',
    images: [
      { url: '/logo-xyz.svg', width: 512, height: 512, alt: 'OptiLog' },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'OptiLog',
    description: 'UI escura com MUI e integração com IA.',
    images: ['/logo-xyz.svg'],
  },
};

export const viewport = {
  themeColor: '#0D111B',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <ToastProvider>
          <Header />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
