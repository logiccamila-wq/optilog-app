import './globals.css';
import { ReactNode } from 'react';
import Header from './Header';
import Script from 'next/script';

export const metadata = {
  title: 'Optilog Blog',
  description: 'Blog com Supabase e Next.js'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js" strategy="beforeInteractive" />
        <Script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-auth-compat.js" strategy="beforeInteractive" />
        <Script id="firebase-init" strategy="beforeInteractive">
          {`
            (function(){
              try {
                var apiKey = ${JSON.stringify(process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '')};
                var authDomain = ${JSON.stringify(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '')};
                var projectId = ${JSON.stringify(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '')};
                var storageBucket = ${JSON.stringify(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '')};
                var messagingSenderId = ${JSON.stringify(process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '')};
                var appId = ${JSON.stringify(process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '')};
                var hasConfig = apiKey && authDomain && projectId && appId;
                if (typeof window !== 'undefined' && window.firebase && hasConfig) {
                  if (!window.firebase.apps || !window.firebase.apps.length) {
                    window.firebase.initializeApp({
                      apiKey: apiKey,
                      authDomain: authDomain,
                      projectId: projectId,
                      storageBucket: storageBucket,
                      messagingSenderId: messagingSenderId,
                      appId: appId,
                    });
                  }
                }
              } catch (e) {
                console && console.warn && console.warn('Falha ao inicializar Firebase via CDN:', e);
              }
            })();
          `}
        </Script>
        <Header />
        {children}
      </body>
    </html>
  );
}
