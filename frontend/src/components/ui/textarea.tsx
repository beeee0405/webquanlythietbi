import * as React from 'react'
import { cn } from '@/lib/utils'

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-[110px] w-full rounded-[16px] border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 shadow-sm outline-none transition focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/30 placeholder:text-slate-500',
        className
      )}
      {...props}
    />
  )
)
Textarea.displayName = 'Textarea'
