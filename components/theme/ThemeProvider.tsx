'use client'
import { useTheme } from '@/hooks/useTheme'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useTheme() // Applies CSS variables to :root on mount + theme change
  return <>{children}</>
}
