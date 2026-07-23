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
  purchaseDate: string
  updatedAt: string
}

export type DeviceDto = DeviceItem

export interface DeviceManagementResponse {
  overview: KpiDto[]
  statusBreakdown: PointDto[]
  roomLoad: PointDto[]
  devices: DeviceItem[]
  categories: string[]
}