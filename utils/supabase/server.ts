import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Server-side client with lazy initialization to avoid build-time crashes
export const createClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If envs are missing (e.g., during Vercel build or when Supabase isn't used),
  // return a nullable client. Call sites must guard usage.
  if (!url || !anon) {
    return (null as any);
  }

  return createSupabaseClient(url, anon);
};
