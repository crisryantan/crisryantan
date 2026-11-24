import React from 'react'
import ArticleLayout from '../../components/ArticleLayout'

const title = 'Harry Potter and the Order of the Agents'
const description =
  'Software factories are all the rage, so I decided to join the bandwagon and model mine on the magical world of Harry Potter.'

const desks = [
  [
    'McGonagall',
    'Chief of Staff',
    'Sizes the work to the ask. Small asks she just answers, and a clear change becomes one task with what done looks like written as checks. When I want a feature designed first, she writes the system design, and Hermione and Moody both review it before I do. A big project gets milestones on top, each made of tasks in the order they can land, and a definition of done for the whole thing. She delegates every task to Harry once I start it, picks the next step after every review, tells me what each merge unblocked, and brings me only what needs me.',
  ],
  [
    'Voldemort',
    'Systems Architect',
    "Researches and writes the system design for the biggest projects, on the most capable model I have. Hermione and Moody review his designs like anyone else's work, and I approve them. He's the most powerful wizard in the castle, so he designs and never touches the code.",
  ],
  [
    'Harry',
    'Senior Engineer',
    "Builds one task at a time with Codex, in his own checkout of the repo. Scripts commit his work and run the acceptance checks. He fixes review findings until a pass lets a script open a draft PR, and he handles my teammates' comments on his PRs too.",
  ],
  [
    'Hermione',
    'Staff Engineer',
    "Reviews Codex-written code using Claude, Harry's included. Each review starts fresh with the task, the diff, the evidence, and the repo rules, and a pass covers only the commit she read. After three rounds without a pass, I step in. She also checks Harry's replies to my teammates and fact-checks bot comments.",
  ],
  [
    'Moody',
    'Security Reviewer',
    "Reviews Claude-written code, such as changes from my own Claude sessions, using Codex, security first, under the same rules. A hook blocks any push without a pass from the other model family, mine included. He brings constant vigilance and trusts nothing he hasn't checked himself. My teammates can ask him for a review in our team chat too.",
  ],
  [
    'Ron',
    'Release Engineer',
    'Wakes only when a PR or CI changes, and sorts each change into routine or needs-me. He also watches the deploy and release pipelines. When a build fails or gets stuck, he reads the logs and calls it real, flaky, or infra, and I decide whether to retry or roll back. He writes the morning PR lineup and the weekly scoreboard too. He kept goal at school, which fits watching everything coming at the hoops.',
  ],
  [
    "The Marauder's Map",
    'Patrol',
    "A script, not a model. It watches PRs and CI, wakes Ron when something changes, and passes teammates' comments to Harry as data, not orders. Once it can prove a merged task landed, it declares mischief managed and closes it.",
  ],
  [
    'Snape',
    'Data Analyst',
    'Investigates data read-only, with a query attached to every number. His potions book is full of corrections to the official recipe, the attitude I want from whoever reads my data.',
  ],
  [
    "Dumbledore's portrait",
    'Knowledge Manager',
    'Reviews the day each weeknight and writes memory fixes. I let his additions apply on their own. His edits and removals wait for me.',
  ],
  [
    'Ollivander',
    'Model Keeper',
    'A script, not a model. He fits each desk with a model from its family the way he fits wands, moves desks along the family when a model is down, and rechecks the sandbox before the Codex desks resume after an update. Costlier moves wait for me.',
  ],
  [
    'The house-elves',
    'Cleanup',
    "Mostly scripts. Every night they clear out what's gone stale: old owls, logs, messages, and memories no desk uses anymore. Everything goes into a bin first, so it can be restored, and they never touch open work or the record of what was approved and reviewed. Like the real ones, they work while the castle sleeps.",
  ],
]

// Each desk's badge, drawn from the books' descriptions in one chibi style.
const avatars = {
  McGonagall: require('../../assets/images/avatars/mcgonagall.png').default,
  Voldemort: require('../../assets/images/avatars/voldemort.png').default,
  Harry: require('../../assets/images/avatars/harry.png').default,
  Hermione: require('../../assets/images/avatars/hermione.png').default,
  Moody: require('../../assets/images/avatars/moody.png').default,
  Ron: require('../../assets/images/avatars/ron.png').default,
  "The Marauder's Map": require('../../assets/images/avatars/map.png').default,
  Snape: require('../../assets/images/avatars/snape.png').default,
  "Dumbledore's portrait": require('../../assets/images/avatars/portrait.png')
    .default,
  Ollivander: require('../../assets/images/avatars/ollivander.png').default,
  'The house-elves': require('../../assets/images/avatars/elves.png').default,
}

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
        viewBox="0 0 920 750"
        className="block w-full min-w-[920px] font-sans"
        role="img"
        aria-labelledby="fleet-map-title fleet-map-description"
      >
        <title id="fleet-map-title">From my ask to my merge</title>
        <desc id="fleet-map-description">
          Follow the trail from my ask to McGonagall, Harry, evidence, review by
          Hermione or Moody, the push gate and draft PR, Ron's patrol, and my
          merge. Review findings return to Harry. The Owlery, the Pensieve with
          Dumbledore's portrait, Ollivander's model shop, Voldemort's chamber,
          and the house-elves' kitchens sit alongside the task path.
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
            detail="plans it, sees it through"
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
          <MapRoom
            x={20}
            y={630}
            width={440}
            label="BEFORE BIG PROJECTS · THE CHAMBER"
            name="Voldemort designs"
            detail="Reviewed by Hermione and Moody, approved by me"
            aside
          />
          <MapRoom
            x={520}
            y={630}
            width={380}
            label="NIGHTLY · THE KITCHENS"
            name="The house-elves"
            detail="Clear what's gone stale, into a bin first"
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

