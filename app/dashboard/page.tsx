'use client'
import { useMemo } from 'react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { MetricCard } from '@/components/dashboard/MetricCard'
import { TrafficChart } from '@/components/dashboard/TrafficChart'
import { AgentFeed } from '@/components/dashboard/AgentFeed'
import { KeywordOpportunities } from '@/components/dashboard/KeywordOpportunities'
import { ApprovalBanner } from '@/components/dashboard/ApprovalBanner'
import { useDashboard } from '@/hooks/useDashboard'
import { copy } from '@/config/copy'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return copy.dashboard.greetingMorning
  if (h < 17) return copy.dashboard.greetingAfternoon
  return copy.dashboard.greetingEvening
}

export default function DashboardPage() {
  const { metrics, trafficData, agentFeed, keywordOpportunities } = useDashboard()
  const greeting = useMemo(() => getGreeting(), [])

  return (
    <PageWrapper>
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          {greeting}, Rahul 👋
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-0.5">
          Here's what your agent has been up to.
        </p>
      </div>

      {/* Approval banner */}
      <ApprovalBanner count={3} />

      {/* Metric cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <MetricCard key={m.id} metric={m} index={i} />
        ))}
      </div>

      {/* Charts + Feed */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2">
          <TrafficChart data={trafficData} />
        </div>
        <AgentFeed events={agentFeed} />
      </div>

      {/* Keyword opportunities */}
      <KeywordOpportunities keywords={keywordOpportunities} />
    </PageWrapper>
  )
}
