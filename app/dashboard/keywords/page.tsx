import type { Metadata } from 'next'
import { generatePageMetadata } from '@/config/seo'
import KeywordsPage from './_keywords'

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: 'Keywords',
    description: 'Track keyword rankings, search volume, and intent signals for your site.',
    path: '/dashboard/keywords',
  }),
  robots: { index: false, follow: false },
}

export default function Page() {
  return <KeywordsPage />
}
