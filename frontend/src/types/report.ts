import type { KpiDto, PointDto } from './common'

export interface ReportSummaryResponse {
  overview: KpiDto[]
  deviceByCategory: PointDto[]
  deviceByStatus: PointDto[]
  ticketByMonth: PointDto[]
  maintenanceCostByMonth: PointDto[]
  ticketByPriority: PointDto[]
  roomWorkload: PointDto[]
}
