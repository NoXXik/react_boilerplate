import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from './app/layouts/shell';
import { QueryProvider } from './app/providers/query-client';
import { ThemeProvider } from './app/providers/theme-provider';
import { ProtectedRoute } from './app/routes/protected-route';
import { DashboardPage } from './pages/dashboard/ui/dashboard-page';
import { LoginPage } from './pages/auth/ui/login-page';
import { ModulesPage } from './pages/modules/ui/modules-page';
import { ModuleTabRouter } from './pages/modules/ui/module-tab-router';
import { AccessMatrixPage } from './pages/access-matrix/ui/access-matrix-page';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <QueryProvider>
          <Routes>
            <Route path="/auth/login" element={<LoginPage />} />
            <Route
              path="/access/matrix"
              element={
                <ProtectedRoute>
                  <AppShell>
                    <AccessMatrixPage />
                  </AppShell>
                </ProtectedRoute>
              }
            />
            <Route
              path="/modules"
              element={
                <ProtectedRoute>
                  <AppShell>
                    <ModulesPage />
                  </AppShell>
                </ProtectedRoute>
              }
            />
            <Route
              path="/modules/:moduleCode/:tabCode"
              element={
                <ProtectedRoute>
                  <AppShell>
                    <ModuleTabRouter />
                  </AppShell>
                </ProtectedRoute>
              }
            />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <AppShell>
                    <DashboardPage />
                  </AppShell>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </QueryProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

