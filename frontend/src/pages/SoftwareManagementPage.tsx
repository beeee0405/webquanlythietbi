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
import { SoftwareDialog } from '../components/software/SoftwareDialog'
import { softwareCategoryData, softwareCategories, softwareLicenseTypeData, softwareOverview, softwareQueue, softwareStatuses } from '../data/software'
import { getSoftwareData, createSoftware, updateSoftware, deleteSoftware } from '../services/softwareService'
import type { SoftwareItem, SoftwareStatus, SoftwareCategory } from '../types/software'
import { usePermission } from '../hooks/usePermission'

function statusTone(s: SoftwareStatus) {
  return s === 'Đang dùng' ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-100'
    : s === 'Sắp hết hạn' ? 'border-amber-500/20 bg-amber-500/10 text-amber-100'
    : 'border-red-500/20 bg-red-500/10 text-red-100'
}

function genId() { return `sw-${Date.now()}` }

export function SoftwareManagementPage() {
  const queryClient = useQueryClient()
  const { canCreate, canEdit, canDelete } = usePermission()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<SoftwareStatus | 'Tất cả'>('Tất cả')
  const [category, setCategory] = useState<SoftwareCategory | 'Tất cả'>('Tất cả')
  const [dialogMode, setDialogMode] = useState<'add' | 'edit' | 'delete'>('add')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selected, setSelected] = useState<SoftwareItem | undefined>()
  const [localItems, setLocalItems] = useState<SoftwareItem[] | null>(null)

  const { data } = useQuery({ queryKey: ['software-module'], queryFn: getSoftwareData, staleTime: 60_000 })
  const serverItems = data?.items ?? softwareQueue
  const items = localItems ?? serverItems
  const overview = data?.overview ?? softwareOverview
  const categoryData = data?.categoryData ?? softwareCategoryData
  const licenseTypeData = data?.licenseTypeData ?? softwareLicenseTypeData
  const categories = data?.categories ?? softwareCategories
  const statuses = data?.statuses ?? softwareStatuses

  useMemo(() => { if (serverItems.length > 0 && localItems === null) setLocalItems(serverItems) }, [serverItems, localItems])

  const filteredItems = useMemo(() => {
    const kw = query.trim().toLowerCase()
    return items.filter(s => (!kw || [s.name, s.publisher, s.version].some(v => v?.toLowerCase().includes(kw))) && (status === 'Tất cả' || s.status === status) && (category === 'Tất cả' || s.category === category))
  }, [items, query, status, category])

  const openAdd = () => { setDialogMode('add'); setSelected(undefined); setDialogOpen(true) }
  const openEdit = (s: SoftwareItem) => { setDialogMode('edit'); setSelected(s); setDialogOpen(true) }
  const openDelete = (s: SoftwareItem) => { setDialogMode('delete'); setSelected(s); setDialogOpen(true) }

  const handleAdd = async (v: any) => {
    try {
      await createSoftware({
        name: v.name,
        publisher: v.publisher,
        version: v.version ?? '',
        category: v.category,
        licenseType: v.licenseType,
        licenseKey: v.licenseKey ?? '',
        totalLicenses: v.totalLicenses,
        usedLicenses: v.usedLicenses ?? '0',
        expiresAt: v.expiresAt ?? '',
        room: v.room ?? '',
        status: v.status,
        note: v.note ?? ''
      })
      setLocalItems(null)`n queryClient.invalidateQueries({ queryKey: ['software-module'] })
    } catch (error) {
      console.error('Failed to create software:', error)
      throw error
    }
  }
  
  const handleEdit = async (id: string, v: any) => {
    try {
      await updateSoftware(id, v)
      setLocalItems(null)`n queryClient.invalidateQueries({ queryKey: ['software-module'] })
    } catch (error) {
      console.error('Failed to update software:', error)
      throw error
    }
  }
  
  const handleDelete = async (id: string) => {
    try {
      await deleteSoftware(id)
      setLocalItems(null)`n queryClient.invalidateQueries({ queryKey: ['software-module'] })
    } catch (error) {
      console.error('Failed to delete software:', error)
      throw error
    }
  }

  return (
    <div className="space-y-6">
      <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="glass-panel overflow-hidden p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Module 11</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Quản lý Phần mềm</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">Quản lý bản quyền phần mềm, giấy phép, ngày hết hạn và số lượng licenses sử dụng.</p>
          </div>
          {canCreate() && <Button className="gap-2" onClick={openAdd}><Plus className="h-4 w-4" />Thêm phần mềm</Button>}
        </div>
      </motion.section>

      <KpiGrid items={overview} />
      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Phân loại danh mục phần mềm" kind="pie" data={categoryData} colors={['#3b82f6','#10b981','#f59e0b','#8b5cf6','#64748b']} />
        <ChartCard title="Loại giấy phép" kind="bar" data={licenseTypeData} colors={['#06b6d4']} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <Card>
          <CardHeader><CardTitle>Danh sách phần mềm</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 lg:grid-cols-[1.6fr_0.7fr_0.7fr_auto]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <Input value={query} onChange={e => setQuery(e.target.value)} className="pl-10" placeholder="Tìm theo tên, nhà phát hành..." />
              </div>
              <Select value={category} onChange={e => setCategory(e.target.value as SoftwareCategory | 'Tất cả')}>
                <option>Tất cả</option>
                {categories.map(c => <option key={c}>{c}</option>)}
              </Select>
              <Select value={status} onChange={e => setStatus(e.target.value as SoftwareStatus | 'Tất cả')}>
                <option>Tất cả</option>
                {statuses.map(s => <option key={s}>{s}</option>)}
              </Select>
              <Button variant="outline" className="gap-2"><Filter className="h-4 w-4" />Lọc</Button>
            </div>
            <div className="overflow-hidden rounded-[16px] border border-slate-800">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-900/80 text-slate-400">
                  <tr>
                    <th className="px-4 py-3 font-medium">Phần mềm</th>
                    <th className="px-4 py-3 font-medium">Danh mục</th>
                    <th className="px-4 py-3 font-medium">Licenses</th>
                    <th className="px-4 py-3 font-medium">Hết hạn</th>
                    <th className="px-4 py-3 font-medium">Trạng thái</th>
                    <th className="px-4 py-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((s: SoftwareItem) => (
                    <tr key={s.id} className="border-t border-slate-800/80 hover:bg-slate-900/60">
                      <td className="px-4 py-3"><div className="font-medium text-white">{s.name}</div><div className="text-xs text-slate-400">{s.publisher} · {s.version}</div></td>
                      <td className="px-4 py-3 text-xs text-slate-200">{s.category}</td>
                      <td className="px-4 py-3 text-slate-200">{s.usedLicenses}/{s.totalLicenses}</td>
                      <td className="px-4 py-3 text-slate-200">{s.expiresAt}</td>
                      <td className="px-4 py-3"><Badge className={statusTone(s.status)}>{s.status}</Badge></td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          {canEdit() && <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => openEdit(s)}><Pencil className="h-3.5 w-3.5" /></Button>}
                          {canDelete() && <Button size="icon" variant="ghost" className="h-7 w-7 text-red-400 hover:text-red-300" onClick={() => openDelete(s)}><Trash2 className="h-3.5 w-3.5" /></Button>}
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
              <div className="flex items-center justify-between rounded-[16px] border border-slate-800 bg-slate-900/60 p-3"><span>Hết hạn</span><span className="font-semibold text-white">{filteredItems.filter(i => i.status === 'Hết hạn').length}</span></div>
              <div className="flex items-center justify-between rounded-[16px] border border-slate-800 bg-slate-900/60 p-3"><span>Sắp hết hạn</span><span className="font-semibold text-white">{filteredItems.filter(i => i.status === 'Sắp hết hạn').length}</span></div>
              <div className="flex items-center justify-between rounded-[16px] border border-slate-800 bg-slate-900/60 p-3"><span>Kết quả lọc</span><span className="font-semibold text-white">{filteredItems.length}</span></div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Quản lý Bản quyền</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-300">
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">1. Khai báo tên, nhà phát hành, loại giấy phép, ngày hết hạn.</div>
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">2. Theo dõi licenses sử dụng và cảnh báo gia hạn.</div>
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">3. Nâng cấp và gia hạn bản quyền trước hết hạn.</div>
            </CardContent>
          </Card>
        </div>
      </section>

      <SoftwareDialog mode={dialogMode} open={dialogOpen} onOpenChange={setDialogOpen} item={selected} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  )
}
