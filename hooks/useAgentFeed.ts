'use client'
import { mockAgentFeed } from '@/mock/dashboard.mock'

export function useAgentFeed() {
  return {
    events: mockAgentFeed,
    isLoading: false,
  }
}
