import './globals.css';
import { ReactNode } from 'react';
import Header from './Header';
import ToastProvider from '@/components/ui/ToastProvider';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import ServiceWorkerRegister from '@/app/providers/ServiceWorker';
import SWUpdateSnackbar from '@/components/pwa/SWUpdateSnackbar';

export const metadata = {
  metadataBase: new URL('https://optilog.local'),
  title: {
    default: 'OptiLog • Plataforma de Insights',
    template: '%s • OptiLog',
  },
  description: 'OptiLog: conteúdo e ferramentas com IA em tema escuro.',
  icons: {
    icon: '/icons/ejg-app-icon.png',
    shortcut: '/icons/ejg-app-icon.png',
    apple: '/icons/ejg-app-icon.png',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    title: 'EJG Optilog',
    statusBarStyle: 'default',
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
  themeColor: '#b11212',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <ThemeProvider>
          <ToastProvider>
            <Header />
            {children}
            <ServiceWorkerRegister />
            <SWUpdateSnackbar />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
