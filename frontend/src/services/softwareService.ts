import { http } from './http'
import type { SoftwareManagementResponse } from '../types/software'

export async function getSoftwareData(): Promise<SoftwareManagementResponse> {
  const response = await http.get('/software')
  return response.data
}

export async function createSoftware(software: any): Promise<any> {
  const response = await http.post('/software', software)
  return response.data
}

export async function updateSoftware(id: string, software: any): Promise<void> {
  await http.put(`/software/${id}`, software)
}

export async function deleteSoftware(id: string): Promise<void> {
  await http.delete(`/software/${id}`)
}
