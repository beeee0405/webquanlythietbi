import type { SoftwareItem, SoftwareStatus, SoftwareCategory } from '../types/software'

export const softwareOverview = [
  { label: 'Tổng phần mềm', value: '28', delta: '+4.5%' },
  { label: 'Đang sử dụng', value: '21', delta: '+3.2%' },
  { label: 'Sắp hết hạn', value: '5', delta: '+1.1%' },
  { label: 'Đã hết hạn', value: '2', delta: '-0.6%' },
]

export const softwareCategoryData = [
  { name: 'Hệ điều hành', value: 6 },
  { name: 'Văn phòng', value: 8 },
  { name: 'Bảo mật', value: 5 },
  { name: 'Thiết kế', value: 4 },
  { name: 'Lập trình', value: 5 },
]

export const softwareLicenseTypeData = [
  { name: 'Bản quyền', value: 18 },
  { name: 'Mã nguồn mở', value: 8 },
  { name: 'Trial', value: 2 },
]

export const softwareCategories: SoftwareCategory[] = ['Hệ điều hành', 'Văn phòng', 'Bảo mật', 'Thiết kế', 'Lập trình']
export const softwareStatuses: SoftwareStatus[] = ['Đang dùng', 'Sắp hết hạn', 'Hết hạn']

export const softwareQueue: SoftwareItem[] = [
  { id: '1', name: 'Windows 11 Pro', publisher: 'Microsoft', version: '23H2', category: 'Hệ điều hành', licenseType: 'Bản quyền', licenseKey: 'XXXXX-XXXXX-XXXXX', totalLicenses: '50', usedLicenses: '48', expiresAt: '31/12/2026', room: 'A3.302', status: 'Đang dùng', note: 'Bản quyền volume cho phòng máy' },
  { id: '2', name: 'Microsoft Office 365', publisher: 'Microsoft', version: '2024', category: 'Văn phòng', licenseType: 'Bản quyền', licenseKey: 'O365-EDU-XXXXX', totalLicenses: '200', usedLicenses: '187', expiresAt: '30/06/2027', room: 'Toàn trường', status: 'Đang dùng', note: 'Gói EDU cho giảng viên và sinh viên' },
  { id: '3', name: 'Kaspersky Endpoint', publisher: 'Kaspersky', version: '21.3', category: 'Bảo mật', licenseType: 'Bản quyền', licenseKey: 'KES-XXXXX-XXXXX', totalLicenses: '100', usedLicenses: '95', expiresAt: '31/08/2026', room: 'Toàn trường', status: 'Sắp hết hạn', note: 'Hết hạn tháng 8, cần gia hạn' },
  { id: '4', name: 'AutoCAD 2024', publisher: 'Autodesk', version: '2024.1', category: 'Thiết kế', licenseType: 'Bản quyền', licenseKey: 'ACAD-XXXXX', totalLicenses: '10', usedLicenses: '8', expiresAt: '31/03/2026', room: 'B1.201', status: 'Hết hạn', note: 'Bản quyền đã hết, cần mua mới' },
  { id: '5', name: 'Visual Studio Code', publisher: 'Microsoft', version: '1.90', category: 'Lập trình', licenseType: 'Mã nguồn mở', licenseKey: 'N/A', totalLicenses: '0', usedLicenses: '0', expiresAt: '-', room: 'A3.302', status: 'Đang dùng', note: 'Phần mềm miễn phí, không cần bản quyền' },
  { id: '6', name: 'Ubuntu Server 22.04 LTS', publisher: 'Canonical', version: '22.04', category: 'Hệ điều hành', licenseType: 'Mã nguồn mở', licenseKey: 'N/A', totalLicenses: '0', usedLicenses: '0', expiresAt: '04/2027', room: 'Server A', status: 'Đang dùng', note: 'OS cho các máy chủ nội bộ' },
  { id: '7', name: 'MATLAB R2024a', publisher: 'MathWorks', version: 'R2024a', category: 'Lập trình', licenseType: 'Bản quyền', licenseKey: 'MLR24-XXXXX', totalLicenses: '30', usedLicenses: '28', expiresAt: '31/07/2026', room: 'A3.302', status: 'Sắp hết hạn', note: 'License trường, hết hạn tháng 7' },
  { id: '8', name: 'Adobe Acrobat Pro', publisher: 'Adobe', version: '2024', category: 'Văn phòng', licenseType: 'Bản quyền', licenseKey: 'ACR-XXXXX', totalLicenses: '20', usedLicenses: '14', expiresAt: '31/10/2026', room: 'B1.201', status: 'Đang dùng', note: 'Dùng cho phòng hành chính và in ấn' },
]
