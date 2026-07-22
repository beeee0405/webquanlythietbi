import type { PointDto } from '../types/common'

export const reportOverview = [
  { label: 'Tổng thiết bị', value: '0', delta: '0%' },
  { label: 'Ticket tháng này', value: '0', delta: '0%' },
  { label: 'Chi phí bảo trì', value: '0', delta: '0%' },
  { label: 'Tỉ lệ hoàn thành SLA', value: '0%', delta: '0%' },
]

export const reportDeviceByCategoryData: PointDto[] = []
export const reportDeviceByStatusData: PointDto[] = []
export const reportTicketByMonthData: PointDto[] = []
export const reportMaintenanceCostByMonthData: PointDto[] = []
export const reportTicketByPriorityData: PointDto[] = []
export const reportRoomWorkloadData: PointDto[] = []
