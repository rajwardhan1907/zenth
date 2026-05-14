import { create } from 'zustand'
import { defaultTheme } from '@/config/themes'

type ThemeStore = {
  activeTheme: string
  setActiveTheme: (name: string) => void
}

export const useThemeStore = create<ThemeStore>()((set) => ({
  activeTheme: defaultTheme,
  setActiveTheme: (name) => {
    localStorage.setItem('zenth_theme', name)
    set({ activeTheme: name })
  },
}))
