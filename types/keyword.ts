export type KeywordIntent = 'informational' | 'commercial' | 'transactional' | 'navigational'
export type KeywordStatus = 'tracked' | 'opportunity' | 'ranking' | 'declined'

export type Keyword = {
  id: string
  keyword: string
  volume: number
  difficulty: number
  intent: KeywordIntent
  status: KeywordStatus
  trend: number[]
  currentRank?: number
  clusterId?: string
  clusterName?: string
}
