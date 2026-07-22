import { http } from './http'
import type { CameraManagementResponse } from '../types/camera'

export async function getCameraData(): Promise<CameraManagementResponse> {
  const response = await http.get('/cameras')
  return response.data
}
