import React from 'react'
import { Link } from 'gatsby'
import ArticleLayout from '../../components/ArticleLayout'
import CountUp from '../../components/motion/CountUp'

const ProvingPerformanceWinsPage = () => {
  return (
    <ArticleLayout
      title="Making It Faster Was the Easy Part. Making Anyone Care Wasn't."
      description="We took 10-12% off our web SDK's time to interactive, holding from the median out to p95. The code was the easy bit. Here's how I worked out what it was actually worth, and the two A/B skills that made the method stick."
      date="August 30, 2026"
      readTime="9 min read"
      category="Performance"
      slug="/blog/proving-performance-wins"
      tags={['Performance', 'Experimentation', 'A/B Testing', 'Claude Skills']}
    >
      <p className="text-lg text-blitz-charcoal/70 italic mb-8">
        <strong>TL;DR:</strong> Two performance initiatives took{' '}
        <strong>10-12%</strong> off our web SDK's time to interactive, and the
        win held from the median out to p95. Writing the code was the easy part.
        What turned it into something a stakeholder could plan around was the
        measurement, so I packaged that method into two Claude skills,{' '}
        <code>ab-setup</code> and <code>ab-diagnose</code>, and now nobody else
        has to learn it the slow way.
      </p>

      <h2>We Took 10-12% Off Our SDK's Time to Interactive</h2>

      <p>
        Two initiatives, a few months, one web SDK that boots on other
        companies' checkout pages. Together they cut 10-12% off the span between
        our code starting and our content being usable. The part I'm happiest
        about: it held at the median, and it held at p95.
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
        That band is the whole story for me. A win that only turns up in an
        average usually means you helped the sessions that were already fine.
        This one gave the slowest sessions, old phones and bad networks, the
        same proportional relief as the fast ones. Those are the sessions where
        people actually give up and close the tab.
      </p>

      <p>
        Getting there took a few months. Getting anyone outside my team to care
        took longer, and that's most of what this post is about.
      </p>

      <h2>Coming Back to a Codebase I Already Knew Was Slow</h2>

      <p>
        I'm a boomerang. Worked here, left, came back. For performance work that
        turns out to be a cheat code. The expensive part of speeding up a mature
        codebase isn't writing the optimization, it's knowing which slow things
        are slow for a good reason. I already had that map, and I'd helped make
        some of the mess.
      </p>

      <p>
        So I didn't start with a profiler and a blank mind. I started with a
        list I'd been carrying around for years: everywhere I remembered as
        needlessly eager, needlessly serial, or needlessly big. Then I let my
        brain run flat out for a few months. Pull a thread, measure it, drop it,
        pull the next one. No roadmap, and no falling in love with the first
        idea. Most of them were small. Two turned out to be disproportionate,
        and honestly I couldn't have told you in advance which two.
      </p>

      <h3>None of the Techniques Were Clever</h3>

      <p>
        This was the standard frontend checklist, pointed at the right places:
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
          weaker, earlier one would have done. Quietly the most valuable
          category here, and the least interesting to write.
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
          superseded in-flight requests, prune speculative preloads that had
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
        That last one is the bullet I'd defend hardest. Instrumentation isn't
        overhead you get to when there's spare time. It's what makes every later
        optimization arguable.
      </p>

      <p>
        Only two items on that list moved the headline, and if you count only
        those two you've misread it. A memoized factory, a subscription that
        stops attaching eagerly, a chunk that no longer ships to people who
        never open it. None of them survives a significance test on its own.
        Together they lower the baseline every later change gets measured
        against, and each one you fix and measure sharpens where you look next.
        Ship the small ones. Just don't try to claim them individually.
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
        . Exploration is a leverage problem. While I still didn't know whether a
        candidate was real, I stayed in the loop: read this hot path with me,
        tell me what's awaited sequentially here, show me what this pulls into
        the bundle, argue against my hypothesis. Fast rounds, my judgment every
        turn. That's how a list of vague memories became a ranked set of
        candidates in days.
      </p>

      <p>
        Delegation came second, once the shape of a change was settled and the
        work went mechanical and wide. Apply the pattern across call sites, keep
        behavior identical, write the tests. Hand that off and go start the next
        investigation. Getting these two the wrong way round, delegating the
        thinking and then micromanaging the typing, is the most expensive habit
        I see.
      </p>

      <h3>What the Two Winners Had in Common</h3>

      <p>
        Both of them removed a <em>wait</em>. Neither made anything compute
        faster. One took a big piece of work off the critical path, the other
        stopped two components waiting on a stricter readiness signal than
        either of them needed.
      </p>

      <p>
        That sounds like a footnote. It's actually what decided whether I could
        prove anything at all.
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
            between two timestamps is exactly what a phase-boundary metric
            measures, so the saving has nowhere to hide.
          </li>
          <li>
            <strong>Removing CPU work</strong> (redundant property lookups in a
            hot path) was microseconds of main-thread time sitting{' '}
            <em>inside</em> a phase rather than between phases. Real cost, wrong
            instrument.
          </li>
          <li>
            <strong>Removing retained resources</strong> (lazier subscriptions
            cutting listener count and heap) has no column in a timings table at
            all. You can't report what you never measured.
          </li>
        </ul>
        <p className="text-sm mt-3">
          A phase-boundary table can only see changes that remove a barrier.
          Knowing that up front stops you writing "no improvement detected" when
          the honest sentence is "we pointed the wrong instrument at it."
        </p>
      </div>

      <h2>Then Someone Asked What It Was Worth</h2>

      <p>
        I've carried a result like the one above into a room and got a
        completely fair question back: so what does that mean for us? I had
        latency. They'd asked about outcomes. Those aren't the same sentence,
        and translating between them is our job, not theirs.
      </p>

      <p>
        That translation is what being <strong>product-first</strong> actually
        buys you, and it starts long before the readout. It changes which
        optimizations you bother picking up, because you start favouring the
        ones whose effect you'll be able to defend over the ones that are
        satisfying to write. It also changes when you instrument, since a marker
        is cheap to add while the code is still open on your screen and
        expensive to add after the fact.
      </p>

      <h3>We're a Guest on Someone Else's Page</h3>

      <p>
        We don't own the page our code runs on. Rokt embeds its SDK directly
        into partner pages, the checkout and confirmation flows of retailers,
        airlines and ticketing sites, sitting alongside their code and inside
        their load budget. Every millisecond we spend booting is spent out of
        someone else's page. A slow third-party script isn't a slightly worse
        experience, it's a cost you're handing to a team that agreed to host
        you, and they can see it in their own numbers. Being fast is the price
        of being welcome there.
      </p>

      <p>
        We also had a conversion rate for it, and this is the bit I'd steal if I
        were you. A latency-injection study, where you deliberately slow a
        random slice of traffic and watch what happens to the outcome you care
        about, gives you an elasticity. Ours landed around 3-4% revenue movement
        per second of time to interactive. If your team doesn't have that
        number, it's the highest-leverage experiment on your list, because one
        constant turns every millisecond into a sentence a stakeholder can plan
        around. It cuts both ways though. A wrong latency number now converts
        straight into a wrong revenue claim.
      </p>

      <h3>The Measurement Was Harder Than the Code</h3>

      <p>
        The number I'd defend came from a combined holdback. One randomized
        cohort, several independent latency optimizations all off versus all on,
        split 50/50, read on a closed window.
      </p>

      <table className="w-full border-collapse border border-blitz-charcoal/20 my-6">
        <thead>
          <tr className="bg-blitz-charcoal/5">
            <th className="border border-blitz-charcoal/20 p-3 text-left">
              SDK time to interactive
            </th>
            <th className="border border-blitz-charcoal/20 p-3 text-right">
              p50
            </th>
            <th className="border border-blitz-charcoal/20 p-3 text-right">
              p95
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-blitz-charcoal/20 p-3">
              Treatment versus holdback
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right font-medium text-green-600">
              −11%
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right font-medium text-green-600">
              −12%
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        Five days, arm split holding, daily deltas steady the whole way through.
        That's the one I'd put my name on.
      </p>

      <p>
        I also wanted to know the effect landed where I thought it did, so one
        of the two changes got its own randomized arm:
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
              Framework startup phase, which the diff governs
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
        The second row is the one that matters. The saving turns up in exactly
        the phase the changed files govern, and a later phase the diff never
        touches sat still in the same readout. Predict where an effect should
        show up, then check that it showed up there and nowhere it shouldn't.
        That's the difference between "latency improved after we deployed" and
        "latency improved <em>where our diff could have improved it</em>."
      </p>

      <h2>Making It Repeatable: Two A/B Skills</h2>

      <p>
        This is the part I'd actually hand to another team. Every rule I'd
        picked up lived in my head and in a folder of dated markdown reports,
        which isn't durable. The next person to run a performance experiment
        pays full price for the same lessons, and I'd re-derive half of them
        myself in six months.
      </p>

      <p>
        So I wrote the method down as two{' '}
        <Link
          to="/blog/claude-skills-institutional-knowledge"
          className="text-blitz-accent hover:underline"
        >
          Claude Skills
        </Link>
        , split on the only line that matters: does the data exist yet?
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
        None of the rules are clever. Every one of them is a way this kind of
        measurement fails quietly, which is exactly why they're worth writing
        down:
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
        Skills rather than a wiki page, because a wiki page gets read by people
        who already suspect they need it. A skill loads when the work starts.
        Asking "did the experiment work" now pulls in the rule list, the
        denominator table and the power helper before the first query gets
        written, which is the only moment any of it can still save you.
      </p>

      <h2>What It Was Actually Worth</h2>

      <p>
        Back to the question in the room. Run 10-12% through that elasticity and
        you get an estimated 0.3-1.9% of revenue on the surface the SDK renders
        on, the low end at the median and the high end for the slowest traffic.
        Same commits, same quarter, two very different sentences. "We improved
        latency by 11%" is a status update. The second one is a decision input.
      </p>

      <p>
        The outcome metrics in the holdback are a partial answer and I'd rather
        say that plainly. Engagement rate and revenue per transaction both moved
        positive, both landed inside the range the elasticity predicts, and
        neither was individually significant at this sample size. Revenue per
        transaction came in at +0.20%.
      </p>

      <p>
        That +0.20% is easy to wave away, and waving it away is a mistake.
        Percentages don't mean anything until you multiply them by a base. My
        employer has publicly talked about approaching a billion dollars in
        annual revenue, and the surface this SDK renders on is a large slice of
        that. Two tenths of a percent on a small base is noise. Two tenths of a
        percent on a base that size is a line item that keeps showing up every
        year, for as long as the code runs, without anyone touching it again.
      </p>

      <p>
        Engineers skip that multiplication constantly. We report the percentage
        because it's what the test hands us, then let it sit there looking
        unimpressive. Doing the arithmetic out loud is the product-first read,
        and it can still be honest about direction: +0.20% at this sample size
        is value at stake if it holds, not money we made.
      </p>

      <h3>Why the Latency Claim Is Cheap and the Revenue Claim Isn't</h3>

      <p>
        Once you have an elasticity you can work out in advance how much traffic
        each claim needs, and the gap is brutal. A latency win in the tens of
        milliseconds resolves in hours. The fraction-of-a-percent revenue
        movement that same win implies needs orders of magnitude more traffic,
        so months. Shrink the latency win to a third and the revenue timeline
        stretches into years, because the sample you need scales with the
        inverse square of the effect you're chasing.
      </p>

      <p>
        That's arithmetic rather than a measurement failure, and there are four
        honest ways to answer it:
      </p>

      <ol className="list-decimal list-inside space-y-3 ml-4 text-lg my-6">
        <li>
          <strong>Claim the latency win alone.</strong> Fully defensible,
          resolves fast, a real result. Most latency work should stop here and
          say so confidently.
        </li>
        <li>
          <strong>Target a rate, not a sum.</strong> A proportion carries far
          less variance than a heavy-tailed sum, so an engagement rate resolves
          several times cheaper than revenue per transaction for the same
          underlying effect.
        </li>
        <li>
          <strong>Bundle into a combined holdback.</strong> Randomize one cohort
          with several independent optimizations all off versus all on. The
          latency wins stack, the expected revenue effect scales with the sum,
          and the timeline collapses by roughly an order of magnitude. You give
          up per-change attribution, which is the right trade when the
          alternative is a per-change answer you'll never get.
        </li>
        <li>
          <strong>Declare revenue a guardrail, in advance.</strong> A wide
          interval still rules out a large regression. That's a legitimate
          finding, as long as you said so before you saw the number.
        </li>
      </ol>

      <p>
        Do that arithmetic before you write the code. There's a threshold below
        which the revenue effect your win implies is simply smaller than your
        traffic can resolve in any window anyone will wait for, and finding that
        out while the experiment is still cheap to change is a completely
        different conversation from finding it out at readout.
      </p>

      <h2>What I'd Tell You to Do</h2>

      <ol className="list-decimal list-inside space-y-3 ml-4 text-lg">
        <li>
          <strong>Own the translation, not just the change.</strong> Decide what
          outcome your milliseconds are attached to before you start, and let
          that decide what you pick up. Being product-first isn't about writing
          better summaries after the fact, it's about the measurement being
          designed into the work rather than reconstructed from it.
        </li>
        <li>
          <strong>Leverage while exploring, delegate once you know.</strong> The
          candidate list is where your judgment is worth the most, so stay in
          the loop and iterate fast. The rollout is where breadth is worth the
          most, so hand it off.
        </li>
        <li>
          <strong>Get an elasticity, then use it as a bound.</strong> One number
          converting your metric to business value does two jobs. It makes the
          work legible to the people who fund it, and it gives you a sanity
          check that catches query bugs a p-value never will. A result 20x
          larger than the model permits is a bug.
        </li>
        <li>
          <strong>Size the claim before you write the code.</strong> If the
          revenue answer needs two years of traffic, work that out while the
          experiment is still cheap to change. Claiming the latency win alone is
          a legitimate, complete result.
        </li>
        <li>
          <strong>
            Predict where the effect should land, then check that it did.
          </strong>{' '}
          The claim that survived scrutiny wasn't "latency improved after we
          deployed." It was "latency improved in exactly the phase our diff
          governs, while the phase we didn't touch held still."
        </li>
        <li>
          <strong>Write down what you refuse to claim.</strong> Some of my
          metrics moved the right way and I claimed none of them, because they
          sat inside their own noise. Naming that explicitly is what made the
          number I <em>did</em> claim believable.
        </li>
      </ol>

      <h2>Closing Thoughts</h2>

      <p>
        The engineering here is ordinary. Don't do work early that doesn't need
        to be early, don't wait on a signal stricter than the one you need, load
        lazily what most people won't use. Any decent engineer lands on the same
        changes given the same map. That's the appealing part, really: this much
        leverage is sitting in plain sight in most codebases.
      </p>

      <p>
        The measurement was the hard part and where all the risk lived, which is
        why the durable output of this quarter isn't the two optimizations. It's{' '}
        <code>ab-setup</code> and <code>ab-diagnose</code>. The optimizations
        shipped once. The skills make the next win arguable, and the one after
        that. Same discipline as the{' '}
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
