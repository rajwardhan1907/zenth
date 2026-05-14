import type { Metadata } from 'next'
import { generatePageMetadata } from '@/config/seo'
import DashboardPage from './_dashboard'

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: 'Dashboard',
    description: 'Your Zenth SEO dashboard — rankings, content queue, and site health at a glance.',
    path: '/dashboard',
  }),
  robots: { index: false, follow: false },
}

export default function Page() {
  return <DashboardPage />
}
