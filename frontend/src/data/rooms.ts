import type { RoomItem, RoomStatus, RoomType } from '../types/room'

export const roomOverview = [
  { label: 'Tổng số phòng', value: '0', delta: '0%' },
  { label: 'Phòng đang sử dụng', value: '0', delta: '0%' },
  { label: 'Phòng cần kiểm kê', value: '0', delta: '0%' },
  { label: 'Ticket đang mở', value: '0', delta: '0%' }
]

export const roomStatusData: any[] = []
export const roomTypeData: any[] = []
export const roomBuildingData: any[] = []
export const roomStatuses: RoomStatus[] = ['Đang sử dụng', 'Bảo trì', 'Tạm ngưng', 'Dự phòng']
export const roomTypes: RoomType[] = ['Phòng máy', 'Phòng học', 'Văn phòng', 'Phòng họp', 'Server']
export const roomBuildings = ['Tất cả', 'A1', 'A2', 'A3', 'B1', 'C1', 'D1']
export const roomQueue: RoomItem[] = []
