'use client'
import { motion } from 'framer-motion'
import { FileText, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { copy } from '@/config/copy'

interface ApprovalBannerProps {
  count: number
}

export function ApprovalBanner({ count }: ApprovalBannerProps) {
  if (count === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 px-4 py-3 rounded-2xl"
      style={{
        background: 'var(--accent-bg)',
        border: '0.5px solid var(--accent-border)',
      }}
    >
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: 'var(--accent)', opacity: 0.9 }}
      >
        <FileText size={15} className="text-white" />
      </div>
      <p className="flex-1 text-sm font-medium" style={{ color: 'var(--accent)' }}>
        <span className="font-bold">{count} {count === 1 ? 'article' : 'articles'}</span>{' '}
        {copy.dashboard.approvalBannerText}
      </p>
      <Link
        href="/dashboard/content"
        className="flex items-center gap-1 text-xs font-semibold shrink-0 hover:underline"
        style={{ color: 'var(--accent)' }}
      >
        {copy.dashboard.approvalBannerCta}
        <ArrowRight size={12} />
      </Link>
    </motion.div>
  )
}
