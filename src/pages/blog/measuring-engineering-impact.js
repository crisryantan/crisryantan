import React from 'react'
import { Link } from 'gatsby'
import ArticleLayout from '../../components/ArticleLayout'
import CountUp from '../../components/motion/CountUp'

const MeasuringEngineeringImpactPage = () => {
  return (
    <ArticleLayout
      title="What Is Your Work Actually Worth? Two Skills for Measuring Impact"
      description="Refactors, infra work and CI wins rarely survive the question 'so what did that get us?' Here are the two Claude Skills I built to measure impact properly."
      date="September 18, 2026"
      readTime="6 min read"
      category="Performance"
      slug="/blog/measuring-engineering-impact"
      tags={['Experimentation', 'A/B Testing', 'Claude Skills', 'Performance']}
    >
      <p className="text-lg text-blitz-charcoal/70 mb-8">
        Have you ever wondered how much your work is actually worth to the
        business?
      </p>

      <p>
        The refactor. The module you untangled so the next person could change
        it safely. The button you changed from grey to blue. The page you made
        load a second faster. The twenty minutes you took off the CI pipeline,
        multiplied by every engineer, every day, for as long as the repo lives.
        That work is real and the value is real, and almost none of it survives
        the question "so what did that get us?"
      </p>

      <p>
        A run of performance improvements I shipped to our web SDK made it
        meaningfully faster. I wanted to answer that question properly and back
        it with data. Did it increase revenue, did it lift page impressions, did
        it move anything the business already cares about? Whatever I change, we
        should be able to measure what it was worth.
      </p>

      <h2>What I Shipped</h2>

      <p>
        There is a particular satisfaction in refactoring a system you know well
        enough to see the opportunities sitting in it.
      </p>

      <p>
        Those opportunities never show up in a sprint. They do not break
        anything and they do not page anyone. They quietly cost everyone a
        little, forever.
      </p>

      <p>So I took a run at it. The work fell into two piles.</p>

      <ul>
        <li>
          <strong>Load less JavaScript before render.</strong> Code-split what
          most sessions never touch.
        </li>
        <li>
          <strong>Stop waiting for things that can wait.</strong> Run
          independent async work concurrently, and split bootstrap into what has
          to happen before render and what does not.
        </li>
      </ul>

      <p>A dozen smaller things helped too.</p>

      <p>This was, genuinely, good work. And then came the question.</p>

      <h2>The Question That Follows a Good Refactor</h2>

      <p className="text-xl font-semibold text-blitz-primary my-8">
        "Nice. What did that get us?"
      </p>

      <p>
        I had a number. Time to interactive was down and I could point at the
        graph, which felt like an answer for about a day. Down by how much of
        what, and is that good? Nobody beyond the few people who own a metric
        knows whether a move in it was worth the engineering time. It is a
        measurement, not an impact.
      </p>

      <p>So the project became: measure it properly.</p>

      <h2>Why Time to Interactive</h2>

      <p>
        The metric you pick decides what you are able to claim later, so it is
        worth choosing deliberately.
      </p>

      <p>
        Our SDK renders offers inside our partners' checkout and confirmation
        pages, so its startup time comes out of their page-load budget, not
        ours. That makes latency an unusually honest metric for us: every
        millisecond we save is one we hand back to somebody who did not have to
        let us in.
      </p>

      <p>
        Rokt had also run a controlled delay study estimating how revenue
        changes with each added second of latency. That study is the bridge. It
        means a latency result is not only a latency result, because the
        relationship can be run in reverse to estimate what saved time is
        plausibly worth. Used carefully, it turns "the SDK is 11% faster" into
        something a business conversation can hold. Used carelessly, it turns
        into a made-up revenue number.
      </p>

      <h2>Two Skills, One for Each Half of the Problem</h2>

      <p>
        Measuring it properly meant running an A/B test, and getting that right
        turned out to be harder than the optimizations had been. I had already
        written about{' '}
        <Link
          to="/blog/claude-skills-institutional-knowledge"
          className="text-blitz-accent hover:underline"
        >
          turning personal expertise into Claude Skills
        </Link>
        , so I split the method in two. One skill sets an experiment up so the
        data you will need exists. The other reads that data once it is flowing.
        They happen months apart and fail in completely different ways, which is
        why they are two skills rather than one.
      </p>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="bg-blitz-accent/5 border border-blitz-accent/20 p-6 rounded-lg">
          <p className="font-mono text-sm text-blitz-accent mb-2">ab-setup</p>
          <p className="font-semibold text-blitz-charcoal mb-3">
            Make the change measurable before it ships
          </p>
          <ul className="space-y-2 text-sm text-blitz-charcoal/80">
            <li>Size it, so you know what the claim will cost to prove</li>
            <li>Instrument both groups so the data can be read</li>
            <li>Write down what would count as an answer</li>
          </ul>
        </div>
        <div className="bg-blitz-soft/10 border border-blitz-soft/30 p-6 rounded-lg">
          <p className="font-mono text-sm text-blitz-primary mb-2">
            ab-diagnose
          </p>
          <p className="font-semibold text-blitz-charcoal mb-3">
            Read the data once it is flowing
          </p>
          <ul className="space-y-2 text-sm text-blitz-charcoal/80">
            <li>
              Check the instrumentation, then the population, then the split
            </li>
            <li>Then the outcome metrics, with uncertainty attached</li>
            <li>Write the report before deleting the experiment</li>
          </ul>
        </div>
      </div>

      <h3>ab-setup: make the change measurable before it ships</h3>

      <p>
        Whatever you are changing, the same things have to be in place before it
        ships, or you will not be able to say anything about it afterwards.
      </p>

      <p>
        <strong>Size it first.</strong> This is the step people skip and the one
        that saves you a quarter. The closer a metric sits to your change, the
        cheaper it is to prove:
      </p>

      <table className="w-full border-collapse border border-blitz-charcoal/20 my-6">
        <thead>
          <tr className="bg-blitz-charcoal/5">
            <th className="border border-blitz-charcoal/20 p-3 text-left">
              What you want to claim
            </th>
            <th className="border border-blitz-charcoal/20 p-3 text-left">
              What it costs to prove
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-blitz-charcoal/20 p-3">
              The metric your code touches directly
            </td>
            <td className="border border-blitz-charcoal/20 p-3 font-medium text-green-600">
              Hours
            </td>
          </tr>
          <tr>
            <td className="border border-blitz-charcoal/20 p-3">
              One step downstream of it
            </td>
            <td className="border border-blitz-charcoal/20 p-3 font-medium">
              Weeks
            </td>
          </tr>
          <tr>
            <td className="border border-blitz-charcoal/20 p-3">
              The business outcome at the end of the chain
            </td>
            <td className="border border-blitz-charcoal/20 p-3 font-medium text-blitz-charcoal/60">
              Months, if ever
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        Every hop dilutes the effect, and every hop multiplies the data you
        need. For us it was the difference between proving a latency win before
        lunch and needing a quarter to say anything about revenue. When the
        claim you want turns out to be unaffordable, the skill says so before
        anyone commits: claim the nearer metric instead, pick a cheaper one, or
        bundle several changes into a single experiment and accept that the
        result belongs to the bundle.
      </p>

      <p>
        <strong>Then instrument it so it can be read.</strong> Mark both groups,
        not just the treated one. Mark them before the thing you are measuring
        can fail, or the cases you lose become invisible. Mark once per unit,
        because double-counting destroys your denominator. Fail closed when
        configuration is missing, so an unwired environment enrolls nobody
        rather than everybody.
      </p>

      <p>
        <strong>Then write down what would count as an answer</strong>, in the
        pull request, before any data exists: the primary metric, the expected
        effect, the window. Decisions made after seeing data are not the same
        decisions.
      </p>

      <h3>ab-diagnose: read the data once it is flowing</h3>

      <p>
        Setup means the data is arriving. This skill turns it into an answer, in
        a fixed order, because every way it goes wrong is quiet: the query runs,
        the table looks plausible, the conclusion is wrong.
      </p>

      <ol className="space-y-3 my-6">
        <li>
          <strong>Confirm the instrumentation is live</strong> in what is
          actually deployed, not just in your checkout.
        </li>
        <li>
          <strong>
            Build the population from enrollment, never from outcomes.
          </strong>{' '}
          If your change affects whether a case produces a result row at all,
          cohorting on those rows biases everything downstream.
        </li>
        <li>
          <strong>Check the split before any outcome metric.</strong> If the
          groups are not the sizes they should be, nothing below that is
          trustworthy yet.
        </li>
        <li>
          <strong>
            Check the step in between, against a margin you declared in advance.
          </strong>{' '}
          If the change moved how many cases reach the point you are measuring,
          that movement is the result and everything after it is confounded.
        </li>
        <li>
          <strong>Then the outcome metrics</strong>, with a confidence interval
          beside every p-value and a power check on every non-significant one,
          so "we could not detect it" never gets rounded to "there was nothing
          there."
        </li>
        <li>
          <strong>Write the report to a file</strong> before deleting the
          experiment. Once the data stops flowing it cannot be re-measured.
        </li>
      </ol>

      <h2>What This Actually Produced</h2>

      <p>
        This is where the number stopped being something I quoted and became
        something I could defend. It came from a combined holdback: traffic
        split 50/50, one cohort running the performance changes and one without,
        analyzed over a closed pre-registered window rather than checked daily
        until it looked good.
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
        Holding the same proportional improvement out at p95 was the part I was
        happiest about. Those are the sessions on slow devices and bad networks,
        where the absolute time saved is largest.
      </p>

      <p>
        Two changes turned out to be responsible for most of it, and I could not
        have told you in advance which two. Neither made an individual
        calculation faster. One reduced how much JavaScript had to arrive and be
        parsed before render, the other moved nonessential work until after it.
        Both shortened the path the user actually waits on.
      </p>

      <p>
        Run through the delay model, that time saved converts into a significant
        revenue impact at fleet scale. The holdback itself moved revenue per
        transaction in the same direction the model predicted, though not by
        enough to separate it from noise at that sample size, so I treat it as
        supporting evidence rather than a proven revenue increase.
      </p>

      <h2>So, What Do You Tell Your Manager?</h2>

      <p>
        "What was the impact?" is really four claims, and each one needs more
        evidence:
      </p>

      <ol className="space-y-3 my-6">
        <li>
          <strong>The system is faster.</strong> Measured against a randomized
          control.
        </li>
        <li>
          <strong>It is faster because of my change.</strong> What I touched
          moved, and what I did not touch stayed put.
        </li>
        <li>
          <strong>That speed is plausibly worth this much.</strong> Modeled, and
          labelled as modeled every time.
        </li>
        <li>
          <strong>The business outcome moved.</strong> Directional,
          underpowered, honestly captioned.
        </li>
      </ol>

      <p>
        Most of these conversations fail because someone claims the fourth and
        can only support the first. A reasonable question gets asked, the number
        does not hold, and the whole thing collapses back to "trust me, it's
        better," which is worse than where it started.
      </p>

      <p>
        So I say them in order, and stop where the evidence stops. "This part is
        measured, this part is modeled, this part I have not proven" lands
        better than one confident number with nothing underneath it.
      </p>

      <p>
        That chain has to be designed alongside the optimization, not assembled
        the week before a performance review. <code>ab-setup</code> starts from
        the expected change, its user-facing metric, and the business outcome it
        might influence. <code>ab-diagnose</code> walks the same chain back
        through the data and reports where the evidence stops.
      </p>

      <h2>Closing Thoughts</h2>

      <p>
        None of this means "just A/B test your refactors." It worked because the
        change had a user-facing metric hanging off it, already instrumented and
        already tied to a revenue relationship somebody had measured properly.
        Plenty of good work has nothing like that, and there the honest move is
        to say so rather than attach a number that does not belong to it.
      </p>

      <p>
        But when a metric is available, the gap between "it feels faster" and
        "11-12% faster, here is what that is plausibly worth, and here is what I
        have not proven" is almost entirely method. The SDK ended up faster and
        easier for the next person to work in. The more durable win was the
        method itself, which now lives in two skills that show up when the work
        starts rather than in a document somebody has to remember exists.
      </p>

      <p>
        So, back to the question at the top. Whatever you are working on right
        now is probably worth more than you can currently prove. Set the
        measurement up before you ship, and you get to show that impact for you
        and your team.
      </p>
    </ArticleLayout>
  )
}

export default MeasuringEngineeringImpactPage
