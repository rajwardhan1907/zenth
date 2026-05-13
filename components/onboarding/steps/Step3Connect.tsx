'use client'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { CheckCircle2, Globe, BarChart2 } from 'lucide-react'

interface StepProps {
  onUpdate: (data: Record<string, unknown>) => void
}

export function Step3Connect({ onUpdate }: StepProps) {
  return (
    <div>
      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-1">Connect your site</h2>
      <p className="text-sm text-[var(--text-secondary)] mb-6">Link your website so the agent can audit it and track rankings.</p>
      <div className="flex flex-col gap-5">
        {/* Website URL */}
        <Input
          label="Website URL"
          placeholder="https://yourblog.in"
          icon={<Globe size={14} />}
          onChange={(e) => onUpdate({ siteUrl: e.target.value })}
        />

        {/* GSC connection */}
        <div className="p-4 rounded-2xl border border-dashed border-slate-200 bg-white/40">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-sky-50 flex items-center justify-center">
                <BarChart2 size={14} className="text-sky-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">Google Search Console</p>
                <p className="text-xs text-[var(--text-secondary)]">Required for rank tracking</p>
              </div>
            </div>
            <Button size="sm" variant="secondary">Connect GSC</Button>
          </div>
        </div>

        {/* GA4 connection */}
        <div className="p-4 rounded-2xl border border-dashed border-slate-200 bg-white/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
                <BarChart2 size={14} className="text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">Google Analytics 4</p>
                <p className="text-xs text-[var(--text-secondary)]">Optional — for traffic insights</p>
              </div>
            </div>
            <Button size="sm" variant="secondary">Connect GA4</Button>
          </div>
        </div>

        <p className="text-xs text-[var(--text-tertiary)] flex items-center gap-1.5">
          <CheckCircle2 size={12} className="text-emerald-500" />
          Your data is encrypted and never shared.
        </p>
      </div>
    </div>
  )
}
