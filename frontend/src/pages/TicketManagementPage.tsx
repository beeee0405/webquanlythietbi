import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Filter, ScanQrCode, Search } from 'lucide-react'
import { ChartCard } from '../components/dashboard/ChartCard'
import { KpiGrid } from '../components/dashboard/KpiGrid'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Select } from '../components/ui/select'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { TicketDialog } from '../components/tickets/TicketDialog'
import {
  ticketAgeBuckets,
  ticketChannelData,
  ticketChannels,
  ticketOverview,
  ticketPriorityData,
  ticketPriorities,
  ticketQueue,
  ticketSlaTrendData,
  ticketStatusData,
  ticketStatuses
} from '../data/tickets'
import type { TicketItem, TicketPriority, TicketStatus } from '../types/ticket'
import { getTicketData } from '../services/ticketService'

function priorityTone(priority: TicketPriority) {
  switch (priority) {
    case 'Khẩn cấp': return 'border-red-500/20 bg-red-500/10 text-red-100'
    case 'Cao': return 'border-amber-500/20 bg-amber-500/10 text-amber-100'
    case 'Trung bình': return 'border-blue-500/20 bg-blue-500/10 text-blue-100'
    case 'Thấp': return 'border-slate-500/20 bg-slate-500/10 text-slate-100'
  }
}

function statusTone(status: TicketStatus) {
  switch (status) {
    case 'Mới': return 'border-cyan-500/20 bg-cyan-500/10 text-cyan-100'
    case 'Đang xử lý': return 'border-blue-500/20 bg-blue-500/10 text-blue-100'
    case 'Chờ phản hồi': return 'border-amber-500/20 bg-amber-500/10 text-amber-100'
    case 'Hoàn thành': return 'border-emerald-500/20 bg-emerald-500/10 text-emerald-100'
    case 'Đóng': return 'border-slate-500/20 bg-slate-500/10 text-slate-100'
  }
}

