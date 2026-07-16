import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

const ticketSchema = z.object({
  subject: z.string().min(3, 'Tiêu đề phải có ít nhất 3 ký tự'),
  room: z.string().min(2, 'Phòng không được để trống'),
  priority: z.enum(['Khẩn cấp', 'Cao', 'Trung bình']),
  description: z.string().min(10, 'Mô tả phải rõ hơn')
})

type TicketFormValues = z.infer<typeof ticketSchema>

export function QuickTicketDialog() {
  const [open, setOpen] = useState(false)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<TicketFormValues>({
    resolver: zodResolver(ticketSchema),
    defaultValues: { subject: '', room: '', priority: 'Cao', description: '' }
  })

  const onSubmit = async (_data: TicketFormValues) => {
    await new Promise(resolve => setTimeout(resolve, 600))
    reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Tạo ticket nhanh</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="mb-5">
          <h3 className="text-xl font-semibold text-white">Tạo phiếu hỗ trợ</h3>
          <p className="mt-1 text-sm text-slate-400">Form mẫu dùng cho module đầu tiên. Sẽ nối API ở giai đoạn tiếp theo.</p>
        </div>
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <Label htmlFor="subject">Tiêu đề</Label>
            <Input id="subject" placeholder="Ví dụ: Máy in kẹt giấy" {...register('subject')} />
            {errors.subject ? <p className="text-xs text-red-400">{errors.subject.message}</p> : null}
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="room">Phòng</Label>
              <Input id="room" placeholder="A3.302" {...register('room')} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="priority">Mức ưu tiên</Label>
              <select id="priority" className="h-11 rounded-[16px] border border-slate-800 bg-slate-950/80 px-4 text-sm text-slate-100" {...register('priority')}>
                <option>Khẩn cấp</option>
                <option>Cao</option>
                <option>Trung bình</option>
              </select>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Mô tả</Label>
            <Textarea id="description" placeholder="Mô tả chi tiết hiện trạng sự cố..." {...register('description')} />
            {errors.description ? <p className="text-xs text-red-400">{errors.description.message}</p> : null}
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Hủy</Button>
            <Button type="submit" disabled={isSubmitting}>Gửi ticket</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
