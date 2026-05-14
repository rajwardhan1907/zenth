'use client'
import { useState } from 'react'
import { useTheme } from '@/hooks/useTheme'
import { Sidebar } from '@/components/layout/Sidebar'
import { Topbar } from '@/components/layout/Topbar'
import { AnimatedBackground } from '@/components/background/AnimatedBackground'
import { Toaster } from 'sonner'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Topbar onMenuOpen={() => setSidebarOpen(true)} />
      <main className="ml-0 md:ml-60 pt-14 min-h-screen">
        <div className="p-4 md:p-7">
          {children}
        </div>
      </main>
      <Toaster position="bottom-right" />
    </div>
  )
}
