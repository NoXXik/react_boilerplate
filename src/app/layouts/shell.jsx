import { Fragment } from 'react';
import { BarChart3, Bell, Moon, Sun, Users } from 'lucide-react';
import { useThemeStore } from '../../shared/store/theme';
import { Button } from '../../shared/ui/button';
import { Card } from '../../shared/ui/card';
import { cn } from '../../shared/lib/utils';

const navItems = [
  { label: 'Обзор', icon: BarChart3 },
  { label: 'Команда', icon: Users },
  { label: 'События', icon: Bell },
];

export function AppShell({ children }) {
  const { mode, toggle } = useThemeStore();

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
                <SideNavItem key={item.label} label={item.label} icon={item.icon} />
              ))}
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

function SideNavItem({ label, icon: Icon }) {
  return (
    <button
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

