import React from 'react'
import { Link } from 'gatsby'
import ArticleLayout from '../../components/ArticleLayout'
import CountUp from '../../components/motion/CountUp'

const ProvingPerformanceWinsPage = () => {
  return (
    <ArticleLayout
      title="We Cut Our SDK's Time to Interactive by 10-12%. Then We Built the A/B Skills to Measure the Impact."
      description="A run of performance changes to Rokt's web SDK, two of them outliers, took 10-12% off our time to interactive from the median out to p95. Writing the code was the easier half. Here's how we measured what it was worth, and the two A/B skills that turned measurement from a project into a step."
      date="August 30, 2026"
      readTime="8 min read"
      category="Performance"
      slug="/blog/proving-performance-wins"
      tags={['Performance', 'Experimentation', 'A/B Testing', 'Claude Skills']}
    >
      <p className="text-lg text-blitz-charcoal/70 italic mb-8">
        <strong>TL;DR:</strong> A run of performance changes to Rokt's web SDK,
        two of which turned out to be outliers, took <strong>10-12%</strong> off
        our time to interactive, and the win held from the median out to p95.
        Writing the code was the easier half. The harder half was measuring what
        it was worth, so I packaged that method into two Claude skills,{' '}
        <code>ab-setup</code> and <code>ab-diagnose</code>. Setting up and
        reading the next one is now a step rather than a project.
      </p>

      <h2>We Took 10-12% Off Our SDK's Time to Interactive</h2>

      <p>
        Over a few months I shipped a run of performance changes into Rokt's web
        SDK, the one that renders offers on our partners' web pages. Most of
        them were small. Two were outliers, and between them they cut 10-12% off
        the span between our code starting and our content being usable. It held
        at the median, and it held at p95.
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
              Estimated revenue impact for a median session
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blitz-accent">
              <CountUp value={1.4} decimals={1} suffix="–1.9%" />
            </p>
            <p className="text-sm text-blitz-charcoal/70">
              Estimated revenue impact for the slowest 5% of sessions
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
        Getting there took a few months. Working out what it was worth took
        longer, and that's most of what this post is about.
      </p>

      <h2>I Came Back With a List</h2>

      <p>
        I'm a boomerang. Worked here, left, came back. The nice part about that
        is you don't arrive empty-handed. I'd spent time in this codebase before
        and I left with a running list of opportunities, places I remembered
        thinking we could do better if anyone ever got the time. When I came
        back, I had a go at them.
      </p>

      <p>
        That's a real head start for performance work, because the expensive
        part of speeding up a mature codebase isn't writing the optimization.
        It's knowing which slow things are slow for a good reason and which ones
        are just habit nobody revisited. I already had a decent sense of the
        difference.
      </p>

      <p>
        So I didn't start with a profiler and a blank mind. I started with the
        list: everywhere I remembered as needlessly eager, needlessly serial, or
        needlessly big. Then I worked through it fast. Pull a thread, measure
        it, drop it, pull the next one. No roadmap, and no falling in love with
        the first idea. Most turned out small. Two were outliers, and honestly I
        couldn't have told you in advance which two.
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
        . Exploration is a leverage problem. I had a lot of ideas and no idea
        which of them were real, so the point was to get through them quickly
        rather than get any single one perfect. While a candidate was still
        unproven I stayed in the loop: read this hot path with me, tell me
        what's awaited sequentially here, show me what this pulls into the
        bundle, argue against my hypothesis. Fast rounds, my judgment every
        turn. That's how a pile of vague memories became a ranked list of
        candidates in days instead of weeks.
      </p>

      <p>
        Rapid iteration only helps if you're iterating toward something, and the
        thing I kept checking against was the customer. Not our team's
        dashboard. A shopper sitting on a partner's page waiting for our offers
        to appear. Every candidate got held up against one question: does this
        put offers in front of that person sooner? That's what being
        product-minded looks like down at the code level, and it turns out to be
        a great filter. It quietly kills the optimizations that are satisfying
        to write but land somewhere nobody ever experiences.
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
        Neither of them made anything compute faster. Both shortened the
        critical path itself, just from opposite directions. One cut down how
        much had to arrive and be parsed before we could render at all, so there
        was less sitting on the path to begin with. The other took a piece of
        work off the path entirely, so nothing downstream was waiting on it any
        more.
      </p>

      <p>
        That distinction sounds like a footnote, but it's what decided whether I
        could prove anything at all. Both changes lived in the gap between two
        timestamps we were already recording, which is the one kind of saving a
        phase-boundary metric can actually see.
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

      <h2>Now, How Do We Measure It?</h2>

      <p>
        So we'd made it faster. This is where a lot of performance work stops: a
        chart in a channel, a few thumbs up, on to the next thing. The trouble
        is that a latency chart doesn't tell anyone what changed for the
        business, and when you can't say that, the work doesn't represent your
        team properly. It reads as maintenance. Turning milliseconds into
        outcomes is our job, not something to hand upward and hope somebody else
        does it for us.
      </p>

      <p>
        Which is why I'd rather design the measurement in than reconstruct it
        afterwards. It changes which optimizations you bother picking up,
        because you start favouring the ones whose effect you'll be able to
        defend. It also changes when you instrument, since a marker is cheap to
        add while the code is still open on your screen and awkward to add once
        it isn't.
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
        The other half of the argument is that this is measurable in money. The
        relationship between load time and revenue is well established across
        the industry, and we have our own internal version of the study: slow a
        random slice of traffic down deliberately, watch what happens to the
        outcome you care about, and you come out with a conversion rate between
        seconds and revenue. That constant is what turns a latency chart into a
        sentence somebody can plan around. It cuts both ways, mind you. A wrong
        latency number now converts straight into a wrong revenue claim.
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

      <h2>The Skills We Built So the Next One Is Easier</h2>

      <p>
        Doing this once was expensive. Every rule I picked up along the way
        lived in my head or in a folder of dated markdown, which isn't durable.
        The next latency change would need the same scaffolding and the same
        careful read, and I'd have re-derived half of it myself within six
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
        The point of packaging it this way is that the next system improvement
        starts with the measurement already solved. Standing up an experiment
        and reading it honestly used to be the slow, risky half of shipping a
        latency change. Now it's a step rather than a project, which is what
        makes the improvements themselves worth doing more often.
      </p>

      <p>
        Skills rather than a wiki page, because a wiki page gets read by people
        who already suspect they need it. A skill loads when the work starts.
        Asking "did the experiment work" now pulls in the checks, the
        denominator table and the power helper before the first query gets
        written, which is the only moment any of it can still save you.
      </p>

      <h2>What's the Impact?</h2>

      <p>
        Percentages don't mean much until you multiply them by a base, so here's
        the base. Rokt{' '}
        <a
          href="https://www.afr.com/street-talk/bruce-buchanan-s-6b-rokt-posts-us834m-revenue-misses-bj-forecast-20260329-p5zjog"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blitz-accent hover:underline"
        >
          posted US$834 million in revenue
        </a>{' '}
        last year, and the surface this SDK renders on is a large slice of that.
      </p>

      <p>
        In the holdback, revenue per transaction moved <strong>+0.20%</strong>.
        I want to be straight about what that is: it's directional. It landed
        inside the range our latency study predicts, and it wasn't individually
        significant at this sample size. But two tenths of a percent against a
        base that size isn't a rounding error. It's a line item that keeps
        showing up every year for as long as the code runs, without anyone
        touching it again.
      </p>

      <p>
        The estimate from the latency side depends on which traffic you're
        asking about, so it's worth splitting rather than averaging:
      </p>

      <table className="w-full border-collapse border border-blitz-charcoal/20 my-6">
        <thead>
          <tr className="bg-blitz-charcoal/5">
            <th className="border border-blitz-charcoal/20 p-3 text-left">
              Traffic
            </th>
            <th className="border border-blitz-charcoal/20 p-3 text-right">
              Time to interactive
            </th>
            <th className="border border-blitz-charcoal/20 p-3 text-right">
              Estimated revenue impact
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-blitz-charcoal/20 p-3">
              A median session
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right font-medium text-green-600">
              −11%
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right font-medium text-green-600">
              0.3-0.5%
            </td>
          </tr>
          <tr>
            <td className="border border-blitz-charcoal/20 p-3">
              The slowest 5% of sessions
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right font-medium text-green-600">
              −12%
            </td>
            <td className="border border-blitz-charcoal/20 p-3 text-right font-medium text-green-600">
              1.4-1.9%
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        Those two rows look inconsistent until you notice the study is
        denominated in seconds, not percent. A 12% saving on a slow session is a
        lot more milliseconds than an 11% saving on a fast one, so the tail
        estimate comes out several times the median one. That's the honest
        reason this is a range rather than one tidy number. The answer genuinely
        depends on whose session you're talking about.
      </p>

      <p>
        Engineers skip this multiplication constantly. We report the percentage,
        because that's what the test hands us, and then let it sit there looking
        unimpressive. Doing the arithmetic out loud is what makes the work
        legible to the people deciding what gets funded next.
      </p>

      <h2>What I'd Tell You to Do</h2>

      <ol className="list-decimal list-inside space-y-3 ml-4 text-lg">
        <li>
          <strong>Own the translation, not just the change.</strong> Decide what
          outcome your milliseconds are attached to before you start, and let
          that decide what you pick up. Being product-minded isn't about writing
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
          <strong>
            Get a latency-to-revenue number, then use it as a bound.
          </strong>{' '}
          One constant converting your metric to business value does two jobs.
          It makes the work legible to the people who fund it, and it gives you
          a sanity check that catches query bugs a p-value never will. A result
          20x larger than the model permits is a bug.
        </li>
        <li>
          <strong>Size the claim before you write the code.</strong> A latency
          win resolves in hours. The fraction-of-a-percent revenue movement it
          implies can take months of traffic, and sometimes longer than anyone
          will wait. Work that out while the experiment is still cheap to
          change, and remember that claiming the latency win alone is a
          legitimate, complete result.
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
        is what turns performance work into something a team gets properly
        credited for. That translation isn't a communication skill you pick up
        at the end. It starts the same moment the work does.
      </p>

      <p>The numbers matter. So does earning the right to quote them.</p>
    </ArticleLayout>
  )
}

export default ProvingPerformanceWinsPage
