import type { Metadata } from 'next'
import { generatePageMetadata } from '@/config/seo'
import SettingsPage from './_settings'

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: 'Settings',
    description: 'Manage your Zenth account, agent preferences, integrations, and billing.',
    path: '/dashboard/settings',
  }),
  robots: { index: false, follow: false },
}

export default function Page() {
  return <SettingsPage />
}
