import type { Metadata } from 'next'
import { generatePageMetadata } from '@/config/seo'
import BacklinksPage from './_backlinks'

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: 'Backlinks',
    description: 'Monitor your link profile and discover new backlink opportunities.',
    path: '/dashboard/backlinks',
  }),
  robots: { index: false, follow: false },
}

export default function Page() {
  return <BacklinksPage />
}
