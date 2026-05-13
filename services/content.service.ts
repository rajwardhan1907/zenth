import { ContentItem } from '@/types/content'
import { mockContentItems } from '@/mock/content.mock'

export const contentService = {
  async getPendingApprovals(): Promise<ContentItem[]> {
    await new Promise((r) => setTimeout(r, 400))
    return mockContentItems.filter((c) => c.status === 'pending_approval')
  },

  async approve(id: string): Promise<void> {
    await new Promise((r) => setTimeout(r, 300))
    console.log('[contentService] approve', id)
  },

  async skip(id: string): Promise<void> {
    await new Promise((r) => setTimeout(r, 200))
    console.log('[contentService] skip', id)
  },
}
