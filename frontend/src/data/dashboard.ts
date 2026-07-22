import type { DeviceRecord, KPIItem, TicketRecord } from '../types/dashboard'

export const kpiItems: KPIItem[] = [
  { label: 'Tổng thiết bị', value: '0', delta: '0%', tone: 'primary' },
  { label: 'Thiết bị đang hoạt động', value: '0', delta: '0%', tone: 'emerald' },
  { label: 'Thiết bị đang sửa', value: '0', delta: '0%', tone: 'amber' },
  { label: 'Ticket đang xử lý', value: '0', delta: '0%', tone: 'zinc' }
]

export const deviceTypeData: any[] = []
export const deviceStatusData: any[] = []
export const ticketMonthlyData: any[] = []
export const maintenanceCostData: any[] = []
export const maintenanceTrendData: any[] = []
export const ticketPriorityData: any[] = []
export const roomWorkloadData: any[] = []
export const assetLifecycleData: any[] = []
export const alertSummaryData: any[] = []
export const recentDevices: DeviceRecord[] = []
export const recentTickets: TicketRecord[] = []
