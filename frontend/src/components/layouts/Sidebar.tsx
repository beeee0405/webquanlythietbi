import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { navItems } from '@/nav'
import { useAuth } from '@/contexts/AuthContext'
import { usePermission } from '@/hooks/usePermission'

export function Sidebar() {
  const { user } = useAuth()
  const { isInfrastructure, isEndUser } = usePermission()

  // Filter nav items based on role
  const filteredItems = navItems.filter(item => {
    // End users don't see any of these (they get UserPortalDashboard instead)
    if (isEndUser) return false
    
    // Infrastructure specialists can't see Users module
    if (isInfrastructure && item.to === '/users') return false
    
    // Admins see everything
    return true
  })

  return (
    <motion.aside
      initial={{ x: -18, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="hidden border-r border-slate-800/80 bg-slate-950/70 px-4 py-5 lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-[286px] lg:flex-col"
    >
      <div className="mb-6 flex items-center gap-3 rounded-[18px] border border-slate-800 bg-slate-900/60 px-4 py-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-blue-500 to-emerald-400 font-bold text-slate-950">IT</div>
        <div>
          <div className="text-sm font-semibold text-white">TDMU ITAMS</div>
          <div className="text-xs text-slate-400">Enterprise Asset Platform</div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto pr-1">
        {filteredItems.map(item => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => cn('flex items-center gap-3 rounded-[16px] px-4 py-3 text-sm transition-colors', isActive ? 'bg-blue-500/10 text-blue-100 ring-1 ring-blue-500/20' : 'text-slate-300 hover:bg-slate-900 hover:text-white')}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          )
        })}
      </nav>

      <div className="mt-4 rounded-[18px] border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-300">
        <div className="text-xs uppercase tracking-[0.22em] text-slate-500">Vai trò hiện tại</div>
        <div className="mt-1 font-semibold text-white">{user?.role}</div>
        <div className="mt-3 text-xs text-slate-400">
          {user?.role === 'Quản trị viên' && 'Toàn quyền quản lý hệ thống'}
          {user?.role === 'Chuyên viên Phòng Hạ tầng' && 'Quản lý thiết bị & hạ tầng'}
          {user?.role === 'Người dùng' && 'Báo lỗi và yêu cầu hỗ trợ'}
        </div>
      </div>
    </motion.aside>
  )
}

export function MobileSidebarList({ onNavigate }: { onNavigate?: () => void }) {
  const { isInfrastructure, isEndUser } = usePermission()

  // Filter nav items based on role
  const filteredItems = navItems.filter(item => {
    if (isEndUser) return false
    if (isInfrastructure && item.to === '/users') return false
    return true
  })

  return (
    <div className="space-y-2">
      {filteredItems.map(item => {
        const Icon = item.icon
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            onClick={onNavigate}
            className={({ isActive }) => cn('flex items-center gap-3 rounded-[16px] px-4 py-3 text-sm transition-colors', isActive ? 'bg-blue-500/10 text-blue-100 ring-1 ring-blue-500/20' : 'text-slate-300 hover:bg-slate-900 hover:text-white')}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        )
      })}
    </div>
  )
}
