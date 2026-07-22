import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { ChartCard } from '../components/dashboard/ChartCard'
import { DataTable } from '../components/dashboard/DataTable'
import { KpiGrid } from '../components/dashboard/KpiGrid'
import { QuickTicketDialog } from '../components/dashboard/QuickTicketDialog'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import {
  alertSummaryData,
  assetLifecycleData,
  deviceStatusData,
  deviceTypeData,
  kpiItems,
  maintenanceTrendData,
  recentDevices,
  recentTickets,
  roomWorkloadData,
  ticketPriorityData,
  ticketMonthlyData
} from '../data/dashboard'
import { getDashboardData } from '../services/dashboardService'

function useDashboardData() {
  return useQuery({
    queryKey: ['dashboard-home'],
    queryFn: getDashboardData,
    staleTime: 60_000
  })
}

export function DashboardPage() {
  const { data } = useDashboardData()

  return (
    <div className="space-y-6">
      <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="glass-panel overflow-hidden p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Trường Đại học Thủ Dầu Một</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Dashboard hệ thống quản lý thiết bị CNTT</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Dashboard kiểu SaaS doanh nghiệp, tối ưu cho quản lý thiết bị, ticket hỗ trợ, bảo trì, kiểm kê và báo cáo trong Trung tâm Chuyển đổi số.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <QuickTicketDialog />
            <button className="rounded-[16px] border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-100 transition hover:bg-slate-800">Quét QR kiểm kê</button>
          </div>
        </div>
      </motion.section>

      <KpiGrid items={data?.kpis ?? kpiItems} />

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Thiết bị theo loại" kind="pie" data={data?.deviceTypes ?? deviceTypeData} />
        <ChartCard title="Thiết bị theo trạng thái" kind="bar" data={data?.deviceStatuses ?? deviceStatusData} />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Ticket theo tháng" kind="line" data={data?.ticketMonthly ?? ticketMonthlyData} />
        <ChartCard title="Chi phí bảo trì" kind="area" data={data?.maintenanceCosts ?? maintenanceTrendData} colors={['#10b981']} />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Ticket theo mức ưu tiên" kind="pie" data={data?.ticketPriority ?? ticketPriorityData} colors={['#ef4444', '#f59e0b', '#3b82f6', '#64748b']} />
        <ChartCard title="Khối lượng theo phòng" kind="bar" data={data?.roomWorkload ?? roomWorkloadData} colors={['#8b5cf6']} />
      </section>

      <section className="grid gap-6 xl:grid-cols-2 2xl:grid-cols-4">
        <Card className="2xl:col-span-1">
          <CardHeader>
            <CardTitle>Thiết bị sắp hết bảo hành</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {(data?.warrantyExpiring && data.warrantyExpiring.length > 0) ? (
              data.warrantyExpiring.slice(0, 4).map((device: any) => (
                <div key={device.id || device.name} className="flex items-center justify-between rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">
                  <div>
                    <div className="font-medium text-white">{device.name}</div>
                    <div className="text-sm text-slate-400">{device.room} · {device.warranty}</div>
                  </div>
                  <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-xs text-amber-200">{device.daysLeft} ngày</span>
                </div>
              ))
            ) : (
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3 text-center text-sm text-slate-500">Chưa có dữ liệu</div>
            )}
          </CardContent>
        </Card>

        <Card className="2xl:col-span-1">
          <CardHeader>
            <CardTitle>Ticket mới</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {(data?.tickets && data.tickets.length > 0) ? (
              data.tickets.slice(0, 4).map((ticket: any) => (
                <div key={ticket.id} className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="font-medium text-white">{ticket.subject}</div>
                      <div className="text-sm text-slate-400">{ticket.room} · {ticket.requester}</div>
                    </div>
                    <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-xs text-blue-100">{ticket.status}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3 text-center text-sm text-slate-500">Chưa có dữ liệu</div>
            )}
          </CardContent>
        </Card>

        <Card className="2xl:col-span-1">
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-300">
            {(data?.recentActivities && data.recentActivities.length > 0) ? (
              data.recentActivities.slice(0, 4).map((activity: any, index: number) => (
                <div key={index} className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">{activity.message}</div>
              ))
            ) : (
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3 text-center text-slate-500">Chưa có dữ liệu</div>
            )}
          </CardContent>
        </Card>

        <Card className="2xl:col-span-1">
          <CardHeader>
            <CardTitle>Lịch bảo trì</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-300">
            {(data?.maintenanceSchedule && data.maintenanceSchedule.length > 0) ? (
              data.maintenanceSchedule.slice(0, 4).map((item: any, index: number) => (
                <div key={index} className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">{item.date} - {item.description}</div>
              ))
            ) : (
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3 text-center text-slate-500">Chưa có dữ liệu</div>
            )}
          </CardContent>
        </Card>

        <Card className="2xl:col-span-1">
          <CardHeader>
            <CardTitle>Vòng đời tài sản</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-300">
            {(data?.assetLifecycle ?? assetLifecycleData).map(item => (
              <div key={item.name} className="flex items-center justify-between rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">
                <span>{item.name}</span>
                <span className="font-semibold text-white">{item.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="2xl:col-span-1">
          <CardHeader>
            <CardTitle>Chỉ số cảnh báo nhanh</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-300">
            {(data?.alerts ?? alertSummaryData).map(item => (
              <div key={item.label} className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">
                <div className="text-slate-400">{item.label}</div>
                <div className="mt-1 text-2xl font-bold text-white">{item.value}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 2xl:grid-cols-2">
        <DataTable title="10 thiết bị mới nhất" items={(data?.devices ?? recentDevices).slice(0, 10)} mode="devices" />
        <DataTable title="10 ticket mới nhất" items={(data?.tickets ?? recentTickets).slice(0, 10)} mode="tickets" />
      </section>
    </div>
  )
}
