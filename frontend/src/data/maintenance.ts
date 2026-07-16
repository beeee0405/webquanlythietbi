import type { MaintenanceItem, MaintenancePriority, MaintenanceStatus, MaintenanceType } from '../types/maintenance'

export const maintenanceOverview = [
  { label: 'Kế hoạch tháng', value: '42', delta: '+11.6%' },
  { label: 'Đang thực hiện', value: '9', delta: '+2.4%' },
  { label: 'Hoàn thành', value: '28', delta: '+8.1%' },
  { label: 'Chi phí dự kiến', value: '126M', delta: '+4.7%' }
]

export const maintenanceStatusData = [
  { name: 'Chờ duyệt', value: 11 },
  { name: 'Đang thực hiện', value: 9 },
  { name: 'Hoàn thành', value: 28 },
  { name: 'Tạm hoãn', value: 5 }
]

export const maintenanceTypeData = [
  { name: 'Phòng ngừa', value: 19 },
  { name: 'Sửa chữa', value: 14 },
  { name: 'Vệ sinh', value: 7 },
  { name: 'Kiểm tra', value: 10 }
]

export const maintenanceTrendData = [
  { name: 'T1', value: 7 },
  { name: 'T2', value: 9 },
  { name: 'T3', value: 11 },
  { name: 'T4', value: 13 },
  { name: 'T5', value: 15 },
  { name: 'T6', value: 18 }
]

export const maintenanceBudgetData = [
  { name: 'T1', value: 16 },
  { name: 'T2', value: 18 },
  { name: 'T3', value: 20 },
  { name: 'T4', value: 22 },
  { name: 'T5', value: 24 },
  { name: 'T6', value: 26 }
]

export const maintenanceStatuses: MaintenanceStatus[] = ['Chờ duyệt', 'Đang thực hiện', 'Hoàn thành', 'Tạm hoãn']
export const maintenancePriorities: MaintenancePriority[] = ['Khẩn cấp', 'Cao', 'Trung bình', 'Thấp']
export const maintenanceTypes: MaintenanceType[] = ['Phòng ngừa', 'Sửa chữa', 'Vệ sinh', 'Kiểm tra']

export const maintenanceQueue: MaintenanceItem[] = [
  { id: '1', code: 'MT-001', title: 'Bảo trì phòng máy A3.302', assetCode: 'TS-2401', assetName: 'Dell OptiPlex 3080', room: 'A3.302', type: 'Phòng ngừa', priority: 'Cao', status: 'Đang thực hiện', assignee: 'Nguyễn Văn Hoàng', scheduledAt: '02/08/2026 08:00', completedAt: '-', cost: '12.500.000', note: 'Vệ sinh bụi, kiểm tra RAM và ổ SSD' },
  { id: '2', code: 'MT-002', title: 'Kiểm tra switch server', assetCode: 'TS-2403', assetName: 'Cisco 24 Port', room: 'Server A', type: 'Kiểm tra', priority: 'Khẩn cấp', status: 'Chờ duyệt', assignee: 'Trần Quốc Bảo', scheduledAt: '02/08/2026 10:00', completedAt: '-', cost: '6.800.000', note: 'Đèn đỏ port 12, gián đoạn mạng nội bộ' },
  { id: '3', code: 'MT-003', title: 'Vệ sinh UPS phòng server B', assetCode: 'TS-2408', assetName: 'UPS Santak', room: 'Server B', type: 'Vệ sinh', priority: 'Trung bình', status: 'Hoàn thành', assignee: 'Phạm Anh Khoa', scheduledAt: '28/07/2026 14:00', completedAt: '28/07/2026 16:30', cost: '3.200.000', note: 'Thay lọc bụi, kiểm tra pin dự phòng' },
  { id: '4', code: 'MT-004', title: 'Sửa máy in phòng A102', assetCode: 'TS-2402', assetName: 'HP LaserJet 1020', room: 'B1.201', type: 'Sửa chữa', priority: 'Cao', status: 'Đang thực hiện', assignee: 'Lê Minh Tâm', scheduledAt: '03/08/2026 09:00', completedAt: '-', cost: '2.900.000', note: 'Kẹt giấy liên tục, thay roller và cảm biến' },
  { id: '5', code: 'MT-005', title: 'Kiểm tra AP khu giảng đường', assetCode: 'TS-2406', assetName: 'AP Aruba AP-515', room: 'A1.205', type: 'Kiểm tra', priority: 'Trung bình', status: 'Chờ duyệt', assignee: 'Nguyễn Văn Hoàng', scheduledAt: '04/08/2026 13:30', completedAt: '-', cost: '1.500.000', note: 'Tín hiệu dao động theo giờ cao điểm' },
  { id: '6', code: 'MT-006', title: 'Bảo trì camera hành lang', assetCode: 'TS-2405', assetName: 'Hikvision DS-2CD', room: 'A2.101', type: 'Phòng ngừa', priority: 'Thấp', status: 'Hoàn thành', assignee: 'Trần Quốc Bảo', scheduledAt: '25/07/2026 15:00', completedAt: '25/07/2026 16:15', cost: '2.100.000', note: 'Căn chỉnh góc quay, cập nhật firmware' },
  { id: '7', code: 'MT-007', title: 'Bảo trì projector phòng học', assetCode: 'TS-2407', assetName: 'Sony VPL-DX221', room: 'C1.103', type: 'Vệ sinh', priority: 'Thấp', status: 'Hoàn thành', assignee: 'Phạm Anh Khoa', scheduledAt: '26/07/2026 10:00', completedAt: '26/07/2026 11:10', cost: '1.200.000', note: 'Vệ sinh bụi lens, kiểm tra bóng đèn' },
  { id: '8', code: 'MT-008', title: 'Sửa router core nội bộ', assetCode: 'TS-2409', assetName: 'Router Mikrotik', room: 'Server A', type: 'Sửa chữa', priority: 'Khẩn cấp', status: 'Đang thực hiện', assignee: 'Nguyễn Văn Hoàng', scheduledAt: '02/08/2026 11:15', completedAt: '-', cost: '8.450.000', note: 'Packet loss tăng, cần kiểm tra nguồn và firmware' },
  { id: '9', code: 'MT-009', title: 'Vệ sinh máy tính phòng máy', assetCode: 'TS-2411', assetName: 'Lenovo ThinkCentre M70q', room: 'A3.302', type: 'Vệ sinh', priority: 'Trung bình', status: 'Tạm hoãn', assignee: 'Lê Minh Tâm', scheduledAt: '05/08/2026 08:30', completedAt: '-', cost: '4.000.000', note: 'Dời lịch do đang thi giữa kỳ' },
  { id: '10', code: 'MT-010', title: 'Kiểm tra máy in quyền truy cập', assetCode: 'TS-2412', assetName: 'Dell Latitude 5440', room: 'A1.205', type: 'Kiểm tra', priority: 'Cao', status: 'Chờ duyệt', assignee: 'Trần Quốc Bảo', scheduledAt: '06/08/2026 09:45', completedAt: '-', cost: '700.000', note: 'Đánh giá khả năng thanh lý hoặc điều chuyển' }
]
