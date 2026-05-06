import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 py-20 bg-gradient-to-b from-primary via-primary to-background">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left side - Text */}
            <div className="space-y-8">
              <div>
                <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-4 leading-tight">
                  Breathing life into code
                </h1>
                <p className="text-lg text-gray-300">
                  Full-stack developer creating innovative digital solutions
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-md bg-gray-950 text-white font-semibold hover:bg-gray-900 transition-colors border border-gray-800"
                >
                  View Work
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-md border-2 border-accent text-accent font-semibold hover:bg-accent hover:text-primary transition-colors"
                >
                  Reach us
                </Link>
              </div>

              {/* Skills Preview */}
              <div className="pt-8">
                <p className="text-sm font-semibold text-accent mb-4 uppercase tracking-wider">Tech Stack</p>
                <div className="flex flex-wrap gap-3">
                  {['Next.js', 'React', 'TypeScript', 'PostgreSQL'].map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 rounded-md border border-accent text-accent text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side - Decorative element */}
            <div className="hidden md:flex items-center justify-center">
              <div className="relative w-full aspect-square">
                <div className="absolute inset-0 rounded-3xl border-2 border-accent opacity-30 animate-pulse"></div>
                <div className="absolute inset-8 rounded-2xl border border-accent opacity-20"></div>
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-32 h-32 rounded-2xl border-4 border-accent flex items-center justify-center mx-auto">
                      <span className="text-6xl font-bold text-accent">/</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-5xl font-bold text-foreground mb-4">Our services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '💡', title: 'Web Development', description: 'Modern, responsive applications' },
              { icon: '⚡', title: 'Performance', description: 'Optimized for speed' },
              { icon: '🔒', title: 'Security', description: 'Best practices & standards' },
              { icon: '📱', title: 'Mobile Ready', description: 'Works on all devices' },
            ].map((service, i) => (
              <div
                key={i}
                className="group rounded-lg border border-muted bg-white dark:bg-gray-900 overflow-hidden hover:border-accent transition-all hover:shadow-lg"
              >
                <div className="w-full h-32 bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-accent group-hover:bg-opacity-10 transition-colors">
                  <span className="text-5xl">{service.icon}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-3xl font-bold text-foreground mb-4">Featured Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="rounded-lg border border-muted bg-white dark:bg-gray-900 overflow-hidden hover:border-accent transition-all"
                >
                  <div className="w-full h-48 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                    <svg className="w-16 h-16 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.3A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                    </svg>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">Project {i}</h3>
                    <p className="text-muted-foreground mb-4">
                      Innovative solution with modern technologies
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <span className="text-xs bg-muted px-3 py-1 rounded-full text-foreground">React</span>
                      <span className="text-xs bg-muted px-3 py-1 rounded-full text-foreground">Next.js</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-8 py-3 rounded-md border-2 border-accent text-accent font-semibold hover:bg-accent hover:text-primary transition-colors"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
