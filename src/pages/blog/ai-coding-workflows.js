import React from 'react'
import { Link } from 'gatsby'
import ArticleLayout from '../../components/ArticleLayout'

const AICodingWorkflowsPage = () => {
  return (
    <ArticleLayout
      title="AI-Assisted Coding Workflows: Delegating vs Leveraging"
      description="Learn the mental model for working with AI coding assistants: when to delegate tasks and walk away vs when to leverage AI as your pair programming partner."
      date="March 17, 2026"
      readTime="12 min read"
      category="AI & Productivity"
      slug="/blog/ai-coding-workflows"
      tags={['AI & Productivity', 'AI Agents', 'Developer Workflow']}
    >
      <h2>How AI Changed My Coding Workflow</h2>

      <p className="text-blitz-charcoal/70 italic text-sm mb-6">
        Special thanks to my teammate Minh Le at Lorikeet, whose insights on
        AI-assisted development workflows have been invaluable to my learning of
        this topic.
      </p>

      <p>
        When AI coding tools first came out, I thought they were just fancy
        autocomplete. Type a comment, get some boilerplate, move on. But modern
        AI coding assistants? They've completely changed the game. We're not
        talking about autocomplete anymore. We're talking about agents that can
        actually implement entire features while you grab coffee.
      </p>

      <p>
        Here's the thing though: just because these tools are powerful doesn't
        mean you should throw tasks at them randomly and hope for the best. I
        learned this the hard way after watching several AI-generated PRs turn
        into complete messes. The breakthrough came when I realized there are
        really just two ways to work with AI: either you{' '}
        <strong>delegate</strong> something and walk away, or you{' '}
        <strong>leverage</strong> AI as your pair programming partner. Knowing
        which approach to use? That's what separates getting 10x productivity
        from ending up in frustrating rabbit holes.
      </p>

      <h2>The Coding Task Spectrum</h2>

      <p>
        So here's the mental model that helped me figure this out: think of any
        coding task on a spectrum. On one end, you have tasks where you know{' '}
        <em>exactly</em> what needs to happen. Like "remove this feature flag"
        or "add unit tests for this service." On the other end? Tasks where
        you're still figuring things out, like "why is this page so slow?" or
        "how should we architect this new feature?"
      </p>

      <p>
        Where your task falls on this spectrum tells you everything about how to
        work with AI.
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

      <h2>Workflow #1: Delegating (Assign and Forget)</h2>

      <p>
        Let's talk about delegation. This is where AI really shines and where
        most of your productivity gains will come from. The idea is simple: you
        write up what needs to happen, hand it to an{' '}
        <Link
          to="/blog/ai-agents-productivity"
          className="text-blitz-accent hover:underline"
        >
          AI agent
        </Link>
        , and go work on something else. Come back later, review what it did,
        and ship it. That's it.
      </p>

      <p>
        The key is that you need to know <em>exactly</em> what you want. If
        you're writing a spec and find yourself saying "figure out the best way
        to do this," that's a red flag. You're not delegating anymore, you're
        just hoping the AI makes good architectural decisions for you. (Spoiler:
        it won't.)
      </p>

      <h3>When to Delegate</h3>

      <div className="bg-blitz-accent/5 border-l-4 border-blitz-accent p-6 my-8">
        <p className="font-semibold text-blitz-charcoal mb-4">
          Perfect Candidates for Delegation:
        </p>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="text-green-500 mr-3 text-xl">✓</span>
            <div>
              <strong>Feature Flag Cleanup:</strong> "Remove the
              ENABLE_NEW_CHECKOUT feature flag and all conditional logic,
              keeping the new code path."
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-3 text-xl">✓</span>
            <div>
              <strong>Unit Test Generation:</strong> "Add unit tests for the
              UserService class, mocking the database layer."
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-3 text-xl">✓</span>
            <div>
              <strong>Diagnosed Bug Fixes:</strong> "Fix the off-by-one error in
              pagination.ts:142 that causes the last page to be skipped."
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-3 text-xl">✓</span>
            <div>
              <strong>Reference-Based Changes:</strong> "Update the Reply to
              Customer button to match the style in CustomerActions.tsx:45-67."
            </div>
          </li>
        </ul>
      </div>

      <h3>The Delegation Protocol</h3>

      <p>
        Over time I've settled into a pretty consistent flow for delegation.
        It's nothing fancy, but having these steps explicit keeps me from
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
        The quality of your specification directly determines success rate.
        Here's a comparison:
      </p>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="border border-red-300 bg-red-50 p-6 rounded-lg">
          <h4 className="text-lg font-semibold text-red-700 mb-3">
            Poor Spec (30% success)
          </h4>
          <pre className="text-sm text-red-900 whitespace-pre-wrap bg-red-100 p-4 rounded">
            {`Task: Add dark mode support

Please add dark mode to the app.`}
          </pre>
          <p className="text-sm text-red-700 mt-3">
            This is too vague, no context, no examples, no constraints.
          </p>
        </div>

        <div className="border border-green-300 bg-green-50 p-6 rounded-lg">
          <h4 className="text-lg font-semibold text-green-700 mb-3">
            Good Spec (85% success)
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
            Specific, actionable, with clear constraints and examples.
          </p>
        </div>
      </div>

      <h3>The One-to-Two Review Loop Rule</h3>

      <p>
        Here's a rule that's saved me so much time: if the AI doesn't get it
        right after one round of feedback, just do it yourself. Seriously. I
        used to go back and forth with agents trying to get them to understand
        what I wanted. You know what I learned? After round two, you're just
        wasting time.
      </p>

      <p>
        If it's not right after one correction, either your spec was unclear
        (fix it for next time) or the task is too complex for delegation (should
        have been a leveraging session). Don't fall into the trap of endless
        iterations. Reject the PR and handle it manually.
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
        Now let's talk about leveraging, which is completely different. This is
        where you sit down with your AI assistant and work through a problem
        together. You're not assigning and walking away. You're having a
        conversation. You're steering, correcting, exploring options. It's like
        pair programming, except your pair is an AI that can instantly read
        through your entire codebase.
      </p>

      <p>
        This requires your full attention. You can't leverage AI while answering
        Slack messages or sitting in a meeting. But when you need to figure
        something out, solve something complex, or explore architectural
        options? This is where the magic happens.
      </p>

      <h3>When to Leverage</h3>

      <div className="bg-blitz-accent/5 border-l-4 border-blitz-accent p-6 my-8">
        <p className="font-semibold text-blitz-charcoal mb-4">
          Ideal Scenarios for Leveraging:
        </p>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="text-blue-500 mr-3 text-xl">→</span>
            <div>
              <strong>Architectural Decisions:</strong> "Help me design a
              caching layer for our API. Consider Redis vs in-memory vs
              file-based approaches."
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-3 text-xl">→</span>
            <div>
              <strong>Bug Diagnosis:</strong> "We have a race condition in the
              checkout flow. Help me trace the issue through the payment
              processing pipeline."
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-3 text-xl">→</span>
            <div>
              <strong>Feature Discovery:</strong> "I want to add real-time
              collaboration to our document editor. Let's explore options and
              trade-offs."
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-3 text-xl">→</span>
            <div>
              <strong>Performance Optimization:</strong> "Our dashboard is
              loading slowly. Help me profile and identify bottlenecks."
            </div>
          </li>
        </ul>
      </div>

      <h3>The Leveraging Protocol</h3>

      <p>
        When I sit down for a leveraging session, it usually follows this
        rhythm. The key thing is that you're driving the whole time, not just
        watching:
      </p>

      <div className="my-8 max-w-2xl">
        <div className="bg-gradient-to-r from-blitz-accent/10 to-blitz-soft/10 border border-blitz-accent/20 p-6 rounded-lg">
          <p className="text-xl font-semibold mb-6 text-blitz-primary">
            Active Collaboration Workflow
          </p>
          <pre className="text-xs leading-relaxed text-blitz-charcoal overflow-x-auto">
            {`┌─────────────────────────────────────────┐
│ 1. Discovery Phase                      │
│    → Ask AI to explore codebase         │
│    → Request multiple approaches        │
│    → Discuss trade-offs                 │
└────────────┬────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────┐
│ 2. Design Phase                         │
│    → Propose initial direction          │
│    → Get AI's feedback and concerns     │
│    → Refine approach collaboratively    │
└────────────┬────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────┐
│ 3. Implementation Phase                 │
│    ⚠️  INTERRUPT EARLY AND OFTEN        │
│    → Review each file as it's written   │
│    → Correct mistakes immediately       │
│    → Note issues for later fixes        │
└────────────┬────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────┐
│ 4. Refinement Phase                     │
│    → Queue up review notes              │
│    → Address after main work complete   │
│    → Verify tests pass                  │
└─────────────────────────────────────────┘`}
          </pre>
        </div>
      </div>

      <h3>The Critical Skill: Interrupting Effectively</h3>

      <p>
        Okay, this is probably the most important thing I'll tell you about
        leveraging AI:
        <strong>interrupt early and often</strong>. I cannot stress this enough.
        When your AI assistant starts heading in the wrong direction, don't
        wait. Don't let it finish. Don't think "maybe it'll figure it out." It
        won't. Mistakes compound.
      </p>

      <p>
        If the AI is applying the wrong pattern, using the wrong data structure,
        or making security mistakes, stop it immediately. Every line of code
        built on a flawed assumption just makes the problem worse. I've seen
        people let agents write 500 lines of code in the wrong direction because
        they didn't want to interrupt. Don't be that person.
      </p>

      <p>Interrupt when you see:</p>

      <ul className="list-disc list-inside space-y-2 ml-4">
        <li>Wrong architectural pattern being applied</li>
        <li>Incorrect assumptions about your data structures</li>
        <li>Missing edge cases or error handling</li>
        <li>Performance anti-patterns creeping in</li>
        <li>Security vulnerabilities (especially injection risks)</li>
      </ul>

      <h3>Providing Context: The Make-or-Break Factor</h3>

      <p>
        Here's another thing that separates good AI collaboration from
        frustrating ones: being specific with your context. Don't say "update
        the API service." There are probably five different API services in your
        codebase. Which one? Be surgical. Give file paths, line numbers,
        function names. The more precise you are, the better the output.
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

      <h3>Pattern 2: Rapid Prototyping</h3>

      <p>
        Use AI to quickly prototype solutions without direction, helping you
        discover missed requirements early. Then throw away the prototype and
        implement properly.
      </p>

      <pre className="bg-blitz-charcoal text-blitz-white p-6 rounded-lg overflow-x-auto my-6">
        {`You: "Prototype a real-time notification system. Just get something
     working quickly, don't worry about production quality."

AI: [Implements basic WebSocket solution]

You: "Good, this reveals we need:
     - Message queuing for offline users
     - Notification persistence
     - Priority levels

     Let's discard this and design properly now."`}
      </pre>

      <h3>Pattern 3: Test Pattern Replication</h3>

      <p>
        Provide one or two example tests showing your mocking and assertion
        patterns, then have the AI generate comprehensive test coverage
        following those patterns.
      </p>

      <pre className="bg-blitz-charcoal text-blitz-white p-6 rounded-lg overflow-x-auto my-6">
        {`You: "Look at these two tests in auth.test.ts:
     - Lines 15-32: Shows how we mock the database
     - Lines 45-58: Shows our assertion style

     Now generate comprehensive tests for UserService following
     these exact patterns. Cover all public methods."`}
      </pre>

      <h3>Pattern 4: Incremental Review Notes</h3>

      <p>
        As you actively collaborate, keep a running list of minor issues to
        address after the main work is complete. This prevents context-switching
        and maintains momentum.
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

      <h2>Decision Framework: Delegate or Leverage?</h2>

      <div className="my-8">
        <div className="bg-blitz-accent/5 border border-blitz-accent/20 p-8 rounded-lg">
          <p className="text-xl font-semibold text-blitz-charcoal mb-6">
            Ask yourself these questions:
          </p>

          <div className="space-y-6">
            <div className="border-l-4 border-green-500 pl-4">
              <p className="font-semibold text-green-700 mb-2">
                ✓ Delegate if ALL these are true:
              </p>
              <ul className="space-y-1 text-sm">
                <li>□ I know exactly what needs to be done</li>
                <li>□ I can provide clear examples or references</li>
                <li>□ The solution approach is obvious</li>
                <li>□ Success criteria are well-defined</li>
                <li>□ The task is self-contained</li>
              </ul>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <p className="font-semibold text-blue-700 mb-2">
                → Leverage if ANY of these are true:
              </p>
              <ul className="space-y-1 text-sm">
                <li>□ I need to explore different approaches</li>
                <li>□ The problem requires diagnosis first</li>
                <li>□ Architectural decisions are involved</li>
                <li>□ Requirements are unclear or evolving</li>
                <li>□ Multiple subsystems need coordination</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <h2>You Own the Output, Always</h2>

      <p>
        Let's get one thing crystal clear:{' '}
        <strong>every line of AI-generated code is your responsibility</strong>.
        Not the AI's. Yours. I don't care if Claude wrote it, Devin wrote it, or
        GPT-47 wrote it. When it breaks in production, when it has a security
        vulnerability, when it's unmaintainable, that's on you.
      </p>

      <p>
        This means you need to review everything. Understand the architectural
        decisions. Check for security issues. Test the edge cases. Make sure
        it's maintainable. AI tools are incredible productivity multipliers, but
        they're tools. The quality of your product still depends on your
        judgment, not the AI's.
      </p>

      <p>
        I've seen teams ship AI-generated code because "the tests passed"
        without actually reviewing what it does. Don't do this. Tests validate
        behavior, not correctness or maintainability or security. You still need
        to read the code.
      </p>

      <h2>Practical Examples</h2>

      <h3>Example 1: Feature Flag Removal (Delegate)</h3>

      <div className="bg-blitz-accent/5 p-6 rounded-lg my-6">
        <p className="font-semibold text-blitz-primary mb-4">
          Task Specification:
        </p>
        <pre className="bg-white border border-blitz-charcoal/20 p-4 rounded text-sm overflow-x-auto">
          {`Title: Remove ENABLE_TOPICS_V2 feature flag

Context:
The ENABLE_TOPICS_V2 feature flag has been enabled in production
for 2 weeks with no issues. Time to clean up the old code path.

Requirements:
1. Remove feature flag definition from config/features.ts
2. Remove all conditional checks for ENABLE_TOPICS_V2
3. Keep the new code path (v2 implementation)
4. Delete old v1 components:
   - TopicsListV1.tsx
   - TopicsFilterV1.tsx
5. Rename v2 components (remove V2 suffix):
   - TopicsListV2.tsx → TopicsList.tsx
   - TopicsFilterV2.tsx → TopicsFilter.tsx
6. Update all imports throughout the codebase
7. Update tests to remove feature flag mocking

Success Criteria:
- No references to ENABLE_TOPICS_V2 remain
- All tests pass
- Application builds without warnings`}
        </pre>
        <p className="text-sm text-blitz-charcoal/70 mt-4">
          <strong>Outcome:</strong> Assigned to Devin, completed in 12 minutes
          with zero review loops needed.
        </p>
      </div>

      <h3>Example 2: Performance Optimization (Leverage)</h3>

      <div className="bg-blitz-accent/5 p-6 rounded-lg my-6">
        <p className="font-semibold text-blitz-primary mb-4">
          Collaboration Session:
        </p>
        <pre className="bg-white border border-blitz-charcoal/20 p-4 rounded text-sm overflow-x-auto">
          {`You: "Our dashboard page is loading slowly. Help me profile and
     identify bottlenecks. Start by examining the loader in
     app/routes/dashboard.tsx"

AI: [Reads code, identifies multiple sequential queries]
    "I see several performance issues:
    1. Sequential database queries (lines 45-67)
    2. Unneeded data fetching for filters (line 52)
    3. Missing pagination (line 78)

    Should we address all three or prioritize?"

You: "Prioritize query parallelization first. Show me the
     current query waterfall."

AI: [Displays timing analysis]
    "Current: 2.3s total
    - Auth: 100ms
    - User data: 300ms (waits for auth)
    - Stats: 800ms (waits for user data)
    - Recent activity: 1100ms (waits for stats)"

You: "Perfect. The stats and activity queries don't depend on
     each other. Start by parallelizing those. Also, I notice
     we're fetching full user objects but only using IDs, let's
     optimize that too."

AI: [Implements parallel queries + selective fetching]

You: "Good progress. I see a potential issue in the error handling -
     what happens if stats fails but activity succeeds?"

AI: [Adds proper error handling]

You: "Excellent. Now add performance instrumentation so we can
     monitor this in production. Follow the pattern in
     lib/monitoring/performance.ts:23-45"`}
        </pre>
        <p className="text-sm text-blitz-charcoal/70 mt-4">
          <strong>Outcome:</strong> Active session over 45 minutes, reduced page
          load from 2.3s to 650ms, discovered and fixed three additional edge
          cases during collaboration.
        </p>
      </div>

      <h2>Maximizing Success: Best Practices</h2>

      <h3>For Delegation</h3>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div>
          <h4 className="font-semibold text-blitz-primary mb-3">Do</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Write detailed specifications with examples</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Provide exact file paths and line numbers</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Define clear success criteria</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Batch review multiple tasks together</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Use voice-to-text for faster specs</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-blitz-primary mb-3">Don't</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-red-500 mr-2">✗</span>
              <span>Delegate without clear requirements</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">✗</span>
              <span>Continue past 2 review loops</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">✗</span>
              <span>Delegate architectural decisions</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">✗</span>
              <span>Skip thorough code review</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">✗</span>
              <span>Assume tests validate correctness</span>
            </li>
          </ul>
        </div>
      </div>

      <h3>For Leveraging</h3>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div>
          <h4 className="font-semibold text-blitz-primary mb-3">Do</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Maintain 100% focus during sessions</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Interrupt early when issues arise</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Provide precise code references</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Ask for multiple approaches first</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Queue review notes for later</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-blitz-primary mb-3">Don't</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-red-500 mr-2">✗</span>
              <span>Multitask during active collaboration</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">✗</span>
              <span>Let mistakes compound before correcting</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">✗</span>
              <span>Use vague references like "the API service"</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">✗</span>
              <span>Accept first solution without exploration</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">✗</span>
              <span>Context switch between multiple agents</span>
            </li>
          </ul>
        </div>
      </div>

      <h2>Key Takeaways</h2>

      <div className="bg-gradient-to-r from-blitz-accent/10 to-blitz-soft/10 border border-blitz-accent/20 p-8 rounded-lg my-8">
        <ol className="space-y-4 text-lg">
          <li>
            <strong>1. Choose the Right Workflow:</strong> Delegate known tasks
            with clear specs, leverage AI for discovery and complex
            problem-solving.
          </li>
          <li>
            <strong>2. Specification Quality Matters:</strong> For delegation,
            invest time in clear, detailed specs with examples and references.
          </li>
          <li>
            <strong>3. Interrupt Early and Often:</strong> When leveraging,
            correct mistakes immediately before they compound.
          </li>
          <li>
            <strong>4. Provide Precise Context:</strong> Use exact file paths
            and line numbers instead of vague references.
          </li>
          <li>
            <strong>5. Limit Review Loops:</strong> Maximum 1-2 rounds for
            delegated tasks, reject and handle manually if unsuccessful.
          </li>
          <li>
            <strong>6. Own the Output:</strong> You're responsible for all
            AI-generated code - review thoroughly and maintain quality
            standards.
          </li>
          <li>
            <strong>7. Stay Focused:</strong> Give leveraging sessions 100%
            attention, batch review delegated tasks later.
          </li>
        </ol>
      </div>

      <h2>Wrapping Up</h2>

      <p>
        Look, AI is changing how we write code. That's just reality. The
        engineers who figure this out early are going to have a massive
        advantage over those who don't. But it's not about blindly trusting AI
        or rejecting it entirely. It's about developing a systematic approach to
        human-AI collaboration.
      </p>

      <p>
        The delegate vs leverage framework is that system. Is your task
        well-defined? Delegate it. Is it exploratory or complex? Leverage AI as
        your pair programmer. It's really that simple.
      </p>

      <p>
        Start with something easy. Pick a feature flag removal or a simple
        refactor. Write a good spec, delegate it, see what happens. Then try a
        leveraging session on something harder, like performance optimization or
        debugging a race condition. You'll quickly develop intuition for which
        approach fits which situation.
      </p>

      <p>
        The engineers who master these workflows now will be the ones leading
        teams in five years. Don't wait. Start practicing today.
      </p>
    </ArticleLayout>
  )
}

export default AICodingWorkflowsPage
