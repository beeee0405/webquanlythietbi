import { http } from './http'
import type { LiquidationManagementResponse } from '../types/liquidation'

export async function getLiquidationData(): Promise<LiquidationManagementResponse> {
  const response = await http.get('/liquidation')
  return response.data
}
