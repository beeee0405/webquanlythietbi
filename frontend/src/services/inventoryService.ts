import { http } from './http'
import type { InventoryManagementResponse } from '../types/inventory'

export async function getInventoryData(): Promise<InventoryManagementResponse> {
  const response = await http.get('/inventory')
  return response.data
}

export async function createInventorySession(session: any): Promise<any> {
  const response = await http.post('/inventory', session)
  return response.data
}

export async function updateInventorySession(id: string, session: any): Promise<void> {
  await http.put(`/inventory/${id}`, session)
}

export async function deleteInventorySession(id: string): Promise<void> {
  await http.delete(`/inventory/${id}`)
}
