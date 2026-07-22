import { http } from './http'
import type { CameraManagementResponse } from '../types/camera'

export async function getCameraData(): Promise<CameraManagementResponse> {
  const response = await http.get('/cameras')
  return response.data
}

export async function createCamera(camera: any): Promise<any> {
  const response = await http.post('/cameras', camera)
  return response.data
}

export async function updateCamera(id: string, camera: any): Promise<void> {
  await http.put(`/cameras/${id}`, camera)
}

export async function deleteCamera(id: string): Promise<void> {
  await http.delete(`/cameras/${id}`)
}
