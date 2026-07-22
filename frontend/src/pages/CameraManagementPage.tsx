import { useMemo, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Filter, Pencil, Plus, Search, Trash2 } from 'lucide-react'
import { ChartCard } from '../components/dashboard/ChartCard'
import { KpiGrid } from '../components/dashboard/KpiGrid'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Select } from '../components/ui/select'
import { CameraDialog } from '../components/cameras/CameraDialog'
import { cameraOverview, cameraQueue, cameraRoomLoad, cameraStatusData, cameraStatuses } from '../data/cameras'
import { getCameraData, createCamera, updateCamera, deleteCamera } from '../services/cameraService'
import type { CameraItem, CameraStatus } from '../types/camera'
import { usePermission } from '../hooks/usePermission'

function statusTone(s: CameraStatus) {
  return s === 'Hoạt động' ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-100'
    : s === 'Lỗi' ? 'border-red-500/20 bg-red-500/10 text-red-100'
    : 'border-amber-500/20 bg-amber-500/10 text-amber-100'
}

function genId() { return `cam-${Date.now()}` }
function today() { return new Date().toLocaleDateString('vi-VN') }

export function CameraManagementPage() {
  const queryClient = useQueryClient()
  const { canCreate, canEdit, canDelete } = usePermission()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<CameraStatus | 'Tất cả'>('Tất cả')
  const [dialogMode, setDialogMode] = useState<'add' | 'edit' | 'delete'>('add')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selected, setSelected] = useState<CameraItem | undefined>()
  const [localItems, setLocalItems] = useState<CameraItem[] | null>(null)

  const { data } = useQuery({ queryKey: ['cameras-module'], queryFn: getCameraData, staleTime: 60_000 })
  const serverItems = data?.items ?? cameraQueue
  const items = localItems ?? serverItems
  const overview = data?.overview ?? cameraOverview
  const statusData = data?.statusData ?? cameraStatusData
  const roomLoad = data?.roomLoad ?? cameraRoomLoad
  const statuses = data?.statuses ?? cameraStatuses

  useMemo(() => { if (serverItems.length > 0 && localItems === null) setLocalItems(serverItems) }, [serverItems, localItems])

  const filteredItems = useMemo(() => {
    const kw = query.trim().toLowerCase()
    return items.filter(c => (!kw || [c.code, c.name, c.room, c.brand, c.model, c.ipAddress].some(v => v?.toLowerCase().includes(kw))) && (status === 'Tất cả' || c.status === status))
  }, [items, query, status])

  const openAdd = () => { setDialogMode('add'); setSelected(undefined); setDialogOpen(true) }
  const openEdit = (c: CameraItem) => { setDialogMode('edit'); setSelected(c); setDialogOpen(true) }
  const openDelete = (c: CameraItem) => { setDialogMode('delete'); setSelected(c); setDialogOpen(true) }

  const handleAdd = async (v: any) => {
    try {
      await createCamera({
        code: v.code,
        name: v.name,
        room: v.room,
        ipAddress: v.ipAddress,
        brand: v.brand,
        model: v.model ?? '',
        resolution: v.resolution,
        status: v.status,
        installedAt: v.installedAt ?? today(),
        warranty: v.warranty ?? '',
        note: v.note ?? ''
      })
      queryClient.invalidateQueries({ queryKey: ['cameras-module'] })
    } catch (error) {
      console.error('Failed to create camera:', error)
      throw error
    }
  }
  
  const handleEdit = async (id: string, v: any) => {
    try {
      await updateCamera(id, v)
      queryClient.invalidateQueries({ queryKey: ['cameras-module'] })
    } catch (error) {
      console.error('Failed to update camera:', error)
      throw error
    }
  }
  
  const handleDelete = async (id: string) => {
    try {
      await deleteCamera(id)
      queryClient.invalidateQueries({ queryKey: ['cameras-module'] })
    } catch (error) {
      console.error('Failed to delete camera:', error)
      throw error
    }
  }

  return (
    <div className="space-y-6">
      <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="glass-panel overflow-hidden p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Module 06</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Quản lý Camera</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">Theo dõi hệ thống camera an ninh: IP, model, trạng thái kết nối, bảo hành và cảnh báo.</p>
          </div>
          {canCreate() && <Button className="gap-2" onClick={openAdd}><Plus className="h-4 w-4" />Thêm camera</Button>}
        </div>
      </motion.section>

      <KpiGrid items={overview} />
      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Phân bố trạng thái camera" kind="pie" data={statusData} />
        <ChartCard title="Camera theo phòng" kind="bar" data={roomLoad} colors={['#10b981']} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <Card>
          <CardHeader><CardTitle>Danh sách camera</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 lg:grid-cols-[1.6fr_0.8fr_auto]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <Input value={query} onChange={e => setQuery(e.target.value)} className="pl-10" placeholder="Tìm theo mã, tên, IP, phòng..." />
              </div>
              <Select value={status} onChange={e => setStatus(e.target.value as CameraStatus | 'Tất cả')}>
                <option>Tất cả</option>
                {statuses.map(s => <option key={s}>{s}</option>)}
              </Select>
              <Button variant="outline" className="gap-2"><Filter className="h-4 w-4" />Lọc</Button>
            </div>
            <div className="overflow-hidden rounded-[16px] border border-slate-800">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-900/80 text-slate-400">
                  <tr>
                    <th className="px-4 py-3 font-medium">Mã</th>
                    <th className="px-4 py-3 font-medium">Camera</th>
                    <th className="px-4 py-3 font-medium">IP</th>
                    <th className="px-4 py-3 font-medium">Phòng</th>
                    <th className="px-4 py-3 font-medium">Model</th>
                    <th className="px-4 py-3 font-medium">Trạng thái</th>
                    <th className="px-4 py-3 font-medium">Bảo hành</th>
                    <th className="px-4 py-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((c: CameraItem) => (
                    <tr key={c.id} className="border-t border-slate-800/80 hover:bg-slate-900/60">
                      <td className="px-4 py-3 text-slate-200">{c.code}</td>
                      <td className="px-4 py-3"><div className="font-medium text-white">{c.name}</div><div className="text-xs text-slate-400">{c.resolution} · {c.brand}</div></td>
                      <td className="px-4 py-3 font-mono text-xs text-slate-200">{c.ipAddress}</td>
                      <td className="px-4 py-3 text-slate-200">{c.room}</td>
                      <td className="px-4 py-3 text-xs text-slate-200">{c.model}</td>
                      <td className="px-4 py-3"><Badge className={statusTone(c.status)}>{c.status}</Badge></td>
                      <td className="px-4 py-3 text-slate-200">{c.warranty}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          {canEdit() && <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => openEdit(c)}><Pencil className="h-3.5 w-3.5" /></Button>}
                          {canDelete() && <Button size="icon" variant="ghost" className="h-7 w-7 text-red-400 hover:text-red-300" onClick={() => openDelete(c)}><Trash2 className="h-3.5 w-3.5" /></Button>}
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
              <div className="flex items-center justify-between rounded-[16px] border border-slate-800 bg-slate-900/60 p-3"><span>Đang hoạt động</span><span className="font-semibold text-white">{filteredItems.filter(i => i.status === 'Hoạt động').length}</span></div>
              <div className="flex items-center justify-between rounded-[16px] border border-slate-800 bg-slate-900/60 p-3"><span>Cần xử lý</span><span className="font-semibold text-white">{filteredItems.filter(i => i.status !== 'Hoạt động').length}</span></div>
              <div className="flex items-center justify-between rounded-[16px] border border-slate-800 bg-slate-900/60 p-3"><span>Kết quả lọc</span><span className="font-semibold text-white">{filteredItems.length}</span></div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Quy trình quản lý</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-300">
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">1. Khai báo IP, mã, tên, vị trí, model camera.</div>
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">2. Theo dõi trạng thái kết nối và bảo hành.</div>
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">3. Cảnh báo khi mất tín hiệu, xử lý ngay.</div>
            </CardContent>
          </Card>
        </div>
      </section>

      <CameraDialog mode={dialogMode} open={dialogOpen} onOpenChange={setDialogOpen} camera={selected} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  )
}
