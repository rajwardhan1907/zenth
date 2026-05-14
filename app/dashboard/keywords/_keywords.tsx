'use client'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useKeywords } from '@/hooks/useKeywords'
import { copy } from '@/config/copy'
import { formatNumber } from '@/utils/formatNumber'
import { Search, X, FilterX } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utils/cn'
import type { KeywordIntent, KeywordStatus, Keyword } from '@/types/keyword'

// Mini sparkline using SVG
function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const w = 56, h = 22
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / range) * h
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline points={pts} fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
    </svg>
  )
}

function DifficultyPill({ value }: { value: number }) {
  const config = value <= 33
    ? { bg: 'rgba(34,197,94,0.1)', color: '#16a34a', label: 'Easy' }
    : value <= 66
    ? { bg: 'rgba(245,158,11,0.1)', color: '#d97706', label: 'Medium' }
    : { bg: 'rgba(239,68,68,0.1)', color: '#dc2626', label: 'Hard' }
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-sm font-semibold tabular-nums" style={{ color: config.color }}>{value}</span>
      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full whitespace-nowrap" style={{ background: config.bg, color: config.color }}>
        {config.label}
      </span>
    </div>
  )
}

const intentColors: Record<KeywordIntent, { bg: string; color: string }> = {
  informational: { bg: '#EDE9FE', color: '#5B21B6' },
  commercial:    { bg: '#E0F2FE', color: '#0369A1' },
  transactional: { bg: '#DCFCE7', color: '#166534' },
  navigational:  { bg: '#FEF3C7', color: '#92400E' },
}

const statusColors: Record<KeywordStatus, { bg: string; color: string }> = {
  opportunity: { bg: '#DCFCE7', color: '#166534' },
  ranking:     { bg: '#EDE9FE', color: '#5B21B6' },
  tracked:     { bg: '#E0F2FE', color: '#0369A1' },
  declined:    { bg: '#FEF3C7', color: '#92400E' },
}

const intents: Array<KeywordIntent | 'all'> = ['all', 'informational', 'commercial', 'transactional', 'navigational']

export default function KeywordsPage() {
  const {
    filteredKeywords,
    searchQuery, setSearchQuery,
    intentFilter, setIntentFilter,
    difficultyRange, setDifficultyRange,
    clearFilters,
    totalCount, filteredCount,
  } = useKeywords()

  return (
    <PageWrapper
      title={copy.keywords.pageTitle}
      subtitle={copy.keywords.pageSubtitle}
    >
      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3">

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none" />
          <input
            type="text"
            placeholder="Search keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-8 py-2 text-sm rounded-xl border border-white/80 bg-white/60 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-border)] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Intent filter pills */}
        <div className="flex items-center gap-1 flex-wrap">
          {intents.map((intent) => (
            <button
              key={intent}
              onClick={() => setIntentFilter(intent)}
              className="px-3 py-1.5 text-xs rounded-full capitalize transition-all duration-150 font-medium"
              style={intentFilter === intent
                ? { background: 'var(--accent)', color: 'white', border: '0.5px solid var(--accent)' }
                : { background: 'transparent', color: 'var(--text-secondary)', border: '0.5px solid rgba(255,255,255,0.7)' }
              }
            >
              {intent === 'all' ? 'All' : intent.charAt(0).toUpperCase() + intent.slice(1)}
            </button>
          ))}
        </div>

        {/* Difficulty range slider */}
        <div className="flex items-center gap-2">
          <span className="text-xs whitespace-nowrap" style={{ color: 'var(--text-secondary)' }}>
            Difficulty: {difficultyRange[0]} — {difficultyRange[1]}
          </span>
          <div className="flex items-center gap-1.5">
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={difficultyRange[0]}
              onChange={(e) => {
                const val = Math.min(Number(e.target.value), difficultyRange[1] - 1)
                setDifficultyRange([val, difficultyRange[1]])
              }}
              style={{ width: '80px', accentColor: 'var(--accent)' }}
            />
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={difficultyRange[1]}
              onChange={(e) => {
                const val = Math.max(Number(e.target.value), difficultyRange[0] + 1)
                setDifficultyRange([difficultyRange[0], val])
              }}
              style={{ width: '80px', accentColor: 'var(--accent)' }}
            />
          </div>
        </div>

        {/* Result count */}
        <span className="sm:ml-auto text-xs whitespace-nowrap" style={{ color: 'var(--text-secondary)' }}>
          Showing {filteredCount} of {totalCount} keywords
        </span>
      </div>

      {/* Table — horizontally scrollable on mobile */}
      <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
      <div className="glass rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.05)] min-w-[600px]">
        {/* Header */}
        <div className="grid grid-cols-[2fr_90px_140px_130px_110px_60px] gap-4 px-4 py-3 text-[10px] uppercase tracking-widest font-semibold text-[var(--text-tertiary)] border-b border-white/60">
          <span>{copy.keywords.columns.keyword}</span>
          <span className="text-right">{copy.keywords.columns.volume}</span>
          <span>{copy.keywords.columns.difficulty}</span>
          <span>{copy.keywords.columns.intent}</span>
          <span>Status</span>
          <span>{copy.keywords.columns.trend}</span>
        </div>

        {filteredKeywords.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <FilterX size={28} style={{ color: 'var(--text-secondary)' }} className="mb-3" />
            <p className="font-medium mb-1" style={{ fontSize: '15px', color: 'var(--text-primary)' }}>
              No keywords match your filters
            </p>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Try adjusting the search or difficulty range
            </p>
            <button
              onClick={clearFilters}
              className="mt-3 text-[var(--accent)] hover:underline transition-all"
              style={{ fontSize: '13px' }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {filteredKeywords.map((kw, i) => (
              <KeywordRow key={kw.id} kw={kw} i={i} intentColors={intentColors} statusColors={statusColors} isLast={i === filteredKeywords.length - 1} />
            ))}
          </AnimatePresence>
        )}
      </div>
      </div>
    </PageWrapper>
  )
}

function KeywordRow({
  kw, i, intentColors, statusColors, isLast,
}: {
  kw: Keyword
  i: number
  intentColors: Record<KeywordIntent, { bg: string; color: string }>
  statusColors: Record<KeywordStatus, { bg: string; color: string }>
  isLast: boolean
}) {
  const ic = intentColors[kw.intent]
  const sc = statusColors[kw.status]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: i * 0.02 }}
      whileHover={{ backgroundColor: 'rgba(255,255,255,0.55)' }}
      className={cn(
        'grid grid-cols-[2fr_90px_140px_130px_110px_60px] gap-4 items-center px-4 py-3 transition-colors duration-150 cursor-default',
        !isLast && 'border-b border-white/40'
      )}
    >
      <div>
        <p className="text-sm font-medium text-[var(--text-primary)] leading-snug">{kw.keyword}</p>
        {kw.currentRank && (
          <p className="text-xs text-emerald-600 mt-0.5">Rank #{kw.currentRank}</p>
        )}
      </div>
      <p className="text-sm text-right text-[var(--text-secondary)] font-medium tabular-nums">
        {formatNumber(kw.volume)}
      </p>
      <DifficultyPill value={kw.difficulty} />
      <span
        className="text-[11px] font-medium px-2 py-0.5 rounded-full capitalize w-fit"
        style={{ background: ic.bg, color: ic.color }}
      >
        {kw.intent}
      </span>
      <span
        className="text-[11px] font-medium px-2 py-0.5 rounded-full capitalize w-fit"
        style={{ background: sc.bg, color: sc.color }}
      >
        {kw.status}
      </span>
      <Sparkline data={kw.trend} />
    </motion.div>
  )
}
