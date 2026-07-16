import { http } from './http'
import {
  ticketAgeBuckets,
  ticketChannelData,
  ticketChannels,
  ticketOverview,
  ticketPriorityData,
  ticketPriorities,
  ticketQueue,
  ticketSlaTrendData,
  ticketStatusData,
  ticketStatuses
} from '../data/tickets'

export type TicketApiData = {
  overview: typeof ticketOverview
  statusData: typeof ticketStatusData
  priorityData: typeof ticketPriorityData
  channelData: typeof ticketChannelData
  slaTrendData: typeof ticketSlaTrendData
  ageBuckets: typeof ticketAgeBuckets
  tickets: typeof ticketQueue
  statuses: string[]
  priorities: string[]
  channels: string[]
}

const fallback: TicketApiData = {
  overview: ticketOverview,
  statusData: ticketStatusData,
  priorityData: ticketPriorityData,
  channelData: ticketChannelData,
  slaTrendData: ticketSlaTrendData,
  ageBuckets: ticketAgeBuckets,
  tickets: ticketQueue,
  statuses: ticketStatuses,
  priorities: ticketPriorities,
  channels: ticketChannels
}

export async function getTicketData(): Promise<TicketApiData> {
  try {
    const response = await http.get<TicketApiData>('/tickets')
    return response.data
  } catch {
    return fallback
  }
}
