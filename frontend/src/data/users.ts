import type { UserItem, UserRole, UserStatus } from '../types/user'

export const userOverview = [
  { label: 'Tổng người dùng', value: '52', delta: '+4.2%' },
  { label: 'Đang hoạt động', value: '48', delta: '+3.8%' },
  { label: 'Nghỉ phép', value: '3', delta: '+0.5%' },
  { label: 'Đã nghỉ việc', value: '1', delta: '0%' },
]

export const userRoleData = [
  { name: 'Quản trị viên', value: 4 },
  { name: 'Kỹ thuật viên', value: 8 },
  { name: 'Nhân viên', value: 40 },
]

export const userDepartmentData = [
  { name: 'Khoa CNTT', value: 12 },
  { name: 'Hành chính', value: 8 },
  { name: 'Hạ tầng', value: 6 },
  { name: 'Thư viện', value: 5 },
  { name: 'Kế toán', value: 4 },
  { name: 'Khác', value: 17 },
]

export const userRoles: UserRole[] = ['Quản trị viên', 'Kỹ thuật viên', 'Nhân viên']
export const userStatuses: UserStatus[] = ['Đang hoạt động', 'Nghỉ phép', 'Đã nghỉ việc']

export const userQueue: UserItem[] = [
  { id: '1', fullName: 'Nguyễn Văn Hoàng', email: 'hoang.nv@tdmu.edu.vn', phone: '0901234567', department: 'Hạ tầng CNTT', room: 'Server A', role: 'Kỹ thuật viên', status: 'Đang hoạt động', createdAt: '01/01/2023', lastLogin: '19/07/2026 08:30' },
  { id: '2', fullName: 'Trần Quốc Bảo', email: 'bao.tq@tdmu.edu.vn', phone: '0912345678', department: 'Hạ tầng CNTT', room: 'Server B', role: 'Kỹ thuật viên', status: 'Đang hoạt động', createdAt: '15/03/2022', lastLogin: '19/07/2026 09:10' },
  { id: '3', fullName: 'Lê Minh Tâm', email: 'tam.lm@tdmu.edu.vn', phone: '0923456789', department: 'Hạ tầng CNTT', room: 'A3.302', role: 'Kỹ thuật viên', status: 'Đang hoạt động', createdAt: '20/06/2021', lastLogin: '18/07/2026 17:45' },
  { id: '4', fullName: 'Phạm Anh Khoa', email: 'khoa.pa@tdmu.edu.vn', phone: '0934567890', department: 'Hạ tầng CNTT', room: 'B1.201', role: 'Kỹ thuật viên', status: 'Đang hoạt động', createdAt: '10/08/2020', lastLogin: '19/07/2026 07:55' },
  { id: '5', fullName: 'Nguyễn Thị Lan', email: 'lan.nt@tdmu.edu.vn', phone: '0945678901', department: 'Hành chính', room: 'D1.109', role: 'Nhân viên', status: 'Đang hoạt động', createdAt: '05/02/2019', lastLogin: '17/07/2026 16:30' },
  { id: '6', fullName: 'Lê Minh C', email: 'c.lm@tdmu.edu.vn', phone: '0956789012', department: 'Khoa CNTT', room: 'VP Khoa', role: 'Nhân viên', status: 'Đang hoạt động', createdAt: '12/09/2018', lastLogin: '19/07/2026 10:20' },
  { id: '7', fullName: 'Nguyễn Văn A', email: 'a.nv@tdmu.edu.vn', phone: '0967890123', department: 'Khoa CNTT', room: 'VP Khoa', role: 'Nhân viên', status: 'Nghỉ phép', createdAt: '03/07/2017', lastLogin: '10/07/2026 08:00' },
  { id: '8', fullName: 'Trần Thị B', email: 'b.tt@tdmu.edu.vn', phone: '0978901234', department: 'Hành chính', room: 'A1.205', role: 'Quản trị viên', status: 'Đang hoạt động', createdAt: '01/01/2016', lastLogin: '19/07/2026 08:45' },
]
