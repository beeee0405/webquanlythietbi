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
import type { RoomItem } from '@/types/room'

const STATUSES = ['Đang sử dụng', 'Bảo trì', 'Tạm ngưng', 'Dự phòng'] as const
const TYPES = ['Phòng máy', 'Phòng học', 'Văn phòng', 'Phòng họp', 'Server'] as const

const schema = z.object({
  code: z.string().min(2, 'Mã phòng tối thiểu 2 ký tự'),
  name: z.string().min(3, 'Tên phòng tối thiểu 3 ký tự'),
  building: z.string().min(1, 'Vui lòng nhập tòa nhà'),
  floor: z.string().min(1, 'Vui lòng nhập tầng'),
  type: z.enum(TYPES),
  status: z.enum(STATUSES),
  manager: z.string().min(2, 'Vui lòng nhập người phụ trách'),
  capacity: z.string(),
  note: z.string().optional(),
})
type FormValues = z.infer<typeof schema>

interface Props {
  mode: 'add' | 'edit' | 'delete'
  open: boolean
  onOpenChange: (v: boolean) => void
  room?: RoomItem
  onAdd?: (v: FormValues) => void
  onEdit?: (id: string, v: FormValues) => void
  onDelete?: (id: string) => void
}

export function RoomDialog({ mode, open, onOpenChange, room, onAdd, onEdit, onDelete }: Props) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { code: '', name: '', building: '', floor: '', type: 'Phòng máy', status: 'Đang sử dụng', manager: '', capacity: '30', note: '' },
  })

  useEffect(() => {
    if (!open) return
    if (mode === 'add') {
      reset({ code: '', name: '', building: '', floor: '', type: 'Phòng máy', status: 'Đang sử dụng', manager: '', capacity: '30', note: '' })
    } else if (room) {
      reset({ code: room.code, name: room.name, building: room.building, floor: room.floor, type: room.type, status: room.status, manager: room.manager, capacity: String(room.capacity), note: room.note })
    }
  }, [open, mode, room, reset])

  const onSubmit = async (v: FormValues) => {
    await new Promise(r => setTimeout(r, 400))
    if (mode === 'add') { onAdd?.(v); toast.success(`Đã thêm phòng "${v.name}"`) }
    else { onEdit?.(room!.id, v); toast.success(`Đã cập nhật phòng "${v.name}"`) }
    onOpenChange(false)
  }

  const handleDelete = async () => {
    await new Promise(r => setTimeout(r, 300))
    onDelete?.(room!.id)
    toast.success(`Đã xóa phòng "${room?.name}"`)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <div className="mb-5">
          <h3 className="text-xl font-semibold text-white">
            {mode === 'add' ? 'Thêm phòng mới' : mode === 'edit' ? 'Chỉnh sửa phòng' : 'Xóa phòng'}
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            {mode === 'delete' ? 'Thao tác này không thể hoàn tác.' : 'Điền thông tin phòng học / phòng máy / văn phòng.'}
          </p>
        </div>

        {mode === 'delete' ? (
          <div className="space-y-4">
            <div className="rounded-[14px] border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
              <div className="font-semibold">{room?.name}</div>
              <div className="text-xs text-red-300/70">{room?.code} · Tòa {room?.building} · Tầng {room?.floor}</div>
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
                <Label>Mã phòng</Label>
                <Input placeholder="A3.302" {...register('code')} />
                {errors.code && <p className="text-xs text-red-400">{errors.code.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label>Tên phòng</Label>
                <Input placeholder="Phòng máy tính 01" {...register('name')} />
                {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="grid gap-2">
                <Label>Tòa nhà</Label>
                <Input placeholder="A3" {...register('building')} />
                {errors.building && <p className="text-xs text-red-400">{errors.building.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label>Tầng</Label>
                <Input placeholder="3" {...register('floor')} />
                {errors.floor && <p className="text-xs text-red-400">{errors.floor.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label>Sức chứa</Label>
                <Input type="number" placeholder="30" {...register('capacity')} />
                {errors.capacity && <p className="text-xs text-red-400">{errors.capacity.message}</p>}
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="grid gap-2">
                <Label>Loại phòng</Label>
                <Select {...register('type')}>
                  {TYPES.map(t => <option key={t}>{t}</option>)}
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Trạng thái</Label>
                <Select {...register('status')}>
                  {STATUSES.map(s => <option key={s}>{s}</option>)}
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Người phụ trách</Label>
                <Input placeholder="Nguyễn Văn A" {...register('manager')} />
                {errors.manager && <p className="text-xs text-red-400">{errors.manager.message}</p>}
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Ghi chú</Label>
              <Textarea placeholder="Mô tả thêm về phòng, thiết bị đặc biệt..." {...register('note')} />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Hủy</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Đang lưu...' : mode === 'add' ? 'Thêm phòng' : 'Lưu thay đổi'}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
