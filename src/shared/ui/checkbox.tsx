import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../lib/utils';

export const Checkbox = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Checkbox(
  { className, ...props },
  ref
) {
  return (
    <input
      type="checkbox"
      ref={ref}
      className={cn(
        'h-4 w-4 rounded border border-slate-600 bg-slate-900 text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0',
        className
      )}
      {...props}
    />
  );
});

