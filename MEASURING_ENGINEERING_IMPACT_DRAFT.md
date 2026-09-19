# What Is Your Work Actually Worth? Two Skills for Measuring Impact

*September 18, 2026 · 6 min read · Performance*

Have you ever wondered how much your work is actually worth to the business?

The feature you shipped last quarter is the easy case. It is on the screen, someone can use it. The hard cases are everything else. The refactor. The module you untangled so the next person could change it safely. The twenty minutes you took off the CI pipeline, multiplied by every engineer, every day, for as long as the repo lives. That work is real and the value is real, and almost none of it survives the question "so what did that get us?"

A run of performance improvements I shipped to our web SDK made it meaningfully faster, and I still could not answer that question properly. What I wanted was to be able to report it upward in a way that held up.

## What I Shipped

There is a particular satisfaction in refactoring a system you know well enough to see the opportunities sitting in it.

That kind of debt never shows up in a sprint. It does not break and it does not page anyone. It quietly costs everyone a little, forever.

So I took a run at it. The work fell into two piles.

**Load less JavaScript before render.** Code-split what most sessions never touch.

**Stop waiting for things that can wait.** Run independent async work concurrently, and split bootstrap into what has to happen before render and what does not.

A dozen smaller things helped too.

This was, genuinely, good work. And then came the question.

## The Question That Follows a Good Refactor

"Nice. What did that get us?"

I had a number. Time to interactive was down and I could point at the graph, which felt like an answer for about a day. Down by how much of what, and is that good? Nobody beyond the few people who own a metric knows whether a move in it was worth the engineering time. It is a measurement, not an impact.

So the project became: measure it properly.

## Why Time to Interactive

The metric you pick decides what you are able to claim later, so it is worth choosing deliberately.

Our SDK renders offers inside our partners' checkout and confirmation pages, so its startup time comes out of their page-load budget, not ours. That makes latency an unusually honest metric for us: every millisecond we save is one we hand back to somebody who did not have to let us in.

Rokt had also run a controlled delay study estimating how revenue changes with each added second of latency. That study is the bridge. It means a latency result is not only a latency result, because the relationship can be run in reverse to estimate what saved time is plausibly worth. Used carefully, it turns "the SDK is 11% faster" into something a business conversation can hold. Used carelessly, it turns into a made-up revenue number.

## Two Skills, One for Each Half of the Problem

Measuring it properly meant running an A/B test, and getting that right turned out to be harder than the optimizations had been. I had already written about [turning personal expertise into Claude Skills](https://www.crisryantan.com/blog/claude-skills-institutional-knowledge/), so I split the method in two. One skill sets an experiment up so the data you will need exists. The other reads that data once it is flowing. They happen months apart and fail in completely different ways, which is why they are two skills rather than one.

### `ab-setup`: make the change measurable before it ships

Whatever you are changing, the same things have to be in place before it ships, or you will not be able to say anything about it afterwards.

**Size it first.** This is the step people skip and the one that saves you a quarter. The closer a metric sits to your change, the cheaper it is to prove:

| What you want to claim | What it costs to prove |
| --- | --- |
| The metric your code touches directly | Hours |
| One step downstream of it | Weeks |
| The business outcome at the end of the chain | Months, if ever |

Every hop dilutes the effect, and every hop multiplies the data you need. For us it was the difference between proving a latency win before lunch and needing a quarter to say anything about revenue. When the claim you want turns out to be unaffordable, the skill says so before anyone commits: claim the nearer metric instead, pick a cheaper one, or bundle several changes into a single experiment and accept that the result belongs to the bundle.

**Then instrument it so it can be read.** Mark both groups, not just the treated one. Mark them before the thing you are measuring can fail, or the cases you lose become invisible. Mark once per unit, because double-counting destroys your denominator. Fail closed when configuration is missing, so an unwired environment enrolls nobody rather than everybody.

**Then write down what would count as an answer**, in the pull request, before any data exists: the primary metric, the expected effect, the window. Decisions made after seeing data are not the same decisions.

### `ab-diagnose`: read the data once it is flowing

Setup means the data is arriving. This skill turns it into an answer, in a fixed order, because every way it goes wrong is quiet: the query runs, the table looks plausible, the conclusion is wrong.

1. **Confirm the instrumentation is live** in what is actually deployed, not just in your checkout.
2. **Build the population from enrollment, never from outcomes.** If your change affects whether a case produces a result row at all, cohorting on those rows biases everything downstream.
3. **Check the split before any outcome metric.** If the groups are not the sizes they should be, nothing below that is trustworthy yet.
4. **Check the step in between, against a margin you declared in advance.** If the change moved how many cases reach the point you are measuring, that movement is the result and everything after it is confounded.
5. **Then the outcome metrics**, with a confidence interval beside every p-value and a power check on every non-significant one, so "we could not detect it" never gets rounded to "there was nothing there."
6. **Write the report to a file** before deleting the experiment. Once the data stops flowing it cannot be re-measured.

## What This Actually Produced

This is where the number stopped being something I quoted and became something I could defend. It came from a combined holdback: traffic split 50/50, one cohort running the performance changes and one without, analyzed over a closed pre-registered window rather than checked daily until it looked good.

| Result | Meaning |
| --- | --- |
| **−11%** | Time to interactive at p50 |
| **−12%** | Time to interactive at p95 |

Holding the same proportional improvement out at p95 was the part I was happiest about. Those are the sessions on slow devices and bad networks, where the absolute time saved is largest.

Two changes turned out to be responsible for most of it, and I could not have told you in advance which two. Neither made an individual calculation faster. One reduced how much JavaScript had to arrive and be parsed before render, the other moved nonessential work until after it. Both shortened the path the user actually waits on.

Run through the delay model, that time saved converts into a significant revenue impact at fleet scale. The holdback itself moved revenue per transaction in the same direction the model predicted, though not by enough to separate it from noise at that sample size, so I treat it as supporting evidence rather than a proven revenue increase.

## So, What Do You Tell Your Manager?

"What was the impact?" is really four claims, and each one needs more evidence:

1. **The system is faster.** Measured against a randomized control.
2. **It is faster because of my change.** What I touched moved, and what I did not touch stayed put.
3. **That speed is plausibly worth this much.** Modeled, and labelled as modeled every time.
4. **The business outcome moved.** Directional, underpowered, honestly captioned.

Most of these conversations fail because someone claims the fourth and can only support the first. A reasonable question gets asked, the number does not hold, and the whole thing collapses back to "trust me, it's better," which is worse than where it started.

So I say them in order, and stop where the evidence stops. "This part is measured, this part is modeled, this part I have not proven" lands better than one confident number with nothing underneath it.

That chain has to be designed alongside the optimization, not assembled the week before a performance review. `ab-setup` starts from the expected change, its user-facing metric, and the business outcome it might influence. `ab-diagnose` walks the same chain back through the data and reports where the evidence stops.

## Closing Thoughts

None of this means "just A/B test your refactors." It worked because the change had a user-facing metric hanging off it, already instrumented and already tied to a revenue relationship somebody had measured properly. Plenty of good work has nothing like that, and there the honest move is to say so rather than attach a number that does not belong to it.

But when a metric is available, the gap between "it feels faster" and "11-12% faster, here is what that is plausibly worth, and here is what I have not proven" is almost entirely method. The SDK ended up faster and easier for the next person to work in. The more durable win was the method itself, which now lives in two skills that show up when the work starts rather than in a document somebody has to remember exists.

So, back to the question at the top. Whatever you are working on right now is probably worth more than you can currently prove. Set the measurement up before you ship, and you get to show that impact for you and your team.
