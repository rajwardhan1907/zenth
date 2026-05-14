export const features = {
  realAuth: false,
  realApi: false,
  realDb: false,
  payments: false,
  notifications: false,
  geoTargeting: true,
  backlinks: true,
  contentApproval: true,
  agentFeed: true,
  darkMode: false,
  multiSite: true,
}

export type Feature = {
  icon: string
  name: string
  desc: string
  tag: string
}

export const FEATURES: Feature[] = [
  {
    icon: 'ti-search',
    name: 'Autonomous keyword research',
    desc: 'Seeds expand to hundreds of opportunities. Clusters by intent, scores by real traffic potential vs difficulty. Competitor gap analysis included.',
    tag: 'DataForSEO powered',
  },
  {
    icon: 'ti-file-text',
    name: 'AI content engine',
    desc: 'Full SEO-optimised articles written from briefs — keyword density, FAQ schema, meta descriptions, internal links. Human approval before publish.',
    tag: 'Claude Sonnet inside',
  },
  {
    icon: 'ti-chart-line',
    name: 'Real rank tracking',
    desc: 'Daily position checks for every tracked keyword. Delta alerts when rankings drop. Connected to Google Search Console for real click and impression data.',
    tag: 'GSC + DataForSEO',
  },
  {
    icon: 'ti-heart-rate-monitor',
    name: 'Site health crawler',
    desc: 'Continuous crawls surface broken pages, duplicate titles, slow load times. Severity-ranked issues with auto-fix suggestions.',
    tag: 'On-page API',
  },
  {
    icon: 'ti-robot',
    name: 'Fully scheduled agent',
    desc: 'Weekly keyword refresh. Daily rank checks. Monthly full audits. WhatsApp notifications for approval. It runs while you sleep.',
    tag: 'Inngest + Vercel Cron',
  },
  {
    icon: 'ti-building',
    name: 'Agency white-label',
    desc: 'Client portals, branded PDF reports, multi-site management dashboard, and a REST API for integrating Zenth data into your own tools.',
    tag: 'Agency tier',
  },
]
