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
import type { SoftwareItem } from '@/types/software'

const STATUSES = ['Đang dùng', 'Sắp hết hạn', 'Hết hạn'] as const
const CATEGORIES = ['Hệ điều hành', 'Văn phòng', 'Bảo mật', 'Thiết kế', 'Lập trình'] as const
const LICENSE_TYPES = ['Bản quyền', 'Mã nguồn mở', 'Dùng thử', 'Đăng ký hàng năm'] as const

const schema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, 'Tên phần mềm tối thiểu 2 ký tự'),
  publisher: z.string().min(2, 'Vui lòng nhập nhà phát hành'),
  version: z.string().optional(),
  category: z.enum(CATEGORIES),
  licenseType: z.string().min(2, 'Vui lòng chọn loại giấy phép'),
  licenseKey: z.string().optional(),
  totalLicenses: z.string().min(1, 'Vui lòng nhập số bản quyền'),
  usedLicenses: z.string().optional(),
  expiresAt: z.string().optional(),
  room: z.string().optional(),
  status: z.enum(STATUSES),
  note: z.string().optional(),
})
type FormValues = z.infer<typeof schema>

interface Props {
  mode: 'add' | 'edit' | 'delete'
  open: boolean
  onOpenChange: (v: boolean) => void
  item?: SoftwareItem
  onAdd?: (v: FormValues) => void
  onEdit?: (id: string, v: FormValues) => void
  onDelete?: (id: string) => void
}

export function SoftwareDialog({ mode, open, onOpenChange, item, onAdd, onEdit, onDelete }: Props) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', publisher: '', version: '', category: 'Văn phòng', licenseType: 'Bản quyền', licenseKey: '', totalLicenses: '1', usedLicenses: '0', expiresAt: '', room: '', status: 'Đang dùng', note: '' },
  })

  useEffect(() => {
    if (!open) return
    if (mode === 'add') {
      reset({ name: '', publisher: '', version: '', category: 'Văn phòng', licenseType: 'Bản quyền', licenseKey: '', totalLicenses: '1', usedLicenses: '0', expiresAt: '', room: '', status: 'Đang dùng', note: '' })
    } else if (item) {
      reset({ name: item.name, publisher: item.publisher, version: item.version, category: item.category, licenseType: item.licenseType, licenseKey: item.licenseKey, totalLicenses: item.totalLicenses, usedLicenses: item.usedLicenses, expiresAt: item.expiresAt, room: item.room, status: item.status, note: item.note })
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
    toast.success(`Đã xóa phần mềm "${item?.name}"`)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <div className="mb-5">
          <h3 className="text-xl font-semibold text-white">
            {mode === 'add' ? 'Thêm phần mềm' : mode === 'edit' ? 'Chỉnh sửa phần mềm' : 'Xóa phần mềm'}
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            {mode === 'delete' ? 'Thao tác này không thể hoàn tác.' : 'Quản lý bản quyền phần mềm của tổ chức.'}
          </p>
        </div>

        {mode === 'delete' ? (
          <div className="space-y-4">
            <div className="rounded-[14px] border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
              <div className="font-semibold">{item?.name}</div>
              <div className="text-xs text-red-300/70">{item?.publisher} · {item?.category} · {item?.totalLicenses} bản quyền</div>
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
                <Label>Tên phần mềm</Label>
                <Input placeholder="Microsoft Office 365" {...register('name')} />
                {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label>Nhà phát hành</Label>
                <Input placeholder="Microsoft, Adobe..." {...register('publisher')} />
                {errors.publisher && <p className="text-xs text-red-400">{errors.publisher.message}</p>}
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="grid gap-2">
                <Label>Phiên bản</Label>
                <Input placeholder="2025" {...register('version')} />
              </div>
              <div className="grid gap-2">
                <Label>Danh mục</Label>
                <Select {...register('category')}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Loại giấy phép</Label>
                <Select {...register('licenseType')}>
                  {LICENSE_TYPES.map(t => <option key={t}>{t}</option>)}
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>License Key</Label>
              <Input placeholder="XXXXX-XXXXX-XXXXX-XXXXX (có thể để trống)" {...register('licenseKey')} />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="grid gap-2">
                <Label>Tổng bản quyền</Label>
                <Input type="number" placeholder="10" {...register('totalLicenses')} />
                {errors.totalLicenses && <p className="text-xs text-red-400">{errors.totalLicenses.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label>Đã sử dụng</Label>
                <Input type="number" placeholder="7" {...register('usedLicenses')} />
              </div>
              <div className="grid gap-2">
                <Label>Hết hạn</Label>
                <Input placeholder="31/12/2026" {...register('expiresAt')} />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label>Phòng / Đơn vị</Label>
                <Input placeholder="Tất cả phòng máy" {...register('room')} />
              </div>
              <div className="grid gap-2">
                <Label>Trạng thái</Label>
                <Select {...register('status')}>
                  {STATUSES.map(s => <option key={s}>{s}</option>)}
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Ghi chú</Label>
              <Textarea placeholder="Điều khoản sử dụng, hạn chế, ghi chú bổ sung..." {...register('note')} />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Hủy</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Đang lưu...' : mode === 'add' ? 'Thêm phần mềm' : 'Lưu thay đổi'}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
