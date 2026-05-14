import { NextResponse } from 'next/server'
import { dataForSEO } from '@/services/dataforseo.service'
import { getServerSession } from 'next-auth'

export async function POST(request: Request) {
  const session = await getServerSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { keywords, locationCode, languageCode } = await request.json()

  if (!Array.isArray(keywords) || keywords.length === 0) {
    return NextResponse.json({ error: 'keywords array required' }, { status: 400 })
  }

  if (keywords.length > 5000) {
    return NextResponse.json({ error: 'max 5000 keywords per request' }, { status: 400 })
  }

  try {
    const data = await dataForSEO.getKeywordData(keywords, locationCode, languageCode)
    return NextResponse.json({ data })
  } catch (err) {
    console.error('[DataForSEO] getKeywordData failed:', err)
    return NextResponse.json(
      { error: 'DataForSEO request failed', detail: String(err) },
      { status: 502 }
    )
  }
}
