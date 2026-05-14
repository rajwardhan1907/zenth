import type { Metadata } from 'next'
import { generatePageMetadata } from '@/config/seo'
import AnalyticsPage from './_analytics'

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: 'Analytics',
    description: 'Organic traffic trends, page performance, and sessions data for your site.',
    path: '/dashboard/analytics',
  }),
  robots: { index: false, follow: false },
}

export default function Page() {
  return <AnalyticsPage />
}
