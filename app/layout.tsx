import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { DM_Serif_Display } from 'next/font/google'
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

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-dm-serif',
})

export const metadata: Metadata = {
  title: 'Zenth — set it. it grows.',
  description: 'Your autonomous SEO agent. Give it your product — it handles everything.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css" />
      </head>
      <body className={`${geistSans.variable} ${dmSerifDisplay.variable} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'development' && <PromptPanel />}
      </body>
    </html>
  )
}
