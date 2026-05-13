export type ThemeToken = {
  name: string
  accentColor: string
  accentLight: string
  accentBg: string
  accentBorder: string
  accentText: string
  accentMuted: string
  orb1: string
  orb2: string
  orb3: string
  gridColor: string
  logoColor: string
}

export const themes: Record<string, ThemeToken> = {
  indigo: {
    name: 'Indigo',
    accentColor: '#6366f1',
    accentLight: 'rgba(99,102,241,0.10)',
    accentBg: 'rgba(99,102,241,0.08)',
    accentBorder: 'rgba(99,102,241,0.20)',
    accentText: '#ffffff',
    accentMuted: 'rgba(99,102,241,0.70)',
    orb1: 'rgba(99,102,241,0.18)',
    orb2: 'rgba(139,92,246,0.14)',
    orb3: 'rgba(168,85,247,0.10)',
    gridColor: 'rgba(99,102,241,0.04)',
    logoColor: '#6366f1',
  },
  teal: {
    name: 'Teal',
    accentColor: '#14b8a6',
    accentLight: 'rgba(20,184,166,0.10)',
    accentBg: 'rgba(20,184,166,0.08)',
    accentBorder: 'rgba(20,184,166,0.20)',
    accentText: '#ffffff',
    accentMuted: 'rgba(20,184,166,0.70)',
    orb1: 'rgba(20,184,166,0.18)',
    orb2: 'rgba(6,182,212,0.14)',
    orb3: 'rgba(16,185,129,0.10)',
    gridColor: 'rgba(20,184,166,0.04)',
    logoColor: '#14b8a6',
  },
  violet: {
    name: 'Violet',
    accentColor: '#8b5cf6',
    accentLight: 'rgba(139,92,246,0.10)',
    accentBg: 'rgba(139,92,246,0.08)',
    accentBorder: 'rgba(139,92,246,0.20)',
    accentText: '#ffffff',
    accentMuted: 'rgba(139,92,246,0.70)',
    orb1: 'rgba(139,92,246,0.18)',
    orb2: 'rgba(167,139,250,0.14)',
    orb3: 'rgba(196,181,253,0.10)',
    gridColor: 'rgba(139,92,246,0.04)',
    logoColor: '#8b5cf6',
  },
  sky: {
    name: 'Sky',
    accentColor: '#0ea5e9',
    accentLight: 'rgba(14,165,233,0.10)',
    accentBg: 'rgba(14,165,233,0.08)',
    accentBorder: 'rgba(14,165,233,0.20)',
    accentText: '#ffffff',
    accentMuted: 'rgba(14,165,233,0.70)',
    orb1: 'rgba(14,165,233,0.18)',
    orb2: 'rgba(56,189,248,0.14)',
    orb3: 'rgba(125,211,252,0.10)',
    gridColor: 'rgba(14,165,233,0.04)',
    logoColor: '#0ea5e9',
  },
  amber: {
    name: 'Amber',
    accentColor: '#f59e0b',
    accentLight: 'rgba(245,158,11,0.10)',
    accentBg: 'rgba(245,158,11,0.08)',
    accentBorder: 'rgba(245,158,11,0.20)',
    accentText: '#ffffff',
    accentMuted: 'rgba(245,158,11,0.70)',
    orb1: 'rgba(245,158,11,0.18)',
    orb2: 'rgba(251,191,36,0.14)',
    orb3: 'rgba(252,211,77,0.10)',
    gridColor: 'rgba(245,158,11,0.04)',
    logoColor: '#f59e0b',
  },
}

export const defaultTheme = 'indigo'
