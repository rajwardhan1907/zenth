export type PricingFeature = {
  label: string
  included: boolean
}

export type PricingTier = {
  id: string
  name: string
  price: number
  currency: string
  period: string
  description: string
  features: PricingFeature[]
  cta: string
  highlighted: boolean
  badge?: string
}

export const pricingTiers: PricingTier[] = [
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
