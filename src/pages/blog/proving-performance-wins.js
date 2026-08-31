import React from 'react'
import { Link } from 'gatsby'
import ArticleLayout from '../../components/ArticleLayout'
import CountUp from '../../components/motion/CountUp'

const ProvingPerformanceWinsPage = () => {
  return (
    <ArticleLayout
      title="10-12% Off Our SDK's Time to Interactive, and the A/B Skills That Measured It"
      description="Two changes cut Rokt's web SDK time to interactive by 11% at p50 and 12% at p95. Here's how we tested the result and connected latency to revenue."
      date="August 30, 2026"
      readTime="8 min read"
      category="Performance"
      slug="/blog/proving-performance-wins"
      tags={['Performance', 'Experimentation', 'A/B Testing', 'Claude Skills']}
    >
      <p className="text-lg text-blitz-charcoal/70 italic mb-8">
        <strong>TL;DR:</strong> A run of performance changes to Rokt's web SDK,
        two of which turned out to be outliers, took <strong>10-12%</strong> off
        our time to interactive, and the win held from p50 to p95. Writing the
        code was the easier half. The harder half was measuring what it was
        worth, so I packaged that method into two Claude skills,{' '}
        <code>ab-setup</code> and <code>ab-diagnose</code>. Setting up and
        reading the next one is now a step rather than a project.
      </p>

      <h2>Where the 10-12% Landed</h2>

      <p>
        Rokt's web SDK renders offers inside partners' checkout and confirmation
        pages. Within a month, I shipped a group of performance changes. Most
        made small improvements. Two were outliers and accounted for most of the
        measurable reduction in startup time. I could not have told you in
        advance which two they would be.
      </p>

      <div className="bg-gradient-to-r from-blitz-accent/10 to-blitz-soft/10 border border-blitz-accent/20 p-8 rounded-lg my-8">
        <p className="text-xl font-semibold text-blitz-primary mb-4">
          What the Two Outliers Bought
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-3xl font-bold text-blitz-accent">
              <CountUp value={11} prefix="−" suffix="%" />
            </p>
            <p className="text-sm text-blitz-charcoal/70">
              Time to interactive at p50
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
              Modeled revenue impact at p50
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blitz-accent">
              <CountUp value={1.4} decimals={1} suffix="–1.9%" />
            </p>
            <p className="text-sm text-blitz-charcoal/70">
              Modeled revenue impact at p95
            </p>
          </div>
        </div>
      </div>

      <p>
        Seeing the same proportional improvement at p95 was the part I was
        happiest about. Those sessions are the ones most affected by slow
        devices and networks, and the absolute time saved was larger.
      </p>

      <h2>I Came Back With a List</h2>

      <p>
        I'm a boomerang, and I had some unfinished business to prove myself. I
        came back with a shortlist of performance problems I had noticed the
        first time around, which gave me somewhere practical to start instead of
        a blank profiler trace.
      </p>

      <p>
        Rokt talks a lot about “speed of iteration,” and I took that literally:
        test an idea quickly, measure it, keep what worked, and move on from
        what didn't.
      </p>

      <p>
        The first change was not glamorous: a bundle-size budget in CI. Every
        pull request now shows its size delta, so regressions are visible during
        review rather than months later. That bit of plumbing made every change
        after it easier to judge.
      </p>

      <h3>Two Ways We Cut Startup Time</h3>

      <p>
        I grouped the runtime work into two categories: reduce the JavaScript
        needed before render, and remove unnecessary delays from startup.
      </p>

      <h4 className="text-lg mt-8 mb-3">Load Less JavaScript Before Render</h4>

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

      <h4 className="text-lg mt-8 mb-3">Remove Startup Delays</h4>

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
        speculative preloads that no longer paid off. None produced a headline
        number alone, but I would ship every one of them again.
      </p>

      <h3>Leverage First, Delegate Second</h3>

      <p>
        AI helped me move through the list much faster. While an idea was still
        unproven, I kept the work interactive: trace this await chain, show what
        enters this bundle, and challenge this hypothesis. Once I chose an
        approach, I delegated the repetitive call-site edits and tests. That is
        the split I describe in{' '}
        <Link
          to="/blog/ai-coding-workflows"
          className="text-blitz-accent hover:underline"
        >
          AI-Assisted Coding Workflows: Delegating vs Leveraging
        </Link>
        .
      </p>

      <h3>What the Two Outliers Had in Common</h3>

      <p>
        Neither of the two largest gains made an individual calculation faster.
        One reduced how much JavaScript had to arrive and be parsed before
        render. The other moved nonessential work until after render. Both
        shortened the startup path that users wait for.
      </p>

      <p>
        Existing timing markers already surrounded those phases, which made the
        gains measurable. Other changes reduced CPU or memory within a phase and
        did not necessarily move a phase-boundary metric. For every experiment,
        we wrote down which timing should change before looking at the result.
      </p>

      <h2>Now, How Do We Measure It?</h2>

      <p>
        So we'd made it faster. That felt good, but a latency chart only answers
        half the question. I also wanted to know whether the change appeared
        where the code said it should and what those milliseconds might be
        worth.
      </p>

      <h3>We're a Guest on Someone Else's Page</h3>

      <p>
        The SDK runs as third-party code on partner pages, so its startup time
        comes directly from their page-load budget. Rokt had also run a
        controlled delay study that estimated how revenue changes with each
        added second of latency. We could use that relationship in reverse to
        estimate the value of time saved.
      </p>

      <h3>The Measurement Was Harder Than the Code</h3>

      <p>
        The main result came from a combined holdback. Traffic was split 50/50:
        one cohort ran with the performance changes and one without them. We
        analyzed a closed window instead of checking the result each day and
        stopping when it looked favorable. That is where the 10-12% comes from,
        and it is the number I would put my name on.
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

      <h2>What's the Impact?</h2>

      <p>
        This was the number I really wanted to understand. With the delay study
        as a conversion between seconds and revenue, the latency result became
        something we could estimate in business terms.
      </p>

      <p>
        The model estimated a <strong>0.3–0.5%</strong> revenue improvement at
        p50 and <strong>1.4–1.9%</strong> at p95. The p95 range is higher
        because the model uses seconds, not percentages. Saving 12% at p95
        removes more milliseconds than saving 11% at p50.
      </p>

      <p>
        In the holdback itself, revenue per transaction moved{' '}
        <strong>+0.20%</strong>. Seeing that was exciting. The direction matched
        the model, but the result was not statistically significant at this
        sample size, so I treat it as supporting evidence rather than a proven
        revenue increase.
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

      <h2>The Skills We Built So the Next One Is Easier</h2>

      <p>
        Doing this once was expensive, and I did not want to reconstruct it six
        months later. I moved the setup and query checks into two{' '}
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
            Before the data exists
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
            After it has soaked
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

      <h2>What I'd Tell You to Do</h2>

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

      <h2>Closing Thoughts</h2>

      <p>
        Even without a revenue estimate, I'd be proud of this work. The SDK now
        sends less JavaScript during startup. We also removed brittle
        assumptions about what must finish before rendering, giving people a
        faster experience, especially on slower sessions. The codebase is easier
        for the next engineer to change too. Those outcomes matter on their own.
      </p>

      <p>
        Putting a business estimate beside the latency result helped me explain
        why the work deserves more investment. It also helps the team get credit
        for improvements that can otherwise be dismissed as maintenance. That
        translation should start with the work, not when someone asks for a
        summary at the end.
      </p>

      <p>
        The measurement took more effort than the optimizations, which is why{' '}
        <code>ab-setup</code> and <code>ab-diagnose</code> are probably what I'm
        happiest about. The code changes improve the product today. The skills
        give the next experiment a better starting point, with the assignment,
        power and analysis rules already written down. It's the same lesson I
        took from the{' '}
        <Link
          to="/blog/cutting-load-times-at-lorikeet"
          className="text-blitz-accent hover:underline"
        >
          bundle and transfer work
        </Link>
        : measure early and say exactly what the data shows.
      </p>

      <p>
        I'm proud of the 10-12%. I'm just as proud that we can explain where it
        came from, what it might be worth, and where the evidence stops.
      </p>

      <p>The numbers matter. So does earning the right to quote them.</p>
    </ArticleLayout>
  )
}

export default ProvingPerformanceWinsPage
