import { createClient } from '../utils/supabase/server';
import LogoutButton from './LogoutButton';
import Link from 'next/link';

export default async function Header() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header style={{
      background: '#fff',
      padding: '1rem 2rem',
      borderBottom: '1px solid #e0e0e0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem'
    }}>
      <Link href="/" style={{ textDecoration: 'none', color: '#1c1e21', fontWeight: 'bold', fontSize: '1.2rem' }}>
        My Blog
      </Link>
      <nav>
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>{user.email}</span>
            <LogoutButton />
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link href="/login" style={{ textDecoration: 'none' }}>Login</Link>
            <Link href="/signup" style={{ textDecoration: 'none' }}>Sign Up</Link>
          </div>
        )}
      </nav>
    </header>
  );
}
