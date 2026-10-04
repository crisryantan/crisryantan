import React from 'react'
import { Link } from 'gatsby'
import ArticleLayout from '../../components/ArticleLayout'
import CountUp from '../../components/motion/CountUp'

const MeasuringEngineeringImpactPage = () => {
  return (
    <ArticleLayout
      title="Measuring the Impact of Engineering Work"
      description="How I measured SDK performance improvements at Rokt, starting with the customer experience, and turned the experiment setup and analysis into two reusable Claude Skills."
      date="September 18, 2026"
      readTime="6 min read"
      category="Performance"
      slug="/blog/measuring-engineering-impact"
      tags={['Experimentation', 'A/B Testing', 'Claude Skills', 'Performance']}
    >
      <p className="text-lg text-blitz-charcoal/70 mb-8">
        Our web SDK at Rokt renders offers inside our partners' checkout and
        confirmation pages. I wanted to make that experience smoother for
        customers by getting offers ready sooner, with less delay as they move
        through the flow.
      </p>

      <p>
        That meant making a series of performance improvements to the SDK. I
        split out code that most sessions didn't need, ran independent work in
        parallel, and moved nonessential work until after render.
      </p>

      <p>
        Improving the customer experience was the main goal. Revenue was
        secondary, so seeing a revenue impact was a huge bonus.
      </p>

      <p>
        Measuring the work took more effort than I expected. We needed an
        experiment that could measure the changes, enough traffic to detect
        their effects, and a way to account for sessions that never reached the
        point we were timing. I eventually put the setup and analysis procedures
        into two Claude Skills, <code>ab-setup</code> and{' '}
        <code>ab-diagnose</code>, so I could use them again.
      </p>

      <h2>The results</h2>

      <p>
        We split traffic 50/50 between versions with and without the performance
        changes. We chose the analysis window before looking at the results.
      </p>

      <div className="bg-gradient-to-r from-blitz-accent/10 to-blitz-soft/10 border border-blitz-accent/20 p-8 rounded-lg my-8">
        <div className="grid md:grid-cols-2 gap-6">
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
        </div>
      </div>

      <p>
        I was particularly happy with the p95 result. The improvement extended
        to the slower end of the distribution, where users were waiting longer.
        These numbers describe the performance changes tested together; the
        combined experiment doesn't tell us how much each individual change
        contributed.
      </p>

      <p>
        The work also had a revenue impact. The figures are internal, so I can't
        share them in this public post.
      </p>

      <p>
        To estimate the revenue benefit from the time we saved, we used an
        earlier controlled delay study at Rokt. That study estimated how revenue
        changes when latency increases. Applying it here assumes the same
        relationship holds for our changes and traffic.
      </p>

      <h2>What needed to be decided before shipping</h2>

      <p>
        Time to interactive was a useful metric for this work because the
        changes directly affected SDK startup. We were reducing how much code
        had to load and how much work had to finish before the SDK became
        interactive.
      </p>

      <p>
        Revenue was a secondary outcome to investigate. Offers that are ready
        sooner may be seen by more customers, and some of those customers may
        choose to act on them. Each of those steps sits between faster startup
        and revenue. The expected revenue effect was much smaller than the
        latency effect, so it needed more data to measure reliably.
      </p>

      <p>
        In this project, the latency result took an afternoon to detect. We
        spent a quarter on the revenue question. Those aren't useful timelines
        to apply to every experiment, but they explain why I'd estimate the
        required sample before committing to a revenue claim. The expected
        effect, variation in the metric, and available traffic determine whether
        the experiment is practical.
      </p>

      <p>There were three things to work out before the test:</p>

      <ol className="space-y-3 my-6">
        <li>
          <strong>What result would be useful?</strong> Choose the primary
          metric, the smallest improvement worth detecting, and the sample
          needed to detect it. Use that to decide how long to run the
          experiment.
        </li>
        <li>
          <strong>How will both groups be recorded?</strong> Record assignment
          to the experiment for the control and treatment groups, before the
          operation being measured can fail. Count each experimental unit once.
          If the experiment configuration is missing, enroll nobody.
        </li>
        <li>
          <strong>How will we make the decision?</strong> Write down the
          metrics, analysis window, and checks in the pull request before the
          results are available.
        </li>
      </ol>

      <p>
        If the available traffic can't answer the business question in a
        reasonable time, that affects the plan. You might measure a more direct
        outcome or test several related improvements together. We used a
        combined experiment, so the reported effect belongs to that set of
        changes.
      </p>

      <h2>What I checked before interpreting the results</h2>

      <p>
        The first check was whether the deployed code was actually recording the
        experiment. A correct implementation in a local checkout doesn't
        establish that the production data contains what the analysis needs.
      </p>

      <p>
        Next came the population being compared. This is easy to get wrong
        because a query can return plausible numbers while leaving out relevant
        sessions.
      </p>

      <p>
        Consider a session that enters the experiment but leaves before the SDK
        becomes interactive. It might never produce a timing record. If you
        build the experiment population from timing records, that session
        disappears from the analysis. A faster SDK could change which sessions
        produce those records, which also changes who is included in the timing
        comparison.
      </p>

      <p>
        That's why the analysis starts with enrollment. From there, check how
        many sessions in each group reach the point being measured. If that rate
        changes, report it and account for it when interpreting the timing
        results.
      </p>

      <p>
        I also checked the observed group sizes against the intended 50/50
        split. An unexplained imbalance needs investigating before drawing
        conclusions from the outcome metrics.
      </p>

      <p>
        Once those checks were done, I could look at the outcomes and their
        uncertainty. Confidence intervals help show how precisely an effect has
        been estimated. For an inconclusive result, the question is whether the
        experiment could detect an effect small enough to matter. An
        inconclusive result doesn't establish that the changes had no effect.
      </p>

      <p>
        Finally, save the report with the experiment definition, analysis
        window, queries, and limitations before removing the experiment. That
        gives the next person enough context to understand the result without
        reconstructing the setup from old code.
      </p>

      <h2>What I put into the two skills</h2>

      <p>
        I had already been{' '}
        <Link
          to="/blog/claude-skills-institutional-knowledge/"
          className="text-blitz-accent hover:underline"
        >
          using Claude Skills to make technical workflows reusable
        </Link>
        . This workflow had two distinct points where I wanted help: when
        planning a change and when reading its results.
      </p>

      <p>
        <code>ab-setup</code> starts with the proposed change, the metric it
        should affect, and the business outcome we think it might influence. It
        guides the sample-size estimate, enrollment instrumentation, and written
        analysis plan. The useful output is a plan we can review before
        shipping, including whether we have enough traffic to answer the
        question.
      </p>

      <p>
        <code>ab-diagnose</code> works through the deployed instrumentation,
        enrolled population, group split, and outcomes in that order. It
        produces a report that distinguishes measured effects from estimates and
        unresolved questions.
      </p>

      <p>
        For this SDK project, that means explaining the original goal alongside
        the results:
      </p>

      <ul className="space-y-3 my-6">
        <li>
          <strong>Customer experience:</strong> the goal was to make offers
          available sooner and the checkout and confirmation flow feel smoother.
        </li>
        <li>
          <strong>Measured performance:</strong> time to interactive was 11%
          lower at p50 and 12% lower at p95 in the combined experiment.
        </li>
        <li>
          <strong>Revenue impact:</strong> the work had a revenue impact, but
          the figures are internal and aren't disclosed in this post.
        </li>
      </ul>

      <p>
        Having those steps in skills gives me a procedure to follow on the next
        project. I still need to review the experiment design and the
        conclusions.
      </p>

      <p>
        For this work, we had both a metric directly affected by the code and an
        earlier study connecting latency to revenue. Other projects may need
        different evidence. A refactor's value might take longer to observe, and
        some work won't have a useful revenue estimate.
      </p>

      <p>
        Before your next change ships, write down what you expect it to improve,
        how you'll compare the result, and what evidence would be useful enough
        to act on. Then make sure you're collecting the data needed to answer
        that question.
      </p>
    </ArticleLayout>
  )
}

export default MeasuringEngineeringImpactPage
