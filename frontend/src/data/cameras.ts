import type { CameraItem, CameraStatus } from '../types/camera'

export const cameraOverview = [
  { label: 'Tổng camera', value: '0', delta: '0%' },
  { label: 'Đang hoạt động', value: '0', delta: '0%' },
  { label: 'Cần kiểm tra', value: '0', delta: '0%' },
  { label: 'Hết bảo hành', value: '0', delta: '0%' },
]

export const cameraStatusData: any[] = []
export const cameraRoomLoad: any[] = []
export const cameraStatuses: CameraStatus[] = ['Hoạt động', 'Lỗi', 'Mất tín hiệu']
export const cameraQueue: CameraItem[] = []
