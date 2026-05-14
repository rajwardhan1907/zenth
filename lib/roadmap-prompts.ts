export type RoadmapTask = {
  id: string
  name: string
  desc: string
  tags: string[]
  prompt: string
}

export type RoadmapPhase = {
  id: string
  name: string
  color: string
  tasks: RoadmapTask[]
}

export const ROADMAP_PROMPTS: RoadmapPhase[] = [
  {
    id: 'foundation',
    name: 'Phase 1 — Foundation',
    color: '#6366f1',
    tasks: [
      {
        id: 'f1',
        name: 'Project scaffold',
        desc: 'Next.js 14 App Router + Tailwind + Zustand + Framer Motion base setup',
        tags: ['infra'],
        prompt: `Scaffold a Next.js 14 App Router project called "Zenth" with the following stack:
- Tailwind CSS (with custom CSS variable tokens for theming)
- Zustand for client state
- Framer Motion for animations
- TypeScript strict mode
- Path alias @/ pointing to project root
- Folder structure: app/, components/, hooks/, store/, lib/, config/, types/, mock/, utils/
- globals.css with :root CSS variables: --accent, --accent-bg, --accent-border, --surface, --border, --text-primary, --text-secondary, --text-tertiary, --page-bg
- A glass UI system: .glass, .glass-sidebar, .glass-topbar utility classes in globals.css
- Install: framer-motion, zustand, lucide-react, sonner, clsx, tailwind-merge
Do not create any pages yet — just the base structure and config files.`,
      },
      {
        id: 'f2',
        name: 'Design system components',
        desc: 'Button, Badge, Card, Input, Textarea, Toggle primitives with glass styling',
        tags: ['ui'],
        prompt: `Create the following reusable UI primitives in components/ui/:

Button.tsx — variants: primary | secondary | ghost | danger. Sizes: sm | md | lg. Props: loading (spinner), disabled. Uses Framer Motion whileTap scale. Ripple effect on click via injected <span>.

Badge.tsx — variants: accent | success | warning | muted. Tiny pill, 10–11px font.

Card.tsx — glass surface (bg-white/60 backdrop-blur border-white/80 rounded-2xl). Prop: hover (boolean) adds whileHover lift.

Input.tsx — label prop, full-width, rounded-xl, focus ring using --accent-border. Forwarded ref.

Textarea.tsx — same styling as Input, resizable vertically, min-height 100px.

Toggle.tsx — 36×20px pill switch. Checked state background: var(--accent). Animated thumb slides left/right.

All components: 'use client', no default exports, named exports only, TypeScript props interfaces.`,
      },
      {
        id: 'f3',
        name: 'Onboarding flow',
        desc: '4-step wizard: account → product → connect → preferences, saves to localStorage',
        tags: ['ui', 'claude'],
        prompt: `Build a 4-step onboarding wizard at app/onboarding/page.tsx.

Shell component (components/onboarding/OnboardingShell.tsx):
- Two-panel layout: left sidebar (step list) + right content area
- Left panel: logo, title "Welcome to Zenth", subtitle, StepIndicator component
- StepIndicator: vertical list of steps with check/active/pending states
- Right panel: AnimatePresence slide transitions between steps (x: 20 → 0 → -20)
- Footer: Back button (disabled on step 1) + Continue/Launch button
- On last step, Continue becomes "Launch my agent →" and calls launch()

Hook (hooks/useOnboarding.ts):
- State: currentStep, formData (Record<string, unknown>), isLaunching
- next(), back(), updateFormData(data), launch()
- launch(): setIsLaunching(true), save formData to localStorage key 'zenth_onboarding', await 1200ms, router.push('/dashboard')

Steps:
1. Step1Account — firstName, lastName, email, password fields
2. Step2Product — productName, productUrl, targetAudience, mainGoal (select)
3. Step3Connect — Google Search Console connect button (mock), skip option
4. Step4Preferences — publishing frequency (pills), writing tone (pills), article length (pills), auto-publish toggle`,
      },
      {
        id: 'f4',
        name: 'Theme system',
        desc: '5 accent colour themes persisted to localStorage, applied via CSS variables',
        tags: ['ui', 'claude'],
        prompt: `Build a theme system for Zenth with 5 colour themes.

config/themes.ts — define 5 themes (indigo, violet, emerald, rose, amber). Each theme has:
  { name, accentColor, accentBg, accentBorder, accentMuted, orb1, orb2, orb3, gridColor, logoColor }

store/theme.store.ts — Zustand store (no persist middleware):
  { activeTheme: string, setActiveTheme(name) }
  setActiveTheme writes to localStorage key 'zenth_theme' then updates state.

hooks/useTheme.ts — called in layout:
  - On mount: read localStorage 'zenth_theme', call setActiveTheme if found
  - On activeTheme change: apply all theme token CSS variables to document.documentElement

components/theme/ThemeSwitcher.tsx — row of 5 clickable colour swatches (80×64px rounded cards). Active swatch has border + glow ring in accent colour.

components/theme/ThemeProvider.tsx — thin wrapper that calls useTheme(), renders children.

Mount ThemeProvider in app/layout.tsx wrapping all children.`,
      },
    ],
  },
  {
    id: 'dashboard',
    name: 'Phase 2 — Dashboard',
    color: '#8b5cf6',
    tasks: [
      {
        id: 'd1',
        name: 'Dashboard layout',
        desc: 'Sidebar drawer + topbar shell with mobile hamburger support',
        tags: ['ui'],
        prompt: `Build the dashboard shell at app/dashboard/layout.tsx.

Sidebar (components/layout/Sidebar.tsx):
- Fixed left, 240px wide, full height, glass-sidebar class
- Logo area: Zap icon + "Zenth" brand name in accent colour
- Nav items from config/navigation.ts (icon map: lucide-react icons by string key)
- Active link: left 3px accent bar (::before pseudo), accent background tint
- Ripple effect on nav link click
- Bottom section: ThemeSwitcher
- Mobile: hidden by default, slides in via translate-x on isOpen prop
- AnimatePresence dark overlay (bg-black/40) behind sidebar on mobile

Topbar (components/layout/Topbar.tsx):
- Fixed top, left-60 on desktop / left-0 on mobile, glass-topbar class
- Left: hamburger button (md:hidden) + active site pill (Globe icon + domain)
- Right: agent status pill (blinking dot + label), notification bell, avatar circle
- Agent status reads from useAgentStore

Layout:
- sidebarOpen state, pass isOpen/onClose to Sidebar, onMenuOpen to Topbar
- main: ml-0 md:ml-60, pt-14, p-4 md:p-7`,
      },
      {
        id: 'd2',
        name: 'Metric cards',
        desc: 'Organic traffic, keywords ranked, content pieces, health score with trend arrows',
        tags: ['ui'],
        prompt: `Build MetricCard component at components/dashboard/MetricCard.tsx.

Props: metric: { id, label, value, change, changeType: 'up'|'down'|'neutral', suffix?, prefix? }

Card: glass surface, rounded-2xl, p-5, Framer Motion fade+slide in with staggered delay (index * 0.08s)
- Top row: label (12px muted) + icon slot
- Value: large bold number (28px), formatted with formatNumber util
- Bottom row: change badge (arrow up/down in green/red/slate) + "vs last month" label

Mock data in mock/dashboard.mock.ts:
  - Organic Traffic: 48,230 (+12.4%)
  - Keywords Ranked: 1,847 (+8.1%)
  - Content Pieces: 23 (+4 this month)
  - Health Score: 87/100 (-2pts)

Render 4 cards in a grid: grid-cols-2 md:grid-cols-4 gap-4`,
      },
      {
        id: 'd3',
        name: 'Traffic chart',
        desc: 'SVG rising-line animation, 30-day organic traffic with weekend shading',
        tags: ['ui'],
        prompt: `Build TrafficChart at components/dashboard/TrafficChart.tsx.

Pure SVG chart — no external chart library.
- 30-day mock data array (generate realistic organic traffic curve with slight noise)
- SVG polyline for the traffic line, stroke: var(--accent), strokeWidth: 2
- Area fill: gradient from accent/20 to transparent
- Rising line animation via CSS stroke-dasharray/dashoffset (.rising-line class already in globals.css)
- Y-axis: 4 gridlines, muted dashed stroke, labels on left (abbreviated: 10k, 20k)
- X-axis: show every 7th day label
- Hover: invisible rect overlay, vertical crosshair line, tooltip showing date + value
  Tooltip: absolute positioned div, glass surface, date + formatted number
- Weekend columns: subtle rgba(0,0,0,0.03) background rects
- Title "Organic Traffic" top-left, subtitle "Last 30 days" muted`,
      },
      {
        id: 'd4',
        name: 'Agent feed',
        desc: 'Real-time activity stream with icons, relative timestamps, animated entries',
        tags: ['ui', 'claude'],
        prompt: `Build AgentFeed at components/dashboard/AgentFeed.tsx.

Shows a scrollable list of recent agent activity events.

Type: AgentEvent { id, type: 'keyword'|'content'|'rank'|'health'|'publish', message, timestamp: string, meta?: string }

Mock 12 events in mock/dashboard.mock.ts covering: keyword discovery, draft generation, rank changes, health checks, publishes.

Component:
- Glass card, title "Agent Activity" with activity indicator dot (blinking when agent is running)
- Each event row: icon (per type, 16px lucide), message text (13px), relative time (11px muted, right-aligned)
- Stagger animate in on mount: each row fades up with 0.04s delay * index
- Max height 340px, overflow-y auto, custom scrollbar
- Empty state: "Agent is idle" with a sleep icon`,
      },
      {
        id: 'd5',
        name: 'Keyword opportunities widget',
        desc: 'Top 5 quick-win keywords with volume, difficulty badges, and Add to Tracked CTA',
        tags: ['ui'],
        prompt: `Build KeywordOpportunities at components/dashboard/KeywordOpportunities.tsx.

Shows top 5 keyword opportunities — keywords with high volume, low difficulty, not yet ranked.

Type: KeywordOpportunity { id, keyword, volume, difficulty, intent, potentialTraffic }

Mock 5 rows in dashboard.mock.ts.

Component:
- Glass card, title "Keyword Opportunities", subtitle "Quick wins your agent can target next"
- Table-style rows: keyword (bold) | volume pill | difficulty bar (colored: green/amber/red) | intent badge | "Track" ghost button
- Difficulty: thin 40px progress bar, color based on value (≤33 green, ≤66 amber, >66 red)
- Intent badge: same colour system as keywords page (informational/commercial/transactional/navigational)
- "Track" button calls a stub trackKeyword(id) function
- Animate rows in with stagger on mount
- Footer link: "View all keywords →" routes to /dashboard/keywords`,
      },
    ],
  },
  {
    id: 'content',
    name: 'Phase 3 — Content',
    color: '#06b6d4',
    tasks: [
      {
        id: 'c1',
        name: 'Content list page',
        desc: 'Paginated list of AI-generated articles with status badges and filter tabs',
        tags: ['ui', 'claude'],
        prompt: `Build the content approval page at app/dashboard/content/page.tsx.

Shows all AI-generated article drafts that need review.

Hook (hooks/useApprovals.ts):
- State: drafts array (seeded from mock/content.mock.ts), editingId
- Actions: approveDraft(id), skipDraft(id), editDraft(id, newContent)
- approveDraft: sets status to 'approved', fires toast.success("Article approved")
- skipDraft: sets status to 'skipped', fires toast("Skipped")
- totalPending: count of status === 'pending_approval'
- Return all of the above

Page layout:
- PageWrapper with title "Content" subtitle "Review and approve AI-generated articles"
- If no pending drafts: empty state illustration + "The agent is working on new content."
- List of ContentApprovalCard components (one per pending draft)
- AnimatePresence wrapping list so approved/skipped cards animate out`,
      },
      {
        id: 'c2',
        name: 'Approval card',
        desc: 'Expandable card with Outline / SEO Signals / Traffic Forecast tabs',
        tags: ['ui'],
        prompt: `Build ContentApprovalCard at components/content/ContentApprovalCard.tsx.

Props: draft (DraftWithContent), isEditing, onApprove, onSkip, onEditOpen, onEditSave, onEditCancel

Card layout (glass surface, rounded-2xl):
HEADER:
- FileText icon in accent-bg circle + title + keyword badge + word count + relative time

ACTION ROW:
- "Approve" primary button → onApprove()
- "Edit" secondary button → onEditOpen() (hidden when isEditing)
- "Skip" ghost button → onSkip()
- "View details / Collapse" toggle at far right (ChevronDown/Up)

INLINE EDITOR (AnimatePresence, height: 0 → auto):
- Textarea showing draft.content, onChange updates local editValue
- "Save changes" + "Cancel" buttons

EXPANDED SECTION (AnimatePresence):
- Tab bar: Outline | SEO Signals | Traffic Forecast (pill tabs, bg-slate-50/80)
- ArticleOutline.tsx: renders outline array as indented list
- SeoSignals.tsx: shows readability, keyword density, internal links, estimated rank
- TrafficForecast.tsx: SVG sparkline of projected monthly traffic over 6 months
- Publish settings footer: category tag, scheduled date, tag pills`,
      },
      {
        id: 'c3',
        name: 'Content mock data',
        desc: 'Realistic seed data: 3 pending drafts with outlines, SEO signals, forecasts',
        tags: ['claude'],
        prompt: `Create mock/content.mock.ts with 3 realistic content draft objects.

Type ContentItem (types/content.ts):
  id, title, keyword, status: 'pending_approval'|'approved'|'skipped'
  wordCount, createdAt, outline: OutlineSection[]
  seoSignals: { readabilityScore, keywordDensity, internalLinks, estimatedRank }
  trafficForecast: number[] (6 months projected monthly visits)
  publishSettings: { category, tags: string[], scheduledFor?: string }

Three drafts:
1. "How to File GST Returns Online in 2024: Step-by-Step Guide" — keyword: "gst return filing", 2400 words
2. "TDS on Salary: Complete Guide for Employers and Employees" — keyword: "tds on salary", 1800 words
3. "Best Accounting Software for Small Business India 2024" — keyword: "accounting software india", 2100 words

Each should have realistic outlines (4–6 sections), SEO signals (readability 72–85, density 1.2–2.1%), and traffic forecasts ramping from ~200 to ~1400 over 6 months.`,
      },
      {
        id: 'c4',
        name: 'Approval banner',
        desc: 'Dashboard sticky alert showing pending draft count with Review now CTA',
        tags: ['ui'],
        prompt: `Build ApprovalBanner at components/dashboard/ApprovalBanner.tsx.

Props: count (number)

Renders only when count > 0.

Styling:
- Rounded-2xl, background: linear-gradient in accent colours (accent-bg), border: accent-border
- Left: amber warning icon + bold text "{count} article{s} waiting for your approval"
- Right: "Review now →" button (accent primary, size sm) that links to /dashboard/content
- Framer Motion: fade + slight y slide in on mount
- Dismissible: X button sets local dismissed state, AnimatePresence exit animation

In dashboard page: <ApprovalBanner count={totalPending} /> where totalPending comes from useApprovals().`,
      },
      {
        id: 'c5',
        name: 'Bulk actions',
        desc: 'Select all / approve all / skip all with batch state updates and toast summary',
        tags: ['ui', 'claude'],
        prompt: `Add bulk action support to the content approval page.

Changes to hooks/useApprovals.ts:
- Add selectedIds: Set<string> state
- toggleSelect(id), selectAll(), clearSelection()
- approveSelected(): approve all selectedIds, toast.success("Approved {n} articles"), clearSelection()
- skipSelected(): skip all selectedIds, toast("Skipped {n} articles"), clearSelection()

Changes to app/dashboard/content/page.tsx:
- Checkbox on each ContentApprovalCard (top-left corner, only shown when hovering or any selected)
- Bulk action bar — AnimatePresence, slides up from bottom when selectedIds.size > 0:
    "{n} selected" label | "Approve all" button | "Skip all" ghost button | "Clear" link
  Styling: fixed bottom-0 centered, glass surface, rounded-xl, shadow-lg, z-40
- Select all checkbox in page header when drafts exist`,
      },
    ],
  },
  {
    id: 'keywords',
    name: 'Phase 4 — Keywords',
    color: '#10b981',
    tasks: [
      {
        id: 'k1',
        name: 'Keywords table',
        desc: 'Sortable table with volume, KD, intent, status columns and trend sparklines',
        tags: ['ui'],
        prompt: `Build the keywords page at app/dashboard/keywords/page.tsx.

Table columns: Keyword | Volume | Difficulty | Intent | Status | Trend

Keyword type (types/keyword.ts):
  id, keyword, volume, difficulty (0–100), intent: 'informational'|'commercial'|'transactional'|'navigational'
  status: 'opportunity'|'ranking'|'tracked'|'declined', trend: number[] (8 data points), currentRank?: number

Mock 20 keywords in mock/keywords.mock.ts across 4 intent types, mixed difficulty.

Table layout:
- Glass card, grid-based rows (not <table>), sticky header
- DifficultyPill: colored number + Easy/Medium/Hard badge
- Intent badge: coloured pill per intent type
- Sparkline: pure SVG polyline 56×22px per row
- Row hover: subtle white/5 background
- Each row: Framer Motion fade in with stagger delay
- Responsive: overflow-x-auto wrapper on mobile with min-w-[600px] inner`,
      },
      {
        id: 'k2',
        name: 'Live filters',
        desc: 'Search + intent pills + difficulty range sliders, all combinable simultaneously',
        tags: ['ui', 'claude'],
        prompt: `Add interactive filtering to the keywords page.

Hook (hooks/useKeywords.ts):
- State: searchQuery, intentFilter ('all' | KeywordIntent), difficultyRange [min, max]
- filteredKeywords: useMemo combining all three filters with AND logic
- clearFilters() resets all to defaults
- totalCount, filteredCount

Filter bar UI (above table):
- Search input (w-full sm:w-64) with magnifier icon and clear X button
- Intent filter pills: All | Informational | Commercial | Transactional | Navigational
  Active pill: accent fill. Inactive: transparent + border.
- Difficulty range: two range inputs side by side, label "Difficulty: {min} — {max}"
  accentColor: var(--accent) on both sliders
- Result count: "{filtered} of {total} keywords" — far right, muted, sm:ml-auto

Empty state when no results:
- FilterX icon + "No keywords match your filters" + "Try adjusting..." + "Clear filters" link`,
      },
      {
        id: 'k3',
        name: 'Keyword clusters',
        desc: 'Group related keywords visually, toggle between list and cluster view',
        tags: ['ui', 'claude'],
        prompt: `Add cluster view to the keywords page.

A "cluster" is a group of semantically related keywords sharing a root topic.

In mock/keywords.mock.ts, add a cluster field to each keyword (e.g. "gst", "tds", "accounting", "payroll").

Cluster view toggle button in the filter bar (list icon / grid icon, toggles isClusterView state).

Cluster view layout:
- Keywords grouped into cluster cards (glass surface, rounded-2xl)
- Card header: cluster name (bold) + count badge + average difficulty pill
- Keyword rows inside card: compact — keyword | volume | intent dot
- Cards in responsive grid: grid-cols-1 sm:grid-cols-2
- Transition between views: AnimatePresence layout animations

List view (default): unchanged — full table with all columns.

Add clusterFilter state to useKeywords.ts: when set, filter to only that cluster.
Clicking a cluster header in cluster view sets clusterFilter to show those keywords in list view.`,
      },
      {
        id: 'k4',
        name: 'Opportunity score',
        desc: 'Computed composite score combining volume, difficulty, and rank gap',
        tags: ['claude'],
        prompt: `Add an opportunity score to each keyword.

Formula (0–100 scale):
  score = (volumeScore * 0.4) + (difficultyScore * 0.4) + (rankGapScore * 0.2)
  volumeScore   = Math.min(keyword.volume / 500, 100)   // normalized, cap at 500 monthly vol = 100
  difficultyScore = 100 - keyword.difficulty             // lower difficulty = higher score
  rankGapScore  = keyword.currentRank ? Math.max(0, 100 - keyword.currentRank * 2) : 50

Add computeOpportunityScore(keyword: Keyword): number to utils/opportunityScore.ts.

In mock/keywords.mock.ts, add score: computeOpportunityScore(kw) to each keyword.

In the keywords table:
- Add "Score" column after Trend
- Render as a coloured number (≥70 emerald, ≥40 amber, <40 slate) + small circular progress ring SVG
- Make the table sortable by Score descending by default
- Add sort chevron indicators to column headers (click to toggle asc/desc)
- Sort state in useKeywords.ts: sortBy, sortDir`,
      },
    ],
  },
  {
    id: 'integrations',
    name: 'Phase 5 — Integrations',
    color: '#f59e0b',
    tasks: [
      {
        id: 'i1',
        name: 'GSC connector',
        desc: 'OAuth flow stub, fetch clicks/impressions/positions from Search Console API',
        tags: ['api', 'infra'],
        prompt: `Build the Google Search Console integration scaffold.

app/api/integrations/gsc/auth/route.ts — GET handler:
  Redirects to Google OAuth URL with scopes: ['https://www.googleapis.com/auth/webmasters.readonly']
  Use env vars: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXT_PUBLIC_APP_URL
  State param encodes the user's site ID for post-auth callback

app/api/integrations/gsc/callback/route.ts — GET handler:
  Exchanges code for tokens, stores refresh_token in (stubbed) DB, redirects to /dashboard/settings

app/api/integrations/gsc/data/route.ts — GET handler:
  Accepts: siteUrl, startDate, endDate, dimensions[]
  Fetches from https://www.googleapis.com/webmasters/v3/sites/{siteUrl}/searchAnalytics/query
  Returns: rows with keys (query, page, date), clicks, impressions, ctr, position
  Error handling: 401 → refresh token flow, 403 → scope error message

Types in types/gsc.ts: GscRow, GscQueryParams, GscResponse
Mock response in mock/gsc.mock.ts for development`,
      },
      {
        id: 'i2',
        name: 'GA4 connector',
        desc: 'Service account auth, pull sessions, conversions, and page-level traffic',
        tags: ['api', 'infra'],
        prompt: `Build the Google Analytics 4 integration scaffold.

Use GA4 Data API (not Universal Analytics).

app/api/integrations/ga4/report/route.ts — POST handler:
  Body: { propertyId, dateRanges, dimensions, metrics }
  Auth: service account JWT from env var GOOGLE_SERVICE_ACCOUNT_JSON
  Calls https://analyticsdata.googleapis.com/v1beta/properties/{id}:runReport
  Returns: rows with dimension values + metric values

app/api/integrations/ga4/realtime/route.ts — GET handler:
  Returns active users in last 30 minutes
  Calls runRealtimeReport endpoint

Types in types/ga4.ts: GA4ReportRequest, GA4Row, GA4DimensionValue, GA4MetricValue

Helper lib/ga4.ts:
  getServiceAccountToken(): fetches JWT access token using google-auth-library
  buildReportRequest(options): constructs GA4 API request body

Mock data in mock/ga4.mock.ts with realistic page-level sessions and conversions`,
      },
      {
        id: 'i3',
        name: 'WordPress publisher',
        desc: 'REST API publishing: create draft, set categories, upload featured image',
        tags: ['api'],
        prompt: `Build the WordPress publishing integration.

lib/publishers/wordpress.ts:
  class WordPressPublisher {
    constructor(private siteUrl: string, private appPassword: string, private username: string)

    async createDraft(post: WpPostInput): Promise<WpPost>
      POST {siteUrl}/wp-json/wp/v2/posts
      Body: { title, content, status: 'draft', categories, tags, meta }

    async publish(postId: number): Promise<WpPost>
      PATCH {siteUrl}/wp-json/wp/v2/posts/{id} with { status: 'publish' }

    async uploadFeaturedImage(postId: number, imageUrl: string): Promise<void>
      Downloads image, uploads to /wp-json/wp/v2/media, sets _thumbnail_id

    async getCategories(): Promise<WpCategory[]>
      GET {siteUrl}/wp-json/wp/v2/categories
  }

Types in types/wordpress.ts: WpPostInput, WpPost, WpCategory, WpMedia

app/api/publish/wordpress/route.ts — POST handler:
  Validates body (contentId, siteId), fetches content from DB stub, calls WordPressPublisher
  Returns: { postId, postUrl, status }`,
      },
      {
        id: 'i4',
        name: 'Webflow publisher',
        desc: 'Webflow CMS API: create CMS item, set rich text field, publish collection',
        tags: ['api'],
        prompt: `Build the Webflow CMS publishing integration.

lib/publishers/webflow.ts:
  class WebflowPublisher {
    constructor(private apiToken: string, private siteId: string, private collectionId: string)

    async createItem(item: WebflowItemInput): Promise<WebflowItem>
      POST https://api.webflow.com/v2/collections/{collectionId}/items
      Headers: Authorization: Bearer {apiToken}
      Body: { fieldData: { name, slug, post-body, post-summary, tags } }

    async publishItem(itemId: string): Promise<void>
      POST https://api.webflow.com/v2/collections/{collectionId}/items/{itemId}/live

    async getCollections(): Promise<WebflowCollection[]>
      GET https://api.webflow.com/v2/sites/{siteId}/collections
  }

Types in types/webflow.ts: WebflowItemInput, WebflowItem, WebflowCollection

app/api/publish/webflow/route.ts — POST handler mirrors WordPress route structure.

Webflow-specific: convert markdown content to Webflow rich text format (basic: strip markdown, wrap paragraphs in <p> tags).`,
      },
    ],
  },
  {
    id: 'agent',
    name: 'Phase 6 — Agent Logic',
    color: '#ef4444',
    tasks: [
      {
        id: 'a1',
        name: 'Agent state store',
        desc: 'Zustand store for running/idle/error, polling interval, last-run metadata',
        tags: ['claude', 'infra'],
        prompt: `Build the agent state management system.

store/agent.store.ts (Zustand):
  type AgentStatus = 'idle' | 'running' | 'paused' | 'error'

  AgentStore:
    status: AgentStatus
    lastRun: string | null        // ISO timestamp
    currentTask: string | null    // human-readable description of what's running
    tasksCompletedToday: number
    errorMessage: string | null

    setStatus(status, task?): void
    setError(message): void
    incrementTaskCount(): void
    reset(): void

hooks/useAgentPoller.ts:
  - Polls /api/agent/status every 30s when mounted
  - Updates store from response
  - Pauses polling when window is hidden (visibilitychange event)
  - Cleans up interval on unmount

app/api/agent/status/route.ts — GET:
  Returns mock agent status JSON for now
  { status: 'idle', lastRun: ISO, tasksToday: 3, queue: [] }

app/api/agent/trigger/route.ts — POST:
  Stub that sets status to 'running' and returns 202 Accepted`,
      },
      {
        id: 'a2',
        name: 'Keyword discovery pipeline',
        desc: 'Seed keywords → GSC data → cluster → opportunity score → ranked output',
        tags: ['claude', 'api'],
        prompt: `Build the keyword discovery pipeline that the agent runs automatically.

lib/pipelines/keywordDiscovery.ts:

async function runKeywordDiscovery(siteId: string): Promise<DiscoveryResult>
  Steps:
  1. getSeedKeywords(siteId): pull top 20 queries from GSC (last 30 days, impressions > 10)
  2. expandKeywords(seeds): for each seed, generate 5 related long-tail variants using OpenAI
     Prompt: "Generate 5 long-tail keyword variations for '{seed}' targeting Indian SMBs"
  3. enrichKeywords(keywords): for each keyword, call a mock difficulty + volume estimator
     (Real implementation: DataForSEO or Ahrefs API — stub with realistic mock values for now)
  4. clusterKeywords(keywords): group by semantic similarity (simple: shared root word or topic)
  5. scoreKeywords(clusters): apply computeOpportunityScore to each, sort desc
  6. Return top 30 keywords as DiscoveryResult with timestamp and source

Types in types/pipeline.ts: DiscoveryResult, PipelineKeyword, KeywordCluster

app/api/agent/pipeline/keywords/route.ts — POST:
  Calls runKeywordDiscovery, stores result stub, returns summary`,
      },
      {
        id: 'a3',
        name: 'Content brief generator',
        desc: 'Keyword → audience → H2 outline → word count plan via GPT-4 structured output',
        tags: ['claude', 'api'],
        prompt: `Build the content brief generation step of the agent pipeline.

lib/pipelines/briefGenerator.ts:

async function generateBrief(keyword: string, site: SiteContext): Promise<ContentBrief>

  SiteContext: { productName, targetAudience, tone, domain }

  Uses OpenAI chat completions with JSON mode (response_format: { type: 'json_object' })

  System prompt:
    "You are an SEO content strategist for {productName}, a product targeting {targetAudience}.
     Generate a detailed content brief for a blog article."

  User prompt:
    "Target keyword: {keyword}
     Writing tone: {tone}
     Return JSON with:
     { title, metaDescription, targetWordCount, h2Sections: [{heading, points: string[], wordCount}],
       internalLinkOpportunities: string[], faqSection: {question, answer}[] }"

  Parse and validate response, return typed ContentBrief.

ContentBrief type in types/content.ts.

app/api/agent/pipeline/brief/route.ts — POST { keyword, siteId }:
  Fetches site context, calls generateBrief, returns brief + estimated tokens used`,
      },
      {
        id: 'a4',
        name: 'Article writer',
        desc: 'Brief → GPT-4 streaming markdown with SEO meta, saved as pending_approval draft',
        tags: ['claude', 'api'],
        prompt: `Build the article writing step using GPT-4 streaming.

app/api/agent/pipeline/write/route.ts — POST, returns a streaming Response:
  Body: { briefId, siteId }

  Fetches ContentBrief, then calls OpenAI with streaming:
    model: 'gpt-4-turbo-preview'
    stream: true
    messages: [
      { role: 'system', content: '...' },  // persona + tone instructions
      { role: 'user', content: buildWritingPrompt(brief) }
    ]

  Returns a ReadableStream piping the OpenAI stream to the client.
  Transform: parse SSE chunks, extract delta content, forward as text/event-stream.

lib/pipelines/articleWriter.ts:
  buildWritingPrompt(brief: ContentBrief): string
    Constructs a detailed prompt with: outline, section targets, SEO requirements,
    internal linking instructions, FAQ integration, meta description target.

  saveArticleDraft(articleMarkdown: string, brief: ContentBrief, siteId: string): Promise<ContentItem>
    Parses markdown, extracts word count, creates ContentItem with status: 'pending_approval'

hooks/useArticleStream.ts — React hook:
  Calls the write endpoint with fetch + ReadableStream, appends chunks to state, returns { content, isStreaming, error }`,
      },
      {
        id: 'a5',
        name: 'Auto-scheduler',
        desc: 'Agent picks publish times based on content calendar gaps and audience timezone',
        tags: ['claude', 'api'],
        prompt: `Build the auto-scheduling system for the agent.

lib/pipelines/scheduler.ts:

async function schedulePublish(contentId: string, siteId: string): Promise<ScheduleResult>

  Logic:
  1. getPublishingCalendar(siteId): fetch all scheduled/published items for next 30 days
  2. findGaps(calendar, frequency): given target frequency (e.g. '3x/week'), find days with no content
  3. rankSlots(gaps, siteAnalytics): prefer Tue/Wed/Thu 9–11am in site's audience timezone
     (Use GA4 sessions-by-hour data to find peak engagement times if available)
  4. pickBestSlot(rankedSlots): return top slot as scheduledFor ISO timestamp
  5. updateContentItem(contentId, { scheduledFor }): set the publish time

  Return: { scheduledFor, reasoning: string, alternativeSlots: string[] }

Types in types/scheduler.ts: ScheduleResult, CalendarSlot, PublishFrequency

app/api/agent/schedule/route.ts — POST { contentId, siteId }:
  Calls schedulePublish, returns result with human-readable explanation`,
      },
    ],
  },
  {
    id: 'settings',
    name: 'Phase 7 — Settings',
    color: '#ec4899',
    tasks: [
      {
        id: 's1',
        name: 'Profile section',
        desc: 'Edit name, email, company, timezone, language with optimistic save + toast',
        tags: ['ui', 'claude'],
        prompt: `Build the Profile section of the settings page.

In app/dashboard/settings/page.tsx, the Profile section should:

State: useState initialised from readOnboarding() helper:
  { name, email, company, timezone, language }
  readOnboarding(): reads localStorage 'zenth_onboarding', extracts firstName+lastName, email, productName

Form fields:
  - Full name (Input)
  - Email address (Input, type="email")
  - Company or brand name (Input)
  - Timezone (SelectField, options: India IST, Dubai GST, London GMT, New York EST, Los Angeles PST)
  - Language (SelectField, options: English, Hindi, Marathi, Tamil, Telugu)
  - The timezone and language selects sit in a 2-column grid (grid-cols-1 sm:grid-cols-2)

Save behaviour:
  - "Save profile" button in section header
  - onClick: write updated data back to localStorage 'zenth_onboarding'
  - toast.success("Profile saved") from sonner
  - Optimistic — no API call needed for now`,
      },
      {
        id: 's2',
        name: 'Notifications matrix',
        desc: 'Toggle matrix for 7 notification types: drafts, keywords, rankings, health, etc.',
        tags: ['ui'],
        prompt: `Build the Notifications section of the settings page.

7 notification toggles:
  1. Draft ready for approval — "When the agent generates a new article draft"
  2. Keyword opportunities found — "When new high-value keywords are discovered"
  3. Ranking changes — "When a tracked keyword moves more than 5 positions"
  4. Site health issues — "When critical technical issues are detected"
  5. Weekly summary report — "Every Monday morning — traffic, rankings, wins"
  6. WhatsApp notifications — "Receive approval requests via WhatsApp"
  7. Email digest — "Daily email summary of agent activity"

Each row: label (13px, text-primary) + sub-label (11px, text-secondary) + Toggle component on the right
Rows separated by subtle dividers (0.5px solid rgba(255,255,255,0.4))

State: useState object with all 7 keys, defaults: first 5 true, last 2 false
toggleNotif(key) flips the value.

"Save preferences" button fires toast.success("Notification preferences saved")

Toggle component (components/ui/Toggle.tsx):
  36×20px pill, accent bg when checked, grey when unchecked, animated thumb.`,
      },
      {
        id: 's3',
        name: 'Billing section',
        desc: 'Current plan card, 3 usage meters with fill bars, tier comparison grid',
        tags: ['ui'],
        prompt: `Build the Billing section of the settings page.

config/pricing.ts — 3 tiers:
  Free: ₹0, 2 content pieces/mo, 50 keywords, 1 site
  Growth: ₹2499, 8 content pieces/mo, 200 keywords, 3 sites (current plan)
  Scale: ₹6999, unlimited content, unlimited keywords, 10 sites

Billing section layout:

CURRENT PLAN CARD:
  accent-bg background, accent-border border
  Left: plan name (18px, accent colour) + price (14px, secondary)
  Right: "Active" green badge + "Manage billing" secondary button

USAGE METERS (grid-cols-1 sm:grid-cols-3 gap-4):
  Content pieces: 6/8
  Keywords tracked: 143/200
  Sites: 1/3
  Each meter: label + "{used} / {limit}" + thin progress bar
  Bar colour: accent if < 80%, amber if 80–99%, red if ≥ 100%

UPGRADE PROMPT:
  "Need more? View plans to upgrade to Scale for unlimited keywords and 10 sites."
  "View plans" is a text button in accent colour

TIER COMPARISON (grid-cols-3):
  Three clickable tier cards, current plan highlighted with accent border + bg`,
      },
      {
        id: 's4',
        name: 'Integrations section',
        desc: 'Connect/disconnect rows for GSC, GA4, WordPress, Webflow with status badges',
        tags: ['ui', 'api'],
        prompt: `Build the Integrations section of the settings page.

4 integration rows: Google Search Console | Google Analytics 4 | WordPress | Webflow

Each row:
  - Integration icon (lucide: Search | BarChart2 | Code | Layout) in a 32px circle
  - Name (14px bold) + description (12px muted)
  - Status badge: "Connected" (emerald) or "Not connected" (slate)
  - Action button: "Reconnect" (ghost) if connected, "Connect" (accent) if not

Default state: GSC = connected, others = not connected.
Local useState<Record<string, boolean>> tracks connection state.

"Connect" click:
  For GSC/GA4: in a real build this would redirect to OAuth flow (router.push('/api/integrations/gsc/auth'))
  For WordPress/Webflow: open a modal or inline form (stub for now — just toast.success("Connected!") after 800ms fake delay)

For each integration with isConnected: true, show a "Disconnect" text button that confirms via window.confirm then sets state to false + toast("Disconnected")`,
      },
      {
        id: 's5',
        name: 'Connected sites section',
        desc: 'Site list with GSC status, health score, and add/disconnect controls',
        tags: ['ui', 'api'],
        prompt: `Build the Connected Sites section of the settings page.

Mock site data (1 site connected by default):
  { id: 's1', domain: 'cleartax.in/blog', isConnected: true, gscConnected: true, monthlyTraffic: 48230, healthScore: 87 }

Site row layout:
  - Globe icon in a 32px rounded square (rgba(0,0,0,0.05) bg)
  - Domain name (14px bold, text-primary)
  - Traffic + health metadata (12px muted): "48,230 visits · Health 87/100"
  - Status badge: "Active" (emerald) or "Disconnected" (slate)
  - "Disconnect" ghost button — confirms, then removes from list

"+ Add another site" dashed button below the list:
  Dashed border in accent-muted, full width, rounded-xl
  onClick: opens a small inline form (slide down with AnimatePresence):
    Input for domain URL + "Add site" primary button + Cancel

Form submit: adds site to local list with isConnected: false, healthScore: null, toast.success("Site added — connect GSC to start tracking")`,
      },
    ],
  },
  {
    id: 'production',
    name: 'Phase 8 — Production',
    color: '#64748b',
    tasks: [
      {
        id: 'p1',
        name: 'Error boundaries',
        desc: 'Per-route error.tsx + global fallback UI with retry button and error ID',
        tags: ['infra'],
        prompt: `Add error boundary pages to every dashboard route.

app/error.tsx — global error fallback:
  'use client'
  Props: error: Error & { digest?: string }, reset: () => void
  UI: centered card with AlertTriangle icon (red), "Something went wrong" title,
  error.message in a code block (dev only), error.digest as "Error ID: {digest}" (muted),
  "Try again" button calls reset(), "Go to dashboard" link

app/dashboard/error.tsx — same pattern, scoped to dashboard routes.
Per-route error.tsx files in: app/dashboard/content/, app/dashboard/keywords/, app/dashboard/settings/

app/not-found.tsx:
  Centered layout, large "404" in accent colour, "Page not found" heading,
  "This page doesn't exist or has been moved." subtitle,
  "Back to dashboard" primary button link

app/loading.tsx + app/dashboard/loading.tsx:
  Skeleton screens matching the actual page layout — use animate-pulse on grey rounded blocks
  Dashboard loading: skeleton metric cards (4) + skeleton chart + skeleton feed`,
      },
      {
        id: 'p2',
        name: 'Loading skeletons',
        desc: 'Suspense-based skeletons for all data sections — metric cards, table, chart',
        tags: ['ui'],
        prompt: `Build a comprehensive skeleton loading system.

components/ui/Skeleton.tsx:
  Base Skeleton component: rounded-lg, bg-white/20 (light mode) or rgba(255,255,255,0.08) (dark),
  animate-pulse, accepts className for sizing.
  Variants: SkeletonText (full width, h-4), SkeletonCircle (round), SkeletonCard (glass surface wrapper)

Skeleton components per page section:

MetricCardSkeleton — same dimensions as MetricCard: glass card, skeleton lines for label/value/change

TrafficChartSkeleton — glass card at chart height, wavy skeleton line mimicking a chart

AgentFeedSkeleton — 6 rows: circle skeleton + two lines skeleton each

KeywordTableSkeleton — 8 rows: skeleton cells in same grid proportions as keyword table

ContentCardSkeleton — card shape with skeleton title, badge, action button skeletons

Usage:
  Wrap data components in React Suspense with skeleton fallbacks
  In loading.tsx files, export a layout of skeletons matching the page
  Add ?delay=2000 query param support (dev only) to artificially slow data for testing skeletons`,
      },
      {
        id: 'p3',
        name: 'SEO metadata',
        desc: 'generateMetadata per route, OG images, canonical URLs, robots.txt, sitemap',
        tags: ['infra'],
        prompt: `Add comprehensive SEO metadata to all Zenth routes.

app/layout.tsx:
  export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
    title: { default: 'Zenth — set it. it grows.', template: '%s | Zenth' },
    description: '...',
    openGraph: { type: 'website', images: ['/og-image.png'] },
    twitter: { card: 'summary_large_image' },
  }

Per-route generateMetadata:
  app/dashboard/content/page.tsx — title: 'Content Review'
  app/dashboard/keywords/page.tsx — title: 'Keywords'
  app/dashboard/settings/page.tsx — title: 'Settings'

app/opengraph-image.tsx — Next.js ImageResponse:
  Dark background (#0d0d1a), Zenth logo text in indigo, tagline "set it. it grows."
  Size: 1200×630

app/robots.ts — disallow /dashboard/, /api/, /onboarding/
app/sitemap.ts — include: /, /pricing, /blog (static pages only, no dashboard routes)

Canonical URLs: add <link rel="canonical"> via alternates.canonical in each route's metadata`,
      },
      {
        id: 'p4',
        name: 'Performance audit',
        desc: 'Bundle analysis, image optimisation, Core Web Vitals, lighthouse CI config',
        tags: ['infra'],
        prompt: `Audit and optimise Zenth for production performance.

Bundle analysis:
  Add @next/bundle-analyzer to next.config.js (env-guarded: ANALYZE=true)
  Run: ANALYZE=true pnpm build — identify and fix any large dependencies

next.config.js optimisations:
  images: { formats: ['image/avif', 'image/webp'], deviceSizes: [640, 1080, 1920] }
  compiler: { removeConsole: { exclude: ['error'] } } in production
  experimental: { optimizeCss: true }

Dynamic imports — lazy-load heavy components:
  AnimatedBackground — only needed on landing/onboarding, not dashboard
  TrafficChart SVG — dynamic import with loading skeleton fallback
  PromptPanel (dev-only) — already dynamic with ssr: false

Web Vitals monitoring — app/layout.tsx:
  export function reportWebVitals(metric: NextWebVitalsMetric) {
    if (process.env.NODE_ENV === 'production') {
      // send to analytics endpoint
      console.log(metric)
    }
  }

lighthouse.config.json:
  ci: { collect: { url: ['http://localhost:3000', 'http://localhost:3000/dashboard'] },
        assert: { preset: 'lighthouse:recommended',
                  assertions: { 'categories:performance': ['error', { minScore: 0.85 }] } } }`,
      },
    ],
  },
]
