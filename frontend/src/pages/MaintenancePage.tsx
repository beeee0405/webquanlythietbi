import { useMemo, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowUp, CalendarClock, Filter, Pencil, Plus, Search, Trash2 } from 'lucide-react'
import { ChartCard } from '../components/dashboard/ChartCard'
import { KpiGrid } from '../components/dashboard/KpiGrid'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Select } from '../components/ui/select'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { MaintenanceDialog } from '../components/maintenance/MaintenanceDialog'
import { maintenanceBudgetData, maintenanceOverview, maintenancePriorities, maintenanceQueue, maintenanceStatuses, maintenanceStatusData, maintenanceTrendData, maintenanceTypes, maintenanceTypeData } from '../data/maintenance'
import type { MaintenanceItem, MaintenancePriority, MaintenanceStatus, MaintenanceType } from '../types/maintenance'
import { getMaintenanceData, createMaintenance, updateMaintenance, deleteMaintenance } from '../services/maintenanceService'
import { usePermission } from '../hooks/usePermission'

function priorityTone(p: MaintenancePriority) {
  return p === 'Khẩn cấp' ? 'border-red-500/20 bg-red-500/10 text-red-100'
    : p === 'Cao' ? 'border-amber-500/20 bg-amber-500/10 text-amber-100'
    : p === 'Trung bình' ? 'border-blue-500/20 bg-blue-500/10 text-blue-100'
    : 'border-slate-500/20 bg-slate-500/10 text-slate-100'
}
function statusTone(s: MaintenanceStatus) {
  return s === 'Chờ duyệt' ? 'border-cyan-500/20 bg-cyan-500/10 text-cyan-100'
    : s === 'Đang thực hiện' ? 'border-blue-500/20 bg-blue-500/10 text-blue-100'
    : s === 'Hoàn thành' ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-100'
    : 'border-zinc-500/20 bg-zinc-500/10 text-zinc-100'
}

let mCounter = 300
function genCode() { return `BT-${++mCounter}` }
function genId() { return `mt-${Date.now()}` }

