export type AgentEventType = 'research' | 'write' | 'optimize' | 'publish' | 'audit' | 'keyword'

export type AgentEvent = {
  id: string
  type: AgentEventType
  title: string
  description: string
  timestamp: string
  status: 'completed' | 'running' | 'queued'
  metadata?: Record<string, string | number>
}

export type AgentStatus = 'idle' | 'running' | 'paused' | 'error'
