import * as PopoverPrimitive from '@radix-ui/react-popover'
import { cn } from '@/lib/utils'

export const Popover = PopoverPrimitive.Root
export const PopoverTrigger = PopoverPrimitive.Trigger

export function PopoverContent({ className, ...props }: PopoverPrimitive.PopoverContentProps) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content className={cn('z-50 rounded-[16px] border border-slate-800 bg-slate-950 p-3 shadow-soft', className)} {...props} />
    </PopoverPrimitive.Portal>
  )
}