export function MaintenancePage() {
  const queryClient = useQueryClient()
  const { canCreate, canEdit, canDelete } = usePermission()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<MaintenanceStatus | 'Tất cả'>('Tất cả')
  const [priority, setPriority] = useState<MaintenancePriority | 'Tất cả'>('Tất cả')
  const [type, setType] = useState<MaintenanceType | 'Tất cả'>('Tất cả')
  const [sortConfig, setSortConfig] = useState<{ key: keyof MaintenanceItem; direction: 'ascending' | 'descending' } | null>(null)

  const [dialogMode, setDialogMode] = useState<'add' | 'edit' | 'delete'>('add')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selected, setSelected] = useState<MaintenanceItem | undefined>()
  const [localItems, setLocalItems] = useState<MaintenanceItem[] | null>(null)

  const { data } = useQuery({ queryKey: ['maintenance-module'], queryFn: getMaintenanceData, staleTime: 60_000 })

  const serverItems = data?.items ?? maintenanceQueue
  const items = localItems ?? serverItems
  const overview = data?.overview ?? maintenanceOverview
  const statusData = data?.statusData ?? maintenanceStatusData
  const typeData = data?.typeData ?? maintenanceTypeData
  const trendData = data?.trendData ?? maintenanceTrendData
  const budgetData = data?.budgetData ?? maintenanceBudgetData
  const statuses = data?.statuses ?? maintenanceStatuses
  const priorities = data?.priorities ?? maintenancePriorities
  const types = data?.types ?? maintenanceTypes

  useMemo(() => { if (serverItems.length > 0 && localItems === null) setLocalItems(serverItems) }, [serverItems, localItems])

  const filteredItems = useMemo(() => {
    const kw = query.trim().toLowerCase()
    return items.filter(i => {
      const matchKw = !kw || [i.code, i.title, i.assetCode, i.assetName, i.room, i.assignee, i.note].some(v => v?.toLowerCase().includes(kw))
      return matchKw && (status === 'Tất cả' || i.status === status) && (priority === 'Tất cả' || i.priority === priority) && (type === 'Tất cả' || i.type === type)
    })
  }, [items, query, status, priority, type])

  const sortedItems = useMemo(() => {
    if (!sortConfig) return filteredItems
    return [...filteredItems].sort((a, b) => {
      const dir = sortConfig.direction === 'ascending' ? 1 : -1
      return a[sortConfig.key] < b[sortConfig.key] ? -dir : a[sortConfig.key] > b[sortConfig.key] ? dir : 0
    })
  }, [filteredItems, sortConfig])

  const requestSort = (key: keyof MaintenanceItem) => {
    setSortConfig(prev => ({ key, direction: prev?.key === key && prev.direction === 'ascending' ? 'descending' : 'ascending' }))
  }
  const SortIcon = ({ k }: { k: keyof MaintenanceItem }) => sortConfig?.key === k
    ? sortConfig.direction === 'ascending' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
    : null

  const openAdd = () => { setDialogMode('add'); setSelected(undefined); setDialogOpen(true) }
  const openEdit = (i: MaintenanceItem) => { setDialogMode('edit'); setSelected(i); setDialogOpen(true) }
  const openDelete = (i: MaintenanceItem) => { setDialogMode('delete'); setSelected(i); setDialogOpen(true) }

  const handleAdd = async (v: any) => {
    try {
      await createMaintenance({
        title: v.title,
        assetCode: v.assetCode,
        assetName: v.assetName,
        room: v.room,
        type: v.type,
        priority: v.priority,
        status: v.status,
        assignee: v.assignee,
        scheduledAt: v.scheduledAt,
        cost: v.cost ?? '0',
        note: v.note ?? ''
      })
      setLocalItems(null)
      queryClient.invalidateQueries({ queryKey: ['maintenance-module'] })
    } catch (error) {
      console.error('Failed to create maintenance:', error)
      throw error
    }
  }
  
  const handleEdit = async (id: string, v: any) => {
    try {
      await updateMaintenance(id, v)
      setLocalItems(null)
      queryClient.invalidateQueries({ queryKey: ['maintenance-module'] })
    } catch (error) {
      console.error('Failed to update maintenance:', error)
      throw error
    }
  }
  
  const handleDelete = async (id: string) => {
    try {
      await deleteMaintenance(id)
      setLocalItems(null)
      queryClient.invalidateQueries({ queryKey: ['maintenance-module'] })
    } catch (error) {
      console.error('Failed to delete maintenance:', error)
      throw error
    }
  }

  const dueSoonCount = items.filter(i => i.status !== 'Hoàn thành').length
  const completedCount = items.filter(i => i.status === 'Hoàn thành').length

  return (
    <div className="space-y-6">
      <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="glass-panel overflow-hidden p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Module 03</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Bảo trì</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Quản lý kế hoạch bảo trì, chi phí và lịch bảo trì theo tài sản và phòng.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {canCreate() && <Button className="gap-2" onClick={openAdd}><Plus className="h-4 w-4" />Tạo phiếu bảo trì</Button>}
            <Button variant="outline" className="gap-2"><CalendarClock className="h-4 w-4" />Lịch tuần này</Button>
          </div>
        </div>
      </motion.section>

      <KpiGrid items={overview} />

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Phiếu bảo trì theo trạng thái" kind="pie" data={statusData} />
        <ChartCard title="Phiếu bảo trì theo loại" kind="pie" data={typeData} colors={['#3b82f6','#10b981','#f59e0b','#8b5cf6']} />
      </section>
      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Xu hướng số phiếu bảo trì" kind="line" data={trendData} />
        <ChartCard title="Ngân sách bảo trì" kind="area" data={budgetData} colors={['#f97316']} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <Card>
          <CardHeader><CardTitle>Danh sách phiếu bảo trì</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 lg:grid-cols-[1.6fr_0.7fr_0.7fr_0.7fr_auto]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <Input value={query} onChange={e => setQuery(e.target.value)} className="pl-10" placeholder="Tìm theo mã, tiêu đề, asset, phòng, người phụ trách..." />
              </div>
              <Select value={status} onChange={e => setStatus(e.target.value as MaintenanceStatus | 'Tất cả')}>
                <option>Tất cả</option>
                {statuses.map(s => <option key={s}>{s}</option>)}
              </Select>
              <Select value={priority} onChange={e => setPriority(e.target.value as MaintenancePriority | 'Tất cả')}>
                <option>Tất cả</option>
                {priorities.map(p => <option key={p}>{p}</option>)}
              </Select>
              <Select value={type} onChange={e => setType(e.target.value as MaintenanceType | 'Tất cả')}>
                <option>Tất cả</option>
                {types.map(t => <option key={t}>{t}</option>)}
              </Select>
              <Button variant="outline" className="gap-2"><Filter className="h-4 w-4" />Lọc</Button>
            </div>

            <div className="overflow-hidden rounded-[16px] border border-slate-800">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-900/80 text-slate-400">
                  <tr>
                    {(['code','title','assetCode','room','type','priority','status','assignee'] as (keyof MaintenanceItem)[]).map(k => (
                      <th key={k} className="px-4 py-3 font-medium">
                        <button type="button" onClick={() => requestSort(k)} className="flex items-center gap-1 hover:text-white capitalize">
                          {k === 'code' ? 'Mã' : k === 'title' ? 'Phiếu' : k === 'assetCode' ? 'Thiết bị' : k === 'room' ? 'Phòng' : k === 'type' ? 'Loại' : k === 'priority' ? 'Ưu tiên' : k === 'status' ? 'Trạng thái' : 'Phụ trách'}
                          <SortIcon k={k} />
                        </button>
                      </th>
                    ))}
                    <th className="px-4 py-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {sortedItems.map((item: MaintenanceItem) => (
                    <tr key={item.id} className="border-t border-slate-800/80 hover:bg-slate-900/60">
                      <td className="px-4 py-3 text-slate-200">{item.code}</td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-white">{item.title}</div>
                        <div className="text-xs text-slate-400">{item.note}</div>
                      </td>
                      <td className="px-4 py-3 text-slate-200">
                        <div>{item.assetCode}</div>
                        <div className="text-xs text-slate-400">{item.assetName}</div>
                      </td>
                      <td className="px-4 py-3 text-slate-200">{item.room}</td>
                      <td className="px-4 py-3 text-slate-200">{item.type}</td>
                      <td className="px-4 py-3"><Badge className={priorityTone(item.priority)}>{item.priority}</Badge></td>
                      <td className="px-4 py-3"><Badge className={statusTone(item.status)}>{item.status}</Badge></td>
                      <td className="px-4 py-3 text-slate-200">
                        <div>{item.assignee}</div>
                        <div className="text-xs text-slate-400">{item.scheduledAt}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          {canEdit() && <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => openEdit(item)}><Pencil className="h-3.5 w-3.5" /></Button>}
                          {canDelete() && <Button size="icon" variant="ghost" className="h-7 w-7 text-red-400 hover:text-red-300" onClick={() => openDelete(item)}><Trash2 className="h-3.5 w-3.5" /></Button>}
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
            <CardHeader><CardTitle>Chỉ số nhanh</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-300">
              <div className="flex items-center justify-between rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">
                <span>Công việc sắp tới</span><span className="font-semibold text-white">{dueSoonCount}</span>
              </div>
              <div className="flex items-center justify-between rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">
                <span>Đã hoàn thành</span><span className="font-semibold text-white">{completedCount}</span>
              </div>
              <div className="flex items-center justify-between rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">
                <span>Kết quả lọc</span><span className="font-semibold text-white">{filteredItems.length}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Quy trình bảo trì</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-300">
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">1. Tiếp nhận sự cố hoặc lên lịch bảo trì định kỳ.</div>
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">2. Phân công kỹ thuật viên, chuẩn bị vật tư và thời gian dừng.</div>
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">3. Thực hiện, nghiệm thu, ghi nhận chi phí và cập nhật lịch sử.</div>
            </CardContent>
          </Card>
        </div>
      </section>

      <MaintenanceDialog mode={dialogMode} open={dialogOpen} onOpenChange={setDialogOpen} item={selected} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  )
}
