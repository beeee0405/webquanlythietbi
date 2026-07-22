import { http } from './http'
import type { NetworkManagementResponse } from '../types/network'

export async function getNetworkData(): Promise<NetworkManagementResponse> {
  const response = await http.get('/network')
  return response.data
}

export async function createNetworkDevice(device: any): Promise<any> {
  const response = await http.post('/network', device)
  return response.data
}

export async function updateNetworkDevice(id: string, device: any): Promise<void> {
  await http.put(`/network/${id}`, device)
}

export async function deleteNetworkDevice(id: string): Promise<void> {
  await http.delete(`/network/${id}`)
}
