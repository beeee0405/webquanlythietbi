import { useMemo, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { ClipboardCheck, Filter, Pencil, Plus, Search, Trash2 } from 'lucide-react'
import { ChartCard } from '../components/dashboard/ChartCard'
import { KpiGrid } from '../components/dashboard/KpiGrid'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Select } from '../components/ui/select'
import { RoomDialog } from '../components/rooms/RoomDialog'
import { roomBuildingData, roomBuildings, roomOverview, roomQueue, roomStatusData, roomStatuses, roomTypeData, roomTypes } from '../data/rooms'
import { getRoomData, createRoom, updateRoom, deleteRoom } from '../services/roomService'
import type { RoomItem, RoomStatus, RoomType } from '../types/room'
import { usePermission } from '../hooks/usePermission'

function statusTone(status: RoomStatus) {
  switch (status) {
    case 'Đang sử dụng': return 'border-emerald-500/20 bg-emerald-500/10 text-emerald-100'
    case 'Bảo trì': return 'border-amber-500/20 bg-amber-500/10 text-amber-100'
    case 'Tạm ngưng': return 'border-red-500/20 bg-red-500/10 text-red-100'
    case 'Dự phòng': return 'border-blue-500/20 bg-blue-500/10 text-blue-100'
  }
}

function genId() { return `room-${Date.now()}` }
function today() { return new Date().toLocaleDateString('vi-VN') }

