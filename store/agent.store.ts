import { create } from 'zustand'
import { AgentStatus } from '@/types/agent'

type AgentStore = {
  status: AgentStatus
  setStatus: (status: AgentStatus) => void
  articlesQueued: number
  setArticlesQueued: (n: number) => void
}

export const useAgentStore = create<AgentStore>((set) => ({
  status: 'running',
  setStatus: (status) => set({ status }),
  articlesQueued: 3,
  setArticlesQueued: (n) => set({ articlesQueued: n }),
}))
