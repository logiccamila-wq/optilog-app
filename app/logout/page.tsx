"use client";
import { useEffect, useState } from 'react';
import { isFirebaseReady, logout } from '@/utils/firebase/browserAuth';

export default function LogoutPage() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        if (isFirebaseReady()) {
          await logout();
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