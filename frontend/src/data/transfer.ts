import type { TransferItem, TransferStatus } from '../types/transfer'

export const transferOverview = [
  { label: 'Tổng điều chuyển', value: '24', delta: '+6.7%' },
  { label: 'Chờ duyệt', value: '5', delta: '+1.4%' },
  { label: 'Hoàn thành', value: '16', delta: '+5.2%' },
  { label: 'Từ chối', value: '3', delta: '-0.9%' },
]

export const transferStatusData = [
  { name: 'Chờ duyệt', value: 5 },
  { name: 'Đã duyệt', value: 3 },
  { name: 'Hoàn thành', value: 16 },
]

export const transferStatuses: TransferStatus[] = ['Chờ duyệt', 'Đã duyệt', 'Hoàn thành', 'Từ chối']

export const transferQueue: TransferItem[] = [
  { id: '1', code: 'TRF-001', assetCode: 'TS-2404', assetName: 'MacBook Air M2', fromRoom: 'VP Khoa', toRoom: 'A3.302', requester: 'Lê Minh C', approver: 'Nguyễn Văn Hoàng', status: 'Hoàn thành', transferredAt: '10/07/2026', approvedAt: '09/07/2026', note: 'Điều chuyển phục vụ phòng máy thực hành' },
  { id: '2', code: 'TRF-002', assetCode: 'TS-2407', assetName: 'Sony VPL-DX221', fromRoom: 'C1.103', toRoom: 'D1.109', requester: 'Khoa CNTT', approver: 'Trần Quốc Bảo', status: 'Chờ duyệt', transferredAt: '-', approvedAt: '-', note: 'Mượn tạm cho hội nghị tháng 8' },
  { id: '3', code: 'TRF-003', assetCode: 'TS-2410', assetName: 'TV Samsung 55"', fromRoom: 'D1.109', toRoom: 'B1.201', requester: 'Phòng họp', approver: 'Phạm Anh Khoa', status: 'Đã duyệt', transferredAt: '-', approvedAt: '15/07/2026', note: 'Chuyển sang khu hội trường' },
  { id: '4', code: 'TRF-004', assetCode: 'TS-2401', assetName: 'Dell OptiPlex 3080', fromRoom: 'A3.302', toRoom: 'A2.101', requester: 'Nguyễn Văn Hoàng', approver: 'Lê Minh Tâm', status: 'Hoàn thành', transferredAt: '05/07/2026', approvedAt: '04/07/2026', note: 'Bổ sung máy cho phòng học số' },
  { id: '5', code: 'TRF-005', assetCode: 'TS-2408', assetName: 'UPS Santak', fromRoom: 'Server B', toRoom: 'Server A', requester: 'KTV', approver: 'Trần Quốc Bảo', status: 'Chờ duyệt', transferredAt: '-', approvedAt: '-', note: 'Dồn UPS về Server A để nâng cấp hạ tầng' },
  { id: '6', code: 'TRF-006', assetCode: 'TS-2406', assetName: 'AP Aruba AP-515', fromRoom: 'A1.205', toRoom: 'C1.103', requester: 'Phòng hạ tầng', approver: 'Nguyễn Văn Hoàng', status: 'Hoàn thành', transferredAt: '18/06/2026', approvedAt: '17/06/2026', note: 'Tăng vùng phủ sóng khu giảng đường C1' },
  { id: '7', code: 'TRF-007', assetCode: 'TS-2411', assetName: 'Lenovo ThinkCentre M70q', fromRoom: 'A3.302', toRoom: 'VP Khoa', requester: 'KTV nội bộ', approver: 'Phạm Anh Khoa', status: 'Từ chối', transferredAt: '-', approvedAt: '-', note: 'Không đủ lý do điều chuyển, cần bổ sung hồ sơ' },
  { id: '8', code: 'TRF-008', assetCode: 'TS-2403', assetName: 'Cisco 24 Port', fromRoom: 'Server A', toRoom: 'Server B', requester: 'Hạ tầng', approver: 'Trần Quốc Bảo', status: 'Chờ duyệt', transferredAt: '-', approvedAt: '-', note: 'Cân bằng tải mạng giữa hai phòng server' },
]
