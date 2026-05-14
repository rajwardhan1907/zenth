import type { Metadata } from 'next'
import { generatePageMetadata, SEO_CONFIG } from '@/config/seo'
import LandingPage from './_landing'

export const metadata: Metadata = generatePageMetadata({
  description: SEO_CONFIG.description,
})

export default function Page() {
  return <LandingPage />
}
