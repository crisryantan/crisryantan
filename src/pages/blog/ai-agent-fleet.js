import React from 'react'
import ArticleLayout from '../../components/ArticleLayout'

const title = 'Harry Potter and the Order of the Agents'
const description =
  'I split coding, review, and CI watching across a Harry Potter themed factory of AI agents. A task usually reaches a reviewed draft PR without me stepping in.'

const desks = [
  [
    'McGonagall',
    'Chief of Staff',
    'Answers small asks directly. For a build, she writes my words under Intent in a TASK.md, adds acceptance criteria with a check for each, and names the repo, a new branch, and its base. I start it by typing go with the task id myself, and Intent stays frozen from then on. After that she picks each next step from a short fixed list and brings me only what needs me.',
  ],
  [
    'Harry',
    'Senior Engineer',
    "Builds one task at a time with Codex, in a fresh git worktree, a separate checkout of the repo. He leaves a handoff with a proposed commit message, and the review script makes the commit outside his sandbox. A verify script then runs the acceptance checks and records each command, exit code, and output against that commit. A review that asks for changes sends him straight back to fix it, and once a review passes, a script pushes exactly that commit and opens a draft PR. He also fixes or answers my teammates' comments on his PRs.",
  ],
  [
    'Hermione',
    'Staff Engineer',
    "Reviews Codex-written code using Claude, Harry's included. Each review starts fresh with the task, the full diff, the evidence, and the repo rules, and a pass only counts for the exact commit it read. After three rounds without a pass, it comes back to me. She also checks Harry's fixes and replies to my teammates before they go out in my name, and fact-checks bot comments.",
  ],
  [
    'Moody',
    'Security Reviewer',
    "Reviews Claude-written code, such as changes from my own Claude sessions, using Codex, security first, under the same rules. A hook blocks any push without a pass from the other model family, mine included. He brings constant vigilance and trusts nothing he hasn't checked himself.",
  ],
  [
    'Ron',
    'Release Engineer',
    "Wakes only when a PR or CI changes, and sorts each change into routine or needs-me. He also watches the deploy and release pipelines. When a build fails or gets stuck, he reads the logs and calls it real, flaky, or infra, and I decide whether to retry or roll back. He writes the morning PR lineup and the weekly scoreboard too. He kept goal at school, which fits watching everything coming at the hoops.",
  ],
  [
    "The Marauder's Map",
    'Patrol',
    "A script, not a model. It checks PRs and CI and wakes Ron when something changes, and hands teammates' comments on the factory's PRs back to Harry as data, not orders. With auto-close on, it closes a merged task once it can prove the work landed: the reviewed commit merged, CI green on the merge commit, and any after-merge checks passed.",
  ],
  [
    'Snape',
    'Data Analyst',
    "Investigates data read-only, with a query attached to every number. His potions book is full of corrections to the official recipe, the attitude I want from whoever reads my data.",
  ],
  [
    "Dumbledore's portrait",
    'Knowledge Manager',
    'Reviews the day each weeknight and writes memory fixes. I let his additions apply on their own. Anything that edits or removes memory waits for me.',
  ],
  [
    'Ollivander',
    'Model Keeper',
    'A script, not a model. He fits each desk with a model from its family the way he fits wands, moves desks along the family when a model is down, and rechecks the sandbox before the Codex desks resume after an update. Costlier moves wait for me.',
  ],
]

const MapRoom = ({ x, y, width = 190, label, name, detail, aside = false }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect
      width={width}
      height="96"
      rx="4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeDasharray={aside ? '5 5' : undefined}
      opacity="0.9"
    />
    <text x="14" y="26" fontSize="12" letterSpacing="1">
      {label}
    </text>
    <text x="14" y="54" fontSize="20">
      {name}
    </text>
    <text x="14" y="78" fontSize="13" opacity="0.85">
      {detail}
    </text>
  </g>
)

