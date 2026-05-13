'use client'
import { motion } from 'framer-motion'
import { Bell, ChevronDown, Globe } from 'lucide-react'
import { useAgentStore } from '@/store/agent.store'
import { useSiteStore } from '@/store/site.store'
import { copy } from '@/config/copy'

const MOCK_SITE = {
  id: 's1',
  name: 'ClearTax Blog',
  domain: 'cleartax.in/blog',
  isConnected: true,
  gscConnected: true,
  monthlyTraffic: 48230,
  healthScore: 87,
}

export function Topbar() {
  const { status } = useAgentStore()
  const { activeSite, setActiveSite } = useSiteStore()

  // Seed active site on mount
  if (!activeSite) setActiveSite(MOCK_SITE)

  const isRunning = status === 'running'

  return (
    <header className="glass-topbar fixed top-0 left-60 right-0 h-14 flex items-center px-6 gap-4 z-30">
      {/* Site selector */}
      <motion.button
        whileHover={{ y: -1, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/60 border border-white/80 text-sm font-medium text-[var(--text-primary)] cursor-pointer transition-all"
      >
        <Globe size={14} className="text-[var(--accent)]" />
        <span>{activeSite?.domain ?? 'Select site'}</span>
        <ChevronDown size={13} className="text-[var(--text-tertiary)]" />
      </motion.button>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Agent status pill */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
        style={{ background: isRunning ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.12)', color: isRunning ? '#059669' : '#d97706' }}
      >
        {/* Blinking dot */}
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{
            background: isRunning ? '#10b981' : '#f59e0b',
            animation: 'blink 1.5s ease-in-out infinite',
          }}
        />
        Agent {isRunning ? 'running' : status}
      </motion.div>

      {/* Notification */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-9 h-9 rounded-xl bg-white/60 border border-white/80 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
      >
        <Bell size={16} />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: 'var(--accent)' }} />
      </motion.button>

      {/* Avatar */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold cursor-pointer"
        style={{ background: 'var(--accent)' }}
      >
        A
      </motion.div>

      {/* CSS blink */}
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0.25}}`}</style>
    </header>
  )
}
