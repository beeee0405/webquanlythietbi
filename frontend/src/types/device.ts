import type { KpiDto, PointDto } from './common'

export type DeviceStatus = 'Hoạt động' | 'Đang sửa' | 'Bảo trì' | 'Hỏng' | 'Chờ thanh lý'

export interface DeviceItem {
  id: string
  assetCode: string
  name: string
  category: string
  brand: string
  room: string
  owner: string
  status: DeviceStatus
  warranty: string
  serial: string
  purchasedAt: string
  updatedAt: string
}

export interface DeviceManagementResponse {
  overview: KpiDto[]
  statusData: PointDto[]
  locationData: PointDto[]
  items: DeviceItem[]
  categories: string[]
}