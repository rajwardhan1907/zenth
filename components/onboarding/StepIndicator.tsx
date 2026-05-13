import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { OnboardingStep } from '@/config/onboarding'
import { cn } from '@/utils/cn'

interface StepIndicatorProps {
  steps: OnboardingStep[]
  currentStep: number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex flex-col gap-1">
      {steps.map((step, i) => {
        const isDone = i < currentStep
        const isActive = i === currentStep

        return (
          <div key={step.id} className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
            style={isActive ? { background: 'var(--accent-bg)' } : undefined}
          >
            {/* Circle */}
            <motion.div
              animate={{
                scale: isActive ? 1.1 : 1,
                backgroundColor: isDone ? 'var(--accent)' : isActive ? 'var(--accent)' : 'transparent',
              }}
              className={cn(
                'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 border-2 transition-colors',
                isDone ? 'border-[var(--accent)] text-white' :
                isActive ? 'border-[var(--accent)] text-white' :
                'border-slate-200 text-slate-400'
              )}
            >
              {isDone ? <Check size={13} strokeWidth={3} /> : step.number}
            </motion.div>

            {/* Text */}
            <div>
              <p className={cn('text-sm font-semibold leading-none', isActive ? 'text-[var(--accent)]' : isDone ? 'text-[var(--text-secondary)]' : 'text-[var(--text-tertiary)]')}>
                {step.title}
              </p>
              <p className="text-xs text-[var(--text-tertiary)] mt-0.5">{step.subtitle}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
