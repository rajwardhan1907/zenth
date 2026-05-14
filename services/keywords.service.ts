import 'server-only'
import type {
  EnrichedKeyword,
  KeywordCluster,
  KeywordIntent,
  PipelineOptions,
  PipelineResult,
} from '@/types/keyword'

// ─── Public API ───────────────────────────────────────────────────────────────

export async function runKeywordPipeline(
  seeds: string[],
  options: PipelineOptions = {}
): Promise<PipelineResult> {
  const startTime = Date.now()

  const opts: Required<PipelineOptions> = {
    locationCode:  options.locationCode  ?? 2356,
    languageCode:  options.languageCode  ?? 'en',
    maxExpansions: options.maxExpansions ?? 100,
    minVolume:     options.minVolume     ?? 50,
    maxDifficulty: options.maxDifficulty ?? 80,
    maxClusters:   options.maxClusters   ?? 20,
  }

  // Step 1 — Expand seeds into raw keyword list
  const expanded = await expandSeeds(seeds, opts)

  // Step 2 — Enrich with volume, difficulty, CPC
  const enriched = await enrichKeywords(expanded, opts)

  // Step 3 — Filter below thresholds
  const filtered = filterKeywords(enriched, opts)

  // Step 4 — Classify intent + cluster semantically via Claude
  const clusters = await clusterWithClaude(filtered, seeds)

  // Step 5 — Score and rank clusters
  const ranked = rankClusters(clusters)

  // Step 6 — Cap to maxClusters
  const final = ranked.slice(0, opts.maxClusters)

  return {
    clusters:               final,
    totalKeywordsProcessed: filtered.length,
    totalClustersFound:     clusters.length,
    processingTimeMs:       Date.now() - startTime,
    seeds,
  }
}

// ─── Step 1: expandSeeds ─────────────────────────────────────────────────────

async function expandSeeds(
  seeds: string[],
  opts: Required<PipelineOptions>
): Promise<string[]> {
  const { dataForSEO } = await import('./dataforseo.service')

  // Expand seeds in parallel batches of 3 to respect rate limits
  const batches = chunkArray(seeds, 3)
  const allRelated: string[] = [...seeds]

  for (const batch of batches) {
    const results = await Promise.all(
      batch.map(seed =>
        dataForSEO.getRelatedKeywords(
          seed,
          opts.locationCode,
          opts.languageCode,
          opts.maxExpansions
        )
      )
    )
    for (const items of results) {
      for (const item of items) {
        if (item.keyword && !allRelated.includes(item.keyword)) {
          allRelated.push(item.keyword)
        }
      }
    }
  }

  // Deduplicate and cap at 5000 to stay within DataForSEO limits
  return Array.from(new Set(allRelated)).slice(0, 5000)
}

// ─── Step 2: enrichKeywords ───────────────────────────────────────────────────

async function enrichKeywords(
  keywords: string[],
  opts: Required<PipelineOptions>
): Promise<EnrichedKeyword[]> {
  const { dataForSEO } = await import('./dataforseo.service')

  const rawData = await dataForSEO.getKeywordData(
    keywords,
    opts.locationCode,
    opts.languageCode
  )

  return rawData
    .filter(k => k.search_volume !== null && k.search_volume > 0)
    .map(k => {
      const volume      = k.search_volume ?? 0
      const difficulty  = estimateDifficulty(k.competition ?? 0, k.cpc ?? 0)
      const opportunity = volume * (1 - difficulty / 100)

      const trend = k.monthly_searches
        ? k.monthly_searches.slice(-12).map(m => m.search_volume)
        : []

      return {
        keyword:          k.keyword,
        searchVolume:     volume,
        difficulty,
        cpc:              k.cpc ?? 0,
        competition:      k.competition ?? 0,
        intent:           'informational' as KeywordIntent, // overwritten in Step 4
        monthlyTrend:     trend,
        opportunityScore: opportunity,
      }
    })
}

// Estimate difficulty 0–100 from competition (0–1) and CPC.
// DataForSEO does not return keyword difficulty directly on the search_volume endpoint.
function estimateDifficulty(competition: number, cpc: number): number {
  const cpcScore = Math.min(cpc / 10, 1) // CPC > ₹10 → max difficulty contribution
  return Math.round((competition * 0.7 + cpcScore * 0.3) * 100)
}

// ─── Step 3: filterKeywords ───────────────────────────────────────────────────

