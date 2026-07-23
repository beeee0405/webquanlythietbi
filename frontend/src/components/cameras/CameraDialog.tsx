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
import type { CameraItem } from '@/types/camera'

const STATUSES = ['Hoạt động', 'Lỗi', 'Mất tín hiệu'] as const
const RESOLUTIONS = ['1080p', '2K', '4K', '720p'] as const

const schema = z.object({
  code: z.string().min(2, 'Mã camera tối thiểu 2 ký tự'),
  name: z.string().min(3, 'Tên camera tối thiểu 3 ký tự'),
  room: z.string().min(2, 'Vui lòng nhập phòng / khu vực'),
  ipAddress: z.string().min(7, 'Địa chỉ IP không hợp lệ'),
  brand: z.string().min(1, 'Vui lòng nhập hãng'),
  model: z.string().optional(),
  resolution: z.enum(RESOLUTIONS),
  status: z.enum(STATUSES),
  installedAt: z.string().optional(),
  warranty: z.string().optional(),
  note: z.string().optional(),
})
type FormValues = z.infer<typeof schema>

interface Props {
  mode: 'add' | 'edit' | 'delete'
  open: boolean
  onOpenChange: (v: boolean) => void
  camera?: CameraItem
  onAdd?: (v: FormValues) => void
  onEdit?: (id: string, v: FormValues) => void
  onDelete?: (id: string) => void
}

export function CameraDialog({ mode, open, onOpenChange, camera, onAdd, onEdit, onDelete }: Props) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { code: '', name: '', room: '', ipAddress: '', brand: '', model: '', resolution: '1080p', status: 'Hoạt động', installedAt: '', warranty: '', note: '' },
  })

  useEffect(() => {
    if (!open) return
    if (mode === 'add') {
      reset({ code: '', name: '', room: '', ipAddress: '', brand: '', model: '', resolution: '1080p', status: 'Hoạt động', installedAt: '', warranty: '', note: '' })
    } else if (camera) {
      reset({ code: camera.code, name: camera.name, room: camera.room, ipAddress: camera.ipAddress, brand: camera.brand, model: camera.model, resolution: camera.resolution as any, status: camera.status, installedAt: camera.installedAt, warranty: camera.warranty, note: camera.note })
    }
  }, [open, mode, camera, reset])

  const onSubmit = async (v: FormValues) => {
    try { if (mode === 'add') { await onAdd?.(v); toast.success('Đã thêm thành công'); } else { await onEdit?.(item?.id || v.id, v); toast.success('Đã cập nhật thành công'); } onOpenChange(false); } catch (e) { toast.error('Có lỗi xảy ra'); }
  }

  const handleDelete = async () => {
    await new Promise(r => setTimeout(r, 300))
    onDelete?.(camera!.id)
    toast.success(`Đã xóa camera "${camera?.name}"`)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <div className="mb-5">
          <h3 className="text-xl font-semibold text-white">
            {mode === 'add' ? 'Thêm camera mới' : mode === 'edit' ? 'Chỉnh sửa camera' : 'Xóa camera'}
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            {mode === 'delete' ? 'Thao tác này không thể hoàn tác.' : 'Điền thông tin camera giám sát.'}
          </p>
        </div>

        {mode === 'delete' ? (
          <div className="space-y-4">
            <div className="rounded-[14px] border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
              <div className="font-semibold">{camera?.name}</div>
              <div className="text-xs text-red-300/70">{camera?.code} · {camera?.room} · {camera?.ipAddress}</div>
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
                <Label>Mã camera</Label>
                <Input placeholder="CAM-001" {...register('code')} />
                {errors.code && <p className="text-xs text-red-400">{errors.code.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label>Tên camera</Label>
                <Input placeholder="Camera hành lang A3" {...register('name')} />
                {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label>Phòng / Khu vực</Label>
                <Input placeholder="Hành lang A3 - Tầng 3" {...register('room')} />
                {errors.room && <p className="text-xs text-red-400">{errors.room.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label>Địa chỉ IP</Label>
                <Input placeholder="192.168.1.100" {...register('ipAddress')} />
                {errors.ipAddress && <p className="text-xs text-red-400">{errors.ipAddress.message}</p>}
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="grid gap-2">
                <Label>Hãng</Label>
                <Input placeholder="Hikvision, Dahua..." {...register('brand')} />
                {errors.brand && <p className="text-xs text-red-400">{errors.brand.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label>Model</Label>
                <Input placeholder="DS-2CD2143G2-I" {...register('model')} />
              </div>
              <div className="grid gap-2">
                <Label>Độ phân giải</Label>
                <Select {...register('resolution')}>
                  {RESOLUTIONS.map(r => <option key={r}>{r}</option>)}
                </Select>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="grid gap-2">
                <Label>Trạng thái</Label>
                <Select {...register('status')}>
                  {STATUSES.map(s => <option key={s}>{s}</option>)}
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Ngày lắp đặt</Label>
                <Input placeholder="01/01/2024" {...register('installedAt')} />
              </div>
              <div className="grid gap-2">
                <Label>Bảo hành đến</Label>
                <Input placeholder="01/01/2027" {...register('warranty')} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Ghi chú</Label>
              <Textarea placeholder="Vị trí lắp, góc quay, cấu hình đặc biệt..." {...register('note')} />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Hủy</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Đang lưu...' : mode === 'add' ? 'Thêm camera' : 'Lưu thay đổi'}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
