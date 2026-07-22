import type { KpiDto, PointDto } from './common'

export type InventoryStatus = 'Đang kiểm' | 'Hoàn thành' | 'Có lệch'

export interface InventorySession {
  id: string
  code: string
  room: string
  inspector: string
  status: InventoryStatus
  totalDevices: string
  checkedDevices: string
  missingDevices: string
  extraDevices: string
  startedAt: string
  completedAt: string
  note: string
}

export interface InventoryManagementResponse {
  overview: KpiDto[]
  statusData: PointDto[]
  items: InventorySession[]
  statuses: string[]
}
