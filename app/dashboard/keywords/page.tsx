'use client'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useKeywords } from '@/hooks/useKeywords'
import { copy } from '@/config/copy'
import { formatNumber } from '@/utils/formatNumber'
import { Search, Layers } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import type { KeywordIntent, KeywordStatus } from '@/types/keyword'

// Mini sparkline using SVG
function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const w = 60, h = 24
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

const intentVariant: Record<KeywordIntent, 'info' | 'accent' | 'success' | 'warning'> = {
  informational: 'info',
  commercial: 'accent',
  transactional: 'success',
  navigational: 'warning',
}

const statusVariant: Record<KeywordStatus, 'success' | 'accent' | 'default' | 'error'> = {
  ranking: 'success',
  opportunity: 'accent',
  tracked: 'default',
  declined: 'error',
}

const intents: Array<KeywordIntent | 'all'> = ['all', 'informational', 'commercial', 'transactional', 'navigational']
const statuses: Array<KeywordStatus | 'all'> = ['all', 'opportunity', 'ranking', 'tracked', 'declined']

export default function KeywordsPage() {
  const {
    keywords, search, setSearch,
    filterIntent, setFilterIntent,
    filterStatus, setFilterStatus,
    clusterView, setClusterView,
  } = useKeywords()

  // Group by cluster if cluster view is on
  const grouped = clusterView
    ? keywords.reduce<Record<string, typeof keywords>>((acc, kw) => {
        const key = kw.clusterName ?? 'Ungrouped'
        ;(acc[key] = acc[key] ?? []).push(kw)
        return acc
      }, {})
    : null

  return (
    <PageWrapper
      title={copy.keywords.pageTitle}
      subtitle={copy.keywords.pageSubtitle}
    >
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="w-72">
          <Input
            placeholder={copy.keywords.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search size={14} />}
          />
        </div>

        {/* Intent filter */}
        <div className="flex items-center gap-1 bg-white/60 rounded-xl p-1 border border-white/80">
          {intents.map((i) => (
            <button key={i}
              onClick={() => setFilterIntent(i)}
              className={cn('px-2.5 py-1 text-xs rounded-lg capitalize transition-all duration-150',
                filterIntent === i ? 'bg-white shadow-sm text-[var(--text-primary)] font-semibold' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              )}
            >{i === 'all' ? 'All intent' : i}</button>
          ))}
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-1 bg-white/60 rounded-xl p-1 border border-white/80">
          {statuses.map((s) => (
            <button key={s}
              onClick={() => setFilterStatus(s)}
              className={cn('px-2.5 py-1 text-xs rounded-lg capitalize transition-all duration-150',
                filterStatus === s ? 'bg-white shadow-sm text-[var(--text-primary)] font-semibold' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              )}
            >{s === 'all' ? 'All status' : s}</button>
          ))}
        </div>

        <Button
          variant={clusterView ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setClusterView(!clusterView)}
        >
          <Layers size={13} />
          {copy.keywords.clusterToggle}
        </Button>
      </div>

      {/* Table */}
      <div className="glass rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
        {/* Header */}
        <div className="grid grid-cols-[2fr_80px_80px_120px_100px_80px] gap-4 px-4 py-3 text-[10px] uppercase tracking-widest font-semibold text-[var(--text-tertiary)] border-b border-white/60">
          <span>{copy.keywords.columns.keyword}</span>
          <span className="text-right">{copy.keywords.columns.volume}</span>
          <span className="text-right">{copy.keywords.columns.difficulty}</span>
          <span>{copy.keywords.columns.intent}</span>
          <span>{copy.keywords.columns.status}</span>
          <span>{copy.keywords.columns.trend}</span>
        </div>

        {keywords.length === 0 ? (
          <div className="py-16 text-center text-sm text-[var(--text-tertiary)]">{copy.keywords.emptyState}</div>
        ) : grouped ? (
          Object.entries(grouped).map(([cluster, kws]) => (
            <div key={cluster}>
              <div className="px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[var(--accent)] bg-[var(--accent-bg)] border-b border-[var(--accent-border)]">
                {cluster} · {kws.length} keywords
              </div>
              {kws.map((kw, i) => <KeywordRow key={kw.id} kw={kw} i={i} />)}
            </div>
          ))
        ) : (
          keywords.map((kw, i) => <KeywordRow key={kw.id} kw={kw} i={i} />)
        )}
      </div>

      <p className="text-xs text-[var(--text-tertiary)]">{keywords.length} keyword{keywords.length !== 1 ? 's' : ''} shown</p>
    </PageWrapper>
  )
}

function KeywordRow({ kw, i }: { kw: ReturnType<typeof useKeywords>['keywords'][0]; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: i * 0.03 }}
      whileHover={{ x: 2, backgroundColor: 'rgba(255,255,255,0.6)' }}
      className="grid grid-cols-[2fr_80px_80px_120px_100px_80px] gap-4 items-center px-4 py-3 border-b border-white/40 last:border-b-0 transition-all duration-150 cursor-default"
    >
      <div>
        <p className="text-sm font-medium text-[var(--text-primary)]">{kw.keyword}</p>
        {kw.currentRank && (
          <p className="text-xs text-emerald-600 mt-0.5">Rank #{kw.currentRank}</p>
        )}
      </div>
      <p className="text-sm text-right text-[var(--text-secondary)] font-medium">{formatNumber(kw.volume)}</p>
      <p className={cn('text-sm text-right font-semibold',
        kw.difficulty < 30 ? 'text-emerald-600' : kw.difficulty < 50 ? 'text-amber-600' : 'text-red-500'
      )}>{kw.difficulty}</p>
      <Badge variant={intentVariant[kw.intent]}>{kw.intent}</Badge>
      <Badge variant={statusVariant[kw.status]}>{kw.status}</Badge>
      <Sparkline data={kw.trend} />
    </motion.div>
  )
}
