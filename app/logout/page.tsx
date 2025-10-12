"use client";
import { useEffect, useState } from 'react';
import { auth } from '@/utils/firebase/client';
import { signOut } from 'firebase/auth';

export default function LogoutPage() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        if (auth) {
          await signOut(auth as any);
        }
      } catch (e: any) {
        setError(e.message || 'Falha ao sair');
      } finally {
        window.location.href = '/';
      }
    };
    run();
  }, []);

  return (
    <main className="container">
      <h1>Saindo...</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </main>
  );
}