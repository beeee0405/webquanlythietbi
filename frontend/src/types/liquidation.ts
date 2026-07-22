import type { KpiDto, PointDto } from './common'

export type LiquidationStatus = 'Chờ duyệt' | 'Đã duyệt' | 'Hoàn thành'
export type LiquidationCondition = 'Hỏng hoàn toàn' | 'Lạc hậu' | 'Mất mát'

export interface LiquidationItem {
  id: string
  code: string
  assetCode: string
  assetName: string
  room: string
  reason: string
  condition: LiquidationCondition
  status: LiquidationStatus
  requester: string
  approver: string
  residualValue: string
  requestedAt: string
  completedAt: string
  note: string
}

export interface LiquidationManagementResponse {
  overview: KpiDto[]
  statusData: PointDto[]
  conditionData: PointDto[]
  items: LiquidationItem[]
  statuses: string[]
}
