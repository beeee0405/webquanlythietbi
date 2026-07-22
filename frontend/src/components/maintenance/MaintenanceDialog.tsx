import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import type { MaintenanceItem } from '@/types/maintenance'

const STATUSES = ['Chờ duyệt', 'Đang thực hiện', 'Hoàn thành', 'Tạm hoãn'] as const
const PRIORITIES = ['Khẩn cấp', 'Cao', 'Trung bình', 'Thấp'] as const
const TYPES = ['Phòng ngừa', 'Sửa chữa', 'Vệ sinh', 'Kiểm tra'] as const

const schema = z.object({
  title: z.string().min(5, 'Tiêu đề tối thiểu 5 ký tự'),
  assetCode: z.string().min(2, 'Vui lòng nhập mã tài sản'),
  assetName: z.string().min(2, 'Vui lòng nhập tên tài sản'),
  room: z.string().min(2, 'Vui lòng nhập phòng'),
  type: z.enum(TYPES),
  priority: z.enum(PRIORITIES),
  status: z.enum(STATUSES),
  assignee: z.string().min(2, 'Vui lòng nhập người phụ trách'),
  scheduledAt: z.string().min(4, 'Vui lòng nhập ngày dự kiến'),
  cost: z.string().optional(),
  note: z.string().optional(),
})
type FormValues = z.infer<typeof schema>

interface Props {
  mode: 'add' | 'edit' | 'delete'
  open: boolean
  onOpenChange: (v: boolean) => void
  item?: MaintenanceItem
  onAdd?: (v: FormValues) => void
  onEdit?: (id: string, v: FormValues) => void
  onDelete?: (id: string) => void
}

export function MaintenanceDialog({ mode, open, onOpenChange, item, onAdd, onEdit, onDelete }: Props) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { title: '', assetCode: '', assetName: '', room: '', type: 'Phòng ngừa', priority: 'Trung bình', status: 'Chờ duyệt', assignee: '', scheduledAt: '', cost: '0', note: '' },
  })

  useEffect(() => {
    if (!open) return
    if (mode === 'add') {
      reset({ title: '', assetCode: '', assetName: '', room: '', type: 'Phòng ngừa', priority: 'Trung bình', status: 'Chờ duyệt', assignee: '', scheduledAt: '', cost: '0', note: '' })
    } else if (item) {
      reset({ title: item.title, assetCode: item.assetCode, assetName: item.assetName, room: item.room, type: item.type, priority: item.priority, status: item.status, assignee: item.assignee, scheduledAt: item.scheduledAt, cost: item.cost, note: item.note })
    }
  }, [open, mode, item, reset])

  const onSubmit = async (v: FormValues) => {
    await new Promise(r => setTimeout(r, 400))
    if (mode === 'add') { onAdd?.(v); toast.success(`Đã tạo phiếu bảo trì "${v.title}"`) }
    else { onEdit?.(item!.id, v); toast.success(`Đã cập nhật phiếu "${v.title}"`) }
    onOpenChange(false)
  }

  const handleDelete = async () => {
    await new Promise(r => setTimeout(r, 300))
    onDelete?.(item!.id)
    toast.success(`Đã xóa phiếu "${item?.title}"`)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <div className="mb-5">
          <h3 className="text-xl font-semibold text-white">
            {mode === 'add' ? 'Tạo phiếu bảo trì' : mode === 'edit' ? 'Chỉnh sửa phiếu bảo trì' : 'Xóa phiếu bảo trì'}
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            {mode === 'delete' ? 'Thao tác này không thể hoàn tác.' : 'Điền thông tin kế hoạch bảo trì thiết bị.'}
          </p>
        </div>

        {mode === 'delete' ? (
          <div className="space-y-4">
            <div className="rounded-[14px] border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
              <div className="font-semibold">{item?.title}</div>
              <div className="text-xs text-red-300/70">{item?.code} · {item?.assetName} · {item?.room}</div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>Hủy</Button>
              <Button className="bg-red-600 text-white hover:bg-red-500" onClick={handleDelete}>Xác nhận xóa</Button>
            </div>
          </div>
        ) : (
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <Label>Tiêu đề phiếu bảo trì</Label>
              <Input placeholder="Vệ sinh máy tính phòng A3.302..." {...register('title')} />
              {errors.title && <p className="text-xs text-red-400">{errors.title.message}</p>}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label>Mã tài sản</Label>
                <Input placeholder="TS-2501" {...register('assetCode')} />
                {errors.assetCode && <p className="text-xs text-red-400">{errors.assetCode.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label>Tên tài sản</Label>
                <Input placeholder="Dell OptiPlex 7090" {...register('assetName')} />
                {errors.assetName && <p className="text-xs text-red-400">{errors.assetName.message}</p>}
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label>Phòng</Label>
                <Input placeholder="A3.302" {...register('room')} />
                {errors.room && <p className="text-xs text-red-400">{errors.room.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label>Người phụ trách</Label>
                <Input placeholder="Kỹ thuật viên A" {...register('assignee')} />
                {errors.assignee && <p className="text-xs text-red-400">{errors.assignee.message}</p>}
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="grid gap-2">
                <Label>Loại bảo trì</Label>
                <Select {...register('type')}>
                  {TYPES.map(t => <option key={t}>{t}</option>)}
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Ưu tiên</Label>
                <Select {...register('priority')}>
                  {PRIORITIES.map(p => <option key={p}>{p}</option>)}
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Trạng thái</Label>
                <Select {...register('status')}>
                  {STATUSES.map(s => <option key={s}>{s}</option>)}
                </Select>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label>Ngày dự kiến</Label>
                <Input placeholder="20/07/2026" {...register('scheduledAt')} />
                {errors.scheduledAt && <p className="text-xs text-red-400">{errors.scheduledAt.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label>Chi phí dự kiến (VNĐ)</Label>
                <Input placeholder="500000" {...register('cost')} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Ghi chú</Label>
              <Textarea placeholder="Mô tả công việc, vật tư cần chuẩn bị..." {...register('note')} />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Hủy</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Đang lưu...' : mode === 'add' ? 'Tạo phiếu' : 'Lưu thay đổi'}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
