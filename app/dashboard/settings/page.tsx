'use client'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { ThemeSwitcher } from '@/components/theme/ThemeSwitcher'
import { Card } from '@/components/ui/Card'
import { copy } from '@/config/copy'
import { pricingTiers } from '@/config/pricing'
import { Check, Globe, Plug, Bell, CreditCard, Palette, User } from 'lucide-react'
import { cn } from '@/utils/cn'

function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Card hover={false}>
      <div className="flex items-center gap-2 mb-5 pb-4 border-b border-slate-100">
        <span className="text-[var(--accent)]">{icon}</span>
        <h2 className="font-semibold text-[var(--text-primary)]">{title}</h2>
      </div>
      {children}
    </Card>
  )
}

export default function SettingsPage() {
  return (
    <PageWrapper title={copy.settings.pageTitle} subtitle="Manage your account, agent preferences, and billing.">
      <div className="max-w-2xl flex flex-col gap-5">

        {/* Appearance */}
        <Section title={copy.settings.sections.theme} icon={<Palette size={16} />}>
          <p className="text-sm text-[var(--text-secondary)] mb-3">Choose your preferred colour theme.</p>
          <ThemeSwitcher />
        </Section>

        {/* Profile */}
        <Section title={copy.settings.sections.profile} icon={<User size={16} />}>
          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <Input label="First name" defaultValue="Rahul" />
              <Input label="Last name" defaultValue="Sharma" />
            </div>
            <Input label="Email" defaultValue="rahul@company.in" type="email" />
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="sm">{copy.settings.cancelLabel}</Button>
              <Button size="sm">{copy.settings.saveLabel}</Button>
            </div>
          </div>
        </Section>

        {/* Connected Sites */}
        <Section title={copy.settings.sections.sites} icon={<Globe size={16} />}>
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/50 border border-slate-100 mb-3">
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">cleartax.in/blog</p>
              <p className="text-xs text-emerald-600 mt-0.5">● Connected · GSC linked</p>
            </div>
            <Button variant="ghost" size="sm">Remove</Button>
          </div>
          <Button variant="secondary" size="sm">+ Add another site</Button>
        </Section>

        {/* Integrations */}
        <Section title={copy.settings.sections.integrations} icon={<Plug size={16} />}>
          {[
            { name: 'Google Search Console', status: 'Connected', color: 'emerald' },
            { name: 'Google Analytics 4', status: 'Not connected', color: 'slate' },
            { name: 'WordPress', status: 'Not connected', color: 'slate' },
            { name: 'Webflow', status: 'Not connected', color: 'slate' },
          ].map((int) => (
            <div key={int.name} className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-b-0">
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">{int.name}</p>
                <p className={cn('text-xs', int.color === 'emerald' ? 'text-emerald-600' : 'text-[var(--text-tertiary)]')}>
                  {int.status}
                </p>
              </div>
              <Button size="sm" variant="secondary">
                {int.color === 'emerald' ? 'Reconnect' : 'Connect'}
              </Button>
            </div>
          ))}
        </Section>

        {/* Notifications */}
        <Section title={copy.settings.sections.notifications} icon={<Bell size={16} />}>
          {[
            { label: 'Article ready for review', sub: 'Get notified when the agent drafts a new article' },
            { label: 'Keyword opportunities', sub: 'Weekly digest of new keyword clusters' },
            { label: 'Site health alerts', sub: 'Immediate alert on critical issues' },
            { label: 'Monthly SEO report', sub: 'Summary of traffic and rankings via email' },
          ].map((n) => (
            <div key={n.label} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-b-0">
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">{n.label}</p>
                <p className="text-xs text-[var(--text-secondary)]">{n.sub}</p>
              </div>
              <button
                className="relative w-10 rounded-full transition-all duration-200"
                style={{ height: 22, background: 'var(--accent)' }}
              >
                <span className="absolute top-0.5 right-0.5 bg-white rounded-full shadow-sm" style={{ height: 18, width: 18 }} />
              </button>
            </div>
          ))}
        </Section>

        {/* Billing */}
        <Section title={copy.settings.sections.billing} icon={<CreditCard size={16} />}>
          <div className="p-4 rounded-xl mb-4" style={{ background: 'var(--accent-bg)', border: '1px solid var(--accent-border)' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>Growth Plan</p>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">₹2,499/month · Renews June 1, 2025</p>
              </div>
              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-emerald-50 text-emerald-700">Active</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {pricingTiers.map((tier) => (
              <div
                key={tier.id}
                className={cn('p-3 rounded-xl border text-center cursor-pointer transition-all duration-150',
                  tier.id === 'growth'
                    ? 'border-[var(--accent-border)] bg-[var(--accent-bg)]'
                    : 'border-slate-100 bg-white/40 hover:border-slate-200'
                )}
              >
                <p className="text-sm font-bold text-[var(--text-primary)]">{tier.name}</p>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  {tier.price === 0 ? 'Free' : `₹${tier.price.toLocaleString('en-IN')}/mo`}
                </p>
                {tier.id === 'growth' && (
                  <Check size={12} className="mx-auto mt-1 text-[var(--accent)]" />
                )}
              </div>
            ))}
          </div>
        </Section>
      </div>
    </PageWrapper>
  )
}
