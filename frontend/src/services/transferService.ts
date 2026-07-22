import { http } from './http'
import type { TransferManagementResponse } from '../types/transfer'

export async function getTransferData(): Promise<TransferManagementResponse> {
  const response = await http.get('/transfer')
  return response.data
}
