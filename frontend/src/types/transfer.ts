import type { KpiDto, PointDto } from './common'

export type TransferStatus = 'Chờ duyệt' | 'Đã duyệt' | 'Hoàn thành' | 'Từ chối'

export interface TransferItem {
  id: string
  code: string
  assetCode: string
  assetName: string
  fromRoom: string
  toRoom: string
  requester: string
  approver: string
  status: TransferStatus
  transferredAt: string
  approvedAt: string
  note: string
}

export interface TransferManagementResponse {
  overview: KpiDto[]
  statusData: PointDto[]
  items: TransferItem[]
  statuses: string[]
}
