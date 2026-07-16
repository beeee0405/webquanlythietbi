import {
    Archive,
    BarChart3,
    Camera,
    ChevronDown,
    ClipboardList,
    FileStack,
    HardDrive,
    LayoutDashboard,
    MonitorCog,
    Network,
    Settings,
    ShieldCheck,
    SplitSquareVertical,
    Users,
} from 'lucide-react'

export const navItems = [
    { label: 'Dashboard', to: '/', icon: LayoutDashboard },
    { label: 'Quản lý thiết bị', to: '/devices', icon: HardDrive },
    { label: 'Quản lý phòng', to: '/rooms', icon: SplitSquareVertical },
    { label: 'Quản lý Camera', to: '/cameras', icon: Camera },
    { label: 'Thiết bị mạng', to: '/network', icon: Network },
    { label: 'Ticket hỗ trợ', to: '/tickets', icon: ClipboardList },
    { label: 'Bảo trì', to: '/maintenance', icon: ShieldCheck },
    { label: 'Kiểm kê', to: '/inventory', icon: FileStack },
    { label: 'Điều chuyển', to: '/transfer', icon: ChevronDown },
    { label: 'Thanh lý', to: '/liquidation', icon: Archive },
    { label: 'Quản lý phần mềm', to: '/software', icon: MonitorCog },
    { label: 'Người dùng', to: '/users', icon: Users },
    { label: 'Báo cáo', to: '/reports', icon: BarChart3 },
    { label: 'Cài đặt', to: '/settings', icon: Settings },
]

export const titleMap: Record<string, string> = navItems.reduce(
    (acc, item) => {
        acc[item.to] = item.label
        return acc
    },
    {} as Record<string, string>,
)