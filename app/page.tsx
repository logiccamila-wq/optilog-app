"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/utils/supabase/client';

// Tipagem do post
type Post = {
  id: string;
  slug: string;
  title: string;
  content: string;
  is_published: boolean;
  author_id: string;
};

// Props para página de edição
interface EditPageProps {
  params: {
    slug: string;
  };
}

// Página de listagem de posts
export default function BlogPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  useEffect(() => {
    if (!supabaseUrl || !supabaseAnonKey) {
      setError("Variáveis de ambiente do Supabase não configuradas. Por favor, configure NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY nas configurações do seu projeto na Vercel.");
      setLoading(false);
      return;
    }

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
  }, [supabaseUrl, supabaseAnonKey]);

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

  if (loading) { return <main className="container"><p>Carregando posts...</p></main>; }

  return (
    <main className="container">
      <h1 className="header">My Blog</h1>
      <p className="subheader">This is a list of posts fetched from a Supabase database.</p>

      {error && <p style={{ color: 'red', background: 'lightyellow', padding: '1rem', border: '1px solid red' }}>Erro: {error}</p>}

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
            {user && user.id === post.author_id && (
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <Link href={`/posts/${post.slug}/edit`}>
                  <button style={{ background: '#007bff', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>
                    Editar
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(post.id)}
                  style={{ background: '#dc3545', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Deletar
                </button>
                </div>
              )}
          </div>
        </article>
      ))}
    </main>
  );
}

// Página de edição
export function EditPage({ params }: EditPageProps) {
  const { slug } = params;

  return (
    <main className="container">
      <h1>Editando post: {slug}</h1>
      <p>Implemente aqui seu formulário de edição com Supabase</p>
    </main>
  );
}
