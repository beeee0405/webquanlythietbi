import type { DeviceItem, DeviceStatus } from '../types/device'

export const deviceOverview = [
  { label: 'Tổng thiết bị', value: '0', delta: '0%' },
  { label: 'Đang hoạt động', value: '0', delta: '0%' },
  { label: 'Cần xử lý', value: '0', delta: '0%' },
  { label: 'Sắp hết bảo hành', value: '0', delta: '0%' }
]

export const deviceStatusData: any[] = []
export const deviceLocationData: any[] = []
export const deviceStatuses: DeviceStatus[] = ['Hoạt động', 'Đang sửa', 'Bảo trì', 'Hỏng', 'Chờ thanh lý']
export const deviceCategories: string[] = ['Tất cả', 'PC', 'Printer', 'Switch', 'Laptop', 'Camera', 'Access Point', 'Projector', 'UPS', 'Router', 'Display']
export const deviceQueue: DeviceItem[] = []
