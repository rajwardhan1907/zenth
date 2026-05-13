'use client'
import { useState } from 'react'
import { mockContentItems } from '@/mock/content.mock'
import { ContentItem } from '@/types/content'

export function useApprovals() {
  const [items, setItems] = useState<ContentItem[]>(
    mockContentItems.filter((c) => c.status === 'pending_approval')
  )

  const approve = (id: string) => {
    console.log('[useApprovals] approve', id)
    setItems((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'approved' as const } : c))
    )
  }

  const skip = (id: string) => {
    console.log('[useApprovals] skip', id)
    setItems((prev) => prev.filter((c) => c.id !== id))
  }

  return { items, approve, skip, pendingCount: items.filter(c => c.status === 'pending_approval').length }
}
