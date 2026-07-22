import { http } from './http'
import type { RoomManagementResponse } from '../types/room'

export async function getRoomData(): Promise<RoomManagementResponse> {
  const response = await http.get('/rooms')
  return response.data
}
