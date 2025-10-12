"use client";

import { useState, useEffect } from 'react';
export const dynamic = 'force-dynamic';
import Link from 'next/link';
import { getPostsPage, type Post } from '@/utils/posts';

// Tipagem do post
// Página de listagem de posts
export default function BlogPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pageSize = 5;
  const [cursorSlug, setCursorSlug] = useState<string | undefined>(undefined);
  const [loadingMore, setLoadingMore] = useState(false);
  const [endReached, setEndReached] = useState(false);
  const hasApi = Boolean(process.env.NEXT_PUBLIC_POSTS_API_URL);
  const hasFirebase = Boolean(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getPostsPage(pageSize);
        setPosts(result);
        if (result.length > 0) {
          setCursorSlug(result[result.length - 1].slug);
        }
        if (result.length < pageSize) {
          setEndReached(true);
        }
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Erro ao buscar posts');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const loadMore = async () => {
    if (loadingMore || endReached) return;
    setLoadingMore(true);
    try {
      const next = await getPostsPage(pageSize, cursorSlug);
      setPosts(prev => [...prev, ...next]);
      if (next.length > 0) {
        setCursorSlug(next[next.length - 1].slug);
      }
      if (next.length < pageSize) {
        setEndReached(true);
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar mais posts');
    } finally {
      setLoadingMore(false);
    }
  };

  if (loading) { return <main className="container"><p>Carregando posts...</p></main>; }

  return (
    <main className="container">
      <h1 className="header">My Blog</h1>
      <p className="subheader">Lista de posts. Integração com API externa é opcional (defina `NEXT_PUBLIC_POSTS_API_URL`).</p>

      {error && <p style={{ color: 'red', background: 'lightyellow', padding: '1rem', border: '1px solid red' }}>Erro: {error}</p>}

      {!hasApi && !hasFirebase && (
        <div style={{ background: '#fffbe6', border: '1px solid #ffe58f', padding: '1rem', marginBottom: '1rem' }}>
          <strong>Atenção:</strong> usando dados de demonstração. Configure Firebase em `.env.local` (variáveis `NEXT_PUBLIC_FIREBASE_*`) ou defina `NEXT_PUBLIC_POSTS_API_URL` para uma API externa.
        </div>
      )}

      {!error && posts.length === 0 && (
        <div className="post-card">
          <p>Nenhum post encontrado.</p>
        </div>
      )}

      {!error && posts.map((post) => (
        <article key={post.id} className="post-card">
          <Link href={`/posts/${post.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
            <h2 className="post-title">{post.title}</h2>
          </Link>
          <p className="post-content">{post.content}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
            <small className="post-status">Status: {post.is_published ? 'Published' : 'Draft'}</small>
          </div>
        </article>
      ))}
      {!error && !endReached && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1rem' }}>
          <button onClick={loadMore} disabled={loadingMore} style={{ padding: '0.5rem 1rem' }}>{loadingMore ? 'Carregando...' : 'Carregar mais'}</button>
        </div>
      )}
    </main>
  );
}
// Removed extra named export to comply with Next.js App Router rules
// (page files should not export other components/functions)
