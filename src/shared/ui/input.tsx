import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../lib/utils';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input(
  { className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={cn(
        'w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 shadow-inner transition focus:border-blue-500 focus:outline-none',
        className
      )}
      {...props}
    />
  );
});

