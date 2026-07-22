import type { CameraItem, CameraStatus } from '../types/camera'

export const cameraOverview = [
  { label: 'Tổng camera', value: '42', delta: '+5.3%' },
  { label: 'Đang hoạt động', value: '38', delta: '+4.1%' },
  { label: 'Cần kiểm tra', value: '4', delta: '+1.2%' },
  { label: 'Hết bảo hành', value: '7', delta: '-0.8%' },
]

export const cameraStatusData = [
  { name: 'Hoạt động', value: 38 },
  { name: 'Lỗi', value: 2 },
  { name: 'Mất tín hiệu', value: 2 },
]

export const cameraRoomLoad = [
  { name: 'Sân trường', value: 8 },
  { name: 'A2.101', value: 6 },
  { name: 'A3.302', value: 5 },
  { name: 'Server A', value: 4 },
  { name: 'B1.201', value: 4 },
  { name: 'D1.109', value: 3 },
]

export const cameraStatuses: CameraStatus[] = ['Hoạt động', 'Lỗi', 'Mất tín hiệu']

export const cameraQueue: CameraItem[] = [
  { id: '1', code: 'CAM-001', name: 'Camera hành lang A2.101', room: 'A2.101', ipAddress: '192.168.10.21', brand: 'Hikvision', model: 'DS-2CD2143G2-I', resolution: '4MP', status: 'Hoạt động', installedAt: '14/03/2024', warranty: '14/03/2027', note: 'Góc rộng, hướng cửa ra vào' },
  { id: '2', code: 'CAM-002', name: 'Camera phòng máy A3.302', room: 'A3.302', ipAddress: '192.168.10.22', brand: 'Hikvision', model: 'DS-2CD2143G2-I', resolution: '4MP', status: 'Hoạt động', installedAt: '14/03/2024', warranty: '14/03/2027', note: 'Góc trên, bao phủ toàn phòng' },
  { id: '3', code: 'CAM-003', name: 'Camera Server A', room: 'Server A', ipAddress: '192.168.10.30', brand: 'Dahua', model: 'IPC-HDW2831T-AS', resolution: '8MP', status: 'Hoạt động', installedAt: '01/02/2023', warranty: '01/02/2026', note: 'Camera phòng server, hỗ trợ hồng ngoại' },
  { id: '4', code: 'CAM-004', name: 'Camera sân trường B1', room: 'Sân trường', ipAddress: '192.168.10.41', brand: 'Axis', model: 'P3245-V', resolution: '2MP', status: 'Mất tín hiệu', installedAt: '10/06/2022', warranty: '10/06/2025', note: 'Cần kiểm tra cáp và nguồn điện' },
  { id: '5', code: 'CAM-005', name: 'Camera cổng chính', room: 'Cổng trường', ipAddress: '192.168.10.50', brand: 'Hikvision', model: 'DS-2CD2T47G2-L', resolution: '4MP', status: 'Hoạt động', installedAt: '05/09/2023', warranty: '05/09/2026', note: 'Camera màu ban đêm, tích hợp mic' },
  { id: '6', code: 'CAM-006', name: 'Camera phòng họp D1.109', room: 'D1.109', ipAddress: '192.168.10.61', brand: 'Dahua', model: 'IPC-HDW1439S1-LED', resolution: '4MP', status: 'Hoạt động', installedAt: '02/10/2023', warranty: '02/10/2026', note: 'Góc rộng phục vụ họp online' },
  { id: '7', code: 'CAM-007', name: 'Camera hành lang B tầng 2', room: 'B1.201', ipAddress: '192.168.10.72', brand: 'Hikvision', model: 'DS-2CD2123G2-I', resolution: '2MP', status: 'Lỗi', installedAt: '08/01/2023', warranty: '08/01/2026', note: 'Lỗi firmware, cần cập nhật' },
  { id: '8', code: 'CAM-008', name: 'Camera bãi xe', room: 'Bãi xe A', ipAddress: '192.168.10.80', brand: 'Axis', model: 'P3245-VE', resolution: '2MP', status: 'Hoạt động', installedAt: '20/07/2024', warranty: '20/07/2027', note: 'Camera ngoài trời, chống nước IP67' },
]
