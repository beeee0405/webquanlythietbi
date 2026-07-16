import type { DeviceRecord, KPIItem, TicketRecord } from '../types/dashboard'

export const kpiItems: KPIItem[] = [
  { label: 'Tổng thiết bị', value: '2,450', delta: '+12.4%', tone: 'primary' },
  { label: 'Thiết bị đang hoạt động', value: '1,862', delta: '+7.8%', tone: 'emerald' },
  { label: 'Thiết bị đang sửa', value: '48', delta: '+1.1%', tone: 'amber' },
  { label: 'Ticket đang xử lý', value: '17', delta: '-3.2%', tone: 'zinc' }
]

export const deviceTypeData = [
  { name: 'PC', value: 980 },
  { name: 'Laptop', value: 210 },
  { name: 'Printer', value: 144 },
  { name: 'Network', value: 276 },
  { name: 'Camera', value: 98 },
  { name: 'Other', value: 742 }
]

export const deviceStatusData = [
  { name: 'Hoạt động', value: 1862 },
  { name: 'Đang sửa', value: 48 },
  { name: 'Bảo trì', value: 17 },
  { name: 'Hỏng', value: 39 },
  { name: 'Chờ thanh lý', value: 14 }
]

export const ticketMonthlyData = [
  { name: 'T1', value: 38 },
  { name: 'T2', value: 42 },
  { name: 'T3', value: 35 },
  { name: 'T4', value: 49 },
  { name: 'T5', value: 54 },
  { name: 'T6', value: 61 }
]

export const maintenanceCostData = [
  { name: 'T1', value: 8.2 },
  { name: 'T2', value: 6.7 },
  { name: 'T3', value: 9.1 },
  { name: 'T4', value: 12.6 },
  { name: 'T5', value: 10.4 },
  { name: 'T6', value: 14.3 }
]

export const maintenanceTrendData = [
  { name: 'T1', value: 4.2 },
  { name: 'T2', value: 5.1 },
  { name: 'T3', value: 6.4 },
  { name: 'T4', value: 7.8 },
  { name: 'T5', value: 7.2 },
  { name: 'T6', value: 8.9 }
]

export const ticketPriorityData = [
  { name: 'Khẩn cấp', value: 12 },
  { name: 'Cao', value: 27 },
  { name: 'Trung bình', value: 44 },
  { name: 'Thấp', value: 18 }
]

export const roomWorkloadData = [
  { name: 'A3.302', value: 18 },
  { name: 'A2.101', value: 13 },
  { name: 'B1.201', value: 11 },
  { name: 'C1.103', value: 9 },
  { name: 'Server A', value: 7 },
  { name: 'Server B', value: 6 }
]

export const assetLifecycleData = [
  { name: 'Mới', value: 38 },
  { name: 'Ổn định', value: 52 },
  { name: 'Sắp hết BH', value: 14 },
  { name: 'Cần thay thế', value: 9 }
]

export const alertSummaryData = [
  { label: 'Thiết bị quá hạn kiểm kê', value: '12' },
  { label: 'Ticket chưa phân công', value: '8' },
  { label: 'Thiết bị sắp hết bảo hành', value: '21' },
  { label: 'Lịch bảo trì tuần này', value: '5' }
]

