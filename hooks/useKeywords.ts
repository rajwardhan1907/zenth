'use client'
import { useState, useMemo } from 'react'
import { mockKeywords } from '@/mock/keywords.mock'
import { KeywordIntent, KeywordStatus } from '@/types/keyword'

export function useKeywords() {
  const [search, setSearch] = useState('')
  const [filterIntent, setFilterIntent] = useState<KeywordIntent | 'all'>('all')
  const [filterStatus, setFilterStatus] = useState<KeywordStatus | 'all'>('all')
  const [clusterView, setClusterView] = useState(false)

  const filtered = useMemo(() => {
    return mockKeywords.filter((k) => {
      const matchSearch = k.keyword.toLowerCase().includes(search.toLowerCase())
      const matchIntent = filterIntent === 'all' || k.intent === filterIntent
      const matchStatus = filterStatus === 'all' || k.status === filterStatus
      return matchSearch && matchIntent && matchStatus
    })
  }, [search, filterIntent, filterStatus])

  return {
    keywords: filtered,
    search, setSearch,
    filterIntent, setFilterIntent,
    filterStatus, setFilterStatus,
    clusterView, setClusterView,
    isLoading: false,
  }
}
