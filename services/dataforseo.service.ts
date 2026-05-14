import 'server-only'
import type {
  DFSResponse,
  DFSTask,
  KeywordData,
  RelatedKeyword,
  RelatedKeywordItem,
  CompetitorKeywordItem,
} from '@/types/dataforseo'

class DataForSEOClient {
  private readonly baseUrl = 'https://api.dataforseo.com/v3'
  private readonly auth: string
  private requestCount = 0
  private windowStart = Date.now()
  private readonly MAX_RPS = 10

  constructor() {
    const login = process.env.DATAFORSEO_LOGIN
    const password = process.env.DATAFORSEO_PASSWORD
    if (!login || !password) {
      throw new Error('DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD must be set')
    }
    this.auth = Buffer.from(`${login}:${password}`).toString('base64')
  }

  private async rateLimit(): Promise<void> {
    const now = Date.now()
    if (now - this.windowStart > 1000) {
      this.windowStart = now
      this.requestCount = 0
    }
    if (this.requestCount >= this.MAX_RPS) {
      const wait = 1000 - (now - this.windowStart) + 10
      await new Promise(r => setTimeout(r, wait))
      this.windowStart = Date.now()
      this.requestCount = 0
    }
    this.requestCount++
  }

  private async request<T>(
    endpoint: string,
    body: unknown,
    retries = 3
  ): Promise<DFSTask<T>[]> {
    await this.rateLimit()

    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${this.auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      next: { revalidate: 0 },
    })

    if (!res.ok) {
      if (res.status === 429 && retries > 0) {
        await new Promise(r => setTimeout(r, 2000))
        return this.request<T>(endpoint, body, retries - 1)
      }
      throw new Error(
        `DataForSEO HTTP ${res.status}: ${res.statusText} on ${endpoint}`
      )
    }

    const json: DFSResponse<T> = await res.json()

    if (json.status_code !== 20000) {
      throw new Error(
        `DataForSEO API error ${json.status_code}: ${json.status_message} on ${endpoint}`
      )
    }

    if (json.tasks_error > 0) {
      const failed = json.tasks.filter(t => t.status_code !== 20000)
      const msgs = failed.map(t => `[${t.status_code}] ${t.status_message}`).join(', ')
      console.warn(`DataForSEO task errors on ${endpoint}: ${msgs}`)
    }

    return json.tasks
  }

  async getKeywordData(
    keywords: string[],
    locationCode = 2356,
    languageCode = 'en'
  ): Promise<KeywordData[]> {
    const chunks = chunkArray(keywords, 1000)
    const results: KeywordData[] = []

    for (const chunk of chunks) {
      const tasks = await this.request<KeywordData>(
        '/keywords_data/google_ads/search_volume/live',
        [{ keywords: chunk, location_code: locationCode, language_code: languageCode }]
      )
      for (const task of tasks) {
        if (task.result) results.push(...task.result)
      }
    }

    return results
  }

  async getRelatedKeywords(
    seed: string,
    locationCode = 2356,
    languageCode = 'en',
    limit = 100
  ): Promise<RelatedKeywordItem[]> {
    const tasks = await this.request<RelatedKeyword>(
      '/keywords_data/google_ads/keywords_for_keywords/live',
      [{
        keywords: [seed],
        location_code: locationCode,
        language_code: languageCode,
        limit,
      }]
    )

    const items: RelatedKeywordItem[] = []
    for (const task of tasks) {
      if (task.result) {
        for (const result of task.result) {
          if (result.items) items.push(...result.items)
        }
      }
    }

    return items
  }

  async getCompetitorKeywords(
    domain: string,
    locationCode = 2356,
    languageCode = 'en',
    limit = 200
  ): Promise<CompetitorKeywordItem[]> {
    const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '')

    const tasks = await this.request<CompetitorKeywordItem>(
      '/dataforseo_labs/google/ranked_keywords/live',
      [{
        target: cleanDomain,
        location_code: locationCode,
        language_code: languageCode,
        limit,
        filters: [['keyword_data.keyword_info.search_volume', '>', 10]],
        order_by: ['keyword_data.keyword_info.search_volume,desc'],
      }]
    )

    const results: CompetitorKeywordItem[] = []
    for (const task of tasks) {
      if (task.result) results.push(...task.result)
    }

    return results
  }
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }
  return chunks
}

let _client: DataForSEOClient | null = null

export function getDataForSEOClient(): DataForSEOClient {
  if (!_client) _client = new DataForSEOClient()
  return _client
}

export const dataForSEO = {
  getKeywordData: (...args: Parameters<DataForSEOClient['getKeywordData']>) =>
    getDataForSEOClient().getKeywordData(...args),
  getRelatedKeywords: (...args: Parameters<DataForSEOClient['getRelatedKeywords']>) =>
    getDataForSEOClient().getRelatedKeywords(...args),
  getCompetitorKeywords: (...args: Parameters<DataForSEOClient['getCompetitorKeywords']>) =>
    getDataForSEOClient().getCompetitorKeywords(...args),
}
