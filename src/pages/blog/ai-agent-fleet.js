import React from 'react'
import ArticleLayout from '../../components/ArticleLayout'

const title = 'Harry Potter and the Order of the Agents'
const description =
  'How I split my AI workflow into a themed fleet, with shared memory, cross-model review, and rough estimates of the token use and spend it could save.'

const desks = [
  [
    'McGonagall',
    'Chief of Staff',
    'Turns my ask into a task, picks the next step after my go from a short fixed list, and brings me only what needs me.',
  ],
  [
    'Harry',
    'Senior Engineer',
    "Builds one task at a time in its own git worktree using Codex, then fixes review findings and answers teammates' PR comments, up to a set number of review rounds.",
  ],
  [
    'Hermione',
    'Staff Engineer',
    "Reviews Codex-written code using Claude, including Harry's replies to my teammates, and fact-checks bot comments on my PRs.",
  ],
  [
    'Moody',
    'Security Reviewer',
    'Uses Codex for a read-only review of Claude-written code, so the reviewer comes from the other model family.',
  ],
  [
    'Ron',
    'Release Engineer',
    'Sorts PR and CI changes into routine or needs-me, and writes the morning PR lineup and weekly scoreboard.',
  ],
  [
    'Snape',
    'Data Analyst',
    'Investigates data read-only, with a query attached to every number.',
  ],
  [
    "Dumbledore's portrait",
    'Knowledge Manager',
    'Reviews the day each weeknight and writes memory fixes. I let his additions apply on their own. Anything that edits or removes memory waits for me.',
  ],
  [
    'Ollivander',
    'Model Keeper',
    "A script desk that picks models within each desk's family; cheaper moves apply with a note, and costlier ones wait for my approval. A new model gets a trial and rolls back if both runs fail. When a model is down, its desks move to the next one in the same family.",
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
            detail="The Owl Post stamps the sender. Silence is never a yes."
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

const AIAgentFleetPage = () => (
  <ArticleLayout
    title={title}
    description={description}
    date="October 5, 2026"
    readTime="9 min read"
    category="AI & Productivity"
    slug="/blog/ai-agent-fleet"
    tags={['AI & Productivity', 'AI Agents', 'Shared Memory']}
  >
    <p className="text-lg italic mb-8">
      I already used several AI agents, each for a different kind of work, but
      they didn't work as a fleet. Each one ran its own long session, nothing
      managed how many tokens they burned, and nothing automatically sent one
      agent's work to a different agent to check.
    </p>
    <p>
      So I built a fleet. This post covers the design, including the model
      keeper, and a rough estimate of what it could save. The percentages below
      model my previous workflow against the fleet. They are estimates, not
      measured results.
    </p>

    <h2>What is an AI fleet?</h2>
    <p>
      For me, an AI fleet is a set of agents with separate jobs, a way to hand
      work between them, and clear rules about who can do what. One builds.
      Another reviews. Another investigates data. They share useful context
      without sharing one endless conversation.
    </p>
    <p>
      Each task gets a fresh start and a clear handoff. Scripts move the
      messages, prepare worktrees, run checks, and watch for changes. Models do
      the parts that need judgment. I still own the important calls: merges,
      deploys, credentials, and settings. The few things the fleet does in my
      name, like replying to a teammate's review comment, are switches I turn on
      myself, and each one tells me what it did.
    </p>
    <p>
      The point isn't to have more agents talking. It's to stop each agent from
      carrying its whole history, remembering everything alone, and checking its
      own work.
    </p>

    <h2>The Harry Potter theme and roles</h2>
    <p>
      I themed the fleet around Harry Potter because I like it, and the names
      make the jobs easy for me to remember. I'm the Headmaster. Each desk has a
      narrow role, and important decisions come back to me.
    </p>
    <div className="my-8 overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">The fleet's desks and their jobs</caption>
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
      Ron kept goal for Gryffindor, which fits watching everything coming at the
      hoops. Snape's potions book is full of corrections to the official recipe.
      That's the attitude I want from whoever reads my data. Moody trusts
      nothing he hasn't checked himself. Ollivander fits the right wand to the
      wizard, so he fits the right model to the job.
    </p>
    <p>
      There are scripts behind the desks too. The Owl Post carries messages and
      Gringotts handles backups. The Marauder's Map watches PRs and CI, hands
      teammates' comments back to Harry, and closes merged tasks once they're
      proven. Those jobs don't need a model to keep running.
    </p>

    <h2 id="map">The Marauder's Map</h2>
    <p>
      This is how a task moves through the castle. The trail follows one change
      from my ask to my merge. The rooms alongside it handle messages, memory,
      and model choices. Ollivander is part of that supporting cast rather than
      another approval step on every task.
    </p>
    <FleetMap />
    <ol className="list-decimal space-y-3">
      <li>
        <strong>Ask and ticket.</strong> I tell McGonagall what I want. She can
        answer small things directly. For a build, she writes my words under
        Intent in TASK.md, adds acceptance criteria and checks, and names the
        repo, a new branch, and its base. When I'm happy with it, I type go with
        the task id myself. Intent then stays frozen.
      </li>
      <li>
        <strong>Build.</strong> My go registers the task, prepares a fresh
        worktree on the new branch, and starts Harry. He builds the change and
        leaves a handoff with a proposed commit message. The review script makes
        the local commit outside his sandbox.
      </li>
      <li>
        <strong>Evidence.</strong> A verify script runs the acceptance checks
        and records each command, exit code, and output against that commit. A
        check is either one command or plain words for the reviewer, never a
        mix. Checks that only make sense after the merge wait until then.
        Scripts report facts. Reviewers judge them.
      </li>
      <li>
        <strong>Cross-model review.</strong> Codex-written work goes to Hermione
        on Claude. Claude-written work goes to Moody on Codex. Each gets a fresh
        session with the task, full diff, evidence, and repo rules. The review
        script records the verdict, and the store only counts a pass when the
        model families differ. Any new commit voids it. Harry's handoff starts
        the review by itself. A CHANGES verdict sends him straight back to fix
        it, and his next handoff starts the next review. After three review
        rounds without a pass, or sooner if the reviewer wants me, it comes back
        to me. If a review fails for a tooling reason, like a broken worktree or
        a reviewer run that never gives a verdict, it's reported as blocked
        instead of reaching me as a decision.
      </li>
      <li>
        <strong>Push and PR.</strong> A hook blocks an agent's push without a
        pass for the exact commit, including in my own Claude sessions. I've
        switched on one more step for Harry's work. When his review passes, a
        script pushes exactly that commit and opens a draft PR from his commit
        message and PR draft. It never opens a ready PR, force pushes, or
        merges. Marking it ready stays my call, because that's what notifies
        people. Pushes I make by hand stay mine.
      </li>
      <li>
        <strong>Patrol.</strong> The Map script checks PRs and CI without model
        calls. Ron wakes only when something changes. Hermione reproduces or
        rebuts bot comments. I've also switched on follow-ups. When a teammate
        comments on a PR the fleet opened, their comments go back to Harry as
        data, not orders. He fixes each one or answers it. Hermione reviews the
        fix and every reply. Only then do the push and the replies go out in my
        name. Nothing resolves a thread, marks a PR ready, or merges.
      </li>
      <li>
        <strong>Merge.</strong> Green, reviewed PRs wait in my queue. I merge
        and deploy. With auto-close switched on, the fleet then closes the task
        once it can prove the work landed: the PR merged with exactly the
        reviewed commit, CI is green on the merge commit, and any after-merge
        checks pass. I get one line saying what proved it. If any of that fails,
        it stops and tells me, and I close the task by hand. At the end of a
        day, one phrase closes everything that's provably done and names each
        task still in flight that it refused to touch.
      </li>
    </ol>

    <h2>Shared memory without carrying the history</h2>
    <p>
      Yes, the sessions share context. The Pensieve is a SQLite file with
      full-text search. When a session ends, a hook stores a capped extract of
      my prompts and the final replies. It leaves out tool output and scrubs
      emails, IP addresses, tokens, and long hashes first. Capturing it doesn't
      need a model call.
    </p>
    <p>
      Facts know when they change. Only one fact per subject is current. A
      replacement closes the old fact and keeps its dates, so yesterday's answer
      doesn't silently become today's truth. Volatile facts such as PR status
      need a live lookup or must expire within a week.
    </p>
    <p>
      A session starts with a short startup digest and its last checkpoint,
      rather than hours of chat history. That gives the next session the task,
      the decisions, and the next step without replaying every earlier turn.
      Shared memory is stored context the session can look up, not a promise
      that every agent remembers everything.
    </p>
    <p>
      Each weeknight, Dumbledore's portrait reviews the day and looks for places
      where a desk had to find the same information again. He writes a patch of
      memory fixes. I let his additions, new facts and notes, apply on their
      own, and I get a line saying what applied. Anything that edits, retires,
      or archives memory still waits for me, so the review never quietly
      rewrites what the fleet already knows.
    </p>

    <h2>Closing thoughts</h2>
    <p>
      Compared with my previous workflow, I estimate about{' '}
      <strong>61% fewer tokens per day</strong> at my normal pace, or about{' '}
      <strong>55% fewer</strong> if every background desk hits its daily run
      cap. Those caps give busy days a ceiling.
    </p>
    <p>
      For token spend, the before-and-after estimate is about{' '}
      <strong>31% lower cost per day</strong> at my normal pace, or about{' '}
      <strong>16% lower</strong> at the caps, using list prices. This isn't a
      forecast of my actual plan bill. Spend falls less than token use because
      most of the history being cut is cheap cached input, while the added
      review runs are full-price work.
    </p>
    <p>
      Almost all of the estimated saving, about <strong>95%</strong>, comes from
      ending long sessions and restarting from a checkpoint. The model assumes
      those restarts don't add extra calls. If they do, the saving shrinks. It
      also doesn't count the extra review runs from teammates' PR comments or
      after-merge checks. This is a rough estimate, and the next step is
      checking it against my real usage.
    </p>
    <p>
      The productivity benefit I want is less babysitting and less rebuilding
      context. Scripts do the watching. A builder can focus on a task while a
      reviewer from another model family checks the result. It also cuts most of
      the copy and paste between agents. My go starts the build, and the reviews
      and fix rounds follow on their own. With my switches on, so do the draft
      PR and closing the task once the merge is proven. Checkpoints make fresh
      starts practical, and the nightly review gives me a way to improve memory
      deliberately. I spend my attention on decisions and approvals.
    </p>
    <p>
      The fleet doesn't have to be Harry Potter themed. That's just how I like
      it. The roles, handoffs, and boundaries are the useful part. If you want
      to see how I put them together, the setup is in my{' '}
      <a
        href="https://github.com/crisryantan/hogwarts-fleet"
        className="text-blitz-accent hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        public repo
      </a>
      .
    </p>
  </ArticleLayout>
)

export default AIAgentFleetPage
