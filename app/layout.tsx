import './globals.css';
import Header from './Header';

export const metadata = {
  title: 'My Blog',
  description: 'A blog powered by Next.js and Supabase',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}