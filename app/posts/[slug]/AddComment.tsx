"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../utils/supabase/client';

export default function AddComment({ postId }: { postId: string }) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Guard: if Supabase isn't configured, gracefully inform the user
    if (!supabase || !supabase.auth?.getSession) {
      setError('Supabase não está configurado neste ambiente.');
      setIsSubmitting(false);
      return;
    }

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setError("You must be logged in to comment.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('https://gctoafawwupbzlqykdmr.supabase.co/functions/v1/create-comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ post_id: postId, content, is_public: true }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add comment');
      }

      setContent(''); // Clear input on success
      alert('Comment added!');
      router.refresh(); // Refresh the page to show the new comment

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '1rem' }}>
        <textarea
          placeholder="Write a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          style={{ width: '100%', padding: '0.5rem', minHeight: '80px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={isSubmitting} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
        {isSubmitting ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  );
}
