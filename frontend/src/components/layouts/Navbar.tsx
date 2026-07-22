import { Bell, LogOut, Menu, Search, Sparkles, UserRound } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { MobileSidebarList } from '@/components/layouts/Sidebar'
import { titleMap } from '@/nav'
import { useAuth } from '@/contexts/AuthContext'
import { getDashboardData } from '@/services/dashboardService'

export function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const currentTitle = titleMap[location.pathname] ?? 'Dashboard'

  const { data: dashboardData } = useQuery({
    queryKey: ['dashboard-data'],
    queryFn: getDashboardData,
    staleTime: 60_000,
    enabled: !!user
  })

  const alerts = dashboardData?.alerts ?? []

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-30 mb-6 rounded-[24px] border border-slate-800/70 bg-slate-950/70 px-4 py-3 shadow-soft backdrop-blur-xl lg:px-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
        <div className="flex items-center justify-between gap-3 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Mở menu">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] bg-slate-950">
              <div className="mb-6 text-lg font-semibold text-white">TDMU ITAMS</div>
              <MobileSidebarList />
            </SheetContent>
          </Sheet>
          <div className="text-sm font-semibold text-white">{currentTitle}</div>
        </div>

        <div className="min-w-0 flex-1 lg:max-w-3xl">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input className="h-11 rounded-[16px] border-slate-800 bg-slate-900/70 pl-10 pr-28 text-slate-100 placeholder:text-slate-500" placeholder="Tìm thiết bị, ticket, phòng, người dùng..." />
            <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-[12px] text-slate-400">
                    <Sparkles className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Command palette</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <div className="text-sm font-semibold text-white">{currentTitle}</div>
        </div>

        <div className="flex items-center gap-2 self-end lg:self-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                {alerts.length > 0 && (
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-emerald-400" />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 rounded-[20px] border-slate-800 bg-slate-950 p-4">
              <div className="text-sm font-semibold text-white">Thông báo</div>
              <div className="mt-3 space-y-3 text-sm text-slate-300">
                {alerts.length > 0 ? (
                  alerts.map((alert, index) => (
                    <div key={index} className="rounded-[14px] border border-slate-800 bg-slate-900/60 p-3">
                      {alert.label}: {alert.value}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-slate-500 text-xs">Không có thông báo mới</div>
                )}
              </div>
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-11 rounded-[16px] px-3">
                <UserRound className="h-4 w-4" />
                <span className="hidden sm:inline-flex">{user?.fullName || 'Người dùng'}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="px-2 py-1.5 text-xs text-slate-400">
                <div className="font-medium text-white">{user?.fullName}</div>
                <div>{user?.role}</div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Hồ sơ</DropdownMenuItem>
              <DropdownMenuItem>Cài đặt cá nhân</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-400 focus:text-red-400">
                <LogOut className="mr-2 h-4 w-4" />
                Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
