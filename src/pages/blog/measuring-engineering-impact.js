import React from 'react'
import { Link } from 'gatsby'
import ArticleLayout from '../../components/ArticleLayout'
import CountUp from '../../components/motion/CountUp'

const MeasuringEngineeringImpactPage = () => {
  return (
    <ArticleLayout
      title="Measuring the Impact of Engineering Work"
      description="Every change we ship has a purpose. As AI writes more of our code, backing that purpose with numbers matters more than ever. A practical guide, with results from latency work at Rokt."
      date="November 17, 2026"
      readTime="6 min read"
      category="Experimentation"
      slug="/blog/measuring-engineering-impact"
      tags={['Experimentation', 'A/B Testing', 'Performance', 'Claude Skills']}
    >
      <p className="text-lg text-blitz-charcoal/70 mb-8">
        Every engineering change has a purpose: a faster page, fewer errors, a
        lower bill, time back for the team, or more revenue. Shipping the change
        gives us a chance to deliver that improvement. We still need to find out
        whether it happened.
      </p>

      <p>
        As AI handles more implementation, I think choosing that purpose and
        measuring the result will become a larger part of engineering.
      </p>

      <p>
        Recent latency work on Rokt's web SDK gave us several chances to
        practice this. We wanted offers to be ready sooner on checkout and
        confirmation pages. Some changes could be tested with a random split.
        One shipped without one. Another was large enough to measure revenue
        directly.
      </p>

      <p>
        The goal was similar across the work, but each comparison supported a
        different claim.
      </p>

      <h2>Start with the question you need to answer</h2>

      <p>
        Before shipping, write down what the change should improve and the
        metric that would show it. For our SDK, that was its own time to
        interactive: how long until an offer is on screen and ready.
      </p>

      <p>
        If the metric is a step toward a bigger outcome, write down the steps
        between them. An offer becoming ready sooner might mean more shoppers
        see it, more act on it, and more revenue follows. A clear improvement at
        the first step can become a small effect by the last.
      </p>

      <p>
        Estimate that downstream effect before committing to measure it. Earlier
        studies or a rough estimate can help you work out whether the available
        traffic will answer the question in a useful amount of time.
      </p>

      <p>
        For some of our startup work, the expected revenue lift was too small to
        measure within the available window. We measured latency directly and
        used revenue as a guardrail.
      </p>

      <p>
        A guardrail needs a threshold: how much loss would be unacceptable? The
        experiment then needs enough data to rule out a loss that large. An
        inconclusive revenue result alone doesn't establish that nothing got
        worse.
      </p>

      <h2>A random split for startup improvements</h2>

      <p>
        We deferred code, removed unnecessary work, and shrank the offer bundle.
        The aim was a faster SDK for partners without requiring changes on their
        side.
      </p>

      <p>
        We tested related improvements with random splits, then brought them
        together on a shared split to measure the combined result. Across the
        startup work, median SDK time to interactive fell <strong>11%</strong>,
        with a <strong>12% reduction at p95</strong>.
      </p>

      <p>
        Testing changes together answers a useful question: what does the
        combined version achieve? It doesn't tell you how much of that result
        belongs to each change.
      </p>

      <p>
        For a randomized comparison, record assignment before the operation
        being measured can fail. Otherwise, people who leave early may disappear
        from the data. Report the estimated effect with a confidence interval so
        readers can see both the result and its uncertainty.
      </p>

      <h2>A staged rollout with revenue as an outcome</h2>

      <p>
        A separate feature made offers ready sooner by enough that we could aim
        at revenue directly. I can't share what the feature does, but I can
        share how we measured it.
      </p>

      <p>
        We increased exposure per partner through 10%, 50%, and 100%, with
        revenue included in the criteria for progressing. The process included a
        four-week comparison at 50% and adjustments for individual partners
        along the way.
      </p>

      <p>For the three partners that completed the rollout:</p>

      <ul className="space-y-3 my-6">
        <li>
          Median SDK time to interactive fell <strong>27% to 76%</strong>.
        </li>
        <li>
          Revenue increased <strong>4.0% to 5.7%</strong>, with each 95%
          confidence interval above zero.
        </li>
        <li>
          Averaging the three partner-level percentage changes gave a{' '}
          <strong>46% reduction in median time to interactive</strong> and a{' '}
          <strong>4.8% revenue increase</strong>.
        </li>
      </ul>

      <p>
        Those averages describe these three partners. They aren't a fleet-wide
        result.
      </p>

      <div className="bg-gradient-to-r from-blitz-accent/10 to-blitz-soft/10 border border-blitz-accent/20 p-8 rounded-lg my-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <p className="text-3xl font-bold text-blitz-accent">
              <CountUp value={11} prefix="−" suffix="%" />
            </p>
            <p className="text-sm text-blitz-charcoal/70">
              Median SDK time to interactive from the startup work (12% at p95)
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blitz-accent">
              <CountUp value={46} prefix="−" suffix="%" />
            </p>
            <p className="text-sm text-blitz-charcoal/70">
              Median SDK time to interactive from the separate feature, average
              of three partners (27% to 76%)
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blitz-accent">
              <CountUp value={4.8} decimals={1} prefix="+" suffix="%" />
            </p>
            <p className="text-sm text-blitz-charcoal/70">
              Revenue from the same feature, average of the same three partners
              (+4.0% to +5.7%)
            </p>
          </div>
        </div>
      </div>

      <p>
        Breaking revenue into its parts helped explain the gains. For the
        slowest partner, about a quarter fewer shoppers left before the offer
        appeared. The fastest partner gained mostly through value per click.
      </p>

      <p>
        The same feature improved the outcome through different parts of the
        journey. Looking only at the total would have hidden that.
      </p>

      <p>
        For staged rollouts, decide the criteria for each step before starting.
        If you change the implementation or configuration, distinguish the new
        setup from the earlier one in the analysis. Repeatedly adjusting and
        checking until a result passes can turn noise into an apparent win, so
        confirm the final setup using a fresh, predefined analysis window.
      </p>

      <h2>Check the population before trusting the result</h2>

      <p>
        One early revenue result changed direction after we excluded old cached
        builds. That was a concrete reminder that a plausible result can still
        describe the wrong comparison.
      </p>

      <p>Before interpreting outcomes, I check:</p>

      <ul className="space-y-3 my-6">
        <li>
          <strong>Did we record both groups before anything could fail?</strong>{' '}
          Starting from successful timing records can leave out the very
          sessions the change affects.
        </li>
        <li>
          <strong>How many sessions reach the measurement?</strong> A version
          can look faster if its slowest loads fail before producing a timing
          event.
        </li>
        <li>
          <strong>
            Does the observed split match the intended allocation?
          </strong>{' '}
          An unexplained imbalance needs investigation.
        </li>
        <li>
          <strong>Are the builds and eligibility rules correct?</strong> Cached
          versions and traffic that should have been excluded can change who
          ends up in each group.
        </li>
      </ul>

      <p>
        These checks affect what the outcome means. If fewer shoppers abandon
        the page, for example, that is a result worth reporting, and it can also
        change the population represented in the timing data.
      </p>

      <h2>When a split isn't practical</h2>

      <p>
        One startup change shipped without a randomized holdback. We compared
        the canary with the existing build over the same hours, matching
        partners and checking the variation on a build without code changes.
        That gave us useful evidence of an improvement, with more uncertainty
        about attribution than our randomized tests.
      </p>

      <p>
        Some work doesn't allow a useful simultaneous comparison. A build-tool
        change, migration, or team workflow might leave you comparing before and
        after.
      </p>

      <p>
        That can still be informative, but normal variation matters. Time of day
        alone noticeably changes our median SDK time to interactive.
      </p>

      <p>
        Use enough baseline data to understand those swings. Compare similar
        days and conditions, record other changes in the same period, and look
        for an unaffected service or team that can help reveal broader trends.
      </p>

      <p>
        If the ultimate outcome takes months to move, choose an earlier signal
        too. Build time may respond before release frequency does. Be clear
        about which result you observed and which longer-term benefit remains an
        expectation.
      </p>

      <h2>Make the next experiment easier to run</h2>

      <p>
        I now put the purpose, metric, comparison, analysis window, and criteria
        for acting into the pull request before results exist.
      </p>

      <p>
        I also turned the workflow into two Claude Skills, building on how I've
        been{' '}
        <Link
          to="/blog/claude-skills-institutional-knowledge/"
          className="text-blitz-accent hover:underline"
        >
          making technical workflows reusable
        </Link>
        .
      </p>

      <p>
        <code>ab-setup</code> starts with the proposed change and its metric,
        estimates the traffic needed, and helps write the plan before shipping.
      </p>

      <p>
        <code>ab-diagnose</code> checks the groups before interpreting outcomes
        and keeps measured effects separate from estimates. The report preserves
        the comparison, queries, uncertainty, and limitations so someone else
        can understand the result later.
      </p>

      <p>
        The skills make the procedure easier to repeat. Reviewing the design and
        deciding what the evidence supports still takes judgment.
      </p>

      <p>
        Before your next change ships, write down what it is supposed to achieve
        and what evidence would be enough to act on. That small step determines
        how much you'll be able to say about the work afterwards.
      </p>
    </ArticleLayout>
  )
}

export default MeasuringEngineeringImpactPage
