"use client";

import { useState, useEffect } from 'react';
import { Typography, Alert, Card, CardContent, Button, Box, Chip, Paper } from '@mui/material';
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

  if (loading) { return <main className="container"><Typography>Carregando posts...</Typography></main>; }

  return (
    <main className="container">
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>OptiLog</Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <Button component={Link} href="/driver" variant="contained" color="primary">App Motorista</Button>
        <Button component={Link} href="/signup" variant="outlined" color="primary">Cadastro</Button>
      </Box>
      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        Lista de posts. Integração com API externa é opcional (defina `NEXT_PUBLIC_POSTS_API_URL`).
      </Typography>

      <Box aria-live="polite">
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>Erro: {error}</Alert>
        )}
      </Box>

      {!hasApi && !hasFirebase && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          <strong>Atenção:</strong> usando dados de demonstração. Configure Firebase em `.env.local` (variáveis `NEXT_PUBLIC_FIREBASE_*`) ou defina `NEXT_PUBLIC_POSTS_API_URL` para uma API externa.
        </Alert>
      )}

      {!error && posts.length === 0 && (
        <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
          <Typography>Nenhum post encontrado.</Typography>
        </Paper>
      )}

      {!error && posts.map((post) => (
        <Card key={post.id} variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Link href={`/posts/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>{post.title}</Typography>
            </Link>
            <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>{post.content}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
              <Chip label={post.is_published ? 'Publicado' : 'Rascunho'} size="small" color={post.is_published ? 'success' as any : 'default'} />
            </Box>
          </CardContent>
        </Card>
      ))}

      {!error && !endReached && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
          <Button variant="contained" onClick={loadMore} disabled={loadingMore}>
            {loadingMore ? 'Carregando...' : 'Carregar mais'}
          </Button>
        </Box>
      )}
    </main>
  );
}
// Removed extra named export to comply with Next.js App Router rules
// (page files should not export other components/functions)
