'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Project {
  id: number
  title: string
  description: string
  image_url?: string
  technologies: string
  github_url?: string
  live_url?: string
  featured: boolean
  created_at: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    try {
      setLoading(true)
      const response = await fetch('/api/projects')
      if (!response.ok) throw new Error('Failed to fetch projects')
      const data = await response.json()
      setProjects(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Header */}
      <section className="bg-secondary py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">My Projects</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A collection of projects showcasing my skills in web development, design, and problem-solving.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="flex-1 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p className="mt-4 text-muted-foreground">Loading projects...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center text-red-600">
                <p>Error: {error}</p>
              </div>
            </div>
          ) : projects.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <p className="text-muted-foreground mb-4">No projects yet. Check back soon!</p>
                <Link href="/" className="text-primary hover:underline">
                  Back to Home
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-lg border border-border bg-background overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Project Image */}
                  {project.image_url ? (
                    <div className="w-full h-48 overflow-hidden">
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-primary to-accent opacity-10 flex items-center justify-center">
                      <svg className="w-16 h-16 text-primary opacity-20" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.3A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                      </svg>
                    </div>
                  )}

                  {/* Project Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
                      {project.featured && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 px-2 py-1 rounded">
                          Featured
                        </span>
                      )}
                    </div>

                    <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

                    {/* Technologies */}
                    {project.technologies && (
                      <div className="flex gap-2 flex-wrap mb-4">
                        {project.technologies.split(',').map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Links */}
                    <div className="flex gap-2 pt-4 border-t border-border">
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 text-center px-3 py-2 rounded bg-secondary hover:bg-muted transition-colors text-sm font-medium"
                        >
                          GitHub
                        </a>
                      )}
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 text-center px-3 py-2 rounded bg-primary text-primary-foreground hover:opacity-90 transition-opacity text-sm font-medium"
                        >
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
