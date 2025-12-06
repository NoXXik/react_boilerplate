import type { ReactNode } from 'react';
import { cn } from '../lib/utils';

type TableBaseProps = {
  children: ReactNode;
  className?: string;
};

export function Table({ className, children }: TableBaseProps) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-800 shadow-lg">
      <table className={cn('w-full border-collapse bg-slate-900/50 text-sm text-slate-100', className)}>{children}</table>
    </div>
  );
}

export function TableHeader({ children, className }: TableBaseProps) {
  return <thead className={cn('bg-slate-900/70 text-xs uppercase tracking-wide text-slate-400', className)}>{children}</thead>;
}

export function TableBody({ children, className }: TableBaseProps) {
  return <tbody className={cn('divide-y divide-slate-800', className)}>{children}</tbody>;
}

export function TableRow({ children, className }: TableBaseProps) {
  return <tr className={cn('transition hover:bg-slate-800/60', className)}>{children}</tr>;
}

export function TableHead({ className, children }: TableBaseProps) {
  return <th className={cn('px-4 py-3 text-left font-semibold', className)}>{children}</th>;
}

export function TableCell({ className, children }: TableBaseProps) {
  return <td className={cn('px-4 py-3 align-middle', className)}>{children}</td>;
}

