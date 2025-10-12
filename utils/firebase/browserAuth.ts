// Lightweight wrappers around Firebase Auth loaded via CDN (compat)
// This avoids bundling Node-only dependencies that break Next.js builds in certain environments.

declare global {
  interface Window { firebase: any }
}

export function isFirebaseReady(): boolean {
  return typeof window !== 'undefined' && !!window.firebase && !!window.firebase.apps && window.firebase.apps.length > 0;
}

export async function signIn(email: string, password: string) {
  if (!isFirebaseReady()) throw new Error('Firebase não configurado. Preencha NEXT_PUBLIC_FIREBASE_*');
  const auth = window.firebase.auth();
  return auth.signInWithEmailAndPassword(email, password);
}

export async function signUp(email: string, password: string, name?: string) {
  if (!isFirebaseReady()) throw new Error('Firebase não configurado. Preencha NEXT_PUBLIC_FIREBASE_*');
  const auth = window.firebase.auth();
  const cred = await auth.createUserWithEmailAndPassword(email, password);
  if (name) {
    await cred.user.updateProfile({ displayName: name });
  }
  return cred;
}

export async function logout() {
  if (!isFirebaseReady()) return;
  const auth = window.firebase.auth();
  return auth.signOut();
}