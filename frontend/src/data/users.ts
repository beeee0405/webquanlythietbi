import type { UserItem, UserRole, UserStatus } from '../types/user'

export const userOverview = [
  { label: 'Tổng người dùng', value: '0', delta: '0%' },
  { label: 'Đang hoạt động', value: '0', delta: '0%' },
  { label: 'Nghỉ phép', value: '0', delta: '0%' },
  { label: 'Đã nghỉ việc', value: '0', delta: '0%' },
]

export const userRoleData: any[] = []
export const userDepartmentData: any[] = []
export const userRoles: UserRole[] = ['Quản trị viên', 'Kỹ thuật viên', 'Nhân viên']
export const userStatuses: UserStatus[] = ['Đang hoạt động', 'Nghỉ phép', 'Đã nghỉ việc']
export const userQueue: UserItem[] = []
