'use client'
import { useState } from 'react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Toggle } from '@/components/ui/Toggle'
import { useThemeStore } from '@/store/theme.store'
import { themes } from '@/config/themes'
import { pricingTiers } from '@/config/pricing'
import { copy } from '@/config/copy'
import {
  Palette, User, Globe, Plug, Bell, CreditCard,
  Search, BarChart2, Code, Layout,
} from 'lucide-react'

function readOnboarding() {
  if (typeof window === 'undefined') return { name: '', email: '', company: '' }
  try {
    const raw = localStorage.getItem('zenth_onboarding')
    if (!raw) return { name: '', email: '', company: '' }
    const d = JSON.parse(raw)
    return {
      name: [d.firstName, d.lastName].filter(Boolean).join(' '),
      email: (d.email as string) || '',
      company: (d.productName as string) || '',
    }
  } catch {
    return { name: '', email: '', company: '' }
  }
}

function Section({
  title, icon, saveLabel, onSave, children,
}: {
  title: string
  icon: React.ReactNode
  saveLabel?: string
  onSave?: () => void
  children: React.ReactNode
}) {
  return (
    <Card hover={false}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: 'var(--accent)' }}>{icon}</span>
          <h2 style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text-primary)', margin: 0 }}>
            {title}
          </h2>
        </div>
        {saveLabel && onSave && (
          <Button size="sm" onClick={onSave}>{saveLabel}</Button>
        )}
      </div>
      <div style={{ borderTop: '0.5px solid rgba(255,255,255,0.5)', margin: '12px 0' }} />
      {children}
    </Card>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label style={{
      display: 'block',
      fontSize: '12px',
      color: 'var(--text-secondary)',
      marginBottom: '5px',
      letterSpacing: '0.2px',
    }}>
      {children}
    </label>
  )
}

function Field({
  label, type = 'text', value, onChange, placeholder,
}: {
  label: string
  type?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 text-sm rounded-xl border border-white/80 bg-white/60 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-border)] transition-all"
      />
    </div>
  )
}

function SelectField({
  label, value, onChange, options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <div>
      <Label>{label}</Label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 text-sm rounded-xl border border-white/80 bg-white/60 text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-border)] transition-all"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  )
}

