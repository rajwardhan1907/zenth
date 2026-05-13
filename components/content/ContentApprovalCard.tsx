'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, FileText, Calendar, Tag } from 'lucide-react'
import { ContentItem } from '@/types/content'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { SeoSignals } from './SeoSignals'
import { ArticleOutline } from './ArticleOutline'
import { TrafficForecast } from './TrafficForecast'
import { formatNumber } from '@/utils/formatNumber'
import { formatRelativeTime } from '@/utils/formatDate'
import { copy } from '@/config/copy'
import { cn } from '@/utils/cn'

interface ContentApprovalCardProps {
  item: ContentItem
  onApprove: (id: string) => void
  onSkip: (id: string) => void
}

export function ContentApprovalCard({ item, onApprove, onSkip }: ContentApprovalCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [tab, setTab] = useState<'outline' | 'seo' | 'forecast'>('outline')
  const isApproved = item.status === 'approved'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'rounded-2xl overflow-hidden transition-all duration-300',
        'bg-white/65 backdrop-blur-[12px] border-[0.5px] border-white/80',
        'shadow-[0_2px_12px_rgba(0,0,0,0.05)]'
      )}
    >
      {/* Header */}
      <div className="p-5">
        <div className="flex items-start gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: 'var(--accent-bg)' }}
          >
            <FileText size={16} style={{ color: 'var(--accent)' }} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-[var(--text-primary)] leading-snug">{item.title}</h3>
            <div className="flex items-center flex-wrap gap-2 mt-1.5">
              <Badge variant="accent">{item.keyword}</Badge>
              <span className="text-xs text-[var(--text-secondary)]">{formatNumber(item.wordCount)} words</span>
              <span className="text-xs text-[var(--text-tertiary)]">·</span>
              <span className="text-xs text-[var(--text-tertiary)]">{formatRelativeTime(item.createdAt)}</span>
            </div>
          </div>
          {isApproved && <Badge variant="success" className="shrink-0">Approved</Badge>}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-4">
          {!isApproved && (
            <>
              <Button size="sm" onClick={() => onApprove(item.id)}>{copy.content.approveLabel}</Button>
              <Button size="sm" variant="secondary">{copy.content.editLabel}</Button>
              <Button size="sm" variant="ghost" onClick={() => onSkip(item.id)}>{copy.content.skipLabel}</Button>
            </>
          )}
          <button
            onClick={() => setExpanded((v) => !v)}
            className="ml-auto flex items-center gap-1 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            {expanded ? copy.content.collapseLabel : copy.content.expandLabel}
            {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>
        </div>
      </div>

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/60"
          >
            <div className="p-5 pt-4">
              {/* Tabs */}
              <div className="flex gap-1 mb-4 bg-slate-50/80 p-1 rounded-xl w-fit">
                {(['outline', 'seo', 'forecast'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 capitalize',
                      tab === t
                        ? 'bg-white shadow-sm text-[var(--text-primary)]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    )}
                  >
                    {t === 'seo' ? 'SEO Signals' : t === 'forecast' ? 'Traffic Forecast' : 'Outline'}
                  </button>
                ))}
              </div>

              {tab === 'outline' && <ArticleOutline outline={item.outline} />}
              {tab === 'seo' && <SeoSignals signals={item.seoSignals} />}
              {tab === 'forecast' && <TrafficForecast forecast={item.trafficForecast} />}

              {/* Publish settings */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center flex-wrap gap-3">
                <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                  <Tag size={12} />
                  <span>{item.publishSettings.category}</span>
                </div>
                {item.publishSettings.scheduledFor && (
                  <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                    <Calendar size={12} />
                    <span>Scheduled: {new Date(item.publishSettings.scheduledFor).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                )}
                <div className="flex gap-1 flex-wrap">
                  {item.publishSettings.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-slate-100 rounded-full text-slate-500">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
