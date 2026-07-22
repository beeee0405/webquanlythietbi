import type { NetworkItem, NetworkStatus, NetworkType } from '../types/network'

export const networkOverview = [
  { label: 'Tổng thiết bị mạng', value: '0', delta: '0%' },
  { label: 'Đang hoạt động', value: '0', delta: '0%' },
  { label: 'Cần xử lý', value: '0', delta: '0%' },
  { label: 'Hết bảo hành', value: '0', delta: '0%' },
]

export const networkTypeData: any[] = []
export const networkStatusData: any[] = []
export const networkTypes: NetworkType[] = ['Switch', 'Access Point', 'Router', 'Firewall', 'Controller']
export const networkStatuses: NetworkStatus[] = ['Hoạt động', 'Cảnh báo', 'Lỗi']
export const networkQueue: NetworkItem[] = []
