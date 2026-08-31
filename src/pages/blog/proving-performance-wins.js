import React from 'react'
import { Link } from 'gatsby'
import ArticleLayout from '../../components/ArticleLayout'
import CountUp from '../../components/motion/CountUp'

const ProvingPerformanceWinsPage = () => {
  return (
    <ArticleLayout
      title="We Cut SDK Time to Interactive by 10–12%. Here's How We Proved It"
      description="Two changes cut Rokt's web SDK time to interactive by 11% at the median and 12% at p95. Here's how we tested the result and connected latency to revenue."
      date="August 30, 2026"
      readTime="8 min read"
      category="Performance"
      slug="/blog/proving-performance-wins"
      tags={['Performance', 'Experimentation', 'A/B Testing', 'Claude Skills']}
    >
      <p className="text-lg text-blitz-charcoal/70 italic mb-8">
        <strong>TL;DR:</strong> Two changes cut Rokt's web SDK time to
        interactive by <strong>11% at the median</strong> and{' '}
        <strong>12% at p95</strong>. A randomized holdback confirmed the latency
        result. Revenue moved in the expected direction, but not with enough
        statistical power to call it a win. I turned the experiment setup and
        analysis into two Claude skills so the next test is easier to run.
      </p>

      <h2>The Result</h2>

      <p>
        Rokt's web SDK renders offers inside partners' checkout and confirmation
        pages. Over several months, I shipped a group of performance changes.
        Most made small improvements. Two accounted for most of the measurable
        reduction in startup time.
      </p>

      <div className="bg-gradient-to-r from-blitz-accent/10 to-blitz-soft/10 border border-blitz-accent/20 p-8 rounded-lg my-8">
        <p className="text-xl font-semibold text-blitz-primary mb-4">
          Measured latency and modeled business impact
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-3xl font-bold text-blitz-accent">
              <CountUp value={11} prefix="−" suffix="%" />
            </p>
            <p className="text-sm text-blitz-charcoal/70">
              Time to interactive at the median
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blitz-accent">
              <CountUp value={12} prefix="−" suffix="%" />
            </p>
            <p className="text-sm text-blitz-charcoal/70">
              Time to interactive at p95
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blitz-accent">
              <CountUp value={0.3} decimals={1} suffix="–0.5%" />
            </p>
            <p className="text-sm text-blitz-charcoal/70">
              Modeled revenue impact for a median session
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blitz-accent">
              <CountUp value={1.4} decimals={1} suffix="–1.9%" />
            </p>
            <p className="text-sm text-blitz-charcoal/70">
              Modeled revenue impact for the slowest 5% of sessions
            </p>
          </div>
        </div>
      </div>

      <p>
        The p95 result matters because it covers the sessions most affected by
        slow devices and networks. The relative improvement was similar to the
        median, while the absolute time saved was larger.
      </p>

      <h2>What Changed</h2>

      <p>
        I'm a boomerang employee: I worked at Rokt, left, then came back. I
        returned with a shortlist of performance problems I had noticed the
        first time around. That gave me a practical place to start instead of a
        blank profiler trace.
      </p>

      <p>
        Before changing runtime code, I added a bundle-size budget in CI. Every
        pull request now shows its size delta, so regressions are visible during
        review rather than months later.
      </p>

      <p>
        I grouped the runtime work around two questions: can we ship less, or
        can we wait less?
      </p>

      <h3>Ship less</h3>

      <ul>
        <li>
          Code-split features that most sessions do not need during startup.
        </li>
        <li>
          Removed legacy polyfills after defining an explicit browser-support
          floor, then consolidated duplicated helpers.
        </li>
        <li>Stopped loading code for features disabled in configuration.</li>
      </ul>

      <h3>Wait less</h3>

      <ul>
        <li>
          Ran independent async work concurrently and used the earliest
          readiness signal that each task required.
        </li>
        <li>
          Split bootstrap into work required before render and work that could
          happen afterwards.
        </li>
      </ul>

      <p>
        Smaller changes helped too: memoizing hot factories, making event
        subscriptions lazy, cancelling superseded requests, and removing
        speculative preloads that no longer paid off. I would still ship those
        changes, but I would not present each one as a statistically proven
        improvement.
      </p>

      <h3>Shorten the critical path</h3>

      <p>
        The two largest gains did not make an individual calculation faster. One
        reduced how much JavaScript had to arrive and be parsed before render.
        The other moved nonessential work until after render. Both shortened the
        startup path that users wait for.
      </p>

      <p>
        Existing timing markers already surrounded those phases, which made the
        gains measurable. Other changes reduced CPU or memory within a phase and
        did not necessarily move a phase-boundary metric. For every experiment,
        we wrote down which timing should change before looking at the result.
      </p>

      <h3>How I used AI</h3>

      <p>
        AI helped me test more candidates quickly. During discovery, I worked
        with it interactively: trace this await chain, show what enters this
        bundle, and challenge this hypothesis. After I chose an approach, I
        delegated repetitive call-site edits and tests. I describe that split in{' '}
        <Link
          to="/blog/ai-coding-workflows"
          className="text-blitz-accent hover:underline"
        >
          AI-Assisted Coding Workflows: Delegating vs Leveraging
        </Link>
        .
      </p>

      <h2>How We Tested It</h2>

      <p>
        The main result came from a combined holdback. Traffic was split 50/50:
        one cohort ran with the performance changes and one without them. We
        analyzed a closed window instead of checking the result each day and
        stopping when it looked favorable.
      </p>

      <p>
        The latency difference appeared quickly, but we ran the test for several
        days to check that assignment stayed balanced and daily results were
        consistent. Revenue needed much more data because the expected change
        was only a fraction of a percent.
      </p>

      <p>
        One of the two main changes also had its own randomized arm. That let us
        check whether the improvement appeared in the phase changed by the code:
      </p>

      <table className="w-full border-collapse border border-blitz-charcoal/20 my-6">
        <thead>
          <tr className="bg-blitz-charcoal/5">
            <th className="border border-blitz-charcoal/20 p-3 text-left">
              Metric
            </th>
            <th className="border border-blitz-charcoal/20 p-3 text-right">
              p20
            </th>
            <th className="border border-blitz-charcoal/20 p-3 text-right">
              p50
            </th>
            <th className="border border-blitz-charcoal/20 p-3 text-right">
              p90
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-blitz-charcoal/20 p-3">
              SDK time to interactive
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right">
              −3.2%
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right font-medium text-green-600">
              −5.3%
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right font-medium text-green-600">
              −6.0%
            </td>
          </tr>
          <tr>
            <td className="border border-blitz-charcoal/20 p-3">
              Framework startup phase changed by the code
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right font-medium text-green-600">
              −6.7%
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right font-medium text-green-600">
              −5.5%
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right font-medium text-green-600">
              −17.7%
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        The framework phase improved across all three percentiles. A later
        phase, untouched by the code, stayed flat in the same analysis. That
        mechanism check gave us better evidence than a top-level latency chart
        alone.
      </p>

      <h2>From Milliseconds to Revenue</h2>

      <p>
        The SDK runs as third-party code on partner pages, so its startup time
        comes directly from their page-load budget. Rokt had also run a
        controlled delay study that estimated how revenue changes with each
        added second of latency. We used that relationship in reverse to
        estimate the value of time saved.
      </p>

      <p>
        The model estimated a <strong>0.3–0.5%</strong> revenue improvement for
        a median session and <strong>1.4–1.9%</strong> for the slowest 5% of
        sessions. The second range is higher because the model uses seconds, not
        percentages. Saving 12% from a slow session removes more milliseconds
        than saving 11% from a fast one.
      </p>

      <p>
        In the holdback itself, revenue per transaction moved{' '}
        <strong>+0.20%</strong>. The direction matched the model, but the result
        was not statistically significant at this sample size. I treat it as
        supporting evidence, not a proven revenue increase.
      </p>

      <p>
        For context, Rokt{' '}
        <a
          href="https://www.afr.com/street-talk/bruce-buchanan-s-6b-rokt-posts-us834m-revenue-misses-bj-forecast-20260329-p5zjog"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blitz-accent hover:underline"
        >
          reported US$834 million in revenue
        </a>{' '}
        last year. That figure shows the scale involved, but it is not a base I
        can multiply by 0.20%. The SDK covers only part of company revenue, and
        the observed movement was not conclusive.
      </p>

      <h2>Making the Method Reusable</h2>

      <p>
        The first experiment required too much manual setup and too many query
        checks. I moved that work into two{' '}
        <Link
          to="/blog/claude-skills-institutional-knowledge"
          className="text-blitz-accent hover:underline"
        >
          Claude Skills
        </Link>
        , each with one job.
      </p>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="bg-blitz-accent/5 border border-blitz-accent/20 p-6 rounded-lg">
          <p className="font-mono text-sm text-blitz-accent mb-2">ab-setup</p>
          <p className="font-semibold text-blitz-charcoal mb-3">
            Before the experiment
          </p>
          <ul className="space-y-2 text-sm text-blitz-charcoal/80">
            <li>
              Create stable control and treatment assignment with one enrollment
              marker per session
            </li>
            <li>Add deterministic arm controls for end-to-end tests</li>
            <li>
              Check required traffic and pre-register the primary metric, window
              and guardrails
            </li>
            <li>
              Treat missing rollout configuration as control and include removal
              steps
            </li>
          </ul>
        </div>
        <div className="bg-blitz-soft/10 border border-blitz-soft/30 p-6 rounded-lg">
          <p className="font-mono text-sm text-blitz-primary mb-2">
            ab-diagnose
          </p>
          <p className="font-semibold text-blitz-charcoal mb-3">
            After the experiment
          </p>
          <ul className="space-y-2 text-sm text-blitz-charcoal/80">
            <li>
              Verify production markers and test the sample ratio before
              querying outcomes
            </li>
            <li>
              Build cohorts from enrollment rather than successful outcomes
            </li>
            <li>
              Apply traffic exclusions consistently and use the correct
              population for each metric
            </li>
            <li>
              Report uncertainty and power, then save the analysis before
              removing experiment code
            </li>
          </ul>
        </div>
      </div>

      <p>
        A document still depends on someone remembering to find it. A skill is
        available when the experiment starts and can generate the setup, checks
        and analysis from the same rules each time.
      </p>

      <h2>What I'd Repeat</h2>

      <ol className="list-decimal list-inside space-y-3 ml-4 text-lg">
        <li>
          <strong>Choose the outcome before the optimization.</strong> Decide
          which user timing should move and how it connects to a business
          metric.
        </li>
        <li>
          <strong>Test the mechanism.</strong> Name the phase that should change
          and at least one nearby metric that should not.
        </li>
        <li>
          <strong>Check power early.</strong> If the revenue effect needs months
          of traffic, make latency the primary claim from the start.
        </li>
        <li>
          <strong>Separate measurements from estimates.</strong> The 11–12%
          latency reduction was measured; the revenue ranges were modeled; the
          +0.20% observation was directional.
        </li>
        <li>
          <strong>Use AI according to uncertainty.</strong> Work together while
          exploring, then delegate repetitive implementation once the approach
          is clear.
        </li>
      </ol>

      <h2>The Takeaway</h2>

      <p>
        The technical result is clear: time to interactive fell 11% at the
        median and 12% at p95. The revenue evidence is encouraging but not
        conclusive. The experiment design lets me state both without stretching
        either one.
      </p>

      <p>
        The optimizations are already in production. The longer-term benefit is
        a faster way to test the next idea without rebuilding the experiment
        process from scratch.
      </p>
    </ArticleLayout>
  )
}

export default ProvingPerformanceWinsPage
