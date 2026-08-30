import React from 'react'
import { Link } from 'gatsby'
import ArticleLayout from '../../components/ArticleLayout'
import CountUp from '../../components/motion/CountUp'
import BeforeAfterBars from '../../components/motion/BeforeAfterBars'

const ProvingPerformanceWinsPage = () => {
  return (
    <ArticleLayout
      title="Shipping Was the Easy Part: How to Prove a Performance Win Actually Mattered"
      description="Two SDK performance initiatives cut boot latency 10-12%, holding from p50 out to p95. The engineering took weeks. Proving it moved the business took longer, and nearly produced four wrong answers first."
      date="August 30, 2026"
      readTime="12 min read"
      category="Performance"
      slug="/blog/proving-performance-wins"
      tags={['Performance', 'Experimentation', 'A/B Testing', 'Claude Skills']}
    >
      <p className="text-lg text-blitz-charcoal/70 italic mb-8">
        <strong>TL;DR:</strong> I rejoined a codebase I already knew, ran
        ordinary frontend performance techniques through its web SDK, and two of
        them cut boot time-to-interactive by <strong>10-12%</strong> from the
        median out to p95. The code was the easy part. Getting to a number
        stakeholders could plan around took four failed measurements, a placebo
        build, and a 13x sample rescue. Here's the method, plus the two skills I
        wrote so nobody repeats it.
      </p>

      <h2>Nobody Claps for 46 Milliseconds</h2>

      <p>
        I love this stuff. Genuinely, unreasonably. Shaving a hundred
        milliseconds off a boot path is one of the few things in software where
        it feels like physics is pushing back, and I will happily lose a weekend
        to a flame chart. Which is why it stung the first time I walked a real
        win into a room and watched everyone stay politely still.
      </p>

      <p>
        You know the meeting. Three weeks on a boot-path optimization, a
        dashboard where the p50 line steps down, and then a fair question: so
        what does that mean for us? I'd measured latency and they'd asked about
        outcomes. Those are not the same sentence, and the translation between
        them is our job, not theirs.
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
        We also had a conversion rate for it. An internal latency-injection
        study gave us an elasticity: roughly 3-4% revenue movement per second of
        time-to-interactive. One number turns a millisecond into a sentence a
        stakeholder can plan around. It also raises the stakes on measurement,
        because a wrong latency number now converts straight into a wrong
        revenue claim.
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
              Boot time-to-interactive at the median
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blitz-accent">
              <CountUp value={12} prefix="−" suffix="%" />
            </p>
            <p className="text-sm text-blitz-charcoal/70">
              Boot time-to-interactive at p95, so the win holds in the tail
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
        slowest sessions, on tired phones and bad networks where people actually
        abandon, got the same proportional relief as the fast ones.
      </p>

      <p>
        The last pair of numbers is why anyone outside my team cared. Same work,
        same commits, two sentences. "We made boot 11% faster" is a status
        update. "This is worth an estimated 0.3-1.9% of revenue on the surface
        it touches" is a decision input. The engineering didn't change between
        them. The measurement did.
      </p>

      <h2>Coming Back Knowing Where the Debt Was</h2>

      <p>
        I'm a boomerang. Worked here, left, came back. That's an unreasonable
        advantage for performance work, because the expensive part of speeding
        up a mature codebase isn't writing the optimization, it's knowing which
        slow things are slow for a good reason. I already had that map. Some of
        the debt I helped create.
      </p>

      <p>
        So I didn't start with a profiler and a blank mind. I started with a
        list I'd been carrying for years: every place I remembered as needlessly
        eager, needlessly serial, or needlessly large. Then I let my brain run
        flat out for a few months. Pull a thread, measure it, drop it, pull the
        next one. No ceremony, no roadmap, no falling in love with the first
        idea. Some of the most fun I've had at work. Most went nowhere. Two were
        worth more than everything else combined, and I couldn't have told you
        in advance which two.
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
              Boot time-to-interactive
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
              The boot phase the diff actually governs
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

      <h2>Four Ways I Nearly Reported the Wrong Number</h2>

      <p>
        Every failed measurement below produced a plausible number. None
        errored, none looked suspicious, and two were <em>more</em>{' '}
        statistically impressive than the truth. Stopping at any of them means
        handing a confident wrong number to teams planning their quarter around
        it.
      </p>

      <h3>Trap 1: Reading the Deploy</h3>

      <p>
        The instinct is before-and-after. Deploy at 02:00, compare Tuesday to
        Monday. It fails in a way that flatters you.
      </p>

      <p>
        Our boot latency swings <strong>23% over the course of a day</strong>{' '}
        purely on traffic mix and hour: p50 ranges from 1092ms to 1346ms with no
        code changing. A table of consecutive releases ordered by build number
        looks monotonically improving whether or not anyone wrote code, because
        each release occupies a different slice of the clock. Any absolute-level
        time series over a rollout is unsafe. Only a randomized within-window
        contrast is valid.
      </p>

      <h3>Trap 2: Cohorting on the Outcome</h3>

      <p>
        We had a variant column on every rendered row, which is wonderfully
        convenient: no join, no marker, just slice by arm. It's a trap for any
        question upstream of rendering, because rows only exist for sessions
        that <em>rendered</em>. Filter your population by an outcome table and
        you've conditioned on survival. If the treatment changes survival at
        all, every downstream metric is biased and nothing warns you.
      </p>

      <p>
        This one bit hard. Cohorting on rows that carried an enrollment marker
        gave a time-to-interactive improvement of −186ms. Cohorting on the full
        population, using the one arm label observable without any marker, gave{' '}
        <strong>−10.8ms with a confidence interval containing zero</strong>. The
        sessions missing markers were up <em>+1376ms</em>, because slow and
        abandoned boots differentially lose both their outcome row and their
        marker, by arm. Marker conditioning moved the estimate by 15x the size
        of the real effect. That is a textbook collider, and the seductive
        version was the one with the beautiful p-value.
      </p>

      <h3>Trap 3: The Composition Artifact</h3>

      <p>
        At one point a query reported a referral-rate gain of{' '}
        <strong>+5.51% at p &lt; 1e-300</strong>. Title-slide material.
      </p>

      <p>
        It was entirely composition. A configured subset of integrations runs
        the control path by design and hadn't been excluded from <em>both</em>{' '}
        arms, so the control group carried a different traffic mix rather than a
        different treatment. The p-value was real. The effect wasn't.
      </p>

      <p>
        What caught it was the elasticity, not a statistical test. A latency win
        that size permits a revenue effect around 0.3%. The measurement claimed
        17-39x that. Any effect far larger than your physical model permits is a
        query bug, not a triumph, and that sanity bound was worth more than the
        significance test.
      </p>

      <h3>Trap 4: The Split That Looks Fine</h3>

      <p>
        Enrolled counts of 152.0M and 152.2M look like a healthy 50/50 to any
        human being. At that sample size the standard error on the split is
        0.0029 percentage points, so a 0.08pp skew is <strong>z ≈ 29</strong>.
        Eyeballing the table passes it; the arithmetic screams.
      </p>

      <p>
        The cause was duplicate marker emission on boots that abort before
        rendering: a latch meant to fire once per session was living on the
        wrong object. The arms were assigned correctly, the <em>counting</em>{' '}
        was wrong, which made enrolled counts useless as a drop-off denominator
        while leaving the render-conditional metrics interpretable. Two very
        different verdicts, and you only get to distinguish them by localizing
        the mismatch instead of noting it and moving on.
      </p>

      <h2>The Measurement That Held</h2>

      <p>
        The version I'd defend came from a combined holdback: one randomized
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
              Render time-to-interactive
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
              Referral rate
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
        15.3M rendered rows per arm, five full days, arm split holding within
        0.08pp every day, daily latency deltas all in the same direction. The
        latency result is decisive. The revenue results are a partial answer,
        honestly stated: both positive, both inside the range the elasticity
        predicts, neither individually significant.
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

      <p>
        A decisive latency win next to two non-significant revenue movements is
        where most readouts either overclaim or give up. There's a third option,
        and it starts with the sample.
      </p>

      <h3>The 13x Sample Rescue</h3>

      <p>
        The standard method cohorts from an enrollment marker emitted at
        randomization. Here that instrument was only trustworthy for a 12-hour
        stretch: a mid-experiment change left a large and{' '}
        <em>arm-asymmetric</em> share of markers without a usable join key,
        which silently breaks cohorting while the allocation ratio still looks
        healthy.
      </p>

      <p>
        Instead of accepting 12 hours, we cohorted on the variant field recorded
        on the rendered row itself. It's written from the variant that actually
        executed, so it needs no join and can't be affected by a missing marker
        key. That turned 12 hours into 5 days:{' '}
        <strong>1.2M rows per arm became 15.3M</strong>, and the confidence
        interval tightened by <strong>4.7x</strong>.
      </p>

      <p>
        The tightening is the point. The 12-hour read had put revenue at −1.65%
        across [−4.01%, +0.71%], wide enough to be uninformative and negative
        enough that a good change would have read as a possible regression. Same
        experiment, same code, better instrument.
      </p>

      <p>
        Validation first: applied to the original 12-hour window the substitute
        reproduced the marker-based row count exactly and its latency mean to
        within 0.01ms. Two constraints came with it, both in the writeup rather
        than a footnote. It can't measure drop-off, since sessions that never
        render have no row, so render neutrality has to be established another
        way. And integrations configured to run the control path by design must
        be excluded from both arms, which is exactly the omission behind Trap 3.
      </p>

      <div className="bg-blitz-accent/5 border-l-4 border-blitz-accent p-6 my-8">
        <p className="font-semibold text-blitz-charcoal mb-2">
          The generalizable lesson
        </p>
        <p className="text-sm">
          When an instrument is broken, look for a second signal that records
          the same fact by a different route. Then validate the substitute
          against the original on the window where both work, and state what the
          substitute cannot see. That last step is what separates a rescue from
          a rationalization.
        </p>
      </div>

      <h3>The Result That Actually Convinced People</h3>

      <p>None of the tables above is what closed the argument. This is:</p>

      <table className="w-full border-collapse border border-blitz-charcoal/20 my-6">
        <thead>
          <tr className="bg-blitz-charcoal/5">
            <th className="border border-blitz-charcoal/20 p-3 text-left">
              Integration's own baseline
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
        Each integration compared only against itself, so partner mix can't
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
        confounder can imitate it. Where the boot phase was already fast, the
        readiness signal had arrived before anything needed it and there was no
        wait to remove. Where boot was slow, the wait was most of the cost.
        Traffic mix, hour of day and cohort bias all distribute across
        integrations independently of baseline speed. Only a barrier removal
        produces an effect size that tracks how much barrier each caller had.
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
              Render time-to-interactive
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
              Framework phase
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
              Page time-to-interactive
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
              End-to-end time-to-interactive
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
        traffic each claim needs at 80% power. For a boot-latency win in the
        tens of milliseconds:
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
              Referral rate moved
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
          <strong>Target a rate, not a sum.</strong> Referral rate is roughly 5x
          cheaper in traffic than revenue per transaction for the same effect,
          because a proportion has far less variance than a heavy-tailed sum.
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

      <h2>Making It Repeatable: Two Skills</h2>

      <p>
        All of the above lived in my head and in a folder of dated markdown
        reports, which isn't durable. The next engineer to run a performance
        experiment rediscovers every trap at full price, and I'd rediscover half
        of them myself in six months.
      </p>

      <p>
        So I wrote it down as two{' '}
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
              including the latch that stops the double-emission bug from Trap 4
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
            <li>Cohort at enrollment, never at outcome (Trap 2)</li>
            <li>
              Sample-ratio-mismatch check before any outcome metric, with the
              z-score, not the eyeball (Trap 4)
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
        The rules aren't clever. They're the specific ways this measurement
        fails silently, each written down the day it cost me something. A few in
        practice:
      </p>

      <div className="bg-blitz-accent/5 border-l-4 border-blitz-accent p-6 my-8">
        <ul className="space-y-3 text-sm">
          <li>
            <strong>Run 50/50, not 5/95.</strong> Power scales with the smaller
            arm. At 5/95 that arm needs 10x the calendar time for the same
            per-arm sample, and even at fixed total traffic the unequal split
            costs ~5.3x the sample for the same detectable effect. Ramp through
            small percentages for safety if you want, just don't mistake the
            safety ramp for the measurement window.
          </li>
          <li>
            <strong>
              Emit the enrollment marker before the thing you're measuring can
              fail.
            </strong>{' '}
            The marker defines the population. If it fires only after a
            successful render, dropped sessions have no marker and drop-off
            becomes invisible. This is the most common way to build an
            unmeasurable experiment.
          </li>
          <li>
            <strong>Declare the subsample ladder up front.</strong> "Start at
            1/16, widen to 1/4, then full traffic." Widening <em>after</em>{' '}
            seeing a non-significant result is a second look at the same data,
            and two looks at α=0.05 give a true error rate nearer 8% than 5%.
          </li>
          <li>
            <strong>
              Don't stack a new experiment on the same mechanism as a live one.
            </strong>{' '}
            Two treatments that both alter how a chunk loads interact, so
            neither arm means what its label says. Independent mechanisms can
            run concurrently without issue.
          </li>
          <li>
            <strong>An MDE is not a confidence bound.</strong> "Render rates are
            equal to within the MDE" is unsupported: an MDE is the effect
            detectable at 80% power, and a non-significant result can have an
            interval extending well past it.
          </li>
        </ul>
      </div>

      <p>
        Skills rather than a wiki page, because a wiki page is consulted by
        people who already suspect they need it. A skill loads when the work
        starts. Asking "did the experiment work" now pulls in the trap list, the
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
        changes given the same map. That's exactly why I find it satisfying: the
        leverage sits in plain sight in most codebases, waiting for someone to
        care enough to look.
      </p>

      <p>
        The measurement was the hard part and where all the risk lived. Four
        plausible answers, two more statistically impressive than the truth, one
        that survived being attacked. Same discipline as{' '}
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
