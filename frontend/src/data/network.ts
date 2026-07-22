import type { NetworkItem, NetworkStatus, NetworkType } from '../types/network'

export const networkOverview = [
  { label: 'Tổng thiết bị mạng', value: '34', delta: '+8.1%' },
  { label: 'Đang hoạt động', value: '29', delta: '+6.4%' },
  { label: 'Cần xử lý', value: '5', delta: '+1.3%' },
  { label: 'Hết bảo hành', value: '9', delta: '+2.2%' },
]

export const networkTypeData = [
  { name: 'Switch', value: 12 },
  { name: 'Access Point', value: 14 },
  { name: 'Router', value: 4 },
  { name: 'Firewall', value: 2 },
  { name: 'Controller', value: 2 },
]

export const networkStatusData = [
  { name: 'Hoạt động', value: 29 },
  { name: 'Cảnh báo', value: 3 },
  { name: 'Lỗi', value: 2 },
]

export const networkTypes: NetworkType[] = ['Switch', 'Access Point', 'Router', 'Firewall', 'Controller']
export const networkStatuses: NetworkStatus[] = ['Hoạt động', 'Cảnh báo', 'Lỗi']

export const networkQueue: NetworkItem[] = [
  { id: '1', code: 'NET-001', name: 'Cisco Core Switch', type: 'Switch', brand: 'Cisco', model: 'Catalyst 9300-24P', room: 'Server A', ipAddress: '10.0.0.1', macAddress: 'AA:BB:CC:DD:EE:01', vlan: 'VLAN 10,20,30', port: '24', status: 'Hoạt động', warranty: '18/09/2026', installedAt: '04/01/2024', note: 'Switch core, uplink 10G tới router biên' },
  { id: '2', code: 'NET-002', name: 'AP Aruba A1.205', type: 'Access Point', brand: 'Aruba', model: 'AP-515', room: 'A1.205', ipAddress: '192.168.20.10', macAddress: 'AA:BB:CC:DD:EE:02', vlan: 'VLAN 100', port: '1', status: 'Hoạt động', warranty: '20/11/2026', installedAt: '11/11/2023', note: 'Vùng phủ sóng hành lang A1' },
  { id: '3', code: 'NET-003', name: 'AP Aruba A3.302', type: 'Access Point', brand: 'Aruba', model: 'AP-515', room: 'A3.302', ipAddress: '192.168.20.11', macAddress: 'AA:BB:CC:DD:EE:03', vlan: 'VLAN 100', port: '1', status: 'Hoạt động', warranty: '20/11/2026', installedAt: '11/11/2023', note: 'Phủ sóng phòng máy thực hành' },
  { id: '4', code: 'NET-004', name: 'Router Mikrotik Edge', type: 'Router', brand: 'Mikrotik', model: 'RB4011iGS+', room: 'Server A', ipAddress: '10.0.0.254', macAddress: 'AA:BB:CC:DD:EE:04', vlan: 'VLAN 1', port: '10', status: 'Hoạt động', warranty: '01/01/2027', installedAt: '18/01/2024', note: 'Router biên, kết nối Internet và VPN' },
  { id: '5', code: 'NET-005', name: 'Firewall Fortigate', type: 'Firewall', brand: 'Fortinet', model: 'FortiGate 80F', room: 'Server B', ipAddress: '10.0.0.2', macAddress: 'AA:BB:CC:DD:EE:05', vlan: 'VLAN 1', port: '4', status: 'Hoạt động', warranty: '15/06/2027', installedAt: '15/06/2024', note: 'Lọc traffic, IPS và content filter' },
  { id: '6', code: 'NET-006', name: 'Switch phân phối B1', type: 'Switch', brand: 'Cisco', model: 'Catalyst 2960X-24PS', room: 'B1.201', ipAddress: '10.0.1.1', macAddress: 'AA:BB:CC:DD:EE:06', vlan: 'VLAN 20', port: '24', status: 'Cảnh báo', warranty: '10/08/2026', installedAt: '10/08/2023', note: 'Cổng uplink báo lỗi CRC, cần kiểm tra' },
  { id: '7', code: 'NET-007', name: 'AP khu sân trường', type: 'Access Point', brand: 'Ubiquiti', model: 'UniFi U6 Pro', room: 'Sân trường', ipAddress: '192.168.20.50', macAddress: 'AA:BB:CC:DD:EE:07', vlan: 'VLAN 100', port: '1', status: 'Hoạt động', warranty: '22/03/2027', installedAt: '22/03/2024', note: 'AP ngoài trời, chống nước IP67' },
  { id: '8', code: 'NET-008', name: 'Aruba Controller', type: 'Controller', brand: 'Aruba', model: 'Mobility Conductor', room: 'Server A', ipAddress: '10.0.0.10', macAddress: 'AA:BB:CC:DD:EE:08', vlan: 'VLAN 1', port: '1', status: 'Hoạt động', warranty: '30/04/2027', installedAt: '30/04/2024', note: 'Quản lý tập trung toàn bộ AP Aruba' },
]
