import { Fragment, useEffect, type ReactElement, type ReactNode } from 'react';
import { useThemeStore } from '../../shared/store/theme';

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps): ReactElement {
  const { mode } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark');
  }, [mode]);

  return <Fragment>{children}</Fragment>;
}

