import { http } from './http'
import type { LiquidationManagementResponse } from '../types/liquidation'

export async function getLiquidationData(): Promise<LiquidationManagementResponse> {
  const response = await http.get('/liquidation')
  return response.data
}

export async function createLiquidation(liquidation: any): Promise<any> {
  const response = await http.post('/liquidation', liquidation)
  return response.data
}

export async function updateLiquidation(id: string, liquidation: any): Promise<void> {
  await http.put(`/liquidation/${id}`, liquidation)
}

export async function deleteLiquidation(id: string): Promise<void> {
  await http.delete(`/liquidation/${id}`)
}