export default function SettingsPage() {
  const { activeTheme, setActiveTheme } = useThemeStore()

  const [profile, setProfile] = useState(() => {
    const saved = readOnboarding()
    return {
      name: saved.name,
      email: saved.email,
      company: saved.company,
      timezone: 'Asia/Kolkata',
      language: 'en',
    }
  })

  const [notifications, setNotifications] = useState({
    draftReady: true,
    keywordOpportunities: true,
    rankingChanges: true,
    siteHealth: true,
    weeklySummary: true,
    whatsapp: false,
    emailDigest: false,
  })

  const toggleNotif = (key: keyof typeof notifications) =>
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))

  const growthPlan = pricingTiers.find((t) => t.id === 'growth')!
  const usageMeters = [
    { label: 'Content pieces', used: 6, limit: 8 },
    { label: 'Keywords tracked', used: 143, limit: 200 },
    { label: 'Sites', used: 1, limit: 3 },
  ]

  const integrations = [
    { name: 'Google Search Console', description: 'Clicks, impressions, CTR, keyword positions', icon: <Search size={18} />, key: 'GSC' },
    { name: 'Google Analytics 4', description: 'Traffic, sessions, conversions, user behavior', icon: <BarChart2 size={18} />, key: 'GA4' },
    { name: 'WordPress', description: 'Auto-publish approved articles to your blog', icon: <Code size={18} />, key: 'WordPress' },
    { name: 'Webflow', description: 'Publish content directly to Webflow CMS', icon: <Layout size={18} />, key: 'Webflow' },
  ]

  const notificationItems: { key: keyof typeof notifications; label: string; sub: string }[] = [
    { key: 'draftReady', label: 'Draft ready for approval', sub: 'When the agent generates a new article draft' },
    { key: 'keywordOpportunities', label: 'Keyword opportunities found', sub: 'When new high-value keywords are discovered' },
    { key: 'rankingChanges', label: 'Ranking changes', sub: 'When a tracked keyword moves more than 5 positions' },
    { key: 'siteHealth', label: 'Site health issues', sub: 'When critical technical issues are detected' },
    { key: 'weeklySummary', label: 'Weekly summary report', sub: 'Every Monday morning — traffic, rankings, wins' },
    { key: 'whatsapp', label: 'WhatsApp notifications', sub: 'Receive approval requests via WhatsApp' },
    { key: 'emailDigest', label: 'Email digest', sub: 'Daily email summary of agent activity' },
  ]

  return (
    <PageWrapper title={copy.settings.pageTitle} subtitle="Manage your account, agent preferences, and billing.">
      <div style={{ maxWidth: '640px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        <Section title={copy.settings.sections.theme} icon={<Palette size={16} />}>
          <Label>Theme</Label>
          <div style={{ display: 'flex', gap: '12px', marginTop: '4px', flexWrap: 'wrap' }}>
            {Object.entries(themes).map(([key, token]) => {
              const isActive = activeTheme === key
              return (
                <div key={key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <button
                    onClick={() => setActiveTheme(key)}
                    style={{
                      width: '80px', height: '64px', borderRadius: '8px',
                      border: isActive ? `2px solid var(--accent)` : '2px solid transparent',
                      cursor: 'pointer', transition: 'all 200ms ease',
                      background: token.accentBg,
                      boxShadow: isActive ? `0 0 0 3px ${token.accentColor}33` : undefined,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                    aria-label={`Switch to ${token.name} theme`}
                  >
                    <span style={{ display: 'block', width: '14px', height: '14px', borderRadius: '50%', background: token.accentColor }} />
                  </button>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', textAlign: 'center' }}>{token.name}</span>
                </div>
              )
            })}
          </div>
        </Section>

        <Section title={copy.settings.sections.profile} icon={<User size={16} />} saveLabel="Save profile" onSave={() => console.log('profile saved', profile)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <Field label="Full name" value={profile.name} onChange={(v) => setProfile((p) => ({ ...p, name: v }))} placeholder="Raj Kumar" />
            <Field label="Email address" type="email" value={profile.email} onChange={(v) => setProfile((p) => ({ ...p, email: v }))} placeholder="raj@mystore.in" />
            <Field label="Company or brand name" value={profile.company} onChange={(v) => setProfile((p) => ({ ...p, company: v }))} placeholder="MyStore" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
              <SelectField label="Timezone" value={profile.timezone} onChange={(v) => setProfile((p) => ({ ...p, timezone: v }))} options={[
                { value: 'Asia/Kolkata', label: 'India — IST (UTC+5:30)' },
                { value: 'Asia/Dubai', label: 'Dubai — GST (UTC+4:00)' },
                { value: 'Europe/London', label: 'London — GMT (UTC+0:00)' },
                { value: 'America/New_York', label: 'New York — EST (UTC-5:00)' },
                { value: 'America/Los_Angeles', label: 'Los Angeles — PST (UTC-8:00)' },
              ]} />
              <SelectField label="Language" value={profile.language} onChange={(v) => setProfile((p) => ({ ...p, language: v }))} options={[
                { value: 'en', label: 'English' },
                { value: 'hi', label: 'Hindi' },
                { value: 'mr', label: 'Marathi' },
                { value: 'ta', label: 'Tamil' },
                { value: 'te', label: 'Telugu' },
              ]} />
            </div>
          </div>
        </Section>

        <Section title={copy.settings.sections.sites} icon={<Globe size={16} />}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Globe size={16} style={{ color: 'var(--text-secondary)' }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>mystore.in</p>
            </div>
            <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '20px', background: 'rgba(34,197,94,0.1)', color: '#16a34a', flexShrink: 0 }}>Active</span>
            <button onClick={() => console.log('disconnect site')} style={{ fontSize: '12px', color: 'var(--text-secondary)', border: '0.5px solid rgba(255,255,255,0.5)', background: 'transparent', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', flexShrink: 0 }}>Disconnect</button>
          </div>
          <button onClick={() => console.log('add site')} style={{ marginTop: '12px', width: '100%', padding: '10px', fontSize: '13px', color: 'var(--accent)', background: 'transparent', border: '0.5px dashed var(--accent-muted)', borderRadius: '8px', cursor: 'pointer' }}>
            + Add another site
          </button>
        </Section>

        <Section title={copy.settings.sections.integrations} icon={<Plug size={16} />}>
          {integrations.map((intg, i) => (
            <div key={intg.key} className="flex flex-col sm:flex-row sm:items-center gap-3 py-3" style={{ borderBottom: i < integrations.length - 1 ? '0.5px solid rgba(255,255,255,0.4)' : undefined }}>
              <span style={{ color: 'var(--text-secondary)', flexShrink: 0 }}>{intg.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>{intg.name}</p>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '1px' }}>{intg.description}</p>
              </div>
              <button onClick={() => console.log(`connect ${intg.key}`)} className="self-start sm:self-auto" style={{ fontSize: '12px', padding: '5px 14px', borderRadius: '6px', background: 'var(--accent)', color: 'white', border: 'none', cursor: 'pointer', flexShrink: 0 }}>Connect</button>
            </div>
          ))}
        </Section>

        <Section title={copy.settings.sections.notifications} icon={<Bell size={16} />} saveLabel="Save preferences" onSave={() => console.log('notifications saved', notifications)}>
          {notificationItems.map((item, i) => (
            <div key={item.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 0', borderBottom: i < notificationItems.length - 1 ? '0.5px solid rgba(255,255,255,0.4)' : undefined }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{item.label}</p>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>{item.sub}</p>
              </div>
              <Toggle checked={notifications[item.key]} onChange={() => toggleNotif(item.key)} />
            </div>
          ))}
        </Section>

        <Section title={copy.settings.sections.billing} icon={<CreditCard size={16} />}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <div>
              <p style={{ fontSize: '18px', fontWeight: 500, color: 'var(--accent)' }}>{growthPlan.name}</p>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '2px' }}>{growthPlan.currency}{growthPlan.price.toLocaleString('en-IN')} / month</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '20px', background: 'rgba(34,197,94,0.1)', color: '#16a34a' }}>Active</span>
              <Button size="sm" variant="secondary" onClick={() => console.log('manage billing')}>Manage billing</Button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {usageMeters.map((meter) => {
              const pct = meter.used / meter.limit
              const fillColor = pct >= 1 ? 'rgba(239,68,68,1)' : pct > 0.8 ? 'rgba(245,158,11,1)' : 'var(--accent)'
              return (
                <div key={meter.label}>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{meter.label}</p>
                  <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', marginTop: '2px' }}>{meter.used} / {meter.limit}</p>
                  <div style={{ height: '4px', borderRadius: '2px', background: 'rgba(0,0,0,0.08)', marginTop: '6px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${Math.min(pct * 100, 100)}%`, borderRadius: '2px', background: fillColor, transition: 'width 300ms ease' }} />
                  </div>
                </div>
              )
            })}
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Need more?{' '}
            <button onClick={() => console.log('View plans')} style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', padding: 0 }}>View plans</button>
            {' '}to upgrade to Scale for unlimited keywords and 10 sites.
          </p>
        </Section>

      </div>
    </PageWrapper>
  )
}
