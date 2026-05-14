import type { Metadata } from 'next'
import { generatePageMetadata } from '@/config/seo'
import GeoPage from './_geo'

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: 'Geo Targeting',
    description: 'Traffic breakdown by region and geo-targeting opportunities for your site.',
    path: '/dashboard/geo',
  }),
  robots: { index: false, follow: false },
}

export default function Page() {
  return <GeoPage />
}
