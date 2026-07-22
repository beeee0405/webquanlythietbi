import { http } from './http'
import type { NetworkManagementResponse } from '../types/network'

export async function getNetworkData(): Promise<NetworkManagementResponse> {
  const response = await http.get('/network')
  return response.data
}
