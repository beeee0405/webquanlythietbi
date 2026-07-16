import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowUp, CalendarClock, Filter, Search } from 'lucide-react'
import { ChartCard } from '../components/dashboard/ChartCard'
import { KpiGrid } from '../components/dashboard/KpiGrid'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Select } from '../components/ui/select'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { MaintenanceDialog } from '../components/maintenance/MaintenanceDialog'
import {
  maintenanceBudgetData,
  maintenanceOverview,
  maintenancePriorities,
  maintenanceQueue,
  maintenanceStatuses,
  maintenanceStatusData,
  maintenanceTrendData,
  maintenanceTypes,
  maintenanceTypeData
} from '../data/maintenance'
import type { MaintenanceItem, MaintenancePriority, MaintenanceStatus, MaintenanceType } from '../types/maintenance'
import { getMaintenanceData } from '../services/maintenanceService'

function priorityTone(priority: MaintenancePriority) {
  switch (priority) {
    case 'Khẩn cấp': return 'border-red-500/20 bg-red-500/10 text-red-100'
    case 'Cao': return 'border-amber-500/20 bg-amber-500/10 text-amber-100'
    case 'Trung bình': return 'border-blue-500/20 bg-blue-500/10 text-blue-100'
    case 'Thấp': return 'border-slate-500/20 bg-slate-500/10 text-slate-100'
  }
}

function statusTone(status: MaintenanceStatus) {
  switch (status) {
    case 'Chờ duyệt': return 'border-cyan-500/20 bg-cyan-500/10 text-cyan-100'
    case 'Đang thực hiện': return 'border-blue-500/20 bg-blue-500/10 text-blue-100'
    case 'Hoàn thành': return 'border-emerald-500/20 bg-emerald-500/10 text-emerald-100'
    case 'Tạm hoãn': return 'border-zinc-500/20 bg-zinc-500/10 text-zinc-100'
  }
}

