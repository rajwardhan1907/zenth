'use client'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { AlertTriangle, Tag } from 'lucide-react'
import { motion } from 'framer-motion'

const issues = [
  { id: 'h1', type: 'Broken link', url: '/blog/old-post', description: 'Returns 404', severity: 'high' as const },
  { id: 'h2', type: 'Broken link', url: '/resources/guide', description: 'Returns 404', severity: 'high' as const },
  { id: 'h3', type: 'Missing canonical', url: '/blog/gst-guide?utm=twitter', description: 'Missing canonical tag', severity: 'medium' as const },
]

const healthMetrics = [
  { label: 'Overall Score', value: '87/100', color: 'text-emerald-600' },
  { label: 'Pages indexed', value: '312', color: 'text-[var(--text-primary)]' },
  { label: 'Crawl errors', value: '3', color: 'text-amber-600' },
  { label: 'Core Web Vitals', value: 'Pass', color: 'text-emerald-600' },
]

export default function SiteHealthPage() {
  return (
    <PageWrapper title="Site Health" subtitle="Technical SEO audit and crawl status">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {healthMetrics.map((m, i) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <Card hover>
              <p className="text-xs text-[var(--text-tertiary)] uppercase tracking-widest font-semibold">{m.label}</p>
              <p className={`text-2xl font-bold mt-1 ${m.color}`}>{m.value}</p>
            </Card>
          </motion.div>
        ))}
      </div>
      <Card hover={false}>
        <h3 className="font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
          <AlertTriangle size={16} className="text-amber-500" />
          Issues Found ({issues.length})
        </h3>
        <div className="flex flex-col gap-3">
          {issues.map((issue, i) => (
            <motion.div key={issue.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
              className="flex items-start gap-3 p-3 rounded-xl bg-white/50 border border-slate-100"
            >
              {issue.severity === 'high' ? <AlertTriangle size={15} className="text-red-400 mt-0.5 shrink-0" /> : <Tag size={15} className="text-amber-400 mt-0.5 shrink-0" />}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-medium text-[var(--text-primary)]">{issue.type}</span>
                  <Badge variant={issue.severity === 'high' ? 'error' : 'warning'}>{issue.severity}</Badge>
                </div>
                <p className="text-xs text-[var(--accent)] font-mono truncate">{issue.url}</p>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">{issue.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </PageWrapper>
  )
}
