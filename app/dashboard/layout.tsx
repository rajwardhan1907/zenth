'use client'
import { useTheme } from '@/hooks/useTheme'
import { Sidebar } from '@/components/layout/Sidebar'
import { Topbar } from '@/components/layout/Topbar'
import { AnimatedBackground } from '@/components/background/AnimatedBackground'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  useTheme()

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Sidebar />
      <Topbar />
      <main className="ml-60 pt-14 min-h-screen">
        <div className="p-7">
          {children}
        </div>
      </main>
    </div>
  )
}
