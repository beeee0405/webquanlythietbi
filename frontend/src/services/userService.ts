import { http } from './http'
import type { UserManagementResponse } from '../types/user'

export async function getUserData(): Promise<UserManagementResponse> {
  const response = await http.get('/users')
  return response.data
}
