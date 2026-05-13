import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { defaultTheme } from '@/config/themes'

type ThemeStore = {
  activeTheme: string
  setTheme: (theme: string) => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      activeTheme: defaultTheme,
      setTheme: (theme) => set({ activeTheme: theme }),
    }),
    { name: 'zenth-theme' }
  )
)
