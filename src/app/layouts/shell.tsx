import type { ReactNode } from 'react';
import { BarChart3, Bell, LogOut, Moon, Sun, Users, type LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useThemeStore } from '../../shared/store/theme';
import { useAuthStore } from '../../shared/store/auth';
import { logout } from '../../shared/api/auth';
import { useAccessMatrixQuery } from '../../entities/access/hooks';
import { Button } from '../../shared/ui/button';
import { Card } from '../../shared/ui/card';
import { cn } from '../../shared/lib/utils';

type NavItem = {
  label: string;
  icon: LucideIcon;
  to?: string;
};

const navItems: NavItem[] = [
  { label: 'Обзор', icon: BarChart3, to: '/' },
  { label: 'Команда', icon: Users, to: '/modules' },
  { label: 'События', icon: Bell, to: '/' },
  { label: 'Матрица ролей', icon: Users, to: '/access/matrix' },
];

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const { mode, toggle } = useThemeStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: accessMatrix = [], isLoading: accessLoading } = useAccessMatrixQuery();

  const handleLogout = async () => {
    await logout();
    queryClient.clear();
    navigate('/auth/login', { replace: true });
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto flex max-w-6xl gap-6 px-4 py-8">
        <aside className="hidden w-60 flex-shrink-0 space-y-4 lg:block">
          <Card className="border border-slate-800/80 bg-slate-900/80 p-4">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20 text-blue-200 font-semibold">FSD</div>
              <div>
                <p className="text-sm font-semibold text-slate-100">Admin Console</p>
                <p className="text-xs text-slate-400">shadcn/ui + RQ + Zustand</p>
              </div>
            </div>
            <div className="space-y-1">
              {navItems.map((item) => (
                <SideNavItem key={item.label} label={item.label} icon={item.icon} to={item.to} />
              ))}
              <div className="mt-3 text-xs uppercase tracking-wide text-slate-500">Модули</div>
              {accessLoading ? (
                <div className="text-xs text-slate-500">Загрузка...</div>
              ) : (
                accessMatrix.map((module) => {
                  const firstTab = module.tabs[0]?.code;
                  const to = firstTab ? `/modules/${module.code}/${firstTab}` : '/modules';
                  return (
                    <NavButton
                      key={module.code}
                      label={module.name}
                      to={to}
                      icon={Users}
                      hint={module.code}
                    />
                  );
                })
              )}
            </div>
          </Card>
        </aside>
        <main className="flex-1 space-y-4">
          <header className="flex items-center justify-between gap-4 rounded-2xl border border-slate-800/80 bg-slate-900/80 px-4 py-3 shadow-lg backdrop-blur">
            <div>
              <p className="text-xs uppercase tracking-widest text-blue-300">FSD слои</p>
              <h1 className="text-xl font-semibold text-slate-50">Dashboard</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={toggle}>
                {mode === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm">
                Оповещения
              </Button>
              {user ? (
                <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-3 py-2 text-sm text-slate-100">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600/40 text-xs font-semibold text-blue-50">
                    {user.name?.slice(0, 1).toUpperCase() ?? 'U'}
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="font-medium">{user.name || 'User'}</span>
                    <span className="text-[11px] uppercase tracking-wide text-slate-400">{user.role || ''}</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={handleLogout} title="Выйти">
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : null}
              <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-500">
                Создать задачу
              </Button>
            </div>
          </header>
          {children}
        </main>
      </div>
    </div>
  );
}

type SideNavItemProps = {
  label: string;
  icon: LucideIcon;
  to?: string;
};

function SideNavItem({ label, icon: Icon, to }: SideNavItemProps) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to ?? '/')}
      className={cn(
        'flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-200 transition',
        'hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500'
      )}
      type="button"
    >
      <Icon className="h-4 w-4 text-slate-400" />
      {label}
    </button>
  );
}

type NavButtonProps = {
  label: string;
  to: string;
  icon: LucideIcon;
  hint?: string;
};

function NavButton({ label, to, icon: Icon, hint }: NavButtonProps) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      className={cn(
        'flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-slate-200 transition',
        'hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500'
      )}
      type="button"
    >
      <span className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-slate-400" />
        {label}
      </span>
      {hint ? <span className="text-[10px] uppercase text-slate-500">{hint}</span> : null}
    </button>
  );
}

