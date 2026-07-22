import type { KpiDto, PointDto } from './common'

export type SoftwareStatus = 'Đang dùng' | 'Sắp hết hạn' | 'Hết hạn'
export type SoftwareCategory = 'Hệ điều hành' | 'Văn phòng' | 'Bảo mật' | 'Thiết kế' | 'Lập trình'

export interface SoftwareItem {
  id: string
  name: string
  publisher: string
  version: string
  category: SoftwareCategory
  licenseType: string
  licenseKey: string
  totalLicenses: string
  usedLicenses: string
  expiresAt: string
  room: string
  status: SoftwareStatus
  note: string
}

export interface SoftwareManagementResponse {
  overview: KpiDto[]
  categoryData: PointDto[]
  licenseTypeData: PointDto[]
  items: SoftwareItem[]
  categories: string[]
  statuses: string[]
}
