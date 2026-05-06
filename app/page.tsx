import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left side - Text */}
            <div className="space-y-6">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
                  Hi, I&apos;m a Developer
                </h1>
                <p className="text-xl text-muted-foreground">
                  Crafting beautiful, modern web applications with cutting-edge technologies. Passionate about creating user-centric solutions.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                >
                  View My Work
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border text-foreground font-semibold hover:bg-secondary transition-colors"
                >
                  Get In Touch
                </Link>
              </div>

              {/* Skills Preview */}
              <div className="pt-8">
                <p className="text-sm font-semibold text-muted-foreground mb-4">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {['Next.js', 'React', 'TypeScript', 'Tailwind', 'PostgreSQL'].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full bg-secondary text-foreground text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side - Image placeholder */}
            <div className="flex items-center justify-center">
              <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-primary to-accent opacity-10 flex items-center justify-center">
                <div className="text-center">
                  <svg
                    className="w-24 h-24 text-primary opacity-20 mx-auto mb-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 7H7v6h6V7z" />
                    <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2V2a1 1 0 112 0v1h1a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v1a2 2 0 01-2 2h-1v1a1 1 0 11-2 0v-1h-2v1a1 1 0 11-2 0v-1H9a2 2 0 01-2-2v-1H6a1 1 0 110-2h1v-2H6a1 1 0 110-2h1V9H6a1 1 0 110-2h1V6H6a1 1 0 110-2h1V3a2 2 0 012-2h1V2a1 1 0 112 0v1h2V2a1 1 0 112 0v1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-muted-foreground">Your Photo Here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Featured Projects</h2>
            <p className="text-lg text-muted-foreground">
              Explore some of my recent work and projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-lg border border-border bg-background overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="w-full h-48 bg-gradient-to-br from-primary to-accent opacity-10 flex items-center justify-center">
                  <svg className="w-16 h-16 text-primary opacity-20" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.3A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">Project Title</h3>
                  <p className="text-muted-foreground mb-4">
                    Brief description of the project and its key features.
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-xs bg-muted px-2 py-1 rounded">React</span>
                    <span className="text-xs bg-muted px-2 py-1 rounded">Next.js</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border text-foreground font-semibold hover:bg-muted transition-colors"
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
