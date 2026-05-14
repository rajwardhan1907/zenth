'use client'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { Card } from '@/components/ui/Card'
import { motion } from 'framer-motion'

const geoData = [
  { region: 'Maharashtra', sessions: 14200, share: 29.4, rank: 1 },
  { region: 'Karnataka', sessions: 9800, share: 20.3, rank: 2 },
  { region: 'Delhi NCR', sessions: 8400, share: 17.4, rank: 3 },
  { region: 'Tamil Nadu', sessions: 6100, share: 12.6, rank: 4 },
  { region: 'Gujarat', sessions: 4900, share: 10.2, rank: 5 },
  { region: 'Others', sessions: 4830, share: 10.1, rank: 6 },
]

export default function GeoPage() {
  return (
    <PageWrapper title="Geo Targeting" subtitle="Traffic breakdown by region and targeting opportunities">
      <Card hover={false}>
        <h3 className="font-semibold mb-5 text-[var(--text-primary)]">Traffic by Indian Region</h3>
        <div className="flex flex-col gap-3">
          {geoData.map((row, i) => (
            <motion.div key={row.region} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
              className="flex items-center gap-4"
            >
              <span className="w-6 text-xs text-[var(--text-tertiary)] font-bold">#{row.rank}</span>
              <span className="w-28 text-sm font-medium text-[var(--text-primary)]">{row.region}</span>
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${row.share}%` }}
                  transition={{ delay: i * 0.06 + 0.2, duration: 0.5 }}
                  className="h-full rounded-full"
                  style={{ background: 'var(--accent)', opacity: 0.7 }}
                />
              </div>
              <span className="w-12 text-xs text-right text-[var(--text-secondary)]">{row.share}%</span>
              <span className="w-16 text-xs text-right font-semibold text-[var(--text-primary)]">{row.sessions.toLocaleString('en-IN')}</span>
            </motion.div>
          ))}
        </div>
      </Card>
    </PageWrapper>
  )
}
