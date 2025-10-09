"use client";

import { useRouter } from 'next/navigation';
import { supabase } from '../utils/supabase/client';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <button onClick={handleLogout} style={{ background: 'gray', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>
      Logout
    </button>
  );
}
