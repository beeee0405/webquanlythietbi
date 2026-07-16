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
import { maintenancePriorities, maintenanceStatuses, maintenanceTypes } from '@/data/maintenance'

const schema = z.object({
  code: z.string().min(2),
  title: z.string().min(3),
  assetCode: z.string().min(2),
  assetName: z.string().min(2),
  room: z.string().min(2),
  type: z.enum(['Phòng ngừa', 'Sửa chữa', 'Vệ sinh', 'Kiểm tra']),
  priority: z.enum(['Khẩn cấp', 'Cao', 'Trung bình', 'Thấp']),
  status: z.enum(['Chờ duyệt', 'Đang thực hiện', 'Hoàn thành', 'Tạm hoãn']),
  assignee: z.string().min(2),
  scheduledAt: z.string().min(2),
  note: z.string().min(5)
})

type MaintenanceFormValues = z.infer<typeof schema>

export function MaintenanceDialog() {
  const [open, setOpen] = useState(false)
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<MaintenanceFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      code: '',
      title: '',
      assetCode: '',
      assetName: '',
      room: '',
      type: 'Kiểm tra',
      priority: 'Cao',
      status: 'Chờ duyệt',
      assignee: '',
      scheduledAt: '',
      note: ''
    }
  })

  const onSubmit = async () => {
    await new Promise(resolve => setTimeout(resolve, 500))
    reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Tạo phiếu bảo trì</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <div className="mb-5">
          <h3 className="text-xl font-semibold text-white">Tạo phiếu bảo trì</h3>
          <p className="mt-1 text-sm text-slate-400">Mô phỏng quy trình lập kế hoạch, phân công và theo dõi bảo trì tài sản.</p>
        </div>
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="code">Mã phiếu</Label>
              <Input id="code" placeholder="MT-011" {...register('code')} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="title">Tiêu đề</Label>
              <Input id="title" placeholder="Bảo trì phòng máy A3.302" {...register('title')} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="assetCode">Mã thiết bị</Label>
              <Input id="assetCode" placeholder="TS-2401" {...register('assetCode')} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="assetName">Tên thiết bị</Label>
              <Input id="assetName" placeholder="Dell OptiPlex 3080" {...register('assetName')} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="room">Phòng</Label>
              <Input id="room" placeholder="A3.302" {...register('room')} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="assignee">Người phụ trách</Label>
              <Input id="assignee" placeholder="Nguyễn Văn Hoàng" {...register('assignee')} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="type">Loại bảo trì</Label>
              <Select id="type" {...register('type')}>
                {maintenanceTypes.map(item => <option key={item}>{item}</option>)}
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="priority">Ưu tiên</Label>
              <Select id="priority" {...register('priority')}>
                {maintenancePriorities.map(item => <option key={item}>{item}</option>)}
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="status">Trạng thái</Label>
              <Select id="status" {...register('status')}>
                {maintenanceStatuses.map(item => <option key={item}>{item}</option>)}
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="scheduledAt">Lịch dự kiến</Label>
              <Input id="scheduledAt" placeholder="02/08/2026 08:00" {...register('scheduledAt')} />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="note">Ghi chú</Label>
            <Textarea id="note" placeholder="Mô tả chi tiết công việc, vật tư, yêu cầu an toàn..." {...register('note')} />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Hủy</Button>
            <Button type="submit" disabled={isSubmitting}>Lưu phiếu</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