const SoftwareFactoryPage = () => (
  <ArticleLayout
    title={title}
    description={description}
    date="October 5, 2026"
    readTime="6 min read"
    category="AI & Productivity"
    slug="/blog/software-factory"
    tags={['AI & Productivity', 'AI Agents', 'Developer Workflow']}
    theme="hogwarts"
  >
    <p className="text-lg italic mb-8">
      Software factories are all the rage, so I decided to join the bandwagon
      and model mine on the magical world of Harry Potter.
    </p>
    <p>
      McGonagall drafts the tasks. Harry builds them. Hermione and Moody review
      the code from the other model family. Ron keeps goal on CI. Voldemort
      designs the big projects, and the house-elves clean up overnight. I'm the
      Headmaster, which mostly means making the calls they bring back to my
      office.
    </p>
    <p>
      Over the summer I averaged about 90 GitHub contributions a week. Since the
      factory went live in October, it's been about 380.
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

    <h2>What I mean by a software factory</h2>
    <p>
      For me, a software factory is the whole path from an ask to a reviewed PR,
      run by agents. I set the outcome and make the calls. The agents do the
      work, and nothing moves on until it's been checked.
    </p>
    <p>
      It's built in three layers. Every desk's job is written down in a plain
      file: how to do it and what done looks like. Those jobs run in loops that
      start on their own, so building, review, and fixes don't wait for me to
      move them along. And the loops learn. What a reviewer catches becomes a
      lesson the next build reads, so the same mistake shouldn't cost me twice.
    </p>
    <p>
      Scripts handle messages, worktrees, checks, and watching for changes.
      Models handle the parts that need judgment. Each task starts fresh with
      only the context it needs, and no agent reviews its own work.
    </p>
    <p>
      Big work runs as a project. It starts with a written design that two
      reviewers and I sign off, then moves through milestones. A milestone is
      something that works end to end, however many repos or weeks that takes,
      and every change inside it still reaches my teammates as one small PR.
    </p>

    <h2 id="map">The Marauder's Map</h2>
    <p>
      This is how a task moves through the castle, footprints and all. The trail
      follows one change from my ask to my merge. The rooms alongside it handle
      messages, memory, model choices, big designs, and cleanup. They're the
      supporting cast rather than another approval step on every task.
    </p>
    <FleetMap />

    <h2>The Order of the Agents roster</h2>
    <div className="my-8 overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">
          The factory's desks and their jobs
        </caption>
        <thead>
          <tr className="border-b border-blitz-primary/20 bg-blitz-sand">
            <th scope="col" className="hidden p-3 sm:table-cell">
              <span className="sr-only">Badge</span>
            </th>
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
              <td className="hidden p-3 align-top sm:table-cell">
                <img
                  src={avatars[name]}
                  alt=""
                  width="56"
                  height="56"
                  loading="lazy"
                  className="roster-avatar rounded-full"
                />
              </td>
              <th scope="row" className="p-3 align-top font-semibold">
                <img
                  src={avatars[name]}
                  alt=""
                  width="40"
                  height="40"
                  loading="lazy"
                  className="mb-2 block h-10 w-10 rounded-full sm:hidden"
                />
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

    <h2>The Pensieve</h2>
    <p>
      The Pensieve is the context lake of my software factory: one pool of
      memory every desk dips into, instead of each starting from scratch. Two
      kinds of memory feed it: a knowledge folder that people write, and a table
      of facts that scripts and accepted lessons write. One selector picks from
      both for each run. The table lives in a SQLite file with full-text search.
      When a session ends, a hook stores a short, scrubbed extract of what was
      asked and answered, never the tool output.
    </p>
    <p>
      It keeps one current fact per subject. When a fact changes, the old one
      stays in the bowl with its dates, so yesterday's answer never passes for
      today's. A new session starts from a short digest and its last checkpoint
      instead of hours of history.
    </p>
    <p>
      Each weeknight, Dumbledore's portrait reviews the day for anything a desk
      had to look up twice and writes memory fixes. His additions apply on their
      own with a note to me. His edits and removals wait for me.
    </p>
    <p>
      The lake reaches the reviews too. When Hermione or Moody reviews a change
      to one of my private repos, they get the facts about the files it
      touches, numbered and marked as data, never instructions. A fact can be
      stale, so they check it against the code before a finding leans on it,
      and cite its number when one does. Whoever writes a design, and both
      reviewers who check it, get the same facts for the repos the project
      touches. Public repos never get them.
    </p>
    <p>
      A lake goes stale if nobody tends it. Every night the house-elves clear
      out what's no longer useful: old owls, session extracts, logs, finished
      run folders and drafts nobody started. Facts past their expiry date are
      retired but kept with their dates. The elves follow fixed rules,
      everything they remove goes to a bin first, and the record of what was
      approved and reviewed is never touched.
    </p>

    <h2>The Great Hall</h2>
    <p>
      The Great Hall is a small web page on my machine that shows the whole
      factory in one place: a card for every desk, a list of what's waiting on
      me, and a feed of everything the factory did in the last two days. From
      there I can open any desk to see its recent work, ask it a question, or
      handle a small decision without going back to the terminal.
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
      lands right there. The page only queues what I send, and the factory's own
      jobs carry it out through the same checks as everywhere else. Merging and
      deploying stay in my terminal.
    </p>

    <h2>Closing thoughts</h2>
    <p>
      The biggest change is where my time goes. Scripts do the watching, fix
      rounds start on their own, and a broken build reaches me already called
      real, flaky, or infra. My attention goes to decisions, approvals, and
      merges, and teammates get a review without waiting for someone's afternoon
      to free up. My token use came down a little too, since no session carries
      its whole history.
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

export default SoftwareFactoryPage
