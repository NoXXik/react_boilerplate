import type { ReactNode } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogPortal = DialogPrimitive.Portal;

type OverlayProps = DialogPrimitive.DialogOverlayProps;
type ContentProps = DialogPrimitive.DialogContentProps & {
  children: ReactNode;
};

export function DialogOverlay({ className, ...props }: OverlayProps) {
  return (
    <DialogPrimitive.Overlay
      className={cn('fixed inset-0 z-40 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out', className)}
      {...props}
    />
  );
}

export function DialogContent({ className, children, ...props }: ContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cn(
          'fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out',
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-full p-1 text-slate-400 transition hover:bg-slate-800 hover:text-slate-100">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

type DialogHeaderProps = {
  title: ReactNode;
  description?: ReactNode;
};

export function DialogHeader({ title, description }: DialogHeaderProps) {
  return (
    <div className="mb-4 space-y-2">
      <h3 className="text-lg font-semibold text-slate-50">{title}</h3>
      {description ? <p className="text-sm text-slate-300">{description}</p> : null}
    </div>
  );
}