function filterKeywords(
  keywords: EnrichedKeyword[],
  opts: Required<PipelineOptions>
): EnrichedKeyword[] {
  return keywords.filter(
    k => k.searchVolume >= opts.minVolume && k.difficulty <= opts.maxDifficulty
  )
}

// ─── Step 4: clusterWithClaude ────────────────────────────────────────────────

async function clusterWithClaude(
  keywords: EnrichedKeyword[],
  seeds: string[]
): Promise<KeywordCluster[]> {
  const Anthropic = (await import('@anthropic-ai/sdk')).default
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  const batches = chunkArray(keywords, 150)
  const allClusters: KeywordCluster[] = []

  for (const batch of batches) {
    const keywordList = batch
      .map(k => `${k.keyword} | vol:${k.searchVolume} | diff:${k.difficulty}`)
      .join('\n')

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [{
        role: 'user',
        content: `You are an SEO strategist. Analyze these keywords and group them into semantic clusters for content planning.

Seeds the site is targeting: ${seeds.join(', ')}

Keywords (keyword | monthly search volume | difficulty 0-100):
${keywordList}

Return a JSON array of clusters. Each cluster must have:
{
  "name": "short cluster label (3-5 words)",
  "intent": "informational" | "commercial" | "transactional" | "navigational",
  "contentAngle": "one sentence explaining what angle to take for content",
  "suggestedTitle": "an H1 title that would rank for this cluster",
  "keywords": ["keyword1", "keyword2", ...]
}

Rules:
- Group by search intent AND semantic similarity
- Each cluster should have 2–8 keywords
- Standalone keywords that don't fit any cluster go into a misc cluster
- Prefer fewer, more focused clusters over many small ones
- Return ONLY valid JSON, no explanation, no markdown fences`,
      }],
    })

    const text = message.content[0].type === 'text' ? message.content[0].text : ''

    let parsed: Array<{
      name: string
      intent: KeywordIntent
      contentAngle: string
      suggestedTitle: string
      keywords: string[]
    }> = []

    try {
      parsed = JSON.parse(text)
    } catch {
      console.warn('[Keywords] Claude returned invalid JSON for batch, skipping')
      continue
    }

    for (const cluster of parsed) {
      const clusterKeywords = cluster.keywords
        .map(kw => batch.find(e => e.keyword === kw))
        .filter((k): k is EnrichedKeyword => k !== undefined)
        .map(k => ({ ...k, intent: cluster.intent })) // apply Claude's intent classification

      if (clusterKeywords.length === 0) continue

      const sortedByVolume = [...clusterKeywords].sort(
        (a, b) => b.searchVolume - a.searchVolume
      )

      const totalVolume     = clusterKeywords.reduce((s, k) => s + k.searchVolume, 0)
      const avgDifficulty   = Math.round(
        clusterKeywords.reduce((s, k) => s + k.difficulty, 0) / clusterKeywords.length
      )
      const opportunityScore = clusterKeywords.reduce((s, k) => s + k.opportunityScore, 0)

      allClusters.push({
        id:                 slugify(cluster.name),
        name:               cluster.name,
        intent:             cluster.intent,
        primaryKeyword:     sortedByVolume[0],
        supportingKeywords: sortedByVolume.slice(1),
        totalVolume,
        avgDifficulty,
        opportunityScore,
        contentAngle:       cluster.contentAngle,
        suggestedTitle:     cluster.suggestedTitle,
        rank:               0, // set in Step 5
      })
    }
  }

  return allClusters
}

// ─── Step 5: rankClusters ─────────────────────────────────────────────────────

function rankClusters(clusters: KeywordCluster[]): KeywordCluster[] {
  if (clusters.length === 0) return []

  const maxOpp = Math.max(...clusters.map(c => c.opportunityScore), 1)
  const maxVol = Math.max(...clusters.map(c => c.totalVolume), 1)

  const scored = clusters.map(c => ({
    ...c,
    _score:
      (c.opportunityScore / maxOpp) * 0.6 +
      (c.totalVolume      / maxVol) * 0.4,
  }))

  return scored
    .sort((a, b) => b._score - a._score)
    .map((c, i) => {
      const { _score, ...rest } = c
      return { ...rest, rank: i + 1 }
    })
}

// ─── Utilities ───────────────────────────────────────────────────────────────

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size))
  return chunks
}

function slugify(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}
