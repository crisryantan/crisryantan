import React from 'react'
import { Link } from 'gatsby'
import ArticleLayout from '../../components/ArticleLayout'
import CountUp from '../../components/motion/CountUp'
import BeforeAfterBars from '../../components/motion/BeforeAfterBars'

const ProvingPerformanceWinsPage = () => {
  return (
    <ArticleLayout
      title="Shipping Was the Easy Part: How to Prove a Performance Win Actually Mattered"
      description="Two performance initiatives cut our SDK's time to interactive by 10-12%, holding from p50 out to p95, worth an estimated 0.3-1.9% of revenue on the surface it touches. Here's how we measured it, and the two A/B skills that made the method repeatable."
      date="August 30, 2026"
      readTime="10 min read"
      category="Performance"
      slug="/blog/proving-performance-wins"
      tags={['Performance', 'Experimentation', 'A/B Testing', 'Claude Skills']}
    >
      <p className="text-lg text-blitz-charcoal/70 italic mb-8">
        <strong>TL;DR:</strong> Two performance initiatives cut our web SDK's
        time to interactive by <strong>10-12%</strong>, holding from the median
        out to p95, worth an estimated <strong>0.3-1.9%</strong> of revenue on
        the surface it renders on. The code was the easy part. What turned it
        into a number stakeholders could plan around was the measurement, so I
        packaged that method into two Claude skills, <code>ab-setup</code> and{' '}
        <code>ab-diagnose</code>, and the whole team now gets it for free.
      </p>

      <h2>
        We Cut Our SDK's Time to Interactive by 10-12%. Here's What That Was
        Worth.
      </h2>

      <p>
        Two initiatives, shipped over a few months into a web SDK that boots on
        other companies' checkout pages. Together they took 10-12% off the SDK's
        time to interactive, the span from our code starting to our content
        being usable, and the win held from the median all the way out to p95.
        Run through our internal latency-to-revenue elasticity, that's an
        estimated 0.3-1.9% of revenue on the surface the SDK renders on.
      </p>

      <div className="bg-gradient-to-r from-blitz-accent/10 to-blitz-soft/10 border border-blitz-accent/20 p-8 rounded-lg my-8">
        <p className="text-xl font-semibold text-blitz-primary mb-4">
          What Two Initiatives Bought
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-3xl font-bold text-blitz-accent">
              <CountUp value={11} prefix="−" suffix="%" />
            </p>
            <p className="text-sm text-blitz-charcoal/70">
              SDK time to interactive at the median
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blitz-accent">
              <CountUp value={12} prefix="−" suffix="%" />
            </p>
            <p className="text-sm text-blitz-charcoal/70">
              SDK time to interactive at p95, so the win holds in the tail
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blitz-accent">
              <CountUp value={0.3} decimals={1} suffix="–0.5%" />
            </p>
            <p className="text-sm text-blitz-charcoal/70">
              Estimated revenue impact at the median, via the latency elasticity
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blitz-accent">
              <CountUp value={1.4} decimals={1} suffix="–1.9%" />
            </p>
            <p className="text-sm text-blitz-charcoal/70">
              Estimated revenue impact for the slowest tail of traffic
            </p>
          </div>
        </div>
      </div>

      <p>
        The band matters more than any single figure. A win that holds from p50
        to p95 is a different animal from one that shows up in an average: the
        slowest sessions, on old phones and bad networks where people actually
        abandon, got the same proportional relief as the fast ones.
      </p>

      <p>
        And that second pair of numbers is why anyone outside my team cared.
        Same work, same commits, two sentences. "We cut time to interactive by
        11%" is a status update. "This is worth an estimated 0.3-1.9% of revenue
        on the surface it touches" is a decision input. The engineering didn't
        change between them. The measurement did.
      </p>

      <p>
        Performance work is the part of this job I like most, and a table like
        that one is the payoff. But I've carried a result like it into a room
        before and got a fair question back: so what does that mean for us? I'd
        measured latency and they'd asked about outcomes. Those aren't the same
        sentence, and the translation between them is our job, not theirs.
      </p>

      <p>
        That translation is what being <strong>product-first</strong> actually
        buys you, and it starts long before the readout. It changes which
        optimizations you pick up, favouring the ones whose effect you can
        defend over the ones that are satisfying to write. It changes how you
        instrument, because you add the marker while the change is still cheap.
        And it changes what you report, because "who did this help, and by how
        much" is a product question that a fleet-wide percentile refuses to
        answer.
      </p>

      <h3>Why This Isn't a Vanity Metric</h3>

      <p>
        We don't own the page our code runs on. Rokt embeds its SDK directly
        into partner pages, the checkout and confirmation flows of retailers,
        airlines and ticketing sites, sitting alongside their code and inside
        their load budget. Every millisecond we spend booting is spent out of
        someone else's page. A slow third-party script isn't a slightly worse
        experience, it's a cost you're imposing on a team that agreed to host
        you, and they can see it in their own numbers. Being fast is the price
        of being welcome there.
      </p>

      <p>
        We also had a conversion rate for it. A latency-injection study, where
        you deliberately slow a random slice of traffic and watch what happens
        to the outcome you care about, gives you an elasticity. Ours came out
        around 3-4% revenue movement per second of time to interactive. If your
        team doesn't have that number, it's the single highest-leverage
        experiment you can run, because one constant turns every millisecond
        into a sentence a stakeholder can plan around. It also raises the stakes
        on measurement, in that a wrong latency number now converts straight
        into a wrong revenue claim.
      </p>

      <h2>Coming Back Knowing Where the Debt Was</h2>

      <p>
        I'm a boomerang. Worked here, left, came back. That turns out to be a
        real advantage for performance work, because the expensive part of
        speeding up a mature codebase isn't writing the optimization, it's
        knowing which slow things are slow for a good reason. I already had that
        map. Some of the debt I helped create.
      </p>

      <p>
        So I didn't start with a profiler and a blank mind. I started with a
        list I'd been carrying for years: every place I remembered as needlessly
        eager, needlessly serial, or needlessly large. Then I let my brain run
        flat out for a few months. Pull a thread, measure it, drop it, pull the
        next one. No ceremony, no roadmap, no falling in love with the first
        idea. Most were small. Two were disproportionate, and I couldn't have
        told you in advance which two.
      </p>

      <h3>None of the Techniques Were Clever</h3>

      <p>
        This was the standard frontend checklist, applied by someone who knew
        where to point it:
      </p>

      <ul>
        <li>
          <strong>Code splitting.</strong> Take a subtree most sessions don't
          need in the first moments, move it into its own dynamically imported
          chunk, and fetch it in parallel with work that has to happen anyway.
        </li>
        <li>
          <strong>Bundle reduction.</strong> Drop legacy polyfills, raise the
          compile target behind an explicit browser-support floor, consolidate
          duplicated helpers, and keep looking at what the bundler actually
          emits rather than what you assume it emits.
        </li>
        <li>
          <strong>Ordering async work.</strong> Walk the await chains and find
          the sequential awaits that never had a data dependency on each other.
          Then find the places waiting on the strictest available signal when a
          weaker, earlier one was sufficient. This category was quietly the most
          valuable and the least interesting to write.
        </li>
        <li>
          <strong>Phasing bootstrap.</strong> Split startup into what genuinely
          has to finish before the user sees anything, and what was only there
          first because someone wrote it first.
        </li>
        <li>
          <strong>Deleting always-on work behind disabled features.</strong>{' '}
          Paths that still cost every single session even when the feature they
          exist for is switched off everywhere.
        </li>
        <li>
          <strong>The usual small mechanics.</strong> Memoize hot factories,
          make event subscriptions lazy and refcounted instead of eager, cancel
          superseded in-flight requests, and prune speculative preloads that had
          stopped paying for themselves.
        </li>
        <li>
          <strong>Measurement infrastructure, first.</strong> Before most of the
          above, a bundle-size budget in CI that comments the delta on every
          pull request. Size regressions became a review conversation instead of
          a discovery three months later.
        </li>
      </ul>

      <p>
        That last bullet is the one I'd defend hardest. Instrumentation isn't
        overhead you add when you have spare time, it's what makes every
        subsequent optimization arguable.
      </p>

      <p>
        Only two items on that list moved the headline, and counting only those
        two is the wrong read. A memoized factory, a subscription that stops
        attaching eagerly, a chunk that no longer ships to people who never open
        it: individually none of them survive a significance test, and together
        they lower the baseline every later change gets measured against. They
        compound in a second way too, because each thing you fix and measure
        sharpens where you look next. Ship the small ones. Just don't claim them
        individually.
      </p>

      <h3>Leverage First, Delegate Second</h3>

      <p>
        The pace only worked because of how I split the work with AI, following
        the model I wrote about in{' '}
        <Link
          to="/blog/ai-coding-workflows"
          className="text-blitz-accent hover:underline"
        >
          AI-Assisted Coding Workflows: Delegating vs Leveraging
        </Link>
        . Exploration is a leverage problem. While I didn't yet know whether a
        candidate was real I stayed in the loop: read this hot path with me,
        tell me what's awaited sequentially here, show me what this pulls into
        the bundle, argue against my hypothesis. Fast rounds, my judgment every
        turn. That's how a list of vague memories became a ranked set of
        candidates in days.
      </p>

      <p>
        Delegation came second, once the shape of the change was settled and the
        work went mechanical and wide: apply the pattern across call sites, keep
        behavior identical, write the tests. Hand that off and start the next
        investigation. Getting the two modes the wrong way round, delegating the
        thinking and then micromanaging the typing, is the most expensive habit
        I see.
      </p>

      <h3>What the Two Winners Had in Common</h3>

      <p>
        Both removed a <em>wait</em> rather than making anything compute faster.
        One took a large piece of work off the critical path. The other stopped
        two components waiting on a stricter readiness signal than either
        needed. That distinction decides whether a change is measurable at all,
        which is where this stops being about engineering.
      </p>

      <p>The isolated readout for the second one, in its own randomized arm:</p>

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
              −18ms (−3.2%)
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right font-medium text-green-600">
              −46ms (−5.3%)
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right font-medium text-green-600">
              −135ms (−6.0%)
            </td>
          </tr>
          <tr>
            <td className="border border-blitz-charcoal/20 p-3">
              Framework startup phase, which the diff governs
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right font-medium text-green-600">
              −5ms (−6.7%)
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right font-medium text-green-600">
              −10ms (−5.5%)
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right font-medium text-green-600">
              −170ms (−17.7%)
            </td>
          </tr>
          <tr>
            <td className="border border-blitz-charcoal/20 p-3">
              A later phase the diff never touches (used as a control)
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right text-blitz-charcoal/50">
              —
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right text-blitz-charcoal/50">
              −1.2% (flat)
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right text-blitz-charcoal/50">
              —
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        Two rows there matter more than the headline. The saving lands in
        exactly the phase the changed files govern, and the phase they don't
        touch holds still. That's the difference between "latency improved after
        we deployed" and "latency improved{' '}
        <em>where our diff could have improved it</em>."
      </p>

      <div className="bg-blitz-accent/5 border-l-4 border-blitz-accent p-6 my-8">
        <p className="font-semibold text-blitz-charcoal mb-2">
          Why one change showed up and two didn't
        </p>
        <p className="text-sm mb-3">
          Three performance changes shipped that week. Only one moved the
          metric, and the reason is instrumentation, not code quality:
        </p>
        <ul className="space-y-2 text-sm">
          <li>
            <strong>Removing a wait</strong> shows up immediately. Dead time
            between two timestamps is precisely what a phase-boundary metric
            measures, so the saving has nowhere to hide.
          </li>
          <li>
            <strong>Removing CPU work</strong> (redundant property lookups in a
            hot code path) was microseconds of main-thread time sitting{' '}
            <em>inside</em> a phase, not between phases. Real cost, wrong
            instrument.
          </li>
          <li>
            <strong>Removing retained resources</strong> (lazier subscriptions
            cutting listener count and heap) has no column in a timings table at
            all. You cannot report what you never measured.
          </li>
        </ul>
        <p className="text-sm mt-3">
          A phase-boundary table can only see changes that remove a barrier.
          Knowing that in advance stops you from writing "no improvement
          detected" when the honest sentence is "we pointed the wrong instrument
          at it."
        </p>
      </div>

      <h2>The Measurement That Held</h2>

      <p>
        The number I'd defend came from a combined holdback: one randomized
        cohort with several independent latency optimizations all off versus all
        on, split 50/50, read on a closed window.
      </p>

      <table className="w-full border-collapse border border-blitz-charcoal/20 my-6">
        <thead>
          <tr className="bg-blitz-charcoal/5">
            <th className="border border-blitz-charcoal/20 p-3 text-left">
              Metric
            </th>
            <th className="border border-blitz-charcoal/20 p-3 text-right">
              Δ
            </th>
            <th className="border border-blitz-charcoal/20 p-3 text-right">
              p
            </th>
            <th className="border border-blitz-charcoal/20 p-3 text-left">
              95% CI (relative)
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-blitz-charcoal/20 p-3">
              SDK time to interactive
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right font-medium text-green-600">
              −73.8ms (−5.54%)
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right">
              &lt;1e-300
            </td>
            <td className="border border-blitz-charcoal/20 p-3">
              [−5.67%, −5.42%]
            </td>
          </tr>
          <tr>
            <td className="border border-blitz-charcoal/20 p-3">
              Engagement rate
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right">
              +0.14%
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right">
              0.362
            </td>
            <td className="border border-blitz-charcoal/20 p-3">
              [−0.16%, +0.45%]
            </td>
          </tr>
          <tr>
            <td className="border border-blitz-charcoal/20 p-3">
              Revenue per transaction
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right">
              +0.20%
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right">
              0.520
            </td>
            <td className="border border-blitz-charcoal/20 p-3">
              [−0.40%, +0.79%]
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        Five days, closed window, with the arm split and the daily latency
        deltas holding steady throughout. The latency result is decisive. The
        revenue results are a partial answer, honestly stated: both positive,
        both inside the range the elasticity predicts, neither individually
        significant.
      </p>

      <p>
        That +0.20% is easy to dismiss, and dismissing it is a mistake.
        Percentages only mean something once you multiply them by a base. My
        employer has publicly talked about approaching a billion dollars in
        annual revenue, and the surface this SDK renders on is a large slice of
        it. Two tenths of a percent on a small base is noise. Two tenths of a
        percent on a base that size is a line item that recurs every year for as
        long as the code runs, without anyone touching it again. A fraction of a
        percent sounds trivial right up until you multiply it by the base it
        lands on, and nobody does that multiplication for you.
      </p>

      <p>
        Engineers skip that arithmetic constantly. We report the percentage
        because it's what the test gives us and let it sit there looking
        unimpressive. Doing the multiplication out loud is the product-first
        read, and it stays honest about direction: +0.20% at this sample size is
        value at stake if it holds, not money we made.
      </p>

      <h3>The Result That Actually Convinced People</h3>

      <p>Neither table above is what closed the argument. This is:</p>

      <table className="w-full border-collapse border border-blitz-charcoal/20 my-6">
        <thead>
          <tr className="bg-blitz-charcoal/5">
            <th className="border border-blitz-charcoal/20 p-3 text-left">
              Caller's own baseline
            </th>
            <th className="border border-blitz-charcoal/20 p-3 text-right">
              Count
            </th>
            <th className="border border-blitz-charcoal/20 p-3 text-right">
              Improved
            </th>
            <th className="border border-blitz-charcoal/20 p-3 text-right">
              Median change
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-blitz-charcoal/20 p-3">
              Under 200ms (already fast)
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right">
              11
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right">
              5
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right">
              +0.7%
            </td>
          </tr>
          <tr>
            <td className="border border-blitz-charcoal/20 p-3">
              200 to 400ms
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right">
              10
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right">
              5
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right">
              −3.8%
            </td>
          </tr>
          <tr>
            <td className="border border-blitz-charcoal/20 p-3">
              Over 400ms (slow)
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right">
              7
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right">
              6
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right font-medium text-green-600">
              −23.4%
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        Each caller compared only against itself, so partner mix can't
        manufacture this. The already-fast ones gained nothing. The slowest
        gained 40 to 56%:
      </p>

      <BeforeAfterBars
        unit="ms"
        reductionSuffix="% faster"
        items={[
          { label: 'slow caller A', before: 531, after: 232, reduction: 56 },
          { label: 'slow caller B', before: 532, after: 306, reduction: 42 },
          { label: 'slow caller C', before: 526, after: 311, reduction: 41 },
        ]}
      />

      <p>
        That shape is the signature of removing a barrier, and no available
        confounder can imitate it. Where startup was already fast, the readiness
        signal had arrived before anything needed it and there was no wait to
        remove. Where startup was slow, the wait was most of the cost. Traffic
        mix, hour of day and cohort bias all distribute across callers
        independently of baseline speed. Only a barrier removal produces an
        effect size that tracks how much barrier each caller had.
      </p>

      <p>
        It also reframes the headline. The fleet-level −5.5% isn't a uniform
        saving, it's a large saving concentrated on the slowest traffic, diluted
        by a majority who had nothing to gain. Reported as a single percentile,
        the fleet number{' '}
        <strong>
          understated what the change did for the traffic it actually helped by
          a factor of four
        </strong>
        . That is why the headline at the top of this post is a range, 0.3-1.9%,
        rather than one tidy figure.
      </p>

      <h2>Calibrate Your Instrument With a Placebo</h2>

      <p>
        Not every change can wait for an experiment gate. Sometimes you're
        reconstructing a controlled comparison after the fact, from a canary
        running the new build while the fleet runs the previous one at identical
        wall clock. Sound structure, unknown noise floor, so a 2% movement is
        unreadable.
      </p>

      <p>
        We got lucky. One release in the sequence modified nothing but three
        monitoring config files, so its shipped bundle was byte-identical to its
        predecessor apart from the version string. Running the identical
        comparison on that release measures pure noise:
      </p>

      <table className="w-full border-collapse border border-blitz-charcoal/20 my-6">
        <thead>
          <tr className="bg-blitz-charcoal/5">
            <th className="border border-blitz-charcoal/20 p-3 text-left">
              Metric
            </th>
            <th className="border border-blitz-charcoal/20 p-3 text-right">
              Placebo noise floor
            </th>
            <th className="border border-blitz-charcoal/20 p-3 text-right">
              Real effect measured
            </th>
            <th className="border border-blitz-charcoal/20 p-3 text-left">
              Claimable?
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-blitz-charcoal/20 p-3">
              SDK time to interactive
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right">
              ±2%
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right">
              −5.3% at p50
            </td>
            <td className="border border-blitz-charcoal/20 p-3 font-medium text-green-600">
              Yes, clears by ~3x
            </td>
          </tr>
          <tr>
            <td className="border border-blitz-charcoal/20 p-3">
              Framework startup phase
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right">
              ±3%
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right">
              −17.7% at p90
            </td>
            <td className="border border-blitz-charcoal/20 p-3 font-medium text-green-600">
              Yes, clears by ~20x
            </td>
          </tr>
          <tr>
            <td className="border border-blitz-charcoal/20 p-3">
              Page time to interactive
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right">
              ±9% at p90
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right">
              −11.1% at p90
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-blitz-charcoal/60">
              No, inside the floor
            </td>
          </tr>
          <tr>
            <td className="border border-blitz-charcoal/20 p-3">
              End-to-end time to interactive
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right">
              ±4.5%
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right">
              −1.1% at p50
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-blitz-charcoal/60">
              No, inside the floor
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        The last two rows are the valuable ones. Both moved the right way. I
        claimed neither. Metrics that include page behavior outside our control
        carry floors wide enough to swallow the entire effect, and the
        credibility you spend on an unclaimable number is the credibility you
        need for the real one.
      </p>

      <p>
        The placebo also caught a systematic bias: across every release in the
        sequence the canary cohort ran slightly <em>slower</em> than the fleet,
        placebo included. Four of five releases showed a small apparent
        regression that was entirely cohort bias, and the one real improvement
        was the only release that crossed below the line, against a baseline
        working against it. Without the placebo I'd have had five results and no
        way to tell them apart.
      </p>

      <h2>Latency Wins Are Cheap. Revenue Wins Are Expensive.</h2>

      <p>
        This belongs in the conversation before you write code, not after the
        readout disappoints. Apply the elasticity, then work out how much
        traffic each claim needs at 80% power. For a time-to-interactive win in
        the tens of milliseconds:
      </p>

      <table className="w-full border-collapse border border-blitz-charcoal/20 my-6">
        <thead>
          <tr className="bg-blitz-charcoal/5">
            <th className="border border-blitz-charcoal/20 p-3 text-left">
              Claim
            </th>
            <th className="border border-blitz-charcoal/20 p-3 text-right">
              Traffic needed per arm
            </th>
            <th className="border border-blitz-charcoal/20 p-3 text-right">
              Calendar time at fleet scale
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-blitz-charcoal/20 p-3">
              The latency win itself (~45ms)
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right">
              ~200K
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right font-medium text-green-600">
              ~2 hours
            </td>
          </tr>
          <tr>
            <td className="border border-blitz-charcoal/20 p-3">
              Engagement rate moved
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right">
              ~70M
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right">
              ~25 days
            </td>
          </tr>
          <tr>
            <td className="border border-blitz-charcoal/20 p-3">
              Revenue per transaction moved
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right">
              ~280M
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right">
              ~100 days
            </td>
          </tr>
          <tr>
            <td className="border border-blitz-charcoal/20 p-3">
              Revenue, from a 15ms win
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right">
              ~2.6B
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right text-red-600">
              ~2.5 years
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        A 45ms latency win resolves over lunch. The 0.2% revenue movement it
        implies takes a financial quarter. That asymmetry is arithmetic, not a
        measurement failure, and it has four honest responses:
      </p>

      <ol className="list-decimal list-inside space-y-3 ml-4 text-lg my-6">
        <li>
          <strong>Claim the latency win alone.</strong> Fully defensible,
          resolves in hours, a real result. Most latency work should stop here
          and say so confidently.
        </li>
        <li>
          <strong>Target a rate, not a sum.</strong> An engagement rate is
          roughly 5x cheaper in traffic than revenue per transaction for the
          same effect, because a proportion has far less variance than a
          heavy-tailed sum.
        </li>
        <li>
          <strong>Bundle into a combined holdback.</strong> Randomize one cohort
          with several independent optimizations all off versus all on. The
          latency wins stack, the expected revenue effect scales with the sum,
          and the timeline collapses by roughly an order of magnitude. The cost
          is that the result attributes to the bundle, not to any single change,
          which is the right trade when the alternative is a per-change answer
          you will never get.
        </li>
        <li>
          <strong>Declare revenue a guardrail, in advance.</strong> A wide
          interval still rules out a large regression. That is a legitimate
          finding, as long as you said so before you saw the number.
        </li>
      </ol>

      <p>
        Say the unaffordable thing out loud, early. Below roughly 50ms of
        expected improvement, the implied revenue effect is smaller than fleet
        traffic can resolve in any window anyone will wait for. Deciding that
        while the experiment is still cheap to change is a completely different
        conversation from discovering it at readout.
      </p>

      <h2>Making It Repeatable: Two A/B Skills</h2>

      <p>
        This is the part I'd actually hand to another team. Every rule above
        lived in my head and in a folder of dated markdown reports, which isn't
        durable. The next engineer to run a performance experiment pays full
        price for the same lessons, and I'd re-derive half of them myself in six
        months.
      </p>

      <p>
        So I wrote the method down as two{' '}
        <Link
          to="/blog/claude-skills-institutional-knowledge"
          className="text-blitz-accent hover:underline"
        >
          Claude Skills
        </Link>
        , split along the only boundary that matters: does the data exist yet?
      </p>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="bg-blitz-accent/5 border border-blitz-accent/20 p-6 rounded-lg">
          <p className="font-mono text-sm text-blitz-accent mb-2">ab-setup</p>
          <p className="font-semibold text-blitz-charcoal mb-3">
            Before the data exists
          </p>
          <ul className="space-y-2 text-sm text-blitz-charcoal/80">
            <li>
              Scaffold the bucket module and the paired control/sample markers,
              including the once-per-session latch that keeps aborted boots from
              double-counting an arm
            </li>
            <li>
              Plumb the ramp percentage through config with no default, so
              absent means off and it fails closed to control
            </li>
            <li>
              Force markers for both arms so end-to-end tests can pin an arm
              deterministically
            </li>
            <li>
              Run the power check <em>before shipping</em> and name the
              unaffordable claims as unaffordable
            </li>
            <li>
              Pre-register the primary metric, the equivalence margin, the
              subsample ladder and the window
            </li>
            <li>Retire the experiment cleanly once it graduates</li>
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
              Confirm the markers are still live in the deployed branch before
              trusting a single row
            </li>
            <li>
              Cohort at enrollment, never at an outcome table, so the population
              isn't conditioned on having survived
            </li>
            <li>
              Sample-ratio-mismatch check before any outcome metric, with the
              z-score rather than the eyeball
            </li>
            <li>
              Exclude traffic configured to run the control path by design from{' '}
              <em>both</em> arms, so composition can't masquerade as effect
            </li>
            <li>
              Treat the drop-off rate as a gate, and require a pre-declared
              equivalence margin to pass it
            </li>
            <li>The correct denominator per metric, spelled out in a table</li>
            <li>
              Power for the <em>expected</em> effect, so a null is labelled
              underpowered rather than negative
            </li>
            <li>Always write the report file, before deleting any code</li>
          </ul>
        </div>
      </div>

      <p>
        None of the rules are clever. Each one is a way this kind of measurement
        fails quietly, which is exactly why they're worth writing down:
      </p>

      <div className="bg-blitz-accent/5 border-l-4 border-blitz-accent p-6 my-8">
        <ul className="space-y-3 text-sm">
          <li>
            <strong>Split 50/50, not 5/95.</strong> Power scales with the
            smaller arm, so an uneven split costs you roughly 5x the sample for
            the same detectable effect. Ramp small for safety, but don't mistake
            the safety ramp for the measurement window.
          </li>
          <li>
            <strong>
              Emit the enrollment marker before the thing you're measuring can
              fail.
            </strong>{' '}
            The marker defines your population. If it only fires after a
            successful render, failed sessions leave no trace and drop-off
            becomes invisible.
          </li>
          <li>
            <strong>Declare the traffic ladder up front.</strong> Widening
            traffic <em>after</em> seeing a non-significant result is a second
            look at the same data, and two looks at α=0.05 put your true error
            rate nearer 8% than 5%.
          </li>
          <li>
            <strong>
              Don't stack a new experiment on the same mechanism as a live one.
            </strong>{' '}
            Two treatments that both change how a chunk loads will interact, and
            then neither arm means what its label says.
          </li>
          <li>
            <strong>An MDE is not a confidence bound.</strong> It's the effect
            you could detect at 80% power. A non-significant result can still
            have an interval extending well past it, so "equal to within the
            MDE" claims more than you measured.
          </li>
          <li>
            <strong>
              Never read an absolute time series across a rollout.
            </strong>{' '}
            Third-party latency can swing 20% or more within a single day on
            traffic mix alone, so releases ordered by build number look
            monotonically better whether or not anyone wrote code. Only a
            randomized within-window contrast is valid.
          </li>
          <li>
            <strong>
              Use your elasticity as a ceiling, not just a translator.
            </strong>{' '}
            A result far bigger than your model permits is a query bug, not a
            triumph. That check has caught a p-value of 1e-300 that turned out
            to be pure traffic composition.
          </li>
          <li>
            <strong>Validate any instrument you substitute.</strong> When the
            primary signal breaks, find a second one for the same fact, check
            the two agree on the window where both work, and say what the
            replacement can't see.
          </li>
        </ul>
      </div>

      <p>
        Skills rather than a wiki page, because a wiki page is consulted by
        people who already suspect they need it. A skill loads when the work
        starts. Asking "did the experiment work" now pulls in the rule list, the
        denominator table and the power helper before the first query gets
        written, which is the only moment any of it can still save you.
      </p>

      <h2>What I'd Tell You to Do</h2>

      <ol className="list-decimal list-inside space-y-3 ml-4 text-lg">
        <li>
          <strong>Own the translation, not just the change.</strong> Decide what
          outcome your milliseconds are attached to before you start, and let
          that decide what you pick up. Being product-first here is not about
          writing better summaries after the fact, it is about the measurement
          being designed into the work rather than reconstructed from it.
        </li>
        <li>
          <strong>Leverage while exploring, delegate once you know.</strong> The
          candidate list is where your judgment is worth the most, so stay in
          the loop and iterate fast. The rollout is where breadth is worth the
          most, so hand it off. Doing it backwards is the most expensive habit I
          see.
        </li>
        <li>
          <strong>Get an elasticity, then use it as a bound.</strong> One number
          converting your metric to business value does two jobs: it makes the
          work legible to people who fund it, and it gives you a sanity check
          that catches query bugs a p-value never will. A result 20x larger than
          the model permits is a bug.
        </li>
        <li>
          <strong>Size the claim before you write the code.</strong> If the
          revenue answer needs two years of traffic, decide that while the
          experiment is still cheap to change. Claiming the latency win alone is
          a legitimate, complete result.
        </li>
        <li>
          <strong>Calibrate with a placebo.</strong> A config-only release run
          through your exact comparison gives every real change a quantified bar
          to clear, and it exposes systematic cohort bias you'd otherwise argue
          about.
        </li>
        <li>
          <strong>
            Report the stratified effect, not just the percentile.
          </strong>{' '}
          Our fleet median understated what the change did for the traffic it
          helped by 4x. Grouping by each caller's own baseline turned an
          arguable win into an obvious one.
        </li>
        <li>
          <strong>
            Predict where the effect should land, then check that it did.
          </strong>{' '}
          The claim that survived scrutiny wasn't "latency improved after we
          deployed." It was "latency improved in exactly the phase our diff
          governs, scaled by how much barrier each caller had, while the phase
          we didn't touch held still."
        </li>
        <li>
          <strong>Write down what you refuse to claim.</strong> Two of my
          metrics moved the right way and I claimed neither, because both sat
          inside their noise floors. Naming that explicitly is what made the
          number I <em>did</em> claim believable.
        </li>
      </ol>

      <h2>Closing Thoughts</h2>

      <p>
        The engineering here is ordinary. Don't do work early that doesn't need
        to be early, don't wait on a signal stricter than the one you need, load
        lazily what most people won't use. Any decent engineer lands on the same
        changes given the same map. That's the appealing part: this much
        leverage is sitting in plain sight in most codebases.
      </p>

      <p>
        The measurement was the hard part and where all the risk lived, which is
        why the durable output of this quarter isn't the two optimizations. It's{' '}
        <code>ab-setup</code> and <code>ab-diagnose</code>. The optimizations
        shipped once. The skills make the next win arguable, and the one after
        that. Same discipline as{' '}
        <Link
          to="/blog/cutting-load-times-at-lorikeet"
          className="text-blitz-accent hover:underline"
        >
          bundle and transfer work
        </Link>
        , with higher stakes on the statistics: instrument, measure, verify, and
        be specific about what you aren't entitled to say.
      </p>

      <p>
        Shipping the optimization is table stakes. Saying what it was worth,
        with an interval around it and an honest list of what you didn't prove,
        is what turns performance work into something stakeholders can plan
        around. That translation isn't a communication skill you pick up at the
        end. It starts the same moment the work does.
      </p>

      <p>The numbers matter. So does earning the right to quote them.</p>
    </ArticleLayout>
  )
}

export default ProvingPerformanceWinsPage
