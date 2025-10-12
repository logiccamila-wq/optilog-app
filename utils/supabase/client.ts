import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Lazily create client only when env vars exist to avoid build-time errors
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// If envs are missing at build, export a nullable client to be handled by pages
export const supabase = (url && anon) ? createSupabaseClient(url, anon) : (null as any);
