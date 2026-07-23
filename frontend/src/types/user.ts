import type { KpiDto, PointDto } from './common'

export type UserRole = 'Quản trị viên' | 'Kỹ thuật viên' | 'Nhân viên'
export type UserStatus = 'Đang hoạt động' | 'Nghỉ phép' | 'Đã nghỉ việc'

export interface UserItem {
  id: string
  fullName: string
  email: string
  phone: string
  department: string
  room: string
  role: UserRole
  status: UserStatus
  createdAt: string
  lastLogin: string
}

export type AppUserDto = UserItem

export interface UserManagementResponse {
  overview: KpiDto[]
  roleBreakdown: PointDto[]
  departmentBreakdown: PointDto[]
  users: UserItem[]
  roles: string[]
  departments: string[]
}
