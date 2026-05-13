'use client'
import { useState } from 'react'
import { cn } from '@/utils/cn'

interface StepProps {
  onUpdate: (data: Record<string, unknown>) => void
}

const frequencies = ['Daily', '3×/week', 'Weekly', 'Manual']
const tones = ['Professional', 'Conversational', 'Technical', 'Simple']
const lengths = ['Short (800–1200 words)', 'Medium (1500–2500 words)', 'Long-form (3000+ words)']

export function Step4Preferences({ onUpdate }: StepProps) {
  const [freq, setFreq] = useState('3×/week')
  const [tone, setTone] = useState('Professional')
  const [length, setLength] = useState('Medium (1500–2500 words)')
  const [autoPublish, setAutoPublish] = useState(false)

  const set = (key: string, val: unknown) => {
    onUpdate({ [key]: val })
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-1">Tune the agent</h2>
      <p className="text-sm text-[var(--text-secondary)] mb-6">Set your preferences — you can change these anytime in settings.</p>
      <div className="flex flex-col gap-5">
        {/* Publishing frequency */}
        <div>
          <label className="text-sm font-medium text-[var(--text-primary)] block mb-2">Publishing frequency</label>
          <div className="flex gap-2 flex-wrap">
            {frequencies.map((f) => (
              <button key={f} type="button"
                onClick={() => { setFreq(f); set('frequency', f) }}
                className={cn('px-3 py-1.5 text-xs rounded-xl border transition-all duration-150',
                  freq === f ? 'text-white border-transparent' : 'border-slate-200 text-[var(--text-secondary)] hover:border-[var(--accent-border)]'
                )}
                style={freq === f ? { background: 'var(--accent)' } : undefined}
              >{f}</button>
            ))}
          </div>
        </div>

        {/* Writing tone */}
        <div>
          <label className="text-sm font-medium text-[var(--text-primary)] block mb-2">Writing tone</label>
          <div className="flex gap-2 flex-wrap">
            {tones.map((t) => (
              <button key={t} type="button"
                onClick={() => { setTone(t); set('tone', t) }}
                className={cn('px-3 py-1.5 text-xs rounded-xl border transition-all duration-150',
                  tone === t ? 'text-white border-transparent' : 'border-slate-200 text-[var(--text-secondary)] hover:border-[var(--accent-border)]'
                )}
                style={tone === t ? { background: 'var(--accent)' } : undefined}
              >{t}</button>
            ))}
          </div>
        </div>

        {/* Article length */}
        <div>
          <label className="text-sm font-medium text-[var(--text-primary)] block mb-2">Article length</label>
          <div className="flex flex-col gap-2">
            {lengths.map((l) => (
              <button key={l} type="button"
                onClick={() => { setLength(l); set('articleLength', l) }}
                className={cn('px-3 py-2 text-sm rounded-xl border text-left transition-all duration-150',
                  length === l ? 'border-transparent' : 'border-slate-200 text-[var(--text-secondary)]'
                )}
                style={length === l ? { background: 'var(--accent-bg)', border: '1px solid var(--accent-border)', color: 'var(--accent)' } : undefined}
              >{l}</button>
            ))}
          </div>
        </div>

        {/* Auto publish toggle */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-white/50 border border-slate-100">
          <div>
            <p className="text-sm font-medium text-[var(--text-primary)]">Auto-publish approved articles</p>
            <p className="text-xs text-[var(--text-secondary)]">Agent publishes directly to your CMS after approval</p>
          </div>
          <button
            type="button"
            onClick={() => { setAutoPublish((v) => !v); set('autoPublish', !autoPublish) }}
            className="relative w-10 h-5.5 rounded-full transition-all duration-200 focus:outline-none"
            style={{ background: autoPublish ? 'var(--accent)' : '#e2e8f0', height: 22, width: 40 }}
          >
            <span
              className="absolute top-0.5 w-4.5 h-4.5 bg-white rounded-full shadow-sm transition-transform duration-200"
              style={{ height: 18, width: 18, transform: `translateX(${autoPublish ? 20 : 2}px)` }}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
