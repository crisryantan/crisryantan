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
              <time className="mr-4">December 30, 2025</time>
              <span className="mr-4">•</span>
              <span className="mr-4">8 min read</span>
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
              you give Claude the knowledge directly. From then on, whenever someone needs that expertise,
              Claude just knows it. Automatically.
            </p>

            <h2>How Skills Work</h2>

            <p>
              Think of Skills like giving Claude a reference guide it checks before starting work.
              When you begin a conversation, Claude scans your uploaded Skills and activates any that
              are relevant. You don't manually trigger them. They just work.
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
              At Lorikeet, we've built a library of skills that have become essential to how we work.
              Here's how we've structured them and the problems they solve.
            </p>

            <h3>On-Call Incident Response</h3>

            <p>
              Our <code>diagnose-ticket</code> skill is invaluable during on-call rotations. When
              you get paged about a production issue, you just say "diagnose ticket abc-123" and
              Claude automatically fetches production logs, identifies the ticket type, builds a
              timeline of events, correlates errors with code paths, and generates a diagnosis
              report with root cause analysis.
            </p>

            <p>
              The skill includes decision frameworks for different issue types, routing to specific
              guides for voice tickets, workflow execution failures, or integration issues based on
              log patterns it detects. It knows where to look for common problems and generates
              structured reports that can be shared directly with the team.
            </p>

            <p>
              We've also built <code>diagnose-and-track</code>, which extends this further. After
              diagnosing an issue, it searches for duplicate Linear tickets, creates or enriches
              tracking tickets with the diagnosis, and can reply to Slack threads with findings.
              It turns incident response into a systematic workflow rather than ad-hoc debugging.
            </p>

            <h3>Development Workflow Skills</h3>

            <div className="bg-blitz-accent/5 border-l-4 border-blitz-accent p-6 my-8">
              <ul className="space-y-4">
                <li>
                  <strong>ship-it:</strong> Complete PR workflow from code to production. Sets up
                  worktrees, runs local checks, creates PRs, performs self-review, runs security
                  scans, monitors CI, handles review feedback, merges, and monitors deployment.
                  Asks for confirmation at key points you configure.
                </li>
                <li>
                  <strong>pr-feedback:</strong> Fetches PR review comments, filters out bot noise,
                  categorizes each comment (actionable, unclear, discussion, skip), and works through
                  them systematically. Commits fixes with clear descriptions of what was addressed.
                </li>
                <li>
                  <strong>ci-monitor:</strong> Polls CI status, fetches failure logs when checks fail,
                  attempts fixes for common issues, and monitors for new review comments in parallel.
                  Includes judgment criteria for which comments to act on immediately vs. discuss first.
                </li>
              </ul>
            </div>

            <h3>Code Quality Skills</h3>

            <div className="bg-blitz-accent/5 border-l-4 border-blitz-accent p-6 my-8">
              <ul className="space-y-4">
                <li>
                  <strong>security-pass:</strong> Quick security scan integrated into the ship-it
                  workflow. Knows which file paths always require human review (auth services,
                  migrations, infrastructure), which patterns to auto-pass (test files, CSS), and
                  what to check for in everything else: missing auth middleware, hardcoded secrets,
                  tenant isolation gaps.
                </li>
                <li>
                  <strong>find-similar-bugs:</strong> After fixing a bug, analyzes the root cause,
                  defines the anti-pattern, searches the codebase for similar occurrences, and
                  triages each candidate (BUG, SAFE, or REFACTOR). Prevents the same bug from
                  appearing in five different places.
                </li>
                <li>
                  <strong>remix-page-load-optimization:</strong> Systematic performance optimization
                  for our Remix frontend. Adds instrumentation to loaders, collects timing data,
                  identifies bottlenecks, and applies defer patterns with skeleton UI. Includes
                  decision frameworks for what to defer vs await.
                </li>
              </ul>
            </div>

            <h3>DevOps Skills</h3>

            <div className="bg-blitz-accent/5 border-l-4 border-blitz-accent p-6 my-8">
              <ul className="space-y-4">
                <li>
                  <strong>local-setup:</strong> Sets up a complete local development environment
                  from scratch. Handles environment files, dependency installation, Docker builds,
                  and service startup in the right order. Knows the verification steps and common
                  failure modes.
                </li>
                <li>
                  <strong>debug-local-setup:</strong> Troubleshoots when local dev breaks. Routes
                  to specific guides based on symptoms: Docker issues, database errors, auth problems.
                  Includes quick diagnostic commands and common fixes for each category.
                </li>
                <li>
                  <strong>deploy-monitor:</strong> Watches deployments after merge, polling build
                  status and reporting completion or failure. Knows which jobs to watch, how long
                  to wait, and provides links to logs when things go wrong.
                </li>
              </ul>
            </div>

            <h2>Patterns for Any Engineering Team</h2>

            <p>
              Most of the skills we've built follow patterns that work for any engineering team.
              Here's how to adapt them:
            </p>

            <h3>High-ROI Starting Points</h3>

            <p>
              Start with skills that get used under pressure or repeatedly. These have the highest
              payoff:
            </p>

            <div className="overflow-x-auto my-8">
              <table className="w-full border-collapse border border-blitz-charcoal/20">
                <thead>
                  <tr className="bg-blitz-charcoal/5">
                    <th className="border border-blitz-charcoal/20 p-3 text-left">Skill Type</th>
                    <th className="border border-blitz-charcoal/20 p-3 text-left">Why It's High Value</th>
                    <th className="border border-blitz-charcoal/20 p-3 text-left">Key Components</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-blitz-charcoal/20 p-3 font-semibold">Incident Diagnosis</td>
                    <td className="border border-blitz-charcoal/20 p-3">Used under pressure when you're least able to remember steps</td>
                    <td className="border border-blitz-charcoal/20 p-3">Log fetching commands, decision framework for issue types, report template</td>
                  </tr>
                  <tr>
                    <td className="border border-blitz-charcoal/20 p-3 font-semibold">Local Dev Setup</td>
                    <td className="border border-blitz-charcoal/20 p-3">Every new hire hits the same issues; onboarding gets faster</td>
                    <td className="border border-blitz-charcoal/20 p-3">Prerequisites, ordered setup steps, verification checks, common failure modes</td>
                  </tr>
                  <tr>
                    <td className="border border-blitz-charcoal/20 p-3 font-semibold">PR Review Handler</td>
                    <td className="border border-blitz-charcoal/20 p-3">Used multiple times daily; saves context switching</td>
                    <td className="border border-blitz-charcoal/20 p-3">Comment fetching, categorization criteria, judgment guidelines</td>
                  </tr>
                  <tr>
                    <td className="border border-blitz-charcoal/20 p-3 font-semibold">CI Monitor</td>
                    <td className="border border-blitz-charcoal/20 p-3">Frees you to work on other things while CI runs</td>
                    <td className="border border-blitz-charcoal/20 p-3">Polling strategy, required checks list, common fix patterns</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Framework-Specific Skills</h3>

            <p>
              These are worth building once you have the basics. They encode framework-specific
              knowledge that's hard to remember:
            </p>

            <div className="overflow-x-auto my-8">
              <table className="w-full border-collapse border border-blitz-charcoal/20">
                <thead>
                  <tr className="bg-blitz-charcoal/5">
                    <th className="border border-blitz-charcoal/20 p-3 text-left">Skill Type</th>
                    <th className="border border-blitz-charcoal/20 p-3 text-left">What It Does</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-blitz-charcoal/20 p-3 font-semibold">Performance Optimization</td>
                    <td className="border border-blitz-charcoal/20 p-3">Framework-specific profiling, bottleneck identification, optimization patterns (e.g., React defer, database indexing)</td>
                  </tr>
                  <tr>
                    <td className="border border-blitz-charcoal/20 p-3 font-semibold">Security Checklist</td>
                    <td className="border border-blitz-charcoal/20 p-3">Your threat model encoded as specific patterns to check: auth middleware, injection vectors, secrets handling</td>
                  </tr>
                  <tr>
                    <td className="border border-blitz-charcoal/20 p-3 font-semibold">Bug Pattern Hunter</td>
                    <td className="border border-blitz-charcoal/20 p-3">After fixing a bug, search for the same anti-pattern elsewhere. Prevents recurring issues across the codebase</td>
                  </tr>
                  <tr>
                    <td className="border border-blitz-charcoal/20 p-3 font-semibold">Deploy Monitor</td>
                    <td className="border border-blitz-charcoal/20 p-3">CI/CD specific steps: what to watch, how to poll, where to find logs when things fail</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>Building Your First Skill</h2>

            <p>
              A well-structured Skill has these components:
            </p>

            <pre className="bg-blitz-charcoal text-blitz-white p-6 rounded-lg overflow-x-auto my-6">
{`# [Skill Name]

## When to Use This Skill
- Trigger phrases ("diagnose", "fix CI", etc.)
- Contexts where it's relevant

## Required Input
What the skill needs to get started.

## Workflow
Step-by-step process with specific commands,
file paths, and decision points.

## Decision Framework
Tables or flowcharts for choosing between approaches.
"If you see X, do Y. If you see Z, do W."

## Output Format
What the final result should look like.

## Error Handling
What to do when things go wrong.`}
            </pre>

            <p>
              The key is being specific. Don't just say "check for errors." Include the exact commands,
              file paths, and patterns to look for. The more precise your Skill, the better Claude
              applies it.
            </p>

            <h3>What Makes Skills Effective</h3>

            <p>
              Looking at our most-used skills, a few patterns stand out:
            </p>

            <div className="bg-blitz-accent/5 border-l-4 border-blitz-accent p-6 my-8">
              <ul className="space-y-4">
                <li>
                  <strong>Decision frameworks over procedures:</strong> Instead of just listing steps,
                  include "If you see X, use guide A. If you see Y, use guide B." This handles the
                  branching logic that makes debugging hard.
                </li>
                <li>
                  <strong>Concrete commands:</strong> Include the actual shell commands, API calls,
                  or file paths. "Fetch logs" is vague. <code>{"./scripts/logs.sh <TICKET_ID>"}</code> is
                  actionable.
                </li>
                <li>
                  <strong>Output templates:</strong> Define what the final output should look like.
                  This ensures consistent reports that can be shared or tracked.
                </li>
                <li>
                  <strong>Judgment criteria:</strong> For skills that make decisions (like which PR
                  comments to act on), include explicit criteria. "Action immediately: bug reports,
                  security concerns. Skip: stylistic preferences."
                </li>
              </ul>
            </div>

            <h2>From Individual to Institutional Knowledge</h2>

            <p>
              The compound effect of Skills is powerful. Each one you add multiplies your team's capability:
            </p>

            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>A junior developer gets senior-level guidance automatically</li>
              <li>Backend engineers can confidently work on frontend tasks</li>
              <li>Remote team members aren't blocked waiting for the right person</li>
              <li>Knowledge survives team turnover</li>
            </ul>

            <p>
              When someone improves a Skill, everyone benefits immediately. It's documentation that
              actually gets used, because Claude uses it for you.
            </p>

            <h2>Key Takeaways</h2>

            <div className="bg-gradient-to-r from-blitz-accent/10 to-blitz-soft/10 border border-blitz-accent/20 p-8 rounded-lg my-8">
              <ol className="space-y-4 text-lg">
                <li>
                  <strong>1. Skills are permanent knowledge transfer:</strong> The expertise you
                  encoded once becomes available to everyone, automatically.
                </li>
                <li>
                  <strong>2. Start with high-pressure workflows:</strong> On-call diagnosis, incident
                  response, local dev setup. These have the highest ROI because they're used when
                  you're least able to remember steps.
                </li>
                <li>
                  <strong>3. Include decision frameworks:</strong> The value isn't just the steps. It's
                  knowing which approach to take based on what you're seeing.
                </li>
                <li>
                  <strong>4. Be specific:</strong> Include exact commands, file paths, judgment
                  criteria, and output templates. Vague skills produce vague results.
                </li>
                <li>
                  <strong>5. Skills compose:</strong> Our ship-it skill calls ci-monitor, security-pass,
                  and deploy-monitor. Build atomic skills, then combine them into workflows.
                </li>
              </ol>
            </div>

            <h2>Get Started</h2>

            <p>
              Think about the last time you helped a teammate debug something. What commands did you
              run? What patterns did you look for? What decision did you make based on what you saw?
              That's your first skill.
            </p>

            <p>
              Start small. A skill that fetches logs and identifies error patterns is more useful
              than an elaborate workflow that tries to do everything. Once you have a few working
              skills, you can compose them into larger workflows, like how our ship-it skill
              orchestrates PR creation, CI monitoring, security checks, and deployment watching.
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
