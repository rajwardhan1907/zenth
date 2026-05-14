'use client'
import { useState, useMemo } from 'react'
import { mockKeywords } from '@/mock/keywords.mock'
import type { KeywordIntent } from '@/types/keyword'

export function useKeywords() {
  const [searchQuery, setSearchQuery] = useState('')
  const [intentFilter, setIntentFilter] = useState<KeywordIntent | 'all'>('all')
  const [difficultyRange, setDifficultyRange] = useState<[number, number]>([0, 100])

  const filteredKeywords = useMemo(() => {
    return mockKeywords.filter((k) => {
      const matchSearch = k.keyword.toLowerCase().includes(searchQuery.toLowerCase())
      const matchIntent = intentFilter === 'all' || k.intent === intentFilter
      const matchDifficulty = k.difficulty >= difficultyRange[0] && k.difficulty <= difficultyRange[1]
      return matchSearch && matchIntent && matchDifficulty
    })
  }, [searchQuery, intentFilter, difficultyRange])

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
    totalCount: mockKeywords.length,
    filteredCount: filteredKeywords.length,
  }
}
