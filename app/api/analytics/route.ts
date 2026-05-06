import { query } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { page, eventType, data } = body

    const ipAddress = req.headers.get('x-forwarded-for') || 'unknown'
    const userAgent = req.headers.get('user-agent') || 'unknown'

    await query(
      `INSERT INTO analytics (page, event_type, data, ip_address, user_agent)
       VALUES ($1, $2, $3, $4, $5)`,
      [page, eventType, JSON.stringify(data || {}), ipAddress, userAgent]
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error tracking event:', error)
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    )
  }
}

// GET analytics (admin only)
export async function GET(req: NextRequest) {
  try {
    // Validate admin
    const authHeader = req.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const page = searchParams.get('page')

    let sql = `
      SELECT 
        page,
        event_type,
        COUNT(*) as count,
        DATE(created_at) as date
      FROM analytics
    `
    const params: any[] = []

    if (page) {
      sql += ' WHERE page = $1'
      params.push(page)
    }

    sql += ' GROUP BY page, event_type, DATE(created_at) ORDER BY date DESC'

    const result = await query(sql, params)
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
