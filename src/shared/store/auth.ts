import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import type { User } from '../../entities/user/types';

export type AuthState = {
  user: User | null;
  accessToken: string | null;
  setAuth: (payload: { user: User; accessToken: string }) => void;
  setAccessToken: (token: string | null) => void;
  clear: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    immer((set) => ({
      user: null,
      accessToken: null,
      setAuth: ({ user, accessToken }) =>
        set((state) => {
          state.user = user;
          state.accessToken = accessToken;
        }),
      setAccessToken: (token) =>
        set((state) => {
          state.accessToken = token;
        }),
      clear: () =>
        set((state) => {
          state.user = null;
          state.accessToken = null;
        }),
    })),
    {
      name: 'auth',
      partialize: (state) => ({ user: state.user, accessToken: state.accessToken }),
    }
  )
);

