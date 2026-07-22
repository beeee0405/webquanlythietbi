import { useMemo, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Filter, Pencil, Plus, ScanQrCode, Search, Trash2 } from 'lucide-react'
import { ChartCard } from '../components/dashboard/ChartCard'
import { KpiGrid } from '../components/dashboard/KpiGrid'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Select } from '../components/ui/select'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { TicketDialog } from '../components/tickets/TicketDialog'
import { ticketAgeBuckets, ticketChannelData, ticketChannels, ticketOverview, ticketPriorityData, ticketPriorities, ticketQueue, ticketSlaTrendData, ticketStatusData, ticketStatuses } from '../data/tickets'
import type { TicketItem, TicketPriority, TicketStatus } from '../types/ticket'
import { getTicketData } from '../services/ticketService'
import { usePermission } from '../hooks/usePermission'

function priorityTone(p: TicketPriority) {
  return p === 'Khẩn cấp' ? 'border-red-500/20 bg-red-500/10 text-red-100'
    : p === 'Cao' ? 'border-amber-500/20 bg-amber-500/10 text-amber-100'
    : p === 'Trung bình' ? 'border-blue-500/20 bg-blue-500/10 text-blue-100'
    : 'border-slate-500/20 bg-slate-500/10 text-slate-100'
}
function statusTone(s: TicketStatus) {
  return s === 'Mới' ? 'border-cyan-500/20 bg-cyan-500/10 text-cyan-100'
    : s === 'Đang xử lý' ? 'border-blue-500/20 bg-blue-500/10 text-blue-100'
    : s === 'Chờ phản hồi' ? 'border-amber-500/20 bg-amber-500/10 text-amber-100'
    : s === 'Hoàn thành' ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-100'
    : 'border-slate-500/20 bg-slate-500/10 text-slate-100'
}

let ticketCounter = 200
function genCode() { return `TK-${++ticketCounter}` }
function genId() { return `ticket-${Date.now()}` }
function today() { return new Date().toLocaleDateString('vi-VN') }

