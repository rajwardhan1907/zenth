import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { dataForSEO } from '@/services/dataforseo.service'
import type { Keyword, KeywordIntent } from '@/types/keyword'
import type { CompetitorKeywordItem, MonthlySearch } from '@/types/dataforseo'

function inferIntent(competitionLevel: string | null, cpc: number | null): KeywordIntent {
  if (competitionLevel === 'HIGH' || (cpc !== null && cpc > 2)) return 'commercial'
  if (competitionLevel === 'MEDIUM') return 'informational'
  return 'informational'
}

function extractTrend(monthly: MonthlySearch[] | null): number[] {
  if (!monthly || monthly.length === 0) return Array(12).fill(0)
  const sorted = [...monthly].sort((a, b) =>
    a.year !== b.year ? a.year - b.year : a.month - b.month
  )
  return sorted.slice(-12).map((m) => m.search_volume)
}

function mapToKeyword(item: CompetitorKeywordItem, index: number): Keyword {
  const info = item.keyword_info
  const volume = info?.search_volume ?? 0
  const difficulty = Math.round((info?.competition ?? 0) * 100)
  const trend = extractTrend(info?.monthly_searches ?? null)
  const intent = inferIntent(info?.competition_level ?? null, info?.cpc ?? null)
  const rankEntry = item.items?.[0]
  const currentRank = rankEntry?.rank_group

  return {
    id: `dfs-${index}-${item.keyword.replace(/\s+/g, '-')}`,
    keyword: item.keyword,
    volume,
    difficulty,
    intent,
    status: currentRank ? 'ranking' : 'opportunity',
    trend,
    currentRank: currentRank ?? undefined,
  }
}

export async function GET(request: Request) {
  const session = await getServerSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const domain = searchParams.get('domain')

  if (!domain) {
    return NextResponse.json({ error: 'domain query param required' }, { status: 400 })
  }

  try {
    const items = await dataForSEO.getCompetitorKeywords(domain)
    const keywords: Keyword[] = items.map(mapToKeyword)
    return NextResponse.json({ keywords })
  } catch (err) {
    console.error('[DataForSEO] getCompetitorKeywords failed:', err)
    return NextResponse.json(
      { error: 'DataForSEO request failed', detail: String(err) },
      { status: 502 }
    )
  }
}
