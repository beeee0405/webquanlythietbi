import { http } from './http'
import type { RoomManagementResponse } from '../types/room'

export async function getRoomData(): Promise<RoomManagementResponse> {
  const response = await http.get('/rooms')
  return response.data
}

export async function createRoom(room: any): Promise<any> {
  const response = await http.post('/rooms', room)
  return response.data
}

export async function updateRoom(id: string, room: any): Promise<void> {
  await http.put(`/rooms/${id}`, room)
}

export async function deleteRoom(id: string): Promise<void> {
  await http.delete(`/rooms/${id}`)
}
