'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Zap } from 'lucide-react'
import { AnimatedBackground } from '@/components/background/AnimatedBackground'
import { Button } from '@/components/ui/Button'
import { copy } from '@/config/copy'
import { FEATURES } from '@/config/features'
import { PRICING_TIERS } from '@/config/pricing'

const dmSerif: React.CSSProperties = { fontFamily: 'var(--font-dm-serif)' }

const sectionLabel: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: '2.5px',
  textTransform: 'uppercase',
  color: '#6366f1',
  marginBottom: 24,
}

const sectionHeading: React.CSSProperties = {
  ...dmSerif,
  fontSize: 'clamp(34px, 5vw, 52px)',
  lineHeight: 1.05,
  letterSpacing: '-1.5px',
  color: '#e8f0f4',
  marginBottom: 20,
}

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
      <section className="relative z-10" style={{ padding: '100px 24px', maxWidth: 1040, margin: '0 auto' }}>
        <p style={sectionLabel}>{copy.landing.featuresLabel}</p>
        <h2 style={sectionHeading}>
          {copy.landing.featuresHeading1}<br />{copy.landing.featuresHeading2}
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(232,240,244,0.45)', maxWidth: 540, lineHeight: 1.7, marginBottom: 64 }}>
          {copy.landing.featuresSubheading}
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 1,
          background: 'rgba(255,255,255,0.07)',
          borderRadius: 16,
          overflow: 'hidden',
        }}>
          {FEATURES.map((feature) => (
            <motion.div
              key={feature.name}
              whileHover={{ background: '#0a1015' }}
              style={{ background: '#020709', padding: '36px 32px' }}
            >
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: 'rgba(99,102,241,0.12)',
                border: '0.5px solid rgba(99,102,241,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
              }}>
                <i className={`ti ${feature.icon}`} style={{ fontSize: 20, color: '#818cf8' }} />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 500, color: '#e8f0f4', marginBottom: 8 }}>{feature.name}</h3>
              <p style={{ fontSize: 13, color: 'rgba(232,240,244,0.45)', lineHeight: 1.7 }}>{feature.desc}</p>
              <span style={{
                display: 'inline-block',
                marginTop: 16,
                fontSize: 10,
                padding: '3px 10px',
                borderRadius: 20,
                background: 'rgba(99,102,241,0.1)',
                color: '#818cf8',
                border: '0.5px solid rgba(99,102,241,0.2)',
                letterSpacing: '0.5px',
              }}>
                {feature.tag}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="relative z-10" style={{ padding: '100px 24px 120px', maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        <p style={sectionLabel}>{copy.landing.pricingLabel}</p>
        <h2 style={sectionHeading}>{copy.landing.pricingHeadingNew}</h2>
        <p style={{ fontSize: 15, color: 'rgba(232,240,244,0.45)', lineHeight: 1.7 }}>
          {copy.landing.pricingSubheadingNew}
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16,
          marginTop: 60,
        }}>
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.id}
              style={{
                borderRadius: 14,
                padding: '28px 24px',
                border: tier.featured ? '0.5px solid rgba(99,102,241,0.4)' : '0.5px solid rgba(255,255,255,0.1)',
                background: tier.featured ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.03)',
                position: 'relative',
                textAlign: 'left',
              }}
            >
              {tier.featured && (
                <span style={{
                  position: 'absolute',
                  top: -10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: 10,
                  padding: '3px 12px',
                  borderRadius: 20,
                  background: '#6366f1',
                  color: '#fff',
                  letterSpacing: '0.5px',
                  whiteSpace: 'nowrap',
                }}>
                  {copy.landing.mostPopular}
                </span>
              )}
              <p style={{ fontSize: 13, fontWeight: 500, color: 'rgba(232,240,244,0.55)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>
                {tier.name}
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: 4 }}>
                <span style={{ fontSize: 18, color: 'rgba(232,240,244,0.4)' }}>₹</span>
                <span style={{ ...dmSerif, fontSize: 42, color: '#e8f0f4', lineHeight: 1 }}>
                  {tier.price.toLocaleString('en-IN')}
                </span>
                <span style={{ fontSize: 12, color: 'rgba(232,240,244,0.4)' }}>/mo</span>
              </div>
              <p style={{ fontSize: 12, color: 'rgba(232,240,244,0.35)', marginBottom: 24 }}>{tier.sites}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px' }}>
                {tier.features.map((feat) => (
                  <li key={feat.text} style={{
                    display: 'flex',
                    gap: 8,
                    fontSize: 13,
                    padding: '6px 0',
                    borderBottom: '0.5px solid rgba(255,255,255,0.04)',
                    color: feat.included ? 'rgba(232,240,244,0.55)' : 'rgba(232,240,244,0.3)',
                    alignItems: 'center',
                  }}>
                    <i
                      className={`ti ${feat.included ? 'ti-check' : 'ti-minus'}`}
                      style={{ fontSize: 14, color: feat.included ? '#6366f1' : 'rgba(255,255,255,0.2)', flexShrink: 0 }}
                    />
                    {feat.text}
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={tier.featured
                  ? { background: '#4f46e5' }
                  : { background: 'rgba(255,255,255,0.08)', color: '#e8f0f4' }
                }
                style={{
                  width: '100%',
                  padding: '11px',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  ...(tier.featured
                    ? { background: '#6366f1', border: 'none', color: '#fff' }
                    : { background: 'transparent', border: '0.5px solid rgba(255,255,255,0.15)', color: 'rgba(232,240,244,0.7)' }
                  ),
                }}
              >
                {tier.cta}
              </motion.button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative z-10" style={{ padding: '0 24px 80px', maxWidth: 1040, margin: '0 auto' }}>
        <div style={{
          borderRadius: 20,
          padding: '64px 40px',
          textAlign: 'center',
          border: '0.5px solid rgba(99,102,241,0.3)',
          background: 'rgba(99,102,241,0.06)',
        }}>
          <h2 style={{ ...dmSerif, fontSize: 'clamp(30px, 4vw, 44px)', letterSpacing: '-1px', color: '#e8f0f4', marginBottom: 16, lineHeight: 1.1 }}>
            {copy.landing.ctaHeading1}<br />
            <em style={{ color: '#6366f1' }}>{copy.landing.ctaHeading2}</em>
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(232,240,244,0.4)', marginBottom: 32 }}>
            {copy.landing.ctaSubheading}
          </p>
          <Link href="/onboarding">
            <motion.button
              whileHover={{ background: '#4f46e5' }}
              style={{
                background: '#6366f1',
                border: 'none',
                color: '#fff',
                fontSize: 15,
                padding: '16px 36px',
                borderRadius: 8,
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              {copy.landing.ctaButton}
            </motion.button>
          </Link>
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
