'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utils/cn'

interface TooltipProps {
  content: string
  children: React.ReactNode
  side?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
}

const sideStyles = {
  top: '-top-9 left-1/2 -translate-x-1/2',
  bottom: 'top-full mt-1 left-1/2 -translate-x-1/2',
  left: 'right-full mr-2 top-1/2 -translate-y-1/2',
  right: 'left-full ml-2 top-1/2 -translate-y-1/2',
}

export function Tooltip({ content, children, side = 'top', className }: TooltipProps) {
  const [visible, setVisible] = useState(false)

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      <AnimatePresence>
        {visible && (
          <motion.span
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.12 }}
            className={cn(
              'absolute z-50 whitespace-nowrap px-2.5 py-1 text-xs rounded-lg',
              'bg-[var(--text-primary)] text-white shadow-lg pointer-events-none',
              sideStyles[side],
              className
            )}
          >
            {content}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}
