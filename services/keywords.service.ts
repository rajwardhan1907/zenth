import { Keyword } from '@/types/keyword'
import { mockKeywords } from '@/mock/keywords.mock'

// Stub — swap return value here when real API is ready
export const keywordsService = {
  async getAll(): Promise<Keyword[]> {
    await new Promise((r) => setTimeout(r, 400))
    return mockKeywords
  },

  async search(query: string): Promise<Keyword[]> {
    await new Promise((r) => setTimeout(r, 200))
    return mockKeywords.filter((k) =>
      k.keyword.toLowerCase().includes(query.toLowerCase())
    )
  },
}
