import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { BarChart3, Download } from 'lucide-react'
import { ChartCard } from '../components/dashboard/ChartCard'
import { KpiGrid } from '../components/dashboard/KpiGrid'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import {
  reportDeviceByCategoryData,
  reportDeviceByStatusData,
  reportMaintenanceCostByMonthData,
  reportOverview,
  reportRoomWorkloadData,
  reportTicketByMonthData,
  reportTicketByPriorityData,
} from '../data/reports'
import { getReportData } from '../services/reportService'

export function ReportsPage() {
  const { data } = useQuery({
    queryKey: ['reports-module'],
    queryFn: getReportData,
    staleTime: 60_000
  })

  const overview = data?.overview ?? reportOverview
  const deviceByCategory = data?.deviceByCategory ?? reportDeviceByCategoryData
  const deviceByStatus = data?.deviceByStatus ?? reportDeviceByStatusData
  const ticketByMonth = data?.ticketByMonth ?? reportTicketByMonthData
  const maintenanceCostByMonth = data?.maintenanceCostByMonth ?? reportMaintenanceCostByMonthData
  const ticketByPriority = data?.ticketByPriority ?? reportTicketByPriorityData
  const roomWorkload = data?.roomWorkload ?? reportRoomWorkloadData

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
              <div>Tổng thiết bị: 2,450 | Hoạt động: 1,862 | Cần xử lý: 87</div>
            </div>
            <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">
              <div className="font-medium text-white mb-2">Danh mục Top 3</div>
              <div>PC: 980 | Network: 276 | Laptop: 210</div>
            </div>
            <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">
              <div className="font-medium text-white mb-2">Phòng Top 3</div>
              <div>Phòng máy A3.302: 42 | Giảng đường A2.101: 31 | Văn phòng B1.201: 28</div>
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
              <div>Tổng: 184 | Hoàn thành: 82 | Đang xử lý: 27 | SLA: 93%</div>
            </div>
            <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">
              <div className="font-medium text-white mb-2">Thống kê Bảo trì</div>
              <div>Kế hoạch: 42 | Đang thực hiện: 9 | Hoàn thành: 28 | Chi phí: 61.6M</div>
            </div>
            <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">
              <div className="font-medium text-white mb-2">Hiệu suất</div>
              <div>Ticket được xử lý đúng hạn: 93% | Bảo trì đúng lịch: 88%</div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