const FleetMap = () => (
  <figure className="my-8 overflow-hidden rounded-lg border border-blitz-primary/30 bg-blitz-sand text-blitz-primary shadow-soft">
    <figcaption className="flex flex-wrap justify-between gap-2 border-b border-blitz-primary/20 px-5 py-3 text-sm font-semibold">
      <span>The Marauder's Map</span>
      <span>One task, from my ask to my merge</span>
    </figcaption>
    <div
      className="overflow-x-auto p-3"
      tabIndex={0}
      role="region"
      aria-label="Task map, scroll horizontally to explore the rooms"
    >
      <svg
        viewBox="0 0 920 610"
        className="block w-full min-w-[920px] font-sans"
        role="img"
        aria-labelledby="fleet-map-title fleet-map-description"
      >
        <title id="fleet-map-title">From my ask to my merge</title>
        <desc id="fleet-map-description">
          Follow the trail from my ask to McGonagall, Harry, evidence, review by
          Hermione or Moody, the push gate and draft PR, Ron's patrol, and my
          merge. Review findings return to Harry. The Owlery, the Pensieve with
          Dumbledore's portrait, and Ollivander's model shop sit alongside the
          task path.
        </desc>
        <defs>
          <marker
            id="fleet-map-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
          </marker>
        </defs>
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeDasharray="2 7"
          strokeLinecap="round"
          d="M210,78 L270,78 M460,78 L520,78 M710,78 L740,78 M820,126 L820,190 M740,238 L710,238 M520,238 L460,238 M270,238 L210,238"
        />
        <g fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.75">
          {[
            'M262,78 L268,78',
            'M512,78 L518,78',
            'M732,78 L738,78',
            'M820,182 L820,188',
            'M718,238 L712,238',
            'M468,238 L462,238',
            'M218,238 L212,238',
          ].map((d) => (
            <path key={d} d={d} markerEnd="url(#fleet-map-arrow)" />
          ))}
          <path
            d="M115,190 C115,160 115,150 115,128"
            markerEnd="url(#fleet-map-arrow)"
            strokeDasharray="3 5"
          />
          <path
            d="M772,190 C772,158 700,160 690,130"
            markerEnd="url(#fleet-map-arrow)"
            strokeDasharray="3 5"
          />
        </g>
        <g fill="currentColor">
          <MapRoom
            x={20}
            y={30}
            label="HEADMASTER"
            name="I ask"
            detail="in my own words"
          />
          <MapRoom
            x={270}
            y={30}
            label="DEPUTY'S OFFICE"
            name="McGonagall"
            detail="TASK.md, then I type go"
          />
          <MapRoom
            x={520}
            y={30}
            label="THE PITCH"
            name="Harry builds"
            detail="Codex, own worktree"
          />
          <MapRoom
            x={740}
            y={30}
            width={160}
            label="TROPHY ROOM"
            name="Evidence"
            detail="checks, per commit"
          />
          <MapRoom
            x={740}
            y={190}
            width={160}
            label="LIBRARY"
            name="Review"
            detail="Hermione or Moody"
          />
          <MapRoom
            x={520}
            y={190}
            label="THE GATE"
            name="Push and PR"
            detail="draft PR on a pass"
          />
          <MapRoom
            x={270}
            y={190}
            label="THE HOOPS"
            name="Ron patrols"
            detail="CI and review comments"
          />
          <MapRoom
            x={20}
            y={190}
            label="HEADMASTER"
            name="I merge"
            detail="and deploy, by hand"
          />
          <MapRoom
            x={20}
            y={350}
            width={440}
            label="ALWAYS · THE OWLERY"
            name="Desks post only to their own outbox"
            detail="The Owl Post stamps every sender."
            aside
          />
          <MapRoom
            x={520}
            y={350}
            width={380}
            label="OVERNIGHT · THE PENSIEVE"
            name="Dumbledore's portrait"
            detail="Adds facts if I let him, edits wait"
            aside
          />
          <MapRoom
            x={20}
            y={490}
            width={880}
            label="ALONGSIDE · THE MODEL SHOP"
            name="Ollivander"
            detail="Models matched to roles. Cheaper moves get a note; costlier moves wait for my yes. Families stay fixed."
            aside
          />
          <text x="128" y="160" fontSize="13" opacity="0.85">
            next ask
          </text>
          <text x="530" y="164" fontSize="13" opacity="0.85">
            changes? back to Harry
          </text>
        </g>
      </svg>
    </div>
  </figure>
)

const HallShot = ({ light, dark, alt, caption }) => (
  <figure className="my-8">
    <img
      src={light}
      alt={alt}
      width="1600"
      height="1125"
      loading="lazy"
      className="w-full h-auto rounded-lg border border-blitz-primary/20 dark:hidden"
    />
    <img
      src={dark}
      alt={alt}
      width="1600"
      height="1125"
      loading="lazy"
      className="hidden w-full h-auto rounded-lg border border-blitz-primary/20 dark:block"
    />
    <figcaption className="text-sm text-blitz-charcoal/60 italic mt-2 text-center">
      {caption}
    </figcaption>
  </figure>
)

