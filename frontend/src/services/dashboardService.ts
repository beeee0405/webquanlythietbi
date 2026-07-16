import { http } from './http'
import {
  alertSummaryData,
  assetLifecycleData,
  deviceStatusData,
  deviceTypeData,
  kpiItems,
  maintenanceCostData,
  maintenanceTrendData,
  recentDevices,
  recentTickets,
  roomWorkloadData,
  ticketPriorityData,
  ticketMonthlyData
} from '../data/dashboard'

export type DashboardApiData = {
  kpis: typeof kpiItems
  deviceTypes: typeof deviceTypeData
  deviceStatuses: typeof deviceStatusData
  ticketMonthly: typeof ticketMonthlyData
  maintenanceCosts: typeof maintenanceCostData
  maintenanceTrend: typeof maintenanceTrendData
  ticketPriority: typeof ticketPriorityData
  roomWorkload: typeof roomWorkloadData
  assetLifecycle: typeof assetLifecycleData
  alerts: typeof alertSummaryData
  devices: typeof recentDevices
  tickets: typeof recentTickets
}

const fallback: DashboardApiData = {
  kpis: kpiItems,
  deviceTypes: deviceTypeData,
  deviceStatuses: deviceStatusData,
  ticketMonthly: ticketMonthlyData,
  maintenanceCosts: maintenanceCostData,
  maintenanceTrend: maintenanceTrendData,
  ticketPriority: ticketPriorityData,
  roomWorkload: roomWorkloadData,
  assetLifecycle: assetLifecycleData,
  alerts: alertSummaryData,
  devices: recentDevices,
  tickets: recentTickets
}

export async function getDashboardData(): Promise<DashboardApiData> {
  try {
    const response = await http.get<DashboardApiData>('/dashboard')
    return response.data
  } catch {
    return fallback
  }
}
