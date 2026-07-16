import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Search, ScanQrCode, SlidersHorizontal } from 'lucide-react'
import { ChartCard } from '../components/dashboard/ChartCard'
import { KpiGrid } from '../components/dashboard/KpiGrid'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Select } from '../components/ui/select'
import { DataTable } from '../components/dashboard/DataTable'
import { DeviceDialog } from '../components/devices/DeviceDialog'
import { deviceQueue, deviceOverview, deviceLocationData, deviceStatusData, deviceStatuses } from '../data/devices'
import type { DeviceItem, DeviceStatus } from '../types/device'
import { getDeviceData } from '../services/deviceService'

function statusTone(status: DeviceStatus) {
  switch (status) {
    case 'Hoạt động':
      return 'border-emerald-500/20 bg-emerald-500/10 text-emerald-100'
    case 'Đang sửa':
      return 'border-amber-500/20 bg-amber-500/10 text-amber-100'
    case 'Bảo trì':
      return 'border-blue-500/20 bg-blue-500/10 text-blue-100'
    case 'Hỏng':
      return 'border-red-500/20 bg-red-500/10 text-red-100'
    case 'Chờ thanh lý':
      return 'border-zinc-500/20 bg-zinc-500/10 text-zinc-100'
  }
}

export function DeviceManagementPage() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<DeviceStatus | 'Tất cả'>('Tất cả')
  const [category, setCategory] = useState('Tất cả')

  const { data } = useQuery({
    queryKey: ['devices-module'],
    queryFn: getDeviceData,
    staleTime: 60_000
  })

  const items = data?.items ?? deviceQueue
  const overview = data?.overview ?? deviceOverview
  const statusBreakdown = data?.statusData ?? deviceStatusData
  const roomLoad = data?.locationData ?? deviceLocationData
  const categories = useMemo(() => data?.categories ?? ['Tất cả', ...Array.from(new Set(items.map(item => item.category)))], [data?.categories, items])

  const filteredItems = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    return items.filter(device => {
      const matchKeyword = !keyword || [device.assetCode, device.name, device.category, device.brand, device.room, device.owner, device.serial].some(value => value.toLowerCase().includes(keyword))
      const matchStatus = status === 'Tất cả' || device.status === status
      const matchCategory = category === 'Tất cả' || device.category === category
      return matchKeyword && matchStatus && matchCategory
    })
  }, [items, query, status, category])

  const activeCount = filteredItems.filter(item => item.status === 'Hoạt động').length
  const warrantySoonCount = filteredItems.filter(item => item.warranty <= '31/12/2026').length

  return (
    <div className="space-y-6">
      <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="glass-panel overflow-hidden p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Module 01</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Quản lý thiết bị</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Quản lý vòng đời tài sản CNTT theo kiểu SaaS: theo dõi mã tài sản, phòng, người dùng, bảo hành, trạng thái, và khối lượng sử dụng theo từng khu vực.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <DeviceDialog />
            <Button variant="outline" className="gap-2"><ScanQrCode className="h-4 w-4" />Quét QR</Button>
          </div>
        </div>
      </motion.section>

      <KpiGrid items={overview} />

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Phân bố trạng thái thiết bị" kind="pie" data={statusBreakdown} />
        <ChartCard title="Khối lượng thiết bị theo phòng" kind="bar" data={roomLoad} colors={['#8b5cf6']} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <Card>
          <CardHeader>
            <CardTitle>Danh sách thiết bị</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 lg:grid-cols-[1.6fr_0.8fr_0.8fr_auto]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <Input value={query} onChange={event => setQuery(event.target.value)} className="pl-10" placeholder="Tìm theo mã, tên, serial, phòng, người dùng..." />
              </div>
              <Select value={status} onChange={event => setStatus(event.target.value as DeviceStatus | 'Tất cả')}>
                <option>Tất cả</option>
                {deviceStatuses.map(item => <option key={item}>{item}</option>)}
              </Select>
              <Select value={category} onChange={event => setCategory(event.target.value)}>
                {categories.map(item => <option key={item}>{item}</option>)}
              </Select>
              <Button variant="outline" className="gap-2"><SlidersHorizontal className="h-4 w-4" />Bộ lọc</Button>
            </div>

            <div className="overflow-hidden rounded-[16px] border border-slate-800">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-900/80 text-slate-400">
                  <tr>
                    <th className="px-4 py-3 font-medium">Asset</th>
                    <th className="px-4 py-3 font-medium">Thiết bị</th>
                    <th className="px-4 py-3 font-medium">Phòng</th>
                    <th className="px-4 py-3 font-medium">Người dùng</th>
                    <th className="px-4 py-3 font-medium">Trạng thái</th>
                    <th className="px-4 py-3 font-medium">Bảo hành</th>
                    <th className="px-4 py-3 font-medium">Cập nhật</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((device: DeviceItem) => (
                    <tr key={device.id} className="border-t border-slate-800/80 hover:bg-slate-900/60">
                      <td className="px-4 py-3 text-slate-200">{device.assetCode}</td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-white">{device.name}</div>
                        <div className="text-xs text-slate-400">{device.brand} · {device.category}</div>
                      </td>
                      <td className="px-4 py-3 text-slate-200">{device.room}</td>
                      <td className="px-4 py-3 text-slate-200">{device.owner}</td>
                      <td className="px-4 py-3">
                        <Badge className={statusTone(device.status)}>{device.status}</Badge>
                      </td>
                      <td className="px-4 py-3 text-slate-200">{device.warranty}</td>
                      <td className="px-4 py-3 text-slate-200">{device.updatedAt}</td>
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
                <span>Thiết bị đang hoạt động</span>
                <span className="font-semibold text-white">{activeCount}</span>
              </div>
              <div className="flex items-center justify-between rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">
                <span>Sắp hết bảo hành</span>
                <span className="font-semibold text-white">{warrantySoonCount}</span>
              </div>
              <div className="flex items-center justify-between rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">
                <span>Thiết bị đã lọc</span>
                <span className="font-semibold text-white">{filteredItems.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quy trình nghiệp vụ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-300">
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">1. Tiếp nhận tài sản từ nhà cung cấp hoặc điều chuyển nội bộ.</div>
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">2. Gán mã asset, serial, phòng, người dùng và trạng thái.</div>
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">3. Theo dõi bảo hành, sửa chữa, bảo trì, kiểm kê và thanh lý.</div>
            </CardContent>
          </Card>
        </div>
      </section>

      <DataTable title="Bảng tham chiếu ticket liên quan" items={[]} mode="tickets" />
    </div>
  )
}
