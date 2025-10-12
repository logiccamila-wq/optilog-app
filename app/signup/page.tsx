"use client";
import { useState } from 'react';
import { auth } from '@/utils/firebase/client';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import Link from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
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
      const cred = await createUserWithEmailAndPassword(auth as any, email, password);
      if (name) {
        await updateProfile(cred.user, { displayName: name });
      }
      window.location.href = '/';
    } catch (err: any) {
      setError(err.message || 'Falha no cadastro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <h1>Cadastro</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: '0.75rem', maxWidth: 360 }}>
        <label>
          Nome
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Opcional" style={{ width: '100%' }} />
        </label>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%' }} />
        </label>
        <label>
          Senha
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%' }} />
        </label>
        <button type="submit" disabled={loading} style={{ padding: '0.5rem 1rem' }}>{loading ? 'Cadastrando...' : 'Cadastrar'}</button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        Já tem conta? <Link href="/login">Entrar</Link>
      </p>
    </main>
  );
}