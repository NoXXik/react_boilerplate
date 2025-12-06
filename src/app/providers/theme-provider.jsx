import { useEffect } from 'react';
import { useThemeStore } from '../../shared/store/theme';

export function ThemeProvider({ children }) {
  const { mode } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark');
  }, [mode]);

  return children;
}

