'use client'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { ContentApprovalCard } from '@/components/content/ContentApprovalCard'
import { useApprovals } from '@/hooks/useApprovals'
import { copy } from '@/config/copy'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

export default function ContentPage() {
  const { pendingDrafts, editingId, setEditingId, approveDraft, skipDraft, editDraft } = useApprovals()

  return (
    <PageWrapper
      title={copy.content.pageTitle}
      subtitle={copy.content.pageSubtitle}
    >
      {pendingDrafts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: 'var(--accent-bg)' }}>
            <CheckCircle size={32} style={{ color: 'var(--accent)' }} />
          </div>
          <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1">Queue is clear</h3>
          <p className="text-sm text-[var(--text-secondary)]">Your agent is working on the next batch of drafts</p>
        </motion.div>
      ) : (
        <div className="flex flex-col gap-4 max-w-3xl">
          <p className="text-sm text-[var(--text-secondary)]">
            <span className="font-semibold text-[var(--text-primary)]">{pendingDrafts.length}</span> articles waiting for review
          </p>
          <AnimatePresence mode="popLayout">
            {pendingDrafts.map((draft) => (
              <ContentApprovalCard
                key={draft.id}
                draft={draft}
                isEditing={editingId === draft.id}
                onApprove={() => approveDraft(draft.id)}
                onSkip={() => skipDraft(draft.id)}
                onEditOpen={() => setEditingId(draft.id)}
                onEditSave={(content) => { editDraft(draft.id, content); setEditingId(null) }}
                onEditCancel={() => setEditingId(null)}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </PageWrapper>
  )
}
