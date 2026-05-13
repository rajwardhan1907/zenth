import { SeoSignal } from '@/types/content'
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react'
import { cn } from '@/utils/cn'

interface SeoSignalsProps {
  signals: SeoSignal[]
}

const statusIcon = {
  good: <CheckCircle2 size={13} className="text-emerald-500" />,
  warning: <AlertTriangle size={13} className="text-amber-500" />,
  error: <XCircle size={13} className="text-red-500" />,
}

const barColor = {
  good: 'bg-emerald-400',
  warning: 'bg-amber-400',
  error: 'bg-red-400',
}

export function SeoSignals({ signals }: SeoSignalsProps) {
  return (
    <div className="flex flex-col gap-2">
      {signals.map((s) => (
        <div key={s.label} className="flex items-center gap-2">
          {statusIcon[s.status]}
          <span className="text-xs text-[var(--text-secondary)] w-32 shrink-0">{s.label}</span>
          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={cn('h-full rounded-full', barColor[s.status])}
              style={{ width: `${s.score}%` }}
            />
          </div>
          <span className={cn('text-xs font-semibold w-8 text-right',
            s.status === 'good' ? 'text-emerald-600' : s.status === 'warning' ? 'text-amber-600' : 'text-red-600'
          )}>{s.score}</span>
        </div>
      ))}
    </div>
  )
}
