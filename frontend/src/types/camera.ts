import type { KpiDto, PointDto } from './common'

export type CameraStatus = 'Hoạt động' | 'Lỗi' | 'Mất tín hiệu'

export interface CameraItem {
  id: string
  code: string
  name: string
  room: string
  ipAddress: string
  brand: string
  model: string
  resolution: string
  status: CameraStatus
  installedAt: string
  warranty: string
  note: string
}

export interface CameraManagementResponse {
  overview: KpiDto[]
  statusData: PointDto[]
  roomLoad: PointDto[]
  items: CameraItem[]
  statuses: string[]
}
