import './globals.css';
import { ReactNode } from 'react';
import Header from './Header';

export const metadata = {
  title: 'Optilog Blog',
  description: 'Blog com Supabase e Next.js'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
