'use client'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { motion } from 'framer-motion'

const backlinks = [
  { id: 'b1', domain: 'economictimes.com', url: '/gst-guide-india', anchor: 'GST filing guide', dr: 82, type: 'dofollow' },
  { id: 'b2', domain: 'caclub.in', url: '/resources', anchor: 'TDS rate chart', dr: 67, type: 'dofollow' },
  { id: 'b3', domain: 'taxguru.in', url: '/news/gst', anchor: 'gst invoice format', dr: 71, type: 'dofollow' },
  { id: 'b4', domain: 'quora.com', url: '/q/gst', anchor: 'accounting software', dr: 90, type: 'nofollow' },
]

export default function BacklinksPage() {
  return (
    <PageWrapper title="Backlinks" subtitle="Monitor your link profile and discover new opportunities">
      <div className="grid grid-cols-3 gap-4 mb-2">
        {[{ l: 'Total backlinks', v: '1,284' }, { l: 'Referring domains', v: '312' }, { l: 'DR (avg)', v: '54' }].map((m, i) => (
          <motion.div key={m.l} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <Card><p className="text-xs text-[var(--text-tertiary)] uppercase tracking-widest font-semibold">{m.l}</p><p className="text-2xl font-bold mt-1 text-[var(--text-primary)]">{m.v}</p></Card>
          </motion.div>
        ))}
      </div>
      <Card hover={false}>
        <h3 className="font-semibold mb-4 text-[var(--text-primary)]">Recent backlinks</h3>
        <div className="flex flex-col">
          {backlinks.map((bl, i) => (
            <motion.div key={bl.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 }}
              className="grid grid-cols-[2fr_1fr_80px_80px] gap-4 items-center py-3 border-b border-slate-50 last:border-b-0 text-sm"
            >
              <div>
                <p className="font-medium text-[var(--accent)]">{bl.domain}</p>
                <p className="text-xs text-[var(--text-tertiary)] truncate">{bl.url}</p>
              </div>
              <p className="text-[var(--text-secondary)]">{bl.anchor}</p>
              <p className="font-semibold text-[var(--text-primary)]">DR {bl.dr}</p>
              <Badge variant={bl.type === 'dofollow' ? 'success' : 'default'}>{bl.type}</Badge>
            </motion.div>
          ))}
        </div>
      </Card>
    </PageWrapper>
  )
}
