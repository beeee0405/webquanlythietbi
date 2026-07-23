import { useState, useMemo } from 'react'
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
import { getRoomData } from '@/services/roomService'
import { http } from '@/services/http'
import type { DeviceRecord, TicketRecord } from '@/types/dashboard'
import type { RoomItem } from '@/types/room'
import type { UserItem } from '@/types/user'

export function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const currentTitle = titleMap[location.pathname] ?? 'Dashboard'

  const [query, setQuery] = useState('')
  const [showResults, setShowResults] = useState(false)

  const { data: dashboardData } = useQuery({
    queryKey: ['dashboard-data'],
    queryFn: getDashboardData,
    staleTime: 60_000,
    enabled: !!user
  })

  const { data: roomsData } = useQuery({
    queryKey: ['rooms-module'],
    queryFn: getRoomData,
    staleTime: 60_000,
    enabled: !!user
  })

  const isAdmin = user?.role === 'Quản trị viên'
  const { data: usersData } = useQuery({
    queryKey: ['users-module'],
    queryFn: async () => {
      const response = await http.get('/users')
      return response.data
    },
    staleTime: 60_000,
    enabled: !!user && isAdmin
  })

  const alerts = dashboardData?.alerts ?? []

  const devices = dashboardData?.devices ?? []
  const tickets = dashboardData?.tickets ?? []
  const rooms = roomsData?.items ?? []
  const users = usersData?.users ?? []

  const filteredDevices = useMemo(() => {
    if (!query.trim()) return []
    const kw = query.trim().toLowerCase()
    return devices.filter((d: DeviceRecord) => 
      d.name?.toLowerCase().includes(kw) || 
      d.assetCode?.toLowerCase().includes(kw)
    ).slice(0, 5)
  }, [devices, query])

  const filteredTickets = useMemo(() => {
    if (!query.trim()) return []
    const kw = query.trim().toLowerCase()
    return tickets.filter((t: TicketRecord) => 
      t.subject?.toLowerCase().includes(kw)
    ).slice(0, 5)
  }, [tickets, query])

  const filteredRooms = useMemo(() => {
    if (!query.trim()) return []
    const kw = query.trim().toLowerCase()
    return rooms.filter((r: RoomItem) => 
      r.name?.toLowerCase().includes(kw) || 
      r.code?.toLowerCase().includes(kw)
    ).slice(0, 5)
  }, [rooms, query])

  const filteredUsers = useMemo(() => {
    if (!query.trim()) return []
    const kw = query.trim().toLowerCase()
    return users.filter((u: UserItem) => 
      u.fullName?.toLowerCase().includes(kw) || 
      u.email?.toLowerCase().includes(kw)
    ).slice(0, 5)
  }, [users, query])

  const hasResults = filteredDevices.length > 0 || filteredTickets.length > 0 || filteredRooms.length > 0 || filteredUsers.length > 0

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
            <Input 
              value={query}
              onChange={e => { setQuery(e.target.value); setShowResults(true); }}
              onFocus={() => setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
              className="h-11 rounded-[16px] border-slate-800 bg-slate-900/70 pl-10 pr-28 text-slate-100 placeholder:text-slate-500" 
              placeholder="Tìm thiết bị, ticket, phòng, người dùng..." 
            />
            <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-[12px] text-slate-400">
                    <Sparkles className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Instant search</TooltipContent>
              </Tooltip>
            </div>

            {showResults && query.trim() && (
              <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[380px] overflow-y-auto rounded-[20px] border border-slate-800 bg-slate-950/95 p-4 shadow-2xl backdrop-blur-md">
                {!hasResults ? (
                  <div className="py-6 text-center text-sm text-slate-500">Không tìm thấy kết quả nào</div>
                ) : (
                  <div className="space-y-4">
                    {filteredDevices.length > 0 && (
                      <div>
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Thiết bị</div>
                        <div className="space-y-1">
                          {filteredDevices.map(d => (
                            <div 
                              key={d.id} 
                              onClick={() => { navigate('/devices'); setQuery(''); setShowResults(false); }}
                              className="flex cursor-pointer flex-col rounded-[12px] p-2 hover:bg-slate-900/80 transition-colors"
                            >
                              <div className="text-xs font-medium text-white">{d.name}</div>
                              <div className="text-[10px] text-slate-400">Mã: {d.assetCode} · Loại: {d.category}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {filteredTickets.length > 0 && (
                      <div>
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Ticket</div>
                        <div className="space-y-1">
                          {filteredTickets.map(t => (
                            <div 
                              key={t.id} 
                              onClick={() => { navigate('/tickets'); setQuery(''); setShowResults(false); }}
                              className="flex cursor-pointer flex-col rounded-[12px] p-2 hover:bg-slate-900/80 transition-colors"
                            >
                              <div className="text-xs font-medium text-white">{t.subject}</div>
                              <div className="text-[10px] text-slate-400">Phòng: {t.room} · Trạng thái: {t.status}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {filteredRooms.length > 0 && (
                      <div>
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Phòng</div>
                        <div className="space-y-1">
                          {filteredRooms.map(r => (
                            <div 
                              key={r.id} 
                              onClick={() => { navigate('/rooms'); setQuery(''); setShowResults(false); }}
                              className="flex cursor-pointer flex-col rounded-[12px] p-2 hover:bg-slate-900/80 transition-colors"
                            >
                              <div className="text-xs font-medium text-white">{r.name}</div>
                              <div className="text-[10px] text-slate-400">Mã phòng: {r.code} · Quản lý: {r.manager}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {filteredUsers.length > 0 && (
                      <div>
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Người dùng</div>
                        <div className="space-y-1">
                          {filteredUsers.map((u: UserItem) => (
                            <div 
                              key={u.id} 
                              onClick={() => { navigate('/users'); setQuery(''); setShowResults(false); }}
                              className="flex cursor-pointer flex-col rounded-[12px] p-2 hover:bg-slate-900/80 transition-colors"
                            >
                              <div className="text-xs font-medium text-white">{u.fullName}</div>
                              <div className="text-[10px] text-slate-400">{u.email} · Vai trò: {u.role}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
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
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 rounded-[20px] border-slate-800 bg-slate-950 p-4 shadow-2xl">
              <div className="text-sm font-semibold text-white">Thông báo</div>
              <div className="mt-3 space-y-3 text-sm text-slate-300 max-h-[300px] overflow-y-auto">
                {alerts.length > 0 ? (
                  alerts.map((alert, index) => (
                    <div key={index} className="rounded-[14px] border border-slate-800/80 bg-slate-900/40 p-3 hover:bg-slate-900/60 transition-all">
                      <div className="font-semibold text-xs text-white mb-1">{alert.label}</div>
                      <div className="text-slate-300 text-xs leading-relaxed">{alert.value}</div>
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
