import type { LiquidationItem, LiquidationStatus, LiquidationCondition } from '../types/liquidation'

export const liquidationOverview = [
  { label: 'Yêu cầu thanh lý', value: '11', delta: '+3.1%' },
  { label: 'Chờ duyệt', value: '4', delta: '+0.8%' },
  { label: 'Hoàn thành', value: '6', delta: '+2.4%' },
  { label: 'Giá trị còn lại', value: '18.4M', delta: '-1.2%' },
]

export const liquidationStatusData = [
  { name: 'Chờ duyệt', value: 4 },
  { name: 'Đã duyệt', value: 1 },
  { name: 'Hoàn thành', value: 6 },
]

export const liquidationConditionData = [
  { name: 'Hỏng hoàn toàn', value: 5 },
  { name: 'Lạc hậu', value: 4 },
  { name: 'Mất mát', value: 2 },
]

export const liquidationStatuses: LiquidationStatus[] = ['Chờ duyệt', 'Đã duyệt', 'Hoàn thành']
export const liquidationConditions: LiquidationCondition[] = ['Hỏng hoàn toàn', 'Lạc hậu', 'Mất mát']

export const liquidationQueue: LiquidationItem[] = [
  { id: '1', code: 'LIQ-001', assetCode: 'TS-2412', assetName: 'Dell Latitude 5440', room: 'VP Khoa', reason: 'Hỏng hoàn toàn, không sửa được', condition: 'Hỏng hoàn toàn', status: 'Chờ duyệt', requester: 'Nguyễn Văn A', approver: 'BGH', residualValue: '0', requestedAt: '10/07/2026', completedAt: '-', note: 'Máy cũ từ 2022, đã qua 3 lần sửa chữa' },
  { id: '2', code: 'LIQ-002', assetCode: 'TS-2402', assetName: 'HP LaserJet 1020', room: 'B1.201', reason: 'Linh kiện không còn sản xuất', condition: 'Hỏng hoàn toàn', status: 'Hoàn thành', requester: 'Phòng HC', approver: 'BGH', residualValue: '500000', requestedAt: '01/06/2026', completedAt: '20/06/2026', note: 'Thanh lý phế liệu' },
  { id: '3', code: 'LIQ-003', assetCode: 'TS-2408', assetName: 'UPS Santak 2200VA', room: 'Server B', reason: 'Công nghệ lạc hậu, thay thế UPS mới', condition: 'Lạc hậu', status: 'Chờ duyệt', requester: 'Trần Quốc Bảo', approver: 'BGH', residualValue: '2000000', requestedAt: '15/07/2026', completedAt: '-', note: 'Dự kiến thanh lý và mua thay thế APC 3000VA' },
  { id: '4', code: 'LIQ-004', assetCode: 'TS-2403', assetName: 'Cisco Switch 24P cũ', room: 'Server A', reason: 'Thay thế thiết bị mới hơn', condition: 'Lạc hậu', status: 'Đã duyệt', requester: 'Hạ tầng', approver: 'BGH', residualValue: '3500000', requestedAt: '08/07/2026', completedAt: '-', note: 'Chờ hoàn thành thanh lý trước khi lắp switch mới' },
  { id: '5', code: 'LIQ-005', assetCode: 'TS-2409', assetName: 'Máy quét mã QR cũ', room: 'A2.104', reason: 'Thiết bị không còn sử dụng', condition: 'Lạc hậu', status: 'Hoàn thành', requester: 'Lê Minh Tâm', approver: 'Phạm Anh Khoa', residualValue: '200000', requestedAt: '15/05/2026', completedAt: '01/06/2026', note: 'Đã thanh lý theo quy trình' },
  { id: '6', code: 'LIQ-006', assetCode: 'TS-2411-B', assetName: 'Bàn phím cũ Logitech', room: 'A3.302', reason: 'Hư hỏng, không sử dụng được', condition: 'Hỏng hoàn toàn', status: 'Hoàn thành', requester: 'Nguyễn Văn Hoàng', approver: 'Phạm Anh Khoa', residualValue: '0', requestedAt: '20/05/2026', completedAt: '05/06/2026', note: 'Thanh lý phụ kiện nhỏ' },
  { id: '7', code: 'LIQ-007', assetCode: 'TS-2413', assetName: 'Projector cũ Epson', room: 'C1.103', reason: 'Đèn projector hết tuổi thọ', condition: 'Hỏng hoàn toàn', status: 'Chờ duyệt', requester: 'Lê Minh Tâm', approver: 'BGH', residualValue: '1500000', requestedAt: '17/07/2026', completedAt: '-', note: 'Bóng đèn không còn sản xuất, không thể thay thế' },
  { id: '8', code: 'LIQ-008', assetCode: 'TS-2414', assetName: 'Router Dlink cũ', room: 'Server B', reason: 'Thay thế bằng Mikrotik mới', condition: 'Lạc hậu', status: 'Chờ duyệt', requester: 'KTV', approver: 'BGH', residualValue: '300000', requestedAt: '18/07/2026', completedAt: '-', note: 'Router cũ dự phòng, không còn cần thiết' },
]
