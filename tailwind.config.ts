import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: 'var(--accent)',
        'accent-light': 'var(--accent-light)',
        'accent-bg': 'var(--accent-bg)',
        'accent-border': 'var(--accent-border)',
        'accent-muted': 'var(--accent-muted)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'blink': 'blink 1.5s ease-in-out infinite',
        'fade-up': 'fadeUp 0.5s ease-out forwards',
        'orb-drift-1': 'orbDrift1 16s ease-in-out infinite',
        'orb-drift-2': 'orbDrift2 20s ease-in-out infinite',
        'orb-drift-3': 'orbDrift3 14s ease-in-out infinite',
        'orb-drift-4': 'orbDrift4 18s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        orbDrift1: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -20px) scale(1.05)' },
          '66%': { transform: 'translate(-20px, 15px) scale(0.97)' },
        },
        orbDrift2: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '40%': { transform: 'translate(-35px, 25px) scale(1.08)' },
          '70%': { transform: 'translate(25px, -15px) scale(0.95)' },
        },
        orbDrift3: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(20px, 30px) scale(1.06)' },
        },
        orbDrift4: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '45%': { transform: 'translate(-25px, -20px) scale(1.04)' },
          '80%': { transform: 'translate(15px, 25px) scale(0.96)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
