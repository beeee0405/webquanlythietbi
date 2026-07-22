import { http } from './http'
import type { DeviceManagementResponse, DeviceDto } from '../types/device'

export async function getDeviceData(): Promise<DeviceManagementResponse> {
  const response = await http.get('/device-management')
  return response.data
}

export async function createDevice(device: Partial<DeviceDto>): Promise<DeviceDto> {
  const response = await http.post('/devices', device)
  return response.data
}

export async function updateDevice(id: string, device: Partial<DeviceDto>): Promise<void> {
  await http.put(`/devices/${id}`, device)
}

export async function deleteDevice(id: string): Promise<void> {
  await http.delete(`/devices/${id}`)
}