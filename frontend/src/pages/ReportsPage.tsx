import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { BarChart3, Download } from 'lucide-react'
import { ChartCard } from '../components/dashboard/ChartCard'
import { KpiGrid } from '../components/dashboard/KpiGrid'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { getReportData } from '../services/reportService'

export function ReportsPage() {
  const { data } = useQuery({
    queryKey: ['reports-module'],
    queryFn: getReportData,
    staleTime: 60_000
  })

  const overview = data?.overview ?? []
  const deviceByCategory = data?.deviceByCategory ?? []
  const deviceByStatus = data?.deviceByStatus ?? []
  const ticketByMonth = data?.ticketByMonth ?? []
  const maintenanceCostByMonth = data?.maintenanceCostByMonth ?? []
  const ticketByPriority = data?.ticketByPriority ?? []
  const roomWorkload = data?.roomWorkload ?? []

  const totalDevs = overview.find(o => o.label === 'Tổng thiết bị')?.value || '0'
  const activeDevs = deviceByStatus.find(s => s.name === 'Hoạt động')?.value || 0
  const repairDevs = deviceByStatus.find(s => s.name === 'Đang sửa' || s.name === 'Bảo trì')?.value || 0
  const brokenDevs = deviceByStatus.find(s => s.name === 'Hỏng')?.value || 0
  const needRepair = Number(repairDevs) + Number(brokenDevs)

  const topCategories = [...deviceByCategory]
    .sort((a, b) => b.value - a.value)
    .slice(0, 3)
    .map(c => `${c.name}: ${c.value}`)
    .join(' | ') || 'Chưa có dữ liệu'

  const topRooms = [...roomWorkload]
    .sort((a, b) => b.value - a.value)
    .slice(0, 3)
    .map(r => `${r.name}: ${r.value}`)
    .join(' | ') || 'Chưa có dữ liệu'

  const totalTkts = overview.find(o => o.label === 'Tổng ticket' || o.label === 'Ticket tháng này')?.value || '0'
  const completedTkts = ticketByMonth.reduce((sum, item) => sum + item.value, 0) || 0
  const activeTkts = ticketByPriority.reduce((sum, item) => sum + item.value, 0) || 0

  const healthRate = overview.find(o => o.label === 'Sức khỏe hệ thống' || o.label === 'Tỉ lệ hoàn thành SLA')?.value || '100%'

  const maintenanceCount = overview.find(o => o.label === 'Bảo trì' || o.label === 'Kế hoạch tháng')?.value || '0'
  const maintenanceCost = maintenanceCostByMonth.reduce((sum, item) => sum + item.value, 0) || 0

  return (
    <div className="space-y-6">
      <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="glass-panel overflow-hidden p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Module 13</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Báo cáo</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Thống kê toàn trường về thiết bị, ticket, bảo trì, chi phí. Xuất báo cáo theo kỳ, phục vụ quyết định quản lý.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button className="gap-2"><Download className="h-4 w-4" />Xuất Excel</Button>
            <Button variant="outline" className="gap-2"><BarChart3 className="h-4 w-4" />Xuất PDF</Button>
          </div>
        </div>
      </motion.section>

      <KpiGrid items={overview} />

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Phân bố thiết bị theo danh mục" kind="pie" data={deviceByCategory} colors={['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#64748b', '#ec4899']} />
        <ChartCard title="Phân bố trạng thái thiết bị" kind="pie" data={deviceByStatus} />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Ticket theo tháng (6 tháng gần nhất)" kind="bar" data={ticketByMonth} colors={['#3b82f6']} />
        <ChartCard title="Chi phí bảo trì theo tháng" kind="bar" data={maintenanceCostByMonth} colors={['#ef4444']} />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Ticket theo mức độ ưu tiên" kind="pie" data={ticketByPriority} colors={['#ef4444', '#f59e0b', '#3b82f6', '#64748b']} />
        <ChartCard title="Khối lượng công việc theo phòng" kind="bar" data={roomWorkload} colors={['#10b981']} />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Báo cáo Thiết bị</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-300">
            <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">
              <div className="font-medium text-white mb-2">Thống kê Tổng quan</div>
              <div>Tổng thiết bị: {totalDevs} | Hoạt động: {activeDevs} | Cần xử lý: {needRepair}</div>
            </div>
            <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">
              <div className="font-medium text-white mb-2">Danh mục Top 3</div>
              <div>{topCategories}</div>
            </div>
            <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">
              <div className="font-medium text-white mb-2">Phòng Top 3</div>
              <div>{topRooms}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Báo cáo Ticket & Bảo trì</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-300">
            <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">
              <div className="font-medium text-white mb-2">Thống kê Ticket</div>
              <div>Tổng: {totalTkts} | Hoàn thành: {completedTkts} | Đang xử lý: {activeTkts}</div>
            </div>
            <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">
              <div className="font-medium text-white mb-2">Thống kê Bảo trì</div>
              <div>Kế hoạch: {maintenanceCount} | Chi phí tích lũy: {maintenanceCost}M</div>
            </div>
            <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">
              <div className="font-medium text-white mb-2">Hiệu suất & Sức khỏe</div>
              <div>Sức khỏe hệ thống: {healthRate}</div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
