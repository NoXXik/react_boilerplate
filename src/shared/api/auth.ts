import type { User } from '../../entities/user/types';
import { useAuthStore } from '../store/auth';
import { apiFetch } from './http';

export type LoginDto = {
  email: string;
  password: string;
};

type Envelope<T> = {
  success: boolean;
  message?: string;
  error?: unknown;
  data: T;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken?: string;
  user: User;
};

function normalizeUser(raw: any): User {
  return {
    id: raw?.id ?? '',
    email: raw?.email ?? '',
    name: raw?.name ?? '',
    role: raw?.role ?? '',
  };
}

function normalizeAuth(data: any): AuthResponse {
  const payload = data?.data ?? data ?? {};
  return {
    accessToken: payload.accessToken,
    refreshToken: payload.refreshToken,
    user: normalizeUser(payload.user),
  };
}

export async function login(dto: LoginDto): Promise<AuthResponse> {
  const data = await apiFetch<Envelope<AuthResponse> | AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(dto),
    credentials: 'include',
    skipAuth: true,
  });
  const normalized = normalizeAuth(data);
  useAuthStore.getState().setAuth({ accessToken: normalized.accessToken, user: normalized.user });
  return normalized;
}

export async function refresh(): Promise<AuthResponse> {
  const data = await apiFetch<Envelope<AuthResponse> | AuthResponse>('/auth/refresh', {
    method: 'POST',
    credentials: 'include',
    skipAuth: true,
  });
  const normalized = normalizeAuth(data);
  useAuthStore.getState().setAuth({ accessToken: normalized.accessToken, user: normalized.user });
  return normalized;
}

export async function logout() {
  try {
    await apiFetch('/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
  } catch (e) {
    // игнорируем сетевые/401 при выходе
  } finally {
    useAuthStore.getState().clear();
  }
}

