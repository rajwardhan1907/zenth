import type { Metadata } from 'next'
import { generatePageMetadata } from '@/config/seo'
import { AnimatedBackground } from '@/components/background/AnimatedBackground'
import { OnboardingShell } from '@/components/onboarding/OnboardingShell'

export const metadata: Metadata = generatePageMetadata({
  title: 'Get Started',
  description: 'Set up your Zenth autonomous SEO agent in minutes. Tell us about your product and let it grow.',
  path: '/onboarding',
})

export default function OnboardingPage() {
  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <OnboardingShell />
    </div>
  )
}
