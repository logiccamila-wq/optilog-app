import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Optilog Blog',
  description: 'Blog com Supabase e Next.js'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
