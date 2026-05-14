'use client'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { MetricCard } from '@/components/dashboard/MetricCard'
import { TrafficChart } from '@/components/dashboard/TrafficChart'
import { AgentFeed } from '@/components/dashboard/AgentFeed'
import { KeywordOpportunities } from '@/components/dashboard/KeywordOpportunities'
import { ApprovalBanner } from '@/components/dashboard/ApprovalBanner'
import { useDashboard } from '@/hooks/useDashboard'

export default function DashboardPage() {
  const { metrics, trafficData, agentFeed, keywordOpportunities, userName, timeBasedGreeting } = useDashboard()

  return (
    <PageWrapper>
      {/* Greeting */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-[var(--text-primary)]">
          {timeBasedGreeting}, {userName} 👋
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-0.5">
          Here&apos;s what your agent has been up to.
        </p>
      </div>

      {/* Approval banner */}
      <ApprovalBanner count={3} />

      {/* Metric cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <MetricCard key={m.id} metric={m} index={i} />
        ))}
      </div>

      {/* Charts + Feed */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-2">
          <TrafficChart data={trafficData} />
        </div>
        <AgentFeed events={agentFeed} />
      </div>

      {/* Keyword opportunities */}
      <KeywordOpportunities keywords={keywordOpportunities} />
    </PageWrapper>
  )
}
