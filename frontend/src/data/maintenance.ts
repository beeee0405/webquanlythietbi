import type { MaintenanceItem, MaintenancePriority, MaintenanceStatus, MaintenanceType } from '../types/maintenance'

export const maintenanceOverview = [
  { label: 'Kế hoạch tháng', value: '0', delta: '0%' },
  { label: 'Đang thực hiện', value: '0', delta: '0%' },
  { label: 'Hoàn thành', value: '0', delta: '0%' },
  { label: 'Chi phí dự kiến', value: '0', delta: '0%' }
]

export const maintenanceStatusData: any[] = []
export const maintenanceTypeData: any[] = []
export const maintenanceTrendData: any[] = []
export const maintenanceBudgetData: any[] = []
export const maintenanceStatuses: MaintenanceStatus[] = ['Chờ duyệt', 'Đang thực hiện', 'Hoàn thành', 'Tạm hoãn']
export const maintenancePriorities: MaintenancePriority[] = ['Khẩn cấp', 'Cao', 'Trung bình', 'Thấp']
export const maintenanceTypes: MaintenanceType[] = ['Phòng ngừa', 'Sửa chữa', 'Vệ sinh', 'Kiểm tra']
export const maintenanceQueue: MaintenanceItem[] = []
