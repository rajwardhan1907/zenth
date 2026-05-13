import { AnimatedBackground } from '@/components/background/AnimatedBackground'
import { OnboardingShell } from '@/components/onboarding/OnboardingShell'

export default function OnboardingPage() {
  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <OnboardingShell />
    </div>
  )
}
