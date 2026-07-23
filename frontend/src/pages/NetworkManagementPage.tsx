import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Filter, Pencil, Plus, Search, Trash2 } from 'lucide-react'
import { ChartCard } from '../components/dashboard/ChartCard'
import { KpiGrid } from '../components/dashboard/KpiGrid'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Select } from '../components/ui/select'
import { NetworkDialog } from '../components/network/NetworkDialog'
import { getNetworkData, createNetworkDevice, updateNetworkDevice, deleteNetworkDevice } from '../services/networkService'
import type { NetworkItem, NetworkStatus, NetworkType } from '../types/network'
import { usePermission } from '../hooks/usePermission'

function statusTone(s: NetworkStatus) {
  return s === 'Hoạt động' ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-100'
    : s === 'Cảnh báo' ? 'border-amber-500/20 bg-amber-500/10 text-amber-100'
    : 'border-red-500/20 bg-red-500/10 text-red-100'
}

export function NetworkManagementPage() {
  const { canCreate, canEdit, canDelete } = usePermission()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<NetworkStatus | 'Tất cả'>('Tất cả')
  const [type, setType] = useState<NetworkType | 'Tất cả'>('Tất cả')
  const [dialogMode, setDialogMode] = useState<'add' | 'edit' | 'delete'>('add')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selected, setSelected] = useState<NetworkItem | undefined>()

  const { data, refetch } = useQuery({ queryKey: ['network-module'], queryFn: getNetworkData, staleTime: 60_000 })
  const items = data?.items ?? []
  const overview = data?.overview ?? []
  const typeData = data?.typeData ?? []
  const statusData = data?.statusData ?? []
  const types = data?.types ?? ['Core Switch', 'Access Switch', 'Router', 'Firewall', 'Access Point', 'Controller', 'Server']
  const statuses = data?.statuses ?? ['Hoạt động', 'Cảnh báo', 'Lỗi', 'Bảo trì']

  const filteredItems = useMemo(() => {
    const kw = query.trim().toLowerCase()
    return items.filter(d => (!kw || [d.code, d.name, d.type, d.brand, d.model, d.ipAddress, d.room].some(v => v?.toLowerCase().includes(kw))) && (status === 'Tất cả' || d.status === status) && (type === 'Tất cả' || d.type === type))
  }, [items, query, status, type])

  const openAdd = () => { setDialogMode('add'); setSelected(undefined); setDialogOpen(true) }
  const openEdit = (d: NetworkItem) => { setDialogMode('edit'); setSelected(d); setDialogOpen(true) }
  const openDelete = (d: NetworkItem) => { setDialogMode('delete'); setSelected(d); setDialogOpen(true) }

  const handleAdd = async (v: any) => {
    try {
      await createNetworkDevice({
        code: v.code,
        name: v.name,
        type: v.type,
        brand: v.brand,
        model: v.model ?? '',
        room: v.room,
        ipAddress: v.ipAddress,
        macAddress: v.macAddress ?? '',
        vlan: v.vlan ?? '',
        port: v.port ?? '',
        status: v.status,
        warranty: v.warranty ?? '',
        installedAt: v.installedAt ?? new Date().toLocaleDateString('vi-VN'),
        note: v.note ?? ''
      })
      refetch()
    } catch (error) {
      console.error('Failed to create network device:', error)
      throw error
    }
  }
  
  const handleEdit = async (id: string, v: any) => {
    try {
      await updateNetworkDevice(id, v)
      refetch()
    } catch (error) {
      console.error('Failed to update network device:', error)
      throw error
    }
  }
  
  const handleDelete = async (id: string) => {
    try {
      await deleteNetworkDevice(id)
      refetch()
    } catch (error) {
      console.error('Failed to delete network device:', error)
      throw error
    }
  }

  return (
    <div className="space-y-6">
      <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="glass-panel overflow-hidden p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Module 07</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Quản lý Thiết bị Mạng</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">Quản lý hạ tầng mạng: switch, router, access point, firewall với IP, MAC, VLAN, trạng thái kết nối.</p>
          </div>
          {canCreate() && <Button className="gap-2" onClick={openAdd}><Plus className="h-4 w-4" />Thêm thiết bị</Button>}
        </div>
      </motion.section>

      <KpiGrid items={overview} />
      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Phân loại thiết bị mạng" kind="pie" data={typeData} colors={['#3b82f6','#10b981','#f59e0b','#8b5cf6','#64748b']} />
        <ChartCard title="Phân bố trạng thái" kind="bar" data={statusData} colors={['#06b6d4']} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <Card>
          <CardHeader><CardTitle>Danh sách thiết bị mạng</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 lg:grid-cols-[1.6fr_0.7fr_0.7fr_auto]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <Input value={query} onChange={e => setQuery(e.target.value)} className="pl-10" placeholder="Tìm theo mã, tên, IP, phòng..." />
              </div>
              <Select value={type} onChange={e => setType(e.target.value as NetworkType | 'Tất cả')}>
                <option>Tất cả</option>
                {types.map(t => <option key={t}>{t}</option>)}
              </Select>
              <Select value={status} onChange={e => setStatus(e.target.value as NetworkStatus | 'Tất cả')}>
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
                    <th className="px-4 py-3 font-medium">Tên</th>
                    <th className="px-4 py-3 font-medium">Loại</th>
                    <th className="px-4 py-3 font-medium">IP</th>
                    <th className="px-4 py-3 font-medium">Phòng</th>
                    <th className="px-4 py-3 font-medium">Trạng thái</th>
                    <th className="px-4 py-3 font-medium">Bảo hành</th>
                    <th className="px-4 py-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((d: NetworkItem) => (
                    <tr key={d.id} className="border-t border-slate-800/80 hover:bg-slate-900/60">
                      <td className="px-4 py-3 text-slate-200">{d.code}</td>
                      <td className="px-4 py-3"><div className="font-medium text-white">{d.name}</div><div className="text-xs text-slate-400">{d.brand} · {d.model}</div></td>
                      <td className="px-4 py-3 text-slate-200">{d.type}</td>
                      <td className="px-4 py-3 font-mono text-xs text-slate-200">{d.ipAddress}</td>
                      <td className="px-4 py-3 text-slate-200">{d.room}</td>
                      <td className="px-4 py-3"><Badge className={statusTone(d.status)}>{d.status}</Badge></td>
                      <td className="px-4 py-3 text-slate-200">{d.warranty}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          {canEdit() && <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => openEdit(d)}><Pencil className="h-3.5 w-3.5" /></Button>}
                          {canDelete() && <Button size="icon" variant="ghost" className="h-7 w-7 text-red-400 hover:text-red-300" onClick={() => openDelete(d)}><Trash2 className="h-3.5 w-3.5" /></Button>}
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
              <div className="flex items-center justify-between rounded-[16px] border border-slate-800 bg-slate-900/60 p-3"><span>Hoạt động</span><span className="font-semibold text-white">{filteredItems.filter(i => i.status === 'Hoạt động').length}</span></div>
              <div className="flex items-center justify-between rounded-[16px] border border-slate-800 bg-slate-900/60 p-3"><span>Cảnh báo</span><span className="font-semibold text-white">{filteredItems.filter(i => i.status !== 'Hoạt động').length}</span></div>
              <div className="flex items-center justify-between rounded-[16px] border border-slate-800 bg-slate-900/60 p-3"><span>Kết quả lọc</span><span className="font-semibold text-white">{filteredItems.length}</span></div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Quy trình quản lý</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-300">
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">1. Khai báo IP, MAC, VLAN, port, loại và vị trí.</div>
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">2. Theo dõi trạng thái kết nối và firmware.</div>
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">3. Nâng cấp firmware, cân bằng tải, kiểm tra định kỳ.</div>
            </CardContent>
          </Card>
        </div>
      </section>

      <NetworkDialog mode={dialogMode} open={dialogOpen} onOpenChange={setDialogOpen} item={selected} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  )
}
