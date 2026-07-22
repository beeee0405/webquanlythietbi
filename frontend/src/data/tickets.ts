import type { TicketChannel, TicketItem, TicketPriority, TicketStatus } from '../types/ticket'

export const ticketOverview = [
  { label: 'Tổng ticket', value: '0', delta: '0%' },
  { label: 'Đang xử lý', value: '0', delta: '0%' },
  { label: 'Chờ phản hồi', value: '0', delta: '0%' },
  { label: 'Hoàn thành hôm nay', value: '0', delta: '0%' }
]

export const ticketStatusData: any[] = []
export const ticketPriorityData: any[] = []
export const ticketChannelData: any[] = []
export const ticketSlaTrendData: any[] = []
export const ticketAgeBuckets: any[] = []
export const ticketStatuses: TicketStatus[] = ['Mới', 'Đang xử lý', 'Chờ phản hồi', 'Hoàn thành', 'Đóng']
export const ticketPriorities: TicketPriority[] = ['Khẩn cấp', 'Cao', 'Trung bình', 'Thấp']
export const ticketChannels: TicketChannel[] = ['QR', 'Email', 'Điện thoại', 'Trực tiếp', 'Hệ thống']
export const ticketQueue: TicketItem[] = []
