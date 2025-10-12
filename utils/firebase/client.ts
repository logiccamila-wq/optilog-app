import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// Compat imports to ensure browser-friendly auth in Next.js client bundles
import firebase from 'firebase/compat/app';

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;

const hasConfig = Boolean(apiKey && authDomain && projectId && appId);

const firebaseConfig = hasConfig ? {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
} : null;

export const app = hasConfig ? (!getApps().length ? initializeApp(firebaseConfig as any) : getApp()) : (null as any);
export const db = hasConfig ? getFirestore(app) : (null as any);