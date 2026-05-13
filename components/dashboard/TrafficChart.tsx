'use client'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from 'recharts'
import { formatNumber } from '@/utils/formatNumber'
import { copy } from '@/config/copy'
import { Card } from '@/components/ui/Card'

interface TrafficChartProps {
  data: { month: string; traffic: number }[]
}

export function TrafficChart({ data }: TrafficChartProps) {
  return (
    <Card hover={false} className="col-span-2">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-semibold text-[var(--text-primary)]">{copy.dashboard.trafficChartTitle}</h3>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">Last 12 months · Organic sessions</p>
        </div>
        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
          ↑ 12.4%
        </span>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.20} />
              <stop offset="95%" stopColor="var(--accent)" stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: 'var(--text-tertiary)' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={formatNumber}
            tick={{ fontSize: 11, fill: 'var(--text-tertiary)' }}
            axisLine={false}
            tickLine={false}
          />
          <RechartsTooltip
            contentStyle={{
              background: 'rgba(255,255,255,0.9)',
              border: '0.5px solid rgba(255,255,255,0.9)',
              borderRadius: 12,
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              fontSize: 12,
            }}
            formatter={(val: unknown) => [formatNumber(Number(val)), 'Sessions']}
          />
          <Area
            type="monotone"
            dataKey="traffic"
            stroke="var(--accent)"
            strokeWidth={2}
            fill="url(#trafficGradient)"
            dot={false}
            activeDot={{ r: 5, fill: 'var(--accent)', strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}
