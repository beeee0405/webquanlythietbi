import type { SoftwareItem, SoftwareStatus, SoftwareCategory } from '../types/software'

export const softwareOverview = [
  { label: 'Tổng phần mềm', value: '0', delta: '0%' },
  { label: 'Đang sử dụng', value: '0', delta: '0%' },
  { label: 'Sắp hết hạn', value: '0', delta: '0%' },
  { label: 'Đã hết hạn', value: '0', delta: '0%' },
]

export const softwareCategoryData: any[] = []
export const softwareLicenseTypeData: any[] = []
export const softwareCategories: SoftwareCategory[] = ['Hệ điều hành', 'Văn phòng', 'Bảo mật', 'Thiết kế', 'Lập trình']
export const softwareStatuses: SoftwareStatus[] = ['Đang dùng', 'Sắp hết hạn', 'Hết hạn']
export const softwareQueue: SoftwareItem[] = []
