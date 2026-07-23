import { http } from './http'
import type { TicketItem } from '../types/ticket'
import type { KpiDto, PointDto } from '../types/common'

export interface TicketApiData {
  overview: KpiDto[]
  statusData: PointDto[]
  priorityData: PointDto[]
  channelData: PointDto[]
  slaTrendData: PointDto[]
  ageBuckets: PointDto[]
  items: TicketItem[]
  statuses: string[]
  priorities: string[]
  channels: string[]
}

export async function getTicketData(): Promise<TicketApiData> {
  const response = await http.get<TicketApiData>('/tickets')
  return response.data
}

export async function createTicket(item: Partial<TicketItem>): Promise<TicketItem> {
  const response = await http.post('/tickets', item)
  return response.data
}

export async function updateTicket(id: string, item: Partial<TicketItem>): Promise<void> {
  await http.put(`/tickets/${id}`, item)
}

export async function deleteTicket(id: string): Promise<void> {
  await http.delete(`/tickets/${id}`)
}
