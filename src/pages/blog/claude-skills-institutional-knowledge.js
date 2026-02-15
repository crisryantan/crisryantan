import React from 'react'
import { Link } from 'gatsby'
import Layout from '../../components/Layout'
import Seo from '../../components/SEO'

const ClaudeSkillsPage = () => {
  return (
    <Layout>
      <Seo
        title="Claude Skills: Turning Personal Expertise into Team Superpowers"
        description="How Claude Skills transform individual knowledge into institutional capability, making specialized expertise available to your entire team automatically."
      />

      <article className="py-20 bg-blitz-white min-h-screen">
        <div className="max-width-container section-padding">
          {/* Back Link */}
          <Link
            to="/#blog"
            className="inline-flex items-center text-blitz-soft hover:text-blitz-accent transition-colors duration-200 mb-8"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to posts
          </Link>

          {/* Article Header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-blitz-primary mb-6">
              Claude Skills: Turning Personal Expertise into Team Superpowers
            </h1>
            <div className="flex flex-wrap items-center text-blitz-charcoal/60 text-sm mb-6">
              <time className="mr-4">February 17, 2026</time>
              <span className="mr-4">•</span>
              <span className="mr-4">6 min read</span>
              <span className="mr-4">•</span>
              <span className="bg-blitz-accent/10 text-blitz-soft px-3 py-1 rounded-full">
                AI & Team Productivity
              </span>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose-blitz">
            <h2>The Knowledge Transfer Problem</h2>

            <p>
              You spend weeks mastering a complex workflow. You document it, share it with your team,
              and hope everyone references it when needed. But people forget the docs exist, can't find
              them, or end up reinventing solutions you already figured out.
            </p>

            <p>
              Claude Skills solve this differently. Instead of hoping people look up your documentation,
              you give Claude the knowledge directly. When someone needs that expertise, Claude
              already has it. It still takes effort to write good skills, and they need maintenance
              as your systems change, but the payoff is that expertise becomes ambient rather than
              something people have to go looking for.
            </p>

            <h2>How Skills Work</h2>

            <p>
              Think of Skills like giving Claude a reference guide it checks before starting work.
              When you begin a conversation, Claude scans your uploaded Skills and activates any that
              are relevant. You don't manually trigger them. They activate based on context.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-white border border-blitz-charcoal/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blitz-charcoal mb-4">Without Skills</h3>
                <div className="space-y-3 text-sm text-blitz-charcoal/80">
                  <div className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">✗</span>
                    <span>Copy-paste the same prompt every time</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">✗</span>
                    <span>Context gets lost between conversations</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">✗</span>
                    <span>Everyone needs to remember the workflow</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-blitz-soft/30 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blitz-primary mb-4">With Skills</h3>
                <div className="space-y-3 text-sm text-blitz-charcoal/80">
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span>Upload once, works everywhere</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span>Automatically applies when relevant</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span>Team shares the same knowledge base</span>
                  </div>
                </div>
              </div>
            </div>

            <h2>Skills We Use at Lorikeet</h2>

            <p>
              We've built around 60 skills at Lorikeet. Some are essential, some were experiments
              that didn't stick. Here are the ones that actually became part of how we work daily.
            </p>

            <h3>On-Call Incident Response</h3>

            <p>
              Our <code>diagnose-ticket</code> skill gets the most use during on-call rotations.
              When you get paged about a production issue, you say "diagnose ticket abc-123" and
              Claude fetches production logs, identifies the ticket type, builds a timeline of
              events, correlates errors with code paths, and generates a diagnosis report.
            </p>

            <p>
              What makes this skill work well is its structure. The main file is a thin dispatcher,
              around 160 lines, that routes to specialized sub-guides based on log patterns it
              detects. Voice ticket issues route to one guide, integration failures to another,
              workflow execution problems to a third. Each sub-guide has the specific queries,
              patterns, and decision trees for that category. We call this the "hub-and-spoke"
              pattern, and it's become our go-to for any skill that needs to handle multiple
              scenarios.
            </p>

            <p>
              We've also built <code>diagnose-and-track</code>, which extends this further. After
              diagnosing an issue, it searches for duplicate tracking tickets, creates or enriches
              tickets with the diagnosis, and can reply to Slack threads with findings. It turns
              incident response into a systematic workflow rather than ad-hoc debugging.
            </p>

            <h3>Development Workflow Skills</h3>

            <div className="bg-blitz-accent/5 border-l-4 border-blitz-accent p-6 my-8">
              <ul className="space-y-4">
                <li>
                  <strong>ship-it:</strong> Complete PR workflow from code to production. Sets up
                  worktrees, runs local checks, creates PRs, performs self-review, runs security
                  scans, monitors CI, handles review feedback, merges, and monitors deployment.
                  This is our best example of skill composition. It orchestrates eight other
                  skills, each of which works independently too.
                </li>
                <li>
                  <strong>pr-feedback:</strong> Fetches PR review comments, filters out bot noise,
                  categorizes each comment (actionable, unclear, discussion, skip), and works through
                  them systematically. Commits fixes with clear descriptions of what was addressed.
                  Includes fallback paths for when tooling isn't available.
                </li>
                <li>
                  <strong>ci-monitor:</strong> Polls CI status and monitors for new review comments
                  in parallel. Fetches failure logs when checks fail, attempts fixes for common
                  issues, and adapts its polling interval based on how long jobs typically take.
                  Includes judgment criteria for which comments to act on immediately vs. discuss first.
                </li>
              </ul>
            </div>

            <h3>Code Quality Skills</h3>

            <div className="bg-blitz-accent/5 border-l-4 border-blitz-accent p-6 my-8">
              <ul className="space-y-4">
                <li>
                  <strong>security-pass:</strong> A filter pipeline with early exits. First, it
                  checks if any changed files are in paths that always require human review (auth,
                  migrations, infrastructure), it stops and flags. Then it auto-passes
                  anything that's clearly safe (test files, styling). Everything else gets checked
                  against our threat model: auth middleware, secrets, tenant isolation. It only
                  produces output when there's something to report.
                </li>
                <li>
                  <strong>find-similar-bugs:</strong> After fixing a bug, it analyzes the root cause,
                  identifies a "standard pattern" already in the codebase, then searches for places
                  using the anti-pattern. Each candidate gets triaged: BUG (fix it), SAFE (document
                  why), or REFACTOR (update for consistency). Prevents the same bug from appearing
                  in five different places.
                </li>
                <li>
                  <strong>remix-page-load-optimization:</strong> Performance optimization for our
                  Remix frontend. Progresses through three patterns of increasing aggressiveness:
                  defer non-critical data, defer main content with skeleton UI, strategic query
                  ordering. Includes honest limitations about when defer doesn't actually help.
                </li>
              </ul>
            </div>

            <h3>DevOps Skills</h3>

            <div className="bg-blitz-accent/5 border-l-4 border-blitz-accent p-6 my-8">
              <ul className="space-y-4">
                <li>
                  <strong>local-setup:</strong> Sets up a complete local development environment
                  from scratch. Handles environment files, dependency installation, Docker builds,
                  and service startup in the right order. Includes verification steps with expected
                  outputs and a fallback path when prerequisites aren't available.
                </li>
                <li>
                  <strong>debug-local-setup:</strong> Another hub-and-spoke skill. The main file
                  is under 90 lines, mostly a routing table that maps error patterns to five
                  specialized sub-guides (Docker, database, auth, dependencies, services). Each
                  sub-guide has diagnostic commands and common fixes for that category.
                </li>
                <li>
                  <strong>deploy-monitor:</strong> Watches deployments after merge, polling build
                  status and reporting completion or failure. Uses different output templates for
                  success (timestamps, what deployed) vs. failure (log links, which jobs failed).
                </li>
              </ul>
            </div>

            <h2>Structural Patterns We've Found</h2>

            <p>
              After building 60+ skills, we've noticed most fall into a few structural patterns.
              Knowing these upfront saves time when writing new ones:
            </p>

            <div className="overflow-x-auto my-8">
              <table className="w-full border-collapse border border-blitz-charcoal/20">
                <thead>
                  <tr className="bg-blitz-charcoal/5">
                    <th className="border border-blitz-charcoal/20 p-3 text-left">Pattern</th>
                    <th className="border border-blitz-charcoal/20 p-3 text-left">How It Works</th>
                    <th className="border border-blitz-charcoal/20 p-3 text-left">Good For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-blitz-charcoal/20 p-3 font-semibold">Hub-and-spoke</td>
                    <td className="border border-blitz-charcoal/20 p-3">Thin main file routes to specialized sub-guides based on what it detects</td>
                    <td className="border border-blitz-charcoal/20 p-3">Incident diagnosis, troubleshooting, anything with multiple scenarios</td>
                  </tr>
                  <tr>
                    <td className="border border-blitz-charcoal/20 p-3 font-semibold">Filter pipeline</td>
                    <td className="border border-blitz-charcoal/20 p-3">Early exits at each stage. Stop if human review needed, auto-pass if clearly safe, check everything else</td>
                    <td className="border border-blitz-charcoal/20 p-3">Security checks, code review triage, where most items need no action</td>
                  </tr>
                  <tr>
                    <td className="border border-blitz-charcoal/20 p-3 font-semibold">Linear orchestration</td>
                    <td className="border border-blitz-charcoal/20 p-3">Fixed sequence of steps with confirmation checkpoints and calls to other skills</td>
                    <td className="border border-blitz-charcoal/20 p-3">End-to-end workflows like ship-it where order matters</td>
                  </tr>
                  <tr>
                    <td className="border border-blitz-charcoal/20 p-3 font-semibold">Monitoring loop</td>
                    <td className="border border-blitz-charcoal/20 p-3">Poll for status changes, react when something happens, repeat until done</td>
                    <td className="border border-blitz-charcoal/20 p-3">CI monitoring, deployment watching, async processes you'd otherwise babysit</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>What We Learned the Hard Way</h2>

            <p>
              Not everything worked on the first try. Some lessons from building and maintaining
              our skills library:
            </p>

            <div className="bg-blitz-accent/5 border-l-4 border-blitz-accent p-6 my-8">
              <ul className="space-y-4">
                <li>
                  <strong>Vague skills produce vague results.</strong> Our first version of the
                  incident diagnosis skill said "check the logs for errors." Claude would dutifully
                  check logs and report that yes, there were errors. The skill became useful when
                  we added the specific queries to run, the exact column names to look for, and
                  a routing table that mapped log patterns to specialized guides. Being precise
                  is the difference between a skill that saves time and one that wastes it.
                </li>
                <li>
                  <strong>Skills go stale.</strong> We changed our database column naming conventions
                  and didn't update the diagnosis skill. For weeks, it was generating queries with
                  the old column names and hitting errors. Now we treat skills like code: they
                  live in the repo, get reviewed in PRs, and someone notices when they drift.
                </li>
                <li>
                  <strong>Big monolithic skills break down.</strong> We initially wrote ship-it as
                  one massive file. It was fragile and hard to update. Changing the CI monitoring
                  behavior meant editing a 500-line skill and hoping you didn't break the
                  deployment section. Splitting it into composable pieces (separate skills for PR
                  creation, CI monitoring, security checks, deployment watching) made each one
                  more reliable and independently useful.
                </li>
                <li>
                  <strong>Some things shouldn't be skills.</strong> We tried making a skill for
                  architectural design decisions. It didn't work. The problem space was too open-ended
                  and context-dependent. Skills work best when there's a repeatable process with
                  clear inputs and outputs. If you find yourself writing a skill that's mostly
                  "use your judgment," it's probably not a good candidate.
                </li>
              </ul>
            </div>

            <h2>Building Your First Skill</h2>

            <p>
              Here's a realistic example of what a well-structured skill looks like. This is a
              simplified version of a troubleshooting skill using the hub-and-spoke pattern:
            </p>

            <pre className="bg-blitz-charcoal text-blitz-white p-6 rounded-lg overflow-x-auto my-6">
{`# Debug Local Dev

## When to Use This Skill
- User says "local dev is broken", "can't start the app", etc.
- After a failed local-setup attempt

## Quick Diagnostic
Run these in order, stop at the first failure:
1. Check prerequisites: node -v, docker ps
2. Check containers: docker compose ps
3. Check logs: docker compose logs --tail=50
4. Check health: curl http://localhost:3000/healthz

## Route to Guide

| Error pattern              | Guide              |
|----------------------------|--------------------|
| "connection refused"       | → database.md      |
| "docker" in error message  | → docker.md        |
| "401" or "403"             | → auth.md          |
| "module not found"         | → dependencies.md  |
| None of the above          | → general.md       |

## Each sub-guide contains:
- Specific diagnostic commands for that category
- Common root causes with fixes
- "If all else fails" nuclear option (full reset)`}
            </pre>

            <p>
              Notice how the main file stays small and acts as a router. The specialized knowledge
              lives in sub-guides that can be updated independently. The routing table handles the
              branching logic that makes troubleshooting hard to do from memory.
            </p>

            <h3>What Makes Skills Effective</h3>

            <div className="bg-blitz-accent/5 border-l-4 border-blitz-accent p-6 my-8">
              <ul className="space-y-4">
                <li>
                  <strong>Decision frameworks over procedures:</strong> Instead of listing steps,
                  include "If you see X, use guide A. If you see Y, use guide B." This handles the
                  branching logic that makes debugging hard.
                </li>
                <li>
                  <strong>Concrete commands:</strong> Include the actual shell commands, API calls,
                  or file paths. "Fetch logs" is vague. <code>docker compose logs api --tail=50</code> is
                  actionable.
                </li>
                <li>
                  <strong>Output templates:</strong> Define what the final output should look like.
                  This ensures consistent reports that can be shared or tracked. We use different
                  templates for success vs. failure cases.
                </li>
                <li>
                  <strong>Judgment criteria:</strong> For skills that make decisions (like which PR
                  comments to act on), include explicit criteria. "Action immediately: bug reports,
                  security concerns. Discuss first: architectural changes. Skip: stylistic preferences."
                </li>
                <li>
                  <strong>Graceful degradation:</strong> What should Claude do when a tool isn't
                  available or a command fails? Our PR feedback skill includes a fallback path for
                  when the GitHub CLI isn't installed. Skills that handle failure gracefully get
                  used more.
                </li>
              </ul>
            </div>

            <h2>From Individual to Institutional Knowledge</h2>

            <p>
              The real value shows up over time. Each skill you add compounds:
            </p>

            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>A junior developer gets senior-level guidance during on-call</li>
              <li>Backend engineers can confidently work on frontend tasks</li>
              <li>New hires stop getting blocked on the same local dev issues</li>
              <li>Knowledge survives team turnover</li>
            </ul>

            <p>
              When someone improves a skill, everyone benefits on their next conversation.
              It's documentation that gets used because Claude uses it for you.
            </p>

            <p>
              That said, skills aren't a silver bullet. They need maintenance, they can go stale,
              and they work best for repeatable processes with clear structure. But for the
              workflows your team runs every day (shipping code, debugging incidents, onboarding
              new hires), the effort of writing a good skill pays for itself quickly.
            </p>

            <h2>Get Started</h2>

            <p>
              Think about the last time you helped a teammate debug something. What commands did you
              run? What patterns did you look for? What decision did you make based on what you saw?
              That's your first skill.
            </p>

            <p>
              Start small. A skill that fetches logs and identifies error patterns is more useful
              than an elaborate workflow that tries to do everything. Once you have a few working
              skills, compose them into larger workflows. Our ship-it skill started as three
              separate skills that we later wired together.
            </p>

            <div className="space-y-4 my-8">
              <div className="bg-blitz-accent/5 border-l-4 border-blitz-accent p-6 rounded-r-lg">
                <p className="font-semibold text-blitz-charcoal mb-2">
                  <a href="https://docs.anthropic.com/en/docs/claude-code/tutorials/agent-skills"
                     className="text-blitz-accent hover:underline"
                     target="_blank"
                     rel="noopener noreferrer">
                    Official Claude Code Skills Documentation
                  </a>
                </p>
                <p className="text-sm text-blitz-charcoal/80">
                  How to create and manage Skills in Claude Code.
                </p>
              </div>

              <div className="bg-blitz-accent/5 border-l-4 border-blitz-accent p-6 rounded-r-lg">
                <p className="font-semibold text-blitz-charcoal mb-2">
                  <a href="https://github.com/anthropics/courses/tree/master/prompt_engineering_interactive_tutorial"
                     className="text-blitz-accent hover:underline"
                     target="_blank"
                     rel="noopener noreferrer">
                    Anthropic Prompt Engineering Course
                  </a>
                </p>
                <p className="text-sm text-blitz-charcoal/80">
                  Learn the fundamentals of writing effective prompts. The same principles apply to Skills.
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-16 pt-8 border-t border-blitz-charcoal/10">
            <Link to="/#blog" className="btn-primary">
              ← Back to all posts
            </Link>
          </div>
        </div>
      </article>
    </Layout>
  )
}

export default ClaudeSkillsPage
