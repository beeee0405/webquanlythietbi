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
import { ticketChannels, ticketPriorities, ticketStatuses } from '@/data/tickets'

const schema = z.object({
  code: z.string().min(2),
  subject: z.string().min(3),
  requester: z.string().min(2),
  room: z.string().min(2),
  device: z.string().min(2),
  category: z.string().min(2),
  priority: z.enum(['Khẩn cấp', 'Cao', 'Trung bình', 'Thấp']),
  status: z.enum(['Mới', 'Đang xử lý', 'Chờ phản hồi', 'Hoàn thành', 'Đóng']),
  channel: z.enum(['QR', 'Email', 'Điện thoại', 'Trực tiếp', 'Hệ thống']),
  assignee: z.string().min(2),
  description: z.string().min(10)
})

type TicketFormValues = z.infer<typeof schema>

export function TicketDialog() {
  const [open, setOpen] = useState(false)
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<TicketFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      code: '',
      subject: '',
      requester: '',
      room: '',
      device: '',
      category: '',
      priority: 'Cao',
      status: 'Mới',
      channel: 'QR',
      assignee: '',
      description: ''
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
        <Button>+ Tạo ticket</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <div className="mb-5">
          <h3 className="text-xl font-semibold text-white">Tạo ticket hỗ trợ</h3>
          <p className="mt-1 text-sm text-slate-400">Mô phỏng form nghiệp vụ để mở ticket từ QR, email, điện thoại hoặc nhập tay.</p>
        </div>
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="code">Mã ticket</Label>
              <Input id="code" placeholder="TK-152" {...register('code')} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subject">Tiêu đề</Label>
              <Input id="subject" placeholder="Máy in không nhận lệnh" {...register('subject')} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="requester">Người yêu cầu</Label>
              <Input id="requester" placeholder="GV Nguyễn Văn A" {...register('requester')} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="room">Phòng</Label>
              <Input id="room" placeholder="A102" {...register('room')} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="device">Thiết bị liên quan</Label>
              <Input id="device" placeholder="HP LaserJet 1020" {...register('device')} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Nhóm xử lý</Label>
              <Input id="category" placeholder="In ấn, Mạng, Phần cứng..." {...register('category')} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="priority">Ưu tiên</Label>
              <Select id="priority" {...register('priority')}>
                {ticketPriorities.map(item => <option key={item}>{item}</option>)}
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Trạng thái</Label>
              <Select id="status" {...register('status')}>
                {ticketStatuses.map(item => <option key={item}>{item}</option>)}
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="channel">Kênh tiếp nhận</Label>
              <Select id="channel" {...register('channel')}>
                {ticketChannels.map(item => <option key={item}>{item}</option>)}
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="assignee">Người xử lý</Label>
              <Input id="assignee" placeholder="Nguyễn Văn Hoàng" {...register('assignee')} />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Mô tả sự cố</Label>
            <Textarea id="description" placeholder="Mô tả chi tiết sự cố, điều kiện phát sinh, bước tái hiện..." {...register('description')} />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Hủy</Button>
            <Button type="submit" disabled={isSubmitting}>Lưu ticket</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
