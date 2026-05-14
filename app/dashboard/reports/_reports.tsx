'use client'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { motion } from 'framer-motion'
import { BookOpen, Download } from 'lucide-react'

const reports = [
  { id: 'r1', name: 'Monthly SEO Report — April 2025', date: 'May 1, 2025', status: 'ready' },
  { id: 'r2', name: 'Monthly SEO Report — March 2025', date: 'April 1, 2025', status: 'ready' },
  { id: 'r3', name: 'Monthly SEO Report — February 2025', date: 'March 1, 2025', status: 'ready' },
  { id: 'r4', name: 'Keyword Audit — Q1 2025', date: 'April 5, 2025', status: 'ready' },
  { id: 'r5', name: 'Monthly SEO Report — May 2025', date: 'Scheduled: June 1', status: 'scheduled' },
]

export default function ReportsPage() {
  return (
    <PageWrapper title="Reports" subtitle="Monthly SEO summaries and audit exports" action={<Button size="sm">Generate report</Button>}>
      <Card hover={false}>
        <div className="flex flex-col gap-1">
          {reports.map((r, i) => (
            <motion.div key={r.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="flex items-center gap-3 px-3 py-3.5 rounded-xl hover:bg-white/50 transition-all duration-150 border-b border-slate-50 last:border-b-0"
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--accent-bg)' }}>
                <BookOpen size={15} style={{ color: 'var(--accent)' }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--text-primary)]">{r.name}</p>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">{r.date}</p>
              </div>
              <Badge variant={r.status === 'ready' ? 'success' : 'warning'}>{r.status}</Badge>
              {r.status === 'ready' && (
                <Button variant="ghost" size="sm">
                  <Download size={13} /> Download
                </Button>
              )}
            </motion.div>
          ))}
        </div>
      </Card>
    </PageWrapper>
  )
}
