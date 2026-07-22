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
import type { LiquidationItem } from '@/types/liquidation'

const STATUSES = ['Chờ duyệt', 'Đã duyệt', 'Đã thanh lý', 'Từ chối'] as const
const CONDITIONS = ['Tốt', 'Bình thường', 'Hỏng'] as const

const schema = z.object({
  code: z.string().min(2, 'Mã yêu cầu tối thiểu 2 ký tự'),
  assetCode: z.string().min(2, 'Mã asset không được để trống'),
  assetName: z.string().min(2, 'Tên thiết bị không được để trống'),
  room: z.string().min(2, 'Phòng không được để trống'),
  reason: z.string().min(2, 'Lý do không được để trống'),
  condition: z.enum(CONDITIONS),
  status: z.enum(STATUSES),
  requester: z.string().min(2, 'Người yêu cầu không được để trống'),
  residualValue: z.string(),
  completedAt: z.string(),
  note: z.string().optional(),
})
type FormValues = z.infer<typeof schema>

interface Props {
  mode: 'add' | 'edit' | 'delete'
  open: boolean
  onOpenChange: (v: boolean) => void
  item?: LiquidationItem
  onAdd?: (v: FormValues) => void
  onEdit?: (id: string, v: FormValues) => void
  onDelete?: (id: string) => void
}

export function LiquidationDialog({ mode, open, onOpenChange, item, onAdd, onEdit, onDelete }: Props) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { code: '', assetCode: '', assetName: '', room: '', reason: '', condition: 'Hỏng', status: 'Chờ duyệt', requester: '', residualValue: '0', completedAt: '', note: '' },
  })

  useEffect(() => {
    if (!open) return
    if (mode === 'add') {
      reset({ code: '', assetCode: '', assetName: '', room: '', reason: '', condition: 'Hỏng', status: 'Chờ duyệt', requester: '', residualValue: '0', completedAt: '', note: '' })
    } else if (item) {
      reset({ code: item.code, assetCode: item.assetCode, assetName: item.assetName, room: item.room, reason: item.reason, condition: item.condition as any, status: item.status as any, requester: item.requester, residualValue: item.residualValue, completedAt: item.completedAt, note: item.note })
    }
  }, [open, mode, item, reset])

  const onSubmit = async (v: FormValues) => {
    await new Promise(r => setTimeout(r, 400))
    if (mode === 'add') { onAdd?.(v); toast.success(`Đã tạo yêu cầu thanh lý "${v.code}"`) }
    else { onEdit?.(item!.id, v); toast.success(`Đã cập nhật "${v.code}"`) }
    onOpenChange(false)
  }

  const handleDelete = async () => {
    await new Promise(r => setTimeout(r, 300))
    onDelete?.(item!.id)
    toast.success(`Đã xóa yêu cầu thanh lý "${item?.code}"`)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <div className="mb-5">
          <h3 className="text-xl font-semibold text-white">
            {mode === 'add' ? 'Tạo yêu cầu thanh lý' : mode === 'edit' ? 'Chỉnh sửa yêu cầu' : 'Xóa yêu cầu thanh lý'}
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            {mode === 'delete' ? 'Thao tác này không thể hoàn tác.' : 'Quản lý yêu cầu thanh lý thiết bị.'}
          </p>
        </div>

        {mode === 'delete' ? (
          <div className="space-y-4">
            <div className="rounded-[14px] border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
              <div className="font-semibold">{item?.code}</div>
              <div className="text-xs text-red-300/70">{item?.assetCode} · {item?.assetName}</div>
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
                <Label>Mã Yêu Cầu</Label>
                <Input placeholder="LIQ-001" {...register('code')} />
                {errors.code && <p className="text-xs text-red-400">{errors.code.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label>Mã Asset</Label>
                <Input placeholder="DEV-001" {...register('assetCode')} />
                {errors.assetCode && <p className="text-xs text-red-400">{errors.assetCode.message}</p>}
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Tên Thiết Bị</Label>
              <Input placeholder="Laptop Dell" {...register('assetName')} />
              {errors.assetName && <p className="text-xs text-red-400">{errors.assetName.message}</p>}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label>Phòng</Label>
                <Input placeholder="A3.301" {...register('room')} />
                {errors.room && <p className="text-xs text-red-400">{errors.room.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label>Lý Do</Label>
                <Input placeholder="Hỏng, lỗi thời" {...register('reason')} />
                {errors.reason && <p className="text-xs text-red-400">{errors.reason.message}</p>}
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="grid gap-2">
                <Label>Tình Trạng</Label>
                <Select {...register('condition')}>
                  {CONDITIONS.map(c => <option key={c}>{c}</option>)}
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Trạng Thái</Label>
                <Select {...register('status')}>
                  {STATUSES.map(s => <option key={s}>{s}</option>)}
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Giá Trị Còn</Label>
                <Input type="number" placeholder="0" {...register('residualValue')} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Người Yêu Cầu</Label>
              <Input placeholder="Nguyễn Văn A" {...register('requester')} />
              {errors.requester && <p className="text-xs text-red-400">{errors.requester.message}</p>}
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
                {isSubmitting ? 'Đang lưu...' : mode === 'add' ? 'Tạo' : 'Lưu thay đổi'}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
