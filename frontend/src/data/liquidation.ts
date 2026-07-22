import type { LiquidationItem, LiquidationStatus, LiquidationCondition } from '../types/liquidation'

export const liquidationOverview = [
  { label: 'Yêu cầu thanh lý', value: '0', delta: '0%' },
  { label: 'Chờ duyệt', value: '0', delta: '0%' },
  { label: 'Hoàn thành', value: '0', delta: '0%' },
  { label: 'Giá trị còn lại', value: '0', delta: '0%' },
]

export const liquidationStatusData: any[] = []
export const liquidationConditionData: any[] = []
export const liquidationStatuses: LiquidationStatus[] = ['Chờ duyệt', 'Đã duyệt', 'Hoàn thành']
export const liquidationConditions: LiquidationCondition[] = ['Hỏng hoàn toàn', 'Lạc hậu', 'Mất mát']
export const liquidationQueue: LiquidationItem[] = []