const AIAgentFleetPage = () => (
  <ArticleLayout
    title={title}
    description={description}
    date="October 5, 2026"
    readTime="8 min read"
    category="AI & Productivity"
    slug="/blog/ai-agent-fleet"
    tags={['AI & Productivity', 'AI Agents', 'Developer Workflow']}
  >
    <p className="text-lg italic mb-8">
      For a while I had AI agents for different jobs, like writing code,
      reviewing it, and digging into data. They didn't talk to each other, so I
      did the in-between work myself: carrying changes from one to the next,
      watching CI, and remembering to ask a second model to check.
    </p>
    <p>
      So I built the Hogwarts factory, a set of agents and scripts on my Mac
      that hand work along on their own. Once I say go on a task, it usually
      reaches a reviewed draft PR without me stepping in. This post covers how
      it works and where my time goes now.
    </p>
    <p>
      You can see when it switched on. Over the summer I averaged about 90
      GitHub contributions a week. The factory went live on 4 October, which was
      also my first 100-contribution day, and since then it's been about 380 a
      week. GitHub counts the commits, pull requests, and reviews under my
      account, so that includes the work the factory does in my name.
    </p>
    <figure className="my-8">
      <img
        src={
          require('../../assets/images/github-contributions-light.png').default
        }
        alt="GitHub contribution graph for the past year. Squares are light through the summer and turn much darker from the first week of October."
        width="912"
        height="228"
        loading="lazy"
        className="w-full h-auto rounded-lg border border-blitz-primary/20 dark:hidden"
      />
      <img
        src={
          require('../../assets/images/github-contributions-dark.png').default
        }
        alt="GitHub contribution graph for the past year. Squares are faint through the summer and turn much brighter from the first week of October."
        width="912"
        height="228"
        loading="lazy"
        className="hidden w-full h-auto rounded-lg border border-blitz-primary/20 dark:block"
      />
      <figcaption className="text-sm text-blitz-charcoal/60 italic mt-2 text-center">
        My public GitHub contribution graph on 22 November 2026. The jump starts
        the week the factory went live.
      </figcaption>
    </figure>

    <h2>What I mean by a factory</h2>
    <p>
      For me, an AI factory takes a task and sees it through end to end. It
      builds the change, gets it reviewed, fixes what the review finds, and gets
      it shipped, and over time it needs less supervision from me to do that.
    </p>
    <p>
      Underneath, it's a set of agents with separate jobs, a way to hand work
      between them, and clear rules about who can do what. One builds. Another
      reviews. Another investigates data. They share useful context without
      sharing one endless conversation.
    </p>
    <p>
      Each task gets a fresh start and a clear handoff. Scripts move messages,
      prepare worktrees, run checks, and watch for changes. Models do the parts
      that need judgment. I own merges, deploys, credentials, and settings. The
      few things the factory does in my name are switches I turn on myself, and
      each one tells me what it did.
    </p>
    <p>
      The point is that I stop being the conveyor belt. I don't carry work
      between agents or keep checking whether the next step can start. Each
      agent gets only the context its part needs, and none of them checks its
      own work.
    </p>
    <p>
      The direction is that I define and oversee the outcome while agents do
      more of the work, and every step I hand to an agent comes with a way to
      check it. Mine gets a task to a reviewed draft PR today. Merging and
      deploying are still mine, and they're the next steps I want to hand over
      once the factory can prove each one worked.
    </p>

    <h2>The Harry Potter theme and roles</h2>
    <p>
      I themed the factory around Harry Potter because I like it, and the names
      make the jobs easy for me to remember. I'm the Headmaster. Each desk has a
      narrow role, and important decisions come back to my office. Nothing in
      the factory marks a PR ready, resolves a thread, or merges. Those stay
      mine, along with deploys.
    </p>
    <div className="my-8 overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">
          The factory's desks and their jobs
        </caption>
        <thead>
          <tr className="border-b border-blitz-primary/20 bg-blitz-sand">
            <th scope="col" className="p-3">
              Desk
            </th>
            <th scope="col" className="p-3">
              Job
            </th>
          </tr>
        </thead>
        <tbody>
          {desks.map(([name, role, job]) => (
            <tr key={name} className="border-b border-blitz-primary/10">
              <th scope="row" className="p-3 align-top font-semibold">
                {name}
                <span className="mt-1 block text-sm font-normal text-blitz-charcoal/70">
                  {role}
                </span>
              </th>
              <td className="p-3 align-top">{job}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p>
      There are scripts behind the desks too. The Owl Post carries messages and
      Gringotts handles backups. Neither needs a model.
    </p>

    <h2 id="map">The Marauder's Map</h2>
    <p>
      This is how a task moves through the castle, footprints and all. The trail
      follows one change from my ask to my merge. The rooms alongside it handle
      messages, memory, and model choices. Ollivander is part of that supporting
      cast rather than another approval step on every task.
    </p>
    <FleetMap />

    <h2>Reviewers my teammates can ask</h2>
    <p>
      Hermione and Moody also live in our team chat. A teammate mentions one
      with a pull request link, and a job on my Mac reviews it read-only against
      the whole repo and the PR's CI checks, then answers in the thread. With my
      switches on, the review also lands on GitHub with comments on the lines.
      An approval counts as mine, so it needs its own switch, and it's held back
      for risky changes, CI that isn't green, and a few other cases.
    </p>
    <p>
      The job fetches the linked PR and anything attached, and that's what the
      model sees, never the wording of the request. Follow-up questions and
      earlier messages in the thread do reach it, marked as untrusted text
      rather than instructions. The model can't browse or change anything
      outside its review folder, and the job does the posting.
    </p>

    <h2>Shared memory without carrying the history</h2>
    <p>
      Yes, the sessions share context. The Pensieve is a SQLite file with
      full-text search. When a session ends, a hook stores a capped extract of
      my prompts and the final replies. It leaves out tool output and scrubs
      emails, IP addresses, tokens, and long hashes first.
    </p>
    <p>
      The Pensieve keeps one current fact per subject. When a fact changes, the
      old one stays in the bowl with its dates instead of being overwritten, so
      yesterday's answer doesn't quietly pass for today's. Things that change
      fast, like PR status, have to be looked up live or expire within a week.
    </p>
    <p>
      A session starts with a short digest and its last checkpoint, rather than
      hours of chat history: the task, the decisions, and the next step, without
      replaying every turn.
    </p>
    <p>
      Each weeknight, Dumbledore's portrait reviews the day for places where a
      desk had to find the same information again, and writes memory fixes. His
      additions apply on their own with a line telling me what changed. Anything
      that edits or removes memory waits for me.
    </p>

    <h2>The Great Hall</h2>
    <p>
      The Great Hall is a small web page on my Mac that shows the whole factory
      in one place: a card for every desk, a list of what's waiting on me, and a
      feed of everything the factory did in the last two days. From there I can
      open any desk to see its recent work, ask it a question, or handle a small
      decision without going back to the terminal.
    </p>
    <HallShot
      light={require('../../assets/images/great-hall-light.avif').default}
      dark={require('../../assets/images/great-hall-dark.avif').default}
      alt="The Great Hall page. A staff table of desk cards on the left, each with a portrait, role, status, runs, and cost. On the right, a Needs you panel with two items, each with a Dismiss button, and a feed called the Daily Prophet listing recent messages, events, and runs."
      caption="The Great Hall, filled with made-up demo data. Every repo, task, and number in it is invented."
    />
    <p>
      Each desk's page also has a conversation box, so I can ask Ron why a build
      stopped, hand Harry a task, or send Moody a PR to review, and the answer
      lands right there. The page never does the work itself. It only queues
      what I send, and the factory's own jobs carry it out through the same
      checks as everywhere else. It only runs on my machine, and merging and
      deploying stay in my terminal.
    </p>

    <h2>Closing thoughts</h2>
    <p>
      The biggest change is where my time goes. Harry builds, the checks run, a
      reviewer from the other model family reads the diff, and a fix round
      starts on its own when the review asks for changes. Teammates' comments on
      those PRs go back to Harry first, and a broken build reaches me already
      called real, flaky, or infra.
    </p>
    <p>
      Scripts do the watching instead of me. When a task moves, a notification
      on my Mac says where it stands, so my attention goes to decisions,
      approvals, and merges. Teammates can get a review on a PR without waiting
      for someone's afternoon to free up.
    </p>
    <p>
      My token use came down a little too, since no session carries its whole
      history, but that was a side effect rather than the goal.
    </p>
    <p>
      The factory doesn't have to be Harry Potter themed. That's just how I like
      it. The roles, handoffs, and boundaries are the useful part, and they work
      under any names. If I were starting again, I'd begin with one builder, one
      reviewer from a different model family, and scripts for the handoffs and
      CI watching. I'd add desks when I caught myself doing the same job by hand
      again and again.
    </p>
  </ArticleLayout>
)

export default AIAgentFleetPage
