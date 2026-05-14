import type { Metadata } from 'next'
import { generatePageMetadata } from '@/config/seo'
import ReportsPage from './_reports'

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: 'Reports',
    description: 'Monthly SEO summaries and audit exports for your site.',
    path: '/dashboard/reports',
  }),
  robots: { index: false, follow: false },
}

export default function Page() {
  return <ReportsPage />
}
