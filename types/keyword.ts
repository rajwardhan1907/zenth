export type KeywordIntent = 'informational' | 'commercial' | 'transactional' | 'navigational'
export type KeywordStatus = 'tracked' | 'opportunity' | 'ranking' | 'declined'

// Existing dashboard keyword shape — keep for UI components
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

// Pipeline types — server-side only
export type EnrichedKeyword = {
  keyword: string
  searchVolume: number
  difficulty: number        // 0–100
  cpc: number
  competition: number       // 0–1
  intent: KeywordIntent
  monthlyTrend: number[]    // last 12 months search volumes
  opportunityScore: number  // volume × (1 - difficulty/100)
}

export type KeywordCluster = {
  id: string                // slugified cluster name
  name: string              // human readable cluster label
  intent: KeywordIntent
  primaryKeyword: EnrichedKeyword
  supportingKeywords: EnrichedKeyword[]
  totalVolume: number       // sum of all keyword volumes in cluster
  avgDifficulty: number     // mean difficulty across cluster
  opportunityScore: number  // sum of individual opportunity scores
  contentAngle: string      // one-line content angle from Claude
  suggestedTitle: string    // H1 suggestion from Claude
  rank: number              // final rank position in returned list
}

export type PipelineOptions = {
  locationCode?: number     // default 2356 (India)
  languageCode?: string     // default 'en'
  maxExpansions?: number    // related keywords per seed, default 100
  minVolume?: number        // filter threshold, default 50
  maxDifficulty?: number    // filter threshold, default 80
  maxClusters?: number      // cap returned clusters, default 20
}

export type PipelineResult = {
  clusters: KeywordCluster[]
  totalKeywordsProcessed: number
  totalClustersFound: number
  processingTimeMs: number
  seeds: string[]
}
