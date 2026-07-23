import { useMemo, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Filter, Pencil, Plus, Search, Trash2 } from 'lucide-react'
import { ChartCard } from '../components/dashboard/ChartCard'
import { KpiGrid } from '../components/dashboard/KpiGrid'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Select } from '../components/ui/select'
import { UserDialog } from '../components/users/UserDialog'
import {
  userDepartmentData,
  userOverview,
  userQueue,
  userRoleData,
  userRoles,
  userStatuses,
} from '../data/users'
import { getUserData, createUser, updateUser, deleteUser } from '../services/userService'
import type { UserItem, UserRole, UserStatus } from '../types/user'
import { usePermission } from '../hooks/usePermission'

function statusTone(status: UserStatus) {
  switch (status) {
    case 'Đang hoạt động':
      return 'border-emerald-500/20 bg-emerald-500/10 text-emerald-100'
    case 'Nghỉ phép':
      return 'border-amber-500/20 bg-amber-500/10 text-amber-100'
    case 'Đã nghỉ việc':
      return 'border-red-500/20 bg-red-500/10 text-red-100'
  }
}

function genId() { return `user-${Date.now()}` }
function today() { return new Date().toLocaleDateString('vi-VN') }

export function UserManagementPage() {
  const queryClient = useQueryClient()
  const { canCreate, canEdit, canDelete } = usePermission()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<UserStatus | 'Tất cả'>('Tất cả')
  const [role, setRole] = useState<UserRole | 'Tất cả'>('Tất cả')
  const [dialogMode, setDialogMode] = useState<'add' | 'edit' | 'delete'>('add')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selected, setSelected] = useState<UserItem | undefined>()

  const { data, refetch } = useQuery({
    queryKey: ['users-module'],
    queryFn: getUserData,
    staleTime: 0
  })

  const serverItems = data?.items ?? []
  const items = serverItems
  const overview = data?.overview ?? userOverview
  const roleData = data?.roleData ?? userRoleData
  const departmentData = data?.departmentData ?? userDepartmentData
  const roles = data?.roles ?? userRoles
  const statuses = userStatuses

  const filteredItems = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    return items.filter(user => {
      const matchKeyword = !keyword || [user.fullName, user.email, user.phone, user.department].some(value => value?.toLowerCase().includes(keyword))
      const matchStatus = status === 'Tất cả' || user.status === status
      const matchRole = role === 'Tất cả' || user.role === role
      return matchKeyword && matchStatus && matchRole
    })
  }, [items, query, status, role])

  const openAdd = () => { setDialogMode('add'); setSelected(undefined); setDialogOpen(true) }
  const openEdit = (u: UserItem) => { setDialogMode('edit'); setSelected(u); setDialogOpen(true) }
  const openDelete = (u: UserItem) => { setDialogMode('delete'); setSelected(u); setDialogOpen(true) }

  const handleAdd = async (v: any) => {
    try {
      await createUser({
        fullName: v.fullName,
        email: v.email,
        username: v.username,
        password: v.password,
        phone: v.phone ?? '',
        department: v.department,
        room: v.room ?? '',
        role: v.role,
        status: v.status
      })
      await queryClient.invalidateQueries({ queryKey: ['users-module'] })
      await refetch()
    } catch (error) {
      console.error('Failed to create user:', error)
      throw error
    }
  }

  const handleEdit = async (id: string, v: any) => {
    try {
      await updateUser(id, v)
      await queryClient.invalidateQueries({ queryKey: ['users-module'] })
      await refetch()
    } catch (error) {
      console.error('Failed to update user:', error)
      throw error
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id)
      await queryClient.invalidateQueries({ queryKey: ['users-module'] })
      await refetch()
    } catch (error) {
      console.error('Failed to delete user:', error)
      throw error
    }
  }

  const activeCount = filteredItems.filter(i => i.status === 'Đang hoạt động').length
  const onLeaveCount = filteredItems.filter(i => i.status === 'Nghỉ phép').length

  return (
    <div className="space-y-6">
      <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="glass-panel overflow-hidden p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Module 12</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Quản lý Người dùng</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Quản lý tài khoản người dùng hệ thống. Phân quyền theo vai trò, đơn vị, theo dõi hoạt động và lần đăng nhập cuối.
            </p>
          </div>
          {canCreate() && <Button className="gap-2" onClick={openAdd}><Plus className="h-4 w-4" />Thêm Người dùng</Button>}
        </div>
      </motion.section>

      <KpiGrid items={overview} />

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Phân bố theo vai trò" kind="pie" data={roleData} />
        <ChartCard title="Phân bố theo đơn vị" kind="bar" data={departmentData} colors={['#8b5cf6']} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <Card>
          <CardHeader>
            <CardTitle>Danh sách người dùng</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 lg:grid-cols-[1.6fr_0.7fr_0.7fr_auto]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <Input value={query} onChange={event => setQuery(event.target.value)} className="pl-10" placeholder="Tìm theo tên, email, phòng, đơn vị..." />
              </div>
              <Select value={role} onChange={event => setRole(event.target.value as UserRole | 'Tất cả')}>
                <option>Tất cả</option>
                {roles.map(item => <option key={item}>{item}</option>)}
              </Select>
              <Select value={status} onChange={event => setStatus(event.target.value as UserStatus | 'Tất cả')}>
                <option>Tất cả</option>
                {statuses.map(item => <option key={item}>{item}</option>)}
              </Select>
              <Button variant="outline" className="gap-2"><Filter className="h-4 w-4" />Lọc</Button>
            </div>

            <div className="overflow-hidden rounded-[16px] border border-slate-800">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-900/80 text-slate-400">
                  <tr>
                    <th className="px-4 py-3 font-medium">Tên</th>
                    <th className="px-4 py-3 font-medium">Email</th>
                    <th className="px-4 py-3 font-medium">Vai trò</th>
                    <th className="px-4 py-3 font-medium">Đơn vị</th>
                    <th className="px-4 py-3 font-medium">Trạng thái</th>
                    <th className="px-4 py-3 font-medium">Đăng nhập Cuối</th>
                    <th className="px-4 py-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((user: UserItem) => (
                    <tr key={user.id} className="border-t border-slate-800/80 hover:bg-slate-900/60">
                      <td className="px-4 py-3">
                        <div className="font-medium text-white">{user.fullName}</div>
                        <div className="text-xs text-slate-400">{user.phone}</div>
                      </td>
                      <td className="px-4 py-3 text-slate-200 text-xs">{user.email}</td>
                      <td className="px-4 py-3 text-slate-200">{user.role}</td>
                      <td className="px-4 py-3 text-slate-200 text-xs">{user.department}</td>
                      <td className="px-4 py-3">
                        <Badge className={statusTone(user.status as UserStatus)}>{user.status}</Badge>
                      </td>
                      <td className="px-4 py-3 text-slate-200 text-xs">{user.lastLogin}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          {canEdit() && <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => openEdit(user)}><Pencil className="h-3.5 w-3.5" /></Button>}
                          {canDelete() && <Button size="icon" variant="ghost" className="h-7 w-7 text-red-400 hover:text-red-300" onClick={() => openDelete(user)}><Trash2 className="h-3.5 w-3.5" /></Button>}
                        </div>
                      </td>
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
                <span>Đang hoạt động</span>
                <span className="font-semibold text-white">{activeCount}</span>
              </div>
              <div className="flex items-center justify-between rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">
                <span>Nghỉ phép</span>
                <span className="font-semibold text-white">{onLeaveCount}</span>
              </div>
              <div className="flex items-center justify-between rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">
                <span>Tổng người dùng đã lọc</span>
                <span className="font-semibold text-white">{filteredItems.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quản lý Tài khoản</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-300">
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">1. Tạo tài khoản: tên, email, mật khẩu, vai trò, đơn vị.</div>
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">2. Phân quyền: gán vai trò và quyền truy cập từng module.</div>
              <div className="rounded-[16px] border border-slate-800 bg-slate-900/60 p-3">3. Giám sát: theo dõi hoạt động, lần đăng nhập, thay đổi mật khẩu.</div>
            </CardContent>
          </Card>
        </div>
      </section>

      <UserDialog mode={dialogMode} open={dialogOpen} onOpenChange={setDialogOpen} item={selected} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  )
}
