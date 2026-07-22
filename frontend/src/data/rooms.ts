import type { RoomItem, RoomStatus, RoomType } from '../types/room'

export const roomOverview = [
  { label: 'Tổng số phòng', value: '38', delta: '+3.2%' },
  { label: 'Phòng đang sử dụng', value: '31', delta: '+5.1%' },
  { label: 'Phòng cần kiểm kê', value: '6', delta: '-1.8%' },
  { label: 'Ticket đang mở', value: '14', delta: '+2.4%' }
]

export const roomStatusData = [
  { name: 'Đang sử dụng', value: 31 },
  { name: 'Bảo trì', value: 3 },
  { name: 'Tạm ngưng', value: 2 },
  { name: 'Dự phòng', value: 2 }
]

export const roomTypeData = [
  { name: 'Phòng máy', value: 12 },
  { name: 'Phòng học', value: 14 },
  { name: 'Văn phòng', value: 7 },
  { name: 'Phòng họp', value: 3 },
  { name: 'Server', value: 2 }
]

export const roomBuildingData = [
  { name: 'A1', value: 8 },
  { name: 'A2', value: 9 },
  { name: 'A3', value: 10 },
  { name: 'B1', value: 5 },
  { name: 'C1', value: 4 },
  { name: 'D1', value: 2 }
]

export const roomStatuses: RoomStatus[] = ['Đang sử dụng', 'Bảo trì', 'Tạm ngưng', 'Dự phòng']

export const roomTypes: RoomType[] = ['Phòng máy', 'Phòng học', 'Văn phòng', 'Phòng họp', 'Server']

export const roomBuildings = ['Tất cả', 'A1', 'A2', 'A3', 'B1', 'C1', 'D1']

export const roomQueue: RoomItem[] = [
  { id: '1', code: 'A3.302', name: 'Phòng máy A3.302', building: 'A3', floor: '3', type: 'Phòng máy', status: 'Đang sử dụng', manager: 'Nguyễn Văn Hoàng', capacity: 45, deviceCount: 42, activeTickets: 3, lastInventoryAt: '12/07/2026', note: 'Phòng máy thực hành CNTT, ưu tiên kiểm tra định kỳ hằng tháng.' },
  { id: '2', code: 'A2.101', name: 'Giảng đường A2.101', building: 'A2', floor: '1', type: 'Phòng học', status: 'Đang sử dụng', manager: 'Lê Minh Tâm', capacity: 80, deviceCount: 18, activeTickets: 1, lastInventoryAt: '08/07/2026', note: 'Có máy chiếu, camera và hệ thống âm thanh phục vụ giảng dạy.' },
  { id: '3', code: 'B1.201', name: 'Văn phòng B1.201', building: 'B1', floor: '2', type: 'Văn phòng', status: 'Đang sử dụng', manager: 'Phạm Anh Khoa', capacity: 20, deviceCount: 16, activeTickets: 2, lastInventoryAt: '02/07/2026', note: 'Khu hành chính, nhiều thiết bị in ấn và máy trạm.' },
  { id: '4', code: 'Server A', name: 'Phòng Server A', building: 'A1', floor: '1', type: 'Server', status: 'Đang sử dụng', manager: 'Trần Quốc Bảo', capacity: 6, deviceCount: 14, activeTickets: 4, lastInventoryAt: '15/07/2026', note: 'Theo dõi nhiệt độ, UPS, switch core và lịch bảo trì ngoài giờ.' },
  { id: '5', code: 'Server B', name: 'Phòng Server B', building: 'A1', floor: '1', type: 'Server', status: 'Bảo trì', manager: 'Trần Quốc Bảo', capacity: 4, deviceCount: 11, activeTickets: 2, lastInventoryAt: '15/07/2026', note: 'Đang kiểm tra UPS và nguồn dự phòng.' },
  { id: '6', code: 'D1.109', name: 'Phòng họp D1.109', building: 'D1', floor: '1', type: 'Phòng họp', status: 'Đang sử dụng', manager: 'Nguyễn Thị Lan', capacity: 35, deviceCount: 9, activeTickets: 0, lastInventoryAt: '28/06/2026', note: 'Có màn hình trình chiếu, camera họp trực tuyến và âm thanh.' },
  { id: '7', code: 'C1.103', name: 'Phòng học C1.103', building: 'C1', floor: '1', type: 'Phòng học', status: 'Dự phòng', manager: 'Lê Minh Tâm', capacity: 60, deviceCount: 7, activeTickets: 0, lastInventoryAt: '20/06/2026', note: 'Phòng dự phòng cho lịch học tăng cường.' },
  { id: '8', code: 'A1.205', name: 'Văn phòng A1.205', building: 'A1', floor: '2', type: 'Văn phòng', status: 'Tạm ngưng', manager: 'Phạm Anh Khoa', capacity: 18, deviceCount: 8, activeTickets: 2, lastInventoryAt: '10/06/2026', note: 'Tạm ngưng để sửa chữa điện nhẹ và kiểm tra mạng nội bộ.' }
]
