'use client'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Search, FileText, Activity } from 'lucide-react'
import { formatNumber } from '@/utils/formatNumber'
import { cn } from '@/utils/cn'

type Metric = {
  id: string
  label: string
  value: number
  change: number
  changeLabel: string
  color: string
  icon: string
  prefix: string
  suffix: string
}

const iconMap: Record<string, React.ReactNode> = {
  TrendingUp: <TrendingUp size={32} />,
  Search: <Search size={32} />,
  FileText: <FileText size={32} />,
  Activity: <Activity size={32} />,
}

const colorMap: Record<string, { bg: string; text: string; border: string; shadow: string }> = {
  indigo: {
    bg: 'rgba(99,102,241,0.06)',
    text: '#6366f1',
    border: 'rgba(99,102,241,0.15)',
    shadow: '0 4px 20px rgba(99,102,241,0.12)',
  },
  teal: {
    bg: 'rgba(20,184,166,0.06)',
    text: '#14b8a6',
    border: 'rgba(20,184,166,0.15)',
    shadow: '0 4px 20px rgba(20,184,166,0.12)',
  },
  violet: {
    bg: 'rgba(139,92,246,0.06)',
    text: '#8b5cf6',
    border: 'rgba(139,92,246,0.15)',
    shadow: '0 4px 20px rgba(139,92,246,0.12)',
  },
  amber: {
    bg: 'rgba(245,158,11,0.06)',
    text: '#f59e0b',
    border: 'rgba(245,158,11,0.15)',
    shadow: '0 4px 20px rgba(245,158,11,0.12)',
  },
}

interface MetricCardProps {
  metric: Metric
  index?: number
}

export function MetricCard({ metric, index = 0 }: MetricCardProps) {
  const colors = colorMap[metric.color] ?? colorMap['indigo']
  const isPositive = metric.change >= 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -3, boxShadow: colors.shadow }}
      className="ripple-wrapper relative overflow-hidden rounded-2xl p-5 cursor-default"
      style={{
        background: 'rgba(255,255,255,0.65)',
        backdropFilter: 'blur(12px)',
        border: `0.5px solid ${colors.border}`,
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
      }}
    >
      {/* Floating icon background */}
      <div
        className="absolute bottom-2 right-2 pointer-events-none"
        style={{ color: colors.text, opacity: 0.08, animation: 'float 3s ease-in-out infinite' }}
      >
        {iconMap[metric.icon]}
      </div>

      <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: colors.text }}>
        {metric.label}
      </p>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08 + 0.2, duration: 0.4 }}
        className="text-3xl font-bold tracking-tight text-[var(--text-primary)]"
      >
        {metric.prefix}{formatNumber(metric.value)}{metric.suffix}
      </motion.p>

      <div className={cn('flex items-center gap-1 mt-2 text-xs font-medium', isPositive ? 'text-emerald-600' : 'text-red-500')}>
        {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        <span>{isPositive ? '+' : ''}{metric.change}{typeof metric.change === 'number' && metric.change % 1 !== 0 ? '' : metric.id === 'health' ? '' : ''}</span>
        <span className="text-[var(--text-tertiary)] font-normal">{metric.changeLabel}</span>
      </div>

      {/* float animation */}
      <style>{`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}`}</style>
    </motion.div>
  )
}
