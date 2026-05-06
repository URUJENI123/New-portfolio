import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export default function AboutPage() {
  const skills = [
    { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
    { category: 'Backend', items: ['Node.js', 'PostgreSQL', 'REST APIs', 'Serverless'] },
    { category: 'Tools', items: ['Git', 'Docker', 'VS Code', 'Vercel'] },
  ]

  const experience = [
    {
      role: 'Senior Developer',
      company: 'Tech Company',
      duration: '2022 - Present',
      description: 'Led development of modern web applications using Next.js and React.',
    },
    {
      role: 'Full Stack Developer',
      company: 'Another Tech',
      duration: '2020 - 2022',
      description: 'Built and maintained web applications and APIs.',
    },
    {
      role: 'Junior Developer',
      company: 'Startup',
      duration: '2019 - 2020',
      description: 'Started my career building web applications.',
    },
  ]

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Header */}
      <section className="bg-secondary py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">About Me</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Learn more about my background, skills, and experience in web development.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="flex-1 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Bio */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Who I Am</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  I&apos;m a passionate full-stack developer with a love for creating beautiful, functional web applications. With over 5 years of experience in the industry, I&apos;ve had the opportunity to work on diverse projects ranging from startups to enterprise solutions.
                </p>
                <p>
                  My expertise spans across modern web technologies, with a particular focus on React, Next.js, and TypeScript. I believe in writing clean, maintainable code and creating user experiences that delight.
                </p>
                <p>
                  When I&apos;m not coding, you can find me contributing to open-source projects, writing technical articles, or exploring new technologies.
                </p>
              </div>
            </div>

            {/* Profile Image Placeholder */}
            <div className="flex items-center justify-center">
              <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-primary to-accent opacity-10 flex items-center justify-center">
                <svg className="w-24 h-24 text-primary opacity-20" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-foreground mb-12">Skills & Technologies</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {skills.map((skillGroup) => (
                <div
                  key={skillGroup.category}
                  className="p-6 rounded-lg border border-border bg-secondary"
                >
                  <h3 className="text-xl font-bold text-foreground mb-4">{skillGroup.category}</h3>
                  <ul className="space-y-3">
                    {skillGroup.items.map((skill) => (
                      <li key={skill} className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        <span className="text-muted-foreground">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-12">Experience</h2>
            <div className="space-y-8">
              {experience.map((exp, idx) => (
                <div key={idx} className="border-l-4 border-primary pl-6 pb-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                    <span className="text-sm text-muted-foreground">{exp.duration}</span>
                  </div>
                  <p className="text-primary font-semibold mb-3">{exp.company}</p>
                  <p className="text-muted-foreground">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
