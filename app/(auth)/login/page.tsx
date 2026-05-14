import type { Metadata } from 'next'
import { generatePageMetadata } from '@/config/seo'
import LoginPage from './_login'

export const metadata: Metadata = generatePageMetadata({
  title: 'Sign In',
  description: 'Sign in to your Zenth dashboard and let your autonomous SEO agent get back to work.',
  path: '/login',
})

export default function Page() {
  return <LoginPage />
}
