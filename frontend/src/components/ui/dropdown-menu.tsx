import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { Check, ChevronRight, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'

export const DropdownMenu = DropdownMenuPrimitive.Root
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
export const DropdownMenuGroup = DropdownMenuPrimitive.Group
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal
export const DropdownMenuSub = DropdownMenuPrimitive.Sub
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

export function DropdownMenuContent({ className, ...props }: DropdownMenuPrimitive.DropdownMenuContentProps) {
  return (
    <DropdownMenuPortal>
      <DropdownMenuPrimitive.Content className={cn('z-50 min-w-[220px] overflow-hidden rounded-[16px] border border-slate-800 bg-slate-950 p-1 text-slate-100 shadow-soft', className)} {...props} />
    </DropdownMenuPortal>
  )
}

export function DropdownMenuItem({ className, inset, ...props }: DropdownMenuPrimitive.DropdownMenuItemProps & { inset?: boolean }) {
  return <DropdownMenuPrimitive.Item className={cn('relative flex cursor-pointer select-none items-center rounded-[12px] px-3 py-2 text-sm outline-none transition hover:bg-slate-800 focus:bg-slate-800', inset && 'pl-8', className)} {...props} />
}

export function DropdownMenuCheckboxItem({ className, children, checked, ...props }: DropdownMenuPrimitive.DropdownMenuCheckboxItemProps) {
  return (
    <DropdownMenuPrimitive.CheckboxItem className={cn('relative flex cursor-pointer select-none items-center rounded-[12px] px-3 py-2 text-sm outline-none transition hover:bg-slate-800 focus:bg-slate-800', className)} checked={checked} {...props}>
      <span className="mr-2 flex h-4 w-4 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

export function DropdownMenuRadioItem({ className, children, ...props }: DropdownMenuPrimitive.DropdownMenuRadioItemProps) {
  return (
    <DropdownMenuPrimitive.RadioItem className={cn('relative flex cursor-pointer select-none items-center rounded-[12px] px-3 py-2 text-sm outline-none transition hover:bg-slate-800 focus:bg-slate-800', className)} {...props}>
      <span className="mr-2 flex h-4 w-4 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Circle className="h-3 w-3 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

export function DropdownMenuLabel({ className, inset, ...props }: DropdownMenuPrimitive.DropdownMenuLabelProps & { inset?: boolean }) {
  return <DropdownMenuPrimitive.Label className={cn('px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400', inset && 'pl-8', className)} {...props} />
}

export function DropdownMenuSeparator({ className, ...props }: DropdownMenuPrimitive.DropdownMenuSeparatorProps) {
  return <DropdownMenuPrimitive.Separator className={cn('-mx-1 my-1 h-px bg-slate-800', className)} {...props} />
}

export function DropdownMenuSubTrigger({ className, inset, children, ...props }: DropdownMenuPrimitive.DropdownMenuSubTriggerProps & { inset?: boolean }) {
  return <DropdownMenuPrimitive.SubTrigger className={cn('flex cursor-pointer select-none items-center rounded-[12px] px-3 py-2 text-sm outline-none transition hover:bg-slate-800 focus:bg-slate-800', inset && 'pl-8', className)} {...props}>{children}<ChevronRight className="ml-auto h-4 w-4" /></DropdownMenuPrimitive.SubTrigger>
}

export function DropdownMenuSubContent({ className, ...props }: DropdownMenuPrimitive.DropdownMenuSubContentProps) {
  return <DropdownMenuPrimitive.SubContent className={cn('z-50 min-w-[220px] overflow-hidden rounded-[16px] border border-slate-800 bg-slate-950 p-1 text-slate-100 shadow-soft', className)} {...props} />
}
