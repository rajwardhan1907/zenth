import { cn } from '@/utils/cn'
import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-[var(--text-primary)]">{label}</label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full bg-white/70 backdrop-blur-sm border border-white/80 rounded-xl px-3 py-2.5 text-sm',
              'text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]',
              'focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-0 focus:border-transparent',
              'transition-all duration-200',
              icon && 'pl-9',
              error && 'border-red-300 focus:ring-red-400',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
