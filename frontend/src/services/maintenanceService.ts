import { http } from './http'
import type { MaintenanceItem } from '../types/maintenance'
import type { KpiDto, PointDto } from '../types/common'

export interface MaintenanceApiData {
  overview: KpiDto[]
  statusData: PointDto[]
  typeData: PointDto[]
  trendData: PointDto[]
  budgetData: PointDto[]
  items: MaintenanceItem[]
  statuses: string[]
  priorities: string[]
  types: string[]
}

export async function getMaintenanceData(): Promise<MaintenanceApiData> {
  const response = await http.get<MaintenanceApiData>('/maintenance')
  return response.data
}

export async function createMaintenance(item: Partial<MaintenanceItem>): Promise<MaintenanceItem> {
  const response = await http.post('/maintenance', item)
  return response.data
}

export async function updateMaintenance(id: string, item: Partial<MaintenanceItem>): Promise<void> {
  await http.put(`/maintenance/${id}`, item)
}

export async function deleteMaintenance(id: string): Promise<void> {
  await http.delete(`/maintenance/${id}`)
}
