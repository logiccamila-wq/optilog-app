import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Create a singleton client for use in browser components
export const supabase = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
