import { forwardRef } from 'react';
import { cn } from '../lib/utils';

export const Select = forwardRef(function Select({ className, children, ...props }, ref) {
  return (
    <select
      ref={ref}
      className={cn(
        'w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 shadow-inner transition focus:border-blue-500 focus:outline-none',
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
});

