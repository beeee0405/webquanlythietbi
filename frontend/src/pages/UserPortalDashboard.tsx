import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Plus, Search, AlertCircle, CheckCircle, Clock, LogOut } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { useAuth } from '../contexts/AuthContext'
import { getTicketData, createTicket } from '../services/ticketService'
import { TicketDialog } from '../components/tickets/TicketDialog'
import type { TicketItem, TicketStatus } from '../types/ticket'

function statusTone(status: TicketStatus) {
  switch (status) {
    case 'Hoàn thành':
      return 'border-emerald-500/20 bg-emerald-500/10 text-emerald-100'
    case 'Đang xử lý':
      return 'border-blue-500/20 bg-blue-500/10 text-blue-100'
    case 'Chờ phản hồi':
      return 'border-amber-500/20 bg-amber-500/10 text-amber-100'
    case 'Mới':
      return 'border-purple-500/20 bg-purple-500/10 text-purple-100'
    case 'Đóng':
      return 'border-slate-500/20 bg-slate-500/10 text-slate-100'
  }
}

export function UserPortalDashboard() {
  const { user, logout } = useAuth()
  const [query, setQuery] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogMode, setDialogMode] = useState<'add' | 'view'>('add')
  const [selectedTicket, setSelectedTicket] = useState<TicketItem | undefined>()

  const { data, refetch } = useQuery({
    queryKey: ['user-tickets', user?.id],
    queryFn: async () => {
      const response = await getTicketData()
      // Filter tickets for current user only
      if (response.items) {
        return {
          ...response,
          items: response.items.filter(t => t.requester === user?.fullName)
        }
      }
      return response
    },
    staleTime: 60_000
  })

  const items = data?.items ?? []
  const filteredItems = items.filter(t =>
    !query.trim() || [t.code, t.subject, t.device, t.room].some(v => 
      v.toLowerCase().includes(query.toLowerCase())
    )
  )

  const activeCount = filteredItems.filter(t => ['Mới', 'Đang xử lý', 'Chờ phản hồi'].includes(t.status)).length
  const resolvedCount = filteredItems.filter(t => t.status === 'Hoàn thành').length

  const openNew = () => {
    setDialogMode('add')
    setSelectedTicket(undefined)
    setDialogOpen(true)
  }

  const openView = (ticket: TicketItem) => {
    setDialogMode('view')
    setSelectedTicket(ticket)
    setDialogOpen(true)
  }

  const handleAdd = async (v: any) => {
    try {
      await createTicket(v)
      refetch()
      setDialogOpen(false)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <motion.section 
          initial={{ opacity: 0, y: 18 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="glass-panel overflow-hidden p-6"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Cổng Người Dùng
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Xin chào <span className="font-semibold text-blue-400">{user?.fullName}</span> • Phòng {user?.room}
              </p>
            </div>
            <div className="flex gap-2">
              <Button className="gap-2" onClick={openNew}>
                <Plus className="h-4 w-4" />
                Báo Lỗi Mới
              </Button>
              <Button variant="outline" className="gap-2" onClick={logout}>
                <LogOut className="h-4 w-4" />
                Đăng xuất
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Quick Stats */}
        <section className="grid gap-4 md:grid-cols-3">
          <Card className="border-slate-800 bg-slate-900/60">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-500/10 p-3">
                  <AlertCircle className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Phiếu Đang Xử Lý</p>
                  <p className="text-2xl font-bold text-white">{activeCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-900/60">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-emerald-500/10 p-3">
                  <CheckCircle className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Đã Giải Quyết</p>
                  <p className="text-2xl font-bold text-white">{resolvedCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-900/60">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-purple-500/10 p-3">
                  <Clock className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Tổng Phiếu</p>
                  <p className="text-2xl font-bold text-white">{filteredItems.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Tickets Table */}
        <Card className="border-slate-800">
          <CardHeader>
            <CardTitle>Danh Sách Phiếu Báo Lỗi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <Input 
                value={query} 
                onChange={e => setQuery(e.target.value)} 
                className="pl-10" 
                placeholder="Tìm theo mã phiếu, tiêu đề, thiết bị..." 
              />
            </div>

            {filteredItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <AlertCircle className="h-12 w-12 text-slate-600 mb-3" />
                <p className="text-slate-400">Bạn chưa có phiếu báo lỗi nào</p>
                <Button variant="outline" className="mt-4" onClick={openNew}>
                  Tạo Phiếu Đầu Tiên
                </Button>
              </div>
            ) : (
              <div className="overflow-hidden rounded-[16px] border border-slate-800">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-900/80 text-slate-400">
                    <tr>
                      <th className="px-4 py-3 font-medium">Mã Phiếu</th>
                      <th className="px-4 py-3 font-medium">Tiêu Đề</th>
                      <th className="px-4 py-3 font-medium">Thiết Bị</th>
                      <th className="px-4 py-3 font-medium">Trạng Thái</th>
                      <th className="px-4 py-3 font-medium">Ngày Tạo</th>
                      <th className="px-4 py-3 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map(ticket => (
                      <tr 
                        key={ticket.id} 
                        className="border-t border-slate-800/80 hover:bg-slate-900/60 cursor-pointer transition"
                        onClick={() => openView(ticket)}
                      >
                        <td className="px-4 py-3 text-slate-200 font-mono text-xs">{ticket.code}</td>
                        <td className="px-4 py-3 text-slate-200 font-medium">{ticket.subject}</td>
                        <td className="px-4 py-3 text-slate-400 text-sm">{ticket.device}</td>
                        <td className="px-4 py-3">
                          <Badge className={statusTone(ticket.status as TicketStatus)}>
                            {ticket.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-slate-400 text-xs">{ticket.createdAt}</td>
                        <td className="px-4 py-3 text-right">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={(e) => {
                              e.stopPropagation()
                              openView(ticket)
                            }}
                          >
                            Xem Chi Tiết
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="border-slate-800 bg-slate-900/40">
          <CardHeader>
            <CardTitle className="text-base">Hướng Dẫn Sử Dụng</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-300">
            <div className="flex gap-3">
              <div className="flex-shrink-0 rounded-full bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-400">1</div>
              <p>Nhấp <span className="font-semibold">Báo Lỗi Mới</span> để tạo phiếu báo cáo sự cố</p>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 rounded-full bg-purple-500/10 px-2.5 py-1 text-xs font-semibold text-purple-400">2</div>
              <p>Điền đầy đủ thông tin: tiêu đề, mô tả, thiết bị bị lỗi</p>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-400">3</div>
              <p>Chọn mức độ ưu tiên phù hợp (Khẩn cấp, Cao, Trung bình, Thấp)</p>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400">4</div>
              <p>Theo dõi trạng thái phiếu trong danh sách bên dưới</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ticket Dialog */}
      <TicketDialog
        mode={dialogMode === 'add' ? 'add' : 'view'}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        item={selectedTicket}
        onAdd={handleAdd}
        isUserPortal={true}
      />
    </div>
  )
}
