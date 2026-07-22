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
import type { TicketItem } from '@/types/ticket'

const PRIORITIES = ['Khẩn cấp', 'Cao', 'Trung bình', 'Thấp'] as const
const STATUSES = ['Mới', 'Đang xử lý', 'Chờ phản hồi', 'Hoàn thành', 'Đóng'] as const
const CHANNELS = ['QR', 'Email', 'Điện thoại', 'Trực tiếp', 'Hệ thống'] as const

const schema = z.object({
  subject: z.string().min(5, 'Tiêu đề tối thiểu 5 ký tự'),
  requester: z.string().min(2, 'Vui lòng nhập người báo'),
  room: z.string().min(2, 'Vui lòng nhập phòng'),
  device: z.string().optional(),
  category: z.string().min(2, 'Vui lòng nhập danh mục'),
  priority: z.enum(PRIORITIES),
  status: z.enum(STATUSES),
  channel: z.enum(CHANNELS),
  assignee: z.string().optional(),
  sla: z.string().optional(),
  note: z.string().optional(),
})
type FormValues = z.infer<typeof schema>

interface Props {
  mode: 'add' | 'edit' | 'delete' | 'view'
  open: boolean
  onOpenChange: (v: boolean) => void
  item?: TicketItem
  onAdd?: (v: FormValues) => void
  onEdit?: (id: string, v: FormValues) => void
  onDelete?: (id: string) => void
  isUserPortal?: boolean
}

export function TicketDialog({ mode, open, onOpenChange, item, onAdd, onEdit, onDelete, isUserPortal }: Props) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { subject: '', requester: '', room: '', device: '', category: 'Phần cứng', priority: 'Trung bình', status: 'Mới', channel: 'Trực tiếp', assignee: '', sla: '8h', note: '' },
  })

  useEffect(() => {
    if (!open) return
    if (mode === 'add') {
      reset({ subject: '', requester: '', room: '', device: '', category: 'Phần cứng', priority: 'Trung bình', status: 'Mới', channel: 'Trực tiếp', assignee: '', sla: '8h', note: '' })
    } else if (item) {
      reset({ subject: item.subject, requester: item.requester, room: item.room, device: item.device, category: item.category, priority: item.priority, status: item.status, channel: item.channel, assignee: item.assignee, sla: item.sla, note: '' })
    }
  }, [open, mode, item, reset])

  const onSubmit = async (v: FormValues) => {
    await new Promise(r => setTimeout(r, 400))
    if (mode === 'add') { onAdd?.(v); toast.success(`Đã tạo ticket "${v.subject}"`) }
    else { onEdit?.(item!.id, v); toast.success(`Đã cập nhật ticket "${v.subject}"`) }
    onOpenChange(false)
  }

  const handleDelete = async () => {
    await new Promise(r => setTimeout(r, 300))
    onDelete?.(item!.id)
    toast.success(`Đã xóa ticket "${item?.subject}"`)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <div className="mb-5">
          <h3 className="text-xl font-semibold text-white">
            {mode === 'add' ? 'Tạo ticket mới' : mode === 'edit' ? 'Chỉnh sửa ticket' : mode === 'view' ? 'Chi tiết phiếu báo lỗi' : 'Xóa ticket'}
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            {mode === 'delete' ? 'Thao tác này không thể hoàn tác.' : mode === 'view' ? 'Thông tin phiếu báo lỗi của bạn' : 'Điền thông tin yêu cầu hỗ trợ.'}
          </p>
        </div>

        {mode === 'delete' ? (
          <div className="space-y-4">
            <div className="rounded-[14px] border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
              <div className="font-semibold">{item?.subject}</div>
              <div className="text-xs text-red-300/70">{item?.code} · {item?.requester} · {item?.room}</div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>Hủy</Button>
              <Button className="bg-red-600 text-white hover:bg-red-500" onClick={handleDelete}>Xác nhận xóa</Button>
            </div>
          </div>
        ) : mode === 'view' && isUserPortal ? (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-slate-400">Mã Phiếu</Label>
                <p className="text-white font-mono">{item?.code}</p>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-400">Trạng Thái</Label>
                <p className="text-white font-semibold">{item?.status}</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-400">Tiêu Đề</Label>
              <p className="text-white">{item?.subject}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-slate-400">Thiết Bị</Label>
                <p className="text-slate-300">{item?.device || 'N/A'}</p>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-400">Danh Mục</Label>
                <p className="text-slate-300">{item?.category}</p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label className="text-slate-400">Ưu Tiên</Label>
                <p className="text-white font-semibold">{item?.priority}</p>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-400">Ngày Tạo</Label>
                <p className="text-slate-300">{item?.createdAt}</p>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-400">Ngày Cập Nhật</Label>
                <p className="text-slate-300">{item?.updatedAt}</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-400">Ghi Chú Kỹ Thuật</Label>
              <p className="text-slate-300 text-sm italic">Sẽ được cập nhật bởi kỹ thuật viên</p>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" onClick={() => onOpenChange(false)}>Đóng</Button>
            </div>
          </div>
        ) : (
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <Label>Tiêu đề sự cố</Label>
              <Input placeholder="Máy tính không lên màn hình..." {...register('subject')} />
              {errors.subject && <p className="text-xs text-red-400">{errors.subject.message}</p>}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label>Người báo</Label>
                <Input placeholder="Nguyễn Văn A" {...register('requester')} />
                {errors.requester && <p className="text-xs text-red-400">{errors.requester.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label>Phòng</Label>
                <Input placeholder="A3.302" {...register('room')} />
                {errors.room && <p className="text-xs text-red-400">{errors.room.message}</p>}
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label>Thiết bị liên quan</Label>
                <Input placeholder="PC-A302-01 (không bắt buộc)" {...register('device')} />
              </div>
              <div className="grid gap-2">
                <Label>Danh mục</Label>
                <Input placeholder="Phần cứng, Mạng, Phần mềm..." {...register('category')} />
                {errors.category && <p className="text-xs text-red-400">{errors.category.message}</p>}
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
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
            <div className="grid gap-4 md:grid-cols-3">
              <div className="grid gap-2">
                <Label>Kênh tiếp nhận</Label>
                <Select {...register('channel')}>
                  {CHANNELS.map(c => <option key={c}>{c}</option>)}
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Phân công</Label>
                <Input placeholder="Kỹ thuật viên A" {...register('assignee')} />
              </div>
              <div className="grid gap-2">
                <Label>SLA</Label>
                <Input placeholder="4h, 8h, 24h..." {...register('sla')} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Mô tả chi tiết</Label>
              <Textarea placeholder="Mô tả chi tiết vấn đề, bước tái hiện lỗi..." {...register('note')} />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Hủy</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Đang lưu...' : mode === 'add' ? 'Tạo ticket' : 'Lưu thay đổi'}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
