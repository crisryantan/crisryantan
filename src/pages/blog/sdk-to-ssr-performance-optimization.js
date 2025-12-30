import React from 'react'
import { Link } from 'gatsby'
import Layout from '../../components/Layout'
import Seo from '../../components/SEO'

const WebPerformancePage = () => {
  return (
    <Layout>
      <Seo
        title="From SDK to SSR: Performance Optimization Lessons Across Frameworks"
        description="How systematic performance optimization reduced page load times by 68% in React/Remix applications, applying lessons learned from SDK development."
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
              From SDK to SSR: Performance Optimization Lessons Across Frameworks
            </h1>
            <div className="flex flex-wrap items-center text-blitz-charcoal/60 text-sm mb-6">
              <time className="mr-4">December 29, 2025</time>
              <span className="mr-4">•</span>
              <span className="mr-4">12 min read</span>
              <span className="mr-4">•</span>
              <span className="bg-blitz-accent/10 text-blitz-soft px-3 py-1 rounded-full">
                Performance
              </span>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose-blitz">
            <h2>Prologue: Building Performance Culture at Rokt</h2>

            <p>
              Before diving into my recent work optimizing React/Remix applications at Lorikeet,
              I want to share the foundation that made this possible: my experience building WSDK2
              at Rokt with an incredible team. Together, we achieved a <strong>30% reduction in SDK
              load time</strong> and a <strong>40% decrease in script size</strong>, significantly
              improving performance and user experience across thousands of client integrations.
            </p>

            <p>
              What made this work successful was not just the optimizations themselves, but the
              systematic methodology we developed: <strong>instrument, measure, identify, optimize</strong>.
              We started with tracer bullet development, building a minimal viable version of WSDK2 to validate
              our approach before committing to full implementation. This framework proved to be framework-agnostic
              and powerful enough to apply to entirely different contexts, from third-party SDKs running in iframes
              to server-side rendered React applications.
            </p>

            <h2>Why Performance Measurement Matters</h2>

            <p>
              You cannot improve what you do not measure. This principle guided both my work at Rokt
              and now at Lorikeet. Performance optimization without data is just guesswork, you need
              concrete numbers to identify bottlenecks, validate improvements, and communicate impact
              to stakeholders.
            </p>

            <p>
              Throughout my career, I have employed various performance measurement techniques: analyzing HAR
              (HTTP Archive) files to understand network waterfalls, running Lighthouse audits for comprehensive
              performance scores, and deep-diving into Chrome DevTools Performance tab for CPU profiling and
              rendering analysis. While these tools are invaluable, this blog focuses specifically on the
              instrumentation-based approach that proved most impactful for the React/Remix optimization work
              at Lorikeet. The methodology described here is particularly effective for identifying and resolving
              server-side rendering bottlenecks in production environments.
            </p>

            <h3>Performance Markers: The Foundation of Optimization</h3>

            <p>
              At Rokt, we instrumented WSDK2 with <code>Date.now()</code> markers throughout the
              initialization flow. Why <code>Date.now()</code> instead of <code>performance.now()</code>?
              Because we were dealing with <strong>cross-origin iframes</strong>, measuring performance
              from both first-party (client website) and third-party (Rokt SDK) perspectives.
              <code>Date.now()</code> provides consistent timestamps across iframe boundaries, whereas
              <code>performance.now()</code> is relative to each browsing context's time origin.
            </p>

            <p>
              For the Remix/React work at Lorikeet, we switched to <code>performance.now()</code>
              in server-side loaders because we are measuring within a single Node.js process context.
              <code>performance.now()</code> offers higher precision (microsecond resolution) and
              monotonic timing that is immune to system clock adjustments.
            </p>

            <div className="bg-blitz-accent/5 border-l-4 border-blitz-accent p-6 my-8">
              <p className="font-semibold text-blitz-charcoal mb-2">
                Key Insight: Choose Your Timer Wisely
              </p>
              <ul className="space-y-2 text-sm">
                <li><strong>Use Date.now()</strong> when measuring across different contexts (iframes, workers, multiple browser tabs)</li>
                <li><strong>Use performance.now()</strong> for high-precision measurements within a single JavaScript context</li>
                <li><strong>Use performance.mark()</strong> for integration with browser DevTools and the Performance API</li>
              </ul>
            </div>

            <h3>Collecting Production Timing Data</h3>

            <p>
              After instrumenting our code with performance markers, we deployed to production and
              collected real-world timing data. This step is crucial,synthetic tests and local
              development environments do not capture the variability of real user conditions: network
              latency, device capabilities, concurrent resource loading, and cache states.
            </p>

            <p>
              Here's what typical timing data looked like for a slow Remix route:
            </p>

            <pre className="bg-blitz-charcoal text-blitz-white p-6 rounded-lg overflow-x-auto my-6">
{`timing: {
  authDurationMs: "100-500ms",
  configQueryMs: "50-200ms",
  mainContentQueryMs: "1000-2500ms",  // ⚠️ Bottleneck!
  auxiliaryQueryMs: "20-200ms",
  totalLoaderMs: "1200-3000ms"
}`}
            </pre>

            <p>
              The data revealed the primary bottleneck: a query dominating 70-80% of total
              load time. Identifying which operations consume the most time is exactly the kind of insight you
              need to prioritize optimization efforts effectively.
            </p>

            <h2>From Rokt to Lorikeet: Applying Lessons to React/Remix</h2>

            <p>
              At Lorikeet, we had a critically slow page in our web application. Average page load
              time was hovering around <strong>2.2 seconds</strong>, far too slow for a good user
              experience. Applying the systematic methodology from the lessons learned from building the Rokt WSDK2, we achieved
              remarkable results:
            </p>

            <div className="bg-gradient-to-r from-blitz-accent/10 to-blitz-soft/10 border border-blitz-accent/20 p-8 rounded-lg my-8">
              <p className="text-2xl font-bold text-blitz-primary mb-4">
                Performance Improvement: 2.2s → ~700ms
              </p>
              <ul className="space-y-2 text-lg">
                <li>✨ <strong>68% lower latency</strong></li>
                <li>🚀 <strong>Roughly 3x faster</strong> perceived load time</li>
                <li>📈 Achieved through systematic optimization, not magic</li>
              </ul>
            </div>

            <h2>React/Remix Performance Optimization Patterns</h2>

            <p>
              The performance instrumentation quickly revealed our bottlenecks. Armed with real data showing
              exactly where time was being spent, we applied three key optimization patterns. Each pattern
              addresses a specific type of performance issue we discovered through our timing analysis.
            </p>

            <p>
              These aren't theoretical optimizations, they're battle-tested patterns recommended by the Remix
              team and taught in depth by Kent C. Dodds in his{' '}
              <a
                href="https://frontendmasters.com/courses/advanced-remix/"
                className="text-blitz-accent hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Advanced Remix Frontend Masters course
              </a>
              . These patterns took our slowest pages from unusable to fast. Here's what worked:
            </p>

            <h3>Pattern 1: Parallel Query Execution</h3>

            <p>
              The first issue we found? Queries that didn't depend on each other were running one after another
              instead of simultaneously. This is one of the most common performance anti-patterns in async
              JavaScript. When queries are independent, they should run in parallel, period.
            </p>

            <p>
              Here's what we were doing wrong and how we fixed it:
            </p>

            <p><strong>Before (sequential - slow):</strong></p>

            <pre className="bg-blitz-charcoal text-blitz-white p-6 rounded-lg overflow-x-auto my-6">
{`// ❌ configData blocks independentQuery unnecessarily
const configData = await fetchConfig(auth)

// This starts AFTER configData completes (bad!)
const independentQueryPromise = fetchIndependentData(auth)

const dependentQueryPromise = fetchDependentData(configData)

await Promise.all([independentQueryPromise, dependentQueryPromise])`}
            </pre>

            <p><strong>After (parallel - fast):</strong></p>

            <pre className="bg-blitz-charcoal text-blitz-white p-6 rounded-lg overflow-x-auto my-6">
{`// ✅ Start independent queries immediately
const independentQueryPromise = fetchIndependentData(auth)

// Only await config when actually needed
const configData = await fetchConfig(auth)

const dependentQueryPromise = fetchDependentData(configData)

await Promise.all([independentQueryPromise, dependentQueryPromise])`}
            </pre>

            <p>
              <strong>Key insight:</strong> Start independent queries <em>before</em> awaiting
              dependencies they don't need. This simple reordering can shave hundreds of milliseconds
              off your critical path.
            </p>

            <h3>Pattern 2: Deferred Loading with Progressive Hydration</h3>

            <p>
              Remix's <code>defer()</code> utility enables one of the most powerful performance
              patterns for SSR applications: streaming non-critical data after navigation. This
              dramatically improves <strong>perceived performance</strong>, users see content
              instantly while data continues loading in the background.
            </p>

            <pre className="bg-blitz-charcoal text-blitz-white p-6 rounded-lg overflow-x-auto my-6">
{`export const loader = async ({ request }: LoaderFunctionArgs) => {
  const auth = await enforceProtectedRoute({ request })

  // Critical data: needed for page structure
  const filters = await fetchFilters(auth)
  const pagination = { page: 1, pageSize: 20 }

  // Non-critical data: defer these!
  const dropdownOptionsPromise = fetchDropdownOptions(auth)
  const sidebarDataPromise = fetchSidebarData(auth)

  return defer({
    // Synchronous: page renders immediately
    filters,
    pagination,

    // Deferred: streams in after navigation
    deferredDropdownOptions: dropdownOptionsPromise,
    deferredSidebarData: sidebarDataPromise,
  })
}`}
            </pre>

            <p>
              On the component side, use <code>Suspense</code> with <code>Await</code> to
              progressively hydrate deferred data:
            </p>

            <pre className="bg-blitz-charcoal text-blitz-white p-6 rounded-lg overflow-x-auto my-6">
{`<Suspense fallback={<SkeletonLoader />}>
  <Await
    resolve={deferredDropdownOptions}
    errorElement={<ErrorFallback />}
  >
    {(options) => <FilterDropdown options={options} />}
  </Await>
</Suspense>`}
            </pre>

            <h3>Pattern 3: Defer Main Content with Skeleton UI</h3>

            <p>
              When a single query dominates your total load time (e.g., taking 80-90% of the total duration),
              deferring secondary UI elements is not enough. In this case, defer <em>the main content
              itself</em> and show a skeleton table immediately.
            </p>

            <p>
              This was the game-changing optimization for slow pages. By deferring the
              expensive query and rendering a skeleton UI instantly, we transformed the
              user experience from "waiting several seconds staring at a loading spinner" to "seeing the page
              structure immediately with content populating progressively."
            </p>

            <pre className="bg-blitz-charcoal text-blitz-white p-6 rounded-lg overflow-x-auto my-6">
{`return defer({
  // Synchronous: page shell renders instantly
  filters: currentFilters,
  pagination: { page, pageSize },

  // DEFERRED: Main content (slow query)
  deferredMainContent: fetchMainContent(filters),
})`}
            </pre>

            <p>
              Skeleton UI implementation:
            </p>

            <pre className="bg-blitz-charcoal text-blitz-white p-6 rounded-lg overflow-x-auto my-6">
{`<Suspense
  fallback={
    <div className="flex flex-col gap-4 pt-4">
      {[...Array(10)].map((_, i) => (
        <div className="flex items-center gap-4 py-2" key={i}>
          <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
        </div>
      ))}
    </div>
  }
>
  <Await resolve={deferredMainContent}>
    {(data) => <ContentTable data={data} />}
  </Await>
</Suspense>`}
            </pre>

            <h2>Common JavaScript Performance Pitfalls</h2>

            <h3>Sequential Loops vs Promise.all</h3>

            <p>
              One of the most impactful optimizations we made involved converting sequential loops
              to parallel execution. This pattern appears frequently in backend services and loaders.
            </p>

            <p><strong>Anti-pattern (sequential - slow):</strong></p>

            <pre className="bg-blitz-charcoal text-blitz-white p-6 rounded-lg overflow-x-auto my-6">
{`async function fetchUserData(userIds: string[]) {
  const results = []

  // Each iteration waits for the previous one
  for (const userId of userIds) {
    const userData = await fetchUser(userId)
    results.push(userData)
  }

  return results
}

// If you have 5 users, each taking 100ms → 500ms total`}
            </pre>

            <p><strong>Optimized (parallel - fast):</strong></p>

            <pre className="bg-blitz-charcoal text-blitz-white p-6 rounded-lg overflow-x-auto my-6">
{`async function fetchUserData(userIds: string[]) {
  // All requests fire simultaneously
  const results = await Promise.all(
    userIds.map(userId => fetchUser(userId))
  )

  return results
}

// All 5 users fetch in parallel → 100ms total (limited by slowest)`}
            </pre>

            <div className="my-8">
              <p className="font-semibold text-blitz-charcoal mb-4">
                Visual Comparison:
              </p>

              <div className="bg-blitz-charcoal text-blitz-white p-6 rounded-lg space-y-4">
                <div>
                  <p className="text-red-400 mb-2">Sequential (500ms total):</p>
                  <pre className="text-sm">
{`User 1 ━━━━━━━━━━ 100ms
       User 2 ━━━━━━━━━━ 100ms
              User 3 ━━━━━━━━━━ 100ms
                     User 4 ━━━━━━━━━━ 100ms
                            User 5 ━━━━━━━━━━ 100ms`}
                  </pre>
                </div>

                <div>
                  <p className="text-green-400 mb-2">Parallel (100ms total):</p>
                  <pre className="text-sm">
{`User 1 ━━━━━━━━━━┐
User 2 ━━━━━━━━━━┤
User 3 ━━━━━━━━━━┼━━ 100ms (limited by slowest)
User 4 ━━━━━━━━━━┤
User 5 ━━━━━━━━━━┘`}
                  </pre>
                </div>
              </div>
            </div>

            <h3>Sequential Promise.all Chains</h3>

            <p>
              Another common anti-pattern is chaining multiple <code>Promise.all</code> calls when
              the second batch doesn't actually depend on the first batch's results.
            </p>

            <p><strong>Before (sequential batches - slow):</strong></p>

            <pre className="bg-blitz-charcoal text-blitz-white p-6 rounded-lg overflow-x-auto my-6">
{`async function fetchAggregatedData(userId: string) {
  // First batch
  const [dataA, dataB] = await Promise.all([
    fetchDataA(userId),
    fetchDataB(userId),
  ])

  // Second batch waits for first (unnecessarily!)
  const [dataC, dataD, dataE] = await Promise.all([
    fetchDataC(userId),
    fetchDataD(userId),
    fetchDataE(userId),
  ])

  return { dataA, dataB, dataC, dataD, dataE }
}`}
            </pre>

            <p><strong>After (single parallel batch - fast):</strong></p>

            <pre className="bg-blitz-charcoal text-blitz-white p-6 rounded-lg overflow-x-auto my-6">
{`async function fetchAggregatedData(userId: string) {
  // ALL queries run in parallel
  const [dataA, dataB, dataC, dataD, dataE] = await Promise.all([
    fetchDataA(userId),
    fetchDataB(userId),
    fetchDataC(userId),
    fetchDataD(userId),
    fetchDataE(userId),
  ])

  return { dataA, dataB, dataC, dataD, dataE }
}`}
            </pre>

            <h3>Accidental Sequential forEach</h3>

            <p>
              Array methods like <code>forEach</code>, <code>map</code>, and <code>filter</code>
              do not await promises automatically. This can lead to subtle race conditions.
            </p>

            <p><strong>Anti-pattern (does not wait):</strong></p>

            <pre className="bg-blitz-charcoal text-blitz-white p-6 rounded-lg overflow-x-auto my-6">
{`// This does not wait for async operations!
const results = []
items.forEach(async (item) => {
  const result = await processItem(item)
  results.push(result)
})
// results is still empty here!`}
            </pre>

            <p><strong>Correct (parallel execution):</strong></p>

            <pre className="bg-blitz-charcoal text-blitz-white p-6 rounded-lg overflow-x-auto my-6">
{`// Use Promise.all with map
const results = await Promise.all(
  items.map(item => processItem(item))
)`}
            </pre>

            <h2>Performance Metrics: Perceived vs Actual</h2>

            <p>
              An important lesson from both my Rokt and Lorikeet work is understanding the
              difference between <strong>actual performance</strong> (how long operations take)
              and <strong>perceived performance</strong> (how fast the application feels to users).
            </p>

            <blockquote className="border-l-4 border-blitz-accent pl-6 italic text-xl my-8">
              "Defer does not make your queries faster, it makes your application feel faster by
              rendering content progressively while data loads in the background."
            </blockquote>

            <p>
              This distinction is crucial. Deferring a slow query does not make it faster, the
              query still takes the same time to execute. What changed is the <strong>Time to First Contentful
              Paint (FCP)</strong>, users see meaningful content immediately instead of waiting
              for everything to load before seeing anything.
            </p>

            <div className="bg-blitz-accent/5 border-l-4 border-blitz-accent p-6 my-8">
              <p className="font-semibold text-blitz-charcoal mb-2">
                Best Practice: Track Both Metrics
              </p>
              <ul className="space-y-2 text-sm">
                <li><strong>FCP (First Contentful Paint):</strong> Perceived load time - when users see content</li>
                <li><strong>Query Duration:</strong> Actual backend performance - how long operations take</li>
                <li><strong>LCP (Largest Contentful Paint):</strong> When main content becomes visible</li>
                <li><strong>TTI (Time to Interactive):</strong> When the page becomes fully interactive</li>
              </ul>
            </div>

            <p>
              Defer is a powerful UX tool for <strong>resilience</strong>, not a substitute for
              backend optimization. The ideal scenario is fast backend queries + progressive
              rendering = exceptional user experience. Defer alone provides acceptable UX while
              masking technical debt.
            </p>

            <h2>Decision Framework: What to Defer vs Await</h2>

            <p>
              Not all data should be deferred. Use this framework to decide what to await
              synchronously vs defer for streaming:
            </p>

            <h3>Always Await (Critical Data)</h3>

            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Authentication and authorization checks</li>
              <li>Data that determines page structure/layout</li>
              <li>Data that other queries depend on</li>
              <li>Basic page shell elements (filters, navigation, breadcrumbs)</li>
            </ul>

            <h3>Consider Deferring (Non-Critical Data)</h3>

            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Filter dropdown options</li>
              <li>Secondary panels and sidebars</li>
              <li>Enhancement data (tooltips, metadata, analytics)</li>
              <li>Data only needed after user interaction</li>
            </ul>

            <h3>Defer Main Content (When Justified)</h3>

            <p>
              When a query dominates total load time (90%+ of total duration), consider deferring
              even main content:
            </p>

            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Large data tables or lists: show skeleton tables</li>
              <li>Dashboard charts: show loading chart placeholders</li>
              <li>Search results: show skeleton cards</li>
              <li>Feed-style content: show skeleton posts</li>
            </ul>

            <h3>Questions to Ask Before Deferring</h3>

            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>Can users see meaningful content without this data?</li>
              <li>Does this data populate a secondary UI element?</li>
              <li>Is there a reasonable loading/skeleton state?</li>
              <li>Do other queries depend on this result?</li>
              <li>Is this query the primary bottleneck (90%+ of load time)?</li>
            </ol>

            <h2>Important Limitations: Remix Defer Bug</h2>

            <p>
              Remix's <code>defer()</code> has a known issue (<a href="https://github.com/remix-run/remix/issues/6637" className="text-blitz-accent hover:underline" target="_blank" rel="noopener noreferrer">issue #6637</a>)
              where it does not work correctly on same-route navigation with changed URL parameters:
            </p>

            <table className="w-full border-collapse border border-blitz-charcoal/20 my-6">
              <thead>
                <tr className="bg-blitz-charcoal/5">
                  <th className="border border-blitz-charcoal/20 p-3 text-left">Scenario</th>
                  <th className="border border-blitz-charcoal/20 p-3 text-left">Defer Works?</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-blitz-charcoal/20 p-3">Initial page load</td>
                  <td className="border border-blitz-charcoal/20 p-3">✅ Yes</td>
                </tr>
                <tr>
                  <td className="border border-blitz-charcoal/20 p-3">Navigate to different route</td>
                  <td className="border border-blitz-charcoal/20 p-3">✅ Yes</td>
                </tr>
                <tr>
                  <td className="border border-blitz-charcoal/20 p-3">Change filters/date on same route</td>
                  <td className="border border-blitz-charcoal/20 p-3">❌ No (waits for all data)</td>
                </tr>
              </tbody>
            </table>

            <p>
              <strong>Impact:</strong> The defer pattern still provides significant benefits for
              initial loads and cross-route navigation. When it "fails" on same-route navigation,
              it degrades gracefully to normal await behavior - no worse than before optimization.
            </p>

            <p>
              <strong>Mitigation:</strong> The main performance wins come from parallel query
              restructuring, which works regardless of this bug.
            </p>

            <h2>Key Takeaways</h2>

            <ol className="list-decimal list-inside space-y-3 ml-4 text-lg">
              <li>
                <strong>Measure first, optimize second.</strong> Use performance markers
                (<code>Date.now()</code> for cross-context, <code>performance.now()</code>
                for high-precision) to collect production timing data before making changes.
              </li>
              <li>
                <strong>Parallelize independent queries.</strong> Start queries that don't depend
                on each other simultaneously, don't let unnecessary <code>await</code> calls block
                execution.
              </li>
              <li>
                <strong>Defer non-critical data.</strong> Use Remix's <code>defer()</code> to
                stream secondary UI data after initial page render, dramatically improving perceived
                performance.
              </li>
              <li>
                <strong>Consider deferring main content.</strong> When a single query dominates
                load time (90%+ of total), defer it with skeleton UI for instant page rendering.
              </li>
              <li>
                <strong>Convert sequential loops to Promise.all.</strong> Replace
                <code>for...of</code> loops with <code>await</code> inside using
                <code>Promise.all(items.map(...))</code> for parallel execution.
              </li>
              <li>
                <strong>Track perceived vs actual performance.</strong> Measure both FCP (when users
                see content) and query duration (actual backend performance) separately.
              </li>
              <li>
                <strong>Defer is resilience, not a fix.</strong> Use defer to improve UX immediately,
                but always investigate and optimize slow queries at the source.
              </li>
            </ol>

            <h2>Conclusion</h2>

            <p>
              Performance optimization is a systematic discipline, not magic. The methodology I
              learned while building WSDK2 at Rokt became the blueprint I used for tackling performance issues at Lorikeet.
              Instrument, measure, identify, optimize. This framework proved
              powerful enough to apply across entirely different technology stacks. Whether you are
              optimizing a third-party SDK loading in iframes or a server-side rendered React
              application, the principles remain the same.
            </p>

            <p>
              At Lorikeet, we reduced page load time from 2.2 seconds to ~700ms (68% improvement,
              3x faster) by applying these patterns systematically: parallel query execution,
              deferred loading with progressive hydration, and skeleton UI for slow queries. The
              result is a dramatically better user experience with instant navigation and progressive
              content loading.
            </p>

            <p>
              Performance is not just about speed, it is about creating delightful user experiences
              that keep visitors engaged. Start measuring today, identify your bottlenecks, and
              apply these patterns to transform your application's performance.
            </p>

            <h2>From Personal Learning to Team Capability</h2>

            <p>
              After solving these performance challenges, I documented everything I learned and turned it into
              a <strong>Claude Skill</strong> called <code>remix-performance-optimizer</code>. This transformed
              my personal expertise into institutional knowledge that anyone on my team can leverage automatically.
            </p>

            <p>
              Now when teammates encounter slow pages, Claude automatically applies these same optimization patterns
              without needing to remember the methodology or search through documentation. It's like uploading
              kung fu directly into Claude's brain - individual expertise becomes a team superpower.
            </p>

            <div className="bg-gradient-to-r from-blitz-accent/10 to-blitz-soft/10 border-l-4 border-blitz-accent p-6 my-8 rounded-r-lg">
              <p className="font-semibold text-blitz-charcoal mb-2">
                Want to learn how to turn your expertise into team capability?
              </p>
              <p className="text-sm text-blitz-charcoal/80 mb-3">
                I wrote a detailed guide on using Claude Skills to transform personal knowledge into institutional
                capability that works automatically for your entire team.
              </p>
              <Link
                to="/blog/claude-skills-institutional-knowledge"
                className="inline-flex items-center text-blitz-accent hover:underline font-medium"
              >
                Read: Claude Skills - Turning Personal Expertise into Team Superpowers
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
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

export default WebPerformancePage
