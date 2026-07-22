import type { TransferItem, TransferStatus } from '../types/transfer'

export const transferOverview = [
  { label: 'Tổng điều chuyển', value: '0', delta: '0%' },
  { label: 'Chờ duyệt', value: '0', delta: '0%' },
  { label: 'Hoàn thành', value: '0', delta: '0%' },
  { label: 'Từ chối', value: '0', delta: '0%' },
]

export const transferStatusData: any[] = []
export const transferStatuses: TransferStatus[] = ['Chờ duyệt', 'Đã duyệt', 'Hoàn thành', 'Từ chối']
export const transferQueue: TransferItem[] = []
