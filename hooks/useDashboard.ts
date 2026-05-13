'use client'
import { mockMetrics, mockTrafficData, mockAgentFeed, mockKeywordOpportunities } from '@/mock/dashboard.mock'

export function useDashboard() {
  // Swap these return values for real React Query calls when API is ready
  return {
    metrics: mockMetrics,
    trafficData: mockTrafficData,
    agentFeed: mockAgentFeed,
    keywordOpportunities: mockKeywordOpportunities,
    isLoading: false,
  }
}