export const recentDevices: DeviceRecord[] = [
  { id: '1', assetCode: 'TS-2401', name: 'Dell OptiPlex 3080', category: 'PC', room: 'A3.302', status: 'Hoạt động', warranty: '10/08/2026', updatedAt: '2 phút trước' },
  { id: '2', assetCode: 'TS-2402', name: 'HP LaserJet 1020', category: 'Printer', room: 'B1.201', status: 'Hỏng', warranty: '12/08/2026', updatedAt: '10 phút trước' },
  { id: '3', assetCode: 'TS-2403', name: 'Cisco 24 Port', category: 'Switch', room: 'Server A', status: 'Bảo trì', warranty: '18/09/2026', updatedAt: '15 phút trước' },
  { id: '4', assetCode: 'TS-2404', name: 'MacBook Air M2', category: 'Laptop', room: 'VP Khoa', status: 'Đang sửa', warranty: '30/07/2026', updatedAt: '18 phút trước' },
  { id: '5', assetCode: 'TS-2405', name: 'Hikvision DS-2CD', category: 'Camera', room: 'A2.101', status: 'Hoạt động', warranty: '01/12/2026', updatedAt: '22 phút trước' },
  { id: '6', assetCode: 'TS-2406', name: 'AP Aruba AP-515', category: 'Access Point', room: 'A1.205', status: 'Hoạt động', warranty: '20/11/2026', updatedAt: '25 phút trước' },
  { id: '7', assetCode: 'TS-2407', name: 'Sony VPL-DX221', category: 'Projector', room: 'C1.103', status: 'Hoạt động', warranty: '14/10/2026', updatedAt: '30 phút trước' },
  { id: '8', assetCode: 'TS-2408', name: 'UPS Santak', category: 'UPS', room: 'Server B', status: 'Bảo trì', warranty: '05/09/2026', updatedAt: '35 phút trước' },
  { id: '9', assetCode: 'TS-2409', name: 'Router Mikrotik', category: 'Router', room: 'Server A', status: 'Hoạt động', warranty: '01/01/2027', updatedAt: '40 phút trước' },
  { id: '10', assetCode: 'TS-2410', name: 'TV Samsung 55”', category: 'Display', room: 'D1.109', status: 'Hoạt động', warranty: '12/11/2026', updatedAt: '42 phút trước' }
]

export const recentTickets: TicketRecord[] = [
  { id: 'TK-140', subject: 'Máy in kẹt giấy phòng A102', room: 'A102', requester: 'GV Nguyễn Văn A', priority: 'Cao', status: 'Mới', updatedAt: '08:55' },
  { id: 'TK-141', subject: 'Mất mạng phòng A202', room: 'A202', requester: 'Khoa CNTT', priority: 'Khẩn cấp', status: 'Đang xử lý', updatedAt: '09:40' },
  { id: 'TK-142', subject: 'Chuột máy A5.2 không hoạt động', room: 'A5.2', requester: 'CB Trần Thị B', priority: 'Trung bình', status: 'Hoàn thành', updatedAt: '10:15' },
  { id: 'TK-143', subject: 'Thiết bị camera mất tín hiệu', room: 'B1.101', requester: 'Phòng Hành chính', priority: 'Cao', status: 'Đang xử lý', updatedAt: '10:35' },
  { id: 'TK-144', subject: 'Cài đặt phần mềm văn phòng', room: 'VP Khoa', requester: 'GV Lê Minh C', priority: 'Trung bình', status: 'Mới', updatedAt: '10:50' },
  { id: 'TK-145', subject: 'Máy tính phòng máy tự restart', room: 'A3.302', requester: 'Phòng máy', priority: 'Khẩn cấp', status: 'Đang xử lý', updatedAt: '11:05' },
  { id: 'TK-146', subject: 'Switch server báo đèn đỏ', room: 'Server A', requester: 'KTV nội bộ', priority: 'Cao', status: 'Mới', updatedAt: '11:12' },
  { id: 'TK-147', subject: 'Wifi yếu khu giảng đường', room: 'C1', requester: 'Sinh viên', priority: 'Trung bình', status: 'Hoàn thành', updatedAt: '11:20' },
  { id: 'TK-148', subject: 'UPS phát tiếng kêu bất thường', room: 'Server B', requester: 'KTV', priority: 'Cao', status: 'Đang xử lý', updatedAt: '11:30' },
  { id: 'TK-149', subject: 'Thiết bị scan QR không nhận mã', room: 'A2.104', requester: 'Giảng viên', priority: 'Trung bình', status: 'Mới', updatedAt: '11:42' }
]
