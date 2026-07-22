import { useMemo, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Filter, Pencil, Plus, Search, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { ChartCard } from '../components/dashboard/ChartCard'
import { KpiGrid } from '../components/dashboard/KpiGrid'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Select } from '../components/ui/select'
import { LiquidationDialog } from '../components/liquidation/LiquidationDialog'
import {
  liquidationConditionData,
  liquidationOverview,
  liquidationQueue,
  liquidationStatusData,
  liquidationStatuses,
} from '../data/liquidation'
import { getLiquidationData, createLiquidation, updateLiquidation, deleteLiquidation } from '../services/liquidationService'
import { usePermission } from '../hooks/usePermission'
import type { LiquidationItem, LiquidationStatus } from '../types/liquidation'

function statusTone(status: LiquidationStatus) {
  switch (status) {
    case 'Hoàn thành':
      return 'border-emerald-500/20 bg-emerald-500/10 text-emerald-100'
    case 'Đã duyệt':
      return 'border-blue-500/20 bg-blue-500/10 text-blue-100'
    case 'Chờ duyệt':
      return 'border-amber-500/20 bg-amber-500/10 text-amber-100'
  }
}

function genId() { return `liq-${Date.now()}` }

export function LiquidationManagementPage() {
  const queryClient = useQueryClient()
  const { canCreate, canEdit, canDelete } = usePermission()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<LiquidationStatus | 'Tất cả'>('Tất cả')

  // Dialog state
  const [dialogMode, setDialogMode] = useState<'add' | 'edit' | 'delete'>('add')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selected, setSelected] = useState<LiquidationItem | undefined>()

  // Local items state (layered on top of server data)
  const [localItems, setLocalItems] = useState<LiquidationItem[] | null>(null)

  const { data } = useQuery({
    queryKey: ['liquidation-module'],
    queryFn: getLiquidationData,
    staleTime: 60_000
  })

  const overview = data?.overview ?? liquidationOverview
  const statusData = data?.statusData ?? liquidationStatusData
  const conditionData = data?.conditionData ?? liquidationConditionData
  const serverItems = data?.items ?? liquidationQueue
  const items = localItems ?? serverItems
  const statuses = data?.statuses ?? liquidationStatuses

  // Sync localItems when server data first loads
  useMemo(() => {
    if (serverItems.length > 0 && localItems === null) {
      setLocalItems(serverItems)
    }
  }, [serverItems, localItems])

  const filteredItems = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    return items.filter(item => {
      const matchKeyword = !keyword || [item.code, item.assetCode, item.assetName, item.room].some(value => value.toLowerCase().includes(keyword))
      const matchStatus = status === 'Tất cả' || item.status === status
      return matchKeyword && matchStatus
    })
  }, [items, query, status])

  const completedCount = filteredItems.filter(i => i.status === 'Hoàn thành').length
  const pendingCount = filteredItems.filter(i => i.status === 'Chờ duyệt').length

  const openAdd = () => { setDialogMode('add'); setSelected(undefined); setDialogOpen(true) }
  const openEdit = (item: LiquidationItem) => { setDialogMode('edit'); setSelected(item); setDialogOpen(true) }
  const openDelete = (item: LiquidationItem) => { setDialogMode('delete'); setSelected(item); setDialogOpen(true) }

  const handleAdd = async (values: any) => {
    try {
      await createLiquidation({
        code: (values as any).code || `LIQ-${Date.now()}`,
        assetCode: (values as any).assetCode,
        assetName: (values as any).assetName,
        condition: (values as any).condition,
        residualValue: (values as any).residualValue,
        requester: (values as any).requester,
        room: (values as any).room,
        status: (values as any).status || 'Chờ duyệt',
        reason: (values as any).reason || '',
        approver: (values as any).approver || '-',
        requestedAt: (values as any).requestedAt || new Date().toISOString().split('T')[0],
        completedAt: (values as any).completedAt || '-',
        note: (values as any).note || '',
      })
      setLocalItems(null)
      queryClient.invalidateQueries({ queryKey: ['liquidation-module'] })
      toast.success('Tạo yêu cầu thanh lý thành công')
    } catch (error) {
      console.error('Failed to create liquidation:', error)
      throw error
    }
  }

  const handleEdit = async (id: string, values: any) => {
    try {
      await updateLiquidation(id, values)
      setLocalItems(null)
      queryClient.invalidateQueries({ queryKey: ['liquidation-module'] })
      toast.success('Cập nhật yêu cầu thanh lý thành công')
    } catch (error) {
      console.error('Failed to update liquidation:', error)
      throw error
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteLiquidation(id)
      setLocalItems(null)
      queryClient.invalidateQueries({ queryKey: ['liquidation-module'] })
      toast.success('Xóa yêu cầu thanh lý thành công')
    } catch (error) {
      console.error('Failed to delete liquidation:', error)
      throw error
    }
  }

  return (
    <div className="space-y-6">
      <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="glass-panel overflow-hidden p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Module 10</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Thanh lý Thiết bị</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Quản lý quy trình thanh lý thiết bị hỏng, lạc hậu hoặc không còn sử dụng. Duyệt yêu cầu và theo dõi giá trị còn lại.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {canCreate() && <Button className="gap-2" onClick={openAdd}><Plus className="h-4 w-4" />Yêu cầu Thanh lý</Button>}
          </div>
        </div>
      </motion.section>

      <KpiGrid items={overview} />

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Phân bố trạng thái thanh lý" kind="pie" data={statusData} />
        <ChartCard title="Phân loại tình trạng" kind="bar" data={conditionData} colors={['#ef4444']} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <Card>
          <CardHeader>
            <CardTitle>Danh sách yêu cầu thanh lý</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 lg:grid-cols-[1.6fr_0.8fr_auto]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <Input value={query} onChange={event => setQuery(event.target.value)} className="pl-10" placeholder="Tìm theo mã, asset, phòng..." />
              </div>
              <Select value={status} onChange={event => setStatus(event.target.value as LiquidationStatus | 'Tất cả')}>
                <option>Tất cả</option>
                {statuses.map(item => <option key={item}>{item}</option>)}
              </Select>
              <Button variant="outline" className="gap-2"><Filter className="h-4 w-4" />Lọc</Button>
            </div>

            <div className="overflow-hidden rounded-[16px] border border-slate-800">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-900/80 text-slate-400">
                  <tr>
                    <th className="px-4 py-3 font-medium">Mã YC</th>
                    <th className="px-4 py-3 font-medium">Thiết bị</th>
                    <th className="px-4 py-3 font-medium">Tình trạng</th>
                    <th className="px-4 py-3 font-medium">Giá trị Còn</th>
                    <th className="px-4 py-3 font-medium">Người YC</th>
                    <th className="px-4 py-3 font-medium">Trạng thái</th>
                    <th className="px-4 py-3 font-medium">Ngày Hoàn</th>
                    <th className="px-4 py-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item: LiquidationItem) => (
                    <tr key={item.id} className="border-t border-slate-800/80 hover:bg-slate-900/60">
                      <td className="px-4 py-3 text-slate-200 font-mono text-xs">{item.code}</td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-white">{item.assetName}</div>
                        <div className="text-xs text-slate-400">{item.assetCode}</div>
                      </td>
                      <td className="px-4 py-3 text-slate-200 text-xs">{item.condition}</td>
                      <td className="px-4 py-3 text-slate-200">{item.residualValue}</td>
                      <td className="px-4 py-3 text-slate-200">{item.requester}</td>
                      <td className="px-4 py-3">
                        <Badge className={statusTone(item.status as LiquidationStatus)}>{item.status}</Badge>
                      </td>
                      <td className="px-4 py-3 text-slate-200 text-xs">{item.completedAt === '-' ? 'Chưa hoàn' : item.completedAt}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          {canEdit() && <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => openEdit(item)}>
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>}
                          {canDelete() && <Button size="icon" variant="ghost" className="h-7 w-7 text-red-400 hover:text-red-300" onClick={() => openDelete(item)}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Chỉ số nhanh</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-300">
              <div className="flex items-center justify-between rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">
                <span>Thanh lý hoàn thành</span>
                <span className="font-semibold text-white">{completedCount}</span>
              </div>
              <div className="flex items-center justify-between rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">
                <span>Chờ duyệt</span>
                <span className="font-semibold text-white">{pendingCount}</span>
              </div>
              <div className="flex items-center justify-between rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">
                <span>Tổng yêu cầu đã lọc</span>
                <span className="font-semibold text-white">{filteredItems.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quy trình Thanh lý</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-300">
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">1. Tạo yêu cầu: lý do thanh lý, tình trạng thiết bị, giá trị còn lại.</div>
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">2. Duyệt: BGH xét duyệt yêu cầu, phê duyệt hoặc từ chối.</div>
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">3. Hoàn thành: xóa khỏi danh mục, lưu trữ hồ sơ thanh lý.</div>
            </CardContent>
          </Card>
        </div>
      </section>

      <LiquidationDialog
        mode={dialogMode}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        item={selected}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}
