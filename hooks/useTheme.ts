'use client'
import { useEffect } from 'react'
import { useThemeStore } from '@/store/theme.store'
import { themes } from '@/config/themes'

export function useTheme() {
  const { activeTheme, setActiveTheme } = useThemeStore()
  const token = themes[activeTheme] ?? themes['indigo']

  // Rehydrate from localStorage on mount (store resets to default on fresh load)
  useEffect(() => {
    const saved = localStorage.getItem('zenth_theme')
    if (saved && themes[saved]) {
      setActiveTheme(saved)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--accent', token.accentColor)
    root.style.setProperty('--accent-light', token.accentLight)
    root.style.setProperty('--accent-bg', token.accentBg)
    root.style.setProperty('--accent-border', token.accentBorder)
    root.style.setProperty('--accent-text', token.accentText)
    root.style.setProperty('--accent-muted', token.accentMuted)
    root.style.setProperty('--orb1', token.orb1)
    root.style.setProperty('--orb2', token.orb2)
    root.style.setProperty('--orb3', token.orb3)
    root.style.setProperty('--grid-color', token.gridColor)
    root.style.setProperty('--logo-color', token.logoColor)
  }, [activeTheme])

  return { activeTheme, setActiveTheme, token }
}
