import React from 'react'
import { Link } from 'gatsby'
import ArticleLayout from '../../components/ArticleLayout'
import CountUp from '../../components/motion/CountUp'

const WebPerformancePage = () => {
  return (
    <ArticleLayout
      title="From SDK to SSR: Performance Optimization Lessons Across Frameworks"
      description="The instrument-measure-identify-optimize loop I learned building Rokt's SDK, applied to a slow Remix app at Lorikeet: parallel queries, defer, and skeleton UI cut observed page load from 2.2s to ~700ms."
      date="December 29, 2025"
      readTime="9 min read"
      category="Performance"
      slug="/blog/sdk-to-ssr-performance-optimization"
      tags={['Performance', 'SSR', 'React']}
    >
      <p className="text-lg text-blitz-charcoal/70 italic mb-8">
        <strong>TL;DR:</strong> The same loop works everywhere: instrument,
        measure, identify, optimize. I learned it building Rokt's web SDK and
        reused it on a slow Remix page at Lorikeet, where parallelizing
        independent queries and deferring slow ones behind skeleton UI took
        observed page load from about 2.2 seconds to about 700ms. One caveat
        worth knowing upfront: defer makes pages <em>feel</em> faster, it
        doesn't make queries faster.
      </p>

      <h2>Prologue: Building Performance Culture at Rokt</h2>

      <p>
        Before the Lorikeet work, the foundation: I was part of the team that
        built WSDK2 at Rokt, where we cut SDK load time by 30% and script size
        by 40% across thousands of client integrations. What made that work
        successful wasn't any single optimization. It was the methodology:{' '}
        <strong>instrument, measure, identify, optimize</strong>. That loop
        turned out to be framework-agnostic, and it's the through-line of this
        post, from third-party SDKs running in iframes to server-side rendered
        React applications.
      </p>

      <h2>Measure First</h2>

      <p>
        You cannot improve what you do not measure. Performance optimization
        without data is guesswork: you need concrete numbers to identify
        bottlenecks, validate improvements, and communicate impact. HAR files,
        Lighthouse, and the DevTools Performance tab all have their place, but
        the approach that paid off most for the Remix work was simple
        instrumentation in the code itself.
      </p>

      <h3>Performance Markers: The Foundation of Optimization</h3>

      <p>
        At Rokt, we instrumented WSDK2 with <code>Date.now()</code> markers
        throughout the initialization flow. Why <code>Date.now()</code> instead
        of <code>performance.now()</code>? Because we were measuring across{' '}
        <strong>cross-origin iframes</strong>, from both the client website and
        the Rokt SDK. <code>Date.now()</code> gives consistent timestamps across
        iframe boundaries, whereas <code>performance.now()</code> is relative to
        each browsing context's time origin. For the Remix loaders at Lorikeet,
        we switched to <code>performance.now()</code>: everything runs in a
        single Node.js process, so we get microsecond resolution and monotonic
        timing that's immune to system clock adjustments.
      </p>

      <div className="bg-blitz-accent/5 border-l-4 border-blitz-accent p-6 my-8">
        <p className="font-semibold text-blitz-charcoal mb-2">
          Key Insight: Choose Your Timer Wisely
        </p>
        <ul className="space-y-2 text-sm">
          <li>
            <strong>Use Date.now()</strong> when measuring across different
            contexts (iframes, workers, multiple browser tabs)
          </li>
          <li>
            <strong>Use performance.now()</strong> for high-precision
            measurements within a single JavaScript context
          </li>
          <li>
            <strong>Use performance.mark()</strong> for integration with browser
            DevTools and the Performance API
          </li>
        </ul>
      </div>

      <h3>Collecting Production Timing Data</h3>

      <p>
        Synthetic tests and local development don't capture real user
        conditions: network latency, device capabilities, cache states. So we
        shipped the markers to production. Here's what typical timing data
        looked like for a slow Remix route:
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
        One query was eating 70-80% of total load time. That's the insight you
        need before touching any code: now you know exactly where the effort
        should go.
      </p>

      <h2>The Result at Lorikeet</h2>

      <p>
        The slowest page in our web application averaged around{' '}
        <strong>2.2 seconds</strong> to load. After applying the three patterns
        below, observed page load, the time until users see meaningful content,
        came down to roughly 700ms:
      </p>

      <div className="bg-gradient-to-r from-blitz-accent/10 to-blitz-soft/10 border border-blitz-accent/20 p-8 rounded-lg my-8">
        <p className="text-2xl font-bold text-blitz-primary mb-4">
          Observed page load: 2.2s → ~700ms
        </p>
        <p className="text-lg">
          <strong>
            <CountUp value={68} suffix="% faster to meaningful content" />
          </strong>
        </p>
        <p className="text-sm text-blitz-charcoal/70 mt-3">
          To be precise about what moved: parallelizing queries cut actual
          loader time, and deferring the slowest query behind skeleton UI cut
          the time users wait to see the page. The slow query itself still takes
          as long as it always did. More on that distinction below.
        </p>
      </div>

      <p>
        These aren't exotic tricks. They're patterns recommended by the Remix
        team and taught in depth by Kent C. Dodds in his{' '}
        <a
          href="https://frontendmasters.com/courses/advanced-remix/"
          className="text-blitz-accent hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Advanced Remix Frontend Masters course
        </a>
        . Here's what worked.
      </p>

      <h2>Pattern 1: Parallel Query Execution</h2>

      <p>
        The first issue we found: queries that didn't depend on each other were
        running one after another. This is the most common performance
        anti-pattern in async JavaScript. When queries are independent, they
        should run in parallel, period.
      </p>

      <p>
        <strong>Before (sequential - slow):</strong>
      </p>

      <pre className="bg-blitz-charcoal text-blitz-white p-6 rounded-lg overflow-x-auto my-6">
        {`// ❌ configData blocks independentQuery unnecessarily
const configData = await fetchConfig(auth)

// This starts AFTER configData completes (bad!)
const independentQueryPromise = fetchIndependentData(auth)

const dependentQueryPromise = fetchDependentData(configData)

await Promise.all([independentQueryPromise, dependentQueryPromise])`}
      </pre>

      <p>
        <strong>After (parallel - fast):</strong>
      </p>

      <pre className="bg-blitz-charcoal text-blitz-white p-6 rounded-lg overflow-x-auto my-6">
        {`// ✅ Start independent queries immediately
const independentQueryPromise = fetchIndependentData(auth)

// Only await config when actually needed
const configData = await fetchConfig(auth)

const dependentQueryPromise = fetchDependentData(configData)

await Promise.all([independentQueryPromise, dependentQueryPromise])`}
      </pre>

      <p>
        <strong>Key insight:</strong> Start independent queries <em>before</em>{' '}
        awaiting dependencies they don't need. This simple reordering can shave
        hundreds of milliseconds off your critical path.
      </p>

      <h3>The Same Bug in Loop Form</h3>

      <p>
        The sequential-await mistake shows up in loops too, and it's worth
        recognizing on sight. A <code>for...of</code> loop with an{' '}
        <code>await</code> inside runs every iteration back to back: five users
        at 100ms each is 500ms. The fix is{' '}
        <code>Promise.all(items.map(...))</code>, which fires all requests
        simultaneously and finishes when the slowest one does:
      </p>

      <pre className="bg-blitz-charcoal text-blitz-white p-6 rounded-lg overflow-x-auto my-6">
        {`// ❌ Sequential: each iteration waits for the previous one
for (const userId of userIds) {
  results.push(await fetchUser(userId))
}
// 5 users × 100ms → 500ms total

// ✅ Parallel: all requests fire simultaneously
const results = await Promise.all(
  userIds.map(userId => fetchUser(userId))
)
// 5 users in parallel → 100ms total (limited by slowest)`}
      </pre>

      <p>
        Two related traps: chaining multiple <code>Promise.all</code> batches
        when the second batch doesn't actually depend on the first (merge them
        into one), and using <code>forEach</code> with an async callback, which
        doesn't await anything. Your array is still empty when the next line
        runs. Use <code>Promise.all</code> with <code>map</code> instead.
      </p>

      <h2>Pattern 2: Defer Non-Critical Data</h2>

      <p>
        Remix's <code>defer()</code> utility streams non-critical data after
        navigation, so users see content immediately while the rest loads in the
        background:
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
        On the component side, use <code>Suspense</code> with <code>Await</code>{' '}
        to progressively hydrate deferred data:
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

      <h2>Pattern 3: Defer Main Content with Skeleton UI</h2>

      <p>
        When a single query dominates your total load time, deferring secondary
        UI elements isn't enough. In that case, defer{' '}
        <em>the main content itself</em> and show a skeleton immediately. This
        was our biggest UX win: instead of staring at a spinner for seconds,
        users see the page structure instantly with content populating
        progressively.
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

      <p>Skeleton UI implementation:</p>

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

      <h2>Perceived vs Actual Performance</h2>

      <blockquote className="border-l-4 border-blitz-accent pl-6 italic text-xl my-8">
        "Defer does not make your queries faster, it makes your application feel
        faster by rendering content progressively while data loads in the
        background."
      </blockquote>

      <p>
        This distinction matters. Deferring a slow query changes your{' '}
        <strong>First Contentful Paint</strong>, when users see meaningful
        content, but the query still takes exactly as long to execute. So track
        both: FCP and LCP for what users experience, raw query duration for
        backend health. Defer is a resilience tool, not a substitute for
        optimizing the slow query at its source. Fast queries plus progressive
        rendering is the goal. Defer alone gives you acceptable UX while masking
        technical debt.
      </p>

      <h2>What to Defer vs Await</h2>

      <p>
        Not everything should be deferred. Always await authentication, data
        that determines page structure, and anything other queries depend on.
        Good defer candidates are secondary elements: dropdown options,
        sidebars, tooltips, analytics. Defer main content only when one query
        dominates total load time and you can show a sensible skeleton in its
        place.
      </p>

      <p>Before deferring anything, ask:</p>

      <ol className="list-decimal list-inside space-y-2 ml-4">
        <li>Can users see meaningful content without this data?</li>
        <li>Is there a reasonable loading/skeleton state?</li>
        <li>Do other queries depend on this result?</li>
        <li>Is this query the primary bottleneck?</li>
      </ol>

      <h2>Important Limitations: Remix Defer Bug</h2>

      <p>
        Remix's <code>defer()</code> has a known issue (
        <a
          href="https://github.com/remix-run/remix/issues/6637"
          className="text-blitz-accent hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          issue #6637
        </a>
        ) where it does not work correctly on same-route navigation with changed
        URL parameters:
      </p>

      <table className="w-full border-collapse border border-blitz-charcoal/20 my-6">
        <thead>
          <tr className="bg-blitz-charcoal/5">
            <th className="border border-blitz-charcoal/20 p-3 text-left">
              Scenario
            </th>
            <th className="border border-blitz-charcoal/20 p-3 text-left">
              Defer Works?
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-blitz-charcoal/20 p-3">
              Initial page load
            </td>
            <td className="border border-blitz-charcoal/20 p-3">✅ Yes</td>
          </tr>
          <tr>
            <td className="border border-blitz-charcoal/20 p-3">
              Navigate to different route
            </td>
            <td className="border border-blitz-charcoal/20 p-3">✅ Yes</td>
          </tr>
          <tr>
            <td className="border border-blitz-charcoal/20 p-3">
              Change filters/date on same route
            </td>
            <td className="border border-blitz-charcoal/20 p-3">
              ❌ No (waits for all data)
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        In practice this is livable: defer still helps on initial loads and
        cross-route navigation, and when it "fails" on same-route navigation it
        degrades gracefully to normal await behavior, no worse than before. And
        the biggest wins came from parallel query restructuring anyway, which
        works regardless of this bug.
      </p>

      <h2>Conclusion</h2>

      <p>
        Performance optimization is a systematic discipline, not magic. The
        methodology I learned building WSDK2 at Rokt, instrument, measure,
        identify, optimize, worked just as well on a server-side rendered React
        app. The stack changes; the loop doesn't. Start measuring today,
        identify your bottleneck, and apply the pattern that fits: parallelize
        what's independent, defer what's secondary, and skeleton what's slow.
      </p>

      <h2>From Personal Learning to Team Capability</h2>

      <p>
        After this work, I documented the whole methodology as a Claude Skill
        called <code>remix-page-load-optimization</code>. Now when teammates hit
        a slow page, Claude applies these same patterns, including the honest
        limitations about when defer doesn't help, without anyone needing to
        remember the details or dig through docs.
      </p>

      <div className="bg-gradient-to-r from-blitz-accent/10 to-blitz-soft/10 border-l-4 border-blitz-accent p-6 my-8 rounded-r-lg">
        <p className="font-semibold text-blitz-charcoal mb-2">
          Want to learn how to turn your expertise into team capability?
        </p>
        <p className="text-sm text-blitz-charcoal/80 mb-3">
          I wrote a detailed guide on using Claude Skills to transform personal
          knowledge into institutional capability that works automatically for
          your entire team.
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
    </ArticleLayout>
  )
}

export default WebPerformancePage
