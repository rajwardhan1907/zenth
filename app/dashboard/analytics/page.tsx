'use client'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { TrafficChart } from '@/components/dashboard/TrafficChart'
import { Card } from '@/components/ui/Card'
import { mockTrafficData } from '@/mock/dashboard.mock'
import { motion } from 'framer-motion'
import { BarChart2 } from 'lucide-react'

const topPages = [
  { url: '/blog/gst-return-filing', sessions: 12400, bounce: '38%', avgTime: '4:32' },
  { url: '/blog/tds-rate-chart', sessions: 9800, bounce: '42%', avgTime: '3:55' },
  { url: '/blog/salary-slip-format', sessions: 8200, bounce: '35%', avgTime: '5:10' },
  { url: '/blog/gst-invoice-format', sessions: 7100, bounce: '40%', avgTime: '4:02' },
  { url: '/blog/pf-deduction-calculator', sessions: 5900, bounce: '44%', avgTime: '3:28' },
]

export default function AnalyticsPage() {
  return (
    <PageWrapper title="Analytics" subtitle="Organic traffic trends and page performance">
      <TrafficChart data={mockTrafficData} />
      <Card hover={false}>
        <h3 className="font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
          <BarChart2 size={16} style={{ color: 'var(--accent)' }} />
          Top Pages by Organic Traffic
        </h3>
        <div>
          <div className="grid grid-cols-[2fr_80px_80px_80px] gap-4 px-2 py-2 text-[10px] uppercase tracking-widest text-[var(--text-tertiary)] font-semibold border-b border-slate-100">
            <span>Page</span><span className="text-right">Sessions</span><span className="text-right">Bounce</span><span className="text-right">Avg time</span>
          </div>
          {topPages.map((p, i) => (
            <motion.div key={p.url} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 }}
              className="grid grid-cols-[2fr_80px_80px_80px] gap-4 items-center px-2 py-3 border-b border-slate-50 last:border-b-0 text-sm"
            >
              <p className="text-[var(--accent)] font-medium truncate">{p.url}</p>
              <p className="text-right font-semibold text-[var(--text-primary)]">{p.sessions.toLocaleString('en-IN')}</p>
              <p className="text-right text-[var(--text-secondary)]">{p.bounce}</p>
              <p className="text-right text-[var(--text-secondary)]">{p.avgTime}</p>
            </motion.div>
          ))}
        </div>
      </Card>
    </PageWrapper>
  )
}
