import { query } from './db'

export async function trackEvent(
  page: string,
  eventType: string,
  data?: any,
  ipAddress?: string,
  userAgent?: string
) {
  try {
    await query(
      `
      INSERT INTO analytics (page, event_type, data, ip_address, user_agent)
      VALUES ($1, $2, $3, $4, $5)
    `,
      [
        page,
        eventType,
        JSON.stringify(data || {}),
        ipAddress || 'unknown',
        userAgent || 'unknown',
      ]
    )
  } catch (error) {
    console.error('Failed to track event:', error)
  }
}

export async function getAnalytics(page?: string) {
  try {
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
    return result.rows
  } catch (error) {
    console.error('Failed to fetch analytics:', error)
    return []
  }
}
