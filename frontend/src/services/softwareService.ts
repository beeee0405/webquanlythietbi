import { http } from './http'
import type { SoftwareManagementResponse } from '../types/software'

export async function getSoftwareData(): Promise<SoftwareManagementResponse> {
  const response = await http.get('/software')
  return response.data
}
