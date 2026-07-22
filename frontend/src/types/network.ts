import type { KpiDto, PointDto } from './common'

export type NetworkStatus = 'Hoạt động' | 'Cảnh báo' | 'Lỗi'
export type NetworkType = 'Switch' | 'Access Point' | 'Router' | 'Firewall' | 'Controller'

export interface NetworkItem {
  id: string
  code: string
  name: string
  type: NetworkType
  brand: string
  model: string
  room: string
  ipAddress: string
  macAddress: string
  vlan: string
  port: string
  status: NetworkStatus
  warranty: string
  installedAt: string
  note: string
}

export interface NetworkManagementResponse {
  overview: KpiDto[]
  typeData: PointDto[]
  statusData: PointDto[]
  items: NetworkItem[]
  types: string[]
  statuses: string[]
}
