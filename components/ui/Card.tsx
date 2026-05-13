'use client'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/utils/cn'

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: React.ReactNode
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const paddings = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-6',
}

export function Card({ children, hover = true, padding = 'md', className, ...props }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.10)' } : undefined}
      transition={{ duration: 0.2 }}
      className={cn(
        'glass rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.06)]',
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}
