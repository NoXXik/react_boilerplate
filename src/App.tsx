import { AppShell } from './app/layouts/shell';
import { QueryProvider } from './app/providers/query-client';
import { ThemeProvider } from './app/providers/theme-provider';
import { DashboardPage } from './pages/dashboard/ui/dashboard-page';

function App() {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AppShell>
          <DashboardPage />
        </AppShell>
      </QueryProvider>
    </ThemeProvider>
  );
}

export default App;

