import { useEffect, useState } from 'react'
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
import type { DeviceItem } from '@/types/device'

const schema = z.object({
  assetCode: z.string().min(2, 'Mã tài sản tối thiểu 2 ký tự'),
  name: z.string().min(3, 'Tên thiết bị tối thiểu 3 ký tự'),
  category: z.string().min(2, 'Vui lòng nhập loại thiết bị'),
  brand: z.string().min(1, 'Vui lòng nhập hãng'),
  room: z.string().min(2, 'Vui lòng nhập phòng'),
  owner: z.string().min(2, 'Vui lòng nhập người/đơn vị'),
  status: z.enum(['Hoạt động', 'Đang sửa', 'Bảo trì', 'Hỏng', 'Chờ thanh lý']),
  warranty: z.string().min(4, 'Vui lòng nhập ngày bảo hành'),
  serial: z.string().optional(),
  note: z.string().optional(),
})
type FormValues = z.infer<typeof schema>

interface Props {
  mode: 'add' | 'edit' | 'delete'
  open: boolean
  onOpenChange: (open: boolean) => void
  device?: DeviceItem
  onAdd?: (values: FormValues) => void
  onEdit?: (id: string, values: FormValues) => void
  onDelete?: (id: string) => void
}

const STATUSES = ['Hoạt động', 'Đang sửa', 'Bảo trì', 'Hỏng', 'Chờ thanh lý'] as const

export function DeviceDialog({ mode, open, onOpenChange, device, onAdd, onEdit, onDelete }: Props) {
  const [deleting, setDeleting] = useState(false)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      assetCode: '', name: '', category: '', brand: '',
      room: '', owner: '', status: 'Hoạt động', warranty: '', serial: '', note: '',
    },
  })

  useEffect(() => {
    if (open && device && mode !== 'add') {
      reset({
        assetCode: device.assetCode,
        name: device.name,
        category: device.category,
        brand: device.brand,
        room: device.room,
        owner: device.owner,
        status: device.status,
        warranty: device.warranty,
        serial: device.serial ?? '',
        note: '',
      })
    } else if (open && mode === 'add') {
      reset({ assetCode: '', name: '', category: '', brand: '', room: '', owner: '', status: 'Hoạt động', warranty: '', serial: '', note: '' })
    }
  }, [open, device, mode, reset])

  const onSubmit = async (values: FormValues) => {
    try {
      if (mode === 'add') {
        await onAdd?.(values)
        toast.success(`Đã thêm thiết bị "${values.name}"`)
      } else {
        await onEdit?.(device!.id, values)
        toast.success(`Đã cập nhật thiết bị "${values.name}"`)
      }
      onOpenChange(false)
    } catch (error) {
      console.error('Device dialog error:', error)
      toast.error(mode === 'add' ? 'Không thể thêm thiết bị' : 'Không thể cập nhật thiết bị')
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await onDelete?.(device!.id)
      toast.success(`Đã xóa thiết bị "${device?.name}"`)
      onOpenChange(false)
    } catch (error) {
      console.error('Delete device error:', error)
      toast.error('Không thể xóa thiết bị')
    } finally {
      setDeleting(false)
    }
  }

  const title = mode === 'add' ? 'Thêm thiết bị mới' : mode === 'edit' ? 'Chỉnh sửa thiết bị' : 'Xóa thiết bị'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <div className="mb-5">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          {mode === 'delete'
            ? <p className="mt-1 text-sm text-slate-400">Thao tác này không thể hoàn tác. Bạn chắc chắn muốn xóa?</p>
            : <p className="mt-1 text-sm text-slate-400">Điền đầy đủ thông tin thiết bị CNTT.</p>}
        </div>

        {mode === 'delete' ? (
          <div className="space-y-4">
            <div className="rounded-[14px] border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
              <div className="font-semibold">{device?.name}</div>
              <div className="text-xs text-red-300/70">{device?.assetCode} · {device?.room}</div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>Hủy</Button>
              <Button className="bg-red-600 text-white hover:bg-red-500" onClick={handleDelete} disabled={deleting}>
                {deleting ? 'Đang xóa...' : 'Xác nhận xóa'}
              </Button>
            </div>
          </div>
        ) : (
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label>Mã tài sản</Label>
                <Input placeholder="TS-2501" {...register('assetCode')} />
                {errors.assetCode && <p className="text-xs text-red-400">{errors.assetCode.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label>Tên thiết bị</Label>
                <Input placeholder="Dell OptiPlex 7090" {...register('name')} />
                {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label>Loại</Label>
                <Input placeholder="PC, Laptop, Printer..." {...register('category')} />
                {errors.category && <p className="text-xs text-red-400">{errors.category.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label>Hãng</Label>
                <Input placeholder="Dell, HP, Cisco..." {...register('brand')} />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label>Phòng</Label>
                <Input placeholder="A3.302" {...register('room')} />
                {errors.room && <p className="text-xs text-red-400">{errors.room.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label>Người / Đơn vị sử dụng</Label>
                <Input placeholder="Phòng máy / Khoa CNTT" {...register('owner')} />
                {errors.owner && <p className="text-xs text-red-400">{errors.owner.message}</p>}
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
                <Label>Bảo hành đến</Label>
                <Input placeholder="10/08/2026" {...register('warranty')} />
                {errors.warranty && <p className="text-xs text-red-400">{errors.warranty.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label>Serial</Label>
                <Input placeholder="SN-XXXXXX" {...register('serial')} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Ghi chú</Label>
              <Textarea placeholder="Thông tin bổ sung, cấu hình, điều kiện sử dụng..." {...register('note')} />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Hủy</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Đang lưu...' : mode === 'add' ? 'Thêm thiết bị' : 'Lưu thay đổi'}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
