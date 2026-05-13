'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Zap, TrendingUp, Bot, Shield, Check } from 'lucide-react'
import { AnimatedBackground } from '@/components/background/AnimatedBackground'
import { Button } from '@/components/ui/Button'
import { copy } from '@/config/copy'
import { pricingTiers } from '@/config/pricing'
import { cn } from '@/utils/cn'

const features = [
  {
    icon: <Bot size={22} />,
    title: 'Fully autonomous',
    description: 'The agent researches keywords, writes articles, optimises for SEO, and publishes — without you lifting a finger.',
  },
  {
    icon: <TrendingUp size={22} />,
    title: 'Built to rank',
    description: 'Every article is written with search intent in mind. Keyword clusters, internal linking, featured snippet targeting — all automated.',
  },
  {
    icon: <Shield size={22} />,
    title: 'You stay in control',
    description: 'Review articles before they go live. Set tone, frequency, and topics. Pause the agent anytime.',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent)' }}>
            <Zap size={16} className="text-white" />
          </div>
          <span className="font-bold text-lg" style={{ color: 'var(--logo-color)' }}>Zenth</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            Sign in
          </Link>
          <Link href="/onboarding">
            <Button size="sm">{copy.landing.ctaPrimary}</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 text-center pt-20 pb-28 px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full w-fit mx-auto"
            style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}>
            Autonomous SEO agent
          </p>
          <h1 className="text-7xl font-black tracking-tight mb-3 leading-none" style={{ color: 'var(--logo-color)' }}>
            {copy.landing.heroTitle}
          </h1>
          <p className="text-2xl font-light text-[var(--text-secondary)] mb-6 tracking-wider">
            {copy.landing.heroTagline}
          </p>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed">
            {copy.landing.heroSubheading}
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/onboarding">
              <Button size="lg">{copy.landing.ctaPrimary}</Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="secondary">{copy.landing.ctaSecondary}</Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative z-10 px-6 py-16 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-[var(--text-primary)]">{copy.landing.featuresTitle}</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.09)' }}
              className="glass rounded-2xl p-6 cursor-default"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}>
                {f.icon}
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">{f.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="relative z-10 px-6 py-16 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-[var(--text-primary)]">{copy.landing.pricingTitle}</h2>
          <p className="text-[var(--text-secondary)] mt-2">{copy.landing.pricingSubtitle}</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pricingTiers.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              whileHover={{ y: -4 }}
              className={cn(
                'glass rounded-2xl p-6 flex flex-col cursor-default relative',
                tier.highlighted && 'ring-2 ring-[var(--accent)] shadow-[0_8px_32px_var(--accent-light)]'
              )}
            >
              {tier.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold px-3 py-1 rounded-full text-white"
                  style={{ background: 'var(--accent)' }}>
                  {tier.badge}
                </span>
              )}
              <div className="mb-4">
                <h3 className="font-bold text-lg text-[var(--text-primary)]">{tier.name}</h3>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">{tier.description}</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-black text-[var(--text-primary)]">
                  {tier.price === 0 ? 'Free' : `${tier.currency}${tier.price.toLocaleString('en-IN')}`}
                </span>
                {tier.price > 0 && (
                  <span className="text-sm text-[var(--text-secondary)] ml-1">/{tier.period}</span>
                )}
              </div>
              <ul className="flex flex-col gap-2 mb-6 flex-1">
                {tier.features.map((feat) => (
                  <li key={feat.label} className={cn('flex items-center gap-2 text-sm', feat.included ? 'text-[var(--text-primary)]' : 'text-[var(--text-tertiary)]')}>
                    <Check size={14} className={feat.included ? 'text-emerald-500' : 'text-slate-300'} />
                    {feat.label}
                  </li>
                ))}
              </ul>
              <Link href="/onboarding">
                <Button
                  variant={tier.highlighted ? 'primary' : 'secondary'}
                  className="w-full"
                >
                  {tier.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center py-12 px-6 border-t border-white/40">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Zap size={16} style={{ color: 'var(--accent)' }} />
          <span className="font-bold" style={{ color: 'var(--logo-color)' }}>Zenth</span>
        </div>
        <p className="text-sm text-[var(--text-tertiary)]">{copy.landing.footerTagline}</p>
        <p className="text-xs text-[var(--text-tertiary)] mt-3">© 2025 Zenth. All rights reserved.</p>
      </footer>
    </div>
  )
}
