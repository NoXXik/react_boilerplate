import { create } from 'zustand';

type ThemeState = {
  mode: 'dark' | 'light';
  toggle: () => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  mode: 'dark',
  toggle: () =>
    set((state) => ({
      mode: state.mode === 'dark' ? 'light' : 'dark',
    })),
}));

