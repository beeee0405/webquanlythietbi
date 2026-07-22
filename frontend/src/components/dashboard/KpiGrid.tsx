import { motion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { Card } from '../ui/card'
import { cn } from '../../lib/cn'
import type { KPIItem } from '../../types/dashboard'

const toneOrder = ['primary', 'emerald', 'amber', 'zinc'] as const

const toneMap = {
  primary: 'border-blue-500/20 bg-blue-500/10 text-blue-100',
  emerald: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-100',
  amber: 'border-amber-500/20 bg-amber-500/10 text-amber-100',
  zinc: 'border-zinc-500/20 bg-zinc-500/10 text-zinc-100'
} as const

type Props = {
  items: KPIItem[]
}

export function KpiGrid({ items }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item, index) => (
        <motion.div key={item.label} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: index * 0.06 }}>
          <Card className={cn('border', toneMap[item.tone ?? toneOrder[index % toneOrder.length]])}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-slate-300">{item.label}</p>
                <div className="mt-2 text-3xl font-bold tracking-tight text-white">{item.value}</div>
              </div>
              <div className="rounded-[14px] border border-white/10 bg-white/5 p-2 text-white/80">
                {item.delta.startsWith('-') ? <ArrowDownRight className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
              </div>
            </div>
            <div className="mt-4 text-sm text-slate-300">{item.delta} so với kỳ trước</div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
