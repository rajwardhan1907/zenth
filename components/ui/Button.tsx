'use client'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/utils/cn'
import { useRef } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: Variant
  size?: Size
  children: React.ReactNode
  loading?: boolean
}

const variants: Record<Variant, string> = {
  primary:
    'bg-[var(--accent)] text-white shadow-sm hover:opacity-90',
  secondary:
    'bg-white/60 backdrop-blur-sm border border-[var(--accent-border)] text-[var(--accent)] hover:bg-white/80',
  ghost:
    'bg-transparent text-[var(--text-secondary)] hover:bg-white/50 hover:text-[var(--text-primary)]',
  danger:
    'bg-transparent border border-red-200 text-red-500 hover:bg-red-50',
}

const sizes: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-4 py-2 text-sm rounded-xl',
  lg: 'px-6 py-3 text-base rounded-xl',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  loading,
  disabled,
  ...props
}: ButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Ripple
    const btn = btnRef.current
    if (btn) {
      const circle = document.createElement('span')
      const diameter = Math.max(btn.clientWidth, btn.clientHeight)
      const rect = btn.getBoundingClientRect()
      circle.style.cssText = `
        width:${diameter}px; height:${diameter}px;
        left:${e.clientX - rect.left - diameter / 2}px;
        top:${e.clientY - rect.top - diameter / 2}px;
      `
      circle.classList.add('ripple-circle')
      btn.querySelector('.ripple-circle')?.remove()
      btn.appendChild(circle)
    }
    props.onClick?.(e)
  }

  return (
    <motion.button
      ref={btnRef}
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -1 }}
      transition={{ duration: 0.15 }}
      disabled={disabled || loading}
      onClick={handleClick}
      className={cn(
        'ripple-wrapper inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      )}
      {children}
    </motion.button>
  )
}
