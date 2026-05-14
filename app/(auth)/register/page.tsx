import type { Metadata } from 'next'
import { generatePageMetadata } from '@/config/seo'
import RegisterPage from './_register'

export const metadata: Metadata = generatePageMetadata({
  title: 'Create Account',
  description: 'Create your Zenth account and start your autonomous SEO journey today.',
  path: '/register',
})

export default function Page() {
  return <RegisterPage />
}