export function TicketManagementPage() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<TicketStatus | 'Tất cả'>('Tất cả')
  const [priority, setPriority] = useState<TicketPriority | 'Tất cả'>('Tất cả')
  const [channel, setChannel] = useState<string>('Tất cả')

  const { data } = useQuery({
    queryKey: ['tickets-module'],
    queryFn: getTicketData,
    staleTime: 60_000
  })

  const overview = data?.overview ?? ticketOverview
  const statusData = data?.statusData ?? ticketStatusData
  const priorityData = data?.priorityData ?? ticketPriorityData
  const channelData = data?.channelData ?? ticketChannelData
  const slaTrendData = data?.slaTrendData ?? ticketSlaTrendData
  const ageBuckets = data?.ageBuckets ?? ticketAgeBuckets
  const items = data?.items ?? ticketQueue
  const statuses = data?.statuses ?? ticketStatuses
  const priorities = data?.priorities ?? ticketPriorities
  const channels = data?.channels ?? ticketChannels

  const filteredItems = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    return items.filter(ticket => {
      const matchKeyword = !keyword || [ticket.code, ticket.subject, ticket.requester, ticket.room, ticket.device, ticket.category, ticket.assignee].some(value => value.toLowerCase().includes(keyword))
      const matchStatus = status === 'Tất cả' || ticket.status === status
      const matchPriority = priority === 'Tất cả' || ticket.priority === priority
      const matchChannel = channel === 'Tất cả' || ticket.channel === channel
      return matchKeyword && matchStatus && matchPriority && matchChannel
    })
  }, [items, query, status, priority, channel])

  const urgentCount = filteredItems.filter(ticket => ticket.priority === 'Khẩn cấp').length
  const pendingCount = filteredItems.filter(ticket => ticket.status === 'Mới' || ticket.status === 'Chờ phản hồi').length

  return (
    <div className="space-y-6">
      <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="glass-panel overflow-hidden p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Module 02</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Ticket hỗ trợ</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Quản lý ticket theo dòng chảy thực tế: tiếp nhận từ QR, email, điện thoại, phân công, xử lý, phản hồi và đóng ticket.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <TicketDialog />
            <Button variant="outline" className="gap-2"><ScanQrCode className="h-4 w-4" />Nhận ticket QR</Button>
          </div>
        </div>
      </motion.section>

      <KpiGrid items={overview} />

      <section className="grid gap-6 xl:grid-cols-3">
        <ChartCard title="Ticket theo trạng thái" kind="pie" data={statusData} />
        <ChartCard title="Ticket theo ưu tiên" kind="pie" data={priorityData} colors={['#ef4444', '#f59e0b', '#3b82f6', '#64748b']} />
        <ChartCard title="Kênh tiếp nhận" kind="bar" data={channelData} colors={['#8b5cf6']} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <Card>
          <CardHeader>
            <CardTitle>Danh sách ticket</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 lg:grid-cols-[1.6fr_0.7fr_0.7fr_0.7fr_auto]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <Input value={query} onChange={event => setQuery(event.target.value)} className="pl-10" placeholder="Tìm theo mã, tiêu đề, người báo, phòng, thiết bị..." />
              </div>
              <Select value={status} onChange={event => setStatus(event.target.value as TicketStatus | 'Tất cả')}>
                <option>Tất cả</option>
                {statuses.map(item => <option key={item}>{item}</option>)}
              </Select>
              <Select value={priority} onChange={event => setPriority(event.target.value as TicketPriority | 'Tất cả')}>
                <option>Tất cả</option>
                {priorities.map(item => <option key={item}>{item}</option>)}
              </Select>
              <Select value={channel} onChange={event => setChannel(event.target.value)}>
                <option>Tất cả</option>
                {channels.map(item => <option key={item}>{item}</option>)}
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
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((ticket: TicketItem) => (
                    <tr key={ticket.id} className="border-t border-slate-800/80 hover:bg-slate-900/60">
                      <td className="px-4 py-3 text-slate-200">{ticket.code}</td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-white">{ticket.subject}</div>
                        <div className="text-xs text-slate-400">{ticket.category} · {ticket.channel}</div>
                      </td>
                      <td className="px-4 py-3 text-slate-200">{ticket.requester}</td>
                      <td className="px-4 py-3 text-slate-200">
                        <div>{ticket.room}</div>
                        <div className="text-xs text-slate-400">{ticket.device}</div>
                      </td>
                      <td className="px-4 py-3"><Badge className={priorityTone(ticket.priority)}>{ticket.priority}</Badge></td>
                      <td className="px-4 py-3"><Badge className={statusTone(ticket.status)}>{ticket.status}</Badge></td>
                      <td className="px-4 py-3 text-slate-200">{ticket.assignee}</td>
                      <td className="px-4 py-3 text-slate-200">{ticket.sla}</td>
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
                <span>Ticket khẩn cấp</span>
                <span className="font-semibold text-white">{urgentCount}</span>
              </div>
              <div className="flex items-center justify-between rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">
                <span>Ticket chờ xử lý</span>
                <span className="font-semibold text-white">{pendingCount}</span>
              </div>
              <div className="flex items-center justify-between rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">
                <span>Ticket đã lọc</span>
                <span className="font-semibold text-white">{filteredItems.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SLA và chất lượng dịch vụ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-300">
              {ageBuckets.map(item => (
                <div key={item.name} className="flex items-center justify-between rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">
                  <span>{item.name}</span>
                  <span className="font-semibold text-white">{item.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <ChartCard title="Xu hướng SLA" kind="area" data={slaTrendData} />

          <Card>
            <CardHeader>
              <CardTitle>Trạm hỗ trợ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-300">
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">Nhận ticket từ QR, email, điện thoại hoặc trực tiếp.</div>
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">Phân công theo ca, theo chuyên môn và theo mức ưu tiên.</div>
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">Theo dõi SLA, phản hồi người dùng và đóng ticket có biên bản.</div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
