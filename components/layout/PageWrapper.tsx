'use client'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface PageWrapperProps {
  children: React.ReactNode
  className?: string
  title?: string
  subtitle?: string
  action?: React.ReactNode
}

export function PageWrapper({ children, className, title, subtitle, action }: PageWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={cn('flex flex-col gap-6', className)}
    >
      {(title || action) && (
        <div className="flex items-start justify-between gap-4">
          <div>
            {title && (
              <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">{title}</h1>
            )}
            {subtitle && (
              <p className="mt-0.5 text-sm text-[var(--text-secondary)]">{subtitle}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </motion.div>
  )
}
