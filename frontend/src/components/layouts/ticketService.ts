import { http } from '@/services/http'
import type { TicketManagementResponse } from '@/types/ticket'

export async function getTicketData(): Promise<TicketManagementResponse> {
    // Ở giai đoạn sau, chúng ta sẽ thay thế bằng lời gọi API thực tế
    // const response = await api.get('/ticket-management')
    // return response.data
    const response = await http.get('/ticket-management')
    return response.data
}