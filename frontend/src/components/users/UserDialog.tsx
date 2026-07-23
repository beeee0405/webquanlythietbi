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
import type { UserItem } from '@/types/user'

const ROLES = ['Quản trị viên', 'Kỹ thuật viên', 'Nhân viên'] as const
const STATUSES = ['Đang hoạt động', 'Nghỉ phép', 'Đã nghỉ việc'] as const

const schema = z.object({
  fullName: z.string().min(3, 'Họ tên tối thiểu 3 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  phone: z.string().min(9, 'Số điện thoại không hợp lệ'),
  department: z.string().min(2, 'Vui lòng nhập phòng ban'),
  room: z.string().optional(),
  role: z.enum(ROLES),
  status: z.enum(STATUSES),
  username: z.string().min(3, 'Username tối thiểu 3 ký tự').optional(),
  password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự').optional(),
})
type FormValues = z.infer<typeof schema>

interface Props {
  mode: 'add' | 'edit' | 'delete'
  open: boolean
  onOpenChange: (v: boolean) => void
  item?: UserItem
  onAdd?: (v: FormValues) => void
  onEdit?: (id: string, v: FormValues) => void
  onDelete?: (id: string) => void
}

export function UserDialog({ mode, open, onOpenChange, item: user, onAdd, onEdit, onDelete }: Props) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: '', email: '', phone: '', department: '', room: '', role: 'Nhân viên', status: 'Đang hoạt động', username: '', password: '' },
  })

  useEffect(() => {
    if (!open) return
    if (mode === 'add') {
      reset({ fullName: '', email: '', phone: '', department: '', room: '', role: 'Nhân viên', status: 'Đang hoạt động', username: '', password: '' })
    } else if (user) {
      reset({ fullName: user.fullName, email: user.email, phone: user.phone, department: user.department, room: user.room, role: user.role, status: user.status, username: '', password: '' })
    }
  }, [open, mode, user, reset])

  const onSubmit = async (v: FormValues) => {
    try {
      if (mode === 'add') {
        await onAdd?.(v)
        toast.success(`Đã thêm người dùng "${v.fullName}"`)
      } else {
        await onEdit?.(user!.id, v)
        toast.success(`Đã cập nhật "${v.fullName}"`)
      }
      onOpenChange(false)
    } catch (error) {
      console.error('Dialog submit error:', error)
      toast.error(mode === 'add' ? 'Không thể thêm người dùng' : 'Không thể cập nhật người dùng')
    }
  }

  const handleDelete = async () => {
    try {
      await onDelete?.(user!.id)
      toast.success(`Đã xóa người dùng "${user?.fullName}"`)
      onOpenChange(false)
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Không thể xóa người dùng')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <div className="mb-5">
          <h3 className="text-xl font-semibold text-white">
            {mode === 'add' ? 'Thêm người dùng' : mode === 'edit' ? 'Chỉnh sửa người dùng' : 'Xóa người dùng'}
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            {mode === 'delete' ? 'Thao tác này không thể hoàn tác.' : 'Quản lý tài khoản người dùng trong hệ thống.'}
          </p>
        </div>

        {mode === 'delete' ? (
          <div className="space-y-4">
            <div className="rounded-[14px] border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
              <div className="font-semibold">{user?.fullName}</div>
              <div className="text-xs text-red-300/70">{user?.email} · {user?.role} · {user?.department}</div>
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
                <Label>Họ và tên</Label>
                <Input placeholder="Nguyễn Văn A" {...register('fullName')} />
                {errors.fullName && <p className="text-xs text-red-400">{errors.fullName.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input type="email" placeholder="nva@tdmu.edu.vn" {...register('email')} />
                {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
              </div>
            </div>
            {mode === 'add' && (
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label>Username</Label>
                  <Input placeholder="nva_2024" {...register('username')} />
                  {errors.username && <p className="text-xs text-red-400">{errors.username.message}</p>}
                </div>
                <div className="grid gap-2">
                  <Label>Mật khẩu</Label>
                  <Input type="password" placeholder="••••••" {...register('password')} />
                  {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
                </div>
              </div>
            )}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label>Số điện thoại</Label>
                <Input placeholder="0901234567" {...register('phone')} />
                {errors.phone && <p className="text-xs text-red-400">{errors.phone.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label>Phòng ban</Label>
                <Input placeholder="Hạ tầng CNTT" {...register('department')} />
                {errors.department && <p className="text-xs text-red-400">{errors.department.message}</p>}
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="grid gap-2">
                <Label>Phòng làm việc</Label>
                <Input placeholder="A3.302" {...register('room')} />
              </div>
              <div className="grid gap-2">
                <Label>Vai trò</Label>
                <Select {...register('role')}>
                  {ROLES.map(r => <option key={r}>{r}</option>)}
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Trạng thái</Label>
                <Select {...register('status')}>
                  {STATUSES.map(s => <option key={s}>{s}</option>)}
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Hủy</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Đang lưu...' : mode === 'add' ? 'Thêm người dùng' : 'Lưu thay đổi'}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
