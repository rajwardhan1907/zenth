import type { Metadata } from 'next'
import localFont from 'next/font/local'
import dynamic from 'next/dynamic'
import './globals.css'
import { ThemeProvider } from '@/components/theme/ThemeProvider'

const PromptPanel = dynamic(
  () => import('@/components/dev/PromptPanel'),
  { ssr: false }
)

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Zenth — set it. it grows.',
  description: 'Your autonomous SEO agent. Give it your product — it handles everything.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'development' && <PromptPanel />}
      </body>
    </html>
  )
}
