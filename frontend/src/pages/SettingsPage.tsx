import { motion } from 'framer-motion'
import { Database, Globe, Lock, Settings } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="glass-panel overflow-hidden p-6">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Module 14</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Cài đặt Hệ thống</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
            Quản lý cấu hình hệ thống, kết nối cơ sở dữ liệu, và các tùy chọn toàn cục khác.
          </p>
        </div>
      </motion.section>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Thông tin Chung
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-300">Tên Hệ thống</label>
              <Input type="text" defaultValue="Quản lý Thiết bị CNTT" className="mt-2" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300">Tên Tổ chức</label>
              <Input type="text" defaultValue="Trường Đại học Thủ Dầu Một" className="mt-2" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300">Email Quản trị</label>
              <Input type="email" defaultValue="admin@tdmu.edu.vn" className="mt-2" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300">Website</label>
              <Input type="url" defaultValue="https://tdmu.edu.vn" className="mt-2" />
            </div>
            <Button className="w-full">Lưu Thay đổi</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Kết nối Cơ sở Dữ liệu
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-300">Server</label>
              <Input type="text" defaultValue="localhost" className="mt-2" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300">Database</label>
              <Input type="text" defaultValue="QuanLyThietBi" className="mt-2" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300">Cổng</label>
              <Input type="text" defaultValue="1433" className="mt-2" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300">Timeout (giây)</label>
              <Input type="number" defaultValue="30" className="mt-2" />
            </div>
            <div className="flex gap-2">
              <Button className="flex-1">Kiểm tra Kết nối</Button>
              <Button variant="outline" className="flex-1">Lưu</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Bảo mật
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-300">Mật khẩu cũ</label>
              <Input type="password" className="mt-2" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300">Mật khẩu mới</label>
              <Input type="password" className="mt-2" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300">Xác nhận mật khẩu</label>
              <Input type="password" className="mt-2" />
            </div>
            <div className="space-y-2 pt-2">
              <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                <input type="checkbox" className="rounded" defaultChecked />
                Bật xác thực 2 yếu tố
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                <input type="checkbox" defaultChecked />
                Yêu cầu đổi mật khẩu 90 ngày
              </label>
            </div>
            <Button className="w-full">Cập nhật Bảo mật</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Tùy chọn Nâng cao
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-300">Kích thước Log tối đa (MB)</label>
              <Input type="number" defaultValue="100" className="mt-2" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300">Lưu trữ log (ngày)</label>
              <Input type="number" defaultValue="90" className="mt-2" />
            </div>
            <div className="space-y-2 pt-2">
              <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                <input type="checkbox" defaultChecked />
                Cho phép API kế nối
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                <input type="checkbox" defaultChecked />
                Cho phép Xuất dữ liệu
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                <input type="checkbox" />
                Bật chế độ bảo trì
              </label>
            </div>
            <Button className="w-full">Lưu Cấu hình</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin Hệ thống</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 text-sm text-slate-300 xl:grid-cols-2">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span>Phiên bản Ứng dụng</span>
              <span className="font-medium text-white">v1.0.0</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span>Phiên bản Database</span>
              <span className="font-medium text-white">SQL Server 2019</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span>Lần Cập nhật cuối</span>
              <span className="font-medium text-white">19/07/2026 10:30</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span>Trạng thái Database</span>
              <span className="font-medium text-emerald-400">Kết nối tốt</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span>Dung lượng Database</span>
              <span className="font-medium text-white">2.34 GB</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span>Bản ghi Dữ liệu</span>
              <span className="font-medium text-white">12,450 records</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
