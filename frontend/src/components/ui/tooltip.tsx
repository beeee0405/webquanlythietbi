import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cn } from '@/lib/utils'

export const Tooltip = TooltipPrimitive.Root
export const TooltipTrigger = TooltipPrimitive.Trigger

export function TooltipContent({ className, ...props }: TooltipPrimitive.TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content className={cn('z-50 rounded-[12px] border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-100 shadow-soft', className)} {...props} />
    </TooltipPrimitive.Portal>
  )
}
