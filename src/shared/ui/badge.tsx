import { type ReactNode } from 'react';
import { cn } from '../lib/utils';

type Tone = 'success' | 'warning' | 'info' | 'neutral';

const colorMap: Record<Tone, string> = {
  success: 'bg-emerald-500/15 text-emerald-200 border border-emerald-600/50',
  warning: 'bg-amber-500/15 text-amber-100 border border-amber-500/50',
  info: 'bg-blue-500/10 text-blue-100 border border-blue-500/40',
  neutral: 'bg-slate-700/40 text-slate-100 border border-slate-600/50',
};

type BadgeProps = {
  children: ReactNode;
  tone?: Tone;
  className?: string;
};

export function Badge({ children, tone = 'neutral', className }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center rounded-full px-3 py-1 text-xs font-medium', colorMap[tone], className)}>
      {children}
    </span>
  );
}

