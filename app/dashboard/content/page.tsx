'use client'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { ContentApprovalCard } from '@/components/content/ContentApprovalCard'
import { useApprovals } from '@/hooks/useApprovals'
import { copy } from '@/config/copy'
import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'

export default function ContentPage() {
  const { items, approve, skip } = useApprovals()
  const pending = items.filter(i => i.status === 'pending_approval')

  return (
    <PageWrapper
      title={copy.content.pageTitle}
      subtitle={copy.content.pageSubtitle}
    >
      {pending.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: 'var(--accent-bg)' }}>
            <FileText size={24} style={{ color: 'var(--accent)' }} />
          </div>
          <p className="text-[var(--text-secondary)] text-sm">{copy.content.emptyState}</p>
        </motion.div>
      ) : (
        <div className="flex flex-col gap-4 max-w-3xl">
          <p className="text-sm text-[var(--text-secondary)]">
            <span className="font-semibold text-[var(--text-primary)]">{pending.length}</span> articles waiting for review
          </p>
          {pending.map((item) => (
            <ContentApprovalCard
              key={item.id}
              item={item}
              onApprove={approve}
              onSkip={skip}
            />
          ))}
        </div>
      )}
    </PageWrapper>
  )
}