export function RoomManagementPage() {
  const queryClient = useQueryClient()
  const { canCreate, canEdit, canDelete } = usePermission()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<RoomStatus | 'Tất cả'>('Tất cả')
  const [type, setType] = useState<RoomType | 'Tất cả'>('Tất cả')
  const [building, setBuilding] = useState('Tất cả')

  const [dialogMode, setDialogMode] = useState<'add' | 'edit' | 'delete'>('add')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selected, setSelected] = useState<RoomItem | undefined>()
  const [localItems, setLocalItems] = useState<RoomItem[] | null>(null)

  const { data } = useQuery({ queryKey: ['rooms-module'], queryFn: getRoomData, staleTime: 60_000 })

  const serverItems = data?.items ?? roomQueue
  const items = localItems ?? serverItems
  const overview = data?.overview ?? roomOverview
  const statusData = data?.statusData ?? roomStatusData
  const typeData = data?.typeData ?? roomTypeData
  const buildingData = data?.buildingData ?? roomBuildingData
  const statuses = data?.statuses ?? roomStatuses
  const types = data?.types ?? roomTypes
  const buildings = data?.buildings ?? roomBuildings

  useMemo(() => { if (serverItems.length > 0 && localItems === null) setLocalItems(serverItems) }, [serverItems, localItems])

  const filteredItems = useMemo(() => {
    const kw = query.trim().toLowerCase()
    return items.filter(r => {
      const matchKw = !kw || [r.code, r.name, r.building, r.floor, r.type, r.manager, r.note].some(v => v?.toLowerCase().includes(kw))
      return matchKw && (status === 'Tất cả' || r.status === status) && (type === 'Tất cả' || r.type === type) && (building === 'Tất cả' || r.building === building)
    })
  }, [items, query, status, type, building])

  const openAdd = () => { setDialogMode('add'); setSelected(undefined); setDialogOpen(true) }
  const openEdit = (r: RoomItem) => { setDialogMode('edit'); setSelected(r); setDialogOpen(true) }
  const openDelete = (r: RoomItem) => { setDialogMode('delete'); setSelected(r); setDialogOpen(true) }

  const handleAdd = async (v: any) => {
    try {
      await createRoom({
        code: v.code,
        name: v.name,
        building: v.building,
        floor: v.floor,
        type: v.type,
        status: v.status,
        manager: v.manager,
        capacity: v.capacity,
        note: v.note ?? ''
      })
      queryClient.invalidateQueries({ queryKey: ['rooms-module'] })
    } catch (error) {
      console.error('Failed to create room:', error)
      throw error
    }
  }
  
  const handleEdit = async (id: string, v: any) => {
    try {
      await updateRoom(id, v)
      queryClient.invalidateQueries({ queryKey: ['rooms-module'] })
    } catch (error) {
      console.error('Failed to update room:', error)
      throw error
    }
  }
  
  const handleDelete = async (id: string) => {
    try {
      await deleteRoom(id)
      queryClient.invalidateQueries({ queryKey: ['rooms-module'] })
    } catch (error) {
      console.error('Failed to delete room:', error)
      throw error
    }
  }

  const totalDevices = filteredItems.reduce((s, r) => s + r.deviceCount, 0)
  const totalTickets = filteredItems.reduce((s, r) => s + r.activeTickets, 0)
  const needsInventory = filteredItems.filter(r => r.lastInventoryAt < '01/07/2026').length

  return (
    <div className="space-y-6">
      <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="glass-panel overflow-hidden p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Module 04</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Quản lý phòng</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Theo dõi phòng học, phòng máy, văn phòng và phòng server theo tòa nhà, tầng, sức chứa, thiết bị và lịch kiểm kê.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {canCreate() && <Button className="gap-2" onClick={openAdd}><Plus className="h-4 w-4" />Thêm phòng</Button>}
            <Button variant="outline" className="gap-2"><ClipboardCheck className="h-4 w-4" />Tạo đợt kiểm kê</Button>
          </div>
        </div>
      </motion.section>

      <KpiGrid items={overview} />

      <section className="grid gap-6 xl:grid-cols-3">
        <ChartCard title="Phòng theo trạng thái" kind="pie" data={statusData} />
        <ChartCard title="Phòng theo loại" kind="pie" data={typeData} colors={['#3b82f6','#10b981','#f59e0b','#8b5cf6','#64748b']} />
        <ChartCard title="Phân bố theo tòa nhà" kind="bar" data={buildingData} colors={['#14b8a6']} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <Card>
          <CardHeader><CardTitle>Danh sách phòng</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 lg:grid-cols-[1.6fr_0.7fr_0.7fr_0.7fr_auto]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <Input value={query} onChange={e => setQuery(e.target.value)} className="pl-10" placeholder="Tìm theo mã, tên, tòa nhà, người phụ trách..." />
              </div>
              <Select value={status} onChange={e => setStatus(e.target.value as RoomStatus | 'Tất cả')}>
                <option>Tất cả</option>
                {statuses.map(s => <option key={s}>{s}</option>)}
              </Select>
              <Select value={type} onChange={e => setType(e.target.value as RoomType | 'Tất cả')}>
                <option>Tất cả</option>
                {types.map(t => <option key={t}>{t}</option>)}
              </Select>
              <Select value={building} onChange={e => setBuilding(e.target.value)}>
                {buildings.map(b => <option key={b}>{b}</option>)}
              </Select>
              <Button variant="outline" className="gap-2"><Filter className="h-4 w-4" />Lọc</Button>
            </div>

            <div className="overflow-hidden rounded-[16px] border border-slate-800">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-900/80 text-slate-400">
                  <tr>
                    <th className="px-4 py-3 font-medium">Mã phòng</th>
                    <th className="px-4 py-3 font-medium">Thông tin</th>
                    <th className="px-4 py-3 font-medium">Vị trí</th>
                    <th className="px-4 py-3 font-medium">Phụ trách</th>
                    <th className="px-4 py-3 font-medium">TB</th>
                    <th className="px-4 py-3 font-medium">Ticket</th>
                    <th className="px-4 py-3 font-medium">Trạng thái</th>
                    <th className="px-4 py-3 font-medium">Kiểm kê</th>
                    <th className="px-4 py-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((room: RoomItem) => (
                    <tr key={room.id} className="border-t border-slate-800/80 hover:bg-slate-900/60">
                      <td className="px-4 py-3 text-slate-200">{room.code}</td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-white">{room.name}</div>
                        <div className="text-xs text-slate-400">{room.type} · {room.capacity} chỗ</div>
                      </td>
                      <td className="px-4 py-3 text-slate-200">
                        <div>Tòa {room.building}</div>
                        <div className="text-xs text-slate-400">Tầng {room.floor}</div>
                      </td>
                      <td className="px-4 py-3 text-slate-200">{room.manager}</td>
                      <td className="px-4 py-3 text-slate-200">{room.deviceCount}</td>
                      <td className="px-4 py-3 text-slate-200">{room.activeTickets}</td>
                      <td className="px-4 py-3"><Badge className={statusTone(room.status)}>{room.status}</Badge></td>
                      <td className="px-4 py-3 text-slate-200">{room.lastInventoryAt}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          {canEdit() && <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => openEdit(room)}><Pencil className="h-3.5 w-3.5" /></Button>}
                          {canDelete() && <Button size="icon" variant="ghost" className="h-7 w-7 text-red-400 hover:text-red-300" onClick={() => openDelete(room)}><Trash2 className="h-3.5 w-3.5" /></Button>}
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
                <span>Thiết bị trong phòng đã lọc</span><span className="font-semibold text-white">{totalDevices}</span>
              </div>
              <div className="flex items-center justify-between rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">
                <span>Ticket đang mở</span><span className="font-semibold text-white">{totalTickets}</span>
              </div>
              <div className="flex items-center justify-between rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">
                <span>Phòng cần kiểm kê lại</span><span className="font-semibold text-white">{needsInventory}</span>
              </div>
              <div className="flex items-center justify-between rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">
                <span>Kết quả lọc</span><span className="font-semibold text-white">{filteredItems.length}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Quy trình quản lý phòng</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-300">
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">1. Khai báo mã phòng, tòa nhà, tầng, loại và người phụ trách.</div>
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">2. Gắn thiết bị, camera, mạng và ticket vào đúng phòng.</div>
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">3. Dùng dữ liệu phòng làm nền cho kiểm kê và báo cáo.</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Ghi chú vận hành</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-300">
              {filteredItems.slice(0, 3).map(room => (
                <div key={room.id} className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">
                  <div className="font-medium text-white">{room.code}</div>
                  <div className="mt-1 text-slate-400">{room.note || 'Không có ghi chú'}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <RoomDialog mode={dialogMode} open={dialogOpen} onOpenChange={setDialogOpen} room={selected} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  )
}