export function TicketManagementPage() {
  const queryClient = useQueryClient()
  const { canCreate, canEdit, canDelete } = usePermission()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<TicketStatus | 'Tất cả'>('Tất cả')
  const [priority, setPriority] = useState<TicketPriority | 'Tất cả'>('Tất cả')
  const [channel, setChannel] = useState('Tất cả')

  const [dialogMode, setDialogMode] = useState<'add' | 'edit' | 'delete'>('add')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selected, setSelected] = useState<TicketItem | undefined>()
  const [localItems, setLocalItems] = useState<TicketItem[] | null>(null)

  const { data } = useQuery({ queryKey: ['tickets-module'], queryFn: getTicketData, staleTime: 60_000 })

  const serverItems = data?.items ?? ticketQueue
  const items = localItems ?? serverItems
  const overview = data?.overview ?? ticketOverview
  const statusData = data?.statusData ?? ticketStatusData
  const priorityData = data?.priorityData ?? ticketPriorityData
  const channelData = data?.channelData ?? ticketChannelData
  const slaTrendData = data?.slaTrendData ?? ticketSlaTrendData
  const ageBuckets = data?.ageBuckets ?? ticketAgeBuckets
  const statuses = data?.statuses ?? ticketStatuses
  const priorities = data?.priorities ?? ticketPriorities
  const channels = data?.channels ?? ticketChannels

  useMemo(() => { if (serverItems.length > 0 && localItems === null) setLocalItems(serverItems) }, [serverItems, localItems])

  const filteredItems = useMemo(() => {
    const kw = query.trim().toLowerCase()
    return items.filter(t => {
      const matchKw = !kw || [t.code, t.subject, t.requester, t.room, t.device, t.category, t.assignee].some(v => v?.toLowerCase().includes(kw))
      return matchKw && (status === 'Tất cả' || t.status === status) && (priority === 'Tất cả' || t.priority === priority) && (channel === 'Tất cả' || t.channel === channel)
    })
  }, [items, query, status, priority, channel])

  const openAdd = () => { setDialogMode('add'); setSelected(undefined); setDialogOpen(true) }
  const openEdit = (t: TicketItem) => { setDialogMode('edit'); setSelected(t); setDialogOpen(true) }
  const openDelete = (t: TicketItem) => { setDialogMode('delete'); setSelected(t); setDialogOpen(true) }

  const handleAdd = (v: any) => {
    const newItem: TicketItem = { id: genId(), code: genCode(), subject: v.subject, requester: v.requester, room: v.room, device: v.device ?? '', category: v.category, priority: v.priority, status: v.status, channel: v.channel, assignee: v.assignee ?? '', sla: v.sla ?? '8h', createdAt: today(), updatedAt: today() }
    setLocalItems(prev => [newItem, ...(prev ?? serverItems)])
    queryClient.invalidateQueries({ queryKey: ['tickets-module'] })
  }
  const handleEdit = (id: string, v: any) => {
    setLocalItems(prev => (prev ?? serverItems).map(t => t.id === id ? { ...t, ...v, updatedAt: today() } : t))
    queryClient.invalidateQueries({ queryKey: ['tickets-module'] })
  }
  const handleDelete = (id: string) => {
    setLocalItems(prev => (prev ?? serverItems).filter(t => t.id !== id))
    queryClient.invalidateQueries({ queryKey: ['tickets-module'] })
  }

  const urgentCount = filteredItems.filter(t => t.priority === 'Khẩn cấp').length
  const pendingCount = filteredItems.filter(t => t.status === 'Mới' || t.status === 'Chờ phản hồi').length

  return (
    <div className="space-y-6">
      <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="glass-panel overflow-hidden p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Module 02</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Ticket hỗ trợ</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Quản lý ticket từ tiếp nhận, phân công, xử lý, phản hồi đến đóng ticket với theo dõi SLA.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {canCreate() && <Button className="gap-2" onClick={openAdd}><Plus className="h-4 w-4" />Tạo ticket</Button>}
            <Button variant="outline" className="gap-2"><ScanQrCode className="h-4 w-4" />Nhận ticket QR</Button>
          </div>
        </div>
      </motion.section>

      <KpiGrid items={overview} />

      <section className="grid gap-6 xl:grid-cols-3">
        <ChartCard title="Ticket theo trạng thái" kind="pie" data={statusData} />
        <ChartCard title="Ticket theo ưu tiên" kind="pie" data={priorityData} colors={['#ef4444','#f59e0b','#3b82f6','#64748b']} />
        <ChartCard title="Kênh tiếp nhận" kind="bar" data={channelData} colors={['#8b5cf6']} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <Card>
          <CardHeader><CardTitle>Danh sách ticket</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 lg:grid-cols-[1.6fr_0.7fr_0.7fr_0.7fr_auto]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <Input value={query} onChange={e => setQuery(e.target.value)} className="pl-10" placeholder="Tìm theo mã, tiêu đề, người báo, phòng, thiết bị..." />
              </div>
              <Select value={status} onChange={e => setStatus(e.target.value as TicketStatus | 'Tất cả')}>
                <option>Tất cả</option>
                {statuses.map(s => <option key={s}>{s}</option>)}
              </Select>
              <Select value={priority} onChange={e => setPriority(e.target.value as TicketPriority | 'Tất cả')}>
                <option>Tất cả</option>
                {priorities.map(p => <option key={p}>{p}</option>)}
              </Select>
              <Select value={channel} onChange={e => setChannel(e.target.value)}>
                <option>Tất cả</option>
                {channels.map(c => <option key={c}>{c}</option>)}
              </Select>
              <Button variant="outline" className="gap-2"><Filter className="h-4 w-4" />Lọc</Button>
            </div>

            <div className="overflow-hidden rounded-[16px] border border-slate-800">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-900/80 text-slate-400">
                  <tr>
                    <th className="px-4 py-3 font-medium">Mã</th>
                    <th className="px-4 py-3 font-medium">Ticket</th>
                    <th className="px-4 py-3 font-medium">Người báo</th>
                    <th className="px-4 py-3 font-medium">Phòng / Thiết bị</th>
                    <th className="px-4 py-3 font-medium">Ưu tiên</th>
                    <th className="px-4 py-3 font-medium">Trạng thái</th>
                    <th className="px-4 py-3 font-medium">Phân công</th>
                    <th className="px-4 py-3 font-medium">SLA</th>
                    <th className="px-4 py-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((t: TicketItem) => (
                    <tr key={t.id} className="border-t border-slate-800/80 hover:bg-slate-900/60">
                      <td className="px-4 py-3 text-slate-200">{t.code}</td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-white">{t.subject}</div>
                        <div className="text-xs text-slate-400">{t.category} · {t.channel}</div>
                      </td>
                      <td className="px-4 py-3 text-slate-200">{t.requester}</td>
                      <td className="px-4 py-3 text-slate-200">
                        <div>{t.room}</div>
                        <div className="text-xs text-slate-400">{t.device}</div>
                      </td>
                      <td className="px-4 py-3"><Badge className={priorityTone(t.priority)}>{t.priority}</Badge></td>
                      <td className="px-4 py-3"><Badge className={statusTone(t.status)}>{t.status}</Badge></td>
                      <td className="px-4 py-3 text-slate-200">{t.assignee}</td>
                      <td className="px-4 py-3 text-slate-200">{t.sla}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          {canEdit() && <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => openEdit(t)}><Pencil className="h-3.5 w-3.5" /></Button>}
                          {canDelete() && <Button size="icon" variant="ghost" className="h-7 w-7 text-red-400 hover:text-red-300" onClick={() => openDelete(t)}><Trash2 className="h-3.5 w-3.5" /></Button>}
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
                <span>Ticket khẩn cấp</span><span className="font-semibold text-white">{urgentCount}</span>
              </div>
              <div className="flex items-center justify-between rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">
                <span>Ticket chờ xử lý</span><span className="font-semibold text-white">{pendingCount}</span>
              </div>
              <div className="flex items-center justify-between rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">
                <span>Kết quả lọc</span><span className="font-semibold text-white">{filteredItems.length}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>SLA và chất lượng dịch vụ</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-300">
              {ageBuckets.map(item => (
                <div key={item.name} className="flex items-center justify-between rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">
                  <span>{item.name}</span><span className="font-semibold text-white">{item.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
          <ChartCard title="Xu hướng SLA" kind="area" data={slaTrendData} />
        </div>
      </section>

      <TicketDialog mode={dialogMode} open={dialogOpen} onOpenChange={setDialogOpen} item={selected} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  )
}
