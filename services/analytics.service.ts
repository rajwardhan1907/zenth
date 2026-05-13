import { mockTrafficData } from '@/mock/dashboard.mock'

export const analyticsService = {
  async getTrafficData() {
    await new Promise((r) => setTimeout(r, 400))
    return mockTrafficData
  },
}
