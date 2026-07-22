export type KPIItem = {
  label: string
  value: string
  delta: string
  tone?: 'primary' | 'emerald' | 'amber' | 'zinc'
}

export type DeviceRecord = {
  id: string
  assetCode: string
  name: string
  category: string
  room: string
  status: 'Hoạt động' | 'Đang sửa' | 'Bảo trì' | 'Hỏng'
  warranty: string
  updatedAt: string
}

export type TicketRecord = {
  id: string
  subject: string
  room: string
  requester: string
  priority: 'Khẩn cấp' | 'Cao' | 'Trung bình'
  status: 'Mới' | 'Đang xử lý' | 'Hoàn thành'
  updatedAt: string
}
