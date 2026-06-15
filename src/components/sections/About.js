import React from 'react'
import Reveal from '../motion/Reveal'
import Stagger, { StaggerItem } from '../motion/Stagger'

const skillGroups = [
  {
    title: 'Programming Languages',
    items: ['JavaScript (ES6+)', 'TypeScript', 'C#'],
  },
  {
    title: 'Frontend Technologies',
    items: [
      'React.js, Next.js, Remix',
      'Tailwind CSS, React Router',
      'Angular, Vue.js',
    ],
  },
  { title: 'State Management', items: ['Redux', 'RxJS'] },
  {
    title: 'Backend',
    items: [
      'Node.js, tRPC',
      'Prisma, PostgreSQL',
      '.NET (.NET Core / ASP.NET)',
    ],
  },
  {
    title: 'Testing & Tools',
    items: [
      'Jest, Unit Testing',
      'Integration & E2E Testing',
      'Webpack, Rollup, Storybook',
    ],
  },
  {
    title: 'DevOps & Performance',
    items: [
      'Git, GitHub, CircleCI, Buildkite',
      'Lazy Loading, Code Splitting',
      'Tree Shaking, Caching',
    ],
  },
  {
    title: 'AI-Assisted Development',
    items: [
      'AI Coding Agents & Workflows',
      'Claude Skills & Prompt Engineering',
    ],
  },
]

const About = () => (
  <section id="about" className="py-20 bg-gradient-subtle">
    <div className="max-width-container section-padding">
      <Reveal
        as="h2"
        className="mb-16 text-center text-3xl font-bold text-blitz-primary md:text-4xl"
      >
        About Me
      </Reveal>

      <div className="grid items-start gap-12 md:grid-cols-2">
        <Stagger className="space-y-6" stagger={0.12}>
          <StaggerItem
            as="p"
            className="text-lg leading-relaxed text-blitz-charcoal/80"
          >
            Innovative and detail-oriented Senior Software Engineer with a
            specialisation in Frontend technologies and deep expertise designing
            and developing high-performance, scalable web applications.
          </StaggerItem>
          <StaggerItem
            as="p"
            className="text-lg leading-relaxed text-blitz-charcoal/80"
          >
            Expert in modern JavaScript frameworks, with a strong focus on
            creating intuitive, responsive, and accessible user interfaces.
            Sound experience in backend development, DevOps projects, and
            end-to- end testing.
          </StaggerItem>
          <StaggerItem
            as="p"
            className="text-lg leading-relaxed text-blitz-charcoal/80"
          >
            Passionate about web performance optimization, AI-assisted
            development workflows, and staying current with emerging
            technologies. I write about cutting load times, building AI coding
            agents, and turning engineering expertise into scalable team
            capabilities.
          </StaggerItem>
          <StaggerItem
            as="p"
            className="mt-4 text-lg leading-relaxed text-blitz-charcoal/80"
          >
            As the co-founder of{' '}
            <a href="https://blitzstack.io" className="link-hover font-medium">
              Blitzstack.io
            </a>
            , I'm dedicated to empowering developers with tools that accelerate
            development and improve code quality.
          </StaggerItem>
        </Stagger>

        <Stagger className="grid grid-cols-2 gap-6" stagger={0.08} amount={0.1}>
          {skillGroups.map((group) => (
            <StaggerItem key={group.title}>
              <h3 className="mb-3 font-semibold text-blitz-primary">
                {group.title}
              </h3>
              <ul className="space-y-2 text-blitz-charcoal/70">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center">
                    <span className="mr-3 h-2 w-2 rounded-full bg-blitz-soft" />
                    {item}
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </div>
  </section>
)

export default About
