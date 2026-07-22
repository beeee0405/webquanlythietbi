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

export interface UserManagementResponse {
  overview: KpiDto[]
  roleData: PointDto[]
  departmentData: PointDto[]
  items: UserItem[]
  roles: string[]
  departments: string[]
}
