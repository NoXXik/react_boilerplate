import { cn } from '../lib/utils';

export function Card({ children, className }) {
  return <div className={cn('rounded-xl border border-slate-800 bg-slate-900/60 p-4 shadow-md backdrop-blur', className)}>{children}</div>;
}

export function CardHeader({ title, action }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-base font-semibold text-slate-100">{title}</h3>
      {action}
    </div>
  );
}

export function CardContent({ children, className }) {
  return <div className={cn('text-sm text-slate-200', className)}>{children}</div>;
}

