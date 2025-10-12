"use client";

import { useState } from 'react';
export const dynamic = 'force-dynamic';
import { useRouter } from 'next/navigation';
import { supabase } from '../../utils/supabase/client';

export default function NewPostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // First, get the user session to get the auth token
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      setError("You must be logged in to create a post. Please log in.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Call the Edge Function to create the post
      const response = await fetch('https://gctoafawwupbzlqykdmr.supabase.co/functions/v1/create-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ title, content, is_published: true }), // Default to published
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create post');
      }

      // On success, redirect to the homepage to see the new post
      alert('Post created successfully!');
      router.push('/');
      router.refresh(); // Force a refresh to show the new post

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '700px', margin: 'auto' }}>
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="title" style={{ display: 'block', marginBottom: '0.5rem' }}>Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="content" style={{ display: 'block', marginBottom: '0.5rem' }}>Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', minHeight: '200px' }}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={isSubmitting} style={{ padding: '0.75rem 1.5rem', cursor: 'pointer' }}>
          {isSubmitting ? 'Submitting...' : 'Create Post'}
        </button>
      </form>
    </main>
  );
}
