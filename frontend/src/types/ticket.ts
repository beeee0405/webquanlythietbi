import type { KpiDto, PointDto } from './common'

export type TicketPriority = 'Khẩn cấp' | 'Cao' | 'Trung bình' | 'Thấp'

export type TicketStatus = 'Mới' | 'Đang xử lý' | 'Chờ phản hồi' | 'Hoàn thành' | 'Đóng'

export type TicketChannel = 'QR' | 'Email' | 'Điện thoại' | 'Trực tiếp' | 'Hệ thống'

export type TicketItem = {
  id: string
  code: string
  subject: string
  requester: string
  room: string
  device: string
  category: string
  priority: TicketPriority
  status: TicketStatus
  channel: TicketChannel
  assignee: string
  sla: string
  createdAt: string
  updatedAt: string
}

export interface TicketManagementResponse {
  overview: KpiDto[]
  statusData: PointDto[]
  priorityData: PointDto[]
  channelData: PointDto[]
  slaTrendData: PointDto[]
  ageBuckets: PointDto[]
  items: TicketItem[]
  statuses: string[]
  priorities: string[]
  channels: string[]
}
