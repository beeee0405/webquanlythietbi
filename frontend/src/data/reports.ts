import type { PointDto } from '../types/common'

export const reportOverview = [
  { label: 'Tổng thiết bị', value: '2,450', delta: '+12.4%' },
  { label: 'Ticket tháng này', value: '61', delta: '+9.1%' },
  { label: 'Chi phí bảo trì', value: '61.6M', delta: '+4.7%' },
  { label: 'Tỉ lệ hoàn thành SLA', value: '93%', delta: '+2.1%' },
]

export const reportDeviceByCategoryData: PointDto[] = [
  { name: 'PC', value: 980 },
  { name: 'Laptop', value: 210 },
  { name: 'Printer', value: 144 },
  { name: 'Network', value: 276 },
  { name: 'Camera', value: 98 },
  { name: 'Khác', value: 742 },
]

export const reportDeviceByStatusData: PointDto[] = [
  { name: 'Hoạt động', value: 1862 },
  { name: 'Đang sửa', value: 48 },
  { name: 'Bảo trì', value: 17 },
  { name: 'Hỏng', value: 39 },
  { name: 'Chờ thanh lý', value: 14 },
]

export const reportTicketByMonthData: PointDto[] = [
  { name: 'T1', value: 38 },
  { name: 'T2', value: 42 },
  { name: 'T3', value: 35 },
  { name: 'T4', value: 49 },
  { name: 'T5', value: 54 },
  { name: 'T6', value: 61 },
]

export const reportMaintenanceCostByMonthData: PointDto[] = [
  { name: 'T1', value: 8 },
  { name: 'T2', value: 7 },
  { name: 'T3', value: 9 },
  { name: 'T4', value: 13 },
  { name: 'T5', value: 10 },
  { name: 'T6', value: 14 },
]

export const reportTicketByPriorityData: PointDto[] = [
  { name: 'Khẩn cấp', value: 12 },
  { name: 'Cao', value: 27 },
  { name: 'Trung bình', value: 44 },
  { name: 'Thấp', value: 18 },
]

export const reportRoomWorkloadData: PointDto[] = [
  { name: 'A3.302', value: 18 },
  { name: 'A2.101', value: 13 },
  { name: 'B1.201', value: 11 },
  { name: 'C1.103', value: 9 },
  { name: 'Server A', value: 7 },
  { name: 'Server B', value: 6 },
]
