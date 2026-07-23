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
import type { NetworkItem } from '@/types/network'

const STATUSES = ['Hoạt động', 'Cảnh báo', 'Lỗi'] as const
const TYPES = ['Switch', 'Access Point', 'Router', 'Firewall', 'Controller'] as const

const schema = z.object({
  code: z.string().min(2, 'Mã thiết bị tối thiểu 2 ký tự'),
  name: z.string().min(3, 'Tên thiết bị tối thiểu 3 ký tự'),
  type: z.enum(TYPES),
  brand: z.string().min(1, 'Vui lòng nhập hãng'),
  model: z.string().optional(),
  room: z.string().min(2, 'Vui lòng nhập phòng'),
  ipAddress: z.string().min(7, 'Địa chỉ IP không hợp lệ'),
  macAddress: z.string().optional(),
  vlan: z.string().optional(),
  port: z.string().optional(),
  status: z.enum(STATUSES),
  warranty: z.string().optional(),
  installedAt: z.string().optional(),
  note: z.string().optional(),
})
type FormValues = z.infer<typeof schema>

interface Props {
  mode: 'add' | 'edit' | 'delete'
  open: boolean
  onOpenChange: (v: boolean) => void
  item?: NetworkItem
  onAdd?: (v: FormValues) => void
  onEdit?: (id: string, v: FormValues) => void
  onDelete?: (id: string) => void
}

export function NetworkDialog({ mode, open, onOpenChange, item, onAdd, onEdit, onDelete }: Props) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { code: '', name: '', type: 'Switch', brand: '', model: '', room: '', ipAddress: '', macAddress: '', vlan: '', port: '', status: 'Hoạt động', warranty: '', installedAt: '', note: '' },
  })

  useEffect(() => {
    if (!open) return
    if (mode === 'add') {
      reset({ code: '', name: '', type: 'Switch', brand: '', model: '', room: '', ipAddress: '', macAddress: '', vlan: '', port: '', status: 'Hoạt động', warranty: '', installedAt: '', note: '' })
    } else if (item) {
      reset({ code: item.code, name: item.name, type: item.type, brand: item.brand, model: item.model, room: item.room, ipAddress: item.ipAddress, macAddress: item.macAddress, vlan: item.vlan, port: item.port, status: item.status, warranty: item.warranty, installedAt: item.installedAt, note: item.note })
    }
  }, [open, mode, item, reset])

  const onSubmit = async (v: FormValues) => {
    try {
      if (mode === 'add') {
        await onAdd?.(v)
        toast.success('Đã thêm thành công')
      } else {
        await onEdit?.(item!.id, v)
        toast.success('Đã cập nhật thành công')
      }
      onOpenChange(false)
    } catch (e) {
      toast.error('Có lỗi xảy ra')
    }
  }

  const handleDelete = async () => {
    await new Promise(r => setTimeout(r, 300))
    onDelete?.(item!.id)
    toast.success(`Đã xóa thiết bị mạng "${item?.name}"`)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <div className="mb-5">
          <h3 className="text-xl font-semibold text-white">
            {mode === 'add' ? 'Thêm thiết bị mạng' : mode === 'edit' ? 'Chỉnh sửa thiết bị mạng' : 'Xóa thiết bị mạng'}
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            {mode === 'delete' ? 'Thao tác này không thể hoàn tác.' : 'Điền thông tin thiết bị hạ tầng mạng.'}
          </p>
        </div>

        {mode === 'delete' ? (
          <div className="space-y-4">
            <div className="rounded-[14px] border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
              <div className="font-semibold">{item?.name}</div>
              <div className="text-xs text-red-300/70">{item?.code} · {item?.type} · {item?.ipAddress}</div>
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
                <Label>Mã thiết bị</Label>
                <Input placeholder="SW-001" {...register('code')} />
                {errors.code && <p className="text-xs text-red-400">{errors.code.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label>Tên thiết bị</Label>
                <Input placeholder="Core Switch A3" {...register('name')} />
                {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="grid gap-2">
                <Label>Loại</Label>
                <Select {...register('type')}>
                  {TYPES.map(t => <option key={t}>{t}</option>)}
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Hãng</Label>
                <Input placeholder="Cisco, TP-Link..." {...register('brand')} />
                {errors.brand && <p className="text-xs text-red-400">{errors.brand.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label>Model</Label>
                <Input placeholder="Catalyst 2960" {...register('model')} />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label>Phòng / Vị trí</Label>
                <Input placeholder="Server Room" {...register('room')} />
                {errors.room && <p className="text-xs text-red-400">{errors.room.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label>Địa chỉ IP</Label>
                <Input placeholder="192.168.1.1" {...register('ipAddress')} />
                {errors.ipAddress && <p className="text-xs text-red-400">{errors.ipAddress.message}</p>}
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="grid gap-2">
                <Label>MAC Address</Label>
                <Input placeholder="AA:BB:CC:DD:EE:FF" {...register('macAddress')} />
              </div>
              <div className="grid gap-2">
                <Label>VLAN</Label>
                <Input placeholder="10" {...register('vlan')} />
              </div>
              <div className="grid gap-2">
                <Label>Port</Label>
                <Input placeholder="24" {...register('port')} />
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
              <Textarea placeholder="Cấu hình VLAN, routing, ghi chú kỹ thuật..." {...register('note')} />
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
