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
import { TransferDialog } from '../components/transfer/TransferDialog'
import {
  transferOverview,
  transferQueue,
  transferStatusData,
  transferStatuses,
} from '../data/transfer'
import { getTransferData, createTransfer, updateTransfer, deleteTransfer } from '../services/transferService'
import { usePermission } from '../hooks/usePermission'
import type { TransferItem, TransferStatus } from '../types/transfer'

function statusTone(status: TransferStatus) {
  switch (status) {
    case 'Hoàn thành':
      return 'border-emerald-500/20 bg-emerald-500/10 text-emerald-100'
    case 'Đã duyệt':
      return 'border-blue-500/20 bg-blue-500/10 text-blue-100'
    case 'Chờ duyệt':
      return 'border-amber-500/20 bg-amber-500/10 text-amber-100'
    case 'Từ chối':
      return 'border-red-500/20 bg-red-500/10 text-red-100'
  }
}

function genId() { return `trf-${Date.now()}` }

export function TransferManagementPage() {
  const queryClient = useQueryClient()
  const { canCreate, canEdit, canDelete } = usePermission()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<TransferStatus | 'Tất cả'>('Tất cả')

  // Dialog state
  const [dialogMode, setDialogMode] = useState<'add' | 'edit' | 'delete'>('add')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selected, setSelected] = useState<TransferItem | undefined>()

  // Local items state (layered on top of server data)
  const [localItems, setLocalItems] = useState<TransferItem[] | null>(null)

  const { data } = useQuery({
    queryKey: ['transfer-module'],
    queryFn: getTransferData,
    staleTime: 60_000
  })

  const overview = data?.overview ?? transferOverview
  const statusData = data?.statusData ?? transferStatusData
  const serverItems = data?.items ?? transferQueue
  const items = localItems ?? serverItems
  const statuses = data?.statuses ?? transferStatuses

  // Sync localItems when server data first loads
  useMemo(() => {
    if (serverItems.length > 0 && localItems === null) {
      setLocalItems(serverItems)
    }
  }, [serverItems, localItems])

  const filteredItems = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    return items.filter(transfer => {
      const matchKeyword = !keyword || [transfer.code, transfer.assetCode, transfer.assetName, transfer.fromRoom, transfer.toRoom].some(value => value.toLowerCase().includes(keyword))
      const matchStatus = status === 'Tất cả' || transfer.status === status
      return matchKeyword && matchStatus
    })
  }, [items, query, status])

  const completedCount = filteredItems.filter(i => i.status === 'Hoàn thành').length
  const pendingCount = filteredItems.filter(i => i.status === 'Chờ duyệt').length

  const openAdd = () => { setDialogMode('add'); setSelected(undefined); setDialogOpen(true) }
  const openEdit = (transfer: TransferItem) => { setDialogMode('edit'); setSelected(transfer); setDialogOpen(true) }
  const openDelete = (transfer: TransferItem) => { setDialogMode('delete'); setSelected(transfer); setDialogOpen(true) }

  const handleAdd = async (values: any) => {
    try {
      await createTransfer({
        code: (values as any).code || `TRF-${Date.now()}`,
        assetCode: (values as any).assetCode,
        assetName: (values as any).assetName,
        fromRoom: (values as any).fromRoom,
        toRoom: (values as any).toRoom,
        requester: (values as any).requester,
        approver: (values as any).approver || '-',
        status: (values as any).status || 'Chờ duyệt',
        transferredAt: (values as any).transferredAt || new Date().toISOString().split('T')[0],
        approvedAt: (values as any).approvedAt || '-',
        note: (values as any).note || '',
      })
      queryClient.invalidateQueries({ queryKey: ['transfer-module'] })
      toast.success('Tạo yêu cầu điều chuyển thành công')
    } catch (error) {
      console.error('Failed to create transfer:', error)
      throw error
    }
  }

  const handleEdit = async (id: string, values: any) => {
    try {
      await updateTransfer(id, values)
      queryClient.invalidateQueries({ queryKey: ['transfer-module'] })
      toast.success('Cập nhật yêu cầu điều chuyển thành công')
    } catch (error) {
      console.error('Failed to update transfer:', error)
      throw error
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteTransfer(id)
      queryClient.invalidateQueries({ queryKey: ['transfer-module'] })
      toast.success('Xóa yêu cầu điều chuyển thành công')
    } catch (error) {
      console.error('Failed to delete transfer:', error)
      throw error
    }
  }

  return (
    <div className="space-y-6">
      <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="glass-panel overflow-hidden p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Module 09</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Điều chuyển Thiết bị</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Quản lý yêu cầu điều chuyển thiết bị giữa các phòng. Duyệt, theo dõi trạng thái và lịch sử chuyển.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {canCreate() && <Button className="gap-2" onClick={openAdd}><Plus className="h-4 w-4" />Yêu cầu Điều chuyển</Button>}
          </div>
        </div>
      </motion.section>

      <KpiGrid items={overview} />

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Phân bố trạng thái điều chuyển" kind="pie" data={statusData} />
        <ChartCard title="Thống kê xử lý" kind="bar" data={statusData} colors={['#8b5cf6']} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <Card>
          <CardHeader>
            <CardTitle>Danh sách yêu cầu điều chuyển</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 lg:grid-cols-[1.6fr_0.8fr_auto]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <Input value={query} onChange={event => setQuery(event.target.value)} className="pl-10" placeholder="Tìm theo mã, asset, phòng..." />
              </div>
              <Select value={status} onChange={event => setStatus(event.target.value as TransferStatus | 'Tất cả')}>
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
                    <th className="px-4 py-3 font-medium">Từ → Đến</th>
                    <th className="px-4 py-3 font-medium">Người Yêu cầu</th>
                    <th className="px-4 py-3 font-medium">Trạng thái</th>
                    <th className="px-4 py-3 font-medium">Duyệt bởi</th>
                    <th className="px-4 py-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((transfer: TransferItem) => (
                    <tr key={transfer.id} className="border-t border-slate-800/80 hover:bg-slate-900/60">
                      <td className="px-4 py-3 text-slate-200 font-mono text-xs">{transfer.code}</td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-white">{transfer.assetName}</div>
                        <div className="text-xs text-slate-400">{transfer.assetCode}</div>
                      </td>
                      <td className="px-4 py-3 text-slate-200 text-xs">{transfer.fromRoom} → {transfer.toRoom}</td>
                      <td className="px-4 py-3 text-slate-200">{transfer.requester}</td>
                      <td className="px-4 py-3">
                        <Badge className={statusTone(transfer.status as TransferStatus)}>{transfer.status}</Badge>
                      </td>
                      <td className="px-4 py-3 text-slate-200">{transfer.approver}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          {canEdit() && <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => openEdit(transfer)}>
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>}
                          {canDelete() && <Button size="icon" variant="ghost" className="h-7 w-7 text-red-400 hover:text-red-300" onClick={() => openDelete(transfer)}>
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
                <span>Điều chuyển hoàn thành</span>
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
              <CardTitle>Quy trình Điều chuyển</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-300">
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">1. Tạo yêu cầu: chỉ định thiết bị, phòng từ, phòng đến, lý do.</div>
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">2. Duyệt: quản lý xét duyệt yêu cầu, đánh dấu hoàn thành.</div>
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">3. Cập nhật: lưu lịch sử và vị trí mới của thiết bị.</div>
            </CardContent>
          </Card>
        </div>
      </section>

      <TransferDialog
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
