'use client'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Keyword } from '@/types/keyword'
import { formatNumber } from '@/utils/formatNumber'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { copy } from '@/config/copy'
import { cn } from '@/utils/cn'

const intentBadge: Record<string, 'info' | 'accent' | 'success' | 'warning'> = {
  informational: 'info',
  commercial: 'accent',
  transactional: 'success',
  navigational: 'warning',
}

interface KeywordOpportunitiesProps {
  keywords: Keyword[]
}

export function KeywordOpportunities({ keywords }: KeywordOpportunitiesProps) {
  return (
    <Card hover={false}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-[var(--text-primary)]">{copy.dashboard.keywordTitle}</h3>
        <button className="text-xs font-medium text-[var(--accent)] hover:underline flex items-center gap-1">
          View all <ArrowRight size={11} />
        </button>
      </div>
      <div className="flex flex-col gap-1">
        {keywords.map((kw, i) => (
          <motion.div
            key={kw.id}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ x: 2, backgroundColor: 'rgba(255,255,255,0.7)' }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-default transition-all duration-150"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[var(--text-primary)] truncate">{kw.keyword}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-[var(--text-secondary)]">{formatNumber(kw.volume)}/mo</span>
                <span className="text-[10px] text-[var(--text-tertiary)]">·</span>
                <span
                  className={cn(
                    'text-xs font-medium',
                    kw.difficulty < 30 ? 'text-emerald-600' : kw.difficulty < 50 ? 'text-amber-600' : 'text-red-500'
                  )}
                >
                  KD {kw.difficulty}
                </span>
              </div>
            </div>
            <Badge variant={intentBadge[kw.intent]}>{kw.intent}</Badge>
          </motion.div>
        ))}
      </div>
    </Card>
  )
}
