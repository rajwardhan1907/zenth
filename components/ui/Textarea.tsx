import { cn } from '@/utils/cn'
import { TextareaHTMLAttributes, forwardRef } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-[var(--text-primary)]">{label}</label>
        )}
        <textarea
          ref={ref}
          rows={4}
          className={cn(
            'w-full bg-white/70 backdrop-blur-sm border border-white/80 rounded-xl px-3 py-2.5 text-sm',
            'text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] resize-none',
            'focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent',
            'transition-all duration-200',
            error && 'border-red-300 focus:ring-red-400',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
