import type { InventorySession, InventoryStatus } from '../types/inventory'

export const inventoryOverview = [
  { label: 'Đợt kiểm kê', value: '0', delta: '0%' },
  { label: 'Hoàn thành', value: '0', delta: '0%' },
  { label: 'Có lệch', value: '0', delta: '0%' },
  { label: 'Đang kiểm', value: '0', delta: '0%' },
]

export const inventoryStatusData: any[] = []
export const inventoryStatuses: InventoryStatus[] = ['Đang kiểm', 'Hoàn thành', 'Có lệch']
export const inventoryQueue: InventorySession[] = []
