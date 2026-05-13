export type NavItem = {
  label: string
  href: string
  icon: string
  badge?: string
}

export const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
  { label: 'Content', href: '/dashboard/content', icon: 'FileText', badge: '3' },
  { label: 'Keywords', href: '/dashboard/keywords', icon: 'Search' },
  { label: 'Site Health', href: '/dashboard/site-health', icon: 'Activity' },
  { label: 'Backlinks', href: '/dashboard/backlinks', icon: 'Link2' },
  { label: 'Geo Targeting', href: '/dashboard/geo', icon: 'Globe' },
  { label: 'Analytics', href: '/dashboard/analytics', icon: 'BarChart2' },
  { label: 'Reports', href: '/dashboard/reports', icon: 'BookOpen' },
  { label: 'Settings', href: '/dashboard/settings', icon: 'Settings' },
]
