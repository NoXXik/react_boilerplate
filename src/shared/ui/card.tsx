import type { ReactNode } from 'react';
import { cn } from '../lib/utils';

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return <div className={cn('rounded-xl border border-slate-800 bg-slate-900/60 p-4 shadow-md backdrop-blur', className)}>{children}</div>;
}

type CardHeaderProps = {
  title: ReactNode;
  action?: ReactNode;
};

export function CardHeader({ title, action }: CardHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-base font-semibold text-slate-100">{title}</h3>
      {action}
    </div>
  );
}

type CardContentProps = {
  children: ReactNode;
  className?: string;
};

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn('text-sm text-slate-200', className)}>{children}</div>;
}

