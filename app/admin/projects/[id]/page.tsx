'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

interface Project {
  id?: number
  title: string
  description: string
  image_url: string
  technologies: string
  github_url: string
  live_url: string
  featured: boolean
}

export default function ProjectFormPage() {
  const router = useRouter()
  const params = useParams()
  const projectId = params.id as string
  const isNew = projectId === 'new'

  const [formData, setFormData] = useState<Project>({
    title: '',
    description: '',
    image_url: '',
    technologies: '',
    github_url: '',
    live_url: '',
    featured: false,
  })

  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getAuthHeader = () => {
    const token = sessionStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
      return null
    }
    return `Bearer ${token}`
  }

  useEffect(() => {
    if (!isNew) {
      fetchProject()
    }
  }, [isNew, projectId])

  async function fetchProject() {
    try {
      setLoading(true)
      const response = await fetch(`/api/projects/${projectId}`)
      if (!response.ok) throw new Error('Failed to fetch project')
      const data = await response.json()
      setFormData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch project')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const authHeader = getAuthHeader()
      if (!authHeader) return

      const url = isNew ? '/api/projects' : `/api/projects/${projectId}`
      const method = isNew ? 'POST' : 'PUT'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          authorization: authHeader,
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to save project')

      router.push('/admin/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save project')
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-secondary border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/admin/dashboard" className="font-bold text-2xl text-primary">
            Portfolio Admin
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-6">
          <Link
            href="/admin/dashboard"
            className="text-primary hover:underline text-sm font-medium"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-8">
          {isNew ? 'Add New Project' : 'Edit Project'}
        </h1>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-2 text-muted-foreground">Loading...</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-secondary border border-border rounded-lg p-8 space-y-6">
            {error && (
              <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700">
                <p className="text-red-800 dark:text-red-100 font-medium">{error}</p>
              </div>
            )}

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-foreground mb-2">
                Project Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-foreground mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              ></textarea>
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="image_url" className="block text-sm font-semibold text-foreground mb-2">
                Image URL
              </label>
              <input
                type="url"
                id="image_url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Technologies */}
            <div>
              <label htmlFor="technologies" className="block text-sm font-semibold text-foreground mb-2">
                Technologies (comma separated)
              </label>
              <input
                type="text"
                id="technologies"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                placeholder="React, Next.js, TypeScript"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* GitHub URL */}
            <div>
              <label htmlFor="github_url" className="block text-sm font-semibold text-foreground mb-2">
                GitHub URL
              </label>
              <input
                type="url"
                id="github_url"
                name="github_url"
                value={formData.github_url}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Live URL */}
            <div>
              <label htmlFor="live_url" className="block text-sm font-semibold text-foreground mb-2">
                Live Demo URL
              </label>
              <input
                type="url"
                id="live_url"
                name="live_url"
                value={formData.live_url}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Featured */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-4 h-4 rounded border-border"
              />
              <label htmlFor="featured" className="text-sm font-semibold text-foreground cursor-pointer">
                Mark as Featured Project
              </label>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                {saving ? 'Saving...' : 'Save Project'}
              </button>
              <Link
                href="/admin/dashboard"
                className="flex-1 px-6 py-3 rounded-lg border border-border text-foreground font-semibold hover:bg-secondary transition-colors text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        )}
      </div>
    </main>
  )
}
