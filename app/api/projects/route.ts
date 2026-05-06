import { query } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

// GET all projects
export async function GET() {
  try {
    const result = await query(
      'SELECT * FROM projects ORDER BY featured DESC, created_at DESC'
    )
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

// POST new project (admin only)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, description, image_url, technologies, github_url, live_url, featured } = body

    // Validate admin
    const authHeader = req.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const result = await query(
      `INSERT INTO projects (title, description, image_url, technologies, github_url, live_url, featured)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [title, description, image_url, technologies, github_url, live_url, featured || false]
    )

    return NextResponse.json(result.rows[0], { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}
