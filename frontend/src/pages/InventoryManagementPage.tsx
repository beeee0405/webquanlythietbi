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
import { InventoryDialog } from '../components/inventory/InventoryDialog'
import {
  inventoryOverview,
  inventoryQueue,
  inventoryStatusData,
  inventoryStatuses,
} from '../data/inventory'
import { getInventoryData, createInventorySession, updateInventorySession, deleteInventorySession } from '../services/inventoryService'
import { usePermission } from '../hooks/usePermission'
import type { InventorySession, InventoryStatus } from '../types/inventory'

function statusTone(status: InventoryStatus) {
  switch (status) {
    case 'Hoàn thành':
      return 'border-emerald-500/20 bg-emerald-500/10 text-emerald-100'
    case 'Có lệch':
      return 'border-red-500/20 bg-red-500/10 text-red-100'
    case 'Đang kiểm':
      return 'border-amber-500/20 bg-amber-500/10 text-amber-100'
  }
}

function genId() { return `inv-${Date.now()}` }

export function InventoryManagementPage() {
  const queryClient = useQueryClient()
  const { canCreate, canEdit, canDelete } = usePermission()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<InventoryStatus | 'Tất cả'>('Tất cả')

  // Dialog state
  const [dialogMode, setDialogMode] = useState<'add' | 'edit' | 'delete'>('add')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selected, setSelected] = useState<InventorySession | undefined>()

  // Local items state (layered on top of server data)
  const [localItems, setLocalItems] = useState<InventorySession[] | null>(null)

  const { data } = useQuery({
    queryKey: ['inventory-module'],
    queryFn: getInventoryData,
    staleTime: 60_000
  })

  const overview = data?.overview ?? inventoryOverview
  const statusData = data?.statusData ?? inventoryStatusData
  const serverItems = data?.items ?? inventoryQueue
  const items = localItems ?? serverItems
  const statuses = data?.statuses ?? inventoryStatuses

  // Sync localItems when server data first loads
  useMemo(() => {
    if (serverItems.length > 0 && localItems === null) {
      setLocalItems(serverItems)
    }
  }, [serverItems, localItems])

  const filteredItems = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    return items.filter(session => {
      const matchKeyword = !keyword || [session.code, session.room, session.inspector].some(value => value.toLowerCase().includes(keyword))
      const matchStatus = status === 'Tất cả' || session.status === status
      return matchKeyword && matchStatus
    })
  }, [items, query, status])

  const completedCount = filteredItems.filter(i => i.status === 'Hoàn thành').length
  const discrepancyCount = filteredItems.filter(i => i.status === 'Có lệch').length

  const openAdd = () => { setDialogMode('add'); setSelected(undefined); setDialogOpen(true) }
  const openEdit = (session: InventorySession) => { setDialogMode('edit'); setSelected(session); setDialogOpen(true) }
  const openDelete = (session: InventorySession) => { setDialogMode('delete'); setSelected(session); setDialogOpen(true) }

  const handleAdd = async (values: any) => {
    try {
      await createInventorySession({
        code: (values as any).code || `INV-${Date.now()}`,
        room: (values as any).room,
        inspector: (values as any).inspector,
        totalDevices: (values as any).totalDevices || '0',
        checkedDevices: (values as any).checkedDevices || '0',
        missingDevices: (values as any).missingDevices || '0',
        extraDevices: (values as any).extraDevices || '0',
        status: (values as any).status || 'Đang kiểm',
        startedAt: (values as any).startedAt || new Date().toISOString().split('T')[0],
        completedAt: (values as any).completedAt || '-',
        note: (values as any).note || '',
      })
      setLocalItems(null)`n queryClient.invalidateQueries({ queryKey: ['inventory-module'] })
      toast.success('Tạo đợt kiểm kê thành công')
    } catch (error) {
      console.error('Failed to create inventory:', error)
      throw error
    }
  }

  const handleEdit = async (id: string, values: any) => {
    try {
      await updateInventorySession(id, values)
      setLocalItems(null)`n queryClient.invalidateQueries({ queryKey: ['inventory-module'] })
      toast.success('Cập nhật đợt kiểm kê thành công')
    } catch (error) {
      console.error('Failed to update inventory:', error)
      throw error
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteInventorySession(id)
      setLocalItems(null)`n queryClient.invalidateQueries({ queryKey: ['inventory-module'] })
      toast.success('Xóa đợt kiểm kê thành công')
    } catch (error) {
      console.error('Failed to delete inventory:', error)
      throw error
    }
  }

  return (
    <div className="space-y-6">
      <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="glass-panel overflow-hidden p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Module 08</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Kiểm kê Thiết bị</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Quản lý các đợt kiểm kê thiết bị. Theo dõi số lượng kiểm tra, phát hiện hàng thiếu, hàng thừa và xử lý lệch lạc.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {canCreate() && <Button className="gap-2" onClick={openAdd}><Plus className="h-4 w-4" />Tạo Đợt Kiểm kê</Button>}
          </div>
        </div>
      </motion.section>

      <KpiGrid items={overview} />

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Phân bố trạng thái kiểm kê" kind="pie" data={statusData} />
        <ChartCard title="Tóm tắt kiểm kê" kind="bar" data={statusData} colors={['#f59e0b']} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <Card>
          <CardHeader>
            <CardTitle>Danh sách đợt kiểm kê</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 lg:grid-cols-[1.6fr_0.8fr_auto]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <Input value={query} onChange={event => setQuery(event.target.value)} className="pl-10" placeholder="Tìm theo mã, phòng, người kiểm..." />
              </div>
              <Select value={status} onChange={event => setStatus(event.target.value as InventoryStatus | 'Tất cả')}>
                <option>Tất cả</option>
                {statuses.map(item => <option key={item}>{item}</option>)}
              </Select>
              <Button variant="outline" className="gap-2"><Filter className="h-4 w-4" />Lọc</Button>
            </div>

            <div className="overflow-hidden rounded-[16px] border border-slate-800">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-900/80 text-slate-400">
                  <tr>
                    <th className="px-4 py-3 font-medium">Mã Đợt</th>
                    <th className="px-4 py-3 font-medium">Phòng</th>
                    <th className="px-4 py-3 font-medium">Người Kiểm</th>
                    <th className="px-4 py-3 font-medium">Tổng/Kiểm</th>
                    <th className="px-4 py-3 font-medium">Thiếu</th>
                    <th className="px-4 py-3 font-medium">Thừa</th>
                    <th className="px-4 py-3 font-medium">Trạng thái</th>
                    <th className="px-4 py-3 font-medium">Ngày Hoàn</th>
                    <th className="px-4 py-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((session: InventorySession) => (
                    <tr key={session.id} className="border-t border-slate-800/80 hover:bg-slate-900/60">
                      <td className="px-4 py-3 text-slate-200 font-mono">{session.code}</td>
                      <td className="px-4 py-3 text-slate-200">{session.room}</td>
                      <td className="px-4 py-3 text-slate-200">{session.inspector}</td>
                      <td className="px-4 py-3 text-slate-200">{session.totalDevices}/{session.checkedDevices}</td>
                      <td className="px-4 py-3 text-slate-200">{session.missingDevices}</td>
                      <td className="px-4 py-3 text-slate-200">{session.extraDevices}</td>
                      <td className="px-4 py-3">
                        <Badge className={statusTone(session.status as InventoryStatus)}>{session.status}</Badge>
                      </td>
                      <td className="px-4 py-3 text-slate-200 text-xs">{session.completedAt === '-' ? 'Đang kiểm' : session.completedAt}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          {canEdit() && <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => openEdit(session)}>
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>}
                          {canDelete() && <Button size="icon" variant="ghost" className="h-7 w-7 text-red-400 hover:text-red-300" onClick={() => openDelete(session)}>
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
                <span>Đợt hoàn thành</span>
                <span className="font-semibold text-white">{completedCount}</span>
              </div>
              <div className="flex items-center justify-between rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">
                <span>Đợt có lệch</span>
                <span className="font-semibold text-white">{discrepancyCount}</span>
              </div>
              <div className="flex items-center justify-between rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">
                <span>Tổng đợt đã lọc</span>
                <span className="font-semibold text-white">{filteredItems.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quy trình Kiểm kê</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-300">
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">1. Tạo đợt kiểm kê cho phòng, chỉ định người kiểm.</div>
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">2. Nhập số lượng kiểm tra, phát hiện hàng thiếu/thừa.</div>
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">3. Hoàn thành kiểm kê, xử lý lệch lạc và cập nhật danh sách.</div>
            </CardContent>
          </Card>
        </div>
      </section>

      <InventoryDialog
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
