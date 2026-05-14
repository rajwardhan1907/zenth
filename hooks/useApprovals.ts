'use client'
import { useState } from 'react'
import { toast } from 'sonner'
import { mockContentItems } from '@/mock/content.mock'
import { ContentItem } from '@/types/content'

export type DraftWithContent = ContentItem & { content: string }

function synthesizeContent(item: ContentItem): string {
  return item.outline
    .map(s => `## ${s.heading}\n${s.points.map(p => `- ${p}`).join('\n')}`)
    .join('\n\n')
}

function seed(): DraftWithContent[] {
  return mockContentItems.map(item => ({ ...item, content: synthesizeContent(item) }))
}

export function useApprovals() {
  const [drafts, setDrafts] = useState<DraftWithContent[]>(seed)
  const [editingId, setEditingId] = useState<string | null>(null)

  const pendingDrafts = drafts.filter(d => d.status === 'pending_approval')
  const totalPending = pendingDrafts.length

  const approveDraft = (id: string) => {
    setDrafts(prev => prev.map(d => d.id === id ? { ...d, status: 'approved' as const } : d))
    toast.success('Article approved and queued for publishing')
  }

  const skipDraft = (id: string) => {
    setDrafts(prev => prev.map(d => d.id === id ? { ...d, status: 'skipped' as const } : d))
    toast('Draft skipped — you can find it in archived drafts')
  }

  const editDraft = (id: string, newContent: string) => {
    setDrafts(prev => prev.map(d => d.id === id ? { ...d, content: newContent } : d))
    toast.success('Changes saved')
  }

  return { pendingDrafts, editingId, setEditingId, approveDraft, skipDraft, editDraft, totalPending }
}
