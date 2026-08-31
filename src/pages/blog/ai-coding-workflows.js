import React from 'react'
import { Link } from 'gatsby'
import ArticleLayout from '../../components/ArticleLayout'

const AICodingWorkflowsPage = () => {
  return (
    <ArticleLayout
      title="AI-Assisted Coding Workflows: Delegating vs Leveraging"
      description="The mental model I use for AI coding assistants: delegate well-specified tasks and walk away, or leverage AI as a pair for diagnosis and design. Plus the Jest-to-Vitest migration that taught me when to switch."
      date="March 17, 2026"
      readTime="8 min read"
      category="AI & Productivity"
      slug="/blog/ai-coding-workflows"
      tags={['AI & Productivity', 'AI Agents', 'Developer Workflow']}
    >
      <p className="text-lg text-blitz-charcoal/70 italic mb-8">
        <strong>TL;DR:</strong> There are two ways to work with an AI coding
        assistant. If you know exactly what needs to happen,{' '}
        <strong>delegate</strong> it with a clear spec and walk away. If you're
        still figuring the problem out, <strong>leverage</strong> the AI as your
        pair and stay in the loop. Cap delegated work at two review loops, then
        switch modes. A Jest-to-Vitest migration taught me most of this the hard
        way.
      </p>

      <h2>How AI Changed My Coding Workflow</h2>

      <p className="text-blitz-charcoal/70 italic text-sm mb-6">
        Special thanks to my teammate Minh Le at Lorikeet, whose insights on
        AI-assisted development workflows have been invaluable to my learning of
        this topic.
      </p>

      <p>
        When AI coding tools first came out, I treated them as fancy
        autocomplete. Then agents arrived that could implement entire features
        unattended, and I learned quickly, after watching several AI-generated
        PRs turn into messes, that power without a working method mostly
        produces messes faster. The breakthrough for me was realizing there are
        really just two ways to work with AI: <strong>delegate</strong>{' '}
        something and walk away, or <strong>leverage</strong> AI as your pair
        programming partner. Knowing which one fits the task is the whole game.
      </p>

      <h2>The Coding Task Spectrum</h2>

      <p>
        Think of any coding task on a spectrum. On one end are tasks where you
        know <em>exactly</em> what needs to happen: "remove this feature flag,"
        "add unit tests for this service." On the other end are tasks where
        you're still figuring things out: "why is this page slow?", "how should
        we architect this feature?" Where your task falls tells you how to work
        with AI.
      </p>

      <div className="my-8">
        <div className="bg-gradient-to-r from-blitz-accent/10 to-blitz-soft/10 border border-blitz-accent/20 p-8 rounded-lg">
          <p className="text-center text-xl mb-6 font-semibold text-blitz-primary">
            Task Knowledge Spectrum
          </p>
          <div className="relative h-16 bg-gradient-to-r from-blitz-soft/60 via-blitz-accent/40 to-blitz-accent/60 rounded-lg mb-4">
            <div className="absolute left-0 top-0 h-full flex items-center pl-4 text-sm font-semibold text-blitz-charcoal">
              Known Tasks
            </div>
            <div className="absolute right-0 top-0 h-full flex items-center pr-4 text-sm font-semibold text-blitz-charcoal">
              Unknown Tasks
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
            <div className="bg-blitz-soft/10 border border-blitz-soft/30 p-4 rounded">
              <p className="font-semibold mb-2 text-blitz-primary">
                Known Tasks (Delegate)
              </p>
              <ul className="space-y-1 text-blitz-charcoal/80">
                <li>• Removing feature flags</li>
                <li>• Adding unit tests</li>
                <li>• Fixing diagnosed bugs</li>
                <li>• Implementing specs</li>
              </ul>
            </div>
            <div className="bg-blitz-accent/10 border border-blitz-accent/30 p-4 rounded">
              <p className="font-semibold mb-2 text-blitz-primary">
                Unknown Tasks (Leverage)
              </p>
              <ul className="space-y-1 text-blitz-charcoal/80">
                <li>• Diagnosing race conditions</li>
                <li>• Architectural design</li>
                <li>• New feature discovery</li>
                <li>• Performance optimization</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <p>
        A quick test: delegate only when you know exactly what needs to be done,
        can point at examples, and can define success. If the problem still
        needs diagnosis, exploration, or an architectural decision, that's a
        leveraging session.
      </p>

      <h2>Workflow #1: Delegating (Assign and Forget)</h2>

      <p>
        Delegation is simple: write up what needs to happen, hand it to an{' '}
        <Link
          to="/blog/ai-agents-productivity"
          className="text-blitz-accent hover:underline"
        >
          AI agent
        </Link>
        , and go work on something else. Come back later, review, ship. The
        catch is that you need to know <em>exactly</em> what you want. If your
        spec says "figure out the best way to do this," you're not delegating.
        You're hoping the AI makes good architectural decisions for you, and it
        won't.
      </p>

      <h3>The Delegation Protocol</h3>

      <p>
        My flow is nothing fancy, but keeping the steps explicit stops me from
        cutting corners on the spec:
      </p>

      <pre className="bg-blitz-charcoal text-blitz-white p-6 rounded-lg overflow-x-auto my-6">
        {`1. Write a Clear Specification
   ├─ State the exact outcome
   ├─ Provide code references
   ├─ Include examples
   └─ Define success criteria

2. Create the Task/Issue
   ├─ Use your team's tracking system
   ├─ Include all relevant context
   └─ Link related files/discussions

3. Assign to AI Agent
   ├─ Match task complexity to agent capability
   ├─ Provide access to relevant codebase
   └─ Set clear boundaries

4. Batch Review Later
   ├─ Limit to 1-2 review loops max
   ├─ Accept or reject (no endless iterations)
   └─ If unclear, handle manually`}
      </pre>

      <h3>Writing Effective Delegation Specs</h3>

      <p>
        The quality of the specification decides the outcome. Compare these two
        versions of the same task:
      </p>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="border border-red-300 bg-red-50 p-6 rounded-lg">
          <h4 className="text-lg font-semibold text-red-700 mb-3">Poor Spec</h4>
          <pre className="text-sm text-red-900 whitespace-pre-wrap bg-red-100 p-4 rounded">
            {`Task: Add dark mode support

Please add dark mode to the app.`}
          </pre>
          <p className="text-sm text-red-700 mt-3">
            Too vague: no context, no examples, no constraints.
          </p>
        </div>

        <div className="border border-green-300 bg-green-50 p-6 rounded-lg">
          <h4 className="text-lg font-semibold text-green-700 mb-3">
            Good Spec
          </h4>
          <pre className="text-sm text-green-900 whitespace-pre-wrap bg-green-100 p-4 rounded">
            {`Task: Add dark mode toggle to Settings page

Reference: See ThemeContext.tsx for theme state
Location: Add toggle to SettingsPage.tsx:67
  (below notification preferences)
Behavior:
- Toggle should use Switch component from ui/Switch
- Persist preference to localStorage
- Apply theme immediately on change
Tests: Add test verifying localStorage update`}
          </pre>
          <p className="text-sm text-green-700 mt-3">
            Specific and actionable, with clear constraints and examples.
          </p>
        </div>
      </div>

      <h3>The One-to-Two Review Loop Rule</h3>

      <p>
        Here's a rule that's saved me so much time: if the AI doesn't get it
        right after one round of feedback, do it yourself. I used to go back and
        forth with agents trying to get them to understand what I wanted. After
        round two, you're just wasting time. Either your spec was unclear (fix
        it for next time) or the task was too complex for delegation and should
        have been a leveraging session. Reject the PR and switch modes.
      </p>

      <h3>Real Example: Jest to Vitest Migration</h3>

      <p>
        This one burned me. We had a straightforward-sounding task: migrate our
        test suite from Jest to Vitest. Clear input, clear output,
        well-documented migration path. Textbook delegation, right?
      </p>

      <p>
        I wrote up a solid spec: swap the test runner, update the config,
        replace Jest globals with Vitest equivalents, make sure everything
        passes. Handed it to a Cursor agent and went to work on something else.
      </p>

      <p>
        First pass came back and it looked reasonable. The syntax migration was
        clean: <code>jest.fn()</code> became <code>vi.fn()</code>,{' '}
        <code>jest.mock()</code> became <code>vi.mock()</code>, imports were
        updated. But then Buildkite went red.
      </p>

      <p>
        The problem wasn't the test syntax. It was the config. Vitest handles
        module resolution differently than Jest, and our monorepo setup with
        custom path aliases needed specific resolver config that the agent
        didn't understand. It also missed that some of our Jest config was split
        across <code>jest.config.ts</code>, <code>jest.setup.ts</code>, and
        CI-specific overrides in the Buildkite pipeline.
      </p>

      <p>
        I gave it one round of feedback pointing at the failing CI logs and the
        config files it missed. Second attempt still broke, this time because of
        how Vitest handles CSS module mocks differently. That's when I applied
        the rule: two loops, done. Time to switch modes.
      </p>

      <p>
        I pulled it into a leveraging session instead. With the AI as my pair, I
        walked through each Buildkite failure, traced the config differences,
        and we figured out the resolver and mock setup together. What the agent
        couldn't see autonomously, like how our CI environment had different
        module resolution than local dev, we diagnosed interactively in about 30
        minutes.
      </p>

      <div className="bg-blitz-accent/5 border-l-4 border-blitz-accent p-6 my-8">
        <p className="font-semibold text-blitz-charcoal mb-3">The Takeaway:</p>
        <p className="text-blitz-charcoal/80">
          The syntax migration was a perfect delegation task. But the config and
          CI integration? That was a leveraging task hiding inside a delegation
          task. The 1-2 loop rule caught it early. Without it, I would've spent
          hours going back and forth on config tweaks through an agent that
          couldn't see the full picture. Instead, I switched workflows and
          shipped it.
        </p>
      </div>

      <h2>Workflow #2: Leveraging (Active Collaboration)</h2>

      <p>
        Leveraging is completely different. You sit down with the AI and work
        through a problem together: steering, correcting, exploring options.
        It's pair programming, except your pair can read your entire codebase
        instantly. It requires your full attention, which is exactly why it's
        the right mode for diagnosis, design, and anything you can't yet
        specify.
      </p>

      <h3>The Critical Skill: Interrupting Effectively</h3>

      <p>
        The most important thing I can tell you about leveraging:{' '}
        <strong>interrupt early and often</strong>. When the AI starts heading
        in the wrong direction, don't wait for it to finish. Mistakes compound.
        Every line built on a flawed assumption makes the problem worse. I've
        seen people let agents write 500 lines in the wrong direction because
        they didn't want to interrupt. Stop it the moment you see a wrong
        pattern, a bad assumption about your data, missing error handling, or a
        security risk.
      </p>

      <h3>Providing Context: The Make-or-Break Factor</h3>

      <p>
        The other separator is precision. Don't say "update the API service"
        when there are five API services in your codebase. Give file paths, line
        numbers, function names.
      </p>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="bg-red-50 border border-red-300 p-6 rounded-lg">
          <h4 className="font-semibold text-red-700 mb-3">Vague Context ❌</h4>
          <p className="text-sm text-red-900 italic">
            "Update the API call service to handle retries better."
          </p>
          <p className="text-sm text-red-700 mt-3">
            Agent searches entire codebase, possibly finds wrong service.
          </p>
        </div>

        <div className="bg-green-50 border border-green-300 p-6 rounded-lg">
          <h4 className="font-semibold text-green-700 mb-3">
            Precise Context ✓
          </h4>
          <p className="text-sm text-green-900 italic">
            "In src/services/api/subscriber.service.ts:87-120, add exponential
            backoff to the fetchSubscriberData method."
          </p>
          <p className="text-sm text-green-700 mt-3">
            Agent knows exactly where to look and what to modify.
          </p>
        </div>
      </div>

      <h2>Common Leveraging Patterns</h2>

      <h3>Pattern 1: Read and Propose</h3>

      <p>
        Start by having the AI explore the codebase and propose multiple
        approaches before committing to implementation.
      </p>

      <pre className="bg-blitz-charcoal text-blitz-white p-6 rounded-lg overflow-x-auto my-6">
        {`You: "Read src/auth/* and propose three approaches for adding
     OAuth2 support. Consider our existing session management."

AI: [Explores codebase, identifies patterns]
    "I've analyzed the auth layer. Here are three approaches:

    1. Extend SessionManager with OAuth adapter
       Pros: Minimal changes, reuses existing logic
       Cons: Couples OAuth to session lifetime

    2. Separate OAuthProvider service
       Pros: Clean separation, easier testing
       Cons: Duplicate token refresh logic

    3. Unified TokenManager abstraction
       Pros: Handles both session and OAuth cleanly
       Cons: Requires refactoring existing code"

You: "Let's go with option 3. Start with the TokenManager interface."`}
      </pre>

      <h3>Pattern 2: Incremental Review Notes</h3>

      <p>
        As you collaborate, keep a running list of minor issues to address after
        the main work is complete. This prevents context-switching and maintains
        momentum. Other patterns I reach for: rapid throwaway prototypes to
        surface missed requirements, and giving the AI one or two example tests
        so it replicates your mocking and assertion style instead of inventing
        its own.
      </p>

      <pre className="bg-blitz-charcoal text-blitz-white p-6 rounded-lg overflow-x-auto my-6">
        {`You: "The main logic looks good. I'm noting these for cleanup:
     - Add JSDoc to public methods
     - Extract magic number to constant
     - Handle edge case for empty arrays

     Continue with the error handling implementation.
     We'll fix these notes after."`}
      </pre>

      <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8">
        <p className="font-semibold text-red-700 mb-3">
          Watch out: Don't try to juggle multiple leveraging sessions.
        </p>
        <p className="text-red-900 text-sm">
          I've tried running two active AI collaboration sessions side-by-side.
          It doesn't work. You lose the mental model of each task, mistakes
          compound because you're not catching them early, and the output
          quality drops because you're not steering either session properly. If
          a task needs your full attention, give it your full attention. If it
          doesn't, it's a delegation task, not a leveraging task.
        </p>
      </div>

      <h2>You Own the Output, Always</h2>

      <p>
        Every line of AI-generated code is your responsibility. Not the AI's.
        When it breaks in production or ships a security hole, that's on you.
        Review everything, understand the architectural decisions, and remember
        that passing tests validate behavior, not correctness or
        maintainability. You still need to read the code.
      </p>

      <h2>Wrapping Up</h2>

      <p>
        The delegate vs leverage framework is the system I keep coming back to.
        Is the task well-defined? Delegate it with a real spec and a two-loop
        limit. Is it exploratory or complex? Leverage AI as your pair and
        interrupt early.
      </p>

      <p>
        Start with something easy. Pick a feature flag removal, write a good
        spec, delegate it, and see what happens. Then try a leveraging session
        on something harder, like a performance investigation. The intuition for
        which mode fits which task builds fast, and it's the most useful AI
        skill I've picked up.
      </p>
    </ArticleLayout>
  )
}

export default AICodingWorkflowsPage
