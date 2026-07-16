import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { deviceStatuses } from '@/data/devices'

const schema = z.object({
  assetCode: z.string().min(2, 'Mã tài sản không hợp lệ'),
  name: z.string().min(3, 'Tên thiết bị phải có ít nhất 3 ký tự'),
  category: z.string().min(2),
  brand: z.string().min(2),
  room: z.string().min(2),
  owner: z.string().min(2),
  status: z.enum(['Hoạt động', 'Đang sửa', 'Bảo trì', 'Hỏng', 'Chờ thanh lý']),
  warranty: z.string().min(4),
  note: z.string().optional()
})

type DeviceFormValues = z.infer<typeof schema>

export function DeviceDialog() {
  const [open, setOpen] = useState(false)
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<DeviceFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      assetCode: '',
      name: '',
      category: '',
      brand: '',
      room: '',
      owner: '',
      status: 'Hoạt động',
      warranty: '',
      note: ''
    }
  })

  const onSubmit = async (_values: DeviceFormValues) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Thêm thiết bị</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <div className="mb-5">
          <h3 className="text-xl font-semibold text-white">Thêm thiết bị mới</h3>
          <p className="mt-1 text-sm text-slate-400">Dữ liệu mẫu để mô phỏng luồng CRUD của module Quản lý thiết bị.</p>
        </div>
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="assetCode">Mã tài sản</Label>
              <Input id="assetCode" placeholder="TS-2501" {...register('assetCode')} />
              {errors.assetCode ? <p className="text-xs text-red-400">{errors.assetCode.message}</p> : null}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Tên thiết bị</Label>
              <Input id="name" placeholder="Dell OptiPlex 7090" {...register('name')} />
              {errors.name ? <p className="text-xs text-red-400">{errors.name.message}</p> : null}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="category">Loại</Label>
              <Input id="category" placeholder="PC, Laptop, Printer..." {...register('category')} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="brand">Hãng</Label>
              <Input id="brand" placeholder="Dell, HP, Cisco..." {...register('brand')} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="room">Phòng</Label>
              <Input id="room" placeholder="A3.302" {...register('room')} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="owner">Người/Đơn vị sử dụng</Label>
              <Input id="owner" placeholder="Phòng máy / Khoa CNTT" {...register('owner')} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="status">Trạng thái</Label>
              <Select id="status" {...register('status')}>
                {deviceStatuses.map(status => <option key={status}>{status}</option>)}
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="warranty">Bảo hành</Label>
              <Input id="warranty" placeholder="10/08/2026" {...register('warranty')} />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="note">Ghi chú</Label>
            <Textarea id="note" placeholder="Thông tin bổ sung, cấu hình, serial, điều kiện sử dụng..." {...register('note')} />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Hủy</Button>
            <Button type="submit" disabled={isSubmitting}>Lưu thiết bị</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
