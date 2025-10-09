"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../../utils/supabase/client'; // Adjusted path for deeper nesting

type EditPageProps = {
  params: {
    slug: string;
  };
};

export default function EditPostPage({ params }: EditPageProps) {
  const [post, setPost] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { slug } = params;

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error || !data) {
        setError('Post not found or you do not have permission to edit it.');
        setLoading(false);
      } else {
        setPost(data);
        setTitle(data.title);
        setContent(data.content);
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setError("You must be logged in to edit a post.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('https://gctoafawwupbzlqykdmr.supabase.co/functions/v1/update-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ post_id: post.id, title, content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update post');
      }

      alert('Post updated successfully!');
      router.push(`/posts/${slug}`); // Redirect to the post page
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (loading) return <main className="container"><p>Loading post...</p></main>;
  if (error) return <main className="container"><p style={{color: 'red'}}>{error}</p></main>;

  return (
    <main className="container">
      <h1 className="header">Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="title" style={{ display: 'block', marginBottom: '0.5rem' }}>Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', fontSize: '1.2rem' }}
          />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="content" style={{ display: 'block', marginBottom: '0.5rem' }}>Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', minHeight: '300px', fontSize: '1rem', lineHeight: '1.6' }}
          />
        </div>
        <button type="submit" disabled={isSubmitting} style={{ padding: '0.75rem 1.5rem', cursor: 'pointer' }}>
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </main>
  );
}
