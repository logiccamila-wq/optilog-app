import { createClient } from "../../../utils/supabase/server";
import { notFound } from "next/navigation";
import AddComment from "./AddComment";

type PostPageProps = {
  params: {
    slug: string;
  };
};

// Re-exporting the client component is a good pattern in App Router
const AddCommentClient = AddComment;

export default async function PostPage({ params }: PostPageProps) {
  const supabase = createClient();
  const { slug } = params;

  // Fetch the post by its slug
  const { data: post, error: postError } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (postError || !post) {
    notFound(); // If post doesn't exist, show a 404 page
  }

  // Fetch comments for the post and join with the users table to get author's username
  const { data: comments, error: commentsError } = await supabase
    .from("comments")
    .select("*, author:users(username)")
    .eq("post_id", post.id)
    .order("created_at", { ascending: true });

  return (
    <main className="container">
      <article className="post-card">
        <h1 className="post-title">{post.title}</h1>
        <p className="post-content">{post.content}</p>
      </article>

      <section className="post-card">
        <h2 style={{ marginBottom: '2rem' }}>Comments</h2>
        
        <AddCommentClient postId={post.id} />

        <hr style={{ margin: '2rem 0' }} />

        <div>
          {comments && comments.length > 0 ? (
            comments.map((comment: any) => (
              <div key={comment.id} style={{ borderBottom: '1px solid #eee', padding: '1rem 0' }}>
                <p>{comment.content}</p>
                <small style={{ color: '#666' }}>
                  Comment by: {comment.author?.username || 'Anonymous'}
                </small>
              </div>
            ))
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </div>
      </section>
    </main>
  );
}
