import { formatNumber } from '@/utils/formatNumber'
import { TrendingUp } from 'lucide-react'

interface TrafficForecastProps {
  forecast: { month1: number; month3: number; month6: number }
}

export function TrafficForecast({ forecast }: TrafficForecastProps) {
  const bars = [
    { label: '1 month', value: forecast.month1 },
    { label: '3 months', value: forecast.month3 },
    { label: '6 months', value: forecast.month6 },
  ]
  const max = forecast.month6

  return (
    <div className="flex items-end gap-4">
      {bars.map((bar) => (
        <div key={bar.label} className="flex flex-col items-center gap-1.5 flex-1">
          <span className="text-sm font-bold text-[var(--accent)]">{formatNumber(bar.value)}</span>
          <div className="w-full bg-slate-100 rounded-full overflow-hidden h-2">
            <div
              className="h-full rounded-full"
              style={{ width: `${(bar.value / max) * 100}%`, background: 'var(--accent)', opacity: 0.7 }}
            />
          </div>
          <span className="text-[10px] text-[var(--text-tertiary)]">{bar.label}</span>
        </div>
      ))}
      <TrendingUp size={16} className="mb-3 shrink-0" style={{ color: 'var(--accent)' }} />
    </div>
  )
}
