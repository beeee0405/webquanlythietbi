import { http } from './http'
import type { DeviceManagementResponse } from '../types/device'

export async function getDeviceData(): Promise<DeviceManagementResponse> {
  const response = await http.get('/device-management')
  return response.data
}