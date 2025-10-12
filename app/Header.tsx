import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Header() {
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
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>Home</Link>
          <Link href="/login" style={{ textDecoration: 'none' }}>Login</Link>
          <Link href="/signup" style={{ textDecoration: 'none' }}>Cadastro</Link>
          <Link href="/logout" style={{ textDecoration: 'none', color: '#c00' }}>Sair</Link>
        </div>
      </nav>
    </header>
  );
}
