'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Project {
  id: number
  title: string
  description: string
  technologies: string
  featured: boolean
}

interface Message {
  id: number
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  created_at: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'projects' | 'messages' | 'analytics'>('projects')
  const [projects, setProjects] = useState<Project[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
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
    const token = sessionStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
      return
    }
    fetchData()
  }, [activeTab, router])

  async function fetchData() {
    try {
      setLoading(true)
      setError(null)

      const authHeader = getAuthHeader()
      if (!authHeader) return

      if (activeTab === 'projects') {
        const response = await fetch('/api/projects', {
          headers: { authorization: authHeader },
        })
        if (!response.ok) throw new Error('Failed to fetch projects')
        const data = await response.json()
        setProjects(data)
      } else if (activeTab === 'messages') {
        const response = await fetch('/api/contact', {
          headers: { authorization: authHeader },
        })
        if (!response.ok) throw new Error('Failed to fetch messages')
        const data = await response.json()
        setMessages(data)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken')
    router.push('/admin/login')
  }

  const handleDeleteProject = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      const authHeader = getAuthHeader()
      if (!authHeader) return

      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: { authorization: authHeader },
      })

      if (!response.ok) throw new Error('Failed to delete project')
      setProjects(projects.filter((p) => p.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete project')
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-secondary border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="font-bold text-2xl text-primary">
            Portfolio Admin
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          {(['projects', 'messages', 'analytics'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {error && (
          <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 mb-8">
            <p className="text-red-800 dark:text-red-100 font-medium">{error}</p>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">Manage Projects</h2>
              <Link
                href="/admin/projects/new"
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
              >
                Add Project
              </Link>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <p className="mt-2 text-muted-foreground">Loading projects...</p>
                </div>
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No projects yet</p>
                <Link
                  href="/admin/projects/new"
                  className="text-primary hover:underline"
                >
                  Create your first project
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border border-border rounded-lg overflow-hidden">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="px-6 py-3 text-left font-semibold text-foreground">Title</th>
                      <th className="px-6 py-3 text-left font-semibold text-foreground">Technologies</th>
                      <th className="px-6 py-3 text-left font-semibold text-foreground">Featured</th>
                      <th className="px-6 py-3 text-left font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project) => (
                      <tr key={project.id} className="border-t border-border">
                        <td className="px-6 py-4 font-medium text-foreground">{project.title}</td>
                        <td className="px-6 py-4 text-muted-foreground">{project.technologies}</td>
                        <td className="px-6 py-4">
                          {project.featured ? (
                            <span className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 px-2 py-1 rounded">
                              Yes
                            </span>
                          ) : (
                            <span className="text-xs bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100 px-2 py-1 rounded">
                              No
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 flex gap-2">
                          <Link
                            href={`/admin/projects/${project.id}`}
                            className="text-primary hover:underline text-sm font-medium"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="text-red-600 hover:underline text-sm font-medium"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Contact Messages</h2>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <p className="mt-2 text-muted-foreground">Loading messages...</p>
                </div>
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No messages yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="border border-border rounded-lg p-6 bg-secondary">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-foreground">{message.name}</h3>
                        <p className="text-sm text-muted-foreground">{message.email}</p>
                      </div>
                      {!message.read && (
                        <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 px-2 py-1 rounded">
                          New
                        </span>
                      )}
                    </div>
                    <p className="font-semibold text-foreground mb-2">{message.subject}</p>
                    <p className="text-muted-foreground mb-2">{message.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(message.created_at).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Analytics</h2>
            <div className="bg-secondary border border-border rounded-lg p-8">
              <p className="text-muted-foreground">
                Analytics tracking is set up. All page views and events are being logged to your database. Visit the database admin panel to view detailed analytics.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
