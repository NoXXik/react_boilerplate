import { create } from 'zustand';

export const useThemeStore = create((set) => ({
  mode: 'dark',
  toggle: () =>
    set((state) => ({
      mode: state.mode === 'dark' ? 'light' : 'dark',
    })),
}));

