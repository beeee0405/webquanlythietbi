import type { DeviceItem, DeviceStatus } from '../types/device'

export const deviceOverview = [
  { label: 'Tổng thiết bị', value: '2,450', delta: '+12.4%' },
  { label: 'Đang hoạt động', value: '1,862', delta: '+7.8%' },
  { label: 'Cần xử lý', value: '87', delta: '-2.1%' },
  { label: 'Sắp hết bảo hành', value: '21', delta: '+4.9%' }
]

export const deviceStatusData = [
  { name: 'Hoạt động', value: 1862 },
  { name: 'Đang sửa', value: 48 },
  { name: 'Bảo trì', value: 17 },
  { name: 'Hỏng', value: 39 },
  { name: 'Chờ thanh lý', value: 14 }
]

export const deviceLocationData = [
  { name: 'A3.302', value: 42 },
  { name: 'A2.101', value: 31 },
  { name: 'B1.201', value: 28 },
  { name: 'Server A', value: 14 },
  { name: 'Server B', value: 11 },
  { name: 'VP Khoa', value: 9 }
]

export const deviceStatuses: DeviceStatus[] = ['Hoạt động', 'Đang sửa', 'Bảo trì', 'Hỏng', 'Chờ thanh lý']

export const deviceCategories: string[] = ['Tất cả', 'PC', 'Printer', 'Switch', 'Laptop', 'Camera', 'Access Point', 'Projector', 'UPS', 'Router', 'Display']

export const deviceQueue: DeviceItem[] = [
  { id: '1', assetCode: 'TS-2401', name: 'Dell OptiPlex 3080', category: 'PC', brand: 'Dell', room: 'A3.302', owner: 'Phòng máy', status: 'Hoạt động', warranty: '10/08/2026', serial: 'DL3080-01', purchasedAt: '12/08/2023', updatedAt: '2 phút trước' },
  { id: '2', assetCode: 'TS-2402', name: 'HP LaserJet 1020', category: 'Printer', brand: 'HP', room: 'B1.201', owner: 'Hành chính', status: 'Hỏng', warranty: '12/08/2026', serial: 'HPLJ-1020', purchasedAt: '28/09/2022', updatedAt: '10 phút trước' },
  { id: '3', assetCode: 'TS-2403', name: 'Cisco 24 Port', category: 'Switch', brand: 'Cisco', room: 'Server A', owner: 'Hạ tầng', status: 'Bảo trì', warranty: '18/09/2026', serial: 'CISCO-24P', purchasedAt: '04/01/2024', updatedAt: '15 phút trước' },
  { id: '4', assetCode: 'TS-2404', name: 'MacBook Air M2', category: 'Laptop', brand: 'Apple', room: 'VP Khoa', owner: 'Lê Minh C', status: 'Đang sửa', warranty: '30/07/2026', serial: 'MBA-M2-14', purchasedAt: '20/07/2024', updatedAt: '18 phút trước' },
  { id: '5', assetCode: 'TS-2405', name: 'Hikvision DS-2CD', category: 'Camera', brand: 'Hikvision', room: 'A2.101', owner: 'An ninh', status: 'Hoạt động', warranty: '01/12/2026', serial: 'HK-2CD-33', purchasedAt: '14/03/2024', updatedAt: '22 phút trước' },
  { id: '6', assetCode: 'TS-2406', name: 'AP Aruba AP-515', category: 'Access Point', brand: 'Aruba', room: 'A1.205', owner: 'Mạng', status: 'Hoạt động', warranty: '20/11/2026', serial: 'ARB-AP515', purchasedAt: '11/11/2023', updatedAt: '25 phút trước' },
  { id: '7', assetCode: 'TS-2407', name: 'Sony VPL-DX221', category: 'Projector', brand: 'Sony', room: 'C1.103', owner: 'Khoa CNTT', status: 'Hoạt động', warranty: '14/10/2026', serial: 'SONY-VPL-221', purchasedAt: '05/04/2024', updatedAt: '30 phút trước' },
  { id: '8', assetCode: 'TS-2408', name: 'UPS Santak', category: 'UPS', brand: 'Santak', room: 'Server B', owner: 'Hạ tầng', status: 'Bảo trì', warranty: '05/09/2026', serial: 'STK-UPS-2200', purchasedAt: '01/02/2023', updatedAt: '35 phút trước' },
  { id: '9', assetCode: 'TS-2409', name: 'Router Mikrotik', category: 'Router', brand: 'Mikrotik', room: 'Server A', owner: 'Mạng', status: 'Hoạt động', warranty: '01/01/2027', serial: 'MIK-RB4011', purchasedAt: '18/01/2024', updatedAt: '40 phút trước' },
  { id: '10', assetCode: 'TS-2410', name: 'TV Samsung 55”', category: 'Display', brand: 'Samsung', room: 'D1.109', owner: 'Phòng họp', status: 'Hoạt động', warranty: '12/11/2026', serial: 'SAM-TV55-24', purchasedAt: '02/10/2023', updatedAt: '42 phút trước' },
  { id: '11', assetCode: 'TS-2411', name: 'Lenovo ThinkCentre M70q', category: 'PC', brand: 'Lenovo', room: 'A3.302', owner: 'Phòng máy', status: 'Hoạt động', warranty: '10/08/2026', serial: 'LN-M70Q-08', purchasedAt: '15/05/2024', updatedAt: '1 giờ trước' },
  { id: '12', assetCode: 'TS-2412', name: 'Dell Latitude 5440', category: 'Laptop', brand: 'Dell', room: 'VP Khoa', owner: 'Nguyễn Văn A', status: 'Chờ thanh lý', warranty: '20/03/2026', serial: 'DL-5440-22', purchasedAt: '08/03/2022', updatedAt: '1 giờ trước' }
]