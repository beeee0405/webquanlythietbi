export type UserRole = 'Quản trị viên' | 'Chuyên viên Phòng Hạ tầng' | 'Người dùng'

export interface UserInfoDto {
  id: string
  username: string
  email: string
  fullName: string
  phone: string
  department: string
  room: string
  role: UserRole
  status: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  user: UserInfoDto
}
