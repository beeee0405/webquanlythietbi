import { http } from './http'
import type { InventoryManagementResponse } from '../types/inventory'

export async function getInventoryData(): Promise<InventoryManagementResponse> {
  const response = await http.get('/inventory')
  return response.data
}
