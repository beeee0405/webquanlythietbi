import type { TicketChannel, TicketItem, TicketPriority, TicketStatus } from '../types/ticket'

export const ticketOverview = [
  { label: 'Tổng ticket', value: '184', delta: '+18.2%' },
  { label: 'Đang xử lý', value: '27', delta: '+4.6%' },
  { label: 'Chờ phản hồi', value: '14', delta: '-1.2%' },
  { label: 'Hoàn thành hôm nay', value: '38', delta: '+9.1%' }
]

export const ticketStatusData = [
  { name: 'Mới', value: 41 },
  { name: 'Đang xử lý', value: 27 },
  { name: 'Chờ phản hồi', value: 14 },
  { name: 'Hoàn thành', value: 82 },
  { name: 'Đóng', value: 20 }
]

export const ticketPriorityData = [
  { name: 'Khẩn cấp', value: 12 },
  { name: 'Cao', value: 37 },
  { name: 'Trung bình', value: 89 },
  { name: 'Thấp', value: 46 }
]

export const ticketChannelData = [
  { name: 'QR', value: 58 },
  { name: 'Email', value: 41 },
  { name: 'Điện thoại', value: 23 },
  { name: 'Trực tiếp', value: 18 },
  { name: 'Hệ thống', value: 44 }
]

export const ticketSlaTrendData = [
  { name: 'T1', value: 78 },
  { name: 'T2', value: 82 },
  { name: 'T3', value: 85 },
  { name: 'T4', value: 88 },
  { name: 'T5', value: 90 },
  { name: 'T6', value: 93 }
]

export const ticketAgeBuckets = [
  { name: '< 1 ngày', value: 19 },
  { name: '1-3 ngày', value: 24 },
  { name: '3-7 ngày', value: 10 },
  { name: '> 7 ngày', value: 6 }
]

export const ticketStatuses: TicketStatus[] = ['Mới', 'Đang xử lý', 'Chờ phản hồi', 'Hoàn thành', 'Đóng']
export const ticketPriorities: TicketPriority[] = ['Khẩn cấp', 'Cao', 'Trung bình', 'Thấp']
export const ticketChannels: TicketChannel[] = ['QR', 'Email', 'Điện thoại', 'Trực tiếp', 'Hệ thống']

export const ticketQueue: TicketItem[] = [
  { id: '1', code: 'TK-140', subject: 'Máy in kẹt giấy phòng A102', requester: 'GV Nguyễn Văn A', room: 'A102', device: 'HP LaserJet 1020', category: 'In ấn', priority: 'Cao', status: 'Mới', channel: 'QR', assignee: 'Chưa phân công', sla: '4h', createdAt: '08:55', updatedAt: '08:55' },
  { id: '2', code: 'TK-141', subject: 'Mất mạng phòng A202', requester: 'Khoa CNTT', room: 'A202', device: 'AP Aruba AP-515', category: 'Mạng', priority: 'Khẩn cấp', status: 'Đang xử lý', channel: 'Email', assignee: 'Nguyễn Văn Hoàng', sla: '2h', createdAt: '09:10', updatedAt: '09:40' },
  { id: '3', code: 'TK-142', subject: 'Chuột máy A5.2 không hoạt động', requester: 'CB Trần Thị B', room: 'A5.2', device: 'Dell OptiPlex 3080', category: 'Ngoại vi', priority: 'Trung bình', status: 'Hoàn thành', channel: 'Hệ thống', assignee: 'Lê Minh Tâm', sla: '8h', createdAt: '09:25', updatedAt: '10:15' },
  { id: '4', code: 'TK-143', subject: 'Thiết bị camera mất tín hiệu', requester: 'Phòng Hành chính', room: 'B1.101', device: 'Hikvision DS-2CD', category: 'Camera', priority: 'Cao', status: 'Đang xử lý', channel: 'Điện thoại', assignee: 'Trần Quốc Bảo', sla: '4h', createdAt: '09:45', updatedAt: '10:35' },
  { id: '5', code: 'TK-144', subject: 'Cài đặt phần mềm văn phòng', requester: 'GV Lê Minh C', room: 'VP Khoa', device: 'MacBook Air M2', category: 'Phần mềm', priority: 'Thấp', status: 'Chờ phản hồi', channel: 'Trực tiếp', assignee: 'Phạm Anh Khoa', sla: '24h', createdAt: '10:05', updatedAt: '10:50' },
  { id: '6', code: 'TK-145', subject: 'Máy tính phòng máy tự restart', requester: 'Phòng máy', room: 'A3.302', device: 'Lenovo ThinkCentre M70q', category: 'Phần cứng', priority: 'Khẩn cấp', status: 'Đang xử lý', channel: 'QR', assignee: 'Nguyễn Văn Hoàng', sla: '2h', createdAt: '10:20', updatedAt: '11:05' },
  { id: '7', code: 'TK-146', subject: 'Switch server báo đèn đỏ', requester: 'KTV nội bộ', room: 'Server A', device: 'Cisco 24 Port', category: 'Mạng', priority: 'Cao', status: 'Mới', channel: 'Hệ thống', assignee: 'Chưa phân công', sla: '4h', createdAt: '10:28', updatedAt: '11:12' },
  { id: '8', code: 'TK-147', subject: 'Wifi yếu khu giảng đường', requester: 'Sinh viên', room: 'C1', device: 'AP Aruba AP-515', category: 'Mạng', priority: 'Trung bình', status: 'Hoàn thành', channel: 'QR', assignee: 'Lê Minh Tâm', sla: '8h', createdAt: '10:35', updatedAt: '11:20' },
  { id: '9', code: 'TK-148', subject: 'UPS phát tiếng kêu bất thường', requester: 'KTV', room: 'Server B', device: 'UPS Santak', category: 'Nguồn', priority: 'Cao', status: 'Đang xử lý', channel: 'Điện thoại', assignee: 'Trần Quốc Bảo', sla: '4h', createdAt: '10:50', updatedAt: '11:30' },
  { id: '10', code: 'TK-149', subject: 'Thiết bị scan QR không nhận mã', requester: 'Giảng viên', room: 'A2.104', device: 'Máy quét QR', category: 'Hệ thống', priority: 'Trung bình', status: 'Mới', channel: 'Email', assignee: 'Chưa phân công', sla: '8h', createdAt: '11:02', updatedAt: '11:42' },
  { id: '11', code: 'TK-150', subject: 'Thiết bị âm thanh phòng họp rè', requester: 'Phòng họp', room: 'D1.109', device: 'TV Samsung 55”', category: 'Âm thanh', priority: 'Thấp', status: 'Chờ phản hồi', channel: 'Trực tiếp', assignee: 'Phạm Anh Khoa', sla: '24h', createdAt: '11:15', updatedAt: '11:50' },
  { id: '12', code: 'TK-151', subject: 'Mất quyền truy cập máy in', requester: 'Phòng tài vụ', room: 'A1.205', device: 'HP LaserJet 1020', category: 'Phần mềm', priority: 'Trung bình', status: 'Đóng', channel: 'Hệ thống', assignee: 'Lê Minh Tâm', sla: '12h', createdAt: '11:20', updatedAt: '11:55' }
]