export function MaintenancePage() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<MaintenanceStatus | 'Tất cả'>('Tất cả')
  const [priority, setPriority] = useState<MaintenancePriority | 'Tất cả'>('Tất cả')
  const [type, setType] = useState<MaintenanceType | 'Tất cả'>('Tất cả')
  const [sortConfig, setSortConfig] = useState<{ key: keyof MaintenanceItem, direction: 'ascending' | 'descending' } | null>(null)

  const { data } = useQuery({
    queryKey: ['maintenance-module'],
    queryFn: getMaintenanceData,
    staleTime: 60_000
  })

  const overview = data?.overview ?? maintenanceOverview
  const statusData = data?.statusData ?? maintenanceStatusData
  const typeData = data?.typeData ?? maintenanceTypeData
  const trendData = data?.trendData ?? maintenanceTrendData
  const budgetData = data?.budgetData ?? maintenanceBudgetData
  const items = data?.items ?? maintenanceQueue
  const statuses = data?.statuses ?? maintenanceStatuses
  const priorities = data?.priorities ?? maintenancePriorities
  const types = data?.types ?? maintenanceTypes

  const filteredItems = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    return items.filter(item => {
      const matchKeyword = !keyword || [item.code, item.title, item.assetCode, item.assetName, item.room, item.assignee, item.note].some(value => value.toLowerCase().includes(keyword))
      const matchStatus = status === 'Tất cả' || item.status === status
      const matchPriority = priority === 'Tất cả' || item.priority === priority
      const matchType = type === 'Tất cả' || item.type === type
      return matchKeyword && matchStatus && matchPriority && matchType
    })
  }, [items, query, status, priority, type])

  const sortedItems = useMemo(() => {
    const sortableItems = [...filteredItems]
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }
    return sortableItems
  }, [filteredItems, sortConfig])

  const requestSort = (key: keyof MaintenanceItem) => {
    let direction: 'ascending' | 'descending' = 'ascending'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const getSortIndicator = (key: keyof MaintenanceItem) => {
    if (!sortConfig || sortConfig.key !== key) return null
    return sortConfig.direction === 'ascending' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
  }

  const dueSoonCount = items.filter(item => item.status !== 'Hoàn thành').length
  const completedCount = items.filter(item => item.status === 'Hoàn thành').length

  return (
    <div className="space-y-6">
      <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="glass-panel overflow-hidden p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Module 03</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Bảo trì</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Quản lý kế hoạch bảo trì, công việc thực hiện, chi phí, và lịch bảo trì theo tài sản/phòng trong một dashboard vận hành rõ ràng.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <MaintenanceDialog />
            <Button variant="outline" className="gap-2"><CalendarClock className="h-4 w-4" />Lịch tuần này</Button>
          </div>
        </div>
      </motion.section>

      <KpiGrid items={overview} />

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Phiếu bảo trì theo trạng thái" kind="pie" data={statusData} />
        <ChartCard title="Phiếu bảo trì theo loại" kind="pie" data={typeData} colors={['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']} />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Xu hướng số phiếu bảo trì" kind="line" data={trendData} />
        <ChartCard title="Ngân sách bảo trì" kind="area" data={budgetData} colors={['#f97316']} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <Card>
          <CardHeader>
            <CardTitle>Danh sách bảo trì</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 lg:grid-cols-[1.6fr_0.7fr_0.7fr_0.7fr_auto]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <Input value={query} onChange={event => setQuery(event.target.value)} className="pl-10" placeholder="Tìm theo mã, tiêu đề, asset, phòng, người phụ trách..." />
              </div>
              <Select value={status} onChange={event => setStatus(event.target.value as MaintenanceStatus | 'Tất cả')}>
                <option>Tất cả</option>
                {statuses.map(item => <option key={item}>{item}</option>)}
              </Select>
              <Select value={priority} onChange={event => setPriority(event.target.value as MaintenancePriority | 'Tất cả')}>
                <option>Tất cả</option>
                {priorities.map(item => <option key={item}>{item}</option>)}
              </Select>
              <Select value={type} onChange={event => setType(event.target.value as MaintenanceType | 'Tất cả')}>
                <option>Tất cả</option>
                {types.map(item => <option key={item}>{item}</option>)}
              </Select>
              <Button variant="outline" className="gap-2"><Filter className="h-4 w-4" />Lọc</Button>
            </div>

            <div className="overflow-hidden rounded-[16px] border border-slate-800">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-900/80 text-slate-400">
                  <tr>
                    <th className="px-4 py-3 font-medium">
                      <button type="button" onClick={() => requestSort('code')} className="flex items-center gap-1 hover:text-white">Mã {getSortIndicator('code')}</button>
                    </th>
                    <th className="px-4 py-3 font-medium">
                      <button type="button" onClick={() => requestSort('title')} className="flex items-center gap-1 hover:text-white">Phiếu {getSortIndicator('title')}</button>
                    </th>
                    <th className="px-4 py-3 font-medium">
                      <button type="button" onClick={() => requestSort('assetCode')} className="flex items-center gap-1 hover:text-white">Thiết bị {getSortIndicator('assetCode')}</button>
                    </th>
                    <th className="px-4 py-3 font-medium">
                      <button type="button" onClick={() => requestSort('room')} className="flex items-center gap-1 hover:text-white">Phòng {getSortIndicator('room')}</button>
                    </th>
                    <th className="px-4 py-3 font-medium">
                      <button type="button" onClick={() => requestSort('type')} className="flex items-center gap-1 hover:text-white">Loại {getSortIndicator('type')}</button>
                    </th>
                    <th className="px-4 py-3 font-medium">
                      <button type="button" onClick={() => requestSort('priority')} className="flex items-center gap-1 hover:text-white">Ưu tiên {getSortIndicator('priority')}</button>
                    </th>
                    <th className="px-4 py-3 font-medium">
                      <button type="button" onClick={() => requestSort('status')} className="flex items-center gap-1 hover:text-white">Trạng thái {getSortIndicator('status')}</button>
                    </th>
                    <th className="px-4 py-3 font-medium">
                      <button type="button" onClick={() => requestSort('assignee')} className="flex items-center gap-1 hover:text-white">Phụ trách {getSortIndicator('assignee')}</button>
                    </th>
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
                <span>Công việc sắp tới</span>
                <span className="font-semibold text-white">{dueSoonCount}</span>
              </div>
              <div className="flex items-center justify-between rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">
                <span>Đã hoàn thành</span>
                <span className="font-semibold text-white">{completedCount}</span>
              </div>
              <div className="flex items-center justify-between rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">
                <span>Phiếu đã lọc</span>
                <span className="font-semibold text-white">{filteredItems.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quy trình bảo trì</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-300">
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">1. Tiếp nhận sự cố hoặc lên lịch bảo trì định kỳ.</div>
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">2. Phân công kỹ thuật viên, chuẩn bị vật tư và thời gian dừng hệ thống.</div>
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">3. Thực hiện, nghiệm thu, ghi nhận chi phí và cập nhật lịch sử tài sản.</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lưu ý vận hành</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-300">
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">Không bảo trì trong giờ thi nếu ảnh hưởng phòng máy.</div>
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">Ghi rõ linh kiện thay thế và giá trị chi phí.</div>
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">Cập nhật lịch sử bảo trì để phục vụ audit và bảo hành.</div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
