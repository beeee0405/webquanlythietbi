import { http } from './http'
import type { TransferManagementResponse } from '../types/transfer'

export async function getTransferData(): Promise<TransferManagementResponse> {
  const response = await http.get('/transfer')
  return response.data
}

export async function createTransfer(transfer: any): Promise<any> {
  const response = await http.post('/transfer', transfer)
  return response.data
}

export async function updateTransfer(id: string, transfer: any): Promise<void> {
  await http.put(`/transfer/${id}`, transfer)
}

export async function deleteTransfer(id: string): Promise<void> {
  await http.delete(`/transfer/${id}`)
}
