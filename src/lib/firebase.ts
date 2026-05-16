import { FIREBASE_URL, FIREBASE_TOKEN } from './constants';

export const normalizeArray = (data: any) => {
  if (!data) return [];
  if (Array.isArray(data)) return data.filter(Boolean);
  if (typeof data === 'object') return Object.values(data).filter(Boolean);
  return [];
};

export const dbGet = async (key: string) => {
  try {
    const url = `${FIREBASE_URL}/store/${key}.json${FIREBASE_TOKEN ? `?auth=${FIREBASE_TOKEN}` : ''}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Firebase network Error');
    const data = await res.json();
    if (data !== null) {
      localStorage.setItem(`sanz-cache-${key}`, JSON.stringify(data));
      return data;
    }
  } catch (err) {
    console.error(`Firebase GET Error [${key}]:`, err);
  }
  const cached = localStorage.getItem(`sanz-cache-${key}`);
  return cached ? JSON.parse(cached) : null;
};

export const dbSet = async (key: string, value: any) => {
  try {
    localStorage.setItem(`sanz-cache-${key}`, JSON.stringify(value));
    const url = `${FIREBASE_URL}/store/${key}.json${FIREBASE_TOKEN ? `?auth=${FIREBASE_TOKEN}` : ''}`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value)
    });
    return res.ok;
  } catch (err) {
    console.error(`Firebase PUT Error [${key}]:`, err);
    return false;
  }
};

export const dbPatch = async (key: string, value: any) => {
  try {
    const url = `${FIREBASE_URL}/store/${key}.json${FIREBASE_TOKEN ? `?auth=${FIREBASE_TOKEN}` : ''}`;
    const res = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value)
    });
    return res.ok;
  } catch (err) {
    console.error(`Firebase PATCH Error [${key}]:`, err);
    return false;
  }
};
