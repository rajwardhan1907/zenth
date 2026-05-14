'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, FileText, Search, Activity, Link2,
  Globe, BarChart2, BookOpen, Settings, Zap,
} from 'lucide-react'
import { navItems } from '@/config/navigation'
import { ThemeSwitcher } from '@/components/theme/ThemeSwitcher'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/utils/cn'
import { copy } from '@/config/copy'
import { useApprovals } from '@/hooks/useApprovals'

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard size={17} />,
  FileText: <FileText size={17} />,
  Search: <Search size={17} />,
  Activity: <Activity size={17} />,
  Link2: <Link2 size={17} />,
  Globe: <Globe size={17} />,
  BarChart2: <BarChart2 size={17} />,
  BookOpen: <BookOpen size={17} />,
  Settings: <Settings size={17} />,
}

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const { totalPending } = useApprovals()

  const addRipple = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget
    const circle = document.createElement('span')
    const diameter = Math.max(el.clientWidth, el.clientHeight)
    const rect = el.getBoundingClientRect()
    circle.style.cssText = `width:${diameter}px;height:${diameter}px;left:${e.clientX - rect.left - diameter / 2}px;top:${e.clientY - rect.top - diameter / 2}px;`
    circle.classList.add('ripple-circle')
    el.querySelector('.ripple-circle')?.remove()
    el.appendChild(circle)
  }

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          'glass-sidebar fixed left-0 top-0 h-screen w-60 flex flex-col z-50',
          'transition-transform duration-[250ms] ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/40">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent)' }}>
            <Zap size={16} className="text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight" style={{ color: 'var(--logo-color)' }}>
            {copy.app.name}
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2.5">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/dashboard' && pathname.startsWith(item.href))

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => { addRipple(e); onClose() }}
                className={cn(
                  'ripple-wrapper relative flex items-center gap-2.5 px-3 py-2.5 rounded-xl mb-0.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'nav-active-bar text-[var(--accent)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:translate-x-0.5'
                )}
                style={isActive ? { background: 'var(--accent-bg)' } : undefined}
              >
                <span className={cn(isActive ? 'text-[var(--accent)]' : 'text-[var(--text-tertiary)]')}>
                  {iconMap[item.icon]}
                </span>
                <span>{item.label}</span>
                {item.href === '/dashboard/content' ? (
                  totalPending > 0 && (
                    <span
                      className="ml-auto flex items-center justify-center text-white font-medium"
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        background: 'var(--accent)',
                        fontSize: '10px',
                      }}
                    >
                      {totalPending}
                    </span>
                  )
                ) : item.badge && (
                  <Badge variant="accent" className="ml-auto text-[10px] px-1.5 py-0">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Bottom: theme switcher */}
        <div className="border-t border-white/40 pt-3">
          <p className="px-4 pb-2 text-[10px] uppercase tracking-widest text-[var(--text-tertiary)] font-semibold">
            Appearance
          </p>
          <ThemeSwitcher />
        </div>
      </aside>
    </>
  )
}
