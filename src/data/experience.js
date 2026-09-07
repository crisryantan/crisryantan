import React from 'react'

/**
 * Work history rendered by src/components/sections/Experience.js.
 * Bullets are JSX so the bolded metrics (the heart of the résumé) survive verbatim.
 */
const experience = [
  {
    role: 'Senior Software Engineer',
    company: 'Rokt',
    location: 'New York, USA',
    period: 'Feb 2026 - Present',
    bullets: [
      <>
        Cut SDK{' '}
        <strong>time to interactive by 11% at p50 and 12% at p95</strong>.
        Modelled at a 0.3-1.9% revenue lift depending on percentile.
      </>,
      <>
        Moved the web SDK's offer-selection path onto the platform's{' '}
        <strong>new backend architecture</strong>, ramping partner by partner
        behind routing controls with parity checks and per-partner monitoring at
        each step, so any revenue impact stayed visible and reversible.
      </>,
      <>
        Introduced <strong>contract testing (Pact)</strong> to de-risk that
        migration, growing it from a single-repo experiment into shared
        infrastructure across all three SDK consumers (web, iOS, Android), the
        transactions provider, and the server-to-server surface, so client and
        server drift surfaces at review time rather than after release.
      </>,
      <>
        Modernised the web SDK's build and CI by consolidating on Nx with
        affected-only scoping, sharding the PR pipeline, migrating npm to bun,
        and surfacing bundle size per PR.{' '}
        <strong>Cut PR build time by ~45% and mainline by ~33%</strong>, roughly
        halving what the team waits on for every change.
      </>,
      <>
        Rebuilt the on-call surface ahead of new engineers joining the rotation.
        Introduced a <strong>diagnose-alerts skill</strong> to help engineers
        diagnose SDK issues.
      </>,
      <>
        Acted as the{' '}
        <strong>SDK technical expert during partner onboarding</strong>,
        fielding integration questions and clearing blockers for partners
        including <strong>Cinemark, eBay, and Kroger</strong>.
      </>,
      <>
        Invested in team leverage: guardrails for AI-generated code and
        performance guidelines in <code>AGENTS.md</code> that keep
        render-latency regressions from reaching partner pages, plus reusable
        playbooks for pitching and code review.
      </>,
    ],
  },
  {
    role: 'Senior Software Engineer',
    company: 'Lorikeet',
    location: 'Sydney, Australia',
    period: 'Sept 2025 - Feb 2026',
    bullets: [
      <>
        Shipped <strong>Concierge</strong>, rebuilding Brands into Concierges as
        the hub for multi-channel CX config. Standardized channel-level settings
        as the single source of truth, aligned with a DB migration and large
        backfills to cut duplication and make multi-env changes safer.
      </>,
      <>
        Shipped <strong>Coach</strong>, an AI agent that explains metric shifts,
        diagnoses root causes, and recommends fixes, turning reporting data into
        actionable insights.
      </>,
      <>
        Built partner reporting for{' '}
        <strong>Quality Score, CSAT, and containment rate</strong>, giving
        partners visibility into key CX metrics across their support operations.
      </>,
      <>
        Optimized SSR performance in React/Remix by instrumenting loaders with
        performance markers, identifying bottleneck queries, and applying
        parallel execution and deferred streaming patterns.{' '}
        <strong>
          Cut average page load time from 2.2s to ~700ms (~68% reduction)
        </strong>
        .
      </>,
      <>
        Audited the full infrastructure stack for compression and bundle size
        gaps. Enabled Brotli on Cloud CDN,{' '}
        <strong>reducing web app cold load transfer by 75%</strong> (1.56 MB to
        392 KB). Reduced chat bundle size by ~630 KB through tree-shaking,
        eliminating 87% of one chunk.
      </>,
      <>
        Built a preparative iframe preloading mechanism for the embeddable chat
        widget, achieving an <strong>85% cache hit rate</strong> and cutting
        widget time-to-ready from 1.24s to 681ms.
      </>,
      <>
        Implemented role-based access control and laid the groundwork for
        platform-wide PII redaction, enabling safer data handling across
        workflows and reporting.
      </>,
    ],
  },
  {
    role: 'Senior Software Engineer',
    company: 'Rokt',
    location: 'Sydney, Australia',
    period: '2019 - May 2025',
    bullets: [
      <>
        Developed and maintained a robust frontend SDK, empowering enterprises
        to deliver targeted advertising seamlessly on e-commerce sites and apps.
      </>,
      <>
        Achieved a <strong>30% reduction in SDK load time</strong> and a{' '}
        <strong>40% decrease in script size</strong>, significantly improving
        performance and user experience.
      </>,
      <>
        Built and maintained client-side UI components displayed as offers to
        customers using <strong>React, TypeScript, Redux, and RxJS</strong>.
      </>,
      <>
        <strong>Adoption at Scale:</strong> The SDK is deployed across top-tier
        companies including Ticketmaster, Best Buy, Domino's, AMC Theatres, and
        many others, powering customer engagement across millions of users.
      </>,
      <>
        <strong>High-Volume Transactions:</strong> Design and developed an SDK
        handling over a million transactions daily, generating of almost $2
        million in daily revenue.
      </>,
      <>
        Established and enforced coding standards and best practices to ensure
        high-quality code and efficient development processes.
      </>,
      <>
        Maintained and monitored app deployments through continuous integration
        and continuous deployment (CI/CD) pipelines.
      </>,
      <>
        Implemented guardrails by adding integration tests, visual regression
        tests, and end-to-end tests to ensure application robustness and
        reliability.
      </>,
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Leadbook',
    location: 'Singapore',
    period: '2017 - 2018',
    bullets: [
      <>
        Managed and mentored a team of Software Engineers, ensuring high-quality
        deliverables and fostering a collaborative development environment.
      </>,
      <>
        Conducted thorough code reviews among peers to ensure code quality,
        adherence to best practices, and maintainability, resulting in robust
        and reliable software deployments.
      </>,
      <>
        Worked closely with product owners and designers, contributing technical
        expertise and innovative ideas to align with company-wide goals and
        enhance the overall product vision.
      </>,
      <>
        Co-structured, designed, and built the frontend of the Leadbook
        platform, delivering a seamless and engaging user experience.
      </>,
      <>
        Spearheaded the reimplementation of the existing platform to a modern
        single-page application using{' '}
        <strong>React, Redux, and Styled Components</strong>. This transition
        improved performance, scalability, and user interaction.
      </>,
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Tritontek',
    location: 'Cebu, Philippines',
    period: '2015 - 2017',
    bullets: [
      <>
        Designed and built a Time Management application specifically tailored
        for use by Civil Engineers, focusing on usability, efficiency, and
        reliability.
      </>,
      <>
        Conducted consistent code reviews among peers to ensure high-quality,
        maintainable, and clean code is deployed. Worked closely with product
        owners and designers, contributing technical expertise and innovative
        ideas to align with company-wide goals and enhance the overall product
        vision.
      </>,
      <>
        Coached and supported teammates through code reviews and whiteboarding
        sessions, fostering a collaborative and growth-oriented development
        environment.
      </>,
      <>
        Demonstrated and enforced proper coding techniques, emphasizing
        maintainability, code reuse, clean code practices, and unit testing.
        Played a key role in driving and maintaining coding standards within the
        team.
      </>,
    ],
  },
]

export default experience
