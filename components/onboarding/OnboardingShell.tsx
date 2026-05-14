'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { StepIndicator } from './StepIndicator'
import { copy } from '@/config/copy'
import { useOnboarding } from '@/hooks/useOnboarding'

// Lazy-import step components
import { Step1Account } from './steps/Step1Account'
import { Step2Product } from './steps/Step2Product'
import { Step3Connect } from './steps/Step3Connect'
import { Step4Preferences } from './steps/Step4Preferences'

const stepComponents = [Step1Account, Step2Product, Step3Connect, Step4Preferences]

export function OnboardingShell() {
  const { steps, currentStep, isFirst, isLast, next, back, updateFormData, launch, isLaunching } = useOnboarding()
  const StepComponent = stepComponents[currentStep]

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div
          className="rounded-3xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.10)] flex"
          style={{ background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(24px)', border: '0.5px solid rgba(255,255,255,0.9)' }}
        >
          {/* Left panel */}
          <div className="w-72 p-8 flex flex-col" style={{ background: 'rgba(255,255,255,0.35)', borderRight: '0.5px solid rgba(255,255,255,0.7)' }}>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent)' }}>
                <Zap size={16} className="text-white" />
              </div>
              <span className="font-bold text-lg" style={{ color: 'var(--logo-color)' }}>Zenth</span>
            </div>
            <h2 className="font-bold text-xl text-[var(--text-primary)] mb-1">{copy.onboarding.title}</h2>
            <p className="text-sm text-[var(--text-secondary)] mb-8">{copy.onboarding.subtitle}</p>
            <StepIndicator steps={steps} currentStep={currentStep} />
          </div>

          {/* Right panel */}
          <div className="flex-1 p-8 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="flex-1"
              >
                <StepComponent onUpdate={updateFormData} />
              </motion.div>
            </AnimatePresence>

            {/* Footer */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/60">
              <Button
                variant="ghost"
                size="sm"
                onClick={back}
                disabled={isFirst}
              >
                {copy.onboarding.backLabel}
              </Button>
              <div className="flex items-center gap-2">
                {/* Progress dots */}
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                    style={{ background: i === currentStep ? 'var(--accent)' : i < currentStep ? 'var(--accent-muted)' : '#e2e8f0', transform: i === currentStep ? 'scale(1.4)' : 'scale(1)' }}
                  />
                ))}
              </div>
              <Button
                size="sm"
                onClick={isLast ? launch : next}
                disabled={isLaunching}
                loading={isLaunching}
              >
                {isLaunching ? 'Launching...' : isLast ? copy.onboarding.finishLabel : copy.onboarding.nextLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
