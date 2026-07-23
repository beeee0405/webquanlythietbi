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
import type { InventorySession } from '@/types/inventory'

const STATUSES = ['Đang kiểm', 'Hoàn thành', 'Huỷ bỏ'] as const

const schema = z.object({
  code: z.string().min(2, 'Mã đợt tối thiểu 2 ký tự'),
  room: z.string().min(2, 'Phòng không được để trống'),
  inspector: z.string().min(2, 'Người kiểm không được để trống'),
  status: z.enum(STATUSES),
  totalDevices: z.string(),
  checkedDevices: z.string(),
  missingDevices: z.string(),
  extraDevices: z.string(),
  completedAt: z.string(),
  note: z.string().optional(),
})
type FormValues = z.infer<typeof schema>

interface Props {
  mode: 'add' | 'edit' | 'delete'
  open: boolean
  onOpenChange: (v: boolean) => void
  item?: InventorySession
  onAdd?: (v: FormValues) => void
  onEdit?: (id: string, v: FormValues) => void
  onDelete?: (id: string) => void
}

export function InventoryDialog({ mode, open, onOpenChange, item, onAdd, onEdit, onDelete }: Props) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { code: '', room: '', inspector: '', status: 'Đang kiểm', totalDevices: '0', checkedDevices: '0', missingDevices: '0', extraDevices: '0', completedAt: '', note: '' },
  })

  useEffect(() => {
    if (!open) return
    if (mode === 'add') {
      reset({ code: '', room: '', inspector: '', status: 'Đang kiểm', totalDevices: '0', checkedDevices: '0', missingDevices: '0', extraDevices: '0', completedAt: '', note: '' })
    } else if (item) {
      reset({ code: item.code, room: item.room, inspector: item.inspector, status: item.status as any, totalDevices: String(item.totalDevices), checkedDevices: String(item.checkedDevices), missingDevices: String(item.missingDevices), extraDevices: String(item.extraDevices), completedAt: item.completedAt, note: item.note })
    }
  }, [open, mode, item, reset])

  const onSubmit = async (v: FormValues) => {
    try { if (mode === 'add') { await onAdd?.(v); toast.success('Đã thêm thành công'); } else { await onEdit?.(item?.id || v.id, v); toast.success('Đã cập nhật thành công'); } onOpenChange(false); } catch (e) { toast.error('Có lỗi xảy ra'); }
  }

  const handleDelete = async () => {
    await new Promise(r => setTimeout(r, 300))
    onDelete?.(item!.id)
    toast.success(`Đã xóa đợt kiểm kê "${item?.code}"`)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <div className="mb-5">
          <h3 className="text-xl font-semibold text-white">
            {mode === 'add' ? 'Tạo đợt kiểm kê' : mode === 'edit' ? 'Chỉnh sửa đợt kiểm kê' : 'Xóa đợt kiểm kê'}
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            {mode === 'delete' ? 'Thao tác này không thể hoàn tác.' : 'Quản lý đợt kiểm kê thiết bị.'}
          </p>
        </div>

        {mode === 'delete' ? (
          <div className="space-y-4">
            <div className="rounded-[14px] border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
              <div className="font-semibold">{item?.code}</div>
              <div className="text-xs text-red-300/70">{item?.room} · {item?.inspector}</div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>Hủy</Button>
              <Button className="bg-red-600 text-white hover:bg-red-500" onClick={handleDelete}>Xác nhận xóa</Button>
            </div>
          </div>
        ) : (
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label>Mã Đợt</Label>
                <Input placeholder="INV-001" {...register('code')} />
                {errors.code && <p className="text-xs text-red-400">{errors.code.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label>Phòng</Label>
                <Input placeholder="A3.301" {...register('room')} />
                {errors.room && <p className="text-xs text-red-400">{errors.room.message}</p>}
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label>Người Kiểm</Label>
                <Input placeholder="Nguyễn Văn A" {...register('inspector')} />
                {errors.inspector && <p className="text-xs text-red-400">{errors.inspector.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label>Trạng thái</Label>
                <Select {...register('status')}>
                  {STATUSES.map(s => <option key={s}>{s}</option>)}
                </Select>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="grid gap-2">
                <Label>Tổng TB</Label>
                <Input type="number" placeholder="0" {...register('totalDevices')} />
              </div>
              <div className="grid gap-2">
                <Label>Kiểm</Label>
                <Input type="number" placeholder="0" {...register('checkedDevices')} />
              </div>
              <div className="grid gap-2">
                <Label>Thiếu</Label>
                <Input type="number" placeholder="0" {...register('missingDevices')} />
              </div>
              <div className="grid gap-2">
                <Label>Thừa</Label>
                <Input type="number" placeholder="0" {...register('extraDevices')} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Ngày Hoàn Thành</Label>
              <Input type="date" {...register('completedAt')} />
            </div>
            <div className="grid gap-2">
              <Label>Ghi Chú</Label>
              <Textarea placeholder="Ghi chú..." {...register('note')} />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Hủy</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Đang lưu...' : mode === 'add' ? 'Tạo đợt' : 'Lưu thay đổi'}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
