import { useLocation } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

const moduleTitles: Record<string, string> = {
  devices: 'Quản lý thiết bị',
  rooms: 'Quản lý phòng',
  cameras: 'Quản lý Camera',
  network: 'Thiết bị mạng',
  tickets: 'Ticket hỗ trợ',
  maintenance: 'Bảo trì',
  inventory: 'Kiểm kê',
  transfer: 'Điều chuyển',
  liquidation: 'Thanh lý',
  software: 'Quản lý phần mềm',
  users: 'Người dùng',
  reports: 'Báo cáo',
  settings: 'Cài đặt'
}

export function ModulePage() {
  const location = useLocation()
  const moduleName = location.pathname.split('/').filter(Boolean).at(0)
  const title = moduleName ? moduleTitles[moduleName] ?? moduleName : 'Module'

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-slate-300">
        <p>Module này sẽ được triển khai ở bước tiếp theo theo đúng yêu cầu “mỗi lần chỉ tạo một module hoàn chỉnh”.</p>
        <p className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-4">
          Hiện tại giao diện, layout, theme, routing và Dashboard module đã sẵn sàng. Màn hình này là khung chờ để ghép API và CRUD thực tế.
        </p>
      </CardContent>
    </Card>
  )
}
