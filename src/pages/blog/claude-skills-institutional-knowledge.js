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
              <span className="mr-4">10 min read</span>
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
              You spend weeks mastering a complex workflow. You document it carefully, share it with your team,
              and hope everyone will reference it when needed. But here's what actually happens: people forget
              the documentation exists, they can't find it when they need it, or they end up reinventing solutions
              you already figured out.
            </p>

            <p>
              Sound familiar? This is the eternal struggle of knowledge transfer in engineering teams. We've tried
              wikis, README files, Notion docs, and Slack threads. Yet somehow, hard-won expertise keeps getting lost,
              rediscovered, and lost again.
            </p>

            <p>
              Claude Skills solve this problem in a fundamentally different way. Instead of hoping people will
              remember to look up your documentation, you give Claude the knowledge directly. From that point on,
              whenever someone needs that expertise, Claude just knows it. Automatically.
            </p>

            <h2>The "I Know Kung Fu" Moment</h2>

            <p>
              Remember that scene in The Matrix where they upload kung fu directly into Neo's brain? He opens his
              eyes and says "I know kung fu." That's exactly what Claude Skills do for AI assistants.
            </p>

            <div className="bg-gradient-to-r from-blitz-accent/10 to-blitz-soft/10 border border-blitz-accent/20 p-8 rounded-lg my-8">
              <p className="text-center text-xl mb-6 font-semibold text-blitz-primary">
                Traditional Prompting vs Claude Skills
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border border-blitz-charcoal/20 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blitz-charcoal mb-4">Without Skills</h3>
                  <div className="space-y-3 text-sm text-blitz-charcoal/80">
                    <div className="flex items-start">
                      <span className="text-red-500 mr-2 mt-1">✗</span>
                      <span>Copy-paste the same prompt every time</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-red-500 mr-2 mt-1">✗</span>
                      <span>Custom instructions only work in specific projects</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-red-500 mr-2 mt-1">✗</span>
                      <span>Context gets lost between conversations</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-red-500 mr-2 mt-1">✗</span>
                      <span>Everyone needs to remember the prompt</span>
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
                      <span>Works across all conversations</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      <span>Team shares the same knowledge base</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p>
              You're not just saving a prompt. You're building a knowledge package with instructions, best practices,
              examples, and specific guidance for a task. You create it once, upload it to Claude's Skills section,
              and you're done. From that point forward, whenever you mention anything relevant to that Skill (or even
              just start a task it applies to), Claude automatically uses that knowledge.
            </p>

            <h2>How Claude Skills Actually Work</h2>

            <p>
              Think of Skills like giving Claude a reference guide it checks before starting work. When you begin a
              conversation, Claude scans your uploaded Skills and activates any that are relevant to your task. You
              don't have to manually trigger them. You don't have to remember they exist. They just work in the
              background.
            </p>

            <h3>The Skill Lifecycle</h3>

            <div className="my-8">
              <div className="bg-gradient-to-r from-blitz-accent/10 to-blitz-soft/10 border border-blitz-accent/20 p-8 rounded-lg">
                <pre className="text-sm leading-relaxed text-blitz-charcoal">
{`Step 1: Create the Knowledge Package
├─ Document your expertise systematically
├─ Include concrete examples and code snippets
├─ Define when the skill should be used
└─ Specify best practices and anti-patterns

Step 2: Upload to Claude Skills
├─ Add the skill via Claude.ai settings
├─ Make it available to your team
└─ Skill becomes part of Claude's knowledge base

Step 3: Automatic Activation
├─ Claude detects relevant tasks automatically
├─ Applies skill knowledge without prompting
├─ Works across all conversations
└─ No manual triggering needed

Step 4: Team Amplification
├─ Everyone benefits from the same expertise
├─ Consistent approaches across the team
├─ Knowledge survives team turnover
└─ Continuous improvement by updating skills`}
                </pre>
              </div>
            </div>

            <h2>Real-World Example: Performance Optimization Skill</h2>

            <p>
              Let me share how we used Claude Skills to transform performance optimization from tribal knowledge
              into institutional capability. I wrote about this journey in my{' '}
              <Link to="/blog/sdk-to-ssr-performance-optimization" className="text-blitz-accent hover:underline">
                performance optimization post
              </Link>
              , where we reduced page load times by 68% using systematic optimization techniques.
            </p>

            <p>
              After solving these performance issues, I created a Claude Skill called <code>remix-performance-optimizer</code>.
              This skill encapsulates everything I learned into a knowledge package that any team member can use.
            </p>

            <h3>What the Skill Contains</h3>

            <div className="bg-blitz-accent/5 border-l-4 border-blitz-accent p-6 my-8">
              <p className="font-semibold text-blitz-charcoal mb-4">
                The remix-performance-optimizer Skill teaches Claude to:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blitz-soft rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  <span>Automatically instrument loaders with performance markers</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blitz-soft rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  <span>Analyze query dependencies and identify optimization opportunities</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blitz-soft rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  <span>Apply defer patterns with skeleton UI based on bottleneck analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blitz-soft rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  <span>Restructure sequential queries into parallel execution</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blitz-soft rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  <span>Generate production-ready code following established patterns</span>
                </li>
              </ul>
            </div>

            <h3>Before and After</h3>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-red-50 border border-red-300 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-red-700 mb-3">Before the Skill</h4>
                <p className="text-sm text-red-900 mb-4">
                  "Hey Claude, our dashboard is loading slowly. Can you help optimize it?"
                </p>
                <div className="text-sm text-red-800 space-y-2">
                  <p>Claude gives generic advice about React performance.</p>
                  <p>You explain your Remix setup.</p>
                  <p>You describe the loader pattern.</p>
                  <p>Claude suggests approaches, some relevant, some not.</p>
                  <p>You spend 30 minutes guiding Claude to the right solution.</p>
                </div>
              </div>

              <div className="bg-green-50 border border-green-300 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-green-700 mb-3">After the Skill</h4>
                <p className="text-sm text-green-900 mb-4">
                  "Hey Claude, our dashboard is loading slowly. Can you help optimize it?"
                </p>
                <div className="text-sm text-green-800 space-y-2">
                  <p>Claude immediately recognizes this as a Remix performance task.</p>
                  <p>Activates remix-performance-optimizer skill automatically.</p>
                  <p>Applies the exact methodology you documented.</p>
                  <p>Instruments the code, analyzes bottlenecks, suggests defer patterns.</p>
                  <p>You get the right solution in 5 minutes.</p>
                </div>
              </div>
            </div>

            <h2>The Universal Superpower: Anywhere, Anytime, Automatically</h2>

            <p>
              The beauty of Skills is the "anywhere, anytime, automatically" part. This is fundamentally different
              from every other knowledge sharing approach we've tried:
            </p>

            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Not project-specific:</strong> Works in every conversation, not just specific projects</li>
              <li><strong>Not manual:</strong> You don't have to remember to invoke it</li>
              <li><strong>Not fragile:</strong> Doesn't break when you switch tasks or conversations</li>
              <li><strong>Not person-dependent:</strong> Everyone on your team can access the same knowledge</li>
            </ul>

            <h2>Building Your First Claude Skill</h2>

            <p>
              Ready to create your first Skill? Here's a practical guide to turning your expertise into a
              reusable knowledge package.
            </p>

            <h3>Step 1: Identify Skill-Worthy Knowledge</h3>

            <div className="bg-blitz-accent/5 border-l-4 border-blitz-accent p-6 my-8">
              <p className="font-semibold text-blitz-charcoal mb-4">
                Great candidates for Skills:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blitz-accent mr-3 text-xl">→</span>
                  <div>
                    <strong>Recurring workflows you've perfected:</strong> Performance optimization,
                    code review patterns, testing strategies
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blitz-accent mr-3 text-xl">→</span>
                  <div>
                    <strong>Company-specific conventions:</strong> Your API patterns, component architecture,
                    deployment procedures
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blitz-accent mr-3 text-xl">→</span>
                  <div>
                    <strong>Hard-won lessons:</strong> Solutions to tricky problems you've debugged multiple times
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blitz-accent mr-3 text-xl">→</span>
                  <div>
                    <strong>Domain expertise:</strong> Specialized knowledge about your product, industry, or tech stack
                  </div>
                </li>
              </ul>
            </div>

            <h3>Step 2: Structure Your Skill</h3>

            <p>
              A well-structured Skill includes several key components. Think of it like teaching a very smart
              intern who needs context about when and how to apply specific knowledge.
            </p>

            <pre className="bg-blitz-charcoal text-blitz-white p-6 rounded-lg overflow-x-auto my-6">
{`# [Skill Name]

## Overview
Brief description of what this skill does and when to use it.

## When to Apply This Skill
- Scenario 1: Describe the context
- Scenario 2: Another relevant situation
- Scenario 3: Common trigger phrases

## Core Methodology
Step-by-step process for applying this expertise:

1. First Step
   - What to look for
   - How to analyze it
   - Example code/patterns

2. Second Step
   - Detailed guidance
   - Common pitfalls to avoid
   - Expected outcomes

## Best Practices
- Key principle 1 with explanation
- Key principle 2 with rationale
- Key principle 3 with examples

## Anti-Patterns
- What NOT to do and why
- Common mistakes to avoid
- Red flags to watch for

## Examples
### Example 1: [Scenario]
[Before/After code showing the transformation]

### Example 2: [Another Scenario]
[Concrete demonstration of the technique]

## Success Criteria
How to know when you've applied this skill correctly.`}
            </pre>

            <h3>Step 3: Add Concrete Examples</h3>

            <p>
              This is the secret sauce. Don't just explain concepts, show them. Include real code snippets,
              before/after comparisons, and actual outputs. The more specific your examples, the better Claude
              will understand and apply your expertise.
            </p>

            <h3>Step 4: Upload and Test</h3>

            <p>
              Once you've created your Skill document:
            </p>

            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>Go to Claude.ai settings and navigate to the Skills section</li>
              <li>Upload your Skill document (usually a Markdown file)</li>
              <li>Test it by starting a conversation that should trigger the skill</li>
              <li>Refine based on how Claude applies it in practice</li>
            </ol>

            <div className="bg-gradient-to-r from-blitz-accent/10 to-blitz-soft/10 border-l-4 border-blitz-accent p-6 my-8 rounded-r-lg">
              <p className="font-semibold text-blitz-charcoal mb-2">Pro Tip:</p>
              <p className="text-sm text-blitz-charcoal/80">
                Skills are living documents. As you discover edge cases or better approaches, update your Skill.
                Everyone using it will immediately benefit from your improvements.
              </p>
            </div>

            <h2>From Individual Expertise to Institutional Knowledge</h2>

            <p>
              Here's where Claude Skills become truly transformative: they turn personal expertise into
              institutional capability.
            </p>

            <div className="my-8">
              <div className="bg-gradient-to-r from-blitz-accent/10 to-blitz-soft/10 border border-blitz-accent/20 p-8 rounded-lg">
                <p className="text-xl font-semibold mb-6 text-blitz-primary">Knowledge Evolution</p>
                <pre className="text-sm leading-relaxed text-blitz-charcoal">
{`Individual Expertise
└─ You solve a hard problem
   └─ Document the solution
      └─ Create a Claude Skill

Team Capability
└─ Share the Skill with your team
   └─ Everyone can now apply your expertise
      └─ Consistent approaches across projects

Institutional Knowledge
└─ Skills accumulate over time
   └─ New team members inherit collective wisdom
      └─ Knowledge survives team changes

Continuous Improvement
└─ Team discovers better approaches
   └─ Update the Skill with new insights
      └─ Everyone instantly benefits`}
                </pre>
              </div>
            </div>

            <h3>The Compound Effect</h3>

            <p>
              Imagine your team creates Skills for:
            </p>

            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Performance optimization patterns</li>
              <li>Security review checklist</li>
              <li>API design conventions</li>
              <li>Testing strategies</li>
              <li>Deployment procedures</li>
              <li>Code review guidelines</li>
              <li>Debugging workflows</li>
            </ul>

            <p>
              Now every engineer on your team has instant access to all of this expertise. A junior developer
              gets senior-level guidance automatically. A backend engineer can confidently work on frontend
              tasks. Remote team members aren't blocked waiting for the right person to come online.
            </p>

            <p>
              This is the compound effect of Skills. Each one you add multiplies the capability of your entire team.
            </p>

            <h2>Skills vs Other Knowledge Sharing Approaches</h2>

            <div className="overflow-x-auto my-8">
              <table className="w-full border-collapse border border-blitz-charcoal/20">
                <thead>
                  <tr className="bg-blitz-charcoal/5">
                    <th className="border border-blitz-charcoal/20 p-3 text-left">Approach</th>
                    <th className="border border-blitz-charcoal/20 p-3 text-left">Accessibility</th>
                    <th className="border border-blitz-charcoal/20 p-3 text-left">Discoverability</th>
                    <th className="border border-blitz-charcoal/20 p-3 text-left">Application</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-blitz-charcoal/20 p-3 font-semibold">Wiki/Docs</td>
                    <td className="border border-blitz-charcoal/20 p-3">Must search and read</td>
                    <td className="border border-blitz-charcoal/20 p-3">Hard to find</td>
                    <td className="border border-blitz-charcoal/20 p-3">Manual interpretation</td>
                  </tr>
                  <tr>
                    <td className="border border-blitz-charcoal/20 p-3 font-semibold">Code Comments</td>
                    <td className="border border-blitz-charcoal/20 p-3">Only in that file</td>
                    <td className="border border-blitz-charcoal/20 p-3">Context-limited</td>
                    <td className="border border-blitz-charcoal/20 p-3">Passive reference</td>
                  </tr>
                  <tr>
                    <td className="border border-blitz-charcoal/20 p-3 font-semibold">Saved Prompts</td>
                    <td className="border border-blitz-charcoal/20 p-3">Copy-paste each time</td>
                    <td className="border border-blitz-charcoal/20 p-3">Must remember location</td>
                    <td className="border border-blitz-charcoal/20 p-3">Manual triggering</td>
                  </tr>
                  <tr>
                    <td className="border border-blitz-charcoal/20 p-3 font-semibold">Custom Instructions</td>
                    <td className="border border-blitz-charcoal/20 p-3">Project-specific only</td>
                    <td className="border border-blitz-charcoal/20 p-3">Siloed per project</td>
                    <td className="border border-blitz-charcoal/20 p-3">Limited scope</td>
                  </tr>
                  <tr className="bg-blitz-soft/10">
                    <td className="border border-blitz-charcoal/20 p-3 font-semibold">Claude Skills</td>
                    <td className="border border-blitz-charcoal/20 p-3">Always available</td>
                    <td className="border border-blitz-charcoal/20 p-3">Automatic activation</td>
                    <td className="border border-blitz-charcoal/20 p-3">Intelligent application</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>Common Questions About Claude Skills</h2>

            <h3>Do Skills work with Claude Code?</h3>

            <p>
              Yes! Skills work across all Claude interfaces, including Claude Code, the CLI tool, and the web interface.
              Once you upload a Skill to your account, it's available everywhere you use Claude.
            </p>

            <h3>Can I share Skills with my team?</h3>

            <p>
              Absolutely. You can share the Skill file (usually a Markdown document) with your team through your
              normal channels (GitHub, Notion, etc.). Each team member uploads it to their Claude account, and
              everyone benefits from the same expertise.
            </p>

            <h3>How many Skills can I have?</h3>

            <p>
              There's no hard limit, but quality matters more than quantity. Start with 3-5 Skills that cover your
              most important workflows. As you build confidence, expand your Skills library strategically.
            </p>

            <h3>What if a Skill gives bad advice?</h3>

            <p>
              You own your Skills. If Claude applies a Skill incorrectly, you can update the Skill with better
              guidance, more examples, or clearer constraints. Think of Skills as living documents that improve
              over time.
            </p>

            <h3>Do Skills replace documentation?</h3>

            <p>
              No, they complement it. Traditional documentation is still valuable for human readers. Skills make
              that same knowledge actionable through AI assistance. Many teams maintain both: docs for humans,
              Skills for Claude.
            </p>

            <h2>Getting Started: Your First Skill Template</h2>

            <p>
              Here's a simple template to help you create your first Skill. Just fill in the blanks with your
              specific expertise:
            </p>

            <pre className="bg-blitz-charcoal text-blitz-white p-6 rounded-lg overflow-x-auto my-6">
{`# [Your Workflow Name] Skill

## Overview
This skill helps with [specific task or workflow].
Use it when [describe the situation].

## When to Apply
- The user mentions [trigger phrase 1]
- The task involves [specific context]
- When working with [relevant technology/pattern]

## Process
1. [First step of your methodology]
   - Look for [specific indicators]
   - Check [important factors]

2. [Second step]
   - Apply [your technique]
   - Avoid [common mistakes]

3. [Additional steps...]

## Example
[Paste a real example showing before/after or input/output]

## Quality Checks
- Verify [success criterion 1]
- Ensure [success criterion 2]
- Test [important edge case]`}
            </pre>

            <h2>Key Takeaways</h2>

            <div className="bg-gradient-to-r from-blitz-accent/10 to-blitz-soft/10 border border-blitz-accent/20 p-8 rounded-lg my-8">
              <ol className="space-y-4 text-lg">
                <li>
                  <strong>1. Skills are permanent knowledge transfer:</strong> Upload once, benefit forever.
                  No more repeating the same prompt or searching for documentation.
                </li>
                <li>
                  <strong>2. Automatic and universal:</strong> Skills activate automatically when relevant
                  and work across all conversations and projects.
                </li>
                <li>
                  <strong>3. Team force multiplier:</strong> Individual expertise becomes team capability.
                  Everyone benefits from the collective knowledge.
                </li>
                <li>
                  <strong>4. Living knowledge base:</strong> Update Skills as you learn. Improvements
                  instantly benefit everyone using that Skill.
                </li>
                <li>
                  <strong>5. Start small, compound over time:</strong> Begin with 3-5 core Skills.
                  Each addition multiplies your team's capability.
                </li>
              </ol>
            </div>

            <h2>Your Turn</h2>

            <p>
              Think about a workflow you've perfected recently. Maybe it's how you debug production issues,
              or your approach to code reviews, or a performance optimization technique. That's your first Skill.
            </p>

            <p>
              Document it. Not for other humans to read and hopefully remember. Document it so Claude can apply
              your expertise automatically, every time, for everyone on your team.
            </p>

            <p>
              That's how you turn personal learning into institutional knowledge. That's how individual expertise
              becomes a team superpower. That's the power of Claude Skills.
            </p>

            <h2>Learn More</h2>

            <div className="space-y-4 my-8">
              <div className="bg-blitz-accent/5 border-l-4 border-blitz-accent p-6 rounded-r-lg">
                <p className="font-semibold text-blitz-charcoal mb-2">
                  <a href="https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview"
                     className="text-blitz-accent hover:underline"
                     target="_blank"
                     rel="noopener noreferrer">
                    Official Claude Skills Documentation
                  </a>
                </p>
                <p className="text-sm text-blitz-charcoal/80">
                  Comprehensive guide to creating and managing Skills, with detailed examples and best practices.
                </p>
              </div>

              <div className="bg-blitz-accent/5 border-l-4 border-blitz-accent p-6 rounded-r-lg">
                <p className="font-semibold text-blitz-charcoal mb-2">
                  <a href="https://github.com/anthropics/skills"
                     className="text-blitz-accent hover:underline"
                     target="_blank"
                     rel="noopener noreferrer">
                    Anthropic Skills Repository
                  </a>
                </p>
                <p className="text-sm text-blitz-charcoal/80">
                  Community-contributed Skills you can learn from or use directly. Great source of inspiration
                  for structuring your own Skills.
                </p>
              </div>

              <div className="bg-blitz-accent/5 border-l-4 border-blitz-accent p-6 rounded-r-lg">
                <p className="font-semibold text-blitz-charcoal mb-2">
                  <Link to="/blog/sdk-to-ssr-performance-optimization" className="text-blitz-accent hover:underline">
                    Performance Optimization Case Study
                  </Link>
                </p>
                <p className="text-sm text-blitz-charcoal/80">
                  See how we turned performance optimization knowledge into a reusable Claude Skill that
                  reduced page load times by 68%.
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
