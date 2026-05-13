'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { onboardingSteps } from '@/config/onboarding'

export function useOnboarding() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Record<string, unknown>>({})
  const [isLaunching, setIsLaunching] = useState(false)

  const step = onboardingSteps[currentStep]
  const isFirst = currentStep === 0
  const isLast = currentStep === onboardingSteps.length - 1

  const next = () => {
    if (!isLast) setCurrentStep((s) => s + 1)
  }

  const back = () => {
    if (!isFirst) setCurrentStep((s) => s - 1)
  }

  const updateFormData = (data: Record<string, unknown>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const launch = async () => {
    setIsLaunching(true)
    localStorage.setItem('zenth_onboarding', JSON.stringify(formData))
    await new Promise((res) => setTimeout(res, 1200))
    router.push('/dashboard')
  }

  return {
    steps: onboardingSteps,
    currentStep,
    step,
    isFirst,
    isLast,
    next,
    back,
    formData,
    updateFormData,
    launch,
    isLaunching,
  }
}
