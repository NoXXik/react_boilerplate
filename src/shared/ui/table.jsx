import { cn } from '../lib/utils';

export function Table({ className, children }) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-800 shadow-lg">
      <table className={cn('w-full border-collapse bg-slate-900/50 text-sm text-slate-100', className)}>{children}</table>
    </div>
  );
}

export function TableHeader({ children }) {
  return <thead className="bg-slate-900/70 text-xs uppercase tracking-wide text-slate-400">{children}</thead>;
}

export function TableBody({ children }) {
  return <tbody className="divide-y divide-slate-800">{children}</tbody>;
}

export function TableRow({ children }) {
  return <tr className="transition hover:bg-slate-800/60">{children}</tr>;
}

export function TableHead({ className, children }) {
  return <th className={cn('px-4 py-3 text-left font-semibold', className)}>{children}</th>;
}

export function TableCell({ className, children }) {
  return <td className={cn('px-4 py-3 align-middle', className)}>{children}</td>;
}

