export type MaintenanceStatus = 'Chờ duyệt' | 'Đang thực hiện' | 'Hoàn thành' | 'Tạm hoãn'

export type MaintenancePriority = 'Khẩn cấp' | 'Cao' | 'Trung bình' | 'Thấp'

export type MaintenanceType = 'Phòng ngừa' | 'Sửa chữa' | 'Vệ sinh' | 'Kiểm tra'

export type MaintenanceItem = {
  id: string
  code: string
  title: string
  assetCode: string
  assetName: string
  room: string
  type: MaintenanceType
  priority: MaintenancePriority
  status: MaintenanceStatus
  assignee: string
  scheduledAt: string
  completedAt: string
  cost: string
  note: string
}
