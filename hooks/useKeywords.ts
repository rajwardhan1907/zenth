'use client'
import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { Keyword, KeywordIntent } from '@/types/keyword'

function getDomainFromStorage(): string | null {
  try {
    const raw = localStorage.getItem('zenth_onboarding')
    if (!raw) return null
    const data = JSON.parse(raw) as Record<string, unknown>
    const url = typeof data?.siteUrl === 'string' ? data.siteUrl : ''
    if (!url) return null
    return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
  } catch {
    return null
  }
}

async function fetchDomainKeywords(domain: string): Promise<Keyword[]> {
  const res = await fetch(`/api/keywords/domain?domain=${encodeURIComponent(domain)}`)
  if (!res.ok) throw new Error(`Failed to fetch keywords: ${res.status}`)
  const json = await res.json() as { keywords: Keyword[] }
  return json.keywords
}

export function useKeywords() {
  const [searchQuery, setSearchQuery] = useState('')
  const [intentFilter, setIntentFilter] = useState<KeywordIntent | 'all'>('all')
  const [difficultyRange, setDifficultyRange] = useState<[number, number]>([0, 100])

  const [domain] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null
    return getDomainFromStorage()
  })

  const { data: keywords = [], isLoading, isError } = useQuery({
    queryKey: ['keywords', 'domain', domain],
    queryFn: () => fetchDomainKeywords(domain!),
    enabled: !!domain,
    staleTime: 24 * 60 * 60 * 1000,
  })

  const filteredKeywords = useMemo(() => {
    return keywords.filter((k) => {
      const matchSearch = k.keyword.toLowerCase().includes(searchQuery.toLowerCase())
      const matchIntent = intentFilter === 'all' || k.intent === intentFilter
      const matchDifficulty = k.difficulty >= difficultyRange[0] && k.difficulty <= difficultyRange[1]
      return matchSearch && matchIntent && matchDifficulty
    })
  }, [keywords, searchQuery, intentFilter, difficultyRange])

  const clearFilters = () => {
    setSearchQuery('')
    setIntentFilter('all')
    setDifficultyRange([0, 100])
  }

  return {
    filteredKeywords,
    searchQuery, setSearchQuery,
    intentFilter, setIntentFilter,
    difficultyRange, setDifficultyRange,
    clearFilters,
    totalCount: keywords.length,
    filteredCount: filteredKeywords.length,
    isLoading,
    isError,
    domain,
  }
}
