import { db } from '@/utils/firebase/client';
import { collection, getDocs, query, where, limit, orderBy, startAfter } from 'firebase/firestore';

const API_URL = process.env.NEXT_PUBLIC_POSTS_API_URL;

export type Post = {
  id: string;
  slug: string;
  title: string;
  content: string;
  is_published: boolean;
  author_id?: string | null;
};

const demoPosts: Post[] = [
  {
    id: 'demo-1',
    slug: 'boas-vindas',
    title: 'Boas-vindas ao Optilog!',
    content: 'Esta é uma postagem de demonstração exibida quando o Firebase não está configurado.',
    is_published: true,
    author_id: 'demo-user'
  },
  {
    id: 'demo-2',
    slug: 'como-configurar',
    title: 'Como configurar sua fonte de dados',
    content: 'Defina as variáveis NEXT_PUBLIC_FIREBASE_* para integrar seu backend Firestore.',
    is_published: true,
    author_id: 'demo-user'
  }
];

export async function getPosts(): Promise<Post[]> {
  // 1) Tenta API externa, se definida
  if (API_URL) {
    try {
      const res = await fetch(`${API_URL.replace(/\/$/, '')}/posts`, { cache: 'no-store' });
      if (!res.ok) throw new Error(`Falha na API externa: ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        return data.map((p: any) => ({
          id: p.id ?? p._id ?? p.slug ?? Math.random().toString(36).slice(2),
          slug: p.slug ?? String(p.id ?? p._id ?? ''),
          title: p.title ?? 'Sem título',
          content: p.content ?? p.description ?? '',
          is_published: Boolean(p.is_published ?? p.published ?? true),
          author_id: p.author_id ?? p.authorId ?? null,
        })) as Post[];
      }
    } catch (e) {
      // Continua para Firestore/demo
      console.warn('Erro ao buscar API externa, usando fallback:', e);
    }
  }

  // 2) Tenta Firestore, se configurado
  if (db) {
    const snap = await getDocs(collection(db, 'posts'));
    return snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })) as Post[];
  }

  // 3) Fallback demo
  return demoPosts;
}

export async function getPost(slug: string): Promise<Post | null> {
  // 1) Tenta API externa
  if (API_URL) {
    try {
      const base = API_URL.replace(/\/$/, '');
      // Primeiro tenta rota REST por slug; se falhar, tenta query
      let res = await fetch(`${base}/posts/${encodeURIComponent(slug)}`, { cache: 'no-store' });
      if (!res.ok) {
        res = await fetch(`${base}/posts?slug=${encodeURIComponent(slug)}`, { cache: 'no-store' });
      }
      if (res.ok) {
        const data = await res.json();
        const p = Array.isArray(data) ? data[0] : data;
        if (p) {
          return {
            id: p.id ?? p._id ?? slug,
            slug: p.slug ?? slug,
            title: p.title ?? 'Sem título',
            content: p.content ?? p.description ?? '',
            is_published: Boolean(p.is_published ?? p.published ?? true),
            author_id: p.author_id ?? p.authorId ?? null,
          } as Post;
        }
      }
    } catch (e) {
      console.warn('Erro ao buscar post na API externa, usando fallback:', e);
    }
  }

  // 2) Tenta Firestore
  if (db) {
    const q = query(collection(db, 'posts'), where('slug', '==', slug), limit(1));
    const snap = await getDocs(q);
    if (snap.empty) return null;
    const doc = snap.docs[0];
    return { id: doc.id, ...(doc.data() as any) } as Post;
  }

  // 3) Fallback demo
  return demoPosts.find(p => p.slug === slug) || null;
}

export async function getPostsPage(pageSize: number, afterSlug?: string): Promise<Post[]> {
  // 1) Tenta API externa com parâmetros de paginação
  if (API_URL) {
    try {
      const base = API_URL.replace(/\/$/, '');
      const url = `${base}/posts?limit=${encodeURIComponent(pageSize)}${afterSlug ? `&after=${encodeURIComponent(afterSlug)}` : ''}`;
      const res = await fetch(url, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          return data.map((p: any) => ({
            id: p.id ?? p._id ?? p.slug ?? Math.random().toString(36).slice(2),
            slug: p.slug ?? String(p.id ?? p._id ?? ''),
            title: p.title ?? 'Sem título',
            content: p.content ?? p.description ?? '',
            is_published: Boolean(p.is_published ?? p.published ?? true),
            author_id: p.author_id ?? p.authorId ?? null,
          })) as Post[];
        }
      }
    } catch (e) {
      console.warn('Erro na API externa (paginaçao), usando fallback:', e);
    }
  }

  // 2) Firestore com orderBy('slug') e startAfter
  if (db) {
    const q = afterSlug
      ? query(collection(db, 'posts'), orderBy('slug'), startAfter(afterSlug), limit(pageSize))
      : query(collection(db, 'posts'), orderBy('slug'), limit(pageSize));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })) as Post[];
  }

  // 3) Fallback demo com paginação baseada em slug
  const sorted = [...demoPosts].sort((a, b) => a.slug.localeCompare(b.slug));
  let startIndex = 0;
  if (afterSlug) {
    const idx = sorted.findIndex(p => p.slug === afterSlug);
    startIndex = idx >= 0 ? idx + 1 : 0;
  }
  return sorted.slice(startIndex, startIndex + pageSize);
}