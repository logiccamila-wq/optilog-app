"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../utils/supabase/client';

type Post = {
  id: string;
  slug: string;
  title: string;
  content: string;
  is_published: boolean;
  author_id: string;
};

export default function BlogPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);

      const { data: postData, error: postError } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (postError) {
        setError(postError.message);
      } else {
        setPosts(postData as Post[]);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const handleDelete = async (postId: string) => {
    if (!confirm('Tem certeza que deseja deletar este post?')) {
      return;
    }

    const { error } = await supabase
      .from('posts')
      .delete()
      .match({ id: postId });

    if (error) {
      alert(`Erro ao deletar o post: ${error.message}`);
    } else {
      setPosts(posts.filter(p => p.id !== postId));
      alert('Post deletado com sucesso.');
    }
  };

  if (loading) {
    return <main className="container"><p>Carregando posts...</p></main>;
  }

  return (
    <main className="container">
      <h1 className="header">My Blog</h1>
      <p className="subheader">This is a list of posts fetched from a Supabase database.</p>

      {error && <p style={{ color: 'red' }}>Could not fetch posts: {error}</p>}

      {!error && posts.length === 0 && (
        <div className="post-card">
          <p>Nenhum post encontrado.</p>
        </div>
      )}

      {!error && posts.map((post) => (
        <article key={post.id} className="post-card">
          <Link href={`/posts/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <h2 className="post-title">{post.title}</h2>
          </Link>
          <p className="post-content">{po
