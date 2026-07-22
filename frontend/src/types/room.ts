import type { KpiDto, PointDto } from './common'

export type RoomStatus = 'Đang sử dụng' | 'Bảo trì' | 'Tạm ngưng' | 'Dự phòng'

export type RoomType = 'Phòng máy' | 'Phòng học' | 'Văn phòng' | 'Phòng họp' | 'Server'

export interface RoomItem {
  id: string
  code: string
  name: string
  building: string
  floor: string
  type: RoomType
  status: RoomStatus
  manager: string
  capacity: number
  deviceCount: number
  activeTickets: number
  lastInventoryAt: string
  note: string
}

export interface RoomManagementResponse {
  overview: KpiDto[]
  statusData: PointDto[]
  typeData: PointDto[]
  buildingData: PointDto[]
  items: RoomItem[]
  statuses: RoomStatus[]
  types: RoomType[]
  buildings: string[]
}
