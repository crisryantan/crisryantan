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
        Every change an engineer ships has a purpose: a faster page, fewer
        errors, a lower bill, time back for the team, or revenue. As AI writes
        more of the code, I think the job shifts toward choosing that purpose
        and measuring its impact.
      </p>

      <p>
        Here's the playbook I use, followed by what it found for latency work on
        Rokt's web SDK.
      </p>

      <h2>Start with the purpose</h2>

      <p>
        Write down what the change is for and the number that would show it
        worked. A performance fix might target load time for the slowest users,
        a reliability fix the error rate, a refactor the time to ship the next
        feature, and a cost change the spend per request.
      </p>

      <p>
        If that number is a step toward a bigger goal, write the steps in
        between. Faster loading might mean more people see an offer, click, then
        generate revenue. Each step can shrink the effect.
      </p>

      <p>
        Then size the effect on the end goal, from earlier studies or a rough
        estimate. If it's too small to detect in a reasonable time, report the
        direct number and keep the end goal as a guardrail: decide the largest
        loss you'd accept, and check that the results rule out anything worse.
      </p>

      <h2>Pick the comparison the change allows</h2>

      <p>
        Impact is a difference: what happened with the change against what would
        have happened without it. You never see the second one, so you need a
        stand-in. These are the ones I use.
      </p>

      <h3>A random split</h3>

      <p>
        Randomly send some users or page loads to the new version and the rest
        to the old one. Chance makes the two groups alike on average, so the
        difference between them estimates the change's effect. Some difference
        is always noise, so report it with an interval and only claim a gain
        when the interval clears zero. Log each user's group before anything can
        go wrong, so people who drop out early still count. Letting people opt
        in doesn't count, because whatever made them opt in also affects the
        outcome.
      </p>

      <p>
        Once related changes have each shown they work, you can combine them on
        one split to measure what will ship. It saves time and traffic, but you
        lose each change's separate share.
      </p>

      <h3>A staged ramp for risky changes</h3>

      <p>
        The same idea, but the new version's share grows in steps, such as 10%,
        then 50%, then everyone. The small step catches problems early, and the
        bigger one gives you enough data to measure the outcome. Write the bar
        for each step before you start.
      </p>

      <p>
        If a step fails, hold, change one thing and read again. Limit the
        retries, because enough attempts will eventually pass by luck, and
        confirm the final setup with one fresh read over a window you fixed in
        advance. Every change of share or setup restarts the clock. Compare
        rates rather than raw counts, since counts jump whenever the share
        moves.
      </p>

      <h3>A canary compared with everyone else</h3>

      <p>
        A canary sends a new build to a small group first. You can compare it
        with everyone else over the same hours, but only if the groups match.
        Pin each side to a single build so old cached versions don't mix in, and
        compare each customer or region against itself. If the groups don't
        match, treat the result as a lead rather than a finding.
      </p>

      <p>
        To see how much difference is just noise, repeat the comparison on a
        build with no code changes, and check that a part of the system the
        change didn't touch stays flat. Short windows suit big effects but can
        miss rare errors and small regressions.
      </p>

      <h3>When nothing can be split</h3>

      <p>
        Many changes can't be split at all: a refactor, a new build tool, a
        database migration, a cost cut. That leaves before and after, which
        misleads easily because other things change over time. Time of day alone
        noticeably swings our median SDK time to interactive.
      </p>

      <p>
        A few habits make it hold up. Use a baseline long enough to show the
        normal ups and downs, and compare the same days of the week. Find
        something that didn't change, like a similar service or another team,
        and check that it stayed flat over the same period. Decide in advance
        how big the change must be to beat the normal swings. If the end goal
        moves slowly, pick a quicker signal that should move first, like build
        time before release frequency. Even then it's weaker evidence than a
        split, so note anything else that changed in the same window.
      </p>

      <h2>Check who you're comparing before reading outcomes</h2>

      <p>Before looking at results, I check four things:</p>

      <ul className="space-y-3 my-6">
        <li>
          <strong>
            Do both groups reach the measurement at the same rate?
          </strong>{' '}
          If the new version makes some slow loads fail before they're timed, it
          can look faster just by losing its slowest users.
        </li>
        <li>
          <strong>Are the groups the size you intended?</strong> A planned 50/50
          split that comes out lopsided usually points to a problem with
          assignment, so explain it first.
        </li>
        <li>
          <strong>Is everyone running the current version?</strong> Old cached
          builds flipped an early revenue result of ours until we excluded them.
        </li>
        <li>
          <strong>Does everyone belong in their group?</strong> Traffic meant to
          be left out can end up counted as the control group.
        </li>
      </ul>

      <h2>Break the outcome into its parts</h2>

      <p>
        Most goals are made of parts. For us, revenue is offers shown, times
        clicks per offer, times value per click. Build time might be time in the
        queue plus time running plus time lost to retries. A flat part can hide
        gains elsewhere, and the same change can help different places through
        different parts.
      </p>

      <h2>Write it down first, and make it repeatable</h2>

      <p>
        Put the purpose, metric, comparison, analysis window and bar for acting
        in the pull request before results exist.
      </p>

      <p>
        I turned this into two Claude Skills, <code>ab-setup</code> and{' '}
        <code>ab-diagnose</code>, as part of{' '}
        <Link
          to="/blog/claude-skills-institutional-knowledge/"
          className="text-blitz-accent hover:underline"
        >
          using Claude Skills to make technical workflows reusable
        </Link>
        . <code>ab-setup</code> starts from the change and its metric, estimates
        how much traffic you need and writes the plan before shipping.{' '}
        <code>ab-diagnose</code> checks the groups before the outcomes and keeps
        measured effects separate from estimates.
      </p>

      <h2>What this looked like for our latency work</h2>

      <p>
        Rokt's web SDK shows offers on checkout and confirmation pages, and the
        team shipped a run of latency work on it. The purpose throughout was
        getting offers in front of shoppers sooner. The direct number was the
        SDK's own time to interactive: how long until an offer is on screen and
        ready, the part of the wait we control. Each piece of work called for a
        different comparison.
      </p>

      <h3>A smaller, faster startup</h3>

      <ul className="space-y-3 my-6">
        <li>
          <strong>Purpose:</strong> a faster SDK for every partner, with no code
          changes on their side. We deferred code, removed unnecessary work and
          shrank the offer bundle.
        </li>
        <li>
          <strong>How we measured it:</strong> random splits first, then one
          shared split for the combined changes. The expected revenue lift was
          too small to measure in time, so revenue was a guardrail.
        </li>
        <li>
          <strong>Impact:</strong> together with the startup change below,
          median SDK time to interactive fell 11%, and 12% for the slowest 5% of
          loads.
        </li>
      </ul>

      <h3>A startup change with no split</h3>

      <ul className="space-y-3 my-6">
        <li>
          <strong>Purpose:</strong> shorten one phase of startup by changing the
          order two SDK parts connect in.
        </li>
        <li>
          <strong>How we measured it:</strong> it shipped without a split, so we
          compared the canary build with the rest of the fleet over the same
          hours, each side pinned to a single build and each partner against
          itself. We repeated the comparison on a config-only build to see the
          noise.
        </li>
        <li>
          <strong>Impact:</strong> the targeted phase fell 18% for the slowest
          10% of loads, well above that noise. Already fast partners gained
          nothing and the slowest gained a median of 23%, the pattern you'd
          expect from removing a wait.
        </li>
      </ul>

      <h3>An undisclosed feature</h3>

      <ul className="space-y-3 my-6">
        <li>
          <strong>Purpose:</strong> offers ready sooner, with an effect big
          enough to aim at revenue directly. I can't share what it does.
        </li>
        <li>
          <strong>How we measured it:</strong> a staged ramp per partner through
          10%, 50% and 100%, with revenue in the bar at each step, a four-week
          read at 50% and adjustments per partner along the way. Breaking
          revenue into its parts showed where each gain came from.
        </li>
        <li>
          <strong>Impact:</strong> for the three partners that finished the
          ramp, median SDK time to interactive fell 27% to 76%, and revenue rose
          4.0% to 5.7%, with every 95% interval above zero. The slowest partner
          gained because about a quarter fewer shoppers left before the offer
          appeared. The fastest gained mostly through value per click.
        </li>
      </ul>

      <div className="bg-gradient-to-r from-blitz-accent/10 to-blitz-soft/10 border border-blitz-accent/20 p-8 rounded-lg my-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <p className="text-3xl font-bold text-blitz-accent">
              <CountUp value={11} prefix="−" suffix="%" />
            </p>
            <p className="text-sm text-blitz-charcoal/70">
              Median SDK time to interactive from the startup work (12% for the
              slowest 5% of loads)
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blitz-accent">
              <CountUp value={46} prefix="−" suffix="%" />
            </p>
            <p className="text-sm text-blitz-charcoal/70">
              Median SDK time to interactive from the undisclosed feature,
              average of three partners (27% to 76%)
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
        Every change has a purpose, and it's worth knowing how much of it the
        change delivered. As AI handles more implementation, I expect that to
        become a larger part of engineering.
      </p>
    </ArticleLayout>
  )
}

export default MeasuringEngineeringImpactPage
