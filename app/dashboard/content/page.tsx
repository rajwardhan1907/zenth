import type { Metadata } from 'next'
import { generatePageMetadata } from '@/config/seo'
import ContentPage from './_content'

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: 'Content Queue',
    description: 'Review and approve AI-generated article drafts before your agent publishes them.',
    path: '/dashboard/content',
  }),
  robots: { index: false, follow: false },
}

export default function Page() {
  return <ContentPage />
}
