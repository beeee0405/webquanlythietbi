import { http } from './http'
import {
  maintenanceBudgetData,
  maintenanceOverview,
  maintenancePriorities,
  maintenanceQueue,
  maintenanceStatuses,
  maintenanceStatusData,
  maintenanceTrendData,
  maintenanceTypes,
  maintenanceTypeData
} from '../data/maintenance'

export type MaintenanceApiData = {
  overview: typeof maintenanceOverview
  statusData: typeof maintenanceStatusData
  typeData: typeof maintenanceTypeData
  trendData: typeof maintenanceTrendData
  budgetData: typeof maintenanceBudgetData
  items: typeof maintenanceQueue
  statuses: string[]
  priorities: string[]
  types: string[]
}

const fallback: MaintenanceApiData = {
  overview: maintenanceOverview,
  statusData: maintenanceStatusData,
  typeData: maintenanceTypeData,
  trendData: maintenanceTrendData,
  budgetData: maintenanceBudgetData,
  items: maintenanceQueue,
  statuses: maintenanceStatuses,
  priorities: maintenancePriorities,
  types: maintenanceTypes
}

export async function getMaintenanceData(): Promise<MaintenanceApiData> {
  try {
    const response = await http.get<MaintenanceApiData>('/maintenance')
    return response.data
  } catch {
    return fallback
  }
}

export async function createMaintenance(item: any): Promise<any> {
  const response = await http.post('/maintenance', item)
  return response.data
}

export async function updateMaintenance(id: string, item: any): Promise<void> {
  await http.put(`/maintenance/${id}`, item)
}

export async function deleteMaintenance(id: string): Promise<void> {
  await http.delete(`/maintenance/${id}`)
}
