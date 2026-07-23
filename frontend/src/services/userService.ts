import { http } from './http'
import type { UserManagementResponse, AppUserDto } from '../types/user'

export async function getUserData(): Promise<UserManagementResponse> {
  const response = await http.get<UserManagementResponse>('/users')
  return response.data
}

export async function createUser(user: {
  fullName: string
  email: string
  username: string
  password: string
  phone?: string
  department?: string
  room?: string
  role?: string
  status?: string
}): Promise<AppUserDto> {
  const response = await http.post('/users', user)
  return response.data
}

export async function updateUser(id: string, user: Partial<AppUserDto>): Promise<void> {
  await http.put(`/users/${id}`, user)
}

export async function deleteUser(id: string): Promise<void> {
  await http.delete(`/users/${id}`)
}
