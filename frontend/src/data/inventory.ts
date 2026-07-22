import type { InventorySession, InventoryStatus } from '../types/inventory'

export const inventoryOverview = [
  { label: 'Đợt kiểm kê', value: '18', delta: '+2.1%' },
  { label: 'Hoàn thành', value: '12', delta: '+3.4%' },
  { label: 'Có lệch', value: '4', delta: '-1.1%' },
  { label: 'Đang kiểm', value: '2', delta: '0%' },
]

export const inventoryStatusData = [
  { name: 'Hoàn thành', value: 12 },
  { name: 'Có lệch', value: 4 },
  { name: 'Đang kiểm', value: 2 },
]

export const inventoryStatuses: InventoryStatus[] = ['Đang kiểm', 'Hoàn thành', 'Có lệch']

export const inventoryQueue: InventorySession[] = [
  { id: '1', code: 'INV-001', room: 'A3.302', inspector: 'Nguyễn Văn Hoàng', status: 'Hoàn thành', totalDevices: '42', checkedDevices: '42', missingDevices: '0', extraDevices: '0', startedAt: '01/07/2026 08:00', completedAt: '01/07/2026 11:30', note: 'Tất cả thiết bị khớp, không có lệch' },
  { id: '2', code: 'INV-002', room: 'B1.201', inspector: 'Lê Minh Tâm', status: 'Có lệch', totalDevices: '16', checkedDevices: '16', missingDevices: '1', extraDevices: '0', startedAt: '05/07/2026 09:00', completedAt: '05/07/2026 10:45', note: 'Thiếu 1 máy in HP LaserJet, đang xác minh' },
  { id: '3', code: 'INV-003', room: 'Server A', inspector: 'Trần Quốc Bảo', status: 'Hoàn thành', totalDevices: '14', checkedDevices: '14', missingDevices: '0', extraDevices: '0', startedAt: '10/07/2026 14:00', completedAt: '10/07/2026 15:20', note: 'Tất cả thiết bị server và mạng đầy đủ' },
  { id: '4', code: 'INV-004', room: 'D1.109', inspector: 'Phạm Anh Khoa', status: 'Hoàn thành', totalDevices: '9', checkedDevices: '9', missingDevices: '0', extraDevices: '0', startedAt: '12/07/2026 08:30', completedAt: '12/07/2026 09:15', note: 'Thiết bị phòng họp kiểm kê đủ' },
  { id: '5', code: 'INV-005', room: 'A2.101', inspector: 'Nguyễn Văn Hoàng', status: 'Đang kiểm', totalDevices: '18', checkedDevices: '12', missingDevices: '0', extraDevices: '0', startedAt: '18/07/2026 08:00', completedAt: '-', note: 'Đang tiến hành, dự kiến hoàn thành chiều nay' },
  { id: '6', code: 'INV-006', room: 'A1.205', inspector: 'Lê Minh Tâm', status: 'Có lệch', totalDevices: '8', checkedDevices: '8', missingDevices: '0', extraDevices: '2', startedAt: '15/07/2026 10:00', completedAt: '15/07/2026 11:30', note: 'Phát hiện 2 thiết bị không trong danh mục' },
  { id: '7', code: 'INV-007', room: 'C1.103', inspector: 'Phạm Anh Khoa', status: 'Hoàn thành', totalDevices: '7', checkedDevices: '7', missingDevices: '0', extraDevices: '0', startedAt: '08/07/2026 13:00', completedAt: '08/07/2026 14:10', note: 'Phòng dự phòng, ít thiết bị, kiểm tra nhanh' },
  { id: '8', code: 'INV-008', room: 'Server B', inspector: 'Trần Quốc Bảo', status: 'Đang kiểm', totalDevices: '11', checkedDevices: '7', missingDevices: '0', extraDevices: '0', startedAt: '19/07/2026 09:00', completedAt: '-', note: 'Đang kiểm tra thiết bị UPS và nguồn dự phòng' },
]
