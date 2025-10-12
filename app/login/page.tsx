"use client";
import { useState } from 'react';
import { auth } from '@/utils/firebase/client';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canAuth = Boolean(auth);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!canAuth) {
      setError('Firebase não configurado. Preencha NEXT_PUBLIC_FIREBASE_* no .env.local');
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth as any, email, password);
      window.location.href = '/';
    } catch (err: any) {
      setError(err.message || 'Falha no login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: '0.75rem', maxWidth: 360 }}>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%' }} />
        </label>
        <label>
          Senha
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%' }} />
        </label>
        <button type="submit" disabled={loading} style={{ padding: '0.5rem 1rem' }}>{loading ? 'Entrando...' : 'Entrar'}</button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        Não tem conta? <Link href="/signup">Cadastre-se</Link>
      </p>
    </main>
  );
}