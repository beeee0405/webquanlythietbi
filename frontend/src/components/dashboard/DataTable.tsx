import { useMemo } from 'react'
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import type { DeviceRecord, TicketRecord } from '../../types/dashboard'
import { Badge } from '../ui/badge'

type DeviceOrTicket = DeviceRecord | TicketRecord

type Props = {
  title: string
  items: DeviceOrTicket[]
  mode: 'devices' | 'tickets'
}

export function DataTable({ title, items, mode }: Props) {
  const columns = useMemo<ColumnDef<DeviceOrTicket>[]>(() => {
    if (mode === 'devices') {
      return [
        { accessorKey: 'assetCode', header: 'Asset' },
        { accessorKey: 'name', header: 'Thiết bị' },
        { accessorKey: 'category', header: 'Loại' },
        { accessorKey: 'room', header: 'Phòng' },
        {
          accessorKey: 'status',
          header: 'Trạng thái',
          cell: ({ row }) => <Badge className="border-slate-700 bg-slate-800 text-slate-100">{String(row.original.status)}</Badge>
        },
        { accessorKey: 'updatedAt', header: 'Cập nhật' }
      ]
    }

    return [
      { accessorKey: 'id', header: 'Mã' },
      { accessorKey: 'subject', header: 'Ticket' },
      { accessorKey: 'room', header: 'Phòng' },
      { accessorKey: 'requester', header: 'Người báo' },
      {
        accessorKey: 'status',
        header: 'Trạng thái',
        cell: ({ row }) => <Badge className="border-blue-500/20 bg-blue-500/10 text-blue-100">{String(row.original.status)}</Badge>
      },
      { accessorKey: 'updatedAt', header: 'Cập nhật' }
    ]
  }, [mode])

  const table = useReactTable({
    data: items,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-[16px] border border-slate-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900/80 text-slate-400">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="px-4 py-3 font-medium">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-8 text-center text-sm text-slate-500">Chưa có dữ liệu</td>
                </tr>
              ) : (
              table.getRowModel().rows.map(row => (
                <tr key={row.id} className="border-t border-slate-800/80 hover:bg-slate-900/60">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-4 py-3 text-slate-200">
                      {cell.column.columnDef.cell
                        ? flexRender(cell.column.columnDef.cell, cell.getContext())
                        : String(cell.getValue())}
                    </td>
                  ))}
                </tr>
              ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
