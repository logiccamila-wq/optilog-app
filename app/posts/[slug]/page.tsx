"use client";
import { useEffect, useState } from 'react';
import { getPost, type Post } from "@/utils/posts";

type PostPageProps = {
  params: {
    slug: string;
  };
};

export const dynamic = 'force-dynamic';

export default function PostPage({ params }: PostPageProps) {
  const { slug } = params;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const p = await getPost(slug);
        setPost(p);
        setError(null);
      } catch (e: any) {
        setError(e.message || 'Erro ao carregar post');
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [slug]);

  if (loading) {
    return <main className="container"><p>Carregando post...</p></main>;
  }

  if (!post) {
    return <main className="container"><p>Post não encontrado.</p></main>;
  }

  return (
    <main className="container">
      <article className="post-card">
        <h1 className="post-title">{post.title}</h1>
        <p className="post-content">{post.content}</p>
      </article>
    </main>
  );
}
