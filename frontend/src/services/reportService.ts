import { http } from './http'
import type { ReportSummaryResponse } from '../types/report'

export async function getReportData(): Promise<ReportSummaryResponse> {
  const response = await http.get('/reports')
  return response.data
}
