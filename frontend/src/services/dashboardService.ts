import { http } from './http'
import type { DeviceRecord, KPIItem, TicketRecord } from '../types/dashboard'
import type { PointDto, AlertDto } from '../types/common'

export interface DashboardApiData {
  kpis: KPIItem[]
  deviceTypes: PointDto[]
  deviceStatuses: PointDto[]
  ticketMonthly: PointDto[]
  maintenanceCosts: PointDto[]
  maintenanceTrend: PointDto[]
  ticketPriority: PointDto[]
  roomWorkload: PointDto[]
  assetLifecycle: PointDto[]
  alerts: AlertDto[]
  devices: DeviceRecord[]
  tickets: TicketRecord[]
}

export async function getDashboardData(): Promise<DashboardApiData> {
  const response = await http.get<DashboardApiData>('/dashboard')
  return response.data
}
