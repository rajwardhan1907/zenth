import type { Metadata } from 'next'
import { generatePageMetadata } from '@/config/seo'
import SiteHealthPage from './_site-health'

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: 'Site Health',
    description: 'Technical SEO audit, crawl status, and Core Web Vitals for your site.',
    path: '/dashboard/site-health',
  }),
  robots: { index: false, follow: false },
}

export default function Page() {
  return <SiteHealthPage />
}
