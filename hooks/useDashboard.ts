'use client'
import { mockMetrics, mockTrafficData, mockAgentFeed, mockKeywordOpportunities } from '@/mock/dashboard.mock'

function resolveUserName(): string {
  try {
    const raw = localStorage.getItem('zenth_onboarding')
    if (!raw) return 'there'
    const data = JSON.parse(raw)
    return (typeof data?.firstName === 'string' && data.firstName.trim()) ? data.firstName.trim() : 'there'
  } catch {
    return 'there'
  }
}

function getTimeBasedGreeting(): string {
  const h = new Date().getHours()
  if (h >= 5 && h < 12) return 'Good morning'
  if (h >= 12 && h < 17) return 'Good afternoon'
  return 'Good evening'
}

export function useDashboard() {
  // Swap these return values for real React Query calls when API is ready
  return {
    metrics: mockMetrics,
    trafficData: mockTrafficData,
    agentFeed: mockAgentFeed,
    keywordOpportunities: mockKeywordOpportunities,
    isLoading: false,
    userName: resolveUserName(),
    timeBasedGreeting: getTimeBasedGreeting(),
  }
}
