import React from 'react'
import { Link } from 'gatsby'
import ArticleLayout from '../../components/ArticleLayout'
import CountUp from '../../components/motion/CountUp'
import BeforeAfterBars from '../../components/motion/BeforeAfterBars'

const ProvingPerformanceWinsPage = () => {
  return (
    <ArticleLayout
      title="Shipping Was the Easy Part: How to Prove a Performance Win Actually Mattered"
      description="Two SDK performance initiatives cut boot latency 10-12%, and the win held from p50 all the way out to p95. The engineering took weeks. Proving it moved the business took longer, and nearly produced four wrong answers first."
      date="August 30, 2026"
      readTime="14 min read"
      category="Performance"
      slug="/blog/proving-performance-wins"
      tags={['Performance', 'Experimentation', 'A/B Testing', 'Claude Skills']}
    >
      <p className="text-lg text-blitz-charcoal/70 italic mb-8">
        <strong>TL;DR:</strong> I rejoined a company whose codebase I already
        knew, spent a few months running ordinary frontend performance
        techniques through its web SDK, and two of them turned out to matter
        enormously. Combined, they cut boot time-to-interactive by{' '}
        <strong>10-12%</strong>, and the win held from the median all the way
        out to p95. The code was the easy part. Getting a number my VP could act
        on took four failed measurements, a placebo build, and a 13x sample
        rescue. This is that story, and the two skills I wrote so nobody has to
        repeat it.
      </p>

      <h2>Nobody Claps for 46 Milliseconds</h2>

      <p>
        Every performance engineer has had this meeting. You've spent three
        weeks on a boot-path optimization. You show a dashboard. The p50 line
        goes down. Someone asks, politely, "so what does that mean for us?" And
        you don't have an answer, because you measured latency and they asked
        about money.
      </p>

      <p>
        That gap is the whole problem. Latency is what we control and revenue is
        what we're funded for, and the two are separated by an inference nobody
        on the engineering side usually owns. So the work gets described in the
        only currency we have, milliseconds, and it lands as a technical detail
        rather than a business result. The optimization was real. The case for
        it was not made.
      </p>

      <p>
        Closing that gap is mostly a mindset thing, and I've come to think of it
        as the difference between doing engineering well and being{' '}
        <strong>product-first</strong> about it. A product-first engineer treats
        the inference as part of the job rather than someone else's problem:
        what outcome is this millisecond attached to, who feels it, how would I
        know if I were wrong. That shows up long before the readout. It changes
        which optimizations you pick up, because you favour the ones whose
        effect you can actually defend over the ones that are merely satisfying
        to write. It changes how you instrument, because you add the marker
        while the change is still cheap to change instead of reconstructing an
        answer afterwards. And it changes what you report, because "who did this
        help, and by how much" is a product question that a fleet-wide
        percentile quietly refuses to answer.
      </p>

      <p>
        The alternative is the version I've done plenty of times: solve the
        interesting technical problem, ship it, describe it in milliseconds, and
        let someone else decide whether it counted. It usually doesn't count.
        Not because the work was bad, but because nobody translated it, and
        untranslated work gets filed as maintenance.
      </p>

      <p>
        Our SDK loads inside other companies' checkout pages. Every millisecond
        we spend booting is a millisecond of someone else's page load, which
        means latency is not a vanity metric here, it is the product. We also
        had, from an internal latency-injection study, an elasticity: roughly
        3-4% revenue movement per second of time-to-interactive. That single
        number is what turns a millisecond into a sentence a business leader can
        use. It is also what makes an unsound measurement dangerous, because now
        a wrong latency number converts directly into a wrong revenue claim.
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
        The 10-12% band matters more than any single figure, because a win that
        holds from p50 to p95 is a different animal from one that only shows up
        in an average. It means the slowest sessions, the ones on tired phones
        and bad networks where people actually abandon, got the same
        proportional relief as the fast ones.
      </p>

      <p>
        And that last pair of numbers is the reason anyone outside my team
        cared. Same work, same commits, two different sentences. "We made boot
        11% faster" is a status update. "This is worth an estimated 0.3-1.9% of
        revenue on the surface it touches" is a decision input. The engineering
        did not change between those two sentences. The measurement did.
      </p>

      <h2>Coming Back Knowing Where the Debt Was</h2>

      <p>
        Some context on how this started, because I don't think the result was
        mostly about cleverness. I'm a boomerang. I worked here, left, worked
        elsewhere, and came back. That turns out to be an unreasonable advantage
        for performance work, because the expensive part of speeding up a mature
        codebase is not writing the optimization. It is knowing which slow
        things are slow for a good reason and which are slow because nobody got
        around to them. I already had that map. Some of the debt I had helped
        create.
      </p>

      <p>
        So I did not begin with a profiler and a blank mind. I began with a list
        I had been carrying around for years: the places I remembered as
        needlessly eager, needlessly serial, or needlessly large. Then I let my
        brain run at full blast for a few months, cycling through candidates
        fast and cheaply instead of picking one and marrying it. Most of them
        went nowhere. Two of them turned out to be worth more than everything
        else combined.
      </p>

      <h3>None of the Techniques Were Clever</h3>

      <p>
        This is the part I want to be honest about, because performance writing
        tends to imply exotic insight. Nothing in the portfolio was exotic. It
        was the standard frontend performance checklist, applied by someone who
        knew where to point it:
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
        That last bullet is the one I'd defend hardest to a skeptical manager.
        Instrumentation is not overhead you add when you have spare time, it is
        what makes every subsequent optimization arguable.
      </p>

      <h3>Leverage First, Delegate Second</h3>

      <p>
        The pace only worked because of how I split the work with AI, and it
        followed exactly the model I wrote about in{' '}
        <Link
          to="/blog/ai-coding-workflows"
          className="text-blitz-accent hover:underline"
        >
          AI-Assisted Coding Workflows: Delegating vs Leveraging
        </Link>
        . Exploration is a leverage problem, not a delegation problem. When I
        did not yet know whether a candidate was real, I stayed in the loop
        constantly: read this hot path with me, tell me what is awaited
        sequentially here, show me what this actually pulls into the bundle,
        argue against my hypothesis. Fast rounds, tight feedback, my judgment on
        every turn. That is how a list of vague memories became a ranked set of
        candidates in days rather than months.
      </p>

      <p>
        Delegation came second, after a candidate proved out and the shape of
        the change was no longer in question. At that point the work is
        mechanical and wide: apply the pattern across the call sites, keep the
        behavior identical, write the tests, handle the failure mode. That is
        where you hand it off and go start the next investigation. Getting those
        two modes the wrong way round is the most common way I see people waste
        an AI workflow, delegating the thinking and then micromanaging the
        typing.
      </p>

      <h3>What the Two Winners Had in Common</h3>

      <p>
        Both of the changes that mattered removed a <em>wait</em> rather than
        making anything compute faster. One stopped a large piece of work
        sitting on the critical path when it did not need to be there. The other
        stopped two components waiting on a stricter readiness signal than
        either of them actually required.
      </p>

      <p>
        That distinction turns out to decide whether a change is measurable at
        all, which is where this story stops being about engineering.
      </p>

      <p>
        Here is the isolated readout for the second of the two, measured in its
        own randomized arm:
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
        Two things in that table are doing more work than the headline. The
        saving lands in exactly the phase the changed files govern, and the
        phase they don't touch holds still. That's not a nicer way of saying the
        same thing; it's the difference between "latency improved after we
        deployed" and "latency improved{' '}
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
        Here is the uncomfortable part. Every failed measurement below produced
        a plausible number. None of them errored, none of them looked
        suspicious, and two of them were <em>more</em> statistically impressive
        than the truth. If I had stopped at any of them I would have shipped a
        confident, wrong claim to people who make budget decisions.
      </p>

      <h3>Trap 1: Reading the Deploy</h3>

      <p>
        The instinct is before-and-after. Deploy at 02:00, compare Tuesday to
        Monday. It does not work, and it fails in a way that flatters you.
      </p>

      <p>
        Our boot latency swings <strong>23% over the course of a day</strong>{' '}
        purely on traffic mix and hour of day: p50 ranges from 1092ms to 1346ms
        with no code changing at all. A table of consecutive releases ordered by
        build number will look monotonically improving whether or not anyone
        wrote any code, because each release occupies a different slice of the
        clock. Any absolute-level time series over a rollout is unsafe. Only a
        randomized within-window contrast is valid.
      </p>

      <h3>Trap 2: Cohorting on the Outcome</h3>

      <p>
        We had a variant column written onto every rendered row, which is
        wonderfully convenient: no join, no marker, just slice by arm. It is
        also a trap when the question involves anything upstream of rendering,
        because rows only exist for sessions that <em>rendered</em>. Filter your
        population by an outcome table and you have conditioned on survival. If
        the treatment changes survival at all, every downstream metric is biased
        and nothing warns you.
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
        <strong>+5.51% at p &lt; 1e-300</strong>. That is the kind of result you
        want to put in a title slide.
      </p>

      <p>
        It was entirely composition. A configured subset of integrations runs
        the control path by design, and they had not been excluded from{' '}
        <em>both</em> arms, so the control group carried a different traffic mix
        rather than a different treatment. The p-value was real. The effect was
        not.
      </p>

      <p>
        What caught it was not a statistical test, it was the elasticity. A
        latency win of that size permits a revenue effect somewhere around 0.3%.
        The measurement claimed 17-39x that. Any effect far larger than your
        physical model permits is a bug in the query, not a triumph. Having a
        known elasticity gave me a sanity bound I could check a result against,
        and that turned out to be worth more than the significance test.
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
        rendering: a latch that was supposed to fire once per session was living
        on the wrong object. The arms were assigned correctly. The{' '}
        <em>counting</em> was wrong, which was enough to make enrolled counts
        useless as a drop-off denominator while leaving the render-conditional
        metrics interpretable. Those are two very different verdicts, and you
        only get to distinguish them if you localize the mismatch instead of
        noting it and moving on.
      </p>

      <h2>The Measurement That Held</h2>

      <p>
        The version I was willing to defend came from a combined holdback: one
        randomized cohort with several independent latency optimizations all off
        versus all on, split 50/50, read on a closed window.
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
        0.08pp every single day, daily latency deltas all in the same direction.
        The latency result is decisive. The revenue results are the honest
        version of a partial answer: both positive, both landing inside the
        range the elasticity predicts, neither individually significant.
      </p>

      <p>
        It is worth pausing on that +0.20%, because a number that small is easy
        to dismiss and that instinct is usually wrong. Percentages only mean
        something once you multiply them by a base. The company I work for has
        publicly talked about approaching a billion dollars in annual revenue,
        and the surface this SDK renders on is a large slice of that. At that
        scale, a fifth of one percent is not a rounding error, it is a
        meaningful line item that recurs every year for as long as the code
        keeps running. Two tenths of a percent on a small base is noise. Two
        tenths of a percent on a base that size is a headcount's worth of value,
        several times over.
      </p>

      <p>
        This is the arithmetic that tends to be missing when engineers describe
        their own work. We report the percentage because it is what the test
        gives us, then let it sit there looking unimpressive, when the sentence
        that actually lands is the percentage multiplied by the thing it applies
        to. A product-first read of the same table does that multiplication out
        loud. It also stays honest about the direction of the evidence: at this
        sample size +0.20% is directionally encouraging and consistent with the
        elasticity, not a proven revenue result, and the right framing is "here
        is the value at stake if this holds" rather than "here is the money we
        made."
      </p>

      <p>
        And that combination, a decisive latency win next to two non-significant
        revenue movements, is where most performance readouts either overclaim
        or give up. There is a third option, and it starts with the sample.
      </p>

      <h3>The 13x Sample Rescue</h3>

      <p>
        The standard method cohorts from an enrollment marker emitted at
        randomization. For this experiment that instrument was only trustworthy
        for a 12-hour stretch: a mid-experiment change left a large and{' '}
        <em>arm-asymmetric</em> share of markers without a usable join key,
        which silently breaks cohorting while leaving the allocation ratio
        looking perfectly healthy.
      </p>

      <p>
        Instead of accepting 12 hours, we cohorted on the variant field recorded
        on the rendered row itself. It is written from the variant that actually
        executed, so it needs no join and cannot be affected by a missing marker
        key. That turned 12 hours into 5 days:{' '}
        <strong>1.2M rows per arm became 15.3M</strong>, and the confidence
        interval tightened by <strong>4.7x</strong>.
      </p>

      <p>
        The tightening is the whole point. The earlier 12-hour read had put
        revenue at −1.65% with an interval spanning [−4.01%, +0.71%]: wide
        enough to be uninformative and negative enough to be uncomfortable, and
        if that had been the number I reported, a good change would have looked
        like a possible regression. Same experiment, same code, better
        instrument.
      </p>

      <p>
        Validation before trusting the substitution: applied to the original
        12-hour window it reproduced the marker-based row count exactly and its
        latency mean to within 0.01ms. Two constraints came with it, and both go
        in the writeup rather than a footnote. It cannot measure drop-off, since
        sessions that never render have no row, so render neutrality has to be
        established another way first. And integrations configured to run the
        control path by design must be excluded from both arms, which is exactly
        the omission that produced Trap 3.
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
        Each integration compared only against itself, so partner mix cannot
        manufacture this. Integrations that were already fast gained nothing.
        The slowest ones gained 40 to 56%:
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
        That shape is the signature of removing a barrier, and it is the one
        pattern no available confounder can imitate. The change removed a hard
        wait on a readiness signal that was stricter than necessary. Where the
        boot phase was already fast, that signal had arrived before anything
        needed it and there was no wait to remove. Where boot was slow, the wait
        was most of the cost. Traffic mix, hour of day and cohort bias all
        distribute themselves across integrations independently of baseline
        speed. Only a change that removes a barrier produces an effect size that
        tracks how much barrier each caller had.
      </p>

      <p>
        It also reframes the headline, and this is the part I would push hardest
        on anyone doing this work. The fleet-level −5.5% is not a uniform saving
        spread evenly. It is a large saving concentrated on the slowest traffic,
        diluted by a majority who had nothing to gain. Reported as a single
        percentile, the fleet number{' '}
        <strong>
          understated what the change did for the traffic it actually helped by
          a factor of four
        </strong>
        . That is why the headline at the top of this post is a range, 0.3-1.9%,
        rather than one tidy figure.
      </p>

      <h2>Calibrate Your Instrument With a Placebo</h2>

      <p>One more technique, because it is cheap and almost nobody does it.</p>

      <p>
        Not every change can wait for an experiment gate. Sometimes you're
        reconstructing a controlled comparison after the fact, from a canary
        that runs the new build while the fleet runs the previous one at
        identical wall clock. That structure is sound, but it has an unknown
        noise floor, so a 2% movement is unreadable and you can't tell which.
      </p>

      <p>
        We got lucky: one release in the sequence modified nothing but three
        monitoring config files. Its shipped bundle was byte-identical to its
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
        Those last two rows are the valuable ones. Both moved the right way. I
        did not claim either. Metrics that include page behavior outside our
        control carry floors wide enough to swallow the entire effect, and the
        credibility you spend claiming an unclaimable number is the credibility
        you need for the one that is real.
      </p>

      <p>
        The placebo also surfaced a systematic bias I would otherwise have
        argued about for a week: across every release in the sequence, the
        canary cohort ran slightly <em>slower</em> than the fleet, placebo
        included. So four of five releases showed a small apparent regression
        that was entirely cohort bias, and the one real improvement was the only
        release that crossed below the line, against a baseline systematically
        working against it. Without the placebo I would have had five results
        and no way to tell them apart.
      </p>

      <h2>Latency Wins Are Cheap. Revenue Wins Are Expensive.</h2>

      <p>
        This is the single most useful thing I learned, and it belongs in the
        conversation before you write any code, not after the readout
        disappoints.
      </p>

      <p>
        Apply the elasticity, then work out how much traffic each claim needs at
        80% power. For a boot-latency win in the tens of milliseconds:
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
        implies takes a financial quarter. That asymmetry is not a measurement
        failure, it is arithmetic, and it has four honest responses:
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
        Everything above is a set of hard-won rules that lived in my head and in
        a folder of dated markdown reports. That is not durable. The next
        engineer to run a performance experiment would rediscover every trap at
        full price, and I would rediscover half of them myself in six months.
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
        The rules in them are not clever. They are the specific ways this
        measurement can fail silently, each one written down the day it cost me
        something. A few examples of what that looks like in practice:
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
        The reason I put these in skills rather than a wiki page is that a wiki
        page is consulted by people who already suspect they need it. A skill
        loads when the work starts. Asking "did the experiment work" now pulls
        in the trap list, the denominator table and the power helper
        automatically, before the first query gets written, which is the only
        moment at which any of it can still save you.
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
        The engineering in this post is ordinary: defer construction, don't wait
        on an event you don't need, load a chunk lazily. Any competent engineer
        would arrive at the same changes given the same profile. Nothing about
        it is hard to explain.
      </p>

      <p>
        The measurement was the hard part, and it was where all the risk lived.
        Four different plausible answers, two of them more statistically
        impressive than the truth, and only one that survived being attacked.
        The same discipline I've written about for{' '}
        <Link
          to="/blog/cutting-load-times-at-lorikeet"
          className="text-blitz-accent hover:underline"
        >
          bundle and transfer work
        </Link>{' '}
        applies here, just with much higher stakes on getting the statistics
        right: instrument, measure, verify, and be specific about what you are
        not entitled to say.
      </p>

      <p>
        Shipping the optimization is table stakes. Being able to say what it was
        worth, with an interval around it and an honest list of what you did not
        prove, is what turns performance work from a technical detail into
        something the business can act on. That translation is not overhead on
        top of the engineering, and it is not a communication skill bolted on at
        the end. It is the part of the job where a product-first engineer earns
        their keep, and it starts at the same moment the work does.
      </p>

      <p>The numbers matter. So does earning the right to quote them.</p>
    </ArticleLayout>
  )
}

export default ProvingPerformanceWinsPage
