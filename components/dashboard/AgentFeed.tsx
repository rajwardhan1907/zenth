'use client'
import { motion } from 'framer-motion'
import { Pencil, Search, Zap, BookOpen, Activity, Loader2 } from 'lucide-react'
import { AgentEvent, AgentEventType } from '@/types/agent'
import { formatRelativeTime } from '@/utils/formatDate'
import { copy } from '@/config/copy'
import { Card } from '@/components/ui/Card'

const typeIcon: Record<AgentEventType, React.ReactNode> = {
  write:    <Pencil size={14} />,
  research: <Search size={14} />,
  optimize: <Zap size={14} />,
  publish:  <BookOpen size={14} />,
  audit:    <Activity size={14} />,
  keyword:  <Search size={14} />,
}

const typeColor: Record<AgentEventType, string> = {
  write:    'bg-violet-50 text-violet-600',
  research: 'bg-sky-50 text-sky-600',
  optimize: 'bg-amber-50 text-amber-600',
  publish:  'bg-emerald-50 text-emerald-600',
  audit:    'bg-rose-50 text-rose-600',
  keyword:  'bg-indigo-50 text-indigo-600',
}

interface AgentFeedProps {
  events: AgentEvent[]
}

export function AgentFeed({ events }: AgentFeedProps) {
  return (
    <Card hover={false}>
      <h3 className="font-semibold text-[var(--text-primary)] mb-4">{copy.dashboard.agentFeedTitle}</h3>
      <div className="flex flex-col gap-3">
        {events.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07 }}
            className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/50 transition-all duration-150"
          >
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${typeColor[event.type]}`}>
              {event.status === 'running' ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                typeIcon[event.type]
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[var(--text-primary)] leading-snug">{event.title}</p>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5 truncate">{event.description}</p>
            </div>
            <span className="text-[10px] text-[var(--text-tertiary)] shrink-0 mt-0.5">
              {formatRelativeTime(event.timestamp)}
            </span>
          </motion.div>
        ))}
      </div>
    </Card>
  )
}
