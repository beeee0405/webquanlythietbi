import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowUp, Filter, Search } from 'lucide-react'
import { ChartCard } from '@/components/dashboard/ChartCard'
import { KpiGrid } from '@/components/dashboard/KpiGrid'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DeviceDialog } from '@/components/devices/DeviceDialog'
import { getDeviceData } from '@/services/deviceService'
import type { DeviceItem, DeviceStatus } from '@/types/device'
import {
    deviceCategories,
    deviceLocationData,
    deviceOverview,
    deviceQueue,
    deviceStatuses,
    deviceStatusData
} from '@/data/devices'

function statusTone(status: DeviceStatus) {
    switch (status) {
        case 'Hoạt động': return 'border-emerald-500/20 bg-emerald-500/10 text-emerald-100'
        case 'Đang sửa': return 'border-amber-500/20 bg-amber-500/10 text-amber-100'
        case 'Bảo trì': return 'border-blue-500/20 bg-blue-500/10 text-blue-100'
        case 'Hỏng': return 'border-red-500/20 bg-red-500/10 text-red-100'
        case 'Chờ thanh lý': return 'border-slate-500/20 bg-slate-500/10 text-slate-100'
    }
}

export function DevicesPage() {
    const [query, setQuery] = useState('')
    const [status, setStatus] = useState<DeviceStatus | 'Tất cả'>('Tất cả')
    const [category, setCategory] = useState<string>('Tất cả')
    const [sortConfig, setSortConfig] = useState<{ key: keyof DeviceItem, direction: 'ascending' | 'descending' } | null>(null)

    const { data } = useQuery({
        queryKey: ['device-module'],
        queryFn: getDeviceData,
        staleTime: 60_000
    })

    const overview = data?.overview ?? deviceOverview
    const statusData = data?.statusData ?? deviceStatusData
    const locationData = data?.locationData ?? deviceLocationData
    const items = data?.items ?? deviceQueue
    const statuses = deviceStatuses
    const categories = data?.categories ?? deviceCategories

    const filteredItems = useMemo(() => {
        const keyword = query.trim().toLowerCase()
        return items.filter(item => {
            const matchKeyword = !keyword || [item.assetCode, item.name, item.category, item.brand, item.room, item.owner, item.serial].some(value => value.toLowerCase().includes(keyword))
            const matchStatus = status === 'Tất cả' || item.status === status
            const matchCategory = category === 'Tất cả' || item.category === category
            return matchKeyword && matchStatus && matchCategory
        })
    }, [items, query, status, category])

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

    const requestSort = (key: keyof DeviceItem) => {
        let direction: 'ascending' | 'descending' = 'ascending'
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending'
        }
        setSortConfig({ key, direction })
    }

    const getSortIndicator = (key: keyof DeviceItem) => {
        if (!sortConfig || sortConfig.key !== key) return null
        return sortConfig.direction === 'ascending' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
    }

    return (
        <div className="space-y-6">
            <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="glass-panel overflow-hidden p-6">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Module 01</p>
                        <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Quản lý thiết bị</h1>
                        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
                            Theo dõi, quản lý vòng đời, và kiểm kê toàn bộ tài sản CNTT của tổ chức từ một nơi duy nhất.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <DeviceDialog />
                        <Button variant="outline">Xuất báo cáo</Button>
                    </div>
                </div>
            </motion.section>

            <KpiGrid items={overview} />

            <section className="grid gap-6 xl:grid-cols-2">
                <ChartCard title="Thiết bị theo trạng thái" kind="pie" data={statusData} />
                <ChartCard title="Thiết bị theo vị trí" kind="bar" data={locationData} colors={['#3b82f6']} />
            </section>

            <Card>
                <CardHeader>
                    <CardTitle>Danh sách thiết bị</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-3 lg:grid-cols-[1.6fr_0.7fr_0.7fr_auto]">
                        <div className="relative">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                            <Input value={query} onChange={event => setQuery(event.target.value)} className="pl-10" placeholder="Tìm theo mã, tên, loại, hãng, phòng, người dùng, serial..." />
                        </div>
                        <Select value={status} onChange={event => setStatus(event.target.value as DeviceStatus | 'Tất cả')}>
                            <option>Tất cả</option>
                            {statuses.map(item => <option key={item}>{item}</option>)}
                        </Select>
                        <Select value={category} onChange={event => setCategory(event.target.value)}>
                            {categories.map(item => <option key={item}>{item}</option>)}
                        </Select>
                        <Button variant="outline" className="gap-2"><Filter className="h-4 w-4" />Lọc</Button>
                    </div>

                    <div className="overflow-hidden rounded-[16px] border border-slate-800">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-900/80 text-slate-400">
                                <tr>
                                    <th className="px-4 py-3 font-medium">
                                        <button type="button" onClick={() => requestSort('assetCode')} className="flex items-center gap-1 hover:text-white">Mã TS {getSortIndicator('assetCode')}</button>
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        <button type="button" onClick={() => requestSort('name')} className="flex items-center gap-1 hover:text-white">Tên thiết bị {getSortIndicator('name')}</button>
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        <button type="button" onClick={() => requestSort('room')} className="flex items-center gap-1 hover:text-white">Phòng {getSortIndicator('room')}</button>
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        <button type="button" onClick={() => requestSort('owner')} className="flex items-center gap-1 hover:text-white">Người/Đơn vị {getSortIndicator('owner')}</button>
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        <button type="button" onClick={() => requestSort('status')} className="flex items-center gap-1 hover:text-white">Trạng thái {getSortIndicator('status')}</button>
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        <button type="button" onClick={() => requestSort('warranty')} className="flex items-center gap-1 hover:text-white">Bảo hành {getSortIndicator('warranty')}</button>
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        <button type="button" onClick={() => requestSort('updatedAt')} className="flex items-center gap-1 hover:text-white">Cập nhật {getSortIndicator('updatedAt')}</button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedItems.map((item: DeviceItem) => (
                                    <tr key={item.id} className="border-t border-slate-800/80 hover:bg-slate-900/60">
                                        <td className="px-4 py-3 text-slate-200">{item.assetCode}</td>
                                        <td className="px-4 py-3">
                                            <div className="font-medium text-white">{item.name}</div>
                                            <div className="text-xs text-slate-400">{item.category} - {item.brand}</div>
                                        </td>
                                        <td className="px-4 py-3 text-slate-200">{item.room}</td>
                                        <td className="px-4 py-3 text-slate-200">{item.owner}</td>
                                        <td className="px-4 py-3"><Badge className={statusTone(item.status)}>{item.status}</Badge></td>
                                        <td className="px-4 py-3 text-slate-200">{item.warranty}</td>
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