export type HealthIssue = {
  id: string
  type: 'broken_link' | 'missing_canonical' | 'slow_page' | 'missing_meta'
  severity: 'high' | 'medium' | 'low'
  url: string
  description: string
}

export const siteHealthService = {
  async getIssues(): Promise<HealthIssue[]> {
    await new Promise((r) => setTimeout(r, 500))
    return [
      { id: 'h1', type: 'broken_link', severity: 'high', url: '/blog/old-post', description: 'Returns 404' },
      { id: 'h2', type: 'broken_link', severity: 'high', url: '/resources/guide', description: 'Returns 404' },
      { id: 'h3', type: 'missing_canonical', severity: 'medium', url: '/blog/gst-guide?utm=twitter', description: 'Missing canonical tag' },
    ]
  },
}
