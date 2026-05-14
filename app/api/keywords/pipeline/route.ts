import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { runKeywordPipeline } from '@/services/keywords.service'

export async function POST(request: Request) {
  const session = await getServerSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { seeds, options } = await request.json()

  if (!Array.isArray(seeds) || seeds.length === 0) {
    return NextResponse.json({ error: 'seeds array required' }, { status: 400 })
  }
  if (seeds.length > 20) {
    return NextResponse.json({ error: 'max 20 seed keywords per run' }, { status: 400 })
  }

  try {
    const result = await runKeywordPipeline(seeds, options ?? {})
    return NextResponse.json(result)
  } catch (err) {
    console.error('[Pipeline] failed:', err)
    return NextResponse.json(
      { error: 'Pipeline failed', detail: String(err) },
      { status: 502 }
    )
  }
}
