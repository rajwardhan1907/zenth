'use client'
import { useTheme } from '@/hooks/useTheme'
import { themes } from '@/config/themes'
import { Tooltip } from '@/components/ui/Tooltip'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

export function ThemeSwitcher() {
  const { activeTheme, setTheme } = useTheme()

  return (
    <div className="flex items-center gap-2 px-4 pb-4">
      {Object.entries(themes).map(([key, token]) => (
        <Tooltip key={key} content={token.name}>
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setTheme(key)}
            className={cn(
              'w-5 h-5 rounded-full border-2 transition-all duration-200 cursor-pointer',
              activeTheme === key
                ? 'border-white shadow-md scale-110'
                : 'border-transparent opacity-60 hover:opacity-100'
            )}
            style={{ background: token.accentColor }}
            aria-label={`Switch to ${token.name} theme`}
          />
        </Tooltip>
      ))}
    </div>
  )
}
