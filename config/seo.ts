import type { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
  themeColor: '#6366f1',
}

export const SEO_CONFIG = {
  siteName: 'Zenth',
  siteUrl: 'https://zenth.ai',
  tagline: 'set it. it grows.',
  description:
    'Zenth is your autonomous SEO agent. It researches keywords, ' +
    'writes content, tracks rankings, and fixes your site — ' +
    'automatically. You approve, it publishes.',
  twitterHandle: '@zenthseo',
  ogImage: '/og.png',
  themeColor: '#6366f1',
}

export function generatePageMetadata({
  title,
  description,
  path = '/',
  ogImage,
}: {
  title?: string
  description?: string
  path?: string
  ogImage?: string
}): Metadata {
  const fullTitle = title
    ? `${title} — ${SEO_CONFIG.siteName}`
    : `${SEO_CONFIG.siteName} — ${SEO_CONFIG.tagline}`

  const desc = description ?? SEO_CONFIG.description
  const url  = `${SEO_CONFIG.siteUrl}${path}`
  const image = ogImage ?? SEO_CONFIG.ogImage

  return {
    title: fullTitle,
    description: desc,
    metadataBase: new URL(SEO_CONFIG.siteUrl),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      siteName: SEO_CONFIG.siteName,
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
      type: 'website',
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: desc,
      images: [image],
      creator: SEO_CONFIG.twitterHandle,
      site: SEO_CONFIG.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
  }
}
