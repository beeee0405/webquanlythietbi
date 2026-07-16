import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowUp, Filter, Search, Ticket } from 'lucide-react'
import { ChartCard } from '@/components/dashboard/ChartCard'
import { KpiGrid } from '@/components/dashboard/KpiGrid'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TicketDialog } from '@/components/tickets/TicketDialog'
import { getTicketData } from '@/services/ticketService'
import type { TicketChannel, TicketItem, TicketPriority, TicketStatus } from '@/types/ticket'
import {
    ticketAgeBuckets,
    ticketChannelData,
    ticketChannels,
    ticketOverview,
    ticketPriorities,
    ticketPriorityData,
    ticketQueue,
    ticketSlaTrendData,
    ticketStatuses,
    ticketStatusData
} from '@/data/tickets'

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
        case 'Đóng': return 'border-slate-700/20 bg-slate-700/10 text-slate-300'
    }
}

export function TicketsPage() {
    const [query, setQuery] = useState('')
    const [status, setStatus] = useState<TicketStatus | 'Tất cả'>('Tất cả')
    const [priority, setPriority] = useState<TicketPriority | 'Tất cả'>('Tất cả')
    const [channel, setChannel] = useState<TicketChannel | 'Tất cả'>('Tất cả')
    const [sortConfig, setSortConfig] = useState<{ key: keyof TicketItem, direction: 'ascending' | 'descending' } | null>(null)

    const { data } = useQuery({
        queryKey: ['ticket-module'],
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
        return items.filter(item => {
            const matchKeyword = !keyword || [item.code, item.subject, item.requester, item.room, item.device, item.assignee, item.category].some(value => value.toLowerCase().includes(keyword))
            const matchStatus = status === 'Tất cả' || item.status === status
            const matchPriority = priority === 'Tất cả' || item.priority === priority
            const matchChannel = channel === 'Tất cả' || item.channel === channel
            return matchKeyword && matchStatus && matchPriority && matchChannel
        })
    }, [items, query, status, priority, channel])

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

    const requestSort = (key: keyof TicketItem) => {
        let direction: 'ascending' | 'descending' = 'ascending'
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending'
        }
        setSortConfig({ key, direction })
    }

    const getSortIndicator = (key: keyof TicketItem) => {
        if (!sortConfig || sortConfig.key !== key) return null
        return sortConfig.direction === 'ascending' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
    }

    return (
        <div className="space-y-6">
            <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="glass-panel overflow-hidden p-6">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Module 02</p>
                        <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Ticket hỗ trợ</h1>
                        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
                            Quản lý các yêu cầu hỗ trợ từ người dùng, theo dõi trạng thái, phân công xử lý và đánh giá hiệu suất qua các chỉ số SLA.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <TicketDialog />
                        <Button variant="outline" className="gap-2"><Ticket className="h-4 w-4" />Ticket của tôi</Button>
                    </div>
                </div>
            </motion.section>

            <KpiGrid items={overview} />

            <section className="grid gap-6 xl:grid-cols-3">
                <ChartCard title="Ticket theo trạng thái" kind="pie" data={statusData} />
                <ChartCard title="Ticket theo độ ưu tiên" kind="pie" data={priorityData} colors={['#ef4444', '#f59e0b', '#3b82f6', '#64748b']} />
                <ChartCard title="Ticket theo kênh tiếp nhận" kind="pie" data={channelData} colors={['#14b8a6', '#8b5cf6', '#ec4899', '#f97316', '#22c55e']} />
            </section>

            <section className="grid gap-6 xl:grid-cols-2">
                <ChartCard title="Tỷ lệ hoàn thành đúng SLA (%)" kind="line" data={slaTrendData} />
                <ChartCard title="Phân loại tuổi ticket" kind="bar" data={ageBuckets} colors={['#3b82f6']} />
            </section>

            <Card>
                <CardHeader>
                    <CardTitle>Danh sách ticket</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-3 lg:grid-cols-[1.6fr_0.7fr_0.7fr_0.7fr_auto]">
                        <div className="relative">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                            <Input value={query} onChange={event => setQuery(event.target.value)} className="pl-10" placeholder="Tìm theo mã, tiêu đề, người yêu cầu, phòng, danh mục..." />
                        </div>
                        <Select value={status} onChange={event => setStatus(event.target.value as TicketStatus | 'Tất cả')}>
                            <option>Tất cả</option>
                            {statuses.map(item => <option key={item}>{item}</option>)}
                        </Select>
                        <Select value={priority} onChange={event => setPriority(event.target.value as TicketPriority | 'Tất cả')}>
                            <option>Tất cả</option>
                            {priorities.map(item => <option key={item}>{item}</option>)}
                        </Select>
                        <Select value={channel} onChange={event => setChannel(event.target.value as TicketChannel | 'Tất cả')}>
                            <option>Tất cả</option>
                            {channels.map(item => <option key={item}>{item}</option>)}
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
                                        <button type="button" onClick={() => requestSort('subject')} className="flex items-center gap-1 hover:text-white">Tiêu đề {getSortIndicator('subject')}</button>
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        <button type="button" onClick={() => requestSort('requester')} className="flex items-center gap-1 hover:text-white">Người yêu cầu {getSortIndicator('requester')}</button>
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        <button type="button" onClick={() => requestSort('room')} className="flex items-center gap-1 hover:text-white">Phòng {getSortIndicator('room')}</button>
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
                                    <th className="px-4 py-3 font-medium">
                                        <button type="button" onClick={() => requestSort('updatedAt')} className="flex items-center gap-1 hover:text-white">Cập nhật {getSortIndicator('updatedAt')}</button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedItems.map((item: TicketItem) => (
                                    <tr key={item.id} className="border-t border-slate-800/80 hover:bg-slate-900/60">
                                        <td className="px-4 py-3 text-slate-200">{item.code}</td>
                                        <td className="px-4 py-3">
                                            <div className="font-medium text-white">{item.subject}</div>
                                            <div className="text-xs text-slate-400">{item.device}</div>
                                        </td>
                                        <td className="px-4 py-3 text-slate-200">{item.requester}</td>
                                        <td className="px-4 py-3 text-slate-200">{item.room}</td>
                                        <td className="px-4 py-3"><Badge className={priorityTone(item.priority)}>{item.priority}</Badge></td>
                                        <td className="px-4 py-3"><Badge className={statusTone(item.status)}>{item.status}</Badge></td>
                                        <td className="px-4 py-3 text-slate-200">{item.assignee}</td>
                                        <td className="px-4 py-3 text-slate-400">{item.updatedAt}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}