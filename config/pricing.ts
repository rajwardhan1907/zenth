type _LegacyPricingFeature = {
  label: string
  included: boolean
}

type _LegacyPricingTier = {
  id: string
  name: string
  price: number
  currency: string
  period: string
  description: string
  features: _LegacyPricingFeature[]
  cta: string
  highlighted: boolean
  badge?: string
}

export const pricingTiers: _LegacyPricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 0,
    currency: '₹',
    period: 'month',
    description: 'Perfect for solo creators and small blogs.',
    cta: 'Start free',
    highlighted: false,
    features: [
      { label: '1 website', included: true },
      { label: '20 AI articles/month', included: true },
      { label: 'Keyword discovery', included: true },
      { label: 'Site health audit', included: true },
      { label: 'Basic analytics', included: true },
      { label: 'Backlink tracking', included: false },
      { label: 'Geo targeting', included: false },
      { label: 'Priority support', included: false },
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 2499,
    currency: '₹',
    period: 'month',
    description: 'For growing businesses that need real SEO firepower.',
    cta: 'Start 14-day trial',
    highlighted: true,
    badge: 'Most popular',
    features: [
      { label: '3 websites', included: true },
      { label: '100 AI articles/month', included: true },
      { label: 'Keyword discovery + clustering', included: true },
      { label: 'Site health audit', included: true },
      { label: 'Advanced analytics', included: true },
      { label: 'Backlink tracking', included: true },
      { label: 'Geo targeting', included: true },
      { label: 'Priority support', included: false },
    ],
  },
  {
    id: 'scale',
    name: 'Scale',
    price: 7999,
    currency: '₹',
    period: 'month',
    description: 'Unlimited SEO at enterprise pace.',
    cta: 'Talk to us',
    highlighted: false,
    features: [
      { label: 'Unlimited websites', included: true },
      { label: 'Unlimited AI articles', included: true },
      { label: 'Keyword discovery + clustering', included: true },
      { label: 'Site health audit', included: true },
      { label: 'Advanced analytics + exports', included: true },
      { label: 'Backlink tracking', included: true },
      { label: 'Geo targeting', included: true },
      { label: 'Priority support', included: true },
    ],
  },
]

export type PricingFeature = {
  text: string
  included: boolean
}

export type PricingTier = {
  id: string
  name: string
  price: number
  sites: string
  featured: boolean
  cta: string
  features: PricingFeature[]
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 1499,
    sites: '1 website',
    featured: false,
    cta: 'Get started →',
    features: [
      { text: 'Keyword research', included: true },
      { text: '4 articles/month', included: true },
      { text: 'Rank tracking', included: true },
      { text: 'Site health audit', included: true },
      { text: 'WhatsApp alerts', included: false },
      { text: 'Agency features', included: false },
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 4999,
    sites: '3 websites',
    featured: true,
    cta: 'Start Growth plan →',
    features: [
      { text: 'Everything in Starter', included: true },
      { text: '16 articles/month', included: true },
      { text: 'Competitor gap analysis', included: true },
      { text: 'WhatsApp approvals', included: true },
      { text: 'Google Analytics 4', included: true },
      { text: 'Agency features', included: false },
    ],
  },
  {
    id: 'scale',
    name: 'Scale',
    price: 12999,
    sites: '10 websites',
    featured: false,
    cta: 'Get Scale plan →',
    features: [
      { text: 'Everything in Growth', included: true },
      { text: 'Unlimited articles', included: true },
      { text: 'Priority agent runs', included: true },
      { text: 'CMS auto-publish', included: true },
      { text: 'GEO optimisation', included: true },
      { text: 'White-label', included: false },
    ],
  },
  {
    id: 'agency',
    name: 'Agency',
    price: 29999,
    sites: 'Unlimited sites',
    featured: false,
    cta: 'Talk to us →',
    features: [
      { text: 'Everything in Scale', included: true },
      { text: 'White-label reports', included: true },
      { text: 'Client portals', included: true },
      { text: 'Agency dashboard', included: true },
      { text: 'REST API access', included: true },
      { text: 'Priority support', included: true },
    ],
  },
]
