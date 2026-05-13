export type ContentStatus = 'draft' | 'pending_approval' | 'approved' | 'published' | 'skipped'

export type SeoSignal = {
  label: string
  score: number
  status: 'good' | 'warning' | 'error'
}

export type OutlineSection = {
  heading: string
  points: string[]
}

export type ContentItem = {
  id: string
  title: string
  keyword: string
  wordCount: number
  status: ContentStatus
  createdAt: string
  seoSignals: SeoSignal[]
  outline: OutlineSection[]
  trafficForecast: {
    month1: number
    month3: number
    month6: number
  }
  publishSettings: {
    category: string
    tags: string[]
    scheduledFor?: string
  }
}
