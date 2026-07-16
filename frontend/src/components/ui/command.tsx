import * as React from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Command({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('overflow-hidden rounded-[16px] border border-slate-800 bg-slate-950 shadow-soft', className)} {...props} />
}

export function CommandInput({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex items-center gap-2 border-b border-slate-800 px-3 py-2">
      <Search className="h-4 w-4 text-slate-400" />
      <input className={cn('flex h-10 w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500', className)} {...props} />
    </div>
  )
}

export function CommandList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('max-h-[280px] overflow-y-auto p-2', className)} {...props} />
}

export function CommandGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mb-2', className)} {...props} />
}

export function CommandItem({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn('flex w-full items-center rounded-[12px] px-3 py-2 text-left text-sm text-slate-200 transition hover:bg-slate-800', className)} {...props} />
}
