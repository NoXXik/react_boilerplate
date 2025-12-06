// No import of RequestInit from 'react'—use the built-in type.
import { useAuthStore } from '../store/auth';
import type { User } from '../../entities/user/types';

const API_URL = 'http://localhost:3000';

type FetchOptions = RequestInit & { skipAuth?: boolean };

export async function apiFetch<T>(path: string, options: FetchOptions = {}, retry = true): Promise<T> {
  const { accessToken, setAccessToken, clear, user } = useAuthStore.getState();
  const headers = new Headers(options.headers);

  if (!headers.has('Content-Type') && options.body && typeof options.body === 'string') {
    headers.set('Content-Type', 'application/json');
  }
  if (accessToken && !options.skipAuth) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  const response = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    ...options,
    headers,
  });

  if (response.status === 401 && !options.skipAuth && retry) {
    const refreshed = await attemptRefresh(user ?? null, setAccessToken);
    if (refreshed) {
      return apiFetch<T>(path, options, false);
    }
    clear();
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || response.statusText);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

async function attemptRefresh(currentUser: User | null, setAccessToken: (token: string | null) => void) {
  try {
    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });
    if (!res.ok) return false;
    const raw = (await res.json()) as { data?: { accessToken: string; user?: User }; accessToken?: string; user?: User };
    const payload = raw.data ?? raw;
    if (payload?.accessToken) {
      const fallbackUser = currentUser ?? payload.user ?? null;
      if (fallbackUser) {
        useAuthStore.getState().setAuth({
          accessToken: payload.accessToken,
          user: payload.user ?? fallbackUser,
        });
      } else {
        setAccessToken(payload.accessToken);
      }
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

